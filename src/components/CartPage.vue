<template>
  <div class="cart-page">
    <h1 class="page-title">Your Cart</h1>
    <div v-if="cartItems.length === 0" class="empty-cart-message">
      Your cart is empty.
    </div>
    <div v-else class="cart-items">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <div class="item-info">
          <img :src="item.image" :alt="item.name" class="item-image" />
          <div class="item-details">
            <h2 class="item-name">{{ item.name }}</h2>
            <p class="item-price">{{ formatPrice(item.price) }} $</p>
            <input
              v-model="item.customText"
              type="text"
              placeholder="Description (max 25 characters)"
              maxlength="25"
            />
            <button @click="removeFromCart(item)">Remove</button>
          </div>
        </div>
        <div class="quantity">
          <button
            @click="adjustQuantity(item, -1)"
            :disabled="isQuantityMinimum(item)"
          >
            -
          </button>
          <span class="quantity-count">{{ item.quantity }}</span>
          <button
            @click="adjustQuantity(item, 1)"
            :disabled="isQuantityExceeded(item)"
          >
            +
          </button>
        </div>
      </div>
    </div>
    <div v-if="cartItems.length > 0" class="total-price">
      Total: {{ formatPrice(totalPrice) }} $
    </div>

    <div class="cart-actions" v-if="cartItems.length > 0">
      <button @click="goToOrderSummary" class="checkout-button">
        order details
      </button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isQuantityExceeded() {
      return (item) => item.quantity == item.stockCount;
    },

    isQuantityMinimum() {
      return (item) => item.quantity == 1;
    },

    cartItems() {
      return this.$store.state.cart;
    },
    totalPrice() {
      return this.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
  methods: {
    formatPrice(price) {
      return price.toFixed(2);
    },
    removeFromCart(item) {
      this.$store.commit(
        "updateCart",
        this.cartItems.filter((cartItem) => cartItem.id !== item.id)
      );
      this.$store.commit("updateCartItemCount", this.cartItems.length + 1 - 1);
    },
    adjustQuantity(item, change) {
      item.quantity += change;
      const newQuantity = item.quantity;
      if (newQuantity === 0) {
        this.removeFromCart(item);
      } else if (newQuantity <= item.stockCount) {
        item.quantity = newQuantity;
        this.$store.commit("updateCart", this.cartItems);
      } else if (newQuantity > item.stockCount) {
        item.quantity = item.stockCount;
        this.$store.commit("updateCart", this.cartItems);
      }
    },

    goToOrderSummary() {
      this.$router.push("/order-summary");
    },
  },
};
</script>

<style>
    .cart-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    }

    .page-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    }

    .empty-cart-message {
    font-size: 18px;
    text-align: center;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    }

    .cart-items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 20px;
    }

    .cart-item {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;
    }

    .item-info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    }

    .item-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 10px;
    }

    .item-name {
    font-size: 18px;
    font-weight: bold;
    }

    .item-price {
    font-size: 16px;
    margin-bottom: 5px;
    }

    .quantity {
    display: flex;
    align-items: center;
    }

    .quantity button {
    padding: 5px 10px;
    font-size: 16px;
    background-color: #00ffff;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    }

    .quantity :disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    opacity: 0.7;
    }

    .quantity-count :disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    opacity: 0.7;
    }

    .quantity-count {
    font-size: 18px;
    margin: 0 10px;
    }

    input[type="text"] {
    width: 100%;
    padding: 5px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    }

    button {
    padding: 8px 16px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    }

    .total-price {
    font-size: 20px;
    font-weight: bold;
    text-align: right;
    margin-top: 20px;
    }
</style>
