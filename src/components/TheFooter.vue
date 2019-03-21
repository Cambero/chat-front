<template>
  <div>
      Menciones:
      <ul>
        <li v-for="mention in mentions" :key="mention">
          {{ mention }}
        </li>
      </ul>
  </div>
</template>

<script>
import ActionCable from 'actioncable';

const cable = ActionCable.createConsumer('ws://localhost:3000/cable');

export default {
  data() {
    return {
      mentions: [],
    };
  },
  created() {
    cable.subscriptions.create(
      { channel: 'RoomChannel', room: `user_${this.$store.getters.currentUser}` },
      {
        connected() {},
        disconnected() {},
        received: (data) => {
          this.mentions.unshift(data);
        },
      },
    );
  },
};
</script>

<style lang="css" scoped>
</style>
