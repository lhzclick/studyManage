<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
        </el-card>
      </el-col>
    </el-row>
   
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {}
  },
  components: {
  },
  computed: {
    
  },
  created() {
    
    this.getData()
  },
  activated() {
    
  },
  deactivated() {
   
  },
  methods: {
    getData() {
      this.$axios({
        method: "post",
        url: "/getScore",
        data: {
          pageNo:2,
					pageSize:3,
					type:'数学一单元测试'
        }
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>


<style scoped>
.el-row {
  margin-bottom: 20px;
}




</style>
