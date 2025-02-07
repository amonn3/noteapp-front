<template>
  <div class="register-container d-flex flex-column align-center justify-center">
    <h1>Crie sua conta</h1>
  </div>
  <RegisterForm />
  <div class="register-footer text-center mt-4">
    <p>Já tem uma conta? <a class='redirect-link primary-color' href="/signin">Faça login</a></p>
  </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue'

  export default {
    name: 'RegisterView',
    components: {
      RegisterForm
    }
  }
</script>

<style scoped>
  .redirect-link {
    color: #42b883;
  }
  .redirect-link.visited {
    color: inherit;
  }
</style>