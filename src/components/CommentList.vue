<template>
  <div class="comments-container">
    <Comment
      v-for="(comment, index) in comments"
      :key="index"
      :comment="comment"
    />
  </div>
</template>

<script>
import Comment from "./Comment.vue";
import { io } from "socket.io-client";
import { mapGetters, mapActions } from "vuex";

const SOCKET_URL = "http://localhost:4000";
export default {
  name: "CommentList",
  components: {
    Comment,
  },
  props: {
    parentRessource: String,
    parentRessourceType: String,
  },
  data: () => {
    return {
      socket: io(SOCKET_URL),
    };
  },
  computed: {
    ...mapGetters(["comments"]),
  },
  methods: {
    ...mapActions(["fetchComments"]),
  },
  created() {
    this.fetchComments({
      parentRessourceType: this.parentRessourceType,
      parentRessource: this.parentRessource,
    });
  },
  mounted() {},

  beforeUnmount() {
    this.socket.disconnect();
  },
};
</script>

<style>
@import "./../assets/styles/commentList.css";
</style>
