<template>
  <tab-bar>
    <tab-bar-item path="/home">
<!--      src前面加~-->
      <img  slot="item-icon" src="~assets/img/tabbar/home.svg">
      <img  slot="item-icon-active" src="~/assets/img/tabbar/home_active.svg">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" >
      <img  slot="item-icon" src="~assets/img/tabbar/category.svg">
      <img  slot="item-icon-active" src="~assets/img/tabbar/category_active.svg">
      <div slot="item-text" >分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" >
      <img  slot="item-icon" src="~assets/img/tabbar/shopcart.svg">
      <img  slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" >
      <img  slot="item-icon" src="~assets/img/tabbar/home.svg">
      <img  slot="item-icon-active" src="~assets/img/tabbar/home_active.svg">
      <div slot="item-text">我的</div>
    </tab-bar-item>

  </tab-bar>
</template>


<script>


//  import前面不用加~
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
    export default {
        name: "MainTabBar",
      components: {TabBarItem, TabBar}
    }
</script>

<style scoped>

</style>
