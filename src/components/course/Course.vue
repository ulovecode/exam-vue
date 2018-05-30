<template>
  <div id="courseList">
    <el-table
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="courseList">
      <el-table-column
        prop="cname"
        label="课程名"
      >
      </el-table-column>
      <el-table-column
        prop="ctype"
        label="类型"
      >
      </el-table-column>
      <el-table-column
        prop="credit"
        label="绩点"
      >
      </el-table-column>
      <el-table-column
        prop="times"
        label="课时">
      </el-table-column>
      <el-table-column
        prop="stage"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="descript"
        label="描述">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="course">
          <router-link :to="{path: `/courseForm/${course.row.courseId}` }">
            <el-button type="text" size="small">编辑</el-button>
          </router-link>
          <el-button @click="deleteCourse(course.row.courseId)" type="text" size="small">删除</el-button>
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
    name: "course",
    data() {
      return {
        loading: true,
        courseList: []
      }
    },
    methods: {
      getcourseList() {
        this.$http.get("/course/showlist")
          .then(res => {
            this.courseList = res.data
            this.loading = false
          }).catch((err) => {
          console.log(err);
        });
      },

      deleteCourse(courseId) {
        this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete("/course/id/" + courseId)
            .then(value => {
              if (value.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                });
                this.getcourseList()
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
      this.getcourseList()
        this.interval = setInterval(() => {
          this.getcourseList();
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
