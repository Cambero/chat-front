<template>
  <b-container>
    <b-row>
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

import api from '@/api';

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
    searchedRooms() {
      const searchFilter = room => room.name.toLowerCase().match(this.searchInput.toLowerCase());
      return _.filter(this.rooms, searchFilter);
    },

  },
  created() {
    api.getRooms().then((response) => {
      this.rooms = response.data;
    }).catch((error) => {
      console.log(`[Rooms.created() get Rooms]Something went wrong!${error}`);
    });

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
      api.createRoom(roomData).then(() => {}).catch((error) => {
        console.log(`[CreateRoom] Something went wrong!${error}`);
      });
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
