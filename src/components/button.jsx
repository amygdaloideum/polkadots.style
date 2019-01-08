import React from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
  border: 1px solid grey;
  padding: .5rem 1rem;
  border-radius: 6px;
  background: transparent;
  color: white;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
`;

export default function button(props) {
  return <Button {...props} />;
}
