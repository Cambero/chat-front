<template lang="html">
  <b-container>
    <b-row v-bind:class="{ 'justify-content-end': isMessageOwner }">
      <b-col cols="6" v-bind:class="{ 'text-right': isMessageOwner }">
        <span class='message-user' v-if="!isMessageOwner">{{ message.username }} >> </span>
        {{ message.content }}
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: {
      type: Object,
      required: true,
      default() {
        return {
          username: '',
          content: '',
        };
      },
    },
  },
  computed: {
    isMessageOwner() {
      return this.message.username === this.$store.getters.currentUser;
    },
  },
};
</script>

<style lang="css" scoped>
.message-user {
  font-size: small;
}
</style>
