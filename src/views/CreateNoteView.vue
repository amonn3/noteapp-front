<template>
  <div class="create-note-container">
    <div class="create-note-title">Criar Nota</div>
    <div class="create-note-form">
      <v-form>
        <v-text-field label="Título" v-model="title" />
        <v-textarea label="Conteúdo" v-model="content" />
      </v-form>
    </div>
    <div class="create-note-actions">
      <v-btn
        color="primary"
        variant="outlined"
        prepend-icon="mdi-content-save"
        class="elevation-24 text-none"
        rounded="small"
        block
        @click="saveNote"
        :loading="loading"
        :disabled="loading"
      >
        Salvar
      </v-btn>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores";

export default {
  name: "CreateNoteView",
  setup() {
    const router = useRouter();
    const title = ref("");
    const content = ref("");
    const loading = ref(false);

    const saveNote = async () => {
      if (title.value === "" || content.value === "" || loading.value) {
        return;
      }

      loading.value = true;

      try {
        const res = await api.post("users/notes", {
          note: {
            title: title.value,
            content: content.value,
          },
        });
        useAuthStore().user.notes.push(res.data.note);
        router.push(`/users/notes/${res.data.note._id}`);
      } catch (error) {
        console.error(error);
        loading.value = false; // Reseta o loading em caso de erro
      }
    };
    return {
      title,
      content,
      saveNote,
      loading,
    };
  },
};
</script>

<style scoped>
.create-note-container {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-family: "Roboto Slab";
  width: 80%;
  margin: 0 auto;
  padding: 2rem;
}

.create-note-title {
  font-size: 2rem;
  font-weight: 500;
}

.create-note-actions {
  width: fit-content;
}
</style>
