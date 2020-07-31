import React, { useState, useEffect } from 'react';
import  { withFormik, Form, Field } from 'formik'; 
import * as yup from 'yup';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';
import guitar from './fire-guitar-pic.jpg';

const StyledForm = styled(Form)`
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    `

const StyledField = styled(Field)`
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
const StyledP = styled.p`
    color: #FFD500;
    font-family: 'Roboto';
    font-size: 0.7rem;
    margin: 0;
    padding: 0;
`

const Register2 = (props) => {
    const [members, setMembers] = useState([]);
    useEffect(() => {
        if (props.status) {
            setMembers([...members, props.status])
            let userId = localStorage.getItem('id')
            props.history.push(`/songs/${userId}`)
            window.location.reload(false);
        }
    }, [props.status])

return (
    <StyledDiv style={{ backgroundImage:`url(${guitar})` }}>
        <StyledForm className="signup-form">
            <i className="fas fa-palette"></i>
            <Title>Register</Title>
            <SubTitle>Join the Community</SubTitle>
            {props.touched.username && props.errors.username && <StyledP className="error">{props.errors.username}</StyledP>}
            <StyledField 
                name="username"
                type="text"
                placeholder="Username"
                />
            {props.touched.password && props.errors.password && <StyledP className="error">{props.errors.password}</StyledP>}
            <StyledField
                name="password"
                type="password"
                placeholder="Password"
                />
            <StyledButton type="submit">Register</StyledButton>
        </StyledForm>
    </StyledDiv>
)
}

export default withFormik({
    mapPropsToValues: (values) => {
        return{
            username: values.username || '',
            password: values.password || '',
        }
    },
    validationSchema: yup.object().shape({
        username: yup
          .string()
          .min(1)
          .max(40)
          .required("Username is required."),
        password: yup
          .string()
          .min(6)
          .max(40)
          .required("Password is required")
      }),
      handleSubmit: (values, { setStatus }) => {
        axiosWithAuth()
          .post('/auth/register', values)
          .then(response => {
              setStatus(response.data)
              localStorage.setItem('token', response.data.token);
              let userId = response.data.id
          })
          .catch(err => {
              console.log("Error:", err)
          })
      }
})(Register2);