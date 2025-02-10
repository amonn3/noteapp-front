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
import { computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores';
import LargeLogo from '@/components/LargeLogo.vue';

export default {
  name: 'NavBar',
  components: { LargeLogo },
  setup() {
    const auth = useAuthStore();

    const isLoggedIn = computed(() => auth.isLoggedIn);
    const isLoggingOut = computed(() => auth.loading);

    onMounted(() => {
      auth.checkAuth();
    });

    const handleLogout = async () => {
      try {
        await auth.logout();
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    };

    return {
      isLoggedIn,
      isLoggingOut,
      handleLogout,
    };
  },
};
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