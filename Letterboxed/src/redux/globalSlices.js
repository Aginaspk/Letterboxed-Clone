import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE = {
    isNavHover: false
}

const globalSlice = createSlice({
    name:'globalState',
    initialState:INITIAL_STATE,
    reducers:{
        setNavHover:(state,action)=>{
            state.isNavHover = action.payload;
        }
    }
})

export const {setNavHover} = globalSlice.actions;
export default globalSlice.reducer;