import React from 'react';
import styled from 'styled-components';
import guitar from './fire-guitar-pic.jpg'

const StyledPage = styled.div`
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    background-size: cover;
    background-position: center;
    color: white;
    font-family: 'Roboto';
`

const StyledH1 = styled.h1`
    padding: 5%;
    margin: 0;
`

const LandingPage = () => {
    return(
        <StyledPage style={{ backgroundImage:`url(${guitar})` }}>
            <StyledH1>Song Recommender</StyledH1>
        </StyledPage>
    )
}

export default LandingPage;