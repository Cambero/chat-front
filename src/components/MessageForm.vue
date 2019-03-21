<template lang="html">
  <b-form class='message-form pt-3' @submit.prevent="addMessage(messageData)">
    <b-input-group>
      <b-form-input
        v-model.trim="messageData.content"
        type="text"
        placeholder="escribe el mensaje"
        required
        autofocus
      />
      <b-input-group-append>
        <b-button variant="primary" type="submit">
          Enviar
        </b-button>
      </b-input-group-append>
    </b-input-group>
  </b-form>
</template>

<script>
export default {
  data() {
    return {
      messageData: {
        content: '',
        username: this.$store.getters.currentUser,
      },
    };
  },
  methods: {
    addMessage(messageData) {
      this.$emit('addMessage', messageData);
      // WARNING
      // TODO
      // to reset a input??
      Object.assign(this.$data, this.$options.data.call(this));
    },
  },
};
</script>
