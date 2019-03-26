<template lang="html">
  <b-container>
    <b-row>
      <b-col>
        <h1 class="float-left">{{ room.name }} ( {{ room.user }} )</h1>
      </b-col>
      <b-col class='text-right'>
        <router-link to="/rooms">Volver a salas</router-link>
      </b-col>
    </b-row>
    <div class='list-messages'>
       <div class='pb-4'>
         <Message v-for="message in room.lastests_messages" :key="message.id" :message="message" />
       </div>
    </div>

    <MessageForm @addMessage="createMessage" />
  </b-container>
</template>

<script>
import Message from '@/components/Message.vue';
import MessageForm from '@/components/MessageForm.vue';
import ActionCable from 'actioncable';
import api from '@/api';

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
    api.getRoom(this.$route.params.id).then((response) => {
      this.room = response.data;
    }).catch((error) => {
      console.log(`[Room.created() getRoom]Something went wrong!${error}`);
    });


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
      api.createMessage(this.$route.params.id, messageData).then(() => {
      }).catch((error) => {
        console.log(`[createMessage]Something went wrong!${error}`);
      });
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
