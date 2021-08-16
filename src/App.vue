<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <swiper :images="images" class="swiper" @change="change">
      <div slot="indicator">
        <div
          v-for="(i, index) in images.length"
          :key="index"
          class="indicator-item"
          :class="{ 'indicator-item-active': curIndex == i }"
        >
          {{ i }}
        </div>
      </div>
    </swiper>
  </div>
</template>

<script>
import Swiper from '../package/src/swiper'

export default {
  name: 'App',
  components: {
    Swiper,
  },
  data() {
    return {
      curIndex: 1,
      images: [
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.soumeitu.com%2Fwp-content%2Fuploads%2F2020%2F07%2F5efd4bc254c10.jpg&refer=http%3A%2F%2Fwww.soumeitu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629630925&t=608a56a47a9b890725fbf158dadfd4a6',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg3.ph.126.net%2Fp-RJ33HgAuhSQOMCsyQ0UA%3D%3D%2F3099883918532000103.jpg&refer=http%3A%2F%2Fimg3.ph.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629630925&t=39052dbea1dac7b90660e830c27c9e80',
      ],
    }
  },
  methods: {
    change(index) {
      this.curIndex = index
      console.log(index)
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.swiper {
  width: 100px;
  height: 300px;
}
.indicator-item {
  color: white;
  float: left;
  width: 40px;
  height: 40px;
  background: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin: 15px;
}
.indicator-item-active {
  background: white;
  color: black;
}
</style>
