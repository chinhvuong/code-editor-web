import styled from '@emotion/styled';
import Accordion from '@/components/accordion';
import { isLeafNode } from '@/modules/zip/ultils';
import React, { useMemo } from 'react';
import { useAddNode, useFileTree, useSelectedFile } from '@/state/editor/hooks';
import { IFileTree } from '@/state/editor/interfaces';
import { getFileIcon } from '@/utils';
import AddNode from './add-node';

const TreeStyled = styled.div`
  width: 300px;
  overflow-y: overlay;
  height: calc(100vh - 40px);
  color: ${({ theme }) => theme.colors.text.text3};

  &::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const FileNodeStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 4px;
  font-size: 14px;
  border: 1px solid transparent;
  &.root {
    text-transform: uppercase;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text.text1};
  }
  /* transition: background-color 0.3s ease; */
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.bg25};
  }
  img {
    width: 20px;
    height: 20px;
  }

  &.selected {
    background-color: ${({ theme }) => theme.colors.bg.bg2};
    color: ${({ theme }) => theme.colors.text.text1};
  }

  &.selectedFolder {
    border-top: 1px solid ${({ theme }) => theme.colors.bg.bg2};
    border-bottom: 1px solid ${({ theme }) => theme.colors.bg.bg2};
  }
`;

const FolderNodeStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: red;
  }
  img {
    width: 20px;
    height: 20px;
  }
`;

export interface ITreeNode {
  node: IFileTree;
  name: string;
  level: number;
  path: string;
}

export const TreeNode = ({ node, name, level, path }: ITreeNode) => {
  const { selectedFile, setSelectedFile } = useSelectedFile();
  const { addNodeData, setAddNodeData } = useAddNode();
  const handleSelectFile = (filePath: string) => {
    setSelectedFile(filePath);
  };

  const handleSelectFolder = () => {
    setAddNodeData({
      ...addNodeData,
      rootPath: path
    });
  };

  if (isLeafNode(node)) {
    if (!name) {
      return;
    }
    return (
      <FileNodeStyled
        className={`${node.path === selectedFile?.path && 'selected'}`}
        style={{ paddingLeft: (level + 1) * 8 }}
        onClick={() => handleSelectFile(node.path)}
      >
        <img src={getFileIcon(path)} alt="" />
        <span>{name}</span>
      </FileNodeStyled>
    );
  }
  if (Object.keys(node).length === 0 && level === 0) {
    return null;
  }
  const openFolder =
    (!!selectedFile && selectedFile?.path.startsWith(path)) ||
    addNodeData.rootPath.startsWith(path) ||
    level === 0;
  return (
    <Accordion
      title={
        <FileNodeStyled
          className={`${level === 0 ? 'root' : ''} ${path === addNodeData.rootPath && 'selectedFolder'}`}
          style={{ paddingLeft: (level + 1) * 8 }}
          onClick={handleSelectFolder}
        >
          <img src="/icons/icon-folder.svg" alt="" />
          <span>{name}</span>
        </FileNodeStyled>
      }
      open={openFolder}
    >
      <AddNode path={path} level={level} />
      <div>
        {Object.keys(node).map((sub, index) => (
          <TreeNode
            key={index}
            node={node[sub] as IFileTree}
            name={sub}
            level={level + 1}
            path={`${path ? path + '/' : ''}${sub}`}
          />
        ))}
      </div>
    </Accordion>
  );
};

const Tree = () => {
  const fileTree = useFileTree();
  const { node, name, basePath } = useMemo(() => {
    const subTreeNode = Object.keys(fileTree);

    if (subTreeNode.length === 1 && fileTree[0]?.content) {
      return {
        node: fileTree,
        name: 'data',
        basePath: ''
      };
    }

    if (subTreeNode.length === 1 && !fileTree[0]?.content) {
      return {
        node: fileTree[subTreeNode[0]],
        name: subTreeNode[0],
        basePath: subTreeNode[0]
      };
    }

    return {
      node: fileTree,
      name: 'data',
      basePath: ''
    };
  }, [fileTree]);

  return (
    <TreeStyled>
      <TreeNode node={node as IFileTree} name={name} level={0} path={basePath} />
    </TreeStyled>
  );
};

export default Tree;
