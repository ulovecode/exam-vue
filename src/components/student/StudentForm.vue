<template>
  <el-form :model="studentForm" :rules="rules" ref="studentForm" label-width="100px" class="demo-studentForm">

    <el-form-item label="学号" prop="sno" style="width: 300px">
      <el-input v-model="studentForm.sno" placeholder="请输入学号"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="passwd" style="width: 300px">
      <el-input type="password" v-model="studentForm.passwd" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkpasswd" style="width: 300px">
      <el-input type="password" v-model="studentForm.checkpasswd" placeholder="请确认密码"></el-input>
    </el-form-item>
    <el-form-item label="学生姓名" prop="sname" style="width: 300px">
      <el-input v-model="studentForm.sname"  placeholder="请输入学生姓名"></el-input>
    </el-form-item>

    <el-form-item label="身份证号" prop="idno" style="width: 300px">
      <el-input v-model="studentForm.idno"  placeholder="请输入身份号"></el-input>
    </el-form-item>

    <el-form-item label="生日" prop="birthday">
      <el-date-picker
        v-model="studentForm.birthday"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    </el-form-item>

    <el-form-item label="班级编号" prop="classno" style="width: 300px">
      <el-input
        placeholder="请输入班级编号"
        v-model="studentForm.classno"
        clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="招生来源" prop="insource">
      <el-select v-model="studentForm.insource" placeholder="招生来源">
        <el-option label="统一高考" value="统一高考"></el-option>
        <el-option label="中职考高职" value="中职考高职"></el-option>
        <el-option label="对口高考" value="对口高考"></el-option>
        <el-option label="技能高考" value="技能高考"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="招生类型" prop="intype">
      <el-select v-model="studentForm.intype" placeholder="招生类型">
        <el-option label="统招本科" value="统招本科"></el-option>
        <el-option label="统招专科" value="统招专科"></el-option>
        <el-option label="预科" value="预科"></el-option>
        <el-option label="成教" value="成教"></el-option>
        <el-option label="自考" value="自考"></el-option>
        <el-option label="专升本" value="专升本"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="联系方式" prop="tel" style="width: 300px">
      <el-input
        placeholder="请输入联系方式"
        v-model="studentForm.tel"
        clearable>
      </el-input>
    </el-form-item>


    <el-form-item label="专业" prop="major" style="width: 300px">
      <el-select
        v-model="studentForm.major"
        filterable
        allow-create
        default-first-option
        placeholder="请输入专业">
        <el-option
          v-for="item in majorList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>


    <el-form-item label="毕业中学" prop="highSchool" style="width: 300px">
      <el-input
        placeholder="请输入毕业中学"
        v-model="studentForm.highSchool"
        clearable>
      </el-input>
    </el-form-item>

    <el-form-item label="性别" prop="gender">
      <el-radio-group v-model="studentForm.gender">
        <el-radio label="男" value="男"></el-radio>
        <el-radio label="女" value="女"></el-radio>
      </el-radio-group>
    </el-form-item>


    <el-form-item label="高考分数" prop="highScore" style="width: 300px">
      <el-input
        placeholder="请输入高考分数"
        v-model="studentForm.highScore"
        clearable>
      </el-input>
    </el-form-item>

    <el-form-item label="政治状态" prop="political_status">
      <el-select v-model="studentForm.politicalStatus" placeholder="政治状态">
        <el-option label="群众" value="群众"></el-option>
        <el-option label="团员" value="团员"></el-option>
        <el-option label="党员" value="党员"></el-option>
      </el-select>
    </el-form-item>


    <el-form-item label="邮箱" prop="email" style="width: 300px">
      <el-input
        placeholder="请输入邮箱"
        v-model="studentForm.email"
        clearable>
      </el-input>
    </el-form-item>


    <el-form-item label="qq" prop="qq" style="width: 300px">
      <el-input
        placeholder="请输入qq"
        v-model="studentForm.qq"
        clearable>
      </el-input>
    </el-form-item>

    <el-form-item label="学生照片" prop="cname">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8080/fileupload/img"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="studentForm.pic !== ''" :src="studentForm.pic" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item label="课程描述" prop="descript" style="width: 700px">
      <el-input type="textarea" v-model="studentForm.descript"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('studentForm')">
        <strong>
          立即创建
        </strong>
      </el-button>
      <el-button @click="resetForm('studentForm')">重置</el-button>
    </el-form-item>


  </el-form>
