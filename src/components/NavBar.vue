<template>
    <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/health">Health</router-link> |
        <router-link to="/dashboards">Dashboard</router-link>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar',
    data() {
      return {
        menuItems: [
          {
            title: 'Home',
            path: '/',
            icon: 'mdi-home'
          },
          {
            title: 'Health',
            path: '/health',
            icon: 'mdi-heart'
          },
          {
            title: 'Dashboard',
            path: '/dashboards',
            icon: 'mdi-view-dashboard'
          }
        ]
      }
    }
  }
  </script>

  <style scoped >
  nav {
    padding: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
    font-size: 20px;
  }
  nav a.router-link-active {
    color: #42b983;
    font-weight: bold;
  }
  nav a:visited {
    color: inherit !important;
  }
  nav a{
    color: inherit !important;
  }

  nav a.router-link-active {
    color: #42b883 !important; 
  }
  </style>