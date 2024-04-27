import pako from 'pako';

import {
  BINARY_FILE_TYPES,
  CENTRAL_FILE_HEADER_SIGNATURE,
  COMPRESSION_METHOD,
  DESCRIPTOR_BYTES_LENGTH,
  DIRECTORY_SIGNATURE,
  LOCAL_FILE_HEADER_SIGNATURE
} from './constants';
import { getMimeType } from './ultils';

export class ZipReader {
  private reader: FileReader;
  private filePathRegex: RegExp = /.+/;
  constructor(filePathRegex?: RegExp) {
    this.reader = new FileReader();
    if (filePathRegex) {
      this.filePathRegex = filePathRegex;
    }
  }

  public async getZipFileByteDataFromFile(zipFile: File) {
    const reader = this.reader;

    const uint8Array = await new Promise<Uint8Array>((resolve, reject) => {
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const arrayBuffer = event.target.result as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);
          resolve(uint8Array);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(zipFile);
    });

    if (new DataView(uint8Array.buffer, 0, 4).getUint32(0, true) === LOCAL_FILE_HEADER_SIGNATURE) {
      return uint8Array;
    } else {
      throw Error('Invalid zip file');
    }
  }

  /**
   * Reads a ZIP file and returns the file tree with contents.
   *
   * @param {File} zipFile - The ZIP file to read.
   * @returns {Promise<{ fileTree: IFileTree }>} - A promise resolving to the file tree with contents.
   * @throws {Error} - Throws an error if the ZIP file is invalid.
   */
  public async readFile(zipFile: File) {
    const byteData = await this.getZipFileByteDataFromFile(zipFile);
    return this.readFileTreeWithContents(byteData);
  }

  /**
   * Reads a ZIP file and returns the file tree without contents.
   *
   * @param {Uint8Array} zipData - The Uint8Array containing the ZIP file data.
   * @returns {any} - The file tree without contents.
   */
  public readFileTree(zipData: Uint8Array): any {
    const fileTree: any = {};

    let currentOffset = 0;

    // Find central directory file header signature
    while (currentOffset < zipData.length) {
      if (
        new DataView(zipData.buffer, currentOffset, 4).getUint32(0, true) ===
        CENTRAL_FILE_HEADER_SIGNATURE
      ) {
        break;
      }
      currentOffset++;
    }
    // Read central directory file header
    while (currentOffset < zipData.length) {
      const signature = new DataView(zipData.buffer, currentOffset, 4).getUint32(0, true);

      if (signature === CENTRAL_FILE_HEADER_SIGNATURE) {
        const fileNameLength = new DataView(zipData.buffer, currentOffset + 28, 2).getUint16(
          0,
          true
        );
        const extraFieldLength = new DataView(zipData.buffer, currentOffset + 30, 2).getUint16(
          0,
          true
        );
        const fileCommentLength = new DataView(zipData.buffer, currentOffset + 32, 2).getUint16(
          0,
          true
        );
        const fileName = new TextDecoder('utf-8').decode(
          zipData.subarray(currentOffset + 46, currentOffset + 46 + fileNameLength)
        );
        const parts = fileName.split(DIRECTORY_SIGNATURE);
        let current = fileTree;

        parts.forEach((part) => {
          if (!current[part]) {
            current[part] = {};
          }
          current = current[part];
        });

        currentOffset += 46 + fileNameLength + extraFieldLength + fileCommentLength;
      } else {
        break;
      }
    }

    return fileTree;
  }

  /**
   * Reads a ZIP file's content and yields file information along with its path.
   * This generator function parses the provided `Uint8Array` containing ZIP file data,
   * iterates through local file headers, and yields information about each file.
   *
   * @param {Uint8Array} zipData - The ZIP file data as a Uint8Array.
   *
   * @generator
   * @yields {Object} An object representing file information.
   * @yields {string} Object.path - The path of the file.
   * @yields {Object} Object - Additional file information decoded from the ZIP file.
   *
   * @throws {Error} Throws an error if there is an issue decompressing a file.
   *
   * @remarks
   * This method reads a ZIP file's local file headers, skipping folders and handling file compression.
   * The resulting file information is yielded as objects, with each object containing the file path
   * and additional details decoded from the ZIP file.
   *
   * @example
   * const zipData = getZipFileData(); // Get your ZIP file data
   * const zipReader = new ZipReader();
   * for (const fileInfo of zipReader.readFileTreeWithContents(zipData)) {
   *   console.log(fileInfo);
   *   // Output: { path: 'file.txt', size: 1024, ... }
   * }
   */
  public *readFileTreeWithContents(zipData: Uint8Array) {
    let currentOffset = 0;
    // Data descriptor signature
    const dataDescriptorSignature = new Uint8Array([0x50, 0x4b, 0x07, 0x08]);

    while (currentOffset < zipData.length) {
      if (
        new DataView(zipData.buffer, currentOffset, 4).getUint32(0, true) ===
        LOCAL_FILE_HEADER_SIGNATURE
      ) {
        const fileNameLength = new DataView(zipData.buffer, currentOffset + 26, 2).getUint16(
          0,
          true
        );
        const extraFieldLength = new DataView(zipData.buffer, currentOffset + 28, 2).getUint16(
          0,
          true
        );

        const fileNameBytes = zipData.subarray(
          currentOffset + 30,
          currentOffset + 30 + fileNameLength
        );
        const fileName = new TextDecoder('utf-8').decode(fileNameBytes);
        const compressionMethod = new DataView(zipData.buffer, currentOffset + 8, 2).getUint16(
          0,
          true
        );

        if (!fileName.endsWith(DIRECTORY_SIGNATURE)) {
          const contentOffset = currentOffset + 30 + fileNameLength + extraFieldLength;

          const dataDescriptorIndex = this.indexOfSignature(
            zipData,
            dataDescriptorSignature,
            contentOffset
          );
          const compressedSizeFieldOffset = currentOffset + 18;
          let compressedSize = new DataView(zipData.buffer, compressedSizeFieldOffset, 4).getUint32(
            0,
            true
          );

          if (dataDescriptorIndex !== -1) {
            compressedSize = new DataView(zipData.buffer, dataDescriptorIndex + 8, 4).getUint32(
              0,
              true
            );
          }

          if (this.filePathRegex.test(fileName)) {
            try {
              const compressedData = zipData.subarray(
                contentOffset,
                contentOffset + compressedSize
              );
              const decompressedData = this.decompressData(compressedData, compressionMethod);
              yield {
                path: fileName,
                ...this.decode(fileName, decompressedData)
              };
            } catch (error) {
              console.error(`Error decompressing ${fileName}:`, error);
              // Handle the error appropriately in your code
            }
          }

          // Update: Use compressedSize for the offset
          currentOffset +=
            30 +
            fileNameLength +
            extraFieldLength +
            compressedSize +
            (dataDescriptorIndex > -1 ? DESCRIPTOR_BYTES_LENGTH : 0);
        } else {
          // Skip folders
          currentOffset += 30 + fileNameLength + extraFieldLength;
        }
      } else {
        const signature = new DataView(zipData.buffer, currentOffset, 4).getUint32(0, true);
        if (signature === CENTRAL_FILE_HEADER_SIGNATURE) {
          break;
        }
        currentOffset += 1;
      }
    }
  }

  private decompressData(compressedData: Uint8Array, compressionMethod: number): Uint8Array {
    switch (compressionMethod) {
      case COMPRESSION_METHOD.STORE: // No compression
        return compressedData;

      case COMPRESSION_METHOD.DEFLATE: // DEFLATE compression
        return pako.inflateRaw(compressedData);
      default:
        console.error(`Unsupported compression method: ${compressionMethod}`);
        return compressedData;
    }
  }

  private indexOfSignature(zipData: Uint8Array, signature: Uint8Array, offset: number): number {
    for (let i = offset; i < zipData.length - signature.length + 1; i++) {
      const isMatch = signature.every((byte, index) => zipData[i + index] === byte);
      if (isMatch) {
        return i;
      }
    }

    return -1;
  }

  private decode(
    fileName: string,
    data: Uint8Array
  ): { blob?: string; content: string | Uint8Array } {
    if (BINARY_FILE_TYPES.test(fileName)) {
      const blob = URL.createObjectURL(new Blob([data], { type: getMimeType(fileName) }));
      return {
        blob,
        content: data
      };
    }
    return {
      content: new TextDecoder('utf-8').decode(data)
    };
  }
}
