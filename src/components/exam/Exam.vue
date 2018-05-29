<template>
  <div>

    <div style="height: 70px;text-align: right;margin-right: 50px">
      <span style="color:#303133;font-size: large">考试时间:</span>
      <span style="color:#F56C6C;font-size: large">{{time|examTime}}</span>
    </div>
    <el-card class="box-card" style="text-align:center;height: 600px">

      <div slot="header" class="clearfix" style="height: 100px ; text-align: left">
        <span>{{examForm.itemList[count].question}} [{{examForm.itemList[count].itemType}}]</span>
      </div>
      <div style="text-align:left;height: 300px;margin-left: 250px">

        <el-radio-group v-model="examForm.itemList[count].answer" v-show="examForm.itemList[count].itemType === '单选'">

          <div style="height: 60px" v-if="examForm.itemList[count].optiona !== ''">
            <el-radio label="a">A.{{examForm.itemList[count].optiona}}</el-radio>
          </div>
          <div style="height: 60px" v-if="examForm.itemList[count].optionb !== ''">
            <el-radio label="b">B.{{examForm.itemList[count].optionb}}</el-radio>
          </div>
          <div style="height: 60px" v-if="examForm.itemList[count].optionc !== ''">
            <el-radio label="c">C.{{examForm.itemList[count].optionc}}</el-radio>
          </div>
          <div style="height: 60px" v-if="examForm.itemList[count].optiond !== '' ">
            <el-radio label="d">D.{{examForm.itemList[count].optiond}}</el-radio>
          </div>
          <div style="height: 60px"
               v-if="examForm.itemList[count].optione !== ''&& examForm.itemList[count].optione !== null">
            <el-radio label="e">E.{{examForm.itemList[count].optione}}</el-radio>
          </div>
          <div style="height: 60px"
               v-if="examForm.itemList[count].optionf !== '' && examForm.itemList[count].optionf !== null">
            <el-radio label="f">F.{{examForm.itemList[count].optionf}}</el-radio>
          </div>
          <div style="height: 60px"
               v-if="examForm.itemList[count].optiong !== '' && examForm.itemList[count].optiong !== null">
            <el-radio label="g">G.{{examForm.itemList[count].optiong}}</el-radio>
          </div>
        </el-radio-group>

        <el-checkbox-group v-model="answer" v-show="examForm.itemList[count].itemType === '多选'" >
          <div style="height: 60px" v-if="examForm.itemList[count].optiona !== ''">
            <el-checkbox label="a">A.{{examForm.itemList[count].optiona}}</el-checkbox>
          </div>
          <div style="height: 60px" v-if="examForm.itemList[count].optionb !== ''">
            <el-checkbox label="b">B.{{examForm.itemList[count].optionb}}</el-checkbox>
          </div>
          <div style="height: 60px" v-if="examForm.itemList[count].optionc !== ''">
            <el-checkbox label="c">C.{{examForm.itemList[count].optionc}}</el-checkbox>
          </div>
          <div style="height: 60px" v-if="examForm.itemList[count].optiond !== '' ">
            <el-checkbox label="d">D.{{examForm.itemList[count].optiond}}</el-checkbox>
          </div>
          <div style="height: 60px"
               v-if="examForm.itemList[count].optione !== ''&& examForm.itemList[count].optione !== null">
            <el-checkbox label="e">E.{{examForm.itemList[count].optione}}</el-checkbox>
          </div>
          <div style="height: 60px"
               v-if="examForm.itemList[count].optionf !== '' && examForm.itemList[count].optionf !== null">
            <el-checkbox label="f">F.{{examForm.itemList[count].optionf}}</el-checkbox>
          </div>
          <div style="height: 60px"
               v-if="examForm.itemList[count].optiong !== '' && examForm.itemList[count].optiong !== null">
            <el-checkbox label="g">G.{{examForm.itemList[count].optiong}}</el-checkbox>
          </div>
        </el-checkbox-group>

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
  import {normalTime} from "../../filters/timeFormat";

  export default {
    name: "exam",
    data() {
      return {
        count: 0,
        answer: [],
        examForm: {
          itemList: [{
            itemId: '',
            question: 'dasdadad',
            optiona: 'aasdas',
            optionb: 'bbbbbbbb',
            optionc: 'cccccccccccc',
            optiond: 'saddasdas',
            optione: null,
            optionf: 'ffffffffffffff',
            optiong: 'sdadsa',
            answer: ''
          },
            {
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
        paperAnswer: {
          paperId: '',
          itemId: '',
          sno: '',
          answer: '',
        },
        time: new Date()
        ,
        student: {},
        paper: {},
      }
    },
    methods: {
      preQuestion() {
        console.log(this.examForm.itemList[this.count].answer)
        if (this.count - 1 < 0) {
          return
        }
        if (this.examForm.itemList[this.count].itemType === '多选') {
          this.examForm.itemList[this.count].answer = this.answer.join(",");
          this.count--;
          this.answer = this.examForm.itemList[this.count].answer.split(",");
        } else {
          this.count--;
        }


      },
      nextQuestion() {
        console.log(this.examForm.itemList[this.count].answer)
        if (this.count + 1 > this.examForm.itemList.length) {
          return
        }
        if (this.examForm.itemList[this.count].itemType === '多选') {
          let str = this.answer.join(",");
          this.answer = [];
          this.examForm.itemList[this.count].answer = str;
          this.count++;

          this.answer = this.examForm.itemList[this.count].answer.split(",")
        } else {
          this.count++;

        }


      },
      getStudentInfo(sno) {
        this.$http.post("/student/id/" + sno)
          .then(res => {
            this.student = res.student.map(student => {
              student.passwd = ''
              return student
            })
          })
          .catch(reason => {
            console.log("发生错误");
            console.log(reason);
          })
      },
      getPaperInfo(paperId) {
        this.$http.post("/paper/id/" + paperId)
          .then(res => {
            console.log("getPaperInfo----------")
            console.log(res)
            this.paper = res.data.paper;
          })
          .catch(reason => {
            console.log("getPaperInfo发生错误");
            console.log(reason.message);
          })
      },
      getItemInfo(paperId) {
        this.$http.post("/answer/presave?paperId=" + paperId)
          .then(value => {
            console.log(value)
            let items = value.data.data;
            this.examForm.itemList = items.map(item => {
              item.answer = '';
              return item;
            })
          })
          .catch(reason => {
              console.log("getItemInfo发生错误")
              console.log(reason.message)
            }
          )
      },
      submitForm() {
        this.$confirm('提交答案后无法更改, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post("/answer/save", JSON.stringify(this.examForm.itemList))
            .then((res) => {
                if (res.code !== 0) {
                  this.$notify.error({
                    title: '错误',
                    message: res.message
                  });
                }

                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
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
      //TODO 传参应该用VUEX
      if (this.$route.params.sno != null) {
        this.getStudentInfo(this.$route.params.sno);
      }
      if (this.$route.params.paperId != null) {
        this.getItemInfo(this.$route.params.paperId);
        this.getPaperInfo(this.$route.params.paperId);
      } else {
        this.$router.push({path:'/examlist'})
      }

      this.interval = setInterval(() => {
        // console.log( this.paper.testdate.getHours() - new Date().getHours())
        let date = new Date(this.paper.testdate);
        date.setHours(date.getHours() + 1 - 8)
        this.time = date - new Date()
      }, 1000);


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
