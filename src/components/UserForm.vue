<template>
  <v-sheet class="mx-auto" width="600">
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

      <v-btn class="mt-2" type="submit" block>Cadastrar</v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
import { ref, watch } from 'vue';
import api from '@/services/api';

export default {
  name: 'UserForm',
  setup() {
    const form = ref(null);
    const name = ref('');
    const lastName = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const emailError = ref('');

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
          await api.post('/users', {
            user: {
              name: fullName,
              email: email.value,
              password: password.value
            }
          });
        } catch (error) {
          if (error.response?.status === 409) {
            emailError.value = error.response.data.status.message;
          }
        }

      } else {
        console.log('Formulário inválido');
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
    };
  },
};
</script>