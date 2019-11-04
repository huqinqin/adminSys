<template>
    <div class="asides">
       <ul>
         <li v-for="(item,index) in listItem" @click="jump(item.id)">
           <i class="iconfont" :class="item.type"></i>
           <span>{{item.name}}</span>
         </li>
       </ul>
    </div>
</template>

<script>
    export default {
        name: "asides",
      data () {
          return{
            listItem: [
              {id: 0,name: '博文',type: 'icon-16'},
              {id: 1,name: '栏目管理',type: 'icon-lanmuguanli'},
              {id: 2,name: '栏目分类',type: 'icon-fenlei'}
            ]
          }
       },
      computed: {
          type () {
            return
          }
      },
      methods: {
        jump (id) {
          switch (id) {
            case 0: {
              this.$router.push({path:'/'})
            };break;
            case 1: {
              this.$router.push({path:'/mainPage/cate'})
            };break;
            case 2: {
              this.$router.push({path:'/mainPage/classify'})
            };break;
          }
        }
      }
    }
</script>

<style lang="less">
   .asides{
     flex: 0 0 200px;
     ul{
       height: 100%;
       background-color: rgba(0,0,0,0.8);
       padding: 10px 20px;
       box-sizing: border-box;
       li{
         height: 50px;
         line-height:50px;
         color: darkgray;
         cursor: pointer;
         i{
           font-size: 18px;
           vertical-align: middle;
         }
         span{
           vertical-align: middle;
         }
       };
       li:hover{
         color: white;
       }
     }
   }
</style>
