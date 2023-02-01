import axios from "axios";

const BASE_URL = "http://localhost:3000/api/comments";

const state = {
  comments: [],
};

const getters = {
  comments: (state) => state.comments,
};

const actions = {
  async fetchComments({ commit }, Ressource) {
    try {
      const response = await axios.get(
        `${BASE_URL}/comment/${Ressource.parentRessourceType}/${Ressource.parentRessource}`
      );
      commit("SET_COMMENTS", response.data);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  },

  async addComment({ commit }, Comment) {
    try {
      const response = await axios.post(`${BASE_URL}/comment`, Comment);
      commit("NEW_COMMENT", response.data);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  },
  async addReply({ commit }, Comment) {
    try {
      const response = await axios.post(
        `${BASE_URL}/comment/${Comment.parentComment}`,
        Comment.body
      );
      commit("NEW_REPLY", {
        data: response.data,
        parentComment: Comment.parentComment,
      });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  },
  async updateComment({ commit }, Comment) {
    try {
      await axios.put(`${BASE_URL}/comment/${Comment._id}`, {
        content: Comment.content,
      });
      commit("UPDATE_COMMENT", {
        content: Comment.content,
        _id: Comment._id,
      });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  },

  async updateReply({ commit }, Comment) {
    try {
      await axios.put(`${BASE_URL}/comment/${Comment._id}`, {
        content: Comment.content,
        type: "reply",
        user: Comment.user,
      });
      commit("UPDATE_REPLY", Comment);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  },
  async deleteCommentOrReply({ commit }, Comment) {
    try {
      await axios.delete(`${BASE_URL}/comment/${Comment._id}`);
      commit("DELETE_REPLY", Comment);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  },
};

const mutations = {
  SET_COMMENTS(state, comments) {
    state.comments = comments;
  },
  NEW_COMMENT(state, comment) {
    state.comments.push(comment);
  },
  NEW_REPLY(state, reply) {
    const parentComment = state.comments.find(
      (c) => c._id === reply.parentComment
    );
    parentComment.replies.push(reply.data);
  },

  UPDATE_COMMENT(state, comment) {
    const commentToUpdate = state.comments.find((c) => c._id === comment._id);
    commentToUpdate.content = comment.content;
  },
  UPDATE_REPLY(state, comment) {
    const parentComment = state.comments.find(
      (c) => c._id === comment.parentComment
    );

    const ReplyToUpdate = parentComment.replies.find(
      (r) => r._id === comment._id
    );
    ReplyToUpdate.content = comment.content;
  },
  DELETE_REPLY(state, comment) {
    if (comment.type === "reply") {
      const parentComment = state.comments.find(
        (c) => c._id === comment.parentComment
      );
      const replyIndex = parentComment.replies.findIndex(
        (r) => r._id === comment._id
      );
      parentComment.replies.splice(replyIndex, 1);
    } else {
      const commentIndex = state.comments.findIndex(
        (c) => c._id === comment._id
      );
      state.comments.splice(commentIndex, 1);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
