import React from 'react';
import styled from '@emotion/styled';
import { useEditingFile, useSelectedFile } from '@/state/editor/hooks';

const FileTabsStyled = styled.div`
  background-color: ${({ theme }) => theme.colors.bg.bg1};
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.bg.bg2}; */
  height: 40px;
  display: flex;
  align-items: end;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  .fileWrap {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.bg.bg2};
    img {
      width: 20px;
      height: 20px;
    }
  }
  .fileTabs {
    display: flex;
    align-items: end;
    color: ${({ theme }) => theme.colors.text.text2};
    .fileTab {
      font-size: 14px;
      height: 36px;
      display: flex;
      align-items: center;
      position: relative;
      /* padding: 8px; */
      padding: 0 20px 0 12px;
      cursor: pointer;

      .close {
        border-radius: 2px;
        width: 16px;
        height: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateY(-50%);
        position: absolute;
        top: 50%;
        right: 2px;
        display: none;
        background-color: transparent;
        outline: 0;
        border: 0;
        &:disabled {
          cursor: not-allowed;
        }
        img {
          width: 14px;
          height: 14px;
          transform: rotate(45deg);
        }
      }

      &:hover {
        background-color: ${({ theme }) => theme.colors.bg.bg35};
        .close {
          display: flex;
          &:hover {
            background-color: ${({ theme }) => theme.colors.bg.bg2};
          }
        }
      }

      &.selected {
        background-color: ${({ theme }) => theme.colors.bg.bg3};
        color: ${({ theme }) => theme.colors.text.text1};
        .close {
          display: flex;
        }
      }
      span {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }
`;
const FileTabs = () => {
  const { editingFiles, setEditingFiles } = useEditingFile();
  const { selectedFile, setSelectedFile } = useSelectedFile();

  const handleCloseFile = (path: string) => {
    const newEditingFiles = editingFiles.filter((f) => f !== path);
    if (selectedFile?.path === path) {
      const index = editingFiles.findIndex((f) => f === path);
      if (index < newEditingFiles.length) {
        setSelectedFile(newEditingFiles[index]);
      } else if (index > 0) {
        setSelectedFile(newEditingFiles[index - 1]);
      } else {
        setSelectedFile(null);
      }
    }
    setEditingFiles(newEditingFiles);
  };

  return (
    <FileTabsStyled>
      <div className="fileWrap">
        <img src="/icons/icon-file-wrap.svg" alt="" />
      </div>
      <div className="fileTabs">
        {editingFiles.map((path) => (
          <div
            onClick={() => setSelectedFile(path)}
            key={path}
            className={`fileTab ${selectedFile?.path === path && 'selected'}`}
          >
            <span>{path.split('/').pop()}</span>
            <button
              className="close"
              // disabled={editingFiles.length === 1}
              onClick={(event) => {
                event.stopPropagation();
                handleCloseFile(path);
              }}
            >
              <img src="/icons/icon-add.svg" alt="" />
            </button>
          </div>
        ))}
      </div>
    </FileTabsStyled>
  );
};

export default FileTabs;
