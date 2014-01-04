var currentx = 400;
var currenty = 300;
var ltArrow = 37;
var upArrow = 38;
var rtArrow = 39;
var dwArrow = 40;
var size = 20;

function keyHit(evt) {
	var oCanvas = document.getElementById('oCanvas');
	var oCtx = oCanvas.getContext('2d');
	var thisKey;
	if (evt) {
		thisKey = evt.which;
	}
	else {
		thisKey = window.event.keyCode;
	}
	switch(thisKey){
		case ltArrow:
			currentx -= size;
			if(currentx<0){currentx = 0;}
			oCtx.fillRect(currentx, currenty, size, size);
			break;
		case rtArrow:
			currentx += size;
			if(currentx>800-size){currentx = 800-size;}
			oCtx.fillRect(currentx, currenty, size, size);
			break;
		case upArrow:
			currenty -= size;
			if(currenty<0){currenty = 0;}
			oCtx.fillRect(currentx, currenty, size, size);
			break;
		case dwArrow:
			currenty += size;
			if(currenty>800-size){currenty=800-size;}
			oCtx.fillRect(currentx, currenty, size, size);
			break;
		default:
			break;
	}
return False;
}

function resetSize(){
	var newLoc = document.getElementById("size");
	newLoc.blur();
	var newSize = newLoc.options[newLoc.selectedIndex].value;
	size = parseInt(newSize);
}

function makeEqual(){
	var oCanvas = document.getElementById('oCanvas');
	var oCtx = oCanvas.getContext('2d');
	oCtx.fillStyle = document.getElementsByClassName("colorpicker_new_color")[0].style.backgroundColor;
	setTimeout("makeEqual()",500);
}
	
window.onload = init;

function init(){
	var oCanvas = document.getElementById('oCanvas');
	var iWidth = oCanvas.width;
	var iHeight = oCanvas.height;
	var oCtx = oCanvas.getContext('2d');
	var iWidth = oCanvas.width;
	var iHeight = oCanvas.height;
	oCtx.fillStyle = "rgb(0,0,255)";
	oCtx.fillRect(currentx,currenty, 20, 20);
	document.onkeydown = keyHit;
	document.getElementById("size").selectedIndex = 1;
	document.getElementById("size").onchange = resetSize;
	makeEqual();
	function showDownloadText() {
		document.getElementById("buttoncontainer").style.display = "none";
		document.getElementById("textdownload").style.display = "block";
	}

	function hideDownloadText() {
		document.getElementById("buttoncontainer").style.display = "block";
		document.getElementById("textdownload").style.display = "none";
	}

	function convertCanvas(strType) {
		if (strType == "PNG")
			var oImg = Canvas2Image.saveAsPNG(oCanvas, true);
		if (strType == "BMP")
			var oImg = Canvas2Image.saveAsBMP(oCanvas, true);
		if (strType == "JPEG")
			var oImg = Canvas2Image.saveAsJPEG(oCanvas, true);

		if (!oImg) {
			alert("Sorry, this browser is not capable of saving " + strType + " files!");
			return false;
		}

		oImg.id = "canvasimage";

		oImg.style.border = oCanvas.style.border;
		oCanvas.parentNode.replaceChild(oImg, oCanvas);

		showDownloadText();
	}

	function saveCanvas(pCanvas, strType) {
		var bRes = false;
		if (strType == "PNG")
			bRes = Canvas2Image.saveAsPNG(oCanvas);
		if (!bRes) {
			alert("Sorry, this browser is not capable of saving " + strType + " files!");
			return false;
		}
	}
	document.getElementById("convertpngbtn").onclick = function() {convertCanvas("PNG");}
	document.getElementById("resetbtn").onclick = function() {var oImg = document.getElementById("canvasimage");oImg.parentNode.replaceChild(oCanvas, oImg);
		hideDownloadText();makeEqual();	}
	}
	
