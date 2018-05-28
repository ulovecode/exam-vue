<template>
  <div>

    <div style="height: 70px;text-align: right;margin-right: 50px">
      <span style="color:#303133;font-size: large">考试时间:</span>
      <span style="color:#F56C6C;font-size: large">{{time|examTime}}</span>
    </div>
    <el-card class="box-card" style="text-align:center;height: 600px">

      <div slot="header" class="clearfix" style="height: 100px ; text-align: left">
        <span>{{examForm.itemList[count].question}}</span>
      </div>
      <div style="text-align:left;height: 300px;margin-left: 250px">

        <el-radio-group v-model="examForm.itemList[count].answer">

          <div style="height: 60px" v-if="examForm.itemList[count].optiona !== ''">
            <el-radio label="a">A.{{examForm.itemList[count].optiona}}</el-radio>
          </div>
          <div style="height: 60px" v-if="examForm.itemList[count].optionb !== ''">
            <el-radio label="b">B.{{examForm.itemList[count].optionb}}</el-radio>
          </div>
          <div style="height: 60px" v-if="examForm.itemList[count].optionc !== ''">
            <el-radio label="c">C.{{examForm.itemList[count].optionc}}</el-radio>
          </div>
          <div style="height: 60px" v-if="examForm.itemList[count].optiond !== ''">
            <el-radio label="d">D.{{examForm.itemList[count].optiond}}</el-radio>
          </div>
          <div style="height: 60px" v-if="examForm.itemList[count].optione !== ''">
            <el-radio label="e">E.{{examForm.itemList[count].optione}}</el-radio>
          </div>
          <div style="height: 60px" v-if="examForm.itemList[count].optionf !== ''">
            <el-radio label="f">F.{{examForm.itemList[count].optionf}}</el-radio>
          </div>
        </el-radio-group>

      </div>
      <div style="vertical-align: bottom;height: 200px;margin-top: 70px">
        <el-button-group style="margin-bottom: 60px">

          <el-button :disabled="count===0" icon="el-icon-arrow-left" @click="preQuestion">上一题</el-button>
          <el-button @click="nextQuestion" :disabled="examForm.itemList.length-1 === count"><i
            class="el-icon-arrow-right ">下一题</i></el-button>
        </el-button-group>
      </div>

    </el-card>
    <div style="text-align: center">
      <el-button-group>
        <el-button type="primary" icon="el-icon-check" @click="submitForm">提交</el-button>
        <el-button type="danger"><i class="el-icon-close ">
          <router-link to="/" class="router-link-active">退出</router-link>
        </i></el-button>
      </el-button-group>
    </div>

  </div>
</template>

<script>
  export default {
    name: "exam",
    data() {
      return {
        count: 0,
        examForm: {
          itemList: [{
            paperId: '',
            itemId: '',
            question: 'dasdadad',
            optiona: 'aasdas',
            optionb: 'bbbbbbbb',
            optionc: 'cccccccccccc',
            optiond: 'saddasdas',
            optione: 'dsadsada',
            optionf: 'ffffffffffffff',
            optiong: 'sdadsa',
            answer: ''
          },
            {
              paperId: '',
              itemId: '',
              question: 'sadoajidajidjoaijdoajodijsaojodjaojdi',
              optiona: 'aasdas',
              optionb: 'bbbbbbbb',
              optionc: 'cccccccccccc',
              optiond: 'ddddddddddd',
              optione: 'eeeeeeeeeeeee',
              optionf: 'ffffffffffffff',
              optiong: 'gggggggggggg',
              answer: ''
            },
            {
              paperId: '',
              itemId: '',
              question: 'dsadsad',
              optiona: 'aasdas',
              optionb: 'bbbbbbbb',
              optionc: 'cccccccccccc',
              optiond: 'ddddddddddd',
              optione: 'eeeeeeeeeeeee',
              optionf: 'ffffffffffffff',
              optiong: 'gggggggggggg',
              answer: ''
            },
            {
              paperId: '',
              itemId: '',
              question: '44444444444',
              optiona: 'aasdas',
              optionb: 'bbbbbbbb',
              optionc: 'sa',
              optiond: 'ddddddddddd',
              optione: 'eeedsadeeeeeeeeee',
              optionf: 'ffffffffffffff',
              optiong: 'gggggggggggg',
              answer: ''
            },
          ]
        },
        paper: {
          paperId: ''
        },
        time: new Date()
      }
    },
    methods: {
      preQuestion() {
        if (this.count - 1 < 0) {
          return
        }
        this.count--;
      },
      nextQuestion() {
        if (this.count + 1 > this.examForm.itemList.length) {
          return
        }
        this.count++;
      },
      submitForm() {
        this.$confirm('提交答案后无法更改, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.$http.post("/", this.examForm)
            .then((res) => {
                if (res.code !== 200) {
                  this.$notify.error({
                    title: '错误',
                    message: res.message
                  });

                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }
              }
            ).catch((error) => {
              this.$notify.error({
                title: '错误',
                message: error.message
              });
            }
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


      }


    },
    mounted() {
      this.interval = setInterval(() => {
        this.time = new Date();
      }, 1000)
    },
    beforeDestroy() {
      clearInterval(this.interval)
      console.log("销毁定时器")
    }

  }
</script>

<style scoped>
  .router-link-active {
    text-decoration: none;
    color: white;
  }
</style>
