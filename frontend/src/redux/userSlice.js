import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        authUser: null,
        otherUsers: null

    

    },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload
        }
        ,
        setOtherUser: (state, action) => {
            state.otherUsers = action.payload
            // console.log("inside other user");
            // console.log("users",state.otherUsers);
        }
    }
}
)

export const { setAuthUser, setOtherUser } = userSlice.actions;
export default userSlice.reducer
