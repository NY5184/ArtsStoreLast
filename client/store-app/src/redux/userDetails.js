
// features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name:'',
    user: {},
    token: ''
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
});

export const { setUser,setToken } = userSlice.actions;
export default userSlice.reducer;


