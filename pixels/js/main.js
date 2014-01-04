function voiceButtonPlacement(){
  var editorOffset = $('#editor').offset();
  var offsetTop = editorOffset.top ;
  var offsetLeft = editorOffset.left + $('#editor').innerWidth() - 60;
  $('#voiceBtn').css('position','absolute').offset({top: offsetTop, left: offsetLeft});
}

window.onresize = function(e){
  voiceButtonPlacement();
}
voiceButtonPlacement();

/* CSRF Hack */
$.ajaxSetup({ 
  beforeSend: function(xhr, settings) {
     function getCookie(name) {
         var cookieValue = null;
         if (document.cookie && document.cookie != '') {
             var cookies = document.cookie.split(';');
             for (var i = 0; i < cookies.length; i++) {
                 var cookie = jQuery.trim(cookies[i]);
                 // Does this cookie string begin with the name we want?
             if (cookie.substring(0, name.length + 1) == (name + '=')) {
                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                 break;
             }
         }
     }
     return cookieValue;
     }
     
     if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
         // Only send the token to relative URLs i.e. locally.
         xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
     }
  } 
});

window.onload = function() 
{
  /* EDITOR */
  var selectDialect  = document.getElementById('select_dialect'),
      selectLanguage = document.getElementById('select_language');

  selectLanguage.addEventListener('change', function() { updateCountry(selectLanguage, selectDialect); }, false);
  selectDialect.addEventListener('change', function() { updateLanguage(selectLanguage, selectDialect); }, false);
  selectLanguage.addEventListener('change', function() { updateLanguage(selectLanguage, selectDialect); }, false);

  for (var i = 0; i < langs.length; i++) {
    selectLanguage.options[i] = new Option(langs[i][0], i);
  }

  select_language.selectedIndex = localStorage['country'] || 6;
  select_dialect.selectedIndex = localStorage['dialect'] || 6;
  updateCountry(selectLanguage, selectDialect);
  updateLanguage(selectLanguage, selectDialect);

  if (document.getElementById('fileCreate')) 
  {
    document.getElementById('fileCreate').addEventListener('click', function() { createFile(); }, false);  
  }

  if (document.getElementById('openFile')) 
  {
    document.getElementById('openFile').addEventListener('click', function() { openFileModal(); }, false);
  }

  document.querySelector('#saveFile').addEventListener('click', function() { saveFile(); }, false);
  document.addEventListener("keydown", function(e) {
    // CTRL S
    if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
      e.preventDefault();
      saveFile(); 
    }  // CTRL M
    else if (e.keyCode == 77 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
      e.preventDefault();
      if (document.getElementById('fileCreate')) $('#createFileModal').modal('show');
    }  // CTRL O
    else if (e.keyCode == 79 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
      e.preventDefault();
      if (document.getElementById('openFile')) {
        openFileModal();
        $('#openFileModal').modal('show');
      }
    }
  }, false);

  initToolbarBootstrapBindings();
  $('#editor').wysiwyg();
  $('#editor').html(localStorage['default']);
  window.prettyPrint && prettyPrint();
}