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


    function httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
    }
    var apiurl = "https://related-news-extension-api.herokuapp.com/?q=https://www.theguardian.com/politics/2020/jan/18/long-bailey-we-must-become-salespeople-for-socialism"

    function loopArticles(responseText) {
        var relatedArticles = JSON.parse(responseText);
        console.log(relatedArticles);
        for (var i = 0; i < relatedArticles.length; i++) {
          console.log(relatedArticles[i]);
          var sidebarPanel = document.getElementsByClassName("panel")[0];
          var div = document.createElement("div");
          div.innerHTML = `
            <div class="article-container">
                <div class="article-data-left">
                    <div class="source article-meta">
                        <p>From <span class="publication">${relatedArticles[i].source.name}</span></p>
                    </div>
                    <div class="article-title">
                        <!-- Need to limit the number of characters in the headline -->
                        <p class="article-title-text">${relatedArticles[i].title}</p>
                    </div>
                    <div class="article-date article-meta">
                        <p>${relatedArticles[i].publishedAt} hours ago //TODO</p>
                    </div>
                </div>
                <div class="article-image-right">
                    <img src="${relatedArticles[i].urlToImage}" alt="">
                </div>
            </div>`
          sidebarPanel.appendChild(div);
        }
    }
    var relatedArticles = httpGetAsync(apiurl, loopArticles);




    var style=document.createElement('style');
    style.type='text/css';
    if(style.styleSheet){
        style.styleSheet.cssText=`
      .wrapper {
        width: 400px;
        margin: auto;
        padding-top: 5px;
        background: #eee;
        height: 100vh;
    }
    .article-container {
        height: 130px;
        background-color: white;
        margin: 5px;
        border-radius: 5px;
        -webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
        -moz-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
        font-family: "Merriweather Sans", sans-serif;
        overflow: hidden;
    }
    .article-container p {
        margin: 0.5em;
    }
    .article-meta {
        font-size: 0.8em;
        opacity: 0.7;
    }
    .article-data-left {
        width: calc(70% - 10px);
        float: left;
        padding: 5px;
    }
    .article-title {
        font-weight: bold;
    }

    .article-image-right {
        width: 30%;
        height: 100%;
        float: left;
        overflow: hidden;
    }
    .article-image-right > img {
        height: 100%;
        object-fit: cover;
        object-position: 50% 50%; /* JMTODO: Make this work */
    }
    `;
    }else{
        style.appendChild(document.createTextNode(`
        .wrapper {
            width: 400px;
            margin: auto;
            padding-top: 5px;
            background: #eee;
            height: 100vh;
        }
        .article-container {
            height: 130px;
            background-color: white;
            margin: 5px;
            border-radius: 5px;
            -webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
            -moz-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
            box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
            font-family: "Merriweather Sans", sans-serif;
            overflow: hidden;
        }
        .article-container p {
            margin: 0.5em;
        }
        .article-meta {
            font-size: 0.8em;
            opacity: 0.7;
        }
        .article-data-left {
            width: calc(70% - 10px);
            float: left;
            padding: 5px;
        }
        .article-title {
            font-weight: bold;
        }

        .article-image-right {
            width: 30%;
            height: 100%;
            float: left;
            overflow: hidden;
        }
        .article-image-right > img {
            height: 100%;
            object-fit: cover;
            object-position: 50% 50%; /* JMTODO: Make this work */
        }
        `));
    }
    document.getElementsByTagName('head')[0].appendChild(style);
