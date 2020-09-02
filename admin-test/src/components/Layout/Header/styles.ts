import styled from 'styled-components';

export const Container = styled.div`
    height:60px;
    width:100%;

    background:var(--retweet);
`;

export const Headers = styled.div`
    height:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 40px;
`

export const HeaderLeft = styled.div`
    >span {
        font-size:18px;
        color:var(--primary);
        margin-left:10px;
    }
  
`
export const HeaderRight = styled.div`
    cursor: pointer;
`