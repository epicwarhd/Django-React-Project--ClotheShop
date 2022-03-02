import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { chooseColor, chooseSize, chooseQuantity } from '../redux/productSlice';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
  border: ${(props) => props.chosen === props.color && '4px solid red'};
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const ButtonRemove = styled.button`
  border: none;
  background-color: white;
  cursor: pointer;
`

const Product = () => {

  const { id } = useParams()

  const [product, setProduct] = useState([])
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState('default')
  const [colorChosen, setColorChosen] = useState('')

  const dispatch = useDispatch()
  const owner = useSelector(state => state.auth)
  const productNow = useSelector((state) => state.product)
  
  const getProduct = () => {
     axios.get(`/api/product/${id}`)
    .then( res => {
      setProduct(res.data)
      setSizes(res.data.size)
      setColors(res.data.color)
    })
    .catch(error => console.log(error))
  }

  useEffect(() => {
    getProduct()
  }, [id])

  const handleChooseColor = (color) => {
    dispatch(chooseColor({color: color}))
    setColorChosen(color)
  }

  const handleChooseSize = (e) => {
    dispatch(chooseSize({size: e.target.value}))
    setSize(e.target.value)
  }

  useEffect(() => {
    setQuantity(productNow.quantity)
  }, [productNow.quantity])

  const addToCart = (quantity, color, size, product, cart) => {
    axios
      .post('/api/cartitem/', {quantity, color, size, product, cart})
      .catch(error => console.log(error))
  }

  const handleSubmit = () => {
    if(productNow.color === null || productNow.size === null){
      console.log('Need choose size or color')
    }else{
      addToCart(productNow.quantity, productNow.color, productNow.size, id, owner.cart)
    }
  }

  return (
    
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>
            {product.desc}
          </Desc>
          <Price>${product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {colors.map((color, index) => {
                return <FilterColor key={index} onClick={() => handleChooseColor(color)}  color={color} chosen={colorChosen}/>
              })}
            </Filter>
            <Filter>
              <FilterTitle >Size</FilterTitle>
                <FilterSize value={size} onChange={(e) => handleChooseSize(e)}>

                <FilterSizeOption value='default' disabled hidden>Please choose your size</FilterSizeOption>
                {sizes.map((size, index) => {
                  return <FilterSizeOption key={index}>{size}</FilterSizeOption>
                })}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <ButtonRemove disabled={quantity <= 1}  onClick={() => dispatch(chooseQuantity({quantity: quantity - 1}))}><RemoveIcon/></ButtonRemove>
              <Amount>{quantity}</Amount>
              <AddIcon  onClick={() => dispatch(chooseQuantity({quantity: quantity + 1}))} cursor='pointer'/>
            </AmountContainer>
            <Button onClick={() => handleSubmit()}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
