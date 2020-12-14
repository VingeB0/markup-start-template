import $ from 'jquery';
// window.jQuery = $; window.$ = $ // import module example (npm i -D jquery)
//required if js from vendor folder

$(document).ready(function () {
    console.log('hello world!');
    console.log($('html'));
})