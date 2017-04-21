global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

import Vue from 'vue'
import VueForm from './VueForm'

new Vue({
	el: '#app',
	components: { VueForm }
})