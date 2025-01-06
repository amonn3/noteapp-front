<template>
  <nav>
    <router-link to="/health">Health</router-link> |
    <router-link to="/">Home</router-link> |
    <router-link to="/dashboards">Dashboard</router-link> |
    <router-link to="/signin">Login</router-link> |
    <router-link to="/signup">Cadastro</router-link>
  </nav>
</template>

<script>
  import api from '@/services/api';
import { useRouter } from 'vue-router';

export default {
  name: 'NavBar',
  setup() {
    const router = useRouter();

    const handleLogout = async () => {
      try {
        await api.delete('users/logout');
        localStorage.removeItem('_session_id');
        router.push('/signin');
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    };

    return {
      handleLogout
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
</style>