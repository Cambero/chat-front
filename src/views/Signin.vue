<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <h2 class="text-center">Entrar</h2>
        <h5 class="text-center">
          <router-link to="/sign-up">
            ¿Necesitas una cuenta?
          </router-link>
        </h5>
        <p v-if="$route.query.redirect" class="error">
          Primero necesitas entrar
        </p>
        <p v-if="error" class="error">
          {{ error }}
        </p>
        <form @submit.prevent="signIn" autocomplete="off">
          <div class="form-group">
            <input v-model.trim="username"
                   class="form-control"
                   placeholder="Usuario"
                   required>
          </div>
          <div class="form-group">
            <input v-model.trim="password"
                   class="form-control"
                   placeholder="Contraseña"
                   type="password"
                   required>
          </div>
          <button type="submit" class="btn btn-info btn-block">
            Entrar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
    };
  },
  created() {
    this.checkCurrentUser();
  },
  updated() {
    this.checkCurrentUser();
  },
  methods: {
    signIn() {
      this.$store
        .dispatch('signIn', {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.replace(this.$route.query.redirect || '/rooms');
        })
        .catch((error) => {
          this.error = error;
        });
    },
    checkCurrentUser() {
      if (this.$store.getters.currentUser) {
        this.$router.replace(this.$route.query.redirect || '/rooms');
      }
    },
  },
};
</script>
