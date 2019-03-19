<template lang="html">
  <div class="message">
    @{{ message.username }}  {{ message.content }}
  </div>
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
