import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import {
  useGetProductDetailsQuery,
  useGetProductAttrsQuery,
} from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";
import Meta from "../components/Meta";

const ProductScreen = () => {
  const { id: variant_id } = useParams();
  console.log("variant_id: ", variant_id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(variant_id);
  const [qty, setQty] = useState(1);

  const {
    data: attrs,
    isLoading_,
    error_,
  } = useGetProductAttrsQuery(variant_id);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading || isLoading_ ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.title} />{" "}
          {/* to display the product name in the tab */}
          <Row>
            <Col md={6}>
              <Image
                src="https://csg1003200203c04e96.blob.core.windows.net/ecom-blob/New-Odyssey-Ark-2nd_1440x640_PC-NoText.webp"
                alt={product.title}
                fluid
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item style={{ backgroundColor: "orange" }}>
                  <h3>{product.title}</h3>
                  <h4>{product.variant_title}</h4>
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: "rgb(255, 148, 0)" }}>
                  <strong>Price</strong> ${product.price}
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: "rgb(255, 148, 0)" }}>
                  <strong>SKU:</strong> {product.sku}
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: "rgb(255, 148, 0)" }}>
                  <strong>Weight:</strong> {product.weight}
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: "rgb(255, 148, 0)" }}>
                  <strong>Description:</strong> {product.description}
                </ListGroup.Item>
              </ListGroup>

              <h4 style={{ color: "white", marginTop: "50px" }}>Attributes</h4>
              {attrs && (
                <ListGroup variant="flush">
                  {attrs.map((attr) => (
                    <ListGroup.Item
                      key={attr.id}
                      style={{ backgroundColor: "rgb(255, 148, 0)" }}
                    >
                      <strong>{attr.attr_key}:</strong> {attr.attr_value} (
                      <i>{attr.attr_type}</i>)
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
              {!attrs && <h4>No Attributes</h4>}
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item
                    style={{ backgroundColor: "rgb(255, 148, 0)" }}
                  >
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={{ backgroundColor: "rgb(255, 148, 0)" }}
                  >
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item
                      style={{ backgroundColor: "rgb(255, 148, 0)" }}
                    >
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item style={{ backgroundColor: "orange" }}>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
