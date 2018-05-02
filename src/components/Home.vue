<template>
  <div class="home">
    <el-carousel trigger="click" height="700px">
      <el-carousel-item v-for="item in imgList" :key="item.url"  style="text-align: center;">
        <img :src="item.url" alt="">
      </el-carousel-item>
    </el-carousel>

  </div>
</template>

<script>
  import img2 from '../assets/img/1111582.jpg'
  import img3 from '../assets/img/1206288.jpg'
    export default {
        name: "Home",
      data(){
          return{
            imgList :[{url:img2},{url:img3}]
          }
      }
    }

</script>

<style scoped>

  .el-carousel__item img {
    /*opacity: 0.75;*/
    margin: 70px;
  }

</style>
