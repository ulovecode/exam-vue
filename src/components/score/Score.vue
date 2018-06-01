<template>
  <div id="scoreList">
    <el-table
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="scoreList">
      <el-table-column
        prop="title"
        label="试卷标题">
      </el-table-column>

      <el-table-column
        prop="correct"
        label="答对题数">
      </el-table-column>
      <el-table-column
        prop="ansnum"
        label="总题数">
      </el-table-column>
      <el-table-column
        prop="score"
        label="分数">
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
  import {mapGetters} from 'vuex'

  export default {
    name: "Score",
    data() {
      return {
        scoreList: []
      }
    }, methods: {
      getData() {
        this.$http.get("/score/list?sno=" + this.getStudent.sno)
          .then(value => {
            let res = value.data.data;
            let scoreList = res.scoreList;
            let titleList = res.titleList;
           this.scoreList =  scoreList.map(value1 => {
              titleList.forEach(value2 =>{
                if (value1.paperId === value2.paperId) {
                  value1.title = value2.title
                }
              });
              return value1
            });

          })
          .catch(reason => {
            console.log(reason);
          })

        console.log(this.scoreList)
      }
    },
    mounted() {
      this.getData();
    },
    computed: mapGetters([
      'getUserInfo',
      'getStudent',
    ])
  }
</script>

<style scoped>

</style>
