import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./product.css";
import Rating from "./Rating";

const Product = ({ product }) => {
  const imgStyle = {
    width: "100%",
    height: "100%",
  };

  const divStyle = {
    overflow: "hidden",
    width: "100%",
    maxHeight: "170px",
  };

  return (
    <Card className="my-3 p-3 rounded product_card">
      <Link
        to={`/product/${product.variant_id}`}
        style={{ textDecoration: "none" }}
      >
        <div style={divStyle}>
          <Card.Img
            className="product-image"
            src={product.img}
            variant="top"
            style={imgStyle}
          />
        </div>
      </Link>

      <Card.Body className="product-body">
        <Link
          to={`/product/${product.variant_id}`}
          style={{ textDecoration: "none" }}
        >
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
