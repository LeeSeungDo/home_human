// 회원가입 //

$("#joinBtn").click(function(event) {
	
	var member = {
	  email: $("#email").val(),
	  name: $("#name").val(),
	  password: $("#password").val(),
	  tel: $("#tel").val(),
	  gender: $("#gender").is(":checked") ? 0 : 1,
	  birth: $("#birth1").val() + '-' + $("#birth2").val() + '-' + $("#birth3").val(),
	  auth: $("#auth").is(":checked") ? 0 : 1
	}
	
<<<<<<< HEAD
	console.log(member);
=======
	//console.log(member);
>>>>>>> branch 'master' of https://github.com/tessajun/hh.git
	ajaxAddMember(member)
});

function ajaxAddMember(member) {
	$.post(serverAddr + "/Member/add.json", member, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
	    	 alert("회원 가입 실패입니다.")
	    	 return location.href = location.href;
	    } 
	    window.location.href = serverAddr + "/html/index.html"
	}, "json")
}

//radio
;(function ($) {
  'use strict';
  var instance = 0;
  var beenDisabled = 0;

  var RadioButtons = function (el, opts) {
    var element = $(el).is('[type=radio]') ? $(el) : $(el).find('[type=radio]');
    var alreadyCalled = element.parent().is('label');
    var customClass = opts.customClass ? ' ' + opts.customClass : '';
    var disabled = opts.disabled;
    var textSource = opts.text;
    var destroy = opts.destroy;
    var text = function(el) {
      var textValue = $(el).attr(textSource);

      if (textSource == 'empty') return '';
      else if (!textValue) return 'No text source';
      else if (textSource) return textValue;
    };
    var clicкEvents = function(labels, thisLabel) {
      labels.parent().removeClass('selected');
      $(thisLabel).addClass('selected');
    };
    var destroyPlugin = function(element) {
      if (element.parent().is('label')) {
        element
          .removeAttr('style')
          .parent()
            .off('touchstart.customradio click.customradio')
            .find('span').remove();
        element.unwrap();
      }
    };

    // Hide input radio
    if (destroy) {
      destroyPlugin(element);
      return;
    } else {
      element.css({'position':'absolute', 'top':'0', 'left':'0', 'margin':'0', 'z-index':'-1', 'opacity':'0'});
    }
    // We only need to do this only once
    if (!alreadyCalled) {
      element
        .wrap('<label/>')
        .parent()
          .append('<span>')
          .on('touchstart.customradio click.customradio', function() {
            clicкEvents(element, this);
          })
    }

    // Flexible changes if "customRadio" is called more than once
    element.each(function() {
      var object_number = ++instance;

      $(this)
        .parent()
          .removeAttr('class')
          .addClass('radio_btn radio_' + object_number + customClass)
          .find('span').text(text(this));
    });

    // If we want to disable radio buttons
    if (disabled) {
      beenDisabled++;

      element
        .attr('disabled', true)
          .parent()
            .addClass('disabled')
            .css({'cursor':'not-allowed'})
            .off('touchstart.customradio click.customradio');
    } else {
      element
        .attr('disabled', false)
          .parent()
            .removeClass('disabled')
            .css({'cursor':'pointer'});
    }

    // Return click events if we re-enable buttons
    if (alreadyCalled && beenDisabled != 0) {
      element
        .parent()
          .on('touchstart.customradio click.customradio', function() {
            clicкEvents(element, this);
          });
    }
  };

  $.fn.customRadio = function (options, callback) {
    var opts = $.extend({}, $.fn.customRadio.defaults, options, callback);

    return this.each(function () {
      new RadioButtons($(this), opts);
    });
  }
  $.fn.customRadio.defaults = { text: 'value', customClass: '', disabled: false, destroy: false };

  $('div[data-radio-custom]').customRadio();

})(jQuery);

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-36251023-1']);
  _gaq.push(['_setDomainName', 'jqueryscript.net']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

