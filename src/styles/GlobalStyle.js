import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Sofia Pro', sans-serif;
    font-weight: 300;
    color: hsl(0, 100%, 100%);
  }

  html, body {
    height: 100%;
  }

  body {
    scroll-behavior: smooth;
  }
`;
