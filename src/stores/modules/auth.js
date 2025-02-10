import { defineStore } from 'pinia';
import api from '@/services/api';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
        user: null,
        loading: false,
    }),

    getters: {
        userName: (state) => state.user?.name || '',
        userEmail: (state) => state.user?.email || '',
    },

    actions: {
        async checkAuth() {
            try {
                const response = await api.get('users/welcome');
                this.isLoggedIn = response.status === 200;
                if (this.isLoggedIn) {
                    this.user = response.data.user;
                }
                return this.isLoggedIn;
            } catch {
                this.isLoggedIn = false;
                this.user = null;
                return false;
            }
        },

        async login(credentials) {
            this.loading = true;
            try {
                const response = await api.post('users/login', { user: credentials });
                if (response.status === 200) {
                    this.isLoggedIn = true;
                    this.user = response.data.user;
                    router.push('/');
                }
            } catch (error) {
                console.log(error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async logout() {
            this.loading = true;
            try {
                await api.delete('users/logout');
                localStorage.removeItem('_session_id');
                this.isLoggedIn = false;
                this.user = null;
                router.push('/signin');
            } catch (error) {
                console.log(error);
                throw error;
            } finally {
                this.loading = false;
            }
        }
    }
});