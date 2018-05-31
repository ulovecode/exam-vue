<template>
  <div id="studentList">
    <el-table
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="studentList">
      <el-table-column
        prop="sno"
        label="学号">
      </el-table-column>

      <el-table-column
        prop="gender"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="major"
        label="专业">
      </el-table-column>
      <el-table-column
        prop="idno"
        label="身份证号">
      </el-table-column>
      <el-table-column
        prop="insource"
        label="招生来源">
      </el-table-column>
      <el-table-column
        prop="intype"
        label="招生类型">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="student">
          <router-link :to="{path: `/studentForm/${student.row.sno}` }">
            <el-button type="text" size="small">编辑</el-button>
          </router-link>
          <el-button @click="deleteStudent(student.row.sno)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>

  </div>
</template>

<script>
  export default {
    name: "student",
    data() {
      return {
        loading: true,
        studentList: []
      }
    },
    methods: {
      getStudentList() {
        this.$http.get("/student/showlist")
          .then(res => {
            this.studentList = res.data
            this.loading = false
            console.log(this.studentList)
          }).catch((err) => {
          console.log(err);
        });
      },

      deleteStudent(sno) {
        this.$confirm('此操作将永久删除该学生信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete("/student/id/" + sno)
            .then(value => {
              if (value.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                });
                this.getStudentList()
              }
            }).catch((err) => {
            this.$message({
              type: err.toString(),
              message: '已取消删除'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },

    },
    mounted() {
      this.loading = true
      this.getStudentList()

      this.interval =
        setInterval(() => {
        this.getStudentList();
        console.log("获取数据成功")
      }, 20000)
    },
    beforeDestroy() {
      clearInterval(this.interval)
      console.log("销毁数据成功")
    }
  }


</script>
<style scoped>

</style>
