import styled from "styled-components";
import { mobile } from "../responsive";
import * as Yup from 'yup'
import axios from 'axios'
import { Formik, Field, Form } from 'formik'
import { login } from '../redux/authSlice'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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

const FormikField = {
  flex: 1,
  minWidth: '40%',
  margin: '20px 10px 0px 0px',
  padding: '10px',
};

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const createCart = (owner) => {
    axios
      .post('/api/cart/', {owner})
      .then(() => {
        console.log(owner)
      })
      .catch(error => console.log(error))
  }

  const handleRegister = (username, password, email) => {
    axios
      .post('/api/register/', {username, email, password})
      .then((res) => {
        dispatch(login({
          token: res.data.token,
          refreshToken: res.data.refresh,
          account: res.data.user,
        }))
        createCart(res.data.user.id)
        navigate('/')
      })
      .catch(error => console.log(error))
  }

  



  const validate = Yup.object({
    username: Yup.string().trim().required('Username is required').min(6, 'Username must be at least 6 characters'),
    password: Yup.string().trim().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirm_password : Yup.string().trim().oneOf([Yup.ref('password'), null], 'Password must match').required('Confirm password is required'),
    email: Yup.string().email('Email is invalid').trim().required('Email is required'),
  })

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Formik 
          initialValues= {{
            username:"",
            email:"",
            password:"",
            confirm_password:""
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            handleRegister(values.username, values.password, values.email)
          }}
        >
          {({errors, touched}) => (
            <Form style={FormikForm}>
              <Field style={FormikField} id='username' name='username' placeholder="username" />
              {errors.username && touched.username  ? (<p style={{color:'red'}}>{errors.username}</p>): null}
              <Field style={FormikField} id='email' name='email' placeholder="email" />
              {errors.email && touched.email  ? (<p style={{color:'red'}}>{errors.email}</p>): null}
              <Field style={FormikField} id='password' name='password' placeholder="password" type='password' />
              {errors.password && touched.password  ? (<p style={{color:'red'}}>{errors.password}</p>): null}
              <Field style={FormikField} id='confirm_password' name='confirm_password' placeholder="confirm password" type='password'/>
              {errors.confirm_password && touched.confirm_password  ? (<p style={{color:'red'}}>{errors.confirm_password}</p>): null}
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <Button type='submit'>CREATE</Button>
            </Form>
          )}
          
        </Formik>
      </Wrapper>
    </Container>
  );
};

export default Register;
