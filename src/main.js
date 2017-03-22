global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

import Vue from 'vue'
import App from './App'

new Vue({
	el: '#app',
	template: '<App/>',
	components: { App }
})