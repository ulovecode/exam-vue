//import 数据 from ''	这里面可以获取数据
import * as types from './type'

export default{

  STUDENT_LOGIN:({commit})=>{
    commit(types.STUDENT_LOGIN)
  },
  STUDENT_LOGOUT:({commit})=>{
    commit(types.STUDENT_LOGOUT)
  },
  USER_LOGIN:({commit})=>{
    commit(types.USER_LOGIN)
  },
  USER_LOGOUT:({commit})=>{
    commit(types.USER_LOGOUT)
  }
}
