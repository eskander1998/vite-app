<template>
  <Ecomments
    :parentRessource="parentRessource"
    :parentRessourceType="parentRessourceType"
  />
</template>

<script>
import { Ecomments } from "./components";

export default {
  name: "App",
  components: {
    Ecomments,
  },
  data: () => {
    return {
      parentRessource: "63b5572459e5954ded196ada",
      parentRessourceType: "ressources",
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap");

:root {
  --Moderate-blue: hsl(238, 40%, 52%);
  --Soft-Red: hsl(358, 79%, 66%);
  --Light-grayish-blue: hsl(239, 57%, 85%);
  --Pale-red: hsl(357, 100%, 86%);

  --Dark-blue: hsl(212, 24%, 26%);
  --Grayish-Blue: hsl(211, 10%, 45%);
  --Light-gray: hsl(223, 19%, 93%);
  --Very-light-gray: hsl(228, 33%, 97%);
  --White: hsl(0, 0%, 100%);

  --Mobile-breakpoint: 375px;
  --Desktop-breakpoint: 1440px;
}

html,
body {
  font-family: "Rubik", sans-serif;
  background-color: #f5f6fa;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 16px;
}

.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4% 2% 4% 2%;
}

.comments-container {
  width: 100%;
}
.comments-container > div:not(:first-child) {
  margin-top: 16px;
}

@media (min-width: 1440px) {
  .comments-container {
    width: 730px;
  }
}

#app {
  font-family: "Rubik", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f5f6fa;
}
</style>
