<template>
  <transition name="fade">
    <div class="toast" v-show="isShow"  :class="{active: !isShow}">{{message}}</div>
  </transition>
</template>

<script>
	export default {
		name: "Toast",
    data() {
			return {
				isShow: false,
        message: '我是弹窗'
      }
    },
    methods: {
		  show(message,duration=700){
        console.log('...')
        this.isShow = true
        this.message = message
        setTimeout(() => {
          this.message = ''
          this.isShow = false

        },duration)
      }
    }
	}
</script>

<style scoped>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    background-color: rgba(0,0,0,.8);
    padding: 10px;
    border-radius: 5px;
    transform: translate(-50%,-50%);
    color:#fff;
    z-index: 99;
  }
  .active{
    display: none;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
