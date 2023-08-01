import { createRouter, createWebHistory } from 'vue-router';
import ProductPage from './components/ProductPage.vue';
import CartPage from './components/CartPage.vue';
import OrderSummaryPage from './components/OrderSummaryPage.vue';
import ThankYouPage from './components/ThankYouPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: ProductPage },
    { path: '/cart', component: CartPage },
    { path: '/order-summary', component: OrderSummaryPage },
    { path: '/thank-you', component: ThankYouPage },
  ],
});

export default router;