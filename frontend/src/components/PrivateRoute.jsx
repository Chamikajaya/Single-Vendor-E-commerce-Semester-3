import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    // Retrieve the user information from the Redux store
    const { userInfo } = useSelector((state) => state.auth);

    // Check if userInfo is available (user is authenticated)
    // If authenticated, render the child components within the Outlet
    // If not authenticated, navigate to the '/login' route and replace the current location
    return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};

// Export the PrivateRoute component
export default PrivateRoute;
