import {

  USER_LOGOUT,
  USER_LOGIN,
  STUDENT_LOGOUT,
  STUDENT_LOGIN
} from './type'

const state={
  logined: false,
  userInfo:{
    userid:'',
    realname:'',
    passwd:'',
    loginDtime:'',
    logoutDtime:'',
    loginHost:''
  },
  student:{
    sno:'',
    idno:'',
    passwd:'',
    major:'',
    classno:'',
    sname:'',
    pyname:'',
    gender:'',
    birthday:'',
    pic:'',
    highSchool:'',
    highScore:'',
    insource:'',
    intype:'',
    nation:'',
    politicalStatus:'',
    tel:'',
    qq:'',
    email:'',
    descript:'',
    recDtime:''
  }
};

const mutations={


  [USER_LOGIN](state){
    state.logined = true
    state.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  },
  [USER_LOGOUT](state){
    sessionStorage.clear()
    state.logined = false
    state.userInfo = {
      userid:'',
      realname:'',
      passwd:'',
      loginDtime:'',
      logoutDtime:'',
      loginHost:''
    }
  },
  [STUDENT_LOGIN](state){
    state.logined = true
    state.student = JSON.parse(sessionStorage.getItem('student'))
  },
  [STUDENT_LOGOUT](state){
    sessionStorage.clear()
    state.logined = false
    state.student = {
      sno:'',
      idno:'',
      passwd:'',
      major:'',
      classno:'',
      sname:'',
      pyname:'',
      gender:'',
      birthday:'',
      pic:'',
      highSchool:'',
      highScore:'',
      insource:'',
      intype:'',
      nation:'',
      politicalStatus:'',
      tel:'',
      qq:'',
      email:'',
      descript:'',
      recDtime:''
    }
  },

};

const getters={
	getUserInfo(state){
		return state.userInfo;
	},
	getStudent(state){
		return state.student;
	}
};

export default{
	state,
	mutations,
	getters
}
