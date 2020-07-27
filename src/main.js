import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import {MediaQueries} from 'vue-media-queries';
import store from "./store";
{/**
  use MediaQueries for handling media query
*/}
const mediaQueries = new MediaQueries();

Vue.config.productionTip = false
Vue.use(mediaQueries);

new Vue({
  router,
  store,
  mediaQueries: mediaQueries,
  render: h => h(App),
}).$mount('#app')
