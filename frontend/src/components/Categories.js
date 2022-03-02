import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { mobile } from "../responsive";
import { useState, useEffect } from 'react'
import axios from 'axios'

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}
`;

const Categories = () => {
  let [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories()
  },[])
  
  const getCategories = async() => {
    await axios.get('/api/category')
    .then(res => {
      setCategories(res.data)
    })
    .catch(error => console.log(error.message))
  }

  return (
    <Container>
      {categories.map((category) => (
        <CategoryItem item={category} key={category.id} />
      ))}
    </Container>
  )
}


export default Categories