import $ from 'jquery';
import 'what-input';

// Foundation JS relies on a global variable. In ES6, all imports are hoisted
// to the top of the file so if we used `import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';



$(document).foundation();

$(function(){
    $('.hero-slider').slick({
        dots: false,
        infinite: true,
        speed: 3000,
        autoplay: true,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="far fa-angle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="far fa-angle-right"></i></button>'
      });

      $('.t-panel-slider').slick({
        infinite: true,
        dots: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        speed: 3000,
        autoplay: false,
        arrows: true,
        prevArrow: '<button type="button" class="prev"><i class="fas fa-chevron-square-left"></i></button>',
        nextArrow: '<button type="button" class="next"><i class="fas fa-chevron-square-right"></i></button>',
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          },
        ]
      });

      $('.product-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.product-sider-nav'
      });
      $('.product-sider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.product-slider',
        dots: true,
        centerMode: true,
        focusOnSelect: true
      });

      $('#related-slider').slick({
        infinite: true,
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 2,
        speed: 3000,
        autoplay: false,
        arrows: true,
        centerPadding: 30,
        prevArrow: '<button type="button" class="prev"><i class="fas fa-chevron-square-left"></i></button>',
        nextArrow: '<button type="button" class="next"><i class="fas fa-chevron-square-right"></i></button>',
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          },
        ]
      });
});

$(function(){
  $(window).on("load",function(){
    $(document).scrollzipInit();
    $(document).rollerInit();
  });
  $(window).on("load scroll resize", function(){
      $('.numscroller').scrollzip({
          showFunction    :   function() {
                                  numberRoller($(this).attr('data-slno'));
                              },
          wholeVisible    :     false,
      });
  });
  $.fn.scrollzipInit=function(){
      $('body').prepend("<div style='position:fixed;top:0px;left:0px;width:0;height:0;' id='scrollzipPoint'></div>" );
  };
  $.fn.rollerInit=function(){
      var i=0;
      $('.numscroller').each(function() {
          i++;
        $(this).attr('data-slno',i); 
        $(this).addClass("roller-title-number-"+i);
      });        
  };
  $.fn.scrollzip = function(options){
      var settings = $.extend({
          showFunction    : null,
          hideFunction    : null,
          showShift       : 0,
          wholeVisible    : false,
          hideShift       : 0,
      }, options);
      return this.each(function(i,obj){
          $(this).addClass('scrollzip');
          if ( $.isFunction( settings.showFunction ) ){
              if(
                  !$(this).hasClass('isShown')&&
                  ($(window).outerHeight()+$('#scrollzipPoint').offset().top-settings.showShift)>($(this).offset().top+((settings.wholeVisible)?$(this).outerHeight():0))&&
                  ($('#scrollzipPoint').offset().top+((settings.wholeVisible)?$(this).outerHeight():0))<($(this).outerHeight()+$(this).offset().top-settings.showShift)
              ){
                  $(this).addClass('isShown');
                  settings.showFunction.call( this );
              }
          }
          if ( $.isFunction( settings.hideFunction ) ){
              if(
                  $(this).hasClass('isShown')&&
                  (($(window).outerHeight()+$('#scrollzipPoint').offset().top-settings.hideShift)<($(this).offset().top+((settings.wholeVisible)?$(this).outerHeight():0))||
                  ($('#scrollzipPoint').offset().top+((settings.wholeVisible)?$(this).outerHeight():0))>($(this).outerHeight()+$(this).offset().top-settings.hideShift))
              ){
                  $(this).removeClass('isShown');
                  settings.hideFunction.call( this );
              }
          }
          return this;
      });
  };
  function numberRoller(slno){
          var min=$('.roller-title-number-'+slno).attr('data-min');
          var max=$('.roller-title-number-'+slno).attr('data-max');
          var timediff=$('.roller-title-number-'+slno).attr('data-delay');
          var increment=$('.roller-title-number-'+slno).attr('data-increment');
          var numdiff=max-min;
          var timeout=(timediff*1000)/numdiff;
          //if(numinc<10){
              //increment=Math.floor((timediff*1000)/10);
          //}//alert(increment);
          numberRoll(slno,min,max,increment,timeout);
          
  }
  function numberRoll(slno,min,max,increment,timeout){//alert(slno+"="+min+"="+max+"="+increment+"="+timeout);
      if(min<=max){
          $('.roller-title-number-'+slno).html(min);
          min=parseInt(min)+parseInt(increment);
          setTimeout(function(){numberRoll(eval(slno),eval(min),eval(max),eval(increment),eval(timeout))},timeout);
      }else{
          $('.roller-title-number-'+slno).html(max);
      }
  }
});
