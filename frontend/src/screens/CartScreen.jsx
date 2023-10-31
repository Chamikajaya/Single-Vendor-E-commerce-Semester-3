import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import "./cart.css";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
  };

  const divStyle = {
    overflow: "hidden",
    width: "100%",
    maxHeight: "100px",
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px", color: "white" }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message style={{ color: "white" }}>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item
                key={item.variant_id}
                style={{
                  background: "rgba(0, 0, 0, 0.7)",
                  marginBottom: "0",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.355)",
                }}
              >
                <Row style={{ marginBottom: "20px" }}>
                  <Col md={2}>
                    <div style={divStyle}>
                      <Image
                        src={item.img}
                        alt={item.variant_title}
                        style={{ borderRadius: "10px" }}
                        fluid
                        rounded
                        style={imgStyle}
                      />
                    </div>
                  </Col>
                  <Col md={3}>
                    <Link
                      to={`/product/${item.variant_id}`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <strong style={{ fontSize: "15px" }}>{item.title}</strong>
                      <p style={{ fontSize: "18px" }}>{item.variant_title}</p>
                    </Link>
                  </Col>
                  <Col md={2}>
                    <p
                      style={{
                        fontSize: "20px",
                        color: "white",
                        fontWeight: "700",
                      }}
                    >
                      ${item.price}
                    </p>
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.quantity).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.variant_id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card style={{ border: "none" }}>
          <ListGroup variant="flush" style={{ border: "none" }}>
            <ListGroup.Item style={{ backgroundColor: "rgb(255, 148, 0)" }}>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item
              style={{ backgroundColor: "orange", border: "none" }}
            >
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
