import React, { useEffect, useState } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";

import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useProfileMutation,
  useGetUserByEmailQuery,
} from "../slices/usersApiSlice";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { setCredentials } from "../slices/authSlice";

const ProfileScreen = () => {
  // Define state variables using the 'useState' hook
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cityId, setCityId] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  // Access the 'userInfo' from the Redux store using the 'useSelector' hook
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: user_,
    isLoading_,
    error_,
  } = useGetUserByEmailQuery(userInfo.email);
  console.log("User", user_);
  // Use the 'useGetMyOrdersQuery' hook to fetch data from the server and manage loading and error states
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  // Use the 'useProfileMutation' hook to define a mutation function for updating the user's profile
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  // Use the 'useEffect' hook to set the initial values of 'name' and 'email' when 'userInfo' changes
  useEffect(() => {
    setUserName(user_.username);
    setEmail(userInfo.email);
    setFirstName(user_.first_name);
    setLastName(user_.last_name);
    setCityId(user_.city_id);
    setAddress(user_.address);
    setContact(user_.contact_number);
  }, [
    userInfo.email,
    user_.username,
    user_.first_name,
    user_.last_name,
    user_.city_id,
    user_.address,
    user_.contact_number,
  ]);

  // Access the 'dispatch' function to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // Define a function to handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if the 'password' and 'confirmPassword' match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        // Call the 'updateProfile' mutation to update the user's profile
        const res = await updateProfile({
          user_id: userInfo.user_id,
          username,
          email,
          password,
          firstName,
          lastName,
          cityId,
          address,
          contact,
        }).unwrap();

        // Dispatch an action to update the user's credentials in the Redux store
        dispatch(setCredentials({ ...res }));

        // Display a success toast notification
        toast.success("Profile updated successfully");
      } catch (err) {
        // Display an error toast notification if the update fails
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2 style={{ color: "white" }}>User Profile</h2>

        {/* Create a form for updating the user's profile */}
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="username">
            <Form.Label style={{ color: "white" }}> Username </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="email">
            <Form.Label style={{ color: "white" }}>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label style={{ color: "white" }}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label style={{ color: "white" }}>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="firstName">
            <Form.Label style={{ color: "white" }}>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="lastName">
            <Form.Label style={{ color: "white" }}>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="cityId">
            <Form.Label style={{ color: "white" }}> City </Form.Label>
            <Form.Control
              type="text"
              placeholder="Select City"
              value={cityId}
              onChange={(e) => setCityId(parseInt(e.target.value))}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="address">
            <Form.Label style={{ color: "white" }}> Address </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="contact">
            <Form.Label style={{ color: "white" }}> Contact Number </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Contact Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>

          {/* Display a loader while the update is in progress */}
          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>

        {/* Display loading spinner if data is loading */}
        {isLoading ? (
          <Loader />
        ) : error ? (
          // Display an error message if there is an error
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          // Display a table with the user's order information
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>CART ID</th>
                <th>DATE</th>
                <th>SHIPPING DATE</th>
                <th>TOTAL</th>
                <th>ADDRESS</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>{order.order_date}</td>
                  <td>{order.shipping_date}</td>
                  <td>{order.tot_price}</td>
                  <td>{order.delivery_address}</td>
                  <td>{order.status}</td>
                  <td>
                    <LinkContainer to={`/order/${order.order_id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
