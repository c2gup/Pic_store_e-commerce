import {createSlice} from "@reduxjs/toolkit";

const orderSlice = createSlice({
      name:"order",
      initialState:{
            orders:[],
      },
      reducers:{
            setOrders:(state,action) =>{
                  state.orders = action.payload;
            },
      },
});

export const {setOrders} = orderSlice.actions;
export default orderSlice.reducer;