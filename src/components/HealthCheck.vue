<template>
  <div class="health-check">
    <h2>Status da API</h2>
    <div v-if="loading" class="status loading">
      Verificando status...
    </div>
    <div v-else class="status" :class="{ 'is-online': isOnline, 'is-offline': !isOnline }">
      Status: {{ status }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

export default {
  name: 'HealthCheck',
  setup() {
    const loading = ref(true)
    const status = ref('')
    const isOnline = ref(false)

    const checkHealth = async () => {
      try {
        const response = await api.get('/health')
        status.value = response.data.status || 'Online'
        isOnline.value = true
      } catch (error) {
        status.value = 'Offline'
        isOnline.value = false
        console.error('Erro ao verificar status da API:', error)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      checkHealth()
    })

    return {
      loading,
      status,
      isOnline
    }
  }
}
</script>

<style scoped>
.health-check {
  padding: 20px;
  text-align: center;
}

.status {
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  font-weight: bold;
}

.loading {
  background-color: #f0f0f0;
  color: #666;
}

.is-online {
  background-color: #4caf50;
  color: white;
}

.is-offline {
  background-color: #f44336;
  color: white;
}
</style>
