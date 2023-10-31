import { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../slices/cartSlice";
import { useGetPaymentMethodsQuery } from "../slices/ordersApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const PaymentScreen = () => {
  const navigate = useNavigate();

  // Retrieve the cart state using the useSelector hook from Redux
  const cart = useSelector((state) => state.cart);

  // Use optional chaining to access the 'address' property; if 'shippingAddress' is undefined, this will safely return undefined
  const shippingAddress = cart?.shippingAddress;

  // Use the useEffect hook to check if a shipping address is available; if not, redirect to the shipping screen
  useEffect(() => {
    if (!shippingAddress?.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  // Define a state variable for the selected payment method and a function to update it
  const [paymentMethod, setPaymentMethod] = useState(0);

  const dispatch = useDispatch();

  // Function to handle form submission when the user selects a payment method
  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch an action to save the selected payment method to the Redux store
    dispatch(savePaymentMethod(paymentMethod));
    // Navigate to the "placeorder" screen
    navigate("/placeorder");
  };

  const {
    data: paymentMethods,
    isLoading,
    error,
  } = useGetPaymentMethodsQuery();

  // Render the payment screen components
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <FormContainer>
          {/* Display the checkout steps */}
          <CheckoutSteps step1 step2 step3 />
          <h1 style={{ color: "white" }}>Payment Method</h1>
          {/* Create a form for payment method selection with radio buttons */}
          <Form onSubmit={submitHandler} style={{ marginTop: "2rem" }}>
            <Form.Group>
              {/* Label for the radio button group */}
              <Form.Label as="legend" style={{ color: "white" }}>
                Select Method
              </Form.Label>
              <Col>
                {/* Radio button option for PayPal or Credit Card, with its value controlled by the state */}
                {paymentMethods.map((method) => (
                  <Form.Check
                    className="my-2"
                    type="radio"
                    label={method.name}
                    id={method.payment_method_id}
                    name="paymentMethods"
                    value={method.payment_method_id}
                    checked={paymentMethod === method.payment_method_id}
                    onChange={(e) => setPaymentMethod(parseInt(e.target.value))}
                    style={{
                      display: "block",
                      margin: "1rem 0",
                      color: "white",
                    }}
                  ></Form.Check>
                ))}
              </Col>
            </Form.Group>
            {/* Submit button to proceed to the next step in the checkout process */}
            <Button
              type="submit"
              variant="primary"
              style={{ marginTop: "2rem" }}
            >
              Continue
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

// Export the PaymentScreen component for use in other parts of the application
export default PaymentScreen;
