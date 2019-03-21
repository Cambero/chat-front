<template lang='html'>
  <li class='list-group-item d-flex align-items-center justify-content-between'>
    <router-link :to="{ name: 'Room', params: { id: room.id } }">
      <span> {{ room.name }} </span>
    </router-link>
    <span class="badge badge-primary badge-pill">{{ room.user }}</span>
  </li>
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
          user: '',
        };
      },
    },
  },
};
</script>
