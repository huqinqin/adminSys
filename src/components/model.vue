<template>
    <div class="model" v-if="show">
       <div class="model-content">
           <h3>新增 | 修改</h3>
           <table border="1">
             <tr>
               <td><span>文章标题</span></td>
               <td><input type="text" v-model="parentSelectDate.title"></td>
             </tr>
             <tr>
               <td><span>缩略图</span></td>
               <td><input type="file" ref="file" @change="previewFiles"></td>
             </tr>
             <tr>
               <td><span>文章内容</span></td>
               <td>
                 <wangeditor @endEdit="endEdit" :editorHtml="parentSelectDate.content"></wangeditor>
               </td>
             </tr>
             <tr>
               <td><span>所属栏目</span></td>
               <td>
                 <select name="" class="cates" v-model="parentSelectDate.cateid">
                   <option value="-1" selected>请选择</option>
                   <option value="1">web技术</option>
                 </select>
               </td>
             </tr>
             <tr>
               <td><span>所属分类</span></td>
               <td>
                 <select name="" class="cates" v-model="parentSelectDate.classifyid">
                   <option value="-1" selected>请选择</option>
                   <option value="1">基础js</option>
                   <option value="2">高级js</option>
                 </select>
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
          if(this.completed){
            this.$emit('submits',this.parentSelectDate);
          }else if(!this.noUpload&& !this.completed){
            this.$emit('submits',this.parentSelectDate);
          }
        },
        //上传图片
        previewFiles(){
          this.noUpload = true;
          let files = this.$refs.file.files;
          console.log(files);
          if(files.length > 0){
            for (let i = 0; i < files.length; i++) {
              if (files[i].size/1024/1024 > 2) { //限制每张上传图片的大小
                alert('第'+(i+1)+'张图片大于2M,请上传小于2M的图片');
                return;
              }
            }
            // console.log(files[0].size/1024/1024);
            let formData = new FormData();
            formData.append("action","upresumefile");//调用它的append()方法来添加字段
            for (let i = 0; i < files.length; i++) {
              formData.append("file",files[i]);
            }
            this.$http.post('http://127.0.0.1:3010/upload',formData)
              .then((res) => {
                var result = res.data;
                if (result.code == 1) {
                  var t = result.data.path.replace(/\/home\/huqinqin\/public_html\//,'http://www.huqinqin.top/');

                  this.parentSelectDate.url =  t;//把服务器返回的图片路径获取下来，在页面显示
                  this.completed = true;
                }
              })
          }else{
            alert('请上传图片')
            return
          }
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
