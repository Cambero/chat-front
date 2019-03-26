<template>
  <b-container>
    <b-row>
      <b-col>
        <h5 class='text-center'>Usuarios</h5>
      </b-col>
    </b-row>

    <div class="list-users">
      <ul class='list-group-flush'>
        <li
          v-for="user in users"
          v-bind:key='user.username'
          class="list-group-item d-flex align-items-center justify-content-between"
        >
          <span> {{ user.username }} </span>
          <span class='status' v-bind:class="{ online: user.online }">
          </span>
        </li>
      </ul>
    </div>
  </b-container>
</template>

<script>
import api from '@/api';

export default {
  name: 'UserList',
  data() {
    return {
      users: [],
    };
  },
  created() {
    api.getUsers().then((response) => {
      this.users = response.data;
    }).catch((error) => {
      console.log(`[UserList.created() getUsers]Something went wrong!${error}`);
    });
  },
};
</script>

<style lang="scss" scoped>
.list-users {
  max-height: 45vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

.status {
  height: 15px;
  width: 15px;
  background-color: gray;
  border-radius: 50%;
  display: inline-block;
}

.online {
  height: 20px;
  width: 20px;
  background-color: green;
}
</style>
