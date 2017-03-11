global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

import Vue from 'vue'
import App from './App'
import 'materialize-css/sass/materialize.scss';
import 'materialize-css/dist/js/materialize.js';
import 'mdi/css/materialdesignicons.css';

new Vue({
	el: '#app',
	template: '<App/>',
	components: { App }
})