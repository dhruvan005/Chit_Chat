import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        authUser: JSON.parse(localStorage.getItem('authUser')) || null,
        otherUsers: [],
        selectedUser: null,
        onlineUsers :null
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
            localStorage.setItem('authUser', JSON.stringify(action.payload)); // Persist data
        },
        setOtherUsers: (state, action) => {
            state.otherUsers = action.payload

        },
        clearSelectedUser: (state) => {
            state.selectedUser = null
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload
        },
        logout: (state) => {
            state.authUser = null;
            state.selectedUser = null;
            state.otherUsers = null,
            localStorage.removeItem('authUser'); // Clear persisted data on logout
            // localStorage.removeItem("token");
        } ,
        setOnlineUsers:(state, action) => {
            state.onlineUsers = action.payload
        },
    }
}
)

export const { setAuthUser, setOtherUsers , setSelectedUser, clearSelectedUser,logout,setOnlineUsers  } = userSlice.actions;
export default userSlice.reducer


