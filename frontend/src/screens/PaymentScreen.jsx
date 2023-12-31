import { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
    const navigate = useNavigate();

    // Retrieve the cart state using the useSelector hook from Redux
    const cart = useSelector((state) => state.cart);

    // Use optional chaining to access the 'address' property; if 'shippingAddress' is undefined, this will safely return undefined
    const shippingAddress = cart?.shippingAddress;

    // Use the useEffect hook to check if a shipping address is available; if not, redirect to the shipping screen
    useEffect(() => {
        if (!shippingAddress?.address) {
            navigate('/shipping');
        }
    }, [navigate, shippingAddress]);

    // Define a state variable for the selected payment method and a function to update it
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();

    // Function to handle form submission when the user selects a payment method
    const submitHandler = (e) => {
        e.preventDefault();
        // Dispatch an action to save the selected payment method to the Redux store
        dispatch(savePaymentMethod(paymentMethod));
        // Navigate to the "placeorder" screen
        navigate('/placeorder');
    };

    // Render the payment screen components
    return (
        <FormContainer>
            {/* Display the checkout steps */}
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            {/* Create a form for payment method selection with radio buttons */}
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    {/* Label for the radio button group */}
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        {/* Radio button option for PayPal or Credit Card, with its value controlled by the state */}
                        <Form.Check
                            className='my-2'
                            type='radio'
                            label='PayPal or Credit Card'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked={paymentMethod === 'PayPal'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                {/* Submit button to proceed to the next step in the checkout process */}
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

// Export the PaymentScreen component for use in other parts of the application
export default PaymentScreen;
