<template>
  <div class="note-container">
    <v-card class="mx-auto pa-6" max-width="1000">
      <div v-if="loading" class="d-flex justify-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>

      <div v-else>
        <div v-if="note">
          <div class="d-flex justify-space-between align-center mb-6">
            <h1 class="text-h4">{{ note.title }}</h1>
            <div class="d-flex action-buttons">
              <v-btn
                color="primary"
                variant="outlined"
                prepend-icon="mdi-pencil"
                @click="editNote"
                rounded
                class="text-none"
              >
                Editar
              </v-btn>
              <v-btn
                color="error"
                variant="outlined"
                prepend-icon="mdi-delete"
                @click="confirmDelete"
                rounded
                class="text-none"
              >
                Excluir
              </v-btn>
            </div>
          </div>

          <v-divider class="mb-4"></v-divider>

          <div class="note-content">
            {{ note.content }}
          </div>
        </div>
        <div v-else>Nota não encontrada.</div>
      </div>
    </v-card>

    <v-dialog v-model="showDeleteDialog" max-width="400">
      <v-card>
        <v-card-title>Confirmar exclusão</v-card-title>
        <v-card-text> Tem certeza que deseja excluir esta nota? </v-card-text>
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
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/services/api";

export default {
  name: "NoteView",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const note = ref(null);
    const loading = ref(true);
    const showDeleteDialog = ref(false);

    const fetchNote = async () => {
      try {
        const response = await api.get(`users/notes/${route.params.id}`);
        note.value = response.data.note;
      } catch (error) {
        console.error(error);
        router.push("/");
      } finally {
        loading.value = false;
      }
    };

    const editNote = () => {
      router.push(`/users/notes/${route.params.id}/edit`);
    };

    const confirmDelete = () => {
      showDeleteDialog.value = true;
    };

    const deleteNote = async () => {
      try {
        await api.delete(`users/notes/${route.params.id}`);
        router.push("/users/notes");
      } catch (error) {
        console.error(error);
      } finally {
        showDeleteDialog.value = false;
      }
    };

    onMounted(fetchNote);

    return {
      note,
      loading,
      editNote,
      confirmDelete,
      deleteNote,
      showDeleteDialog,
    };
  },
};
</script>

<style scoped>
.note-container {
  padding: 2rem;
  font-family: "Roboto Slab";
}

.note-content {
  white-space: pre-wrap;
  font-size: 1.1rem;
  line-height: 1.6;
}

.action-buttons {
  gap: 1rem;
}
</style>
