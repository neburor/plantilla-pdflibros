$(document).ready(function(){
target = window.location.hash;
    if(target) {
  $('html, body').animate({scrollTop: $(target).offset().top - 50}, 900);
  }
 
//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".top-nav").offset().top > 100) {
        $(".top-nav").addClass("top-nav-collapse");
        $(".top-nav .navbar-brand").addClass("logo-collapse");
        $(".scrollspy-nav").addClass("scrollspy-collapse");
    } else {
        $(".top-nav").removeClass("top-nav-collapse");
        $(".top-nav .navbar-brand").removeClass("logo-collapse");
        $(".scrollspy-nav").removeClass("scrollspy-collapse");
    }
});
// append  back to top link top body
$("body").append("<p id='back-top'><a href=''><span id='button'>top</span></a></p>");
$("#back-top").hide();
$(function () {
$(window).scroll(function () {
if ($(this).scrollTop() > 100) {
$('#back-top').fadeIn();
} else {
$('#back-top').fadeOut();
}
});

// scroll body to 0px on click
$('#back-top a, #back-to-top').click(function () {
$('body,html').stop().animate({
scrollTop: 0
}, 800);
return false;
});

});
// scroll animate
$('a[href^="#"].animatescroll').on('click',function (e) {
        e.preventDefault();
        var target = this.hash,
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 50
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
//Modals
$('.tomodal').on("click", function(){
    var path = $(this).attr("path");
    $("#modal1 div.modal-content").load("js/modals.php?url="+path, function() {
    $('#modal1').modal('show');
    var formularios = $('#modal1').find('.form');
    var likes = $('#modal1').find('.btn-like');
    var opciones = $('#modal1').find('input[name="opciones"]');
    var stars = $('#modal1').find('.stars');

    $(likes).likes();
    $(opciones).opciones();
    $(stars).stars();
    $(formularios).formularios();
    });
    event.preventDefault();
});

//PopShares
$('.popshare').on("click", function(){
    window.open($(this).attr('href'), 'Compartir',
'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); 
    return false;
});


$('[data-toggle="offcanvas"]').click(function () {
    $('.row-offcanvas').toggleClass('active');
  });
$('.btn-offcanvas').click(function () {
    $('.row-offcanvas').toggleClass('active');
  });
$('.form').formularios();
$('.btn-like').likes();
$('.stars').stars();
$('.linkreport').linkreport();
});