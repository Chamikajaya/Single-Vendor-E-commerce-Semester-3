// Import React hooks and components
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';


// Import the login mutation and action from Redux slices
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

// Define the LoginScreen component
const LoginScreen = () => {
    // Initialize state variables for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Get Redux dispatch and navigation functions
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Use the login mutation and check if it's loading
    const [login, { isLoading }] = useLoginMutation();

    // Get user information from the Redux store
    const { userInfo } = useSelector((state) => state.auth);

    // Get the 'redirect' query parameter from the URL
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    // Redirect to the specified path if the user is already authenticated
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    // Handle form submission
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // Attempt to log in using the login mutation
            const res = await login({ email, password }).unwrap();
            // Update Redux store with user credentials
            dispatch(setCredentials({ ...res }));
            // Redirect to the specified path
            navigate(redirect);
        } catch (err) {
            // Display an error toast message if login fails
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button disabled={isLoading} type='submit' variant='primary'>
                    Sign In
                </Button>

                {isLoading && <Loader />}
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer?{' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginScreen;
