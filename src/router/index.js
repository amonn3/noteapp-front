import { createRouter, createWebHistory } from "vue-router";
import api from "@/services/api";
import HomeView from "@/views/HomeView.vue";
import HealthCheck from "@/views/HealthCheck.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import CreateNoteView from "@/views/CreateNoteView.vue";
import NoteView from "@/views/NoteView.vue";
import AllNotesView from "@/views/AllNotesView.vue";
import FakeLoadingView from "@/views/FakeLoadingView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/health",
    name: "health",
    component: HealthCheck,
  },
  {
    path: "/signin",
    name: "signin",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "signup",
    component: RegisterView,
  },
  {
    path: "/create-note",
    name: "create-note",
    component: CreateNoteView,
  },
  {
    path: "/users/notes/:id",
    name: "note",
    component: NoteView,
  },
  {
    path: "/users/notes",
    name: "all-notes",
    component: AllNotesView,
  },
  {
    path: "/slogan",
    name: "slogan",
    component: FakeLoadingView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Função para verificar autenticação
async function checkAuth() {
  try {
    const response = await api.get("users/welcome");
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = await checkAuth();

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({
      path: "/signin",
      query: {
        login_needed: true,
      },
    });
  } else if (
    (to.path === "/signin" || to.path === "/signup") &&
    isAuthenticated
  ) {
    next("/");
  } else {
    next();
  }
});

export default router;
