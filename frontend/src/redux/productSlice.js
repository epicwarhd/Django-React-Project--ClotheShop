import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        quantity: 1,
        color: null,
        size: null,
    },
    reducers: {
        chooseColor: (state,action) => {
            state.color = action.payload.color
        },
        chooseSize: (state,action) => {
            state.size = action.payload.size
        },
        chooseQuantity: (state,action) => {
            state.quantity = action.payload.quantity
        }
    }

})

export const { chooseColor, chooseSize, chooseQuantity } = productSlice.actions
export default productSlice.reducer