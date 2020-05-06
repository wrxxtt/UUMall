<template>
  <div id="home">
    <nav-bar class="home-bar"><div slot="center">购物街</div></nav-bar>
    <TabControl :titles="['流行','新款','精选']" class="tab-control"
                @tabClick="tabClick"
                ref="tabControl1" v-show="isTabFixed"></TabControl>
    <Scroll class="content" ref="scroll"
            v-bind:probeType="3"
            @scroll="contentScroll"
            v-bind:pull-up-load="true"
            @loadMore="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recomemend-view :recommends="recommends"></recomemend-view>
      <FeatureView></FeatureView>
      <TabControl :titles="['流行','新款','精选']" class="tab-control"
                  @tabClick="tabClick"
                  ref="tabControl2"></TabControl>
      <goods-list :goods="showGoods"></goods-list>
    </Scroll>
<!--    <back-top @click.native="backBtn()" v-show="showBackUp"></back-top>-->
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecomemendView from "./childComps/RecomemendView";
  import FeatureView from "./childComps/FeatureView";
  import GoodsList from "components/content/goods/GoodsList";
  import {itemListenerMixin} from "common/mixins";
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {debounce} from "common/utils";

  import {getHomeMultidata, getHomeGoods} from "network/home.js"
  import {backTopMixin} from "common/mixins";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecomemendView,
      FeatureView,
      GoodsList,
      // itemListenerMixin,

      NavBar,
      TabControl,
      Scroll,
      BackTop
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    data() {
      return {
        currentType: 'pop',
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        showBackUp: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        itemImgListener: null

      }
    },
    created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    activated() {
      console.log('activated: '+this.saveY)
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      if(this.itemImgListener != null){
        this.$bus.$off('itemImageLoad',this.itemImgListener)
        this.$bus.$on('itemImageLoad',this.itemImgListener)
      }
      this.$refs.scroll.refresh()

    },
    destroyed() {
      console.log('destroyed')
    },
    deactivated() {
      this.saveY=this.$refs.scroll.scrollY
      console.log('deactivated: '+this.saveY)
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },

    mixins: [itemListenerMixin,backTopMixin],
    mounted() {
      console.log('mounted')
    },
    methods: {
      tabClick(index) {
        console.log(index)
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl2.currentIndex=index;
        this.$refs.tabControl1.currentIndex=index
      },
      // backBtn(){
      //   console.log("1")
      //   this.$refs.scroll.scrollTo(0,0,300)
      // },
      //实时获取滚动位置
      contentScroll(position){
        // console.log('1');
        // console.log(position)
        this.isShowBackTop = -position.y >1000
        this.isTabFixed=(-position.y) > this.tabOffsetTop
      },
      //加载更多
      loadMore(){
        this.getHomeGoods(this.currentType);
      },
      //轮播图加载完成，获取tabControl距离顶部位置
      swiperImageLoad(){
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
        console.log(this.$refs.tabControl2.$el.offsetTop)
      },

      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res)
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res)
          this.goods[type].list.push(...res.data.data.list)
          this.$refs.scroll.finishPullUp()
        })
      }

    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    padding-bottom: 100px;
    height: 100vh;
    position: relative;
  }

  .home-bar {
    background-color: var(--color-tint);
    color: #f6f6f6;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 1;*/
  }

  .tab-control {
    position: sticky;
    top: 44px;
  }
  .content{
    /*height: 300px;*/
    height: calc(100% -  93px);
    overflow: hidden;
    position: absolute;
  }
</style>
