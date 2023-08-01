<template>
  <div class="thank-you-page">
    <h1 class="page-title">Thank You for Your Purchase!</h1>
    <p class="thank-you-message">
      We appreciate your business and hope you enjoy your delicious cakes!
    </p>
  </div>
</template>

<script>
export default {
  created() {
    setTimeout(() => {
      this.$router.push("/");
    }, 2000);
  },
};
</script>

<style>
    .thank-you-page {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
    }

    .page-title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
    }

    .thank-you-message {
    font-size: 24px;
    }
</style>
