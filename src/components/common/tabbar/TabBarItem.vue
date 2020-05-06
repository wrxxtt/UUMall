<template>
  <div class="tar-bar-item" @click="itemClick()">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    data() {
      return {}
    },
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    methods: {
      itemClick() {

        console.log(this.path)
        this.$router.replace(this.path)
      }
    },
    computed: {
      isActive() {
        return this.$route.path.includes(this.path)
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    }
  }
</script>

<style scoped>
  .tar-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tar-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

  .active {
    color: red;
  }
</style>
