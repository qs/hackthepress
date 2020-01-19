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

    $('.newsextensionSidebarPanel').css({'z-index': '999999', 'width':'300px', 'float':'left', 'height':'100%', 'background':'white', 'position':'absolute', 'left':'-300px'})
    $('.news-extension-sidebar-panel-slider-arrow').css({'z-index': '999999', 'padding':'4px 4px 4px 17px', 'width':'50px', 'height':'50px', 'border-radius': '25px', 'margin': '5px', 'float':'left', 'background':'black','font':'400 32px Arial, Helvetica, sans-serif', 'color':'white','text-decoration':'none', 'position':'absolute'})
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
        console.log(relatedArticles);
        for (var i = 0; i < relatedArticles.articles.length; i++) {
          var sidebarPanel = document.getElementsByClassName("newsextensionSidebarPanel")[0];
          var div = document.createElement("div");
          div.innerHTML = `
            <div class="article-container">
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


        // var tempDiv.innerHTML = `
        //     <div class="article-container">
        //         <div class="article-data-left">
        //             <div class="source article-meta">
        //                 <p>From <span class="publication">Independent</span></p>
        //             </div>
        //             <div class="article-title">
        //                 <!-- Need to limit the number of characters in the headline -->
        //                 <p class="article-title-text">Labour leadership: Jess Phillips and Rebecca Long Bailey clash</p>
        //             </div>
        //             <div class="article-date article-meta">
        //                 <p>3 hours ago //TODO</p>
        //             </div>
        //         </div>
        //         <div class="article-image-right">
        //             <img src="//www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F10d4cdca-3a1b-11ea-9741-875f0512cf29.jpg?crop=2667%2C1500%2C0%2C0&resize=320 320w, //www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F10d4cdca-3a1b-11ea-9741-875f0512cf29.jpg?crop=2667%2C1500%2C0%2C0&resize=685 685w, //www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F10d4cdca-3a1b-11ea-9741-875f0512cf29.jpg?crop=2667%2C1500%2C0%2C0&resize=1200 1200w, //www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F10d4cdca-3a1b-11ea-9741-875f0512cf29.jpg?crop=2667%2C1500%2C0%2C0&resize=2400 2400w" alt="">
        //         </div>
        //     </div>`
        // var sidebarPanel = document.getElementsByClassName("newsextensionSidebarPanel")[0];
        // sidebarPanel.appendChild(tempDiv);


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
        height: 120px;
        background-color: white;
        margin: 5px;
        border-radius: 5px;
        box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5);
        font-family: "Merriweather Sans", sans-serif;
        overflow: hidden;
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
        .wrapper {
            width: 400px;
            margin: auto;
            padding-top: 5px;
            background: #eee;
            height: 100vh;
        }
        .article-container {
            height: 120px;
            background-color: white;
            margin: 5px;
            border-radius: 5px;
            box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5);
            font-family: "Merriweather Sans", sans-serif;
            overflow: hidden;
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


