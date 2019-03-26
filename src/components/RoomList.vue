<template>
  <b-container>
    <div v-if="isEmpty" class="pt-3">
      <h1 class="text-center">
        Aún no hay salas, crea la primera
      </h1>
    </div>
    <b-row v-else>
      <b-col>
        <h1 class="float-left">Salas</h1>
      </b-col>
      <b-col class="pt-2">
        <b-input-group prepend="Filtrar salas">
          <b-form-input
            v-model.trim="searchInput"
            type="text"
            placeholder="escribe para filtrar"
            autofocus
          />
        </b-input-group>
      </b-col>
    </b-row>

    <div class="list-rooms">
      <ul class='list-group-flush'>
        <RoomListItem v-for="room in searchedRooms" :room="room" :key="room.id" />
      </ul>
    </div>
    <RoomForm @addRoom="createRoom"/>
  </b-container>
</template>

<script>
import _ from 'lodash';
import RoomListItem from '@/components/RoomListItem.vue';
import RoomForm from '@/components/RoomForm.vue';
import ActionCable from 'actioncable';

const cable = ActionCable.createConsumer('ws://localhost:3000/cable');

export default {
  name: 'RoomList',
  data() {
    return {
      rooms: [],
      searchInput: '',
    };
  },
  computed: {
    isEmpty() {
      return this.rooms.length === 0;
    },
    searchedRooms() {
      const searchFilter = room => room.name.toLowerCase().match(this.searchInput.toLowerCase());
      return _.filter(this.rooms, searchFilter);
    },

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
        connected() {},
        disconnected() {},
        received: (data) => { this.rooms.unshift(data); },
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
  max-height: 60vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
