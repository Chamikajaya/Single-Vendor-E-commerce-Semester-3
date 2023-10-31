import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./product.css";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded product_card">
      <Link to={`/product/${product.variant_id}`}>
        <Card.Img
          className="product-image"
          src="https://csg1003200203c04e96.blob.core.windows.net/ecom-blob/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-hero-220907.jpg.landing-big_2x.jpg"
          variant="top"
        />
      </Link>

      <Card.Body className="product-body">
        <Link to={`/product/${product.variant_id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.title}</strong>
          </Card.Title>
          <Card.Text as="h4" className="product-title">
            {product.variant_title}
          </Card.Text>
        </Link>

        {/* <Card.Text as="div">
          <Rating value={product.rating} />
        </Card.Text> */}
      </Card.Body>
      <Card.Text as="h5" className="product-price">
        $ {product.price}
      </Card.Text>
    </Card>
  );
};

export default Product;
