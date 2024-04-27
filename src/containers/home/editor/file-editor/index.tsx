import React from 'react';
import styled from '@emotion/styled';
import MonacoEditor from './monaco-editor';
import { useEditingFile, useSelectedFile } from '@/state/editor/hooks';
import BinaryFile from './binary-file';

const FileEditorStyled = styled.div`
  width: 100%;
  height: calc(100vh - 40px);
`;
const FileEditor = () => {
  const { selectedFile } = useSelectedFile();
  if (!selectedFile) {
    return;
  }

  return (
    <FileEditorStyled>
      {!selectedFile?.blob ? (
        <MonacoEditor />
      ) : (
        <BinaryFile path={selectedFile.path} blob={selectedFile.blob} />
      )}
    </FileEditorStyled>
  );
};

export default FileEditor;
