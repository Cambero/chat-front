<template lang="html">
  <b-row align-h="end">
    <b-col cols="7">
      <b-form class='room-form pt-2' @submit.prevent="addRoom">
        <b-input-group prepend="Crear Sala">
          <b-form-input
            v-model="roomData.name"
            type="text"
            placeholder="nombre de la sala"
            required
            autofocus
          />

          <b-input-group-append>
            <b-button variant="primary" type="submit">
              Añadir Sala
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'RoomForm',
  data() {
    return {
      roomData: {
        name: '',
        user: this.$store.getters.currentUserId,
      },
    };
  },
  methods: {
    addRoom() {
      this.$emit('addRoom', this.roomData);
      // WARNING
      // TODO
      // to reset a input??
      Object.assign(this.$data, this.$options.data.call(this));
    },
  },
};
</script>
