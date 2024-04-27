import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { ZipWriter } from '@/modules/zip';
import { useAddNode, useFileNodes, useSelectedFile } from '@/state/editor/hooks';
import { getBasePath } from '@/modules/zip/ultils';
import ZipReaderWorker from '@/workers/zip.worker?worker';

const Menu = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  gap: 4px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.bg.bg2};
  padding: 0 8px;
  button {
    width: 28px;
    height: 28px;
    border: 0;
    outline: none;
    cursor: pointer;
    background-color: transparent;
    border-radius: 2px;
    img {
      width: 100%;
      height: 100%;
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.bg.bg2};
    }

    &:disabled {
      cursor: not-allowed;
    }
  }
`;

const FileTreeMenu = () => {
  const { fileNodes, addFileNode } = useFileNodes();
  const { selectedFile } = useSelectedFile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setAddNodeData, addNodeData } = useAddNode();
  const [worker, setWorker] = useState<Worker>();

  useEffect(() => {
    if (window.Worker) {
      const newWorker = new ZipReaderWorker();
      setWorker(newWorker);
      newWorker.onmessage = (event: MessageEvent) => {
        // ceive the processed data from the worker
        if (event.data) {
          addFileNode(event.data);
        }
      };
    }

    () => {
      worker?.terminate();
    };
  }, []);

  const handleUploadZipFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (worker && event.target.files && event.target.files.length > 0) {
      const zipFile = event.target.files[0];
      worker.postMessage(zipFile); // Send the file to the worker
    }
    event.target.value = ''; // Re
    // if (event.target.files && event.target.files.length > 0) {
    //   const zipFile = event.target.files[0];
    //   const zipReader = new ZipReader(/^(?!.*node_modules\/).*$/);
    //   const byteData = await zipReader.getZipFileByteDataFromFile(zipFile);
    //   const iterator = zipReader.readFileTreeWithContents(byteData);
    //   let rs = iterator.next();
    //   clearEditor();
    //   while (!rs.done) {
    //     if (rs.value) {
    //       addFileNode(rs.value);
    //     }
    //     rs = iterator.next();
    //   }
    // }
    // event.target.value = '';
  };
  const handleExportFileZip = () => {
    let name = prompt(
      'Please enter name of zip file',
      'export_' + new Date().toDateString().split(' ').join('_')
    );

    if (name !== null && name) {
      name = name.trim();
      if (!name.endsWith('.zip')) {
        name += '.zip';
      }
      const zipWriter = new ZipWriter(name);
      zipWriter.generateFromFileNodes(fileNodes);
    } else {
      console.log('');
    }
  };

  const handleAddFile = () => {
    const altPath = !selectedFile ? '' : getBasePath(selectedFile.path);
    console.log(addNodeData);

    setAddNodeData({
      type: 'file',
      isProcessing: true,
      rootPath: addNodeData.rootPath ? addNodeData.rootPath : altPath
    });
  };

  const handleAddFolder = () => {
    const altPath = !selectedFile ? '' : getBasePath(selectedFile.path);
    setAddNodeData({
      type: 'folder',
      isProcessing: true,
      rootPath: addNodeData.rootPath ? addNodeData.rootPath : altPath
    });
  };

  return (
    <Menu>
      <button onClick={handleAddFile} disabled={fileNodes.length === 0} title="Add file">
        <img src="/icons/icon-add.svg" alt="Add file" />
      </button>
      <button onClick={handleAddFolder} disabled={fileNodes.length === 0} title="Add folder">
        <img src="/icons/icon-folder.svg" alt="Add file" />
      </button>
      <button title="Upload" onClick={() => fileInputRef.current?.click()}>
        <img src="/icons/icon-upload.svg" alt="Upload file" />
        <input
          type="file"
          accept=".zip"
          ref={fileInputRef}
          style={{ position: 'absolute', top: '-9999px' }}
          onChange={handleUploadZipFile}
        />
      </button>
      <button onClick={handleExportFileZip} disabled={fileNodes.length === 0} title="Export">
        <img src="/icons/icon-download.svg" alt="export" />
      </button>
    </Menu>
  );
};

export default FileTreeMenu;
