<template>
  <v-sheet class="mx-auto form-login-container" width="600" elevation="24">
    <v-form @submit.prevent="handleSubmit" ref="form">
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Senha"
        type="password"
      ></v-text-field>
      <div class="d-flex justify-center">
        <v-btn type="submit" color="primary" variant="outlined" rounded="xs"
          >Entrar</v-btn
        >
      </div>
    </v-form>

    <v-alert
      v-if="showErrorAlert"
      type="error"
      variant="outlined"
      class="mt-4 text-center"
    >
      {{ errorMessage }}
    </v-alert>
  </v-sheet>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores";

export default {
  name: "LoginForm",
  setup() {
    const query = useRoute().query;
    const form = ref(null);
    const email = ref("");
    const password = ref("");
    const showErrorAlert = ref(false) || ref(query.showAlert);
    const errorMessage = ref("") || ref(query.message);
    const auth = useAuthStore();

    const emailRules = [
      (v) => !!v || "Email é obrigatório",
      (v) => /.+@.+\..+/.test(v) || "Email precisa ser válido",
    ];

    const passwordRules = [
      (v) => !!v || "Senha é obrigatória",
      (v) => v.length >= 6 || "Senha deve ter no mínimo 6 caracteres",
    ];

    const handleSubmit = async () => {
      if (!form.value) return;

      const { valid } = await form.value.validate();

      if (valid) {
        try {
          await auth.login({ email: email.value, password: password.value });
        } catch (error) {
          console.log(error);
          showErrorAlert.value = true;
          if (error.response && error.response.status === 401) {
            errorMessage.value =
              "Email ou senha incorretos. Por favor, tente novamente.";
          } else {
            errorMessage.value =
              "Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.";
          }

          setTimeout(() => {
            showErrorAlert.value = false;
          }, 4000);
        }
      }
    };

    return {
      form,
      email,
      password,
      emailRules,
      passwordRules,
      handleSubmit,
      showErrorAlert,
      errorMessage,
    };
  },
};
</script>

<style scoped>
.form-login-container {
  padding: 2rem;
  border-radius: 8px;
}
</style>
