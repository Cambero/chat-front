<template>
  <b-container id="app">
    <TheHeader />
    <div class='pb-5'>
      <router-view></router-view>
    </div>
    <b-jumbotron class="text-center">
      <p>Footer</p>
    </b-jumbotron>
  </b-container>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';

export default {
  components: {
    TheHeader,
  },
};
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>
