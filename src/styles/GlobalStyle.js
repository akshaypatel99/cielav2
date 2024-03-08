import { createGlobalStyle } from 'styled-components';

import SofiaProRegular from '../assets/fonts/SofiaProRegular.woff2';
import SofiaProLight from '../assets/fonts/SofiaProLight.woff2';
import SofiaProExtraLight from '../assets/fonts/SofiaProExtraLight.woff2';
import SofiaProUltraLight from '../assets/fonts/SofiaProUltraLight.woff2';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'SofiaPro';
    src: local('SofiaProRegular'), url(${SofiaProRegular}) format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'SofiaPro';
    src: local('SofiaProLight'), url(${SofiaProLight}) format('woff2');
    font-weight: 300;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'SofiaPro';
    src: local('SofiaProExtraLight'), url(${SofiaProExtraLight}) format('woff2');
    font-weight: 200;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'SofiaPro';
    src: local('SofiaProUltraLight'), url(${SofiaProUltraLight}) format('woff2');
    font-weight: 100;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'SofiaPro', sans-serif;
    font-weight: 300;
    color: hsl(0, 100%, 100%);
  }

  html, body {
    height: 100%;
  }

  body {
    scroll-behavior: smooth;
  }

  button, input, a {
    background: none;
    border: 1px solid transparent;
  }

  button:focus-visible, a:focus-visible {
    border: 1px solid #ffcc00;
    border-radius: 2px;
  }

  .visually-hidden {
    display: inline-block;
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
  }
`;
