<template>
  <div id="navHeader" >
    <el-menu
      fixed
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">

      <el-menu-item index="1" >首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">题库</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3"  :disabled="showheader">消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
      <el-col :span="14">
          &nbsp;
      </el-col>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
      <el-button type="danger" round>登陆/注册</el-button>

    </el-menu>



  </div>
</template>

<script>
  export default {
    name: "NavHeader",
    data() {
      return {
        showheader :false,
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
    color: white;
  }

  .el-breadcrumb {
    line-height: 60px;
  }

  img {
    vertical-align: middle;
  }

</style>
