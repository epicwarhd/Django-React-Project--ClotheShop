import styled from "styled-components";
import {mobile} from "../responsive";
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login, assignCart } from '../redux/authSlice'
import { useNavigate, } from "react-router-dom";
import { useState, useEffect } from 'react'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const FormikForm = {
  display: 'flex',
  flexDirection: 'column',
};

const FormikInput = {
  flex: 1,
  minWidth: '40%',
  margin: '10px 0',
  padding: '10px',
};

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const [message, setMessage] = useState("")
  const [carts, setCarts] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getCarts = () => {
    axios
      .get('/api/cart/')
      .then(res => {
        setCarts(res.data)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getCarts()
  },[])

  const findCart = (carts, id) => {
    carts.map((cart) => {
      if (cart.owner === id){
        dispatch(assignCart({cart: cart.id})) 
      }  
      return cart  
    })  
  }

  const handleLogin = (username,password) => {
    axios
      .post('/api/login/', {username, password})
      .then((res) => {
        dispatch(login({
          token: res.data.access,
          refreshToken: res.data.refresh,
          account: res.data.user,
        }))
        findCart(carts, res.data.user.id)
        navigate('/')
      })
      .catch(error => setMessage(error.response.data.detail.toString()))
  }

  const validate = Yup.object({
    username: Yup.string().trim().required('Username is required'),
    password: Yup.string().trim().required('Password is required')
  })

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Formik
          initialValues={{
            username:"",
            password:""
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            handleLogin(values.username, values.password)
          }}
        >
          {({errors, touched}) => (
            <Form style={FormikForm}>
              <Field style={FormikInput} id='username' name='username' placeholder="username" />
              {errors.username && touched.username  ? (<p style={{color:'red'}}>{errors.username}</p>): null}
              <Field style={FormikInput} id='password' name='password' placeholder="password" type='password' />
              {errors.password && touched.password  ? (<p style={{color:'red'}}>{errors.password}</p>): null}
              <div>{message}</div>
              <Button type='submit' >LOGIN</Button>
              <Link >DO NOT YOU REMEMBER THE PASSWORD?</Link>
              <Link href="/register">CREATE A NEW ACCOUNT</Link>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Container>
  );
};

export default Login;
