<template>
  <v-sheet class="mx-auto registration-form-container" width="600">
    <v-form @submit.prevent="handleSubmit" ref="form">
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Nome"
      ></v-text-field>

      <v-text-field
        v-model="lastName"
        :rules="lastNameRules"
        label="Sobrenome (opcional)"
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Email"
        :error-messages="emailError"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Senha"
        type="password"
      ></v-text-field>

      <v-text-field
        v-model="confirmPassword"
        :rules="confirmPasswordRules"
        label="Confirme a senha"
        type="password"
      ></v-text-field>

      <div class="d-flex justify-center">
        <v-btn class="mt-2" rounded="xs" variant="outlined" color="primary" type="submit">Cadastrar</v-btn>
      </div>
    </v-form>
    <v-alert
      v-if="showSuccessAlert"
      type="success"
      variant="elevated"
      class="mt-4"
    >
      {{ alertMessage }}
    </v-alert>

    <v-alert
      v-if="showErrorAlert"
      type="error"
      variant="elevated"
      class="mt-4"
    >
      {{ alertMessage }}
    </v-alert>
  </v-sheet>
</template>

<script>
import { ref, watch } from 'vue';
import api from '@/services/api';
import router from '@/router';

export default {
  name: 'RegisterForm',
  setup() {
    const form = ref(null);
    const name = ref('');
    const lastName = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const emailError = ref('');
    const showSuccessAlert = ref(false);
    const showErrorAlert = ref(false);
    const alertMessage = ref('');

    const nameRules = [
      v => !!v || 'Nome é obrigatório'
    ];

    const lastNameRules = []; // Regras vazias pois é opcional

    const emailRules = [
      v => !!v || 'Email é obrigatório',
      v => /.+@.+\..+/.test(v) || 'Email precisa ser válido'
    ];

    const passwordRules = [
      v => !!v || 'Senha é obrigatória',
      v => v.length >= 6 || 'Senha deve ter no mínimo 6 caracteres'
    ];

    const confirmPasswordRules = [
      v => !!v || 'Confirmação de senha é obrigatória',
      v => v === password.value || 'As senhas devem ser iguais'
    ];

    const handleSubmit = async () => {
      const { valid } = await form.value.validate()
      
      if (valid) {
        emailError.value = '';
        let fullName = '';
        if (lastName.value) {
          fullName = `${name.value} ${lastName.value}`;
        } else {
          fullName = name.value;
        }
        
        try {
          const res = await api.post('/users', {
            user: {
              name: fullName,
              email: email.value,
              password: password.value
            }
          });
          const data = res.data;

          if (data.message === "Email já está em uso") {
            emailError.value = data.message;
            alertMessage.value = data.message;
            showErrorAlert.value = true;
            setTimeout(() => {
              showErrorAlert.value = false;
            }, 2000);
          } else {
            showSuccessAlert.value = true;
            alertMessage.value = data.message;
            try {
              // Tenta realizar o login automaticamente usando as mesmas credenciais
              await api.post('/users/login', {
                user: {
                  email: email.value,
                  password: password.value
                }
              });
              // Após login bem-sucedido, redireciona para a página inicial
              setTimeout(() => {
                showSuccessAlert.value = false;
                router.push('/');
              }, 2000);
            } catch (loginError) {
              showErrorAlert.value = true;
              alertMessage.value = loginError.message;
              setTimeout(() => {
                showErrorAlert.value = false;
              }, 2000);
            }
          }

        } catch (error) {
          showErrorAlert.value = true;
          alertMessage.value = error.message;
          setTimeout(() => {
            showErrorAlert.value = false;
          }, 2000);
        }
      }
    };

    watch(email, () => {
      emailError.value = '';
    })

    return {
      form,
      name,
      lastName,
      email,
      password,
      confirmPassword,
      nameRules,
      lastNameRules,
      emailRules,
      passwordRules,
      confirmPasswordRules,
      handleSubmit,
      emailError,
      showSuccessAlert,
      showErrorAlert,
      alertMessage
    };
  },
};
</script>

<style scoped>
  .registration-form-container {
    padding: 2rem;
    border-radius: 4px;
  }
</style>