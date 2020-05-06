<template>
  <div id="detail">
    <detail-nav-bar  class="detail-nav" @titleClick="titleClick"  ref="detailNavBar"></detail-nav-bar>
    <scroll class="content" ref="scroll"  :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>

      <detail-base-info :goods="goods">

      </detail-base-info>

      <detail-shop-info :shop="shop">

      </detail-shop-info>

      <detail-goods-info :detail-info="detailInfo"  @imageLoad="imageLoad">

      </detail-goods-info>

      <detail-param-info  ref="param"  :param-info="goodsParam"></detail-param-info>
      <detail-comment-info  ref="comment" :comment-info="commentInfo"></detail-comment-info>

      <goods-list   ref="recommend" :goods="recommends"></goods-list>

    </scroll>
    <detail-bottom-bar  @addToCart="addCart"></detail-bottom-bar>
    <back-top  @click.native="backTop"  v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import BackTop from "components/content/backTop/BackTop";

  import {itemListenerMixin,backTopMixin} from "common/mixins";
  import {debounce} from "common/utils";

  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from "network/detail";

  export default {
    name: "Detail",
    components: {
      BackTop,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      // itemListenerMixin,

      Scroll,

      Goods,
      Shop,
      GoodsParam
    },
    mounted() {
    },
    data() {
      return {
        iid: null,
        topImages:[],
        goods: {},
        shop: {},
        detailInfo: {},
        goodsParam: {},
        commentInfo: {},
        recommends: [],
        itemImgListener: null,
        themeTopYs:[],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    created() {
      this.iid=this.$route.params.iid;
      getDetail(this.iid).then( res => {
        console.log(res)
        //1、获取数据
        const data=res.data.result
        //2、获取轮播图的数据
        this.topImages=data.itemInfo.topImages
        //3、创建商品对象
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //4、取出店铺信息
        this.shop=new Shop(data.shopInfo)
        //5、取出详情的信息
        this.detailInfo=data.detailInfo
        //6、取出参数的信息
        this.goodsParam=new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //7、取出评论信息
        if(data.rate.cRate!=0){
          this.commentInfo = data.rate.list[0]
        }

        this.getThemeTopY=debounce( ()=>{
          this.themeTopYs= []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.param.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_VALUE)
          console.log("1:"+this.themeTopYs)
        },50)
        // this.$nextTick( () => {
        //   this.themeTopYs= []
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //
        //   console.log(this.themeTopYs)
        // })
      })
      getRecommend().then(res => {
        console.log(res)
        this.recommends=res.data.data.list;
      })

    },
    destroyed() {
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    mounted() {
      console.log('mounted')
    },
    mixins:[itemListenerMixin,backTopMixin],
    methods: {
      imageLoad(){
        // this.$refs.srcoll.refresh()
        this.$refs.scroll.refresh()
        this.themeTopYs= []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        console.log("1:"+this.themeTopYs)
        // this.getThemeTopY()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300)
      },
      contentScroll(position){
        // console.log(position)
        this.isShowBackTop = -position.y > 1000
        const postionY = -position.y
        let length=this.themeTopYs.length;
        for( let i =0; i < length-1; i++){
          if( (this.currentIndex !== i ) && ( postionY >= this.themeTopYs[i] &&postionY <this.themeTopYs[i+1] ) ){
            this.currentIndex = i;
            console.log(i)
            this.$refs.detailNavBar.currentIndex=this.currentIndex

          }
        }
      },
      addCart(){
        const product={}
        product.iid = this.iid
        product.imgURL = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.count = 1
        this.$store.dispatch('addCart',product).then( res => {
          console.log(res)
          this.$toast.show(res)
        })
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    background-color: #fff;
    z-index: 9;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    background-color: #fff;
    z-index: 9;
  }
  .content{
    height: calc(100% - 44px);
  }
</style>
