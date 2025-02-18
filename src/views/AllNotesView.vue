<template>
  <div class="all-notes-container">
    <div class="d-flex justify-space-between align-center mb-6 title-container">
      <h1 class="text-h4">Minhas Notas</h1>
      <v-btn
        color="primary"
        variant="elevated"
        prepend-icon="mdi-note-plus"
        @click="createNote"
        rounded
      >
        Nova Nota
      </v-btn>
    </div>

    <div v-if="loading" class="d-flex justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <div class="cards-container" v-else>
      <div v-if="userNotes.length === 0" class="text-center mt-8">
        <p class="text-h6">Você ainda não tem notas.</p>
        <v-btn
          color="primary"
          variant="outlined"
          class="mt-4"
          @click="createNote"
          rounded
        >
          Criar primeira nota
        </v-btn>
      </div>

      <v-row v-else>
        <v-col
          v-for="note in reversedNotes"
          :key="note._id"
          cols="3"
          md="3"
          lg="3"
        >
          <v-card
            class="mx-auto note-card"
            :to="`/users/notes/${note._id}`"
            hover
          >
            <v-card-title class="text-truncate font-weight-bold">{{
              note.title
            }}</v-card-title>
            <v-card-text class="text-truncate mt-10">
              {{
                note.content.length > 400
                  ? note.content.substring(0, 400) + "..."
                  : note.content
              }}
            </v-card-text>
            <v-card-text class="note-date">
              <v-icon>mdi-calendar</v-icon>
              {{ formatDate(note.created_at) }}
            </v-card-text>
            <v-spacer></v-spacer>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <v-dialog v-model="showDeleteDialog" max-width="400">
      <v-card>
        <v-card-title>Confirmar exclusão</v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir a nota "{{ selectedNote?.title }}"?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="text"
            @click="showDeleteDialog = false"
            >Cancelar</v-btn
          >
          <v-btn color="error" variant="text" @click="deleteNote"
            >Excluir</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores";
import api from "@/services/api";

export default {
  name: "AllNotesView",
  setup() {
    const router = useRouter();
    const auth = useAuthStore();

    // Computed para iterar as notas do usuário
    const userNotes = computed(() => auth.user?.notes || []);
    const reversedNotes = computed(() => {
      return [...userNotes.value].reverse();
    });

    // Caso necessário, você poderá manter um estado de loading enquanto a store é atualizada.
    const loading = ref(false);

    // Caso a store ainda não possua os dados do usuário (por exemplo, após um reload),
    // você pode buscar as notas via API e atualizar o usuário na store.
    const fetchUserNotes = async () => {
      loading.value = true;
      try {
        const response = await api.get("users/welcome");
        // Atualiza os dados do usuário na store
        auth.user = response.data.user;
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      } finally {
        loading.value = false;
      }
    };

    // Se o usuário não estiver carregado, chama o fetch para atualizar a store.
    if (!auth.user) {
      fetchUserNotes();
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("pt-BR");
    };

    const createNote = () => {
      router.push("/create-note");
    };

    const editNote = (id) => {
      router.push(`/users/notes/${id}/edit`);
    };

    const showDeleteDialog = ref(false);
    const selectedNote = ref(null);

    const confirmDelete = (note) => {
      selectedNote.value = note;
      showDeleteDialog.value = true;
    };

    const deleteNote = async () => {
      try {
        await api.delete(`users/notes/${selectedNote.value._id}`);
        // Remover nota da store após exclusão
        if (auth.user && auth.user.notes) {
          auth.user.notes = auth.user.notes.filter(
            (note) => note._id !== selectedNote.value._id
          );
        }
        showDeleteDialog.value = false;
      } catch (error) {
        console.error("Erro ao excluir nota:", error);
      }
    };

    return {
      userNotes,
      loading,
      createNote,
      editNote,
      confirmDelete,
      deleteNote,
      showDeleteDialog,
      selectedNote,
      formatDate,
      reversedNotes,
    };
  },
};
</script>

<style scoped>
.all-notes-container {
  padding: 2rem;
  font-family: "Roboto Slab";
}

.note-card {
  transition: transform 0.2s;
  height: 18rem;
  width: 18rem;
  padding: 1rem;
  background-color: #d6d6d6;
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  color: #1e1e1e;
  position: relative;
}

.note-card:hover {
  transform: translateY(-5px);
  background-color: #c6c6c6;
}

.cards-container {
  width: 65%;
  margin: 0 auto;
  max-height: 75vh;
  overflow-y: auto;
  padding: 2rem;
}

.cards-container::-webkit-scrollbar {
  width: 10px;
}

.cards-container::-webkit-scrollbar-thumb {
  background-color: #2c2c2c;
  border-radius: 8px;
}

.note-date {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #1e1e1e;
}

.title-container {
  width: 70%;
  margin: 0 auto;
}
</style>
