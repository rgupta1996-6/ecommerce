import React from 'react';
import NavHeader from '../components/NavHeader';
import Carousel from '../components/Carousel';
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product';
import Meta from '../components/Meta';

const Home = () => {
    return (
        <>
            <Meta/>
            <NavHeader/>
            <Carousel/>
            <div style={{padding:"30px"}}>
            <h2>Latest Products</h2>
            <Row>
           
              <Col key="1" sm={12} md={6} lg={3} xl={3}>
                <Product />
              </Col>

              <Col key="2" sm={12} md={6} lg={3} xl={3}>
                <Product  />
              </Col>

              <Col key="3" sm={12} md={6} lg={3} xl={3}>
                <Product  />
              </Col>

              <Col key="4" sm={12} md={6} lg={3} xl={3}>
                <Product  />
              </Col>
          
          </Row>
          </div>
          {/* <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          /> */}
        </>
    )
}

export default Home;