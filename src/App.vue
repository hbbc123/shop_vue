<template>
  <router-view  />
</template>
<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const router = useRouter();
const params = ref(null)
watch(() => router.currentRoute.value.path, () => {
  params.value = router.currentRoute.value.path
  console.log(params.value);
})
const Store = useStore()
Store.dispatch('Gps')
Store.dispatch('User')
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
