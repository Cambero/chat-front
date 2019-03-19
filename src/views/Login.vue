<template>
  <b-container>
    <b-row align-h="center" >
      <b-col cols="4">
        <b-form @submit.prevent="signup" autocomplete="off">
          <b-form-group>
            <b-form-input
              v-model.trim="user"
              class="form-control"
              placeholder="Usuario"
              required
            />
          </b-form-group>
          <button type="submit" class="btn btn-info btn-block">
            Entrar
          </button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

export default {
  data() {
    return {
      user: '',
    };
  },

  created() {
    if (this.$store.getters.currentUser) {
      this.$router.replace(this.$route.query.redirect || '/rooms');
    }
  },
  methods: {
    signup() {
      this.$store.dispatch('signup', { user: this.user });
      this.$router.replace(this.$route.query.redirect || '/rooms');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
