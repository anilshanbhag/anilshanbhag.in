/**
 * Globals :-
 * langs, currentFile
 */

var currentFile = "default";

var langs =
[['Afrikaans',       ['af-ZA']],
 ['Bahasa Indonesia',['id-ID']],
 ['Bahasa Melayu',   ['ms-MY']],
 ['Català',          ['ca-ES']],
 ['Čeština',         ['cs-CZ']],
 ['Deutsch',         ['de-DE']],
 ['English',         ['en-AU', 'Australia'],
                     ['en-CA', 'Canada'],
                     ['en-IN', 'India'],
                     ['en-NZ', 'New Zealand'],
                     ['en-ZA', 'South Africa'],
                     ['en-GB', 'United Kingdom'],
                     ['en-US', 'United States']],
 ['Español',         ['es-AR', 'Argentina'],
                     ['es-BO', 'Bolivia'],
                     ['es-CL', 'Chile'],
                     ['es-CO', 'Colombia'],
                     ['es-CR', 'Costa Rica'],
                     ['es-EC', 'Ecuador'],
                     ['es-SV', 'El Salvador'],
                     ['es-ES', 'España'],
                     ['es-US', 'Estados Unidos'],
                     ['es-GT', 'Guatemala'],
                     ['es-HN', 'Honduras'],
                     ['es-MX', 'México'],
                     ['es-NI', 'Nicaragua'],
                     ['es-PA', 'Panamá'],
                     ['es-PY', 'Paraguay'],
                     ['es-PE', 'Perú'],
                     ['es-PR', 'Puerto Rico'],
                     ['es-DO', 'República Dominicana'],
                     ['es-UY', 'Uruguay'],
                     ['es-VE', 'Venezuela']],
 ['Euskara',         ['eu-ES']],
 ['Français',        ['fr-FR']],
 ['Galego',          ['gl-ES']],
 ['Hrvatski',        ['hr_HR']],
 ['IsiZulu',         ['zu-ZA']],
 ['Íslenska',        ['is-IS']],
 ['Italiano',        ['it-IT', 'Italia'],
                     ['it-CH', 'Svizzera']],
 ['Magyar',          ['hu-HU']],
 ['Nederlands',      ['nl-NL']],
 ['Norsk bokmål',    ['nb-NO']],
 ['Polski',          ['pl-PL']],
 ['Português',       ['pt-BR', 'Brasil'],
                     ['pt-PT', 'Portugal']],
 ['Română',          ['ro-RO']],
 ['Slovenčina',      ['sk-SK']],
 ['Suomi',           ['fi-FI']],
 ['Svenska',         ['sv-SE']],
 ['Türkçe',          ['tr-TR']],
 ['български',       ['bg-BG']],
 ['Pусский',         ['ru-RU']],
 ['Српски',          ['sr-RS']],
 ['한국어',            ['ko-KR']],
 ['中文',             ['cmn-Hans-CN', '普通话 (中国大陆)'],
                     ['cmn-Hans-HK', '普通话 (香港)'],
                     ['cmn-Hant-TW', '中文 (台灣)'],
                     ['yue-Hant-HK', '粵語 (香港)']],
 ['日本語',           ['ja-JP']],
 ['Lingua latīna',   ['la']]];

/**
 * Get all entries in localStorage
 */
/*
function getEntries() {
  if(!localStorage['fileEntries']) { 
    var entries = {};
    entries['default'] = "";
    localStorage['fileEntries'] = JSON.stringify(entries);
    return entries;
  }

  return JSON.parse(localStorage['fileEntries']);
}
*/

/**
 * Updates the dropdown on change of country
 */
function updateCountry(select_language, select_dialect) {
  for (var i = select_dialect.options.length - 1; i >= 0; i--) {
    select_dialect.remove(i);
  }
  
  var list = langs[select_language.selectedIndex];
  for (var i = 1; i < list.length; i++) {
    select_dialect.options.add(new Option(list[i][1], list[i][0]));
  }
  
  select_dialect.style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
  localStorage['country'] = select_language.selectedIndex;
}

/**
 * Updates the dropdown on change of language
 */
