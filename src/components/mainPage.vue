<template>
    <div class="mainPage">
      <asides></asides>
      <div class="mainContent">
        <bread></bread>
        <router-view/>
      </div>
    </div>
</template>

<script>
  import asides from './asides'
  import bread from './breadcrumb'
    export default {
        name: "mainPage",
        components: {
          asides,
          bread
        }
    }
</script>

<style lang="less">
.mainPage{
  display: flex;
  width: 100%;
  height: 100%;
  .mainContent{
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
