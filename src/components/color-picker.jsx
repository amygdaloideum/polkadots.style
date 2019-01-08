import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { ChromePicker } from 'react-color';

const Swatch = styled.div`
  padding: 5px;
  margin-top: 5px;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  width: 40px;
  height: 40px;
  @media (min-width: 800px) {
    width: 30px;
    height: 30px;
  }
  display: inline-block;
  cursor: pointer;
  ${props => css`
    background: ${props.color};
  `}
`;

const SwatchContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 0 1rem;
`;

const Popover = styled.div`
  position: absolute;
  z-index: 2;
`;

const Cover = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

export default function ColorPicker({ color, onChange, label }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <SwatchContainer>
        <label>{label}</label>
        <Swatch color={color} onClick={() => setShow(true)} />
      </SwatchContainer>
      {show ? (
        <Popover>
          <Cover onClick={() => setShow(false)} />
          <ChromePicker color={color} onChange={c => onChange(c.hex)} />
        </Popover>
      ) : null}
    </div>
  );
}
