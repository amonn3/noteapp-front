<template>
  <h1>Dashboard</h1>
  <h1>
    {{ message }}
  </h1>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { useRouter } from 'vue-router'

export default {
  name: 'DashboardView',
  setup() {
    const message = ref('')
    const router = useRouter()

    const fetchUser = async () => {
      try {
        const response = await api.get('users/dashboards')
        message.value = response.data.message
      } catch (error) {
        if (error.response && error.response.status === 401) {
          router.push('/')
        }
      }
    }

    onMounted(() => {
      fetchUser()
    })  

    return {
      message
    }
  }
}
</script>
