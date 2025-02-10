<template>
  <div class="d-flex justify-space-between template-container">
    <LargeLogo />
    <div class="d-flex justify-center">
        <nav>
          <template v-if="isLoggedIn">
            <router-link to="/health">Health</router-link> |
            <router-link to="/">Home</router-link> |
            <router-link to="/dashboards">Dashboard</router-link>
          </template>
          <template v-else>
            <router-link to="/signin">Login</router-link> |
            <router-link to="/signup">Cadastro</router-link>
          </template>
        </nav>
    </div>
    <div class="d-flex justify-center align-center">
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
          Sair
        </v-btn>
    </div>
  </div>
</template>

<script>
  import api from '@/services/api';
  import { useRouter } from 'vue-router';
  import LargeLogo from '@/components/LargeLogo.vue';
  import { ref, onMounted } from 'vue';

export default {
  name: 'NavBar',
  components: {
    LargeLogo
  },

  setup() {
    const router = useRouter();
    const isLoggedIn = ref(false);
    const isLoggingOut = ref(false);

    const checkLoginStatus = async () => {
      try {
        const response = await api.get('users/welcome');
        isLoggedIn.value = response.status === 200;
      } catch (error) {
        isLoggedIn.value = false;
      }
    };

    const handleLogout = async () => {
      isLoggingOut.value = true;
      try {
        await api.delete('users/logout');
        localStorage.removeItem('_session_id');
        isLoggedIn.value = false;
        router.push('/signin');
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      } finally {
        isLoggingOut.value = false;
      }
    };

    onMounted(() => {
      checkLoginStatus();
    });

    return {
      handleLogout,
      isLoggedIn,
      isLoggingOut
    };
  }
}
</script>

<style scoped >
nav {
  padding: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
  font-size: 20px;
}
nav a.router-link-active {
  color: #42b983;
  font-weight: bold;
}
nav a:visited {
  color: inherit !important;
}
nav a{
  color: inherit !important;
}

nav a.router-link-active {
  color: #42b883 !important; 
}

.template-container {
  font-family: 'Roboto Slab';
  padding: 0 20px;
}
</style>