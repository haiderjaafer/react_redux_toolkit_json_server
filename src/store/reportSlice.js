import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
    name:'report',
    initialState:{logs:[]},
    reducers:{
        logInsert:(state,action) =>{
            state.logs.push(action.payload)  // logs is array 
        }
    }
})

export const {logInsert} = reportSlice.actions;
export default reportSlice.reducer;