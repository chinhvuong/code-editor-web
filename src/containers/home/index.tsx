import React from 'react';
import st from './index.module.css';
import FileTree from './file-tree';
import Editor from './editor';
import styled from '@emotion/styled';
const HomeContainerStyled = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.bg.bg3};
  height: 100vh;
  overflow: hidden;
`;
const HomeContainer = () => {
  return (
    <HomeContainerStyled>
      <FileTree />
      <Editor />
    </HomeContainerStyled>
  );
};

export default HomeContainer;
