<template>
  <div id="app">
    <div id="tar-bar">
      <slot></slot>
    </div>
  </div>
</template>

<script>
    export default {
        name: "TabBar"
    }
</script>

<style scoped>
  @import "../../assets/css/base.css";
  #tar-bar{
    display: flex;
    background-color: #f6f6f6;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -2px 2px rgb(100,100,100,0.2);
  }
  .tar-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
  }
</style>
