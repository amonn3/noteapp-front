<template>
  <div class="home">
    <h1>Home</h1>
    <h3>{{ message }}</h3>
  </div>
</template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import api from '@/services/api'
  
  export default {
    name: 'HomePage',
    setup() {
      const message = ref('')
      const loading = ref(true)
  
      const fetchItems = async () => {
        try {
          const response = await api.get('users/welcome')
          message.value = response.data.message
        } catch (error) {
          console.error('Erro ao buscar items:', error)
        } finally {
          loading.value = false
        }
      }
  
      onMounted(() => {
        fetchItems()
      })
  
      return {
        message,
        loading
      }
    }
  }
  </script>
  
  <style scoped>
  .home {
    padding: 20px;
  }
  </style>