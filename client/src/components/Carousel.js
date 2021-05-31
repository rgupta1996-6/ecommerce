import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Picture from "../images/nicholas-santoianni-bgFB2WJSvLA-unsplash.jpg"
import Picture2 from "../images/onur-binay-VAwj3asivF8-unsplash.jpg"
import Picture3 from "../images/le-buzz-Z44o7s8YkB0-unsplash.jpg"


const displayCarousel = () => {


  return  (
    <Carousel pause='hover' className='bg-light' style={{padding:"30px"}}>
      
        <Carousel.Item key="1">
          <Link to="/">
            <Image src= {Picture} alt="image"  fluid />
            <Carousel.Caption className='carousel-caption'>
              <h1>
               Best Products
              </h1>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        <Carousel.Item key="2">
          <Link to="/">
            <Image src={Picture2} alt="image" fluid />
            <Carousel.Caption className='carousel-caption'>
              <h1>
                Best Prices
              </h1>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        <Carousel.Item key="3">
          <Link to="/">
            <Image src={Picture3} alt="image"  fluid />
            <Carousel.Caption className='carousel-caption'>
              <h1>
              Huge Discounts
              </h1>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
    
    </Carousel>
  )
}

export default displayCarousel



// import { Carousel } from 'antd';
// import Image from '../images/hector-martinez-EG49vTtKdvI-unsplash.jpg'

// const contentStyle = {
//   height: '300px',
//   color: 'white',
//   lineHeight: '300px',
//   textAlign: "center",
//   background: 'lightblue',
//   backgroundImage: 'url(https://source.unsplash.com/random/900x300/?electronics)',
//   backgroundSize: 'cover',
// };

// const displayCarousel = () => {
// return(
//     <>
//   <Carousel autoplay>
//     <div>
//       <h1 style={contentStyle}>Best Products</h1>
//     </div>
//     <div>
//       <h1 style={contentStyle}>Best Prices</h1>
//     </div>
//     <div>
//       <h1 style={contentStyle}>Huge Discounts</h1>
//     </div>
//     <div>
//       <h1 style={contentStyle}>Genuine Products</h1>
//     </div>
//   </Carousel>,
//   </>
// );
// }

// export default displayCarousel;