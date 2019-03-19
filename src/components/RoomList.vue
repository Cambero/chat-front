<template>
  <b-container>
    <h1 class="float-left">Salas</h1>
    <RoomForm @addRoom="createRoom"/>
    <br>
    <RoomListItem v-for="room in rooms" :room="room" :key="room.id" />
  </b-container>
</template>

<script>
import RoomListItem from '@/components/RoomListItem.vue';
import RoomForm from '@/components/RoomForm.vue';

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
  },
  methods: {
    createRoom(roomData) {
      this.$http.post('http://localhost:3000/rooms/', { room: roomData }).then(
        (response) => {
          this.rooms.push(response.data);
        },
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
