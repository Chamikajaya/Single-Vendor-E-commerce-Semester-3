// ! NOTE => We will not let users access this shipping screen if they are not logged in. This is achieved through PrivateRoutes Component + index.js

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

import { useRegisterMutation } from "../slices/usersApiSlice";
import { useGetCitiesQuery } from "../slices/ordersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cityId, setCityId] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { data: cities, isLoading_, error_ } = useGetCitiesQuery();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({
          username: username,
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          city_id: cityId,
          address: address,
          contact_number: contact,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  // todo: Implement the other required user related fields in the following form (refer ER diagram)
  return (
    // <FormContainer className="form-container">
    <div className="form-container">
      <h1 style={{ color: "white", margin: "auto" }}>Register</h1>
      <Form onSubmit={submitHandler}>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="username">
              <Form.Label style={{ color: "white" }} className="form-row">
                Username
              </Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2 form-row" controlId="email">
              <Form.Label style={{ color: "white" }} className="form-row">
                Email Address
              </Form.Label>
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
              <Form.Label style={{ color: "white" }}>
                Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
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
              {/* <Form.Control
                type="text"
                placeholder="Select City"
                value={cityId}
                onChange={(e) => setCityId(parseInt(e.target.value))}
              ></Form.Control> */}
              <Form.Select
                value={cityId}
                required
                onChange={(e) => setCityId(parseInt(e.target.value))}
              >
                {cities.map((city) => (
                  <option value={city.city_id}>{city.name}</option>
                ))}
              </Form.Select>
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
              <Form.Label style={{ color: "white" }}>
                {" "}
                Contact Number{" "}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Contact Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Button
            disabled={isLoading}
            type="submit"
            variant="primary submit-btn"
          >
            Register
          </Button>

          {isLoading && <Loader />}
        </Row>
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterScreen;
