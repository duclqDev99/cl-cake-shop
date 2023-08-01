<template>
  <div class="product-page">
    <h1 class="page-title">HomePage</h1>
    <div class="product-list">
      <transition-group
        name="product-animation"
        tag="div"
        class="product-list"
        appear
        v-bind:css="{ 'animation-delay': getProductDelay }"
      >
        <div v-for="cake in cakes" :key="cake.id" class="product-card">
          <img :src="cake.image_url" :alt="cake.name" class="product-image" />
          <h2 class="product-name">{{ cake.name }}</h2>
          <p class="product-description">{{ cake.description }}</p>
          <div class="product-prices">
            <span class="product-price" v-if="!cake.is_on_discount">
              {{ formatPrice(cake.original_price) }} $
            </span>
            <span class="product-original-price" v-if="cake.is_on_discount">
              <s>{{ formatPrice(cake.original_price) }} $</s>
            </span>
            <span class="product-discounted-price" v-if="cake.is_on_discount">
              {{ formatPrice(cake.discounted_price) }} $
            </span>
          </div>
          <button @click="addToCart(cake)">Add to Cart</button>
        </div>
      </transition-group>
    </div>
    <message-alert :message="messageAlert" :type="typeMessage" v-if="showMessage" @close="showMessage = false" />
  </div>
</template>

<script>
import productsData from "../../public/products.json";
import MessageAlert from "./MessageAlert";

export default {
  components: {
    MessageAlert,
  },
  data() {
    return {
      cakes: [],
      cart: [],
      showMessage: false, 
      messageAlert: "Add cart successfully!",
      typeMessage : "success"
    };
  },
  methods: {
    addToCart(cake) {
      const existingItem = this.$store.state.cart.find(
        (item) => item.id === cake.id
      );

      const checkStock = existingItem ? existingItem.quantity < cake.stock_count : true;

      if(checkStock){
        if (!existingItem) {
        this.$store.commit("updateCart", [
          ...this.$store.state.cart,
          {
            id: cake.id,
            name: cake.name,
            price: cake.is_on_discount
              ? cake.discounted_price
              : cake.original_price,
            quantity: 1,
            customText: "",
            image: cake.image_url,
            stockCount: cake.stock_count,
          },
        ]);
        } else {
          existingItem.quantity++;
          this.$store.commit("updateCart", [...this.$store.state.cart]);
        }
        this.messageAlert = "Add cart successfully!";
         this.typeMessage = "success";
      }else{
        console.log('het hang');
        this.messageAlert = "Add card error: over quantity sold!";
        this.typeMessage = "error";
      }

      this.showMessage = true;

      

      this.$store.commit("updateCartItemCount", this.$store.state.cart.length);
    },
    formatPrice(price) {
      return price.toFixed(2);
    },
  },
  created() {
    this.cakes = productsData;
  },
};
</script>

<style>
  .product-page {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .page-title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .product-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 20px;
  }

  .product-card {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .product-image {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 5px;
  }

  .product-name {
    font-size: 20px;
    font-weight: bold;
    margin: 10px 0;
  }

  .product-description {
    margin-bottom: 10px;
  }

  .product-prices {
    display: flex;
    justify-content: space-between;
  }

  .product-price,
  .product-original-price {
    font-size: 18px;
  }

  .product-discounted-price {
    font-size: 18px;
    color: #e74c3c;
  }

  button {
    background-color: #3498db;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #2980b9;
  }

  .product-zoom-enter-active,
  .product-zoom-leave-active {
    animation: zoom-in 2s ease;
  }

  .product-zoom-enter,
  .product-zoom-leave-to {
    transform: scale(0);
  }

  @keyframes zoom-in {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
</style>
