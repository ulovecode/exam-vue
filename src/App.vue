<template>
  <div id="app">


    <el-container>
      <el-header>
        <nav-header></nav-header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside></Aside>
        </el-aside>
        <el-container>
          <el-main>
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>

</template>

<script>
  import NavHeader from "./components/NavHeader";
  import Footer from "./components/Footer";
  import Aside from "./components/Aside";

  export default {
    name: 'App',
    components: {Aside, Footer, NavHeader}
  }
</script>

<style >
  body{
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 200px;
    color: #2c3e50;
  }

    .el-header {
      position: fixed;
      z-index: 1;
      width: 100%;
    }

  .el-header, .el-footer {
    background-color: #545c64;
    color: white;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    margin-top: 60px;

  }

  .el-main {
    /*background-color: #E9EEF3;*/
    color: #333;
    line-height: 60px;
    height: 835px;
    margin-top: 50px;

  }

  body > .el-container {
    margin-bottom: 40px;
  }

  /*.el-container:nth-child(5) .el-aside,*/
  /*.el-container:nth-child(6) .el-aside {*/
  /*line-height: 260px;*/
  /*}*/

  /*.el-container:nth-child(7) .el-aside {*/
  /*line-height: 320px;*/
  /*}*/
</style>
