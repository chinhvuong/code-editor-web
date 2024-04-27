import { MIME_TYPE } from './constants';
import { IFileNode, IFileTree, INode } from './interfaces';

export function getMimeType(fileName: string): string {
  const extension = fileName.split('.').slice(-1)[0].toLowerCase();
  return MIME_TYPE[extension] || 'application/octet-stream';
}

export function concatUint8Arrays(...arrays: Uint8Array[]): Uint8Array {
  const totalLength = arrays.reduce((length, arr) => length + arr.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;

  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }

  return result;
}

export function createAndDownloadFile(fileName: string, content: Uint8Array): void {
  const mimeType = getMimeType(fileName);
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('download', fileName);
  a.setAttribute('target', '_blank');
  a.href = url;

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function numberToBytes(value: number, numBytes: number): Uint8Array {
  const result = new Uint8Array(numBytes);

  for (let i = 0; i < numBytes; i++) {
    result[i] = (value >> (i * 8)) & 0xff;
  }

  return result;
}

export function getCurrentTimestamps(): { lastModDate: number; lastModTime: number } {
  const currentDate = new Date(),
    hours = currentDate.getHours(),
    minutes = currentDate.getMinutes(),
    seconds = currentDate.getSeconds();

  const lastModTime = (hours << 11) | (minutes << 5) | (seconds / 2);

  const year = currentDate.getFullYear(),
    month = currentDate.getMonth() + 1,
    day = currentDate.getDate();

  const lastModDate = ((year - 1980) << 9) | (month << 5) | day;

  return {
    lastModDate,
    lastModTime
  };
}

export function convertToTree(fileNodes: INode[]): IFileTree {
  const fileTree: IFileTree = {};

  for (const fileNode of fileNodes) {
    const pathSegments = fileNode.path.split('/');
    let currentLevel = fileTree;

    for (const segment of pathSegments) {
      if (!currentLevel[segment]) {
        currentLevel[segment] = {};
      }
      currentLevel = currentLevel[segment] as IFileTree;
    }

    if (typeof fileNode.content === 'string') {
      currentLevel.content = fileNode.content as any;
    } else {
      const { content, blob } = fileNode;
      currentLevel.content = content as any;
      if (blob !== undefined) {
        currentLevel.blob = blob as any;
      }
    }
    currentLevel.path = fileNode.path as any;
  }

  return fileTree;
}

export function isLeafNode(obj: any): obj is IFileNode {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'content' in obj &&
    'path' in obj &&
    typeof obj.path === 'string'
  );
}

export function getBasePath(path: string): string {
  const segments = path.split('/');
  segments.pop();
  return segments.join('/');
}
