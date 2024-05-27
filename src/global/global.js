import { createGlobalStyle } from "styled-components";
import reset from "styled-reset"

const GlobalStyle = createGlobalStyle`

    @font-face {
        font-family: 'Pretendard-Regular';
        src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
    }

    ${reset};
    
    * {
        font-family: 'Pretendard-Regular' !important;
        font-weight: 500;
        box-sizing: border-box;
        text-shadow: 0px 0px 2px rgba(0,0,0,0.1);
        letter-spacing: -0.5px;
        line-height: 1.3;
        text-decoration: none;
        color: #131313;
    }

    button {
        border: none;
    }

`

export default GlobalStyle;