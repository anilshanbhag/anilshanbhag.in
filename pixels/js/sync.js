/**
 * Get all entries in localStorage
 */

function updateLocal(data) 
{
	console.log(data);
	document.getElementById("sync-status").innerHTML("Sync Completed :)");
}

function getVersion() {
	var version = localStorage["version"];
	if (!version) 
	{
		localStorage["version"] = 0;
		version = "0";
	}

	$.ajax({
		type: "POST",
		url: "/version/get/",
		data: version,
		success: updateLocal,
		dataType: "json"
	});
}

function syncHandler(data) {
	console.log(data); 
	$('#sync').modal('hide');
	if (data.type == "success") 
	{
		document.getElementById('alters').innerHTML = "<div class=\"alert alert-success\"> <button type=\"button\" class=\"close\" data-dismiss=\"alert\">×</button> <strong>Oh snap!</strong> Change a few things up and try submitting again. </div>";		
	}
	else if (data.type == "error")
	{
		document.getElementById('alters').innerHTML = "<div class=\"alert alert-error\"> <button type=\"button\" class=\"close\" data-dismiss=\"alert\">×</button> <strong>Oh snap!</strong> Change a few things up and try submitting again. </div>";
	}
}

function syncEntries() {
	if(!localStorage['fileEntries']) { 
		var entries = {};
		entries['default'] = "";
		localStorage['fileEntries'] = JSON.stringify(entries);
	}

	var jsonData = localStorage["fileEntries"];
	$.post( "/sync/", { notes : localStorage["fileEntries"] }, syncHandler, "json");
}

