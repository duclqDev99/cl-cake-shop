<template>
  <div v-if="isVisible" :class="['message-alert', type]">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  created() {
    setTimeout(() => {
      this.closeMessage();
    }, 500);
  },
  props: {
    message: String,
    type: {
      type: String,
      validator: (value) => ['success', 'error'].includes(value),
    },
    duration: {
      type: Number,
      default: 3000, 
    },
  },
  data() {
    return {
      isVisible: true,
    };
  },
  methods: {
    closeMessage() {
      this.isVisible = false;
      this.$emit('close');
    },
  },
  mounted() {
    setTimeout(this.closeMessage, this.duration);
  },
};
</script>

<style>
    .message-alert {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 0px 10px;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    z-index: 9999;
    transition: opacity 0.3s;
    }

    .success {
    background-color: #4caf50;
    }

    .error {
    background-color: #f44336;
    }

    button {
    background-color: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
    font-size: 16px;
    margin-left: 10px;
    }
</style>
