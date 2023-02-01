<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    :class="comment.type === 'reply' ? 'reply-container' : 'comment-container'"
  >
    <!-- class="comment-container" -->
    <div
      :class="comment.type === 'reply' ? 'reply-container' : 'card-container'"
    >
      <div class="card-elements-container">
        <div class="card-header-container">
          <div class="picture-container">
            <img
              class="picture"
              alt="profile-image"
              src="https://placedog.net/640/480?random
"
            />
            <!-- :src="require(`../assets/${FindAuthorOfComment.image.png}`)" -->
          </div>
          <div class="username-container">
            <span class="username">
              {{ FindAuthorOfComment.username }}
            </span>
          </div>

          <div v-if="isCurrentUserAuhtorOfComment" class="you-label">
            <span>you</span>
          </div>
          <div class="createdAt-container">
            <span>
              {{ new Date(comment.date).toLocaleDateString() }} at
              {{ new Date(comment.date).getHours() }}:{{
                new Date(comment.date).getMinutes().toString().padStart(2, "0")
              }}
            </span>
          </div>
        </div>

        <div class="content-container">
          <div v-if="!EditFormOpen">
            <span v-if="comment.type === 'reply'">
              @{{ FindAuthorOfParentComment.username }}
            </span>
            <a v-html="comment.content"></a>
          </div>
          <CommentForm
            v-else
            :comment="comment"
            :commentFormType="commentFormType"
            :handleEditFormOpen="openEditForm"
            @closeForm="closeForm"
          />
        </div>

        <div class="score-container"></div>

        <div class="edit-container">
          <div
            v-if="isCurrentUserAuhtorOfComment"
            @click="openDeleteModal()"
            class="delete"
          >
            <div>
              <img :src="deleteIcon" alt="delete comment" />
            </div>
            <span> Delete </span>
          </div>

          <div
            v-if="isCurrentUserAuhtorOfComment"
            @click="openEditForm()"
            class="edit"
          >
            <div>
              <img :src="editIcon" alt="edit comment" />
            </div>
            <span>Edit</span>
          </div>

          <div
            v-if="isUserAuhtorisedToReply"
            @click="openReplyForm()"
            class="reply-btn-container"
          >
            <img class="reply-icon" :src="replyIcon" alt="reply icon" />
            <span>reply</span>
          </div>
        </div>
      </div>
    </div>

    <CommentForm
      v-if="replyFormOpen"
      :comment="comment"
      :commentFormType="commentFormType"
      :handleReplyFormOpen="openReplyForm"
      @closeForm="closeForm"
    />

    <div
      class="replies-container"
      v-if="comment.type === 'comment' && comment.replies.length > 0"
    >
      <Comment
        v-for="reply in comment.replies"
        :key="reply._id"
        :comment="reply"
      />
    </div>
  </div>
</template>

<script>
import CommentForm from "../components/CommentForm.vue";
import ReplyIcon from "../assets/images/icon-reply.svg";
import DeleteIcon from "../assets/images/icon-delete.svg";
import EditIcon from "../assets/images/icon-edit.svg";
import json from "../../data.json";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Comment",
  components: {
    CommentForm,
  },
  props: {
    comment: Object,
  },

  data: function () {
    return {
      currentUser: json.currentUser,
      commentFormType: "",

      deleteModalOpen: false,
      replyFormOpen: false,
      EditFormOpen: false,

      replyIcon: ReplyIcon,
      deleteIcon: DeleteIcon,
      editIcon: EditIcon,
    };
  },
  created() {},

  computed: {
    ...mapGetters(["comments"]),

    FindAuthorOfParentComment: {
      get() {
        const parentComment = this.comments.find(
          (comment) => comment._id === this.comment.parentComment
        );
        const commentUser = json.users.find(
          (user) => user._id === parentComment.user
        );
        return commentUser;
      },
      // Dependency properties
      dep: ["commentUser", "comments", "comment"],
    },
    FindAuthorOfComment: {
      get() {
        const commentUser = json.users.find(
          (user) =>
            user._id === this.comment.user &&
            this.currentUser !== this.comment.user
        );

        return commentUser;
      },
      // Dependency properties
      dep: ["commentUser", "comment.user"],
    },
    isCurrentUserAuhtorOfComment: {
      get() {
        if (this.currentUser._id === this.comment.user) {
          return true;
        } else return false;
      },
      // Dependency properties
      dep: ["currentUser._id", "comment.user"],
    },
    isUserAuhtorisedToReply: {
      get() {
        if (this.comment.type === "comment") {
          return true;
        } else return false;
      },
      // Dependency properties
      dep: ["comment.type"],
    },
  },
  methods: {
    ...mapActions(["deleteCommentOrReply"]),

    closeForm() {
      if (
        this.commentFormType === "comment-update" ||
        this.commentFormType === "reply-update"
      )
        this.EditFormOpen = !this.EditFormOpen;
      if (this.commentFormType === "comment-reply")
        this.replyFormOpen = !this.replyFormOpen;
    },
    openDeleteModal() {
      this.deleteModalOpen = !this.deleteModalOpen;
      if (this.deleteModalOpen) {
        this.$swal
          .fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            background: "#f2f2f2",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.deleteModalOpen = !this.deleteModalOpen;
              this.deleteCommentOrReply(this.comment);
            } else this.deleteModalOpen = !this.deleteModalOpen;
          });
      }
    },
    openReplyForm() {
      if (this.EditFormOpen) this.EditFormOpen = !this.EditFormOpen;

      this.replyFormOpen = !this.replyFormOpen;

      this.commentFormType = "comment-reply";
    },
    openEditForm() {
      if (this.replyFormOpen) this.replyFormOpen = !this.replyFormOpen;

      this.EditFormOpen = !this.EditFormOpen;

      if (this.comment.type === "comment")
        this.commentFormType = "comment-update";
      else this.commentFormType = "reply-update";
    },
  },
};
</script>

<style>
@import "./../assets/styles/commentCard.css";
</style>
