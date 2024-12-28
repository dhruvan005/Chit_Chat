import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        authUser: null,
        otherUser: []



    },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload
        }
        ,
        setOtherUser: (state, action) => {
            state.otherUser = action.payload
            // console.log("inside other user");
            // console.log("users",state.otherUser);
        }
    }
}
)

export const { setAuthUser, setOtherUser } = userSlice.actions;
export default userSlice.reducer
