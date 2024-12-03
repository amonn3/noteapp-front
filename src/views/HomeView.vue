<template>
  <div class="home">
    <h1>Home</h1>
    <UserForm />
  </div>
</template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import api from '@/services/api'
  import UserForm from '@/components/UserForm.vue'
  
  export default {
    name: 'HomePage',

    components: {
      UserForm
    },
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
        loading,
      }
    }
  }
  </script>
  
  <style scoped>
  .home {
    padding: 20px;
  }
  </style>