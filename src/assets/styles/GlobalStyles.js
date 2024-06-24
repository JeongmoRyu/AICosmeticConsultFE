import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle }; // prettier 실행이 안되어 생성함

const GlobalStyles = styled.createGlobalStyle`
  :root {
    --primary: #316094;
    --primary1-light: #e2edfc;
    --primary2: #dfb4ca;
    --primary2-light: #f1dfe8;
    --black: #111;
    --white: #fff;
    --gray: #949ca5;
    --darkGray: #5b636d;
    --lightGray: #f0f0f0;
    --bg: #f4f6f8;
    --bgContent: #d0d9e3;
    --bgContentHover: #d0d9e391;
    --error: #f00;
    --minWidth: 1100px;
    --headerHeight: 60px;
  }

  // reset
  html,
  body,
  div,
  h1,
  h2,
  h3,
  h4,
  ul,
  ol,
  li,
  address,
  p,
  button,
  input,
  textarea,
  select,
  table,
  th,
  td {
    margin: 0;
    padding: 0;
  }
  html,
  body {
    -webkit-text-size-adjust: none;
  }
  body {
    overflow-x: auto;
    overflow-y: hidden;
  }
  body,
  h1,
  h2,
  h3,
  h4,
  button,
  textarea,
  input,
  select {
    font-family: 'Pretendard', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.2;
    color: #111;
  }
  ol,
  ul,
  li {
    list-style: none;
  }
  img {
    border: 0 none;
  }
  button {
    border: 0 none;
    background: transparent;
    cursor: pointer;
  }
  img,
  button {
    vertical-align: top;
  }
  header,
  footer,
  section,
  article,
  aside,
  nav,
  hgroup,
  details,
  menu,
  figure,
  figcaption {
    display: block;
  }
  em,
  address,
  strong {
    font-style: normal;
    font-weight: 400;
  }
  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }

  .screen_hide {
    overflow: hidden;
    font-size: 0;
    line-height: 0;
    text-indent: 100%;
  }
`;
export default GlobalStyles;
