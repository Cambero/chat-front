<template lang="html">
  <b-container>
    <b-row>
      <b-col cols="4">
        @{{ message.username }}  {{ message.content }}
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: {
      type: Object,
      required: true,
      default() {
        return {
          username: '',
          content: '',
        };
      },
    },
  },
};
</script>
