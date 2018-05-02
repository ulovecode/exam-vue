<template>
  <el-form :model="itemForm" :rules="rules" ref="itemForm" label-width="100px" class="demo-CourseForm">

    <el-form-item label="课程" prop="itemType">
      <el-select v-model="itemForm.courseId" placeholder="请选择">
        <el-option
          v-for="item in courseList"
          :key="item.courseId"
          :label="item.cname"
          :value="item.courseId">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="试题类型" prop="itemType">
      <el-select @change="clearItemType" v-model="itemForm.itemType" placeholder="试题类型">
        <el-option label="单选" value="单选"></el-option>
        <el-option label="多选" value="多选"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="问题" prop="question" style="width: 700px">
      <el-input type="textarea" v-model="itemForm.question"></el-input>
    </el-form-item>
    <el-form-item label="选项a" prop="optiona">
      <el-input v-model="itemForm.optiona"></el-input>
    </el-form-item>
    <el-form-item label="选项b" prop="optionb">
      <el-input v-model="itemForm.optionb"></el-input>
    </el-form-item>
    <el-form-item label="选项c" prop="optionc">
      <el-input v-model="itemForm.optionc"></el-input>
    </el-form-item>
    <el-form-item label="选项d" prop="optiond">
      <el-input v-model="itemForm.optiond"></el-input>
    </el-form-item>
    <el-form-item label="选项f" prop="optionf">
      <el-input v-model="itemForm.optionf"></el-input>
    </el-form-item>
    <el-form-item label="选项e" prop="optiong">
      <el-input v-model="itemForm.optiong"></el-input>
    </el-form-item>

    <el-form-item label="答案" prop="answer">
      <el-checkbox-group
        v-model="answerArray"
        :min="0"
        :max="maxValue">
        <!--<el-checkbox :disabled="itemForm.itemType ===''" v-for="answer in answerList" :label="answer" :key="answer">-->
          <!--{{answer}}-->
        <!--</el-checkbox>-->

        <el-checkbox :disabled="itemForm.itemType ===''" v-for="answer in answerList" :label="answer" :key="answer">
          {{answer}}
        </el-checkbox>
        <el-checkbox :disabled="itemForm.optionf ===''" value="f" :label="f">f</el-checkbox>
        <el-checkbox :disabled="itemForm.optiong ===''" value="g" :label="g">g</el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="试题知识点" prop="knowledge" style="width: 700px">
      <el-input type="textarea" v-model="itemForm.knowledge"></el-input>
    </el-form-item>
    <el-form-item label="试题提示" prop="clue" style="width: 700px">
      <el-input type="textarea" v-model="itemForm.clue"></el-input>
    </el-form-item>

    <el-form-item label="试题难度" prop="difficulty">
      <el-rate style="margin-top: 10px"
               v-model="itemForm.difficulty"
               show-score
               text-color="#ff9900"
               score-template="{value}">
      </el-rate>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click="submitForm('itemForm')">
        <strong>
          立即创建
        </strong>
      </el-button>
      <el-button @click="resetForm('itemForm')">重置</el-button>
    </el-form-item>


  </el-form>
</template>
<script>
  export default {
    name: 'itemForm',
    data() {

      return {
        answerArray: [],
        answerList: ['a', 'b', 'c', 'd'],
        courseList: [],
        itemForm: {
          itemId:null,
          difficulty: 3,
          clue: '',
          knowledge: '',
          answer: '',
          optiona: '',
          optionb: '',
          optionc: '',
          optiond: '',
          optionf: '',
          optiong: '',
          question: '',
          itemType: '',
          courseId: ''
        },
        rules: {
          question: [
            {required: true, message: '请输入问题', trigger: 'blur'}
          ],
          optiona: [
            {required: true, message: '选项一', trigger: 'blur'}
          ],
          optionb: [
            {required: true, message: '选项二', trigger: 'blur'}
          ],
          optionc: [
            {required: true, message: '选项三', trigger: 'blur'}
          ],
          optiond: [
            {required: true, message: '选项四', trigger: 'blur'}
          ],
          itemType: [
            {required: true, message: '请输入试卷类型', trigger: 'blur'}
          ],
          answer:[
            {required: true, message: 'aaa', trigger: 'blur'}
          ]
        },
      };
    },
    methods: {
      submitForm(formcname) {
        // JSON.stringify(this.itemForm)
        this.$refs[formcname].validate((valid) => {
          if (valid) {
            this.answerArray.sort((a, b) => a > b)
            this.itemForm.answer = this.answerArray.toString()
            this.$http.post("/item/merge", JSON.stringify(this.itemForm))
              .then((res) => {
                console.log(res.data)
                this.$message.success({showClose: true, message: '新增成功', duration: 2000});
                this.$router.push({path: '/item'})
              })
              .catch((err) => {
                  this.$message({
                    type: err.toString(),
                    message: '创建失败'
                  });
                }
              );
            // alert('submit!');

          } else {
            this.$message.error({showClose: true, message: '请填写试题', duration: 2000});
            console.log('error submit!!');
          }
        });
      },
      resetForm(formcname) {
        this.$refs[formcname].resetFields();
      },
      getItem(id) {
        this.$http.get("/item/id/" + id)
          .then(res => {
            this.itemForm = res.data['Item']
            this.answerArray = this.itemForm.answer.split(",")
          }).catch((err) => {
          console.log(err);
        });
      },
      getCourseData() {
        this.$http.get("/course/showList")
          .then(res => {
            console.log(res)
            this.courseList = res.data
          }).catch((err) => {
          console.log(err)
        })
      },
      clearItemType(val) {
        // console.log(val)
        if (val === '单选')
          this.answerArray = []
      }

    },
    mounted() {
      this.getCourseData()
      if (this.$route.params.itemId != null) {
        this.getItem(this.$route.params.itemId);
      }

    },
    computed: {
      maxValue: function () {
        if ('单选' === this.itemForm.itemType) {
          return 1
        } else {
          return 6
        }

      }
    }
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }


</style>
