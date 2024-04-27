import { IMAGE_REGEX, VIDEO_REGEX } from '@/constants/regex';
import styled from '@emotion/styled';
import React from 'react';

export interface IBinaryFile {
  path: string;
  blob: string;
}
const BinaryFileStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
  width: 100%;
  height: 100%;
  img,
  video {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }

  .noSupport {
    color: ${({ theme }) => theme.colors.text.text1};
  }
`;
const BinaryFile = ({ path, blob }: IBinaryFile) => {
  const render = () => {
    if (IMAGE_REGEX.test(path)) {
      return <img src={blob} />;
    }

    if (VIDEO_REGEX.test(path)) {
      return <video src={blob} />;
    }

    return <div className="noSupport">No support displaying file</div>;
  };

  return <BinaryFileStyled>{render()}</BinaryFileStyled>;
};

export default BinaryFile;
