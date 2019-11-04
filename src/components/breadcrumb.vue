<template>
    <div class="breadcrumb">
      <span class="breadcrumb-info">
        <i class="iconfont icon-zhanghao"></i>
        <i class="iconfont icon-xiangxia"></i>
        <span>退出登录</span>
      </span>
    </div>
</template>

<script>
    export default {
        name: "breadcrumb"
    }
</script>

<style lang="less">
.breadcrumb{
  flex: 1;
  height: 80px;
  padding: 10px 50px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .breadcrumb-info{
    float: right;
    position: relative;
    .icon-zhanghao{
      display: inline-block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 50%;
      background-color: skyblue;
      vertical-align: middle;
    }
    .icon-xiangxia{
      font-size: 20px;
    }
    span{
      display: inline-block;
      width: 100px;
      height: 40px;
      line-height: 40px;
      position: absolute;
      top:50px;
      left: 0px;
      font-size: 14px;
      text-align: center;
      box-shadow: 0 0 5px 1px gray;
      display: none;
      cursor: pointer;
    }
  }
}
.breadcrumb:hover span{
  display: block;
}
</style>
