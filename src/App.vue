<template>
  <b-container id="app">
    <TheHeader />
    <div class='pb-5'>
      <router-view></router-view>
    </div>
    <TheFooter v-if="this.$store.getters.currentUser"/>
  </b-container>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>
