import React from 'react';
import styled, { css } from 'styled-components';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';

const Wrapper = styled.div`
  width: 300px;
  padding: 1rem 1rem 0 1rem;
  &:last-child {
    padding-bottom: 1rem;
  }
`;

const SliderContainer = styled.div`
  margin: 0.5rem 0;
`;

const Label = styled.label`
  padding-bottom: 1rem;
`;

const handleStyle = color => ({
  background: color,
  border: 'none',
  height: '25px',
  width: '25px',
  marginTop: '-10px',
});

const trackStyle = color => ({
  background: color,
});

const railStyle = color => ({
  background: color,
});

export default function Slider({ value, min, max, onChange, label, handleColor, railColor }) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <SliderContainer>
        <Slider
          handleStyle={handleStyle(handleColor)}
          trackStyle={trackStyle(railColor)}
          railStyle={railStyle(railColor)}
          value={value}
          min={min}
          max={max}
          onChange={onChange}
        />
      </SliderContainer>
    </Wrapper>
  );
}
