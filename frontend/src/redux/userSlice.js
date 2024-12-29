import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        authUser: null,
        otherUser: [],
        selectedUser: null



    },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload
        }
        ,
        setOtherUser: (state, action) => {
            state.otherUser = action.payload

        },
        clearSelectedUser: (state) => {
            state.selectedUser = null
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload
        }
    }
}
)

export const { setAuthUser, setOtherUser , setSelectedUser, clearSelectedUser } = userSlice.actions;
export default userSlice.reducer
