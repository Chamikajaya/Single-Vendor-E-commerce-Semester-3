import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Badge,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../components/Loader";
import {
  useCreateOrderMutation,
  useGetPaymentMethodQuery,
  useGetCityQuery,
  useGetDeliveryMethodQuery,
} from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address || !cart.deliveryMethod) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [
    cart.paymentMethod,
    cart.shippingAddress.address,
    cart.deliveryMethod,
    navigate,
  ]);

  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        deliveryMethod: cart.deliveryMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res[0][0].order_id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  const { data: paymentMethod, isLoading_1 } = useGetPaymentMethodQuery(
    cart.paymentMethod
  );

  const { data: city, isLoading_2 } = useGetCityQuery(
    cart.shippingAddress.city
  );
  const { data: deliveryMethod, isLoading_3 } = useGetDeliveryMethodQuery(
    parseInt(cart.deliveryMethod.deliveryMethod)
  );

  return (
    <>
      {isLoading || isLoading_1 || isLoading_2 || isLoading_3 ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <CheckoutSteps step1 step2 step3 step4 />
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  {isLoading_2 ? (
                    "Loading..."
                  ) : (
                    <>
                      <h6>
                        <strong>Address:</strong>
                        {cart.shippingAddress.address}
                      </h6>
                      <h6>
                        <strong>City:</strong> {}
                      </h6>
                      <h6>
                        <strong>Zip Code:</strong> {}
                      </h6>
                    </>
                  )}
                </ListGroup.Item>

                {/* <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <strong>Method: </strong>
                  <Badge
                    bg="primary"
                    style={{
                      fontSize: "1rem", // Adjust the font size to make the badge larger
                      padding: "0.5rem 1rem", // Adjust padding to make the badge larger
                    }}
                  >
                    {isLoading_1 ? "Loading..." : { paymentMethod }}
                  </Badge>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Delivery Method</h2>
                  <strong>Method: </strong>
                  <Badge
                    bg="primary"
                    style={{
                      fontSize: "1rem", // Adjust the font size to make the badge larger
                      padding: "0.5rem 1rem", // Adjust padding to make the badge larger
                    }}
                  >
                    {isLoading_3 ? "Loading..." : { deliveryMethod }}
                  </Badge>
                </ListGroup.Item> */}

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {cart.cartItems.length === 0 ? (
                    <Message style={{ color: "white" }}>
                      Your cart is empty
                    </Message>
                  ) : (
                    <ListGroup variant="flush">
                      {cart.cartItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.img}
                                alt={item.title}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link
                                to={`/product/${item.variant_id}`}
                                style={{ textDecoration: "none" }}
                              >
                                <h5>{item.variant_title}</h5>
                              </Link>
                            </Col>
                            <Col md={4}>
                              <strong style={{ fontSize: "20px" }}>
                                {item.qty} x ${item.price} = $
                                {(item.qty * (item.price * 100)) / 100}
                              </strong>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${cart.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${cart.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${cart.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>
                        <h5 style={{ fontSize: "28px", weight: "900" }}>
                          ${cart.totalPrice}
                        </h5>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {error && (
                      <Message variant="danger">{error.data.message}</Message>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn-block"
                      disabled={cart.cartItems === 0}
                      onClick={placeOrderHandler}
                    >
                      Place Order
                    </Button>
                    {isLoading && <Loader />}
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

export default PlaceOrderScreen;
