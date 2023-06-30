$(function(){
  hideAll();
  // start listening for events on things we care about
  $(".services li a").on("click",serviceSelected);
  $("#blurbMore").on("click",moreSelected);
  $('.header-menu-link').on("click", headerMenuItemClick);
  $('#all>ul>li>a').on("click", playMovieItem);
  $('#movieClose').on('click',closeMovieOverlay);
  // generate a click for what we want our default view to be
  $('.services li a[data-name="weddings"]').trigger('click');
});

hideAll = function() {
  $("#blurbDiv").hide();
  $("#moreDiv").hide();
  $("#all").hide();
  $('div[id^="menuPage"]').hide();
  $('#overlay').hide();
  $('#movieContainerDiv').hide();
  $('#movieContainerDiv *').hide();
  // stop any playing movies
  $('#youtube').attr('src','#');
  $('#vimeo').attr('src','#');
  $('#video-player').attr('src', "#");

}

// Change background and load blurbDiv data into the #blurb-short div
serviceSelected = function(event) {
  hideAll();
  var name       = event.currentTarget.getAttribute("data-name");
  var iurl       = event.currentTarget.getAttribute("data-img-url");
  var btitle     = event.currentTarget.getAttribute("data-blurb-title");
  var bshort     = event.currentTarget.getAttribute("data-blurb-short");
  var vimeoID    = event.currentTarget.getAttribute("data-blurb-more-vimeo-id");
  var youtubeID  = event.currentTarget.getAttribute("data-blurb-more-youtube-id");
  var customHtml = event.currentTarget.getAttribute("data-blurb-custom-html");

  // global intentionally for moreSelected() call
  moreText  = event.currentTarget.getAttribute("data-blurb-more");
  moreHtml = "";

  $('div[id^="menuPage"]').hide();
  $(".services a").removeClass("active-service");
  $(this).addClass('active-service');
  if(name === "all"){  // all clicked
    $("#blurbDiv").hide();
    $("#moreDiv").hide();
    $("body>.bg>img").attr("src",'#');
    $("#all").show();
  }else {              // service menu item clicked
    $("#moreDiv").hide();
    $("#all").hide();
    $("#blurbDiv").show();
    // set to src of img I can select
    $("body>.bg>img").attr("src",iurl);
    $("#blurbDiv>#blurbTitle").text(btitle);
    $("#blurbDiv>#blurbText").html(bshort);


    if(vimeoID) {
      var url = $('#vimeo iframe').data('src');
      $("#vimeo iframe").attr('src', url + vimeoID);
      moreHtml = $("#vimeo").html(); // set src on vimeo iframe & make it visible
    }else if(youtubeID){
      var url = $('#youtube iframe').data('src');
      $("#youtube iframe").attr('src', url + youtubeID);
      moreHtml = $("#youtube").html(); // set src on youtube iframe & make it visible
    }else if(customHtml){
      moreHtml = customHtml;
    }
  }
}

moreSelected = function() {
  $("#all").hide();
  $("#moreDiv").show();
  $("#moreDiv").html("<div class='moreText'>" + moreText + "</div>" + moreHtml);
}

headerMenuItemClick = function(event) {
  var menuPage = "menuPage" + event.currentTarget.getAttribute("name");
  $("#all").hide();
  $("#blurbDiv").hide();
  $("#moreDiv").hide();
  $('div[id^="menuPage"]').hide();
  $("body>.bg>img").attr("src","i/headerMenuBG.jpg");
  $("#"+menuPage).show();
}

// id = unique identifier , type = vimeo
playMovieItem = function(event){
  var id   = event.currentTarget.getAttribute("data-id");
  var type = event.currentTarget.getAttribute("data-type");

  console.log(id);
  console.log(type);
  movieHtml = '';
  if(type === 'vimeo'){
    movieHtml = "<iframe id='video-player' class='movie-iframe centered' src='https://player.vimeo.com/video/" + id + "' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
  }else if(type === 'youtube'){
    movieHtml = '<iframe id="video-player" class="movie-iframe centered" src="https://www.youtube.com/embed/'+ id +'" frameborder="0" allowfullscreen></iframe>';
  }

  console.log(movieHtml);
  $('#overlay').show();
  $('#movieDiv').html(movieHtml);
  $('#movieContainerDiv, #movieContainerDiv *').show();
  $('body').addClass('noscroll');
}

closeMovieOverlay = function(){
    $('#video-player').attr('src', "#");
    $('#overlay').hide();
    $('#movieContainerDiv').hide();
    $('body').removeClass('noscroll');
}
