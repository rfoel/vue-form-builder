global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

import 'materialize-css/sass/materialize.scss';
import 'materialize-css/dist/js/materialize.js';
import 'mdi/css/materialdesignicons.css';
import Vue from 'vue'
import App from './App'

new Vue({
	el: '#app',
	template: '<App/>',
	components: { App }
})