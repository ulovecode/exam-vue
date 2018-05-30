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

        <el-checkbox-group v-model="answer" v-show="examForm.itemList[count].itemType === '多选'">
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
        <router-link to="/examlist" class="router-link-active">
          <el-button type="danger"><i class="el-icon-close ">
            退出
          </i></el-button>
        </router-link>
      </el-button-group>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "exam",
    data() {
      return {
        count: 0,
        answer: [],
        examForm: {
          itemList: [{
            question: '',
          }]
        },
        time: new Date()
        ,
        student: {},
        paper:{testdate:new Date()}
      }
    },
    methods: {
      preQuestion() {
        if (this.count - 1 < 0) {
          return
        }
        if (this.examForm.itemList[this.count].itemType === '多选') {
          this.examForm.itemList[this.count].answer = this.answer.join(",");
        }
        this.count--;
        this.answer = this.examForm.itemList[this.count].answer.split(",");


      },
      nextQuestion() {
        if (this.count + 1 > this.examForm.itemList.length) {
          return
        }
        if (this.examForm.itemList[this.count].itemType === '多选') {
          let str = this.answer.join(",");
          this.examForm.itemList[this.count].answer = str;
        }
        this.count++;
        this.answer = this.examForm.itemList[this.count].answer.split(",")

      },
      getStudentInfo() {
        console.log("getStudentInfo------")
        this.student = this.getStudent;
        console.log(this.student)
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
            let items = value.data.data;
            this.examForm.itemList = items.map(item => {
              item.answer = '';
              return item;
            })
            console.log("getItemInfo----------")
            console.log(this.examForm.itemList)
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
          if (this.examForm.itemList[this.count].itemType === '多选') {
            this.examForm.itemList[this.count].answer = this.answer.join(",");
          }
          console.log(this.examForm.itemList)
          let answers = []
          this.examForm.itemList.map(value => {
            let answer = {}
            answer.answer = value.answer
            answer.itemId = value.itemId
            answer.paperId = this.paper.paperId
            answer.note = '正考'
            answer.sno = this.student.sno
            answers.push(answer)
          })
          console.log("answers-------------------")
          console.log(answers)
          this.$http.post("/answer/save", answers)
            .then((res) => {
              console.log('res-------------')
              console.log(res)
              if (res.data.code !== 0) {
                  this.$notify.error({
                    title: '返回结果错误',
                    message: res.msg
                  });
                } else {
                  this.$message({
                    type: 'success',
                    message: '提交成功!',
                  });
                  this.$router.push({path: '/examlist'})
                }
              }
            ).catch((error) => {
              console.log(error)
              this.$notify.error({
                title: '服务器错误',
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
    computed: mapGetters([
      'getUserInfo',
      'getStudent',
    ]),
    mounted() {
      //TODO 传参应该用VUEX

      this.getStudentInfo();

      if (this.$route.params.paperId != null) {
        this.getPaperInfo(this.$route.params.paperId);
        this.getItemInfo(this.$route.params.paperId);
      } else {
        this.$router.push({path: '/examlist'})
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
