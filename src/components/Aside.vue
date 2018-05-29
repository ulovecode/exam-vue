<template>
  <div id="aside">
    <el-container style="height: 100%; border: 1px  #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['5']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-edit"></i>管理学生</template>
            <el-menu-item-group>
              <!--<template slot="title">学生管理</template>-->
              <el-menu-item index="1-1">
                <router-link to="/studentForm" class="router-link-active">增加学生</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/student" class="router-link-active">学生列表</router-link>
              </el-menu-item>
            </el-menu-item-group>

          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-document"></i>管理试卷</template>

            <el-menu-item-group>
              <!--<template slot="title">学生管理</template>-->
              <el-menu-item index="1-1">
                <router-link to="/paperForm" class="router-link-active">增加试卷</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/paper" class="router-link-active">试卷列表</router-link>
              </el-menu-item>
            </el-menu-item-group>

          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-tickets"></i>管理试题</template>

            <el-menu-item-group>
              <!--<template slot="title">学生管理</template>-->
              <el-menu-item index="1-1">
                <router-link to="/itemForm" class="router-link-active">增加试题</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/item" class="router-link-active">试题列表</router-link>
              </el-menu-item>
            </el-menu-item-group>

          </el-submenu>

          <el-submenu index="4">
            <template slot="title"><i class="el-icon-date"></i>管理课程</template>

            <el-menu-item-group>
              <!--<template slot="title">学生管理</template>-->
              <el-menu-item index="1-1">
                <router-link to="/courseForm" class="router-link-active">增加课程</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/course" class="router-link-active">课程列表</router-link>
              </el-menu-item>
            </el-menu-item-group>

          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-bell"></i>考试列表</template>

            <el-menu-item-group>
              <!--<template slot="title">学生管理</template>-->
              <el-menu-item index="1-1">
                <router-link to="/examlist" class="router-link-active">考试列表</router-link>
              </el-menu-item>
            </el-menu-item-group>

          </el-submenu>
        </el-menu>
      </el-aside>


    </el-container>

  </div>
</template>

<script>
  export default {
    name: "Aside"
  }
</script>

<style scoped>
  .router-link-active {
    text-decoration: none;
    color: black;
  }
</style>
