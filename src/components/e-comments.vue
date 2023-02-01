<template>
  <main class="main-container">
    <CommentList
      :parentRessource="parentRessource"
      :parentRessourceType="parentRessourceType"
    />
    <CommentForm
      commentFormType="comment-new"
      :parentRessource="parentRessource"
      :parentRessourceType="parentRessourceType"
    />
  </main>
</template>

<script>
import CommentList from "./CommentList.vue";
import CommentForm from "../components/CommentForm.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Ecomments",
  components: {
    CommentForm,
    CommentList,
  },
  props: {
    parentRessource: String,
    parentRessourceType: String,
  },
};
</script>

<style>
@import "./../assets/styles/commentList.css";
</style>
