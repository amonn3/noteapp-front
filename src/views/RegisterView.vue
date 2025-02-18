<template>
  <div class="register-container">
    <div class="title">Crie sua conta</div>
    <RegisterForm />
    <div class="register-footer text-center mt-4">
      <p>
        Já tem uma conta?
        <a class="redirect-link primary-color" href="/signin">Faça login</a>
      </p>
    </div>
  </div>
</template>

<script>
import RegisterForm from "@/components/RegisterForm.vue";

export default {
  name: "RegisterView",
  components: {
    RegisterForm,
  },
};
</script>

<style scoped>
.redirect-link {
  color: #42b883;
}
.redirect-link.visited {
  color: inherit;
}

.title {
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.register-container {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
