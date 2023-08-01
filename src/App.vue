<template>
  <div id="app">
    <header :class="{ 'fixed-header': isFixedHeader }">
      <nav class="menu-container">
        <ul class="menu">
          <li :class="{ 'active-menu-item': isHomePage }">
            <router-link to="/">Home</router-link>
          </li>
        </ul>
        <router-link to="/cart" class="cart-icon">
          <i class="fas fa-shopping-cart"></i>
          <span class="cart-count">{{ $store.state.cartItemCount }}</span>
        </router-link>
      </nav>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isFixedHeader: false,
    };
  },
  computed: {
    isHomePage() {
      return this.$route.path === "/";
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isFixedHeader = window.scrollY > 0;
    },
  },
};
</script>

<style>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }

  header {
    background-color: #f1f1f1;
    padding: 10px;
    transition: top 0.3s;
  }

  .menu-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
  }

  .menu {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
  }

  .menu li {
    margin-right: 20px;
  }

  .menu li:last-child {
    margin-right: 0;
  }

  .menu li a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
  }

  .cart-icon {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #333;
    font-weight: bold;
  }

  .cart-icon i {
    font-size: 18px;
  }

  .cart-count {
    background-color: #e74c3c;
    color: #fff;
    padding: 3px 6px;
    border-radius: 50%;
    font-size: 12px;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }

  @media (max-width: 768px) {
    .menu-container {
      flex-direction: column;
      align-items: flex-start;
    }

    .menu {
      margin-top: 10px;
    }

    .menu li {
      margin-right: 0;
      margin-bottom: 10px;
    }

    .cart-icon {
      margin-top: 10px;
    }
  }
</style>
