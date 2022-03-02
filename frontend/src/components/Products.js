import styled from "styled-components";
import Product from "./Product";
import { useState, useEffect } from 'react'
import axios from 'axios'



const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = () => {

  let [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
  },[])
  
  const getProducts = async() => {
    await axios.get('/api/product')
    .then(res => {
      setProducts(res.data)
    })
    .catch(error => console.log(error.message))
  }

  return (
    <Container>
      {products.map((product) => {
        return <Product item={product} key={product.id} />
      })}
    </Container>
  );
};

export default Products;