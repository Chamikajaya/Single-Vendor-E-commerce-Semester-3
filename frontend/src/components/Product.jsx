import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product.variant_id}`}>
        <Card.Img
          src="https://csg1003200203c04e96.blob.core.windows.net/ecom-blob/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-hero-220907.jpg.landing-big_2x.jpg"
          variant="top"
        />
      </Link>

      <Card.Body>
        <Link to={`/product/${product.product_id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.title}</strong>
          </Card.Title>
          <Card.Text as="h3">{product.variant_title}</Card.Text>
        </Link>

        {/* <Card.Text as="div">
          <Rating value={product.rating} />
        </Card.Text> */}

        <Card.Text as="h4">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
