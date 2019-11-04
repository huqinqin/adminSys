<template>
    <div class="cate">
      <div class="publicArt">
        <button @click="createBlog">新增栏目</button>
      </div>
      <div class="articleTable">
        <table  border="1" >
          <thead>
          <tr>
            <th>栏目ID</th>
            <th>栏目标题</th>
            <th>栏目类型</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in artCopyList">
            <td>{{item._id}}</td>
            <td>{{item.catename}}</td>
            <td>{{item.type == '0'?'列表':'留言板'}}</td>
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
      <model :show="flag" @cancle="cancle" :selectedItem="selectedItem" @submits="submits"></model>
    </div>
</template>

<script>
  import model from './typeModel.vue'
    export default {
        name: "articleManage",
      data () {
          return {
            flag: false,
            artList: [{
              _id: 0,
              catename: 'web杂谈',
              type: '0'
            }],
            artCopyList: [],
            selectedItem: {},
            type: 0,
            panitionLen: 0
          }
      },
       components: {
         model
       },
      methods: {
        createBlog () {
          var len = this.artList[this.artList.length - 1]._id;
          this.flag = true;
          this.type = 0;
          this.selectedItem = {
            _id: ++len,
            catename: '',
            type: 0,
          }
        },
        cancle () {
          this.flag = false
        },
        modify (index) {
          this.flag = true;
          this.type = 1;
          this.selectedItem = this.artList[index];
        },
        submits (selectedItem) {
          var _this = this;
          this.flag = false;
          selectedItem.time = new Date().getTime();
          if(this.type == 0){
            this.$http.post('http://127.0.0.1:3012/createCate',selectedItem).then( (res) => {
              if(res.data.status == 1){
                _this.find(1);
              }
            })
            //this.artList.push(selectedItem);
          }else if(this.type == 1) {
            this.$http.post('http://127.0.0.1:3012/updateCate',this.selectedItem).then((res) => {
              console.log(res);
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
          //this.artList.splice(index,1);
          this.$http.post('http://127.0.0.1:3012/delCateItem',item).then((res) => {
            if(res.data.delStatus == 1){
              _this.find(1);
            }
          })
          //this.setArtList(this.artList);
        },
        find (paging) {
          var _this = this;
          this.$http.get('http://127.0.0.1:3012/allCate',{
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
   .cate{
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
