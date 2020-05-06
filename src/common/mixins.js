import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  mounted(){
    //包装刷新
    const newrefresh = debounce(this.$refs.scroll.refresh,50);
    this.itemImgListener = () => {
      console.log("1")
      newrefresh()
    }
    //监听图片加载完成，刷新bscroll,不会出现不能滑动
    this.$bus.$on('itemImageLoad',this.itemImgListener)

  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0,0,300)
    }
  }
}
