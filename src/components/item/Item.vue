<template>
  <div id="itemList">
    <el-table
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="itemList">
      <el-table-column
        prop="cname"
        label="课程名">
      </el-table-column>
      <el-table-column
        prop="question"
        label="问题">
      </el-table-column>
      <el-table-column
        prop="itemType"
        label="选择类型">
      </el-table-column>
      <el-table-column
        prop="difficulty"
        label="难度">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="item">
          <router-link :to="{path: `/itemForm/${item.row.itemId}` }">
            <el-button type="text" size="small">编辑</el-button>
          </router-link>
          <el-button @click="deleteItem(item.row.itemId)" type="text" size="small">删除</el-button>
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
  export default {
    name: "item",
    data() {
      return {
        courseList: [],
        loading: true,
        itemList: []
      }
    },
    methods: {
      getitemList() {
        this.$http.get("/item/showlist")
          .then(res => {
            this.itemList = res.data


            Object.keys(this.itemList).forEach(value => {
              this.courseList.forEach(course => {
                if (course.courseId === this.itemList[value].courseId) {
                  this.itemList[value]['cname'] = course.cname
                }
              })
            })
            this.loading = false
            console.log("-------------")

            console.log(this.itemList)
          }).catch((err) => {
          console.log(err);
        });
      },
      deleteItem(itemId) {
        this.$confirm('此操作将永久删除该项目信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete("/item/id/" + itemId)
            .then(value => {
              if (value.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                });
                this.getitemList();
              } else {
                this.$message({
                  type: 'error',
                  message: `删除失败${value.data.msg}`,
                });
              }
            }).catch((err) => {
            this.$message({
              type: 'error',
              message: '删除失败'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      getData() {
        this.$http.get("/course/showlist")
          .then(res => {
            console.log(res)
            this.courseList = res.data
            this.getitemList()
          }).catch((err) => {
          console.log(err)
        })
      }

    },
    mounted() {
      this.getData()
      this.loading = true
      this.interval = setInterval(() => {
        this.getitemList();
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
