<template>
  <div ref="swiper" class="_swiper">
    <div
      class="swiper-img-container"
      ref="swiperImgContainer"
      @mouseenter="pauseAnim(false)"
      @mouseout="resumeAnim(false)"
      :style="{
        width: swiperImgContainerWidth,
        transform: swiperImgContainerTransformX
      }"
    >
      <div
        v-for="(item, index) in images"
        :key="'swiper-item-' + index"
        class="swiper-item"
        :ref="'swiper-item-' + index"
        :style="{ width: swiperWidth + 'px' }"
        @click="itemClickHandle(item)"
      >
        <img :src="typeof item == 'object' ? item.src : item" class="swiper-item-img" alt="" />
      </div>
    </div>
    <div class="swiper-indicator" v-if="imgLength > 1">
      <div
        v-for="index in imgLength"
        :key="'indicator_' + index"
        @click="swipeToIndex(index)"
        class="swiper-indicator-item-layout"
      >
        <div
          class="swiper-indicator-item"
          :class="{ 'swiper-indicator-item-active': index == curIndicatorIndex }"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'swiper',
  data() {
    return {
      swiperWidth: 0,
      curSwiperIndex: 0,
      curIndicatorIndex: 1,
      swiperTimer: '',
      // swiperObserver: '',
      throttled: '',
      isDestory: false
    }
  },
  props: {
    images: {
      type: Array,
      required: true,
      default: function() {
        return []
      }
    },
    //轮播图停留时间
    interval: {
      type: Number,
      default: 3000,
      validator: function(value) {
        return value >= 100
      }
    },
    //轮播图滚动动画时间
    animDuration: {
      type: Number,
      default: 1000,
      validator: function(value) {
        return value >= 100
      }
    },
    //鼠标悬停时，是否停止动画
    stopAnim: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    images(value) {
      if (value && value.length > 1) {
        this.resumeAnim(true)
      } else {
        this.pauseAnim(true)
      }
    }
  },
  computed: {
    imgLength() {
      return this.images.length
    },
    swiperImgContainerWidth() {
      return this.swiperWidth * this.imgLength + 'px'
    },
    swiperImgContainerTransformX() {
      return 'translateX(' + -this.curSwiperIndex * this.swiperWidth + 'px)'
    },
    swiperImgContainerTransition() {
      let duration = this.animDuration
      if (duration < 100) {
        duration = '1s'
      } else {
        duration = (duration / 1000).toFixed(1) + 's'
      }
      return 'transform ' + duration
    }
  },
  created() {
    this.isDestory = false
    this.$nextTick(() => {
      this.swiperWidth = this.$refs.swiper.clientWidth
      window.addEventListener('resize', this.getResizeHandle())
    })
  },
  mounted() {
    this.$refs.swiperImgContainer.style.transition = this.swiperImgContainerTransition
    if (this.imgLength > 1) {
      this.startAnim(this.interval)
    }
  },
  methods: {
    startAnim(delay, index = -10) {
      if (!this.swiperTimer && this.imgLength > 1) {
        this.swiperTimer = setTimeout(() => {
          const isManual = index !== -10
          if (!isManual) {
            index = this.curSwiperIndex
            this.curSwiperIndex = (index + 1) % (this.imgLength + 1)
            if (this.curSwiperIndex == this.imgLength - 1) {
              setTimeout(() => {
                if (this && !this.isDestory) {
                  this.$refs['swiper-item-0'][0].style.transform = 'translateX(' + this.swiperImgContainerWidth + ')'
                }
              }, this.animDuration + 50)
            } else if (this.curSwiperIndex == this.imgLength) {
              setTimeout(() => {
                this.resetFirstImage(true)
              }, this.animDuration + 50)
            }
            this.changeHandle()
            this.swiperTimer = ''
            this.startAnim(this.interval + this.animDuration)
          } else {
            //this.resetFirstImage(false)
            if (index == -1) {
              this.$refs['swiper-item-0'][0].style.transform = 'translateX(0px)'
            }
            setTimeout(() => {
              this.curSwiperIndex = (index + 1) % (this.imgLength + 1)
              if (this.curSwiperIndex == this.imgLength - 1) {
                setTimeout(() => {
                  if (this && !this.isDestory) {
                    this.$refs['swiper-item-0'][0].style.transform = 'translateX(' + this.swiperImgContainerWidth + ')'
                  }
                }, this.animDuration + 50)
              }
              this.changeHandle()
              this.swiperTimer = ''
              this.startAnim(this.interval + this.animDuration)
            }, 60)
          }
        }, delay)
      }
    },
    //重置第一张图片
    resetFirstImage(changeIndex) {
      if (this && !this.isDestory) {
        this.$refs['swiper-item-0'][0].style.transform = 'translateX(0px)'
        this.$refs.swiperImgContainer.style.transition = 'transform 0s'
        if (changeIndex) {
          this.curSwiperIndex = 0
        }
        setTimeout(() => {
          this.$refs.swiperImgContainer.style.transition = this.swiperImgContainerTransition
        }, 20)
      }
    },
    getResizeHandle() {
      let observe = () => {
        if (this.$refs.swiper) {
          this.swiperWidth = this.$refs.swiper.clientWidth
        }
      }
      this.throttled = this.throttle(observe, 10)
      return this.throttled
    },
    changeHandle() {
      this.curIndicatorIndex = (this.curSwiperIndex % this.imgLength) + 1
    },
    pauseAnim(notFromMouse) {
      if (notFromMouse || this.stopAnim) {
        if (this.swiperTimer) {
          clearTimeout(this.swiperTimer)
          this.swiperTimer = ''
        }
      }
    },
    resumeAnim(notFromMouse) {
      if (notFromMouse || this.stopAnim) {
        if (this.swiperTimer) {
          clearTimeout(this.swiperTimer)
          this.swiperTimer = ''
        }
        this.startAnim(this.interval)
      }
    },
    itemClickHandle(item) {
      this.$emit('click', item)
    },
    throttle(func, wait, options) {
      var timeout, context, args, result
      var previous = 0
      if (!options) options = {}

      var later = function() {
        previous = options.leading === false ? 0 : Date.now()
        timeout = null
        result = func.apply(context, args)
      }

      var throttled = function() {
        var now = Date.now()
        if (!previous && options.leading === false) previous = now
        var remaining = wait - (now - previous)
        context = this
        args = arguments
        if (remaining <= 0 || remaining > wait) {
          if (timeout) {
            clearTimeout(timeout)
            timeout = null
          }
          previous = now
          result = func.apply(context, args)
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining)
        }
        return result
      }
      throttled.cancel = function() {
        clearTimeout(timeout)
        previous = 0
        timeout = context = args = null
      }
      return throttled
    },
    swipeToIndex(index) {
      this.pauseAnim(true)
      this.startAnim(0, index - 2)
    }
  },
  beforeDestroy() {
    this.isDestory = true
  },
  destroy() {
    window.removeEventListener('resize', this.getResizeHandle())
    if (this.swiperTimer) {
      clearTimeout(this.swiperTimer)
    }
    if (this.throttled) {
      this.throttled.cancel()
    }
  }
}
</script>
<style scoped>
._swiper {
  overflow: hidden;
  width: 100%;
  position: relative;
}
._swiper > .swiper-img-container {
  height: 100%;
  display: flex;
  transition: transform 2s;
}
.swiper-img-container > .swiper-item {
  height: 100%;
}
.swiper-item > .swiper-item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
._swiper > .swiper-indicator {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  width: 100%;
}
.swiper-indicator > .swiper-indicator-item-layout {
  padding: 8px 0px;
  cursor: pointer;
  width: 142px;
  height: 19px;
  margin: 0px 10px;
}
.swiper-indicator > .swiper-indicator-item-layout > .swiper-indicator-item {
  width: 142px;
  height: 3px;
  background: #ffffff;
  opacity: 0.69;
}
.swiper-indicator > .swiper-indicator-item-layout > .swiper-indicator-item-active {
  background: #e50113;
}
</style>
