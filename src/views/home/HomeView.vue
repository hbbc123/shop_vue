<template>
  <div class="home">
    <div class="Seach_Tf" v-show="Seach_Tf">
      <HomeIindexFixedsearch ref="Fixedsearch" :Hot_word="Hot_word" />
    </div>
    <HomeIindexTop ref="Iindex_Top" />
    <HomeIindexSearch ref="Hot_word" :Iindex_Top="Iindex_Top" :Fixedsearch="Fixedsearch" />
    <HomeIindexBanner :Hot_word="Hot_word" :Fixedsearch="Fixedsearch" />
    <HomeIindexSeckill />
    <HomeIindexCateGory />
    <HomeIindexChannels />
  </div>
</template>

<script setup>
import HomeIindexTop from './compoents/HomeIindexTop.vue'
import HomeIindexSearch from './compoents/HomeIindexSearch.vue'
import HomeIindexBanner from './compoents/HomeIindexBanner.vue';
import HomeIindexSeckill from './compoents/HomeIindexSeckill.vue';
import HomeIindexCateGory from './compoents/HomeIindexCateGory.vue';
import HomeIindexChannels from './compoents/HomeIindexChannels.vue';
import HomeIindexFixedsearch from './compoents/HomeIindexFixedsearch.vue';
import { ref, onUnmounted } from 'vue';
const Iindex_Top = ref(null)
const Hot_word = ref(null)
const Fixedsearch = ref(null)
const Seach_Tf = ref(false)
function FnScroll(e) {
  if (document.documentElement.scrollTop > 400) {
    Seach_Tf.value = true
  } else {
    Seach_Tf.value = false
  }
}
window.addEventListener('scroll', FnScroll, true)
onUnmounted(() => {
  window.removeEventListener('scroll', FnScroll)
})
</script>
<style lang="less">
.Seach_Tf {
  position: fixed;
  top: 0;
  z-index: 9;
}
</style>
