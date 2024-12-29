import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        authUser: JSON.parse(localStorage.getItem('authUser')) || null,
        otherUser: [],
        selectedUser: null
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
            localStorage.setItem('authUser', JSON.stringify(action.payload)); // Persist data
        },
        setOtherUser: (state, action) => {
            state.otherUser = action.payload

        },
        clearSelectedUser: (state) => {
            state.selectedUser = null
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload
        },
        logout: (state) => {
            state.authUser = null;
            localStorage.removeItem('authUser'); // Clear persisted data on logout
        }
    }
}
)

export const { setAuthUser, setOtherUser , setSelectedUser, clearSelectedUser,logout  } = userSlice.actions;
export default userSlice.reducer
