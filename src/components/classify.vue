<template>
    <div class="classify">
      <div class="publicArt">
        <button @click="createBlog">新增分类</button>
      </div>
      <div class="articleTable">
        <table  border="1" >
          <thead>
          <tr>
            <th>分类ID</th>
            <th>所属栏目</th>
            <th>分类标题</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in artCopyList">
            <td>{{item._id}}</td>
            <td>{{item.catename}}</td>
            <td>{{item.typename}}</td>
            <td>
              <button @click="modify(index)">修改</button>
              <button @click="del(item)">删除</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="pageinit">
        <span v-for="(item,index) in artListLength" @click="changePage(index + 1)">{{item}}</span>
      </div>
      <model :show="flag" @cancle="cancle" :selectedItem="selectedItem" @submits="submits" :cate="cate"></model>
    </div>
</template>

<script>
  import model from './classifyModel.vue'
    export default {
        name: "articleManage",
      data () {
          return {
            flag: false,
            artList: [{
              _id: 0,
              cateid: '',
              typename: 'js基础'
            }],
            artCopyList: [],
            selectedItem: {},
            type: 0,
            panitionLen: 0,
            cate:[]
          }
      },
       components: {
         model
       },
      methods: {
        createBlog () {
          var _this = this;
          var len = this.artList[this.artList.length - 1]._id;
          this.flag = true;
          this.type = 0;
          this.selectedItem = {
            _id: ++len,
            cateid: '',
            typename:'',
          };
          /*点击新增发送一个请求，获取所有的栏目名称*/
          this.$http.get('http://127.0.0.1:3012/allCateName').then((res) => {
            if(res.data.code == 0){
              _this.cate = res.data.result;
            }
          });
        },
        cancle () {
          this.flag = false
        },
        modify (index) {
          var _this = this;
          this.flag = true;
          this.type = 1;
          this.selectedItem = this.artList[index];
          this.$http.get('http://127.0.0.1:3012/allCateName').then((res) => {
            if(res.data.code == 0){
              _this.cate = res.data.result;
            }
          });
        },
        submits (selectedItem) {
          var _this = this;
          this.flag = false;
          selectedItem.time = new Date().getTime();
          if(this.type == 0){
            this.$http.post('http://127.0.0.1:3013/createClassify',selectedItem).then( (res) => {
              if(res.data.status == 1){
                _this.find(1);
              }
            })
            //this.artList.push(selectedItem);
          }else if(this.type == 1) {
            this.$http.post('http://127.0.0.1:3013/updateClassify',this.selectedItem).then((res) => {
              _this.find(1);
            })
          }
          this.type = 0;
          this.setArtList(this.artList);
          //this.artCopyList = JSON.parse(JSON.stringify(this.artList));
        },
        setArtList (list) {
          this.artCopyList = JSON.parse(JSON.stringify(list));
        },
        del(item){
          var _this = this;
          this.$http.post('http://127.0.0.1:3013/delClassifyItem',item).then((res) => {
            if(res.data.delStatus == 1){
              _this.find(1);
            }
          })
          //this.setArtList(this.artList);
        },
        find (paging) {
          var _this = this;
          this.$http.get('http://127.0.0.1:3013/allClassify',{
            params: {
              pagination: paging
            }
          }).then((res) => {
            var data = res.data.result;
            _this.panitionLen = res.data.total;
            if(res.data.code == 0){
              _this.artList = data;
              _this.setArtList(_this.artList);
            }
          });
        },
        changePage (index) {
          this.find(index);
        }
      },
      created() {
          this.find(1);
          this.artCopyList = JSON.parse(JSON.stringify(this.artList));
      },
      computed: {
        artListLength () {
          return Math.ceil(this.panitionLen / 5);
        }
      }
    }
</script>

<style lang="less">
   .classify{
     padding: 30px 0;
     .publicArt{
       width: 80%;
       margin: 20px auto;
       button{
         width: 150px;
         height: 50px;
         line-height: 50px;
         text-align: center;
         background-color: skyblue;
         border-radius: 5px;
         font-size: 18px;
         cursor: pointer;
       }
     }
     .articleTable{
       display: flex;
       align-items: center;
       justify-content: center;
       margin-bottom: 20px;
       table{
         width: 80%;
         border-collapse: collapse;
         tr{
           text-align: center;
           td{
             font-size: 14px;
             color: rgba(0,0,0,0.9);
             button{
               width: 60px;
               height: 24px;
               line-height: 20px;
               color: white;
             }
             button:first-child{
               background-color: green;
             }
             button:nth-child(2){
               background-color: red;
             }
           }
         }
       }
     }
     .pageinit{
       text-align: center;
       span{
         display: inline-block;
         width: 40px;
         height: 40px;
         line-height: 40px;
         text-align: center;
         font-size: 18px;
         border: 1px solid gray;
         cursor: pointer;
         margin: 0 2px;
       }
     }
   }
</style>
