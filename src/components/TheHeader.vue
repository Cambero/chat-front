<template>
  <b-container>
    <b-navbar type='dark' variant='info'>
      <b-navbar-brand href='#'>
        <img src='@/assets/logo.png' width='40' alt='Chat'>
      </b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <template v-if='currentUser'>
          <b-nav-item>
            <i class='far fa-user'></i>
            @{{ currentUser }}
          </b-nav-item>
          <b-nav-item>
            <a @click='signOut'>Salir</a>
          </b-nav-item>
        </template>
        <template v-else>
          Adios
        </template>
      </b-navbar-nav>
    </b-navbar>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({ currentUser: 'currentUser' }),
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOut').then(() => {
        this.$router.replace('/sign-in');
      });
    },
  },
};
</script>