</template>
<script>
  export default {
    name: 'studentform',
    data() {

      let checkSno = (rule, value, callback) => {
        if (value.trim() === '') {
          callback(new Error('请输入学号'));
        }
        let reg = /^20\d{8}/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error('请输入正确的学号'));
        }
      }
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.studentForm.passwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      let checkIdCard = (rule, value, callback) => {
        if (value.trim() === '') {
          callback(new Error("请输入身份证号"));
        }
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (reg.test(value) === true) {
          callback();
        } else {
          callback(new Error('请输入正确的身份证号码'));
        }
      }

      let checkTel = (rule, value, callback) => {
        if (value.trim() === '') {
          callback(new Error('请输入电话'));
        }
        let reg = /^1[3|4|5|8|7][0-9]\d{8}$/
        if (reg.test(value) === true) {
          callback();
        } else {
          callback(new Error('请输入正确的电话号码'))
        }
      }

      let checkEmail = (rule, value, callback) => {
        if (value.trim() === '') {
          callback(new Error("请输入邮箱"));
        }
        let reg = /\S+?@\S+?\.(com|cn)/
        if (reg.test(value) === true) {
          callback();
        } else {
          callback(new Error('请输入正确的邮箱'))
        }
      }

      let checkHighScore = (rule, value, callback) => {
        if (value.trim() === '') {
          callback(new Error("请输入高考分数"));
        }
        let number = Number(value).valueOf()
        if (isNaN(number)) {
          callback(new Error("请输入数字"))
        }
        if (number > 750 || number < 0) {
          callback(new Error('请输入正确的分数'))
        }
        callback()
      }

      return {
        submitType:'post',
        majorList: [
          {label:'计算机科学与技术',value: '计算机科学与技术'},
          {label:'会计',value: '会计'},
          {label:'土木工程',value:'土木工程'}
        ],
        studentForm: {
          sno: '',
          idno: '',
          passwd: '',
          checkpasswd: '',
          major: '',
          classno: '',
          sname: '',
          pyname: null,
          gender: '男',
          birthday: '',
          pic: '',
          highSchool: '',
          highScore: '',
          insource: '',
          intype: '',
          nation: '',
          politicalStatus: '',
          tel: '',
          qq: '',
          email: '',
          descript: ''
        },
        rules: {
          sno: [
            {required: true, validator: checkSno, trigger: 'blur'},
          ],
          idno: [
            {required: true, validator: checkIdCard, trigger: 'blur'},
          ],
          sname: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
          ],
          major: [
            {required: true, message: '请输入专业', trigger: 'blur'},
          ],
          classno: [
            {required: true, message: '请输入班级号', trigger: 'blur'},
          ],
          descript: [
            {required: false, message: '添加描述', trigger: 'blur'}
          ],
          passwd: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          checkpasswd: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          highSchool: [
            {required: true, message: '请输入高中学校', trigger: 'blur'}
          ],
          highScore: [
            {required: true, trigger: 'blur', validator: checkHighScore},

          ],
          insource: [
            {required: true, message: '请选择招生来源', trigger: 'blur'}
          ],
          intype: [
            {required: true, message: '请选择招生类型', trigger: 'blur'}
          ],
          tel: [
            {required: true, validator: checkTel, trigger: 'blur'}
          ],
          politicalStatus: [
            {required: false, message: '请选择政治状态', trigger: 'blur'}
          ],
          email: [
            {required: false, validator: checkEmail, trigger: 'blur'}
          ],
          qq: [
            {required: false, message: '请输入qq号', trigger: 'blur'}
          ],
          gender: [
            {required: true, message: '请选择性别', trigger: 'blur'}
          ],
          birthday: [
            {required: true, message: '请选择生日', trigger: 'blur'}
          ]
        },
      };
    },
    methods: {
      submitForm(formcname) {

        if (this.submitType === 'post') {
          this.$refs[formcname].validate((valid) => {
            if (valid) {
              this.$http.post("/student/id", this.studentForm)
                .then((res) => {
                  console.log(res.data)
                  this.$message.success({showClose: true, message: '新增成功', duration: 2000});
                  this.$router.push({path: '/student'})
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
              console.log('error submit!!');
            }
          });
        } else {
          this.$refs[formcname].validate((valid) => {
            if (valid) {
              this.$http.put("/student/id", this.studentForm)
                .then((res) => {
                  console.log(res.data)
                  this.$message.success({showClose: true, message: '修改成功', duration: 2000});
                  this.$router.push({path: '/student'})
                })
                .catch((err) => {
                    this.$message({
                      type: err.toString(),
                      message: '修改失败失败'
                    });
                  }
                );
              // alert('submit!');

            } else {
              console.log('error submit!!');
            }
          });
        }

      },
      resetForm(formcname) {
        this.$refs[formcname].resetFields();
      },
      getstudent(id) {

        this.$http.get("/student/id/" + id)
          .then(res => {
            console.log(res.data)
            this.studentForm = res.data['student']
            // console.log(this.studentList)
          }).catch((err) => {
          console.log(err);
        });
      },
      handleAvatarSuccess(res, file) {
        // this.imgUrl = URL.createObjectURL(file.raw);
        // console.log(res.file)
        this.studentForm.pic = res.file;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt3M = file.size / 1024 / 1024 < 3;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt3M) {
          this.$message.error('上传头像图片大小不能超过 3MB!');
        }
        return isJPG && isLt3M;
      }
    },
    mounted() {
      if (this.$route.params.sno != null) {
        this.getstudent(this.$route.params.sno);
        this.submitType = 'put'
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
