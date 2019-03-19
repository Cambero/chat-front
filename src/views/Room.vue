<template lang="html">
  <div class="">
    <router-link to="/rooms">Salas</router-link>
    <h1>{{ room.name }}</h1>
    <Message v-for="message in room.lastests_messages" :key="message.id" :message="message" />
    <MessageForm @addMessage="createMessage" />
  </div>
</template>

<script>
import Message from '@/components/Message.vue';
import MessageForm from '@/components/MessageForm.vue';

export default {
  name: 'Room',
  data() {
    return {
      room: [],
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  created() {
    this.$http.get(`http://localhost:3000/rooms/${this.$route.params.id}`).then(
      (response) => {
        this.room = response.data;
      },
      (response) => {
        console.log(`[Room.created()]Something went wrong!${response.data}`);
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
          this.room.lastests_messages.push(response.data);
          console.log('ok crear mensaje');
        },
        (response) => {
          alert(`Something went wrong!${response.data}`);
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
