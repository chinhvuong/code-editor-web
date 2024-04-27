import React from 'react';
import FileTabs from './file-tabs';
import FileEditor from './file-editor';
import styled from '@emotion/styled';
const EditorStyled = styled.div`
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  border-left: 1px solid ${({ theme }) => theme.colors.bg.bg2};
`;
const Editor = () => {
  return (
    <EditorStyled>
      <FileTabs />
      <FileEditor />
    </EditorStyled>
  );
};

export default Editor;
