<template>
  <el-form :model="courseForm" :rules="rules" ref="courseForm" label-width="100px" class="demo-courseForm">
    <el-form-item label="课程名称" prop="cname">
      <el-input v-model="courseForm.cname"></el-input>
    </el-form-item>

    <el-form-item label="课程类型" prop="ctype">
      <el-radio-group v-model="courseForm.ctype">
        <el-radio label="学位课"></el-radio>
        <el-radio label="公共课"></el-radio>
        <el-radio label="选修课"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="学期" prop="stage">
      <el-select v-model="courseForm.stage" placeholder="请选择学期">
        <el-option label="第一学期" value="第一学期"></el-option>
        <el-option label="第二学期" value="第二学期"></el-option>
        <el-option label="第三学期" value="第三学期"></el-option>
        <el-option label="第四学期" value="第四学期"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="课程绩点" prop="credit">
      <el-input-number v-model="courseForm.credit" :min="1" :max="10" label="课程绩点"></el-input-number>
    </el-form-item>

    <el-form-item label="课时数" prop="times">
      <el-slider v-model="courseForm.times" :min="1" :max="199" ></el-slider>
    </el-form-item>

    <el-form-item label="课程描述" prop="descript">
      <el-input type="textarea" v-model="courseForm.descript"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('courseForm')">
      <strong v-show="courseForm.courseId == null">
      立即创建
      </strong>
      <strong v-show="courseForm.courseId != null">
      更新
      </strong>
      </el-button>
      <el-button @click="resetForm('courseForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    cname: 'courseform',

    data() {
      return {
        submitType:'post',
        courseForm: {
          courseId: null,
          times: 32,
          credit: 1,
          cname: '',
          stage: '',
          ctype: '',
          descript: ''
        },
        rules: {
          cname: [
            {required: true, message: '请输入课程', trigger: 'blur'}
          ],
          stage: [
            {required: true, message: '请选择课时数', trigger: 'change'}
          ],
          ctype: [
            {required: true, message: '请选择课程类型', trigger: 'change'}
          ],
          descript: [
            {required: false, message: '添加描述', trigger: 'blur'}
          ]
        },
      };
    },
    methods: {
      submitForm(formcname) {
        this.$refs[formcname].validate((valid) => {

          if (valid) {
            if (this.submitType === 'post') {
              this.$http.post("/course/id", this.courseForm)
                .then((res) => {
                  this.$message.success({showClose: true, message: '新增成功', duration: 2000});
                  this.$router.push({path: '/course'})
                })
                .catch((err) => {
                    this.$message({
                      type: err.toString(),
                      message: '创建失败'
                    });
                  }
                );
            } else {
              this.$http.put("/course/id",this.courseForm )
                .then((res)=>{
                  if (res.data.code === 0) {
                    this.$message.success({showClose: true, message: '修改成功', duration: 2000});
                    this.$router.push({path: '/course'});
                  } else {
                    this.$message.error({showClose: true, message: '修改失败'+res.data.msg, duration: 2000});
                  }
                })
                .catch((err)=>{
                    this.$message({
                      type: err.toString(),
                      message: '创建失败'
                    });
                  }
                );
            }
          } else {
            console.log('error submit!!');
          }
        });
      },
      resetForm(formcname) {
        this.$refs[formcname].resetFields();
      },
      getCourse(id) {
        this.$http.get("/course/id/" + id)
          .then(res => {
            console.log(res.data)
            this.courseForm = res.data['course']
            this.submitType = 'put'
            // console.log(this.courseList)
          }).catch((err) => {
          console.log(err);
        });
      }
    },
    mounted() {
      if(typeof(this.$route.params.courseId) !== "undefined")
      this.getCourse(this.$route.params.courseId);
    }
  }
</script>

<style>
  .el-slider{
    width: 600px;
  }
</style>
