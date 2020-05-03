<template>
  <tab-bar>
    <tab-bar-item path="/home" active-color="blue">
<!--      src前面加~-->
      <img  slot="item-icon" src="~assets/img/tabbar/home.svg">
      <img  slot="item-icon-active" src="~/assets/img/tabbar/home_active.svg">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img  slot="item-icon" src="../assets/img/tabbar/home.svg">
      <img  slot="item-icon-active" src="../assets/img/tabbar/home_active.svg">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img  slot="item-icon" src="../assets/img/tabbar/home.svg">
      <img  slot="item-icon-active" src="../assets/img/tabbar/home_active.svg">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img  slot="item-icon" src="../assets/img/tabbar/home.svg">
      <img  slot="item-icon-active" src="../assets/img/tabbar/home_active.svg">
      <div slot="item-text">我的</div>
    </tab-bar-item>

  </tab-bar>
</template>


<script>

  // import TabBar from "./tabbar/TabBar";
  // import TabBarItem from "./tabbar/TabBarItem";
//
//  import前面不用加~
import TabBar from "components/tabbar/TabBar";
import TabBarItem from "components/tabbar/TabBarItem";
    export default {
        name: "MainTabBar",
      components: {TabBarItem, TabBar}
    }
</script>

<style scoped>

</style>
