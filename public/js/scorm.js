function generarIndex() {
    var numeroDeIframes = document.querySelectorAll("iframe").length;
    var contenido = "var pageArray = new Array(" + numeroDeIframes + ");";

    for (var i = 1; i <= numeroDeIframes; i++) {
        var iframeId = "Curso/"+"myHiddenField" + i + ".html";
        contenido += "\npageArray[" + (i - 1) + '] = "' + iframeId + '";';
    }
    var textos = `
    <!DOCTYPE html>

    <head>
    <title>Course Launch Page</title>
    
    
    
    <script type="text/javascript">
    function setIframeHeight(id, navWidth) {
    if ( document.getElementById ) {
        var theIframe = document.getElementById(id);
        if (theIframe) {
            var height = getWindowHeight();
            theIframe.style.height = Math.round( height ) - navWidth + "px";
            theIframe.style.marginTop = Math.round( ((height - navWidth) - parseInt(theIframe.style.height) )/2 ) + "px";
        }
    }
    }
    
    function getWindowHeight() {
    var height = 0;
    if (window.innerHeight){
        height = window.innerHeight - 18;
    }
    else if (document.documentElement && document.documentElement.clientHeight){
        height = document.documentElement.clientHeight;
    }
    else if (document.body && document.body.clientHeight) {
        height = document.body.clientHeight;
    }
    return height;
    }
    
    function SetupIFrame(){
    var navWidth = 40;
    setIframeHeight("contentFrame", navWidth);
    window.setTimeout('window.onresize = function() { setIframeHeight("contentFrame", ' + navWidth + '); }', 1000);
    }
`;

var faltante = `

var currentPage = 0; 
var startTimeStamp = null;
var processedUnload = false;
var reachedEnd = false;

function doStart(){
    SetupIFrame();
    goToPage();
}

function goToPage(){

    var theIframe = document.getElementById("contentFrame");
    var prevButton = document.getElementById("butPrevious");
    var nextButton = document.getElementById("butNext");
    theIframe.src = "../" + pageArray[currentPage];
    if (currentPage == 0){
        nextButton.disabled = false;
        prevButton.disabled = true;
    }
    else if (currentPage == (pageArray.length - 1)){
        nextButton.disabled = true;
        prevButton.disabled = false;       
    }
    else{
        nextButton.disabled = false;
        prevButton.disabled = false;
    }
    
}

function doPrevious(){
    if (currentPage > 0){
        currentPage--;
    }
    goToPage();
}

function doNext(){
    if (currentPage < (pageArray.length - 1)){
        currentPage++;
    }
    goToPage();
}

</script>

</head>
<body onload="doStart(false);">

<iframe width="100%" id="contentFrame" src=""></iframe>

<div id="navDiv">
    <input type="button" value="<- Anterior" id="butPrevious" onclick="doPrevious();"/>
    <input type="button" value="Siguiente ->" id="butNext" onclick="doNext();"/>
</div>

</body>
</html>





`;

    return  textos+contenido+faltante;
}
function generarXml(srcList) {
    var contenido =` `;
    srcList.forEach(element => {
        var img = ` '<file href="` +element+` " />\n ' + ` 
        contenido += img;
    });
    return `
<?xml version="1.0" encoding="UTF-8"?>\n' +
'<manifest xmlns="http://www.imsglobal.org/xsd/imscp_v1p1" xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_v1p3"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" identifier="MANIFEST-01" version="1"
xsi:schemaLocation="http://www.imsglobal.org/xsd/imscp_v1p1 http://www.imsglobal.org/xsd/imsccv1p2/imsmanifest_v1p2.xsd http://www.adlnet.org/xsd/adlcp_v1p3 http://www.imsglobal.org/xsd/imsccv1p2/imsmanifest_v1p2.xsd">
\n' +
' <metadata>\n' +
' <schema>IMS Content</schema>\n' +
' <schemaversion>1.2.0</schemaversion>\n' +
' </metadata>\n' +
' <organizations default="ORG-01">\n' +
' <organization identifier="ORG-01">\n' +
' <title>Organization 1</title>\n' +
' <item identifier="ITEM-01" identifierref="RESOURCE-01">\n' +
' <title>Item 1</title>\n' +
' </item>\n' +
' </organization>\n' +
' </organizations>\n' +
' <resources>\n' +
' <resource identifier="RESOURCE-01" type="webcontent" adlcp:scormType="sco" href="index.html">\n' +
'
<file href="index.html" />\n' +
'
</resource>\n' +
' <resource identifier="imagen" type="webcontent" adlcp:scormType="asset">\n' +
'
<file href="img/alfil.jpg" />\n' + `+contenido+`
'
</resource>\n' +
' </resources>\n' +
'</manifest>`;
}
