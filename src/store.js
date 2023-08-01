import { createStore } from 'vuex';

export default createStore({
  state: {
    cartItemCount: 0,
    cart: [],
  },
  mutations: {
    updateCartItemCount(state, count) {
      state.cartItemCount = count;
    },
    updateCart(state, cart) {
        state.cart = cart;
      },
  },
});
