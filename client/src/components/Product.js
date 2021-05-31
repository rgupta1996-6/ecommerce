import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Picture2 from "../images/alex-knight-j4uuKnN43_M-unsplash.jpg"

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to="/">
        <Card.Img src={Picture2} variant='top' />
      </Link>

      <Card.Body>
        <Link to="/">
          <Card.Title as='div'>
            <strong>Laptop</strong>
          </Card.Title>
        </Link>

        {/* <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text> */}

        <Card.Text as='h3'>$200</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
