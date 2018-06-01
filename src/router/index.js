import Vue from 'vue'
import Router from 'vue-router'
import CourseList from '@/components/course/Course'
import CourseForm from '@/components/course/CourseForm'
import StudentList from '@/components/student/Student'
import StudentForm from '@/components/student/StudentForm'
import ItemForm from '@/components/item/ItemForm'
import Item from '@/components/item/item'
import Home from '@/components/Home'
import PaperForm from '@/components/paper/PaperForm'
import Paper from '@/components/paper/Paper'
import Exam from '@/components/exam/Exam'
import ExamList from '@/components/exam/ExamList'
import Login from '@/components/user/Login'
import Score from '@/components/score/Score'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/course',
      name: 'courselist',
      component: CourseList,
      meta: {
        requiresAuth: true  //需要登录的页面
      }
    },
    {
      path: '/courseform',
      name: 'CourseForm',
      component: CourseForm,
      children: [
        {
          path: ':courseId',
          name: 'CourseForm_u',
          component: CourseForm,
          meta: {
            requiresAuth: true  //需要登录的页面
          }
        }
      ],
      meta: {
        requiresAuth: true  //需要登录的页面
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true  //需要登录的页面
      }
    }, {
      path: '/student',
      name: 'studentlist',
      component: StudentList,
      meta: {
        requiresAuth: true  //需要登录的页面
      }
    },
    {
      path: '/studentform',
      name: 'studentForm',
      component: StudentForm,
      meta: {
        requiresAuth: true  //需要登录的页面
      },
      children: [
        {
          path: ':sno',
          name: 'studentForm_u',
          component: StudentForm,
          meta: {
            requiresAuth: true  //需要登录的页面
          }
        }

      ]
    },
    {
      path: '/item',
      name: 'itemlist',
      component: Item,
      meta: {
        requiresAuth: true  //需要登录的页面
      }
    },
    {
      path: '/itemform',
      name: 'itemForm',
      component: ItemForm,
      meta:{
        requiresAuth:true  //需要登录的页面
      },
      children: [
        {
          path: ':itemId',
          name: 'itemForm_u',
          component: ItemForm,
          meta:{
            requiresAuth:true  //需要登录的页面
          },
        }
      ]
    },
    {
      path: '/paper',
      name: 'paperlist',
      component: Paper,
      meta:{
        requiresAuth:true  //需要登录的页面
      },
    },
    {
      path: '/paperform',
      name: 'paperForm',
      component: PaperForm,
      meta:{
        requiresAuth:true  //需要登录的页面
      },
      children: [
        {
          path: ':paperId',
          name: 'paperForm_u',
          component: PaperForm,
          meta:{
            requiresAuth:true  //需要登录的页面
          },
        }
      ]
    },
    {
      path: '/exam',
      name: 'exam',
      component: Exam,
      meta:{
        requiresAuth:true  //需要登录的页面
      },
    },
    {
      path: '/examlist',
      name: 'examlist',
      component: ExamList,
      meta:{
        requiresAuth:false  //需要登录的页面
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        requiresAuth:false  //需要登录的页面
      }
    },
    {
      path: '/score',
      name: 'score',
      component: Score,
      meta:{
        requiresAuth:true  //需要登录的页面
      }
    }


  ]
})


