import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CourseList from '@/components/course/Course'
import CourseForm from '@/components/course/CourseForm'
import StudentList from '@/components/student/Student'
import StudentForm from '@/components/student/StudentForm'
import ItemForm from '@/components/item/ItemForm'
import Item from '@/components/item/item'
import Home from '@/components/Home'
Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/course',
      name: 'courselist',
      component: CourseList,
    },
    {
      path: '/courseform',
      name: 'CourseForm',
      component: CourseForm,
      children:[
        {
          path: ':courseId',
          name: 'CourseForm_u',
          component: CourseForm,
        }
      ]
    },
    {
      path: '/',
      name: 'home',
      component:Home
    },{
      path: '/student',
      name: 'studentlist',
      component: StudentList,
    },
    {
      path: '/studentform',
      name: 'studentForm',
      component: StudentForm,
      children:[
        {
          path: ':sno',
          name: 'studentForm_u',
          component: StudentForm,
        }
      ]
    },
    {
      path: '/item',
      name: 'itemlist',
      component: Item,
    },
    {
      path: '/itemform',
      name: 'itemForm',
      component: ItemForm,
      children:[
        {
          path: ':itemId',
          name: 'itemForm_u',
          component: ItemForm,
        }
      ]
    },


  ]
})

