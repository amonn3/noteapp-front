<template>
  <div class="home d-flex flex-column align-items-center justify-content-center">
    <div class="welcome-container text-center">
      <div class="d-flex flex-column align-items-center justify-content-center mt-8">
        <h1 class="display-1 font-weight-bold mb-4">Noteapp</h1>
        <h3>Thoughts become things</h3>
      </div>
      <v-card  class="pa-6 rounded-lg elevation-3" width="400">
        <div class="text-h4 font-weight-medium mb-2">
          Olá, {{ userName }}!
        </div>
        <v-btn
          block
          color="primary"
          variant="elevated"
          @click="createNote"
          class="text-none"
          prepend-icon="mdi-note-plus"
          rounded
        >
          Criar Nota
        </v-btn>
      </v-card>
      <v-card  class="pa-6 mt-8 rounded-lg elevation-3" width="400">
        <v-btn
          block
          color="error"
          variant="elevated"
          :loading="isLoggingOut"
          @click="handleLogout"
          class="text-none"
          prepend-icon="mdi-logout"
          rounded
        >
          Encerrar Sessão
        </v-btn>
      </v-card>
    </div>

    <v-alert
      v-if="showErrorAlert"
      type="error"
      variant="elevated"
      class="mt-4"
      width="400"
    >
      {{ errorMessage }}
    </v-alert>
  </div>
</template>
  
<script>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { useRouter } from 'vue-router'

export default {
  name: 'HomeView',
  setup() {
    const message = ref('');
    const loading = ref(true);
    const router = useRouter();
    const userName = ref('');
    const isLoggingOut = ref(false);
    const showErrorAlert = ref(false);
    const errorMessage = ref('');

    const handleLogout = async () => {
      isLoggingOut.value = true;
      try {
        await api.delete('users/logout');
        router.push('/signin');
      } catch (error) {
        showErrorAlert.value = true;
        errorMessage.value = 'Erro ao fazer logout. Tente novamente.';
        setTimeout(() => {
          showErrorAlert.value = false;
        }, 4000);
      } finally {
        isLoggingOut.value = false;
      }
    }

    const fetchUser = async () => {
      try {
        const response = await api.get('users/welcome');
        message.value = response.data.message;
        userName.value = response.data.user.name;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          router.push('/signin');
        }
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      fetchUser();
    })

    return {
      message,
      loading,
      userName,
      handleLogout,
      isLoggingOut,
      showErrorAlert,
      errorMessage
    }
  }
}
</script>
  
<style scoped>
.home {
  padding: 20px;
}

.welcome-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>