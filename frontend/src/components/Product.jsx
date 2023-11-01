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
    <Card className="product_card">
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
          <Card.Text as="h5" className="product-title">
            <div class="category-badge">
              <span class="category-name">{product.parent_name}</span>
            </div>
            <div class="category-badge">
              <span class="category-name">{product.child_name}</span>
            </div>
          </Card.Text>
        </Link>

        {/* <Card.Text as="div">
          <Rating value={product.rating} />
        </Card.Text> */}
      </Card.Body>
      <div className="product-price">
        ${product.price}
        {/* <button class="add-to-cart-button">Add to Cart</button> */}
      </div>
    </Card>
  );
};

export default Product;
