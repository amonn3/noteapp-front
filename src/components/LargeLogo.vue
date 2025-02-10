<template>
  <div class="d-flex justify-center logo-container" @click="goToHome">
    <img src="@/assets/logo.svg" alt="Noteapp" width="30" height="40">
    <span class="logo-text">Noteapp</span>
  </div>
</template>

<script>
  import { useRouter } from 'vue-router';

  export default {
    name: 'LargeLogo',
    setup() {
      const router = useRouter();

      const goToHome = () => {
        router.push('/');
      };

      return {
        goToHome
      };
    }
  }
</script>

<style scoped>
.logo-text {
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  display: flex;
  align-items: flex-end;
  line-height: normal;
  font-family: 'Roboto Slab';
  height: fit-content;
}

.logo-container {
  align-items: center;
  gap: 4px;
  cursor: pointer;
}
</style>
