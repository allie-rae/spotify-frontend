import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
    background-color: black;
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    font-family: 'Roboto';
    font-weight: 900;
    width: 100%;
    box-sizing: border-box;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
    margin: 10px;
    text-transform: uppercase;
`

const NavBar = () => {
    let nav;
  if (localStorage.getItem('token')) {
      let userId = localStorage.getItem('id')
      nav = <StyledNav>
          <StyledLink to={`/songs/${userId}`}>Recommender</StyledLink>
          <StyledLink to={`/`} onClick={() => {
            localStorage.removeItem("token"); 
            window.location.reload(true);
          }}>Logout</StyledLink>
          </StyledNav>
  } else {
      nav = <StyledNav>
      <StyledLink to={`/`}>Home</StyledLink>
      <StyledLink to={`/login`}>Login</StyledLink>
      <StyledLink to={`/register`}>Register</StyledLink>
      </StyledNav>
      }
    return (
        <header>
            {nav}
        </header>
    )
}

export default NavBar;