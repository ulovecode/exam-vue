<template>
  <div id="paperList">
    <el-table
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="paperList"
      >
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="cname"
        label="课程">
      </el-table-column>
      <el-table-column
        prop="grade"
        label="成绩">
      </el-table-column>

      <el-table-column
        prop="testdate"
        label="考试时间">
      </el-table-column>

      <el-table-column
        prop="stage"
        label="学期">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="paper">
          <router-link :to="{path: `/paperForm/${paper.row.paperId}` }">
            <el-button type="text" size="small">编辑</el-button>
          </router-link>
          <el-button @click="deletepaper(paper.row.paperId)" type="text" size="small">删除</el-button>


          <el-button icon="el-icon-star-off" @click="changePaper(paper)"  size="small" :disabled="paper.row.pstatus !== '待审核'">启用</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="20"
      :pager-count="11"
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>

  </div>
</template>

<script>
  import {normalTime} from '../../filters/timeFormat'
  export default {
    name: "Paper",
    data() {
      return {
        loading: true,
        couseList: [],
        paperList: [],

      }
    },
    methods: {

      getpaperList() {
        this.$http.get("/paper/showlist")
          .then(res => {
            this.paperList = res.data;

            this.paperList.forEach(
              paper => {
                this.couseList.forEach(course => {
                  if(course.courseId === paper.courseId){
                    paper.cname = course.cname
                  }
                })
                paper.testdate = normalTime(paper.testdate)
              }
            )

            this.loading = false;
            console.log("-------------")

            console.log(this.paperList)
          }).catch((err) => {
          console.log(err);
        });
      },
      deletepaper(paperId) {
        this.$confirm('此操作将永久删除该试卷信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete("/paper/id/" + paperId)
            .then(value => {
              if (value.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                });
                this.getpaperList()
              }
            }).catch((err) => {
            this.$message({
              type: err.toString(),
              message: '删除失败'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '删除失败'
          });
        });

      },
      changePaper(data){
        let paperId = data.row.paperId
        this.$http.get("/paper/changestatus?paperId="+paperId)
          .then(value => {
            console.log(value)
            if (value.data.code !== 0) {
              this.$notify.error({
                title: '操作失败',
                message: value.data.msg,
              });
              return
            }
            this.paperList[data.$index].pStatus = '启用'
            this.getpaperList();
            this.$notify({
              title: '成功',
              message: value.data.data,
              type: 'success'
            });
            // this.getPaperList()
          })
          .catch(reason => {
            this.$notify.error({
              title: '操作失败',
              message: reason.message,
            });
          })

      },
      getData() {
        this.$http.get("/course/showlist")
          .then(res => {
            console.log(res)
            this.couseList = res.data
            this.getpaperList()
          }).catch((err) => {
          console.log(err)
        })
      },


    },
    mounted() {
      this.getData()
      this.interval = setInterval(() => {
        this.getpaperList();
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
