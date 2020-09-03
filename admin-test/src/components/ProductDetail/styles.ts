import styled from 'styled-components';

export const Container = styled.div`

`;

export const Detail = styled.div`
    display:flex;
    align-items:center;
    height:50px;
    >span:first-child{
        color:var(--primary);
        font-size:17px;
        margin-right:15px;
        font-weight:bold;
    }
    >span{
        color:var(--gray);
    }

`

export const Images = styled.div`
    width:120px;
    height:120px;
    > img{
        width:100%;
        height:100%;
    }

`
