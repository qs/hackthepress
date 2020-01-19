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
    var newsextensionSidebarPanel = document.createElement('div');
    newsextensionSidebarPanel.className = 'newsextensionSidebarPanel';

    var arrow = document.createElement('a');
    arrow.href = 'javascript:void(0);'
    arrow.className = 'news-extension-sidebar-panel-slider-arrow show';
    arrow.innerHTML = '&raquo;'

    $("body").prepend( newsextensionSidebarPanel );
    $("body").prepend( arrow );

    $('.newsextensionSidebarPanel').css({'font-family': '"Merriweather Sans", sans-serif', 'z-index': '999999', 'width':'300px', 'float':'left', 'height':'100%', 'background':'white', 'position':'absolute', 'left':'-300px'})
    $('.news-extension-sidebar-panel-slider-arrow').css({ 'box-sizing': 'border-box', 'z-index': '999999', 'padding':'4px 4px 4px 17px', 'width':'50px', 'height':'50px', 'border-radius': '25px', 'margin': '5px', 'float':'left', 'background':'black','font':'400 32px Arial, Helvetica, sans-serif', 'color':'white','text-decoration':'none', 'position':'absolute'})
});

$(function(){
    $('.news-extension-sidebar-panel-slider-arrow').click(function(){
        if($(this).hasClass('show')){
        $( ".news-extension-sidebar-panel-slider-arrow, .newsextensionSidebarPanel" ).animate({
          left: "+=300"
          }, 700, function() {
            // Animation complete.
          });
          $(this).html('&laquo;').removeClass('show').addClass('hide');
        }
        else {
        $( ".news-extension-sidebar-panel-slider-arrow, .newsextensionSidebarPanel" ).animate({
          left: "-=300"
          }, 700, function() {
            // Animation complete.
          });
          $(this).html('&raquo;').removeClass('hide').addClass('show');
        }
    });

    // Jeromes code starts here I think
    function httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
    }
    var apiurl = `https://related-news-extension-api.herokuapp.com/?q=${window.location.href}`
    console.log(apiurl);

    function loopArticles(responseText) {
        var relatedArticles = JSON.parse(responseText);

        var sidebarPanel = document.getElementsByClassName("newsextensionSidebarPanel")[0];
        var sidebarPanelTopContent = document.createElement("div");
        sidebarPanelTopContent.innerHTML = `
        <div class="news-extension-sidebar-panel-top-text card-container">
            <p>The article you're reading has <br/><span style="//background-color: #e67e22;"> ${relatedArticles.warnings} quality warnings</span><br/> according to Glitched.News</p>
            <p><a target="_blank" style="text-decoration: underline; font-weight: 500;" href="${relatedArticles.analysis}">See a full analysis here.</a></p>
        </div>
        <div class="news-extension-sidebar-panel-top-text card-container">
            <p>You'll find the same information from Alternative Tabloids below.<br/></p>
            <p><a target="_blank" style="text-decoration: underline; font-weight: 500;" href="https://www.reddit.com/r/politics/wiki/whitelist">Our filtering criteris can be found here.</a></p>
        </div>
        `
        sidebarPanel.appendChild(sidebarPanelTopContent);
        for (var i = 0; i < relatedArticles.articles.length; i++) {
          var sidebarPanel = document.getElementsByClassName("newsextensionSidebarPanel")[0];
          var div = document.createElement("div");
          div.innerHTML = `
            <div class="article-container card-container">
            <a href="${relatedArticles.articles[i].url}" target="_blank">
                <div class="article-data-left">
                    <div class="source article-meta">
                        <p>From <span class="publication">${relatedArticles.articles[i].source.name}</span></p>
                    </div>
                    <div class="article-title">
                        <!-- Need to limit the number of characters in the headline -->
                        <p class="article-title-text">${relatedArticles.articles[i].title.substring(0,60)+"..."}</p>
                    </div>
                    <div class="article-date article-meta">
                        <p>${relatedArticles.articles[i].displayDate}</p>
                    </div>
                </div>
                <div class="article-image-right">
                    <img src="${relatedArticles.articles[i].urlToImage}" alt="">
                </div>
            </a>
            </div>`
          sidebarPanel.appendChild(div);
        }
    }
    var relatedArticles = httpGetAsync(apiurl, loopArticles);

    var style=document.createElement('style');
    style.type='text/css';
    if(style.styleSheet){
        style.styleSheet.cssText=`
    .news-extension-sidebar-panel-top-text {
        margin: 10px;
        font-weight: bold;
        text-align: center;
        padding: 5px 0;
    }
    .news-extension-sidebar-panel-top-text p {
       margin: 0.5em;
    }
    .wrapper {
        width: 400px;
        margin: auto;
        padding-top: 5px;
        background: #eee;
        height: 100vh;
    }
    .card-container {
        background-color: white;
        margin: 5px;
        border-radius: 5px;
        box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5);
        overflow: hidden;
    }
    .article-container {
        height: 120px;
    }
    .article-container p {
        margin: 0.2em;
    }
    .article-meta {
        font-size: 0.8em;
        opacity: 0.7;
    }
    .article-data-left {
        width: 65%;
        float: left;
        padding: 5px;
    }
    .article-title {
        font-weight: bold;
    }

    .article-image-right {
        width: 35%;
        height: 100%;
        float: left;
        overflow: hidden;
    }
    .article-image-right > img {
        height: 100%;
        object-fit: cover;
    }
    `;
    }else{
        style.appendChild(document.createTextNode(`
        .news-extension-sidebar-panel-top-text {
            margin: 10px;
            font-weight: bold;
            text-align: center;
            padding: 5px 0;
        }
        .news-extension-sidebar-panel-top-text p {
            margin: 0.5em;
        }
        .wrapper {
            width: 400px;
            margin: auto;
            padding-top: 5px;
            background: #eee;
            height: 100vh;
        }
        .card-container {
            background-color: white;
            margin: 5px;
            border-radius: 5px;
            box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5);
            overflow: hidden;
        }
        .article-container {
            height: 120px;
        }
        .article-container p {
            margin: 0.2em;
        }
        .article-meta {
            font-size: 0.8em;
            opacity: 0.7;
        }
        .article-data-left {
            width: 65%;
            float: left;
            padding: 5px;
        }
        .article-title {
            font-weight: bold;
        }

        .article-image-right {
            width: 35%;
            height: 100%;
            float: left;
            overflow: hidden;
        }
        .article-image-right > img {
            height: 100%;
            object-fit: cover;
        }
        `));
    }
    document.getElementsByTagName('head')[0].appendChild(style);
    // end



});


