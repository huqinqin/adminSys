<template>
    <div class="login">
      <ul class="login-info">
        <li><h3>欢迎登录</h3></li>
        <li>
          <i class="iconfont icon-lianxirenxuanzhong"></i>
          <input type="text" v-model="username">
        </li>
        <li>
          <i class="iconfont icon-password"></i>
          <input type="text" v-model="pwd">
        </li>
        <li>
          <button @click="loginMainPage">登录</button>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "login",
        data () {
          return {
            username: '',
            pwd: ''
          }
        },
      methods: {
          loginMainPage () {
            if(this.username && this.pwd) {
              this.$http.get('/page',{
                params: {
                  username: this.username,
                  pwd: this.pwd
                }
              }).then((res) => {}).catch((err) => {})
            }
          }
      }
    }
</script>

<style lang="less">
  .login{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: skyblue;
    .login-info{
      width: 300px;
      padding: 20px;
      box-sizing: border-box;
      border-radius: 5px;
      background-color: white;
      li{
        width: 100%;
        height: 40px;
        line-height: 40px;
        margin: 10px 0;
        h3{
          font-size: 14px;
        }
        button{
          width: 100%;
          text-align: center;
          background-color:darkblue ;
          color: white;
          height: 28px;
          line-height: 28px;
          cursor: pointer;
        }
        .iconfont{
          font-size: 20px;
          vertical-align: middle;
        }
        input{
          width: 200px;
          height: 20px;
          line-height: 20px;
          vertical-align: middle;
        }
      }
    }
  }
</style>
