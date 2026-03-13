import { configureStore, createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [], totalAmount: 0 },
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(i => i.id === newItem.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...newItem, quantity: 1 });
            }
            state.totalAmount += Number(newItem.price);
        },
        updateQuantity: (state, action) => {
            const { id, change } = action.payload;
            const item = state.items.find(i => i.id === id);
            if (item && item.quantity + change > 0) {
                item.quantity += change;
                state.totalAmount += (change * item.price);
            }
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            const item = state.items.find(i => i.id === id);
            if (item) {
                state.totalAmount -= (item.price * item.quantity);
                state.items = state.items.filter(i => i.id !== id);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;
        }
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: { userInfo: JSON.parse(localStorage.getItem('userInfo')) || null },
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    }
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export const { setUser, logout } = userSlice.actions;

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        user: userSlice.reducer
    }
});