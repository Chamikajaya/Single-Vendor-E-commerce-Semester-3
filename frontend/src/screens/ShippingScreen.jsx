import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress, saveDeliveryMethod } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import {
  useGetCitiesQuery,
  useGetDeliveryMethodsQuery,
} from "../slices/ordersApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

// Define a functional component named ShippingScreen
const ShippingScreen = () => {
  // Retrieve the shipping address from the Redux store
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // Initialize state variables for address, city, postal code, and country
  const [address, setAddress] = useState(shippingAddress?.address || ""); // question mark (?) is used to check if shippingAddress is null or not
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [deliveryMethod, setDeliveryMethod] = useState(0);
  //   const [postalCode, setPostalCode] = useState("");

  //   const [postalCode, setPostalCode] = useState(
  // shippingAddress?.postalCode || ""
  //   );
  //   const [country, setCountry] = useState(shippingAddress?.country || "");

  // Get dispatch function and navigation function
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch an action to save the shipping address to the Redux store
    dispatch(saveShippingAddress({ address, city }));
    dispatch(saveDeliveryMethod({ deliveryMethod }));
    // Navigate to the '/payment' route
    navigate("/payment");
  };

  const { data: cities, isLoading, error } = useGetCitiesQuery();

  //   const handleCityChange = (e) => {
  //     setCity(parseInt(e.target.value));
  //     console.log(city);
  //     setPostalCode(
  //       cities.find((city) => city.city_id === e.target.value).zip_code
  //     );
  //   };

  const {
    data: deliveryMethods,
    isLoading_,
    error_,
  } = useGetDeliveryMethodsQuery();

  // Render the shipping address form
  //todo:--> Refer the ER diagram and add other required fields if needed
  return (
    <>
      {isLoading || isLoading_ ? (
        <Loader />
      ) : error || error_ ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <FormContainer>
          <CheckoutSteps step1 step2 /> {/* Display the checkout steps */}
          <h1>Shipping</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="city">
              <Form.Label>City</Form.Label>

              <Form.Select
                value={city}
                required
                onChange={(e) => setCity(parseInt(e.target.value))}
              >
                {cities.map((city) => (
                  <option value={city.city_id}>{city.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* <Form.Group controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control type="text" value={postalCode} readOnly />
            </Form.Group> */}

            <Form.Group className="my-2" controlId="deliveryMethod">
              <Form.Label>Delivery Method</Form.Label>
              <Form.Select
                value={deliveryMethod}
                required
                onChange={(e) => setDeliveryMethod(e.target.value)}
              >
                {deliveryMethods.map((method) => (
                  <option value={method.delivery_method_id}>
                    {method.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button type="submit" variant="primary">
              Continue
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

// Export the ShippingScreen component
export default ShippingScreen;
