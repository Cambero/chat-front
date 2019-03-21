<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <h2 class="text-center">Crear cuenta</h2>
        <h5 class="text-center">
          <router-link to="/sign-in">
            ¿Tienes una cuenta?
          </router-link>
        </h5>
        <Errors :errors="errors" />
        <form @submit.prevent="signUp">
          <div class="form-group">
            <input v-model.trim="username"
                   class="form-control"
                   placeholder="Usuario"
                   required>
          </div>
          <div class="form-group">
            <input v-model.trim="password"
                   class="form-control"
                   type="password"
                   placeholder="Contraseña"
                   required>
          </div>
          <button type="submit" class="btn btn-info btn-block">
            Crear
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Errors from '@/components/Errors.vue';

export default {
  components: { Errors },
  data() {
    return {
      username: '',
      password: '',
      errors: {},
    };
  },
  methods: {
    signUp() {
      this.$store
        .dispatch('signUp', {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.errors = {};
          this.$router.replace(this.$route.query.redirect || '/rooms');
        })
        .catch((errors) => {
          this.errors = errors;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.error {
  color: red;
  text-align: center;
}
</style>
