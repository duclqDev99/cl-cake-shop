<template>
  <div class="order-summary">
    <h1 class="page-title">Order</h1>
    <div class="order-items">
      <div v-for="(item, index) in cart" :key="index" class="order-item">
        <img :src="item.image" :alt="item.name" class="item-image" />
        <div class="item-details">
          <h2 class="item-name">{{ item.name }}</h2>
          <p class="item-custom-text" v-if="item.customText">
            Description: {{ item.customText }}
          </p>
          <p class="item-quantity">Quantity: {{ item.quantity }}</p>
          <p class="item-price">Price: {{ formatPrice(item.price) }} $</p>
        </div>
      </div>
    </div>
    <div class="total-price">
      <h3>Total Price: {{ formatPrice(totalPrice) }} $</h3>
    </div>

    <div class="checkout-fields">
      <input
        v-model="phoneNumber"
        type="tel"
        placeholder="Phone Number"
        pattern="[0-9]{10}"
      />
      <input
        v-model="deliveryAddress"
        type="text"
        placeholder="Delivery Address"
      />
      <button @click="handleCheckout">Checkout</button>
    </div>
    <message-alert
      :message="messageAlert"
      :type="typeMessage"
      v-if="showMessage"
      @close="showMessage = false"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import MessageAlert from "./MessageAlert";

export default {
  components: {
    MessageAlert,
  },
  data() {
    return {
      phoneNumber: "",
      deliveryAddress: "",
      showMessage: false,
      messageAlert: "Add cart successfully!",
      typeMessage: "success",
    };
  },
  computed: {
    ...mapState(["cart"]),
    totalPrice() {
      return this.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
  methods: {
    formatPrice(price) {
      return price.toFixed(2);
    },

    handleCheckout() {
      if (!this.phoneNumber) {
        this.messageAlert = "Phone number is required!";
        this.typeMessage = "error";
        this.showMessage = true;
        return;
      }

      if (!this.deliveryAddress) {
        this.messageAlert = "Delivery address is required!";
        this.typeMessage = "error";
        this.showMessage = true;
        return;
      }

      this.checkoutSuccess = true;
      this.$store.commit("updateCartItemCount", 0);
      this.$store.commit("updateCart", []);
      this.phoneNumber = "";
      this.deliveryAddress = "";
      this.$router.push("/thank-you");
    },
  },
};
</script>

<style>
  .order-summary {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .page-title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .order-items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 20px;
  }

  .order-item {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
  }

  .item-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 20px;
  }

  .item-name {
    font-size: 20px;
    font-weight: bold;
    margin: 10px 0;
  }

  .item-custom-text {
    margin-bottom: 5px;
  }

  .item-quantity,
  .item-price {
    margin: 5px 0;
  }

  .total-price {
    text-align: right;
    margin-top: 20px;
    font-size: 24px;
    font-weight: bold;
  }

  .checkout-button {
    background-color: #3498db;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.2s;
  }

  .checkout-button:hover {
    background-color: #2980b9;
  }

  .checkout-fields {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  .checkout-fields input {
    width: 100%;
    margin-bottom: 10px;
    padding: 5px 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .checkout-fields button {
    background-color: #3498db;
    color: #fff;
    padding: 8px 16px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .error-message {
    color: red;
    text-align: left;
  }

  .checkout-fields button:hover {
    background-color: #2980b9;
  }
</style>
