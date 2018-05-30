<template>
  <div id="login">
    &nbsp;
    <div class="login-box">

      <el-card class="box-card">

        <el-form ref="user" :model="user">
          <el-tabs v-model="userstatus" type="card" @tab-click="handleClick">
            <el-tab-pane label="学生登陆" name="student"></el-tab-pane>
            <el-tab-pane label="老师登陆" name="userinfo"></el-tab-pane>
          </el-tabs>

          <template v-if="userstatus === 'student'">
            <el-form-item>
              <el-col :span="24">
                <el-input v-model="user.userid" key="student-input">
                  <template slot="prepend">学生帐号</template>
                </el-input>
              </el-col>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item>
              <el-col :span="24">
                <el-input v-model="user.userid" key="user-input">
                  <template slot="prepend">老师帐号</template>
                </el-input>
              </el-col>
            </el-form-item>
          </template>
          <el-form-item>
            <el-col :span="24">
              <el-input type="password" v-model="user.passwd">
                <template slot="prepend"> 密码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</template>
              </el-input>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-button style="margin-left: 80px" type="primary" @click="onSubmit">登陆</el-button>
            <el-button style="margin-left: 100px">注册</el-button>
          </el-form-item>
        </el-form>

      </el-card>
      &nbsp;
    </div>
    &nbsp;
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        userstatus: 'student',
        user: {
          userid: '',
          passwd: ''
        }
      }
    },
    methods: {
      onSubmit() {
        let username = this.user.userid;
        let password = this.user.passwd;
        if (username === '' || password === '') {
          this.$message({
            message: '账号或密码为空！',
            type: 'error'
          });
          return;
        }
        if (this.userstatus === 'student') {
          this.$http.post("/student/login", {sno: this.user.userid, passwd: this.user.passwd})
            .then(value => {
              let res = value.data;
              if (res.code === 0) {
                this.$message({
                  message: "登陆成功",
                  type: 'success'
                });
                let student = value.data.data;
                console.log(student)
                sessionStorage.setItem("student", JSON.stringify(student))
                this.$store.dispatch("STUDENT_LOGIN");
                this.$router.push({path:'/examlist'})
              } else {
                this.$message({
                  message: "用户名或密码错误",
                  type: 'error'
                });
              }
            })
            .catch(reason => {
              this.$message({
                message: reason.message,
                type: 'error'
              });
            });
        } else {
          this.$http.post("/user/login", this.user)
            .then(value => {
                let res = value.data;
              if (res.code === 0) {
                this.$message({
                  message: "登陆成功",
                  type: 'success'
                });
                let userInfo = value.data.data;
                sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
                this.$store.dispatch("USER_LOGIN")
                this.$router.push({path:'/examlist'})
              } else {
                this.$message({
                  message: "用户名或密码错误",
                  type: 'error'
                });
              }
            })
            .catch(
              reason => {
                this.$message({
                  message: reason.message,
                  type: 'error'
                });
              }
            );
        }

      },
      handleClick(tab, event) {
        this.userstatus = tab.value;
        console.log(tab, event);
      }
    }
  }
</script>

<style scoped>
  #login{
    background:  url(../../assets/img/1206288.jpg) no-repeat fixed ;
    background-size: 100% 100%;
  }
  .login-box {
    margin-bottom: 18%;
    margin-left: 35%;
    height: 30%;
    width: 25%;
  }

</style>
