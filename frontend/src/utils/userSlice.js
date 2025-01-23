import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    initialState:null,
    reducers:{
        addUser:(state,action)=>{  //action means we can call it by name addUser when we use dispatch and using action.payload we can get data into state
            return action.payload;
        },
        removeUser:(state,action)=>{
            return null;
        }
}
})

export const {addUser,removeUser}=userSlice.actions;

export default userSlice.reducer;