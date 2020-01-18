// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function() {
    var panel = document.createElement('div');
    panel.className = 'panel';
    panel.innerHTML = '<h2>TODO</h2><p>Add meaningful content</p>';

    var arrow = document.createElement('a');
    arrow.href = 'javascript:void(0);'
    arrow.className = 'slider-arrow show';
    arrow.innerHTML = '&raquo;'

    $("body").prepend( panel );
    $("body").prepend( arrow );

    $('.panel').css({'z-index': '999999', 'width':'300px', 'float':'left', 'height':'100%', 'background':'#d9dada','position':'absolute', 'left':'-300px'})
    $('.slider-arrow').css({'z-index': '999999', 'padding':'5px', 'width':'50px', 'height':'50px', 'float':'left', 'background':'#d9dada','font':'400 32px Arial, Helvetica, sans-serif', 'color':'#000','text-decoration':'none', 'position':'absolute'})
});

$(function(){
	$('.slider-arrow').click(function(){
        if($(this).hasClass('show')){
	    $( ".slider-arrow, .panel" ).animate({
          left: "+=300"
		  }, 700, function() {
            // Animation complete.
          });
		  $(this).html('&laquo;').removeClass('show').addClass('hide');
        }
        else {
	    $( ".slider-arrow, .panel" ).animate({
          left: "-=300"
		  }, 700, function() {
            // Animation complete.
          });
		  $(this).html('&raquo;').removeClass('hide').addClass('show');
        }
    });

});