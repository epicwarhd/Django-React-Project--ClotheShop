import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useState, useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {
  let [slideIndex, setSlideIndex] = useState(0);
  let [events, setEvents] = useState([])
  let [countEvent, setCountEvent] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    getEvents()
  },[])
  
  const getEvents = async() => {
    await axios.get('/api/event')
    .then(res => {
      setEvents(res.data)
    })
    .catch(error => console.log(error.message))

    await axios.get('/api/event/count_event')
    .then(res => {
      setCountEvent(res.data)
    })
    .catch(error => console.log(error.message))
  }

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : countEvent - 1);
    } else {
      setSlideIndex(slideIndex < countEvent - 1 ? slideIndex + 1 : 0);
    }
  };

  const toProducts = () => {
    navigate('/products')
  }


  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftIcon />
      </Arrow>

      <Wrapper slideIndex={slideIndex}>
        {events.map((event) => (
          <Slide bg='fcf1ed' key={event.id}>
            <ImgContainer>
              <Image src={event.img} />
            </ImgContainer>

            <InfoContainer>
              <Title>{event.title}</Title>
              <Desc>{event.desc}</Desc>
              <Button onClick={toProducts}>SHOW NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>

      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;