import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice.js"

const store = configureStore({
    reducer:{
        userReducer
    }
})

export default store ;