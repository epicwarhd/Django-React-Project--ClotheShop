import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search'
import {Badge} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { mobile } from "../responsive";
import { useSelector, useDispatch} from 'react-redux'
import { logout } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'


const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px" })}
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px" })}
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })}
`

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`

const Input = styled.input`
    border: none
    ${mobile({ width: "50px" })}
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`

const Logo = styled.h1`
    font-weight: bold;
    cursor: pointer;
    ${mobile({ fontSize: "24px" })}
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: 2, justifyContent: "center" })}
`

const MenuItem = styled.button`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`


const Navbar = () => {
    const user = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    const toLogin = () => {
        navigate('/login')
    }

    const toRegister = () => {
        navigate('/register')
    }

    const toHome = () => {
        navigate('/')
    }

    const toCart = () => {
        navigate('/cart')
    }

    const toToken = () => {
        if(user.token){
            navigate('/cart')
        }else{
            navigate('/products')
        }
    }

    return (
        <Container>    
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input/>
                        <SearchIcon  style={{color:'gray', fontSize:16}} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo onClick={toHome}>My Shop</Logo>
                </Center>
                <Right>
                    {user.account ? 
                    <div>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        <MenuItem onClick={toToken}>Hello {user.account.username}</MenuItem>
                    </div> : 
                    <div>
                        <MenuItem onClick={toRegister}>Register</MenuItem>
                        <MenuItem onClick={toLogin}>Sign in</MenuItem>
                    </div>}

                    <MenuItem>
                        <Badge badgeContent={4} color="primary">
                            <ShoppingCartIcon onClick={toCart} color="action" />
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
