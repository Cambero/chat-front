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

export default {
  data() {
    return {
      mentions: [],
    };
  },
  created() {
    const cable = ActionCable.createConsumer(`ws://localhost:3000/cable?user_id=${this.$store.getters.currentUserId}`);
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
