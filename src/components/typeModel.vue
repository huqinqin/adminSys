<template>
    <div class="model" v-if="show">
       <div class="model-content">
           <h3>新增 | 修改</h3>
           <table border="1">
             <tr>
               <td><span>栏目标题</span></td>
               <td><input type="text" v-model="parentSelectDate.catename"></td>
             </tr>
             <tr>
               <td><span>所属栏目</span></td>
               <td>
                 <input id='radio1'type="radio" v-model="parentSelectDate.type" v-bind:value="0"><label for="radio1">列表</label>
                 <input id='radio2'type="radio" v-model="parentSelectDate.type" v-bind:value="1"><label for="radio2">留言板</label>
               </td>
             </tr>
           </table>
          <div class="handle"><button @click="submits">提交</button><button @click="cancle">取消</button></div>
       </div>
    </div>
</template>

<script>
  import wangeditor from './wangeditor'
    export default {
        name: "model",
      data() {
          return {
            completed: false,
            noUpload: false
          }
      },
      components: {
        wangeditor
      },
      methods: {
        endEdit (html) {
          this.parentSelectDate.content = html
        },
        cancle () {
          this.$emit('cancle')
        },
        submits () {
            this.$emit('submits',this.parentSelectDate);
        },
        //删除图片
        delimg(ind){
          this.files.splice(ind, 1);
        },
      },
      props: ['show','selectedItem'],
      computed: {
          parentSelectDate () {
            return this.selectedItem
          }
      }
    }
</script>

<style lang="less">
.model{
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left:0;
  .model-content{
    width: 80%;
    padding: 20px;
    box-sizing: border-box;
    background-color: white;
    h3{
      margin: 0 0 10px 0;
    }
    table{
      border-collapse: collapse;
      width: 100%;
      tr{
        td{
          padding: 0 5px;
          height: 40px;
          input{
            width: 300px;
            height: 26px;
          }
          input[type=radio]{
            width: 15px;
            height: 15px;
            vertical-align: middle;
          }
          label{
            vertical-align: middle;
          }
          .cates{
            width: 150px;
            height: 24px;
          }
          #txt{
            width: 300px;
          }
        }
      }
    }
    .handle{
      margin-top: 20px;
      button{
        width: 80px;
        height: 24px;
        line-height: 24px;
        background-color: skyblue;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
