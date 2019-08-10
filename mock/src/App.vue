<template>
  <div id="app">
    <mock></mock>
  </div>
</template>

<script>
import mock from "./components/mock";

export default {
  name: "App",
  components: {
    mock
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