function updateLanguage(select_language, select_dialect) {
  var list = langs[select_language.selectedIndex];
  select_dialect.style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
  localStorage['dialect'] = select_dialect.selectedIndex;  
  document.getElementById('voiceBtn').setAttribute('lang', list[select_dialect.selectedIndex + 1][0]);
}

function createFileCallback(data)
{
  if (data.type == "error") {
    $('#createError').css('display', 'block');
    $('#createError').html('Filename already exists!');
    return;
  }

  var currentFileContents = document.getElementById('editor').innerHTML;
  if (currentFile == "default") 
  {
    localStorage['default'] = currentFileContents;
  }
  else 
  {
    $.post( "/notes/post/", { filename : currentFile , content : currentFileContents }, function(data) {}, "json");
  }

  $('#editor').html("");
  currentFile = data.filename;
  $('#noteTitle').html(data.filename + ' note');
  $('#createFileModal').modal('hide');
}

function createFile() {
  var filename = document.querySelector('#fileName').value;

  if (!filename) {
    $('#createError').css('display', 'block');
    $('#createError').html('Filename empty!');
    return;
  }

  if (filename == "default") {
    $('#createError').css('display', 'block');
    $('#createError').html('File named default already exists!');
    return;
  }

  $.post( "/notes/put/", { filename : filename }, createFileCallback, "json");  
}

function loadFile(fileName, content)
{
  console.log(fileName);
  console.log(content);
  var currentFileContents = document.getElementById('editor').innerHTML;
  if (currentFile == "default") 
  {
    localStorage['default'] = currentFileContents;
  }
  else 
  {
    $.post( "/notes/post/", { filename : currentFile , content : currentFileContents }, function(data) {}, "json");  
  }

  document.getElementById('editor').innerHTML = content;

  currentFile = fileName;
  $('#noteTitle').html(fileName + ' note');
  $('#loadingModal').modal('hide');
}

function openFileCallback(data) 
{
  console.log(data);
  loadFile(data.filename, data.content);
}

function openFile(fileName)
{
  $('#openFileModal').modal('hide');
  $('#loadingModal').modal('show'); 
  if (fileName == "default") 
  {
    loadFile("default", localStorage['default']);
  }
  else 
  {
    $.post( "/notes/get/", { filename : fileName }, openFileCallback, "json");      
  }
}

function saveFileCallback(data) 
{

}

function saveFile()
{
  var currentFileContents = document.getElementById('editor').innerHTML;
  if (currentFile == "default") 
  {
    localStorage['default'] = currentFileContents;
  }
  else 
  {
    $.post( "/notes/post/", { filename : currentFile , content : saveFileCallback }, function(data) {}, "json");        
  }
}

function openFileModalCallback(data) 
{
  // Make Header
  var row = document.createElement('tr');
  var fileNameColumn = document.createElement('th');
  fileNameColumn.innerHTML = "Note Name";
  row.appendChild(fileNameColumn);
  fileTable.appendChild(row);

  var entries = data.data;

  // Add entry per row
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    if (entry) {
      row = document.createElement('tr');
      row.className = "rowSelectable";
      row.id = entry;
      
      fileNameColumn = document.createElement('td');
      fileNameColumn.innerHTML = entry;
      
      row.appendChild(fileNameColumn);
      row.addEventListener('click', function(){ openFile(this.id); }, false);
      
      fileTable.appendChild(row);
    }
  }
}

function openFileModal() {
  var fileTable = document.getElementById('fileTable');
  fileTable.innerHTML = "";

  $.get( "/notes/get/", openFileModalCallback, "json");
}

function initToolbarBootstrapBindings() {
  var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier', 
        'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
        'Times New Roman', 'Verdana'],
        fontTarget = $('[title=Font]').siblings('.dropdown-menu');
  $.each(fonts, function (idx, fontName) {
      fontTarget.append($('<li><a data-edit="fontName ' + fontName +'" style="font-family:\''+ fontName +'\'">'+fontName + '</a></li>'));
  });
  $('a[title]').tooltip({container:'body'});
  $('.dropdown-menu input').click(function() {return false;})
    .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
    .keydown('esc', function () {this.value='';$(this).change();});

  $('[data-role=magic-overlay]').each(function () { 
    var overlay = $(this), target = $(overlay.data('target')); 
    overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
  });
}

