<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
#app{
  width: 100%;
  height: 100%;
  .test{
    color: red;
    span{
      font-size: 20px;
    }
  }
}

</style>
