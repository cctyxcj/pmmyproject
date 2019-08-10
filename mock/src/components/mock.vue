<template>
  <div></div>
</template>
 
<script>
import api from "./../axios/api.js";
export default {
  name: "Mock",
  data() {
    return {
      dataShow: []
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata: function() {
      api.mockdata("/data/index").then(res => {
        console.log(res);
        this.dataShow = res.data;
      });
    }
  }
};
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>