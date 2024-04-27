import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

const AccordionStyled = styled.div`
  .title {
    cursor: pointer;
    position: relative;

    .arrow {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translate(-50%, -50%) rotate(-90deg);
      width: 16px;
      height: auto;
      transition: all 0.25s ease-out;
    }

    &.open {
      .arrow {
        transform: translate(-50%, -50%) rotate(0);
      }
    }
  }

  .content {
    /* padding-top: 4px; */
    /* padding-left: 20px; */
    height: 0;
    overflow: hidden;
    transition: height 0.1s linear;
  }
`;
export interface IAccordion {
  open?: boolean;
  children: ReactNode;
  title: ReactNode;
}
const Accordion = ({ open, children, title }: IAccordion) => {
  const [isActive, setIsActive] = useState(open);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) {
      return;
    }
    if (isActive) {
      // const height = contentRef.current?.scrollHeight;
      contentRef.current.style.height = `auto`;
    } else {
      contentRef.current.style.height = `0px`;
    }
  }, [isActive]);

  useEffect(() => {
    if (open) {
      setIsActive(open);
    }
  }, [open]);

  return (
    <AccordionStyled>
      <div className={`title ${isActive && 'open'}`} onClick={() => setIsActive(!isActive)}>
        {title}
        <img className="arrow" src="/icons/icon-arrow.svg" alt="" />
      </div>
      <div className="content" ref={contentRef}>
        {children}
      </div>
    </AccordionStyled>
  );
};

export default Accordion;
