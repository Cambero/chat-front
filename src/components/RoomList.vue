<template>
  <b-container>
    <h1 class="float-left">Salas</h1>
    <RoomForm @addRoom="createRoom"/>
    <br>
    <div class="list-rooms">
      <div class="pb-5">
        <RoomListItem v-for="room in rooms" :room="room" :key="room.id" />
      </div>
    </div>
  </b-container>
</template>

<script>
import RoomListItem from '@/components/RoomListItem.vue';
import RoomForm from '@/components/RoomForm.vue';
import ActionCable from 'actioncable';

const cable = ActionCable.createConsumer('ws://localhost:3000/cable');

export default {
  name: 'RoomList',
  data() {
    return {
      rooms: [],
    };
  },
  created() {
    this.$http.get('http://localhost:3000/rooms').then(
      (response) => {
        this.rooms = response.data;
      },
      (response) => {
        console.log(`[Rooms.created()]Something went wrong!${response.data}`);
      },
    );

    cable.subscriptions.create(
      { channel: 'RoomChannel', room: 'list' },
      {
        connected() {
          console.log('connected');
        },
        disconnected() {
          console.log('disconnected');
        },
        received: (data) => {
          console.log('reveived');
          console.log(data);
          if (data) {
            this.rooms.unshift(data);
            // var container = this.$el.querySelector(".list-rooms");
            // container.scrollTop = container.scrollHeight;
          }
        },
      },
    );
  },
  methods: {
    createRoom(roomData) {
      this.$http.post('http://localhost:3000/rooms/', { room: roomData }).then(
        {},
        (response) => {
          console.log(`[RoomList->createRoom]Something went wrong: ${response.data}`);
        },
      );
    },
  },
  components: {
    RoomListItem,
    RoomForm,
  },
};
</script>

<style lang="scss" scoped>
.list-rooms {
  max-height: 40vh;
  overflow-y: scroll;
  overflow-x: hidden;
  border: dotted;
}
</style>
