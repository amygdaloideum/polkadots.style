import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import randomColor from 'randomcolor';
import color from 'color';
import 'minireset.css';
import './style.css';

import useWindowSize from './hooks/window-resize';
import ColorPicker from './components/color-picker';
import Slider from './components/slider';
import Button from './components/button';
import draw from './draw';

import presets from './data/presets';

const Header = styled.header`
  display: flex;
  flex-direction: column;
  color: white;
  @media (min-width: 800px) {
    flex-direction: row;
    justify-content: space-between;
  }
  ${props => css`
    background: ${props.bgc || 'green'};
  `}
`;

const Title = styled.h1`
  height: 75px;
  font-family: 'Kalam', cursive;
  font-size: 3rem;
  margin: 0px 20px;
`;

const Controls = styled.div`
  position: absolute;
  top: 75px;
  left: 0;
  right: 0;
  background: #333333;
  @media (min-width: 800px) {
    position: static;
    display: flex;
  }
  ${props =>
    !props.show &&
    css`
      display: none;
    `}
`;

const Hamburger = styled.i`
  color: white;
  font-size: 2rem;
  display: flex;
  align-items: center;
  padding: 1rem;
  @media (min-width: 800px) {
    display: none;
  }
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  right: 0;
  background: #333333;
  color: grey;
  padding: 0.5rem;
  border-radius: 6px 0 0 0;
  a {
    color: grey;
    &:active {
      color: grey;
    }
  }
`;

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomElement = array => array[Math.floor(Math.random() * array.length)];
const defaultStyle = randomElement(presets);

export default function App() {
  const windowSize = useWindowSize();
  const [dotColor, setDotColor] = useState(defaultStyle.dotColor);
  const [bgColor, setBgColor] = useState(defaultStyle.bgColor);
  const [dotRadius, setDotRadius] = useState(defaultStyle.dotRadius);
  const [dotMargin, setDotMargin] = useState(defaultStyle.dotMargin);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const options = {
      bgColor,
      dotColor,
      dotRadius,
      dotMargin,
    };
    draw(options);
  });

  const randomize = () => {
    setDotColor(randomColor());
    setBgColor(randomColor());
    setDotRadius(randomNumber(10, 200));
    setDotMargin(randomNumber(10, 200));
  };
  //color(form.bgc.value).darken(0.4).hex()
  return (
    <React.Fragment>
      <Header bgc="#333333">
        <div className="flex justify-between">
          <Title>POLKADOTS</Title>
          <Hamburger onClick={() => setShowSettings(!showSettings)} className="fas fa-sliders-h" />
        </div>
        <Controls show={showSettings}>
          <div className="flex">
            <div className="flex items-center ml2">
              <Button onClick={randomize}>randomize</Button>
            </div>
            <ColorPicker label="dot color" color={dotColor} onChange={setDotColor} />
            <ColorPicker label="background" color={bgColor} onChange={setBgColor} />
          </div>
          <Slider
            label="dot size"
            value={dotRadius}
            min={10}
            max={200}
            onChange={setDotRadius}
            handleColor={dotColor}
            railColor={bgColor}
          />
          <Slider
            label="margin"
            value={dotMargin}
            min={10}
            max={200}
            onChange={setDotMargin}
            handleColor={dotColor}
            railColor={bgColor}
          />
        </Controls>
      </Header>
      <canvas id="canvas" width={windowSize.innerWidth} height={windowSize.innerHeight - 75} />
      <Footer>
        Made by <a href="https://github.com/amygdaloideum">Daniel Bornstrand</a>
      </Footer>
    </React.Fragment>
  );
}
