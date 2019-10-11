<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover" class="mgb20">
          <div class="tool">
            <el-button class="addData" type="primary"  v-popover:popover>新增</el-button>
            <el-button type="primary" @click="$excelDownLoad('#table','分数录入')">文件导出</el-button>
            <el-upload
              class="upload"
              action="demo"
              :show-file-list="false"
              :http-request="upload">
              <el-button size="small" type="primary">上传头像</el-button>
            </el-upload>
          </div>


          <!-- <el-button @click="uploadImg()" size="small" type="primary">上传用户头像</el-button> -->
          <el-table :data="list" style="width: 100%"  border id="table" >
            <el-table-column prop="index" label="id">
            </el-table-column>
            <el-table-column prop="name" label="姓名">
              <template slot-scope="scope" >
                <div>
                  <el-input v-show="!scope.row.m" v-model="scope.row.name"></el-input>
                  <span v-show="scope.row.m">{{scope.row.name}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄">
              <template slot-scope="scope" >
                <div>
                  <el-input v-show="!scope.row.m" v-model="scope.row.age"></el-input>
                  <span v-show="scope.row.m">{{scope.row.age}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="sex" label="性别">
              <template slot-scope="scope" >
                <div>
                  <el-input v-show="!scope.row.m" v-model="scope.row.sex"></el-input>
                  <span v-show="scope.row.m">{{scope.row.sex}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="score" label="分数">
              <template slot-scope="scope" >
                <div>
                  <el-input v-show="!scope.row.m" v-model="scope.row.score"></el-input>
                  <span v-show="scope.row.m">{{scope.row.score}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="科目类型">
              <template slot-scope="scope" >
                <div>
                  <el-input v-show="!scope.row.m" v-model="scope.row.type"></el-input>
                  <span v-show="scope.row.m">{{scope.row.type}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column   prop="createTime" label="录入时间">
              <template slot-scope="scope" >
                <div>
                  <span>{{parseInt(scope.row.createTime) | formatDate}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope" >
                <span style="color:#2367CD" >
                  <el-button size="small" @click.native.prevent="edit(scope.$index, scope.row)" type="success" v-show="scope.row.m&&scope.row.l" plain>编辑</el-button>
                  <el-button size="small" @click.native.prevent="edit_success(scope.$index, scope.row)" type="success"  v-show="!scope.row.m&&scope.row.l" plain>保存</el-button>
                  <el-button @click.native.prevent="deleteData(scope.$index, scope.row)">删除</el-button>
                </span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNo"
            :page-sizes="[5,10, 20, 50, 100,500]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
           <!-- 新增数据弹框 -->
                <el-popover
                    ref="popover"
                    placement="right"
                    width="600"
                    v-model="visible"
                    trigger="click">
                     <div class="demo-input-suffix">
                        <span>姓名：</span>
                        <el-input
                          placeholder="请输入姓名"
                          v-model="input1">
                        </el-input>
                      </div>
                      <div class="demo-input-suffix">
                        <span>年龄：</span>
                        <el-input
                          placeholder="请输入年龄"
                          v-model="input2">
                        </el-input>
                      </div>
                      <div class="demo-input-suffix">
                        <span>性别：</span>
                        <el-input
                          placeholder="请输入性别"
                          v-model="input3">
                        </el-input>
                      </div>
                      <div class="demo-input-suffix">
                       <span>分数：</span>
                        <el-input
                          placeholder="请输入分数"
                          v-model="input4">
                        </el-input>
                      </div>
                      <div class="demo-input-suffix">
                        <span>科目类型：</span>
                        <el-input
                          placeholder="请输入科目类型"
                          v-model="input5">
                        </el-input>
                      </div>
                      <div class='close-btn'>
                        <el-button type="primary" @click="addData(),visible = false" >确定</el-button>
                        <el-button @click="visible = false">取消</el-button>
                      </div>
                </el-popover>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import tool from "lh-tool"
import moment from "moment"
import { mapMutations } from 'vuex'
export default {
  name: "index",
  data() {
    return {
      list: [],
      pageNo:1,
      pageSize:10,
      total:20, 
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      visible:false,
    };
  },
  filters: {
      formatDate:(el)=>{
        return moment(el).format('YYYY-MM-DD HH:mm:ss')
      }
    },
  components: {},
  computed: {
    
  },
  created() {
    this.getData();
  },
  mounted(){
  },
  activated() {},
  deactivated() {},
  methods: {
    ...mapMutations(['changeUrl']),
    //获取数据
    getData() {
      this.$axios({
        method: "post",
        url: "/getScore",
        data: {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
      }).then(res => {
        res.data.list.map((item,i)=>{item.m = true,item.l = true});
        let _data = res.data.list;
        this.list = _data;
        this.total = res.data.total;
        //排序
        this.list.forEach((item,index)=>{
        item.index = (this.pageNo-1)*this.pageSize+index+1
        });
      });
    },
    //新增数据
    addData() {
      this.$axios({
        method: "post",
        url: "/addScore",
        data: {
          name:this.input1,
          age:this.input2,
          sex:this.input3,
          score:this.input4,
          type:this.input5
        }
      }).then(res => {
        this.getData()
      });
    },
    //删除数据
    deleteData(index,row) {
        this.$confirm('确定要删除该条数据吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$axios({
              url:'/deleteScore',
                method:'post',
                data:{
                    jobId:row.jobId
                    }
                }).then(res => {
                  this.getData()
                });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      //分页
    handleSizeChange(val) {
     // console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
     // console.log(`当前页: ${val}`);
      this.pageNo = val
      this.getData()
    },
    //  编辑按钮
    edit(index, row) {
      row.m = false
    },
    //保存数据
     edit_success(index, row) {
      row.m = true;
      this.$axios({
              url:'/editScore',
              method:'post',
              data:{
                  jobId:row.jobId,
                  name:row.name,
                  age:row.age,
                  sex:row.sex,
                  score:row.score,
                  type:row.type
                  }
              }).then(res => {
               
              });
    },
    
    // 用户头像上传
    upload(file){
      // console.log(file)
      let param = new FormData()
      param.append('file',file.file)
      param.append('userName',localStorage.ms_username)
      this.$axios({
        method: "post",
        url: "/uploadUser",
        data: param
      }).then(res => {
        localStorage.setItem("user_url", res.data.filename);
        this.changeUrl(res.data.filename)
      });
    }
    
  }
};
</script>


<style>
.el-row {
  margin-bottom: 20px;
};
.el-input__inner{
  width: 200px;
}
.demo-input-suffix .el-input {
    margin-right: 15px;
    width:200px;
}
.demo-input-suffix{
  margin-bottom: 15px;
}
.demo-input-suffix span{
  display: inline-block;
  text-align: right;
  width: 80px;
}
.addData{
  /* margin-bottom:20px; */
}
.el-pagination{
  text-align: right;
  padding-top: 20px;
}


/* 上传样式修改 */
.upload{
  display: inline-block;
  margin-left: 10px;
  vertical-align: bottom;
  height: auto;
}
.upload .el-upload--text{
  vertical-align: bottom;
  display: inline-block;
  border: none;
  height: auto;
  width: 100px;
}
.tool{
  /* height: 40px; */
  margin-bottom: 20px;
}

</style>
