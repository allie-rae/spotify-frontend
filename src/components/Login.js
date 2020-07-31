import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';
import guitar from './fire-guitar-pic.jpg';

const StyledForm = styled.form`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    `

const StyledField = styled.input`
    display: block;
    height: 50px;
    width: 318px;
    margin: 18px 0px;
    border-radius: 10px;
    border: 1px solid lightgrey;
    padding: 15px;
    box-sizing: border-box;
    background-color: rgb(242,242,242);
    font-family: 'Roboto';
    ::placeholder {
        color: rgb(24,38,40, 1);
        font-family: 'Roboto';
    }
`

const Title = styled.h1`
    font-size: 1.5rem;
    color: rgb(242,242,242);
    font-family: 'Roboto';
    text-align: center;
    font-weight: 700;
`

const SubTitle = styled.h2`
    font-size: 0.9rem;
    margin-bottom: 50px;
    color: white;
    font-weight: 500;
    font-family: 'Roboto';
    text-align: center;
`

const StyledButton = styled.button`
    height: 50px;
    width: 318px;
    margin: 30px 0;
    border-radius: 5px;
    background-color: white;
    color: black;
    text-transform: uppercase;
    font-weight: 900;
    font-family: 'Roboto';
    font-size: 1rem;
    border: 0;
`

const StyledDiv = styled.div`
    height: 100vh;
    width: 100%;
`

const Login = (props) => {

    const [formData, setFormData] = useState({
        credentials: {
            username: '',
            password: ''
        },
        isFetching: false
    })

    const onChange = (e) => {
        setFormData({
            ...formData,
            credentials: {
                ...formData.credentials,
                [e.target.name]: e.target.value
            }
        })
    }

    const login = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .post('/auth/login', formData.credentials)
            .then(res => {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('id', res.data.id)
                let userId = res.data.id
                props.history.push(`/songs/${userId}`)
                window.location.reload(false);
            })
            .catch(err => console.log(err))
    }

    return (
        <StyledDiv style={{ backgroundImage:`url(${guitar})` }}>
        <StyledForm onSubmit={login}>
            <Title>Login</Title>
            <SubTitle>Welcome back</SubTitle>
            <StyledField
                type="text"
                name="username"
                value={formData.credentials.username}
                placeholder="Username"
                onChange={onChange}
                className="auth-input"
            />
            <StyledField
                type="password"
                name="password"
                value={formData.credentials.password}
                placeholder="Password"
                onChange={onChange}
                className="auth-input"
            />
            <StyledButton className="auth-button">
                Log in
            </StyledButton>
        </StyledForm>
        </StyledDiv>
    )
}

export default Login;