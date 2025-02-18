<template>
  <div
    class="home d-flex flex-column align-items-center justify-content-center"
  >
    <div class="welcome-container text-center">
      <div class="content-container">
        <v-card
          v-if="hasNotes"
          class="pa-6 rounded-lg elevation-24"
          width="70%"
        >
          <div class="d-flex flex-column align-center">
            <div class="font-weight-medium mb-2 text-start">
              Olá, {{ userName }}! Você já criou
              {{ notesCount === 1 ? "1 nota" : notesCount + " notas" }} e aqui
              estão as mais recentes.
            </div>
            <div class="last-notes-container">
              <div class="last-notes-title">Últimas Notas</div>
              <v-list class="note-list">
                <v-list-item v-for="note in lastNotes" :key="note._id">
                  <a
                    :href="`users/notes/${note._id}`"
                    class="note-link"
                    target="_blank"
                  >
                    - {{ note.title }}
                  </a>
                </v-list-item>
              </v-list>
            </div>
          </div>
        </v-card>
        <v-card v-else class="pa-6 rounded-lg elevation-24" width="70%">
          <div class="d-flex flex-column align-center">
            <div class="font-weight-medium mb-2 text-start">
              Você ainda não criou nenhuma nota. Comece agora mesmo!
            </div>
          </div>
        </v-card>

        <v-card class="pa-6 rounded-lg elevation-24" width="30%">
          <div class="action-btns">
            <div class="action-btn-container">
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
            </div>
            <div class="action-btn-container">
              <v-btn
                block
                color="secondary"
                variant="outlined"
                @click="allNotes"
                class="text-none"
                prepend-icon="mdi-note-multiple"
                rounded
              >
                Ver Todas
              </v-btn>
            </div>
          </div>
        </v-card>
      </div>
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
import { ref, onMounted, computed } from "vue";
import api from "@/services/api";
import { useRouter } from "vue-router";

export default {
  name: "HomeView",
  components: {},
  setup() {
    const message = ref("");
    const loading = ref(true);
    const router = useRouter();
    const userName = ref("");
    const lastNotes = ref([]);
    const isLoggingOut = ref(false);
    const showErrorAlert = ref(false);
    const errorMessage = ref("");
    const notesCount = ref(0);

    const hasNotes = computed(() => notesCount.value > 0);

    const handleLogout = async () => {
      isLoggingOut.value = true;
      try {
        await api.delete("users/logout");
        router.push("/signin");
      } catch (error) {
        showErrorAlert.value = true;
        errorMessage.value = "Erro ao fazer logout. Tente novamente.";
        setTimeout(() => {
          showErrorAlert.value = false;
        }, 4000);
      } finally {
        isLoggingOut.value = false;
      }
    };

    const fetchUser = async () => {
      try {
        const response = await api.get("users/welcome");
        message.value = response.data.message;
        userName.value = response.data.user.name;
        lastNotes.value = response.data.user.notes.reverse().slice(0, 5);
        notesCount.value = response.data.user.notes.length;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          router.push("/signin");
        }
      } finally {
        loading.value = false;
      }
    };

    const createNote = () => {
      router.push("/create-note");
    };

    const allNotes = () => {
      router.push("/users/notes");
    };

    onMounted(() => {
      fetchUser();
    });

    return {
      message,
      loading,
      userName,
      handleLogout,
      isLoggingOut,
      showErrorAlert,
      errorMessage,
      lastNotes,
      createNote,
      notesCount,
      allNotes,
      hasNotes,
    };
  },
};
</script>

<style scoped>
.home {
  padding: 2rem;
}

.last-notes-container {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.note-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.welcome-container {
  width: 80%;
  margin: 0 auto;
  font-family: "Roboto Slab";
}

.last-notes-title {
  color: #d2d2d2;
  font-size: 1.2rem;
  font-weight: 500;
}

.text-start {
  font-size: 1.5rem;
  width: fit-content;
}

.content-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.action-btns {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 100%;
}
.action-btn-container {
  padding: 8px;
  width: 80%;
}

.note-link {
  color: inherit !important;
  text-decoration: none;
}

.note-link:visited {
  color: inherit !important;
}

.note-link:hover {
  color: #42b883 !important;
  transition: color 0.3s ease;
}

.note-link.router-link-active {
  color: #42b883 !important;
}

@media (max-width: 1366px) {
  .text-start {
    font-size: 1.3rem;
  }

  .last-notes-container {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}
</style>
