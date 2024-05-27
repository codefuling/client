import styled, { css } from "styled-components"

const variantCSS = {
    black : css`
        background-color: ${({theme})=>theme.PALETTE.background["gray"]};
    `
}

const shapeCSS = {

    default: css``,
    small: css`
        border-radius: 10px;
    `,
    large: css`
        border-radius: 20px;
    `,
    big: css`
        border-radius: 30px;
    `,
    round: css`
        border-radius: 50%;
    `
}

const sizeCSS = {

    small: css`
        width: 64px;
        height: 32px;
        padding: 16px 20px;
    `,
    medium: css`
        width: 96px;
        height: 48px;
        padding: 16px 20px;
    `,
    large: css`
        width: 128px;
        height: 64px;
        padding: 16px 20px;
    `,

    full: css`
        width: 100%;
        aspect-ratio: 8 / 1;
        padding: 16px 20px;
`,
}

const colorCSS = {
    white: css`
        color: #fff;
    `,
    black: css`
        color : #131313;
    `
}

const Input = styled.input`

    border: none;
    ${({variant}) => variantCSS[variant]}
    ${({shape}) => shapeCSS[shape]}
    ${({size}) => sizeCSS[size]}
    ${({color}) => colorCSS[color]}
	
`

export default Input;