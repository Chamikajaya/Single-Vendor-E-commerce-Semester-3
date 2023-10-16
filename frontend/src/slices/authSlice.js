import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for the authentication slice
const initialState = {
    // Check if there is user information stored in localStorage and parse it if it exists
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
};

// Create a Redux slice for authentication
const authSlice = createSlice({
    name: 'auth', // Specify the name of the slice
    initialState, // Use the initial state defined above
    reducers: {
        // Reducer to set user credentials
        setCredentials: (state, action) => {
            // Update the userInfo field with the payload received
            state.userInfo = action.payload;
            // Store the user information in localStorage after converting it to a JSON string
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        // Reducer to log the user out
        logout: (state, action) => {
            // Clear the user information by setting it to null
            state.userInfo = null;
            // Remove the user information from localStorage
            localStorage.removeItem('userInfo');
        },

    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
