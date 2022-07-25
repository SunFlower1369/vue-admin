import store from '../store/index';

//持久化
let userInfo = localStorage.getItem('userInfo'); //这里的名字对应setItem的名字
if (userInfo) {
  userInfo = JSON.parse(userInfo);
  store.commit('Login/setUser', userInfo);
}
