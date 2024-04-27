import { useAddNode } from '@/state/editor/hooks';
import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
const AddNodeStyled = styled.form`
  padding: 4px 16px;
  display: flex;
  justify-items: center;
  align-items: center;
  gap: 8px;
  input {
    background-color: transparent;
    display: block;
    border: 1px solid ${({ theme }) => theme.colors.text.text2};
    padding: 4px;
    outline: 0;
    width: calc(100% - 10px);
    max-width: 100%;
    color: ${({ theme }) => theme.colors.text.text1};
  }

  img {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
`;

export interface IAddNode {
  path: string;
  level: number;
}
const AddNode = ({ path, level }: IAddNode) => {
  const [name, setName] = useState('');
  const { addNodeData, addNode, setAddNodeData } = useAddNode();
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name) {
      addNode(`${path ? path + '/' : path}${name}`);
      setName('');
    }
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [addNodeData.isProcessing, addNodeData.rootPath, path]);

  if (addNodeData.isProcessing && addNodeData.rootPath === path) {
    return (
      <AddNodeStyled
        style={{
          paddingLeft: level * 8 + 16 + 'px'
        }}
        onSubmit={onSubmit}
      >
        <img
          src={
            addNodeData.type === 'folder' ? '/icons/icon-folder.svg' : '/icons/icon-file-code.svg'
          }
        />
        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={onChange}
          onBlur={() =>
            setAddNodeData({
              ...addNodeData,
              isProcessing: false
            })
          }
        />
      </AddNodeStyled>
    );
  }
};
export default AddNode;
