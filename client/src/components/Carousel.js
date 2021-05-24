import { Carousel } from 'antd';
import Image from '../images/hector-martinez-EG49vTtKdvI-unsplash.jpg'

const contentStyle = {
  height: '300px',
  color: 'white',
  lineHeight: '300px',
  textAlign: 'center',
  background: 'lightblue',
  backgroundImage: 'url(' + Image + ')',
  backgroundSize: 'cover',
};

const displayCarousel = () => {
return(
    <>
  <Carousel autoplay>
    <div>
      <h3 style={contentStyle}>Best Products</h3>
    </div>
    <div>
      <h3 style={contentStyle}>Best Prices</h3>
    </div>
    <div>
      <h3 style={contentStyle}>Huge Discounts</h3>
    </div>
    <div>
      <h3 style={contentStyle}>Genuine Products</h3>
    </div>
  </Carousel>,
  </>
);
}

export default displayCarousel;