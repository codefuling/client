import { Link } from "react-router-dom";
import styled from "styled-components";


const S = {};

    S.Li = styled.li`
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;

        & .complete {
            text-decoration: line-through;
            color: #6A6EED;
        }

        /* 미디어쿼리 활용방법 */
        @media screen and (max-width: 200px) {
            display: none;
        }

    `;

    // 링크 태그는 라우터 돔에 있기에 받아서 꾸며야한다.
    S.Link = styled(Link)`
        width: 400px;
    `;
    
    S.Title = styled.p`
        font-size: 16px;
        font-weight: 400;
    `;

    S.SubTitle = styled.p`
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 25px 0;

        & span{
            color: #7876F1;
        }
    `;

    S.Wrapper = styled.div`
        display: flex;

        & .update-input{
            width: 250px;
            border: none;
            background-color: #F5F5F5;
            height: 30px;
            border-radius: 10px;
            padding: 0 16px;
        }

    `

    S.Button = styled.button`
        cursor: pointer;
        background: none;
        font-size: 16px;

        & svg.pen path{
            color: #5F81F7;
        };

        & svg.trash path{
            color: #EC6863;
        };

        & svg.check path{
            color: #B965F1
        }

        & svg.exit path{
            color: #B965F1
        }
    `

    S.Input = styled.input`
        width: 100%;
        border: none;
        background-color: #F5F5F5;
        height: 40px;
        border-radius: 10px;
        margin: 0 0 50px 0;
        padding: 0 16px;
        
        &::placeholder {
            color: #b5b5b5;
        }
    `


export default S;