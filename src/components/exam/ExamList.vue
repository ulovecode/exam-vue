<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="testdate"
      label="考试时间"
      sortable
      width="180"
      :default-sort = "{prop: 'testdate', order: 'descending'}"
      :formatter="dateFormat"
    >
    </el-table-column>
    <el-table-column
      prop="title"
      label="试卷名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="descript"
      label="描述"
      :formatter="formatter">
    </el-table-column>
    <el-table-column
      prop="pstatus"
      label="状态"
      width="100"
      :filters="[{ text: '待审核', value: '待审核' }, { text: '启用', value: '启用' }, { text: '正考中', value: '正考中' }, { text: '正考完', value: '正考完' }, { text: '补考中', value: '补考中' }, { text: '补考结束', value: '补考结束' }]"
      :filter-method="filterPstatus"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.pstatus === '启用' ? 'primary' : 'success'" disable-transitions>{{scope.row.pstatus}}
        </el-tag>
      </template>
    </el-table-column >

    <el-table-column
      label="操作"
      width="180">
      <template slot-scope="paper">
        <el-button type="primary" @click="startExam(paper.row.paperId)" :disabled="paper.row.testdate >= new Date()" icon="el-icon-edit" size="small" circle>开始考试</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import {normalTime} from "../../filters/timeFormat";

  export default {
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      formatter(row, column) {
        return row.descript;
      },
      dateFormat(row, column) {
        let date = row[column.property];
        if (date == undefined) {
          return "";
        }
        return normalTime(date)
      },
      filterPstatus(value, row) {
        return row.pstatus === value;
      },
      getPaperList() {
        this.$http.post("/answer/examlist")
          .then(value => {
            this.tableData = value.data.data
            console.log(this.tableData)
          })
          .catch(
            reason => {
              console.log("have a error")
              console.log(reason.message)
            }
          )
      },
      getData() {
        this.getPaperList();
      },
      startExam(paperId) {
      console.log(paperId)
        this.$router.push({ name: 'exam', params: { paperId: paperId }})
      }

    },
    mounted() {
      this.getData()
      this.interval = setInterval(()=>{
      },1000)
    },
    beforeDestroy(){
      clearInterval(this.interval)
    }
  }
</script>
<style scoped>

</style>
