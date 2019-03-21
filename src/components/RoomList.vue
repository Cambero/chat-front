<template>
  <b-container>
    <b-row>
      <b-col>
        <h1 class="float-left">Salas</h1>
      </b-col>
      <b-col class="pt-2">
        <b-input-group prepend="Filtrar">
          <b-form-input
            v-model.trim="searchInput"
            type="text"
            placeholder="escribe el termino para filtrar"
            autofocus
          />
        </b-input-group>
      </b-col>
    </b-row>

    <!-- <input type="text" placeholder="Filtrar Salas" v-model.trim="searchInput"> -->

    <!-- <div v-if class="list-rooms">
      <div class="pb-5">
        <RoomListItem  v-for="room in ownRooms" :room="room" :key="room.id" />
      </div>
    </div> -->

    <div class="list-rooms">
      <div class="pb-5">
        <RoomListItem v-for="room in searchedRooms" :room="room" :key="room.id" />
      </div>
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
    ownRooms() {
      return _.filter(this.rooms, ['user', this.$store.getters.currentUser]);
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
  max-height: 40vh;
  overflow-y: scroll;
  overflow-x: hidden;
  border: 1px solid lightgrey;
}
</style>
