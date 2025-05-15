import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    name: '',
    user: {},
    token: ''
};

// Load state from cookies
const loadState = () => {
    const userData = Cookies.get('userData');
    return userData ? JSON.parse(userData) : initialState;
};

const userSlice = createSlice({
    name: 'user',
    initialState: loadState(),
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            Cookies.set('userData', JSON.stringify(state)); // Save to cookies
        },
        setToken: (state, action) => {
            state.token = action.payload;
            Cookies.set('userData', JSON.stringify(state)); // Save to cookies
        },
    },
});

// Export actions and reducer
export const { setUser, setToken } = userSlice.actions;
export default userSlice.reducer;
