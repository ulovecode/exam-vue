<template>
  <el-form :model="paperForm" :rules="rules" ref="paperForm" label-width="100px" class="demo-paperForm">


    <el-form-item label="课程" prop="courseId">
      <el-select v-model="paperForm.courseId" placeholder="请选择">
        <el-option
          v-for="item in courseList"
          :key="item.courseId"
          :label="item.cname"
          :value="item.courseId">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="标题" prop="title" >
      <el-input v-model="paperForm.title" style="width: 220px"></el-input>
    </el-form-item>
    <el-form-item label="成绩" prop="grade">
      <el-input-number v-model="paperForm.grade" :step="10"></el-input-number>
    </el-form-item>

    <el-form-item label="学期" prop="stage">
      <el-select v-model="paperForm.stage" placeholder="请选择学期">
        <el-option label="第一学期" value="第一学期"></el-option>
        <el-option label="第二学期" value="第二学期"></el-option>
        <el-option label="第三学期" value="第三学期"></el-option>
        <el-option label="第四学期" value="第四学期"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="考试时间" prop="testdate">
      <el-date-picker
        v-model="paperForm.testdate"
        type="datetime"
        placeholder="请选择考试时间">
      </el-date-picker>
    </el-form-item>

    <el-form-item label="试卷描述" prop="descript">
      <el-input type="textarea" v-model="paperForm.descript"></el-input>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click="submitForm('paperForm')">
        <strong v-show="paperForm.paperId == null">
          立即创建
        </strong>
        <strong v-show="paperForm.paperId!=null">
          更新
        </strong>
      </el-button>
      <el-button @click="resetForm('paperForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
        name: "PaperForm",
      data(){
          return{
            submitType:'post',
            courseList: [],
            paperForm:{
              paperId: null,
              courseId: '',
              title:'',
              grade:50,
              stage:'',
              testdate:'',
              descript:'',
              cname:''
            },
            rules:{

            }
          }
      },
      methods:{
          submitForm(formcname) {
          this.$refs[formcname].validate((valid) => {
            if (valid) {
              if (this.submitType === 'post') {
                this.$http.post("/paper/id", this.paperForm)
                  .then((res) => {
                    console.log(res.data)
                    this.$message.success({showClose: true, message: '新增成功', duration: 2000});
                    this.$router.push({path: '/paper'})
                  })
                  .catch((err) => {
                      this.$message({
                        type: err.toString(),
                        message: '创建失败'
                      });
                    }
                  );
              } else {
                this.$http.put("/paper/id", this.paperForm)
                  .then((res) => {
                    console.log(res.data)
                    this.$message.success({showClose: true, message: '修改成功', duration: 2000});
                    this.$router.push({path: '/paper'})
                  })
                  .catch((err) => {
                      this.$message({
                        type: err.toString(),
                        message: '创建失败'
                      });
                    }
                  );
              }


            } else {
              this.$message.error({showClose: true, message: '请填写试题', duration: 2000});
              console.log('error submit!!');
            }
          });
        },
        resetForm(formcname) {
          this.$refs[formcname].resetFields();
        },
      getCourseData() {




        this.$http.get("/course/showlist")
          .then(res => {
            console.log(res)
            this.courseList = res.data
          }).catch((err) => {
          console.log(err)
        })
      },
        getPaper(paperId){
          this.$http.get("/paper/id/"+paperId)
            .then(res => {
              console.log(res)
              this.paperForm = res.data.paper
            }).catch((err) => {
            console.log(err)
          })
        }
      },
      mounted(){
        this.getCourseData()
        if (this.$route.params.paperId != null) {
          this.getPaper(this.$route.params.paperId);
          this.submitType = 'put'
        }
      }
    }
</script>

<style scoped>
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
