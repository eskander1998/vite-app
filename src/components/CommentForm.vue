<template>
  <form
    action=""
    method="post"
    @submit.prevent="handleSend"
    :class="[
      commentFormType === 'reply-update'
        ? 'comment-form-reply-container'
        : 'comment-form-container',
    ]"
  >
    <div class="input-container">
      <textarea
        v-model="commentData.content"
        class="comment-input"
        name="content"
        placeholder="Add a comment..."
      >
      </textarea>
    </div>
    <div
      class="picture-container"
      v-if="
        commentFormType !== 'comment-update' &&
        commentFormType !== 'reply-update'
      "
    >
      <img
        class="picture"
        alt="profile picture"
        src="https://placedog.net/640/480?random
"
      />
      <!-- :src="require(`../assets/${this.currentUser.image.png}`)" -->
    </div>

    <div class="send-btn-container">
      <button class="send-btn" type="submit">
        <span v-if="commentFormType === 'comment-new'">SEND</span>
        <span v-if="commentFormType === 'comment-reply'">REPLY</span>
        <span
          v-if="
            commentFormType === 'comment-update' ||
            commentFormType === 'reply-update'
          "
          >UPDATE</span
        >
      </button>

      <button
        v-if="commentFormType !== 'comment-new'"
        class="send-btn"
        @click="$emit('closeForm')"
      >
        <span>CANCEL</span>
      </button>
    </div>
  </form>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import json from "../../data.json";
import { mapActions } from "vuex";

// eslint-disable-next-line no-unused-vars
const BASE_URL = "http://localhost:3000/api/comments";

export default {
  name: "CommentForm",
  props: {
    comment: Object,
    commentFormType: String,
    parentRessourceType: String,
    parentRessource: String,
    handleReplyFormOpen: Function,
    handleEditFormOpen: Function,
  },
  data: function () {
    return {
      currentUser: json.currentUser,
      commentData: {
        _id:
          this.commentFormType === "comment-update" ||
          this.commentFormType === "reply-update" ||
          this.commentFormType === "comment-reply"
            ? this.comment._id
            : "",
        replyingTo:
          this.commentFormType === "comment-reply" ? this.comment.user : "",
        content:
          this.commentFormType === "comment-update" ||
          this.commentFormType === "reply-update"
            ? this.comment.content
            : "",
        parentRessource: this.parentRessource,
        parentRessourceType: this.parentRessourceType,
        user: json.currentUser._id,
      },
    };
  },
  methods: {
    ...mapActions(["addComment", "addReply", "updateComment", "updateReply"]),
    handleComment(comment) {
      const commentType = this.commentFormType;
      switch (commentType) {
        case "comment-new":
          {
            this.addComment({
              parentRessource: comment.parentRessource,
              parentRessourceType: comment.parentRessourceType,
              user: comment.user,
              content: comment.content,
              type: "comment",
            });
          }
          break;
        case "comment-reply":
          {
            this.addReply({
              parentComment: comment._id,
              body: {
                user: comment.user,
                content: comment.content,
                type: "reply",
                date: new Date(),
              },
            });
          }

          break;
        case "comment-update":
          {
            this.updateComment({
              _id: comment._id,
              content: comment.content,
            });
          }

          break;
        case "reply-update":
          {
            this.updateReply({
              _id: comment._id,
              content: comment.content,
              type: "reply",
              user: comment.user,
              parentComment: this.comment.parentComment,
            });
          }
          break;
        default:
      }
    },

    handleSend() {
      this.commentData.content = this.$sanitize(this.commentData.content);

      if (this.commentData.content.length < 2) {
        this.$swal.fire({
          title: "Vide",
          text: "Vous devez écrire un commentaire !",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Okey !",
          background: "#f2f2f2",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
        });
      } else if (this.commentData.content.length > 500) {
        this.$swal.fire({
          title: "Commentaire trop long",
          text: "Vous avez depassé 500 charactères !",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Okey !",
          background: "#f2f2f2",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
        });
      } else {
        if (this.commentFormType == "comment-reply") {
          this.handleReplyFormOpen();
        }

        if (
          this.commentFormType == "comment-update" ||
          this.commentFormType == "reply-update"
        ) {
          this.handleEditFormOpen();
        }

        this.handleComment(this.commentData);
      }

      this.commentData.content = "";
    },
  },
};
</script>
<style>
@import "./../assets/styles/commentForm.css";
</style>
