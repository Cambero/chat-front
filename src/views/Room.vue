<template lang="html">
  <div class="">
    <b-navbar>
      <b-navbar-nav>
        <b-navbar-nav-item>
          <h1 class="float-left">{{ room.name }} ( {{ room.user }} )</h1>
        </b-navbar-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-navbar-nav-item>
          <router-link to="/rooms">Volver a salas</router-link>
        </b-navbar-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <div class='list-messages'>
       <div class='pb-4'>
         <Message v-for="message in room.lastests_messages" :key="message.id" :message="message" />
       </div>
    </div>

    <MessageForm @addMessage="createMessage" />
  </div>
</template>

<script>
import Message from '@/components/Message.vue';
import MessageForm from '@/components/MessageForm.vue';
import ActionCable from 'actioncable';

const cable = ActionCable.createConsumer('ws://localhost:3000/cable');

export default {
  name: 'Room',
  data() {
    return {
      room: Object,
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  created() {
    console.log('Room.vue -> created()');
    this.$http.get(`http://localhost:3000/rooms/${this.$route.params.id}`).then(
      (response) => {
        this.room = response.data;
      },
      (response) => {
        if (response.data.status === 404) {
          this.$router.push('/rooms');
        }
        console.log(`[Room.created()]Something went wrong!${response.data}`);
      },
    );
    cable.subscriptions.create(
      { channel: 'RoomChannel', room: this.$route.params.id },
      {
        connected() { },
        disconnected() { },
        received: (data) => {
          this.room.lastests_messages.push(data);

          // scroll div to bottom
          const container = this.$el.querySelector('.list-messages');
          container.scrollTop = container.scrollHeight;
        },
      },
    );
  },
  methods: {
    createMessage(messageData) {
      console.log(this.$route.params.id);
      this.$http.post(
        `http://localhost:3000/rooms/${this.$route.params.id}/messages`,
        { message: messageData },
      ).then(
        (response) => {
          console.log(`createMessage ok: ${response.data}`);
        },
        (response) => {
          console.log(`[Room.vue->createMessage]Something went wrong!${response.data}`);
        },
      );
    },
  },
  components: {
    Message,
    MessageForm,
  },
};
</script>

<style lang="scss" scoped>
.list-messages {
  max-height: 40vh;
  overflow-y: scroll;
  overflow-x: hidden;
  border-style: inset;
}
</style>
