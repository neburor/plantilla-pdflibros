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
    var stars = $('#modal1').find('.stars');

    $(likes).likes();
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
/*Procesar star rating*/
$.fn.stars = function(){
    //Mostrar el rating
   $(this).each(function() {
  id=$(this).attr('id-rating');
  content=$(this).attr('content');
  rating=$(this).attr('rating');
  $(this).rating('js/formularios.php', { maxvalue:5, curvalue:content, id:id, userRating:rating });
});
}
/*Procesar Me gusta*/
$.fn.likes = function (){
    //Enviar Me gusta, quiero leerlo, etc
$(this).on('click', function(){
    text=$(this).attr('like-text');
    id=$(this).attr('like-id');
    elemento=$(this).parents('div.input-group').first();
    showcontrol=$(elemento).find("span.input-group-addon");
    btncontrol=$(elemento).find("button.btn-pdfl").first();
    console.log(elemento);
    console.log(showcontrol);
    console.log(btncontrol);
     var formulario = new FormData();
    formulario.append("text", text);
    formulario.append("id", id);
    if (localStorage.getItem("token") === null) {} else {
        formulario.append("token", localStorage.getItem("token")); }
    if (localStorage.getItem("device") === null) {} else {
        formulario.append("device", localStorage.getItem("device")); }
         $.ajax({
           type: "POST",
           url: "../js/formularios.php",
           dataType: "json",
           data: formulario,// Adjuntar los campos del formulario enviado.
           cache: false,
           contentType: false,
           processData: false,
           success: function(data)
           {
                if(data.token!=undefined || data.device!=undefined){ addLS(data)}
                if(data.resultado=="correcto"){  
                    $(btncontrol).empty().html('<b>'+text+' !</b>');
                    $(showcontrol).empty().html('<i class="fa fa-check"></i>');// Si se envio correctamente.
                }
                if(data.resultado=="incorrecto"){
                    $(showcontrol).empty().html('<i class="fa fa-times"></i>');// Si no se pudo enviar.
                    $(btncontrol).empty().html('<i class="fa fa-warning"></i> Reintentar !').removeAttr("disabled");
                }
           },
           beforeSend: function() 
           {   
              $(showcontrol).empty().html('<i class="fa fa-cog fa-spin"></i>');// Mientras se envia.
              $(btncontrol).attr("disabled","disabled");
           },
            error: function()
           {    $(showcontrol).empty().html('<i class="fa fa-times"></i>');// Si no se pudo enviar.
                $(btncontrol).empty().html('<i class="fa fa-warning"></i> Reintentar !').removeAttr("disabled");
           }
         });
});
}
/*Procesar Link report*/
$.fn.linkreport = function (){
    //Enviar Me gusta, quiero leerlo, etc
$(this).on('click', function(){
    id=$(this).attr('id');
    elemento=$(this).parents('div.input-group').first();
    showcontrol=$(elemento).find("span.input-group-addon");
    btncontrol=$(elemento).find("button.btn-pdfl").first();
     var formulario = new FormData();
    formulario.append("id", id);
    formulario.append("tipo", "linkreport");
    if (localStorage.getItem("token") === null) {} else {
        formulario.append("token", localStorage.getItem("token")); }
    if (localStorage.getItem("device") === null) {} else {
        formulario.append("device", localStorage.getItem("device")); }
         $.ajax({
           type: "POST",
           url: "../js/formularios.php",
           dataType: "json",
           data: formulario,// Adjuntar los campos del formulario enviado.
           cache: false,
           contentType: false,
           processData: false,
           success: function(data)
           {
                if(data.token!=undefined || data.device!=undefined){ addLS(data)}
                if(data.resultado=="correcto"){  
                    $(btncontrol).empty().html('<i class="fa fa-check"></i>');
                }
                if(data.resultado=="incorrecto"){
                    $(btncontrol).empty().html('<i class="fa fa-times"></i>').removeAttr("disabled");
                }
           },
           beforeSend: function() 
           {   
              $(btncontrol).empty().html('<i class="fa fa-cog fa-spin"></i>').attr("disabled","disabled");
           },
            error: function()
           {   
                $(btncontrol).empty().html('<i class="fa fa-warning"></i>!').removeAttr("disabled");
           }
         });
});
}