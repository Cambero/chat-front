<template lang='html'>
  <b-row align-h='center'>
    <b-col cols='10'>
      <router-link :to="{ name: 'Room', params: { id: room.id } }">
        <h3> {{ room.name + ' (' + room.owner + ')' }} </h3>
      </router-link>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'RoomListItem',
  props: {
    room: {
      type: Object,
      required: true,
      default() {
        return {
          id: '',
          name: '',
          owner: '',
        };
      },
    },
  },
};
</script>
