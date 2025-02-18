<template>
  <div class="fake-loading-container">
    <div class="fake-loading-header">
      <img src="../assets/logo.svg" alt="Logo" width="100" />
      <div class="big-title">NoteApp</div>
    </div>
    <div class="slogan">
      <span class="typed-text">{{ typedSlogan }}</span>
      <span v-if="showCursor" class="blinking-cursor"></span>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "FakeLoadingView",
  setup() {
    const fullText = "Thoughts become things";
    const typedSlogan = ref("");
    const showCursor = ref(false);
    const router = useRouter();
    onMounted(() => {
      let currentIndex = 0;
      const typingSpeed = 90; // 90ms por caractere
      const typeInterval = setInterval(() => {
        typedSlogan.value += fullText[currentIndex];
        currentIndex++;
        if (currentIndex >= fullText.length) {
          clearInterval(typeInterval);
          // Exibe o cursor piscante por 2 segundos em linha com o texto
          showCursor.value = true;
          setTimeout(() => {
            showCursor.value = false;
            // Redireciona apenas após o fim da animação completa
            router.push("/");
          }, 3000);
        }
      }, typingSpeed);
    });

    return {
      typedSlogan,
      showCursor,
      router,
    };
  },
};
</script>

<style scoped>
.fake-loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70%;
}

.fake-loading-header {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 0.3rem;
}

.big-title {
  font-size: 5rem;
  font-weight: bold;
}

.slogan {
  font-size: 2.2rem;
  font-weight: bold;
  color: #42b883;
}

.typed-text {
  /* O texto digitado permanece inline sem modificações */
}

/* Definição do cursor em linha */
.blinking-cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: #42b883;
  margin-left: 2px;
  animation: blink 1s step-start infinite;
  vertical-align: middle;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
