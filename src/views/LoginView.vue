<template>
  <div class="login-container">
    <div class="login-header">
      <img src="../assets/logo.svg" alt="Logo" width="100" />
      <div class="big-title">NoteApp</div>
    </div>
    <div class="login-form">
      <LoginForm />
    </div>
    <div class="login-footer text-center mt-4">
      <p>
        Ainda não tem uma conta?
        <a class="redirect-link primary-color" href="/signup">Cadastre-se</a>
      </p>
    </div>
  </div>

  <div class="d-flex justify-center">
    <div class="login-alert">
      <v-alert
        v-if="showErrorAlert"
        type="error"
        variant="outlined"
        class="mt-4"
      >
        {{ errorMessage }}
      </v-alert>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import LoginForm from "@/components/LoginForm.vue";
import { useRoute } from "vue-router";

export default {
  name: "LoginView",
  components: {
    LoginForm,
  },
  setup() {
    const message = ref("");
    const loading = ref(true);
    const showErrorAlert = ref(false);
    const errorMessage = ref("");
    const query = useRoute().query;

    if (query.login_needed) {
      showErrorAlert.value = true;
      errorMessage.value = "Você precisa realizar o login para continuar";

      setTimeout(() => {
        showErrorAlert.value = false;
      }, 5000);
    }

    return {
      message,
      loading,
      showErrorAlert,
      errorMessage,
    };
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
.login-alert {
  width: fit-content;
}
.login-header {
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: center;
  margin-bottom: 3rem;
}
.login-container {
  padding: 2rem;
}

.big-title {
  font-size: 5rem;
  font-weight: bold;
}
</style>
