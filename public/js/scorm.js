function generarIndex() {
    var numeroDeIframes = document.querySelectorAll("iframe").length;
    var contenido = "var pageArray = new Array(" + numeroDeIframes + ");";

    for (var i = 1; i <= numeroDeIframes; i++) {
        var iframeId = "myHiddenField" + i + ".html";
        contenido += "\npageArray[" + (i - 1) + '] = "' + iframeId + '";';
    }
    var textos = `
<!DOCTYPE html>

<head>
<title>Course Launch Page</title>
<script src="scormfunctions.js" type="text/javascript"></script>
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

var currentPage = null;
var startTimeStamp = null;
var processedUnload = false;
var reachedEnd = false;

function doStart(){
    SetupIFrame();
    startTimeStamp = new Date();
    ScormProcessInitialize();
    
    var completionStatus = ScormProcessGetValue("cmi.completion_status", true);
    if (completionStatus == "unknown"){
        ScormProcessSetValue("cmi.completion_status", "incomplete");
    }
    
    var bookmark = ScormProcessGetValue("cmi.location", false);
    if (bookmark == ""){
        currentPage = 0;
    }
    else{
        if (confirm("Would you like to resume from where you previously left off?")){
            currentPage = parseInt(bookmark, 10);
        }
        else{
            currentPage = 0;
        }
    }
    
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
    ScormProcessSetValue("cmi.location", currentPage);
    if (currentPage == (pageArray.length - 1)){
        reachedEnd = true;
        ScormProcessSetValue("cmi.completion_status", "completed");
    }
}

function doUnload(pressedExit){
    if (processedUnload == true){return;}
    
    processedUnload = true;
    var endTimeStamp = new Date();
    var totalMilliseconds = (endTimeStamp.getTime() - startTimeStamp.getTime());
    var scormTime = ConvertMilliSecondsIntoSCORM2004Time(totalMilliseconds);
    
    ScormProcessSetValue("cmi.session_time", scormTime);
    
    if (pressedExit == false && reachedEnd == false){
        ScormProcessSetValue("cmi.exit", "suspend");
    }
    
    ScormProcessTerminate();
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

function doExit(){
    
    if (reachedEnd == false && confirm("Would you like to save your progress to resume later?")){
        ScormProcessSetValue("cmi.exit", "suspend");
        ScormProcessSetValue("adl.nav.request", "suspendAll");
    }
    else{
        ScormProcessSetValue("cmi.exit", "");
        ScormProcessSetValue("adl.nav.request", "exitAll");
    }
    
    doUnload(true);
    
}

function RecordTest(score){
    ScormProcessSetValue("cmi.score.raw", score);
    ScormProcessSetValue("cmi.score.min", "0");
    ScormProcessSetValue("cmi.score.max", "100");
    
    var scaledScore = score / 100;
    ScormProcessSetValue("cmi.score.scaled", scaledScore);
    if (score >= 70){
        ScormProcessSetValue("cmi.success_status", "passed");
    }
    else{
        ScormProcessSetValue("cmi.success_status", "failed");
    }
}
function ConvertMilliSecondsIntoSCORM2004Time(intTotalMilliseconds){

    var ScormTime = "";
    
    var HundredthsOfASecond;	
    
    var Seconds;	
    var Minutes;	
    var Hours;		
    var Days;		
    var Months;		
    var Years;		
    
    var HUNDREDTHS_PER_SECOND = 100;
    var HUNDREDTHS_PER_MINUTE = HUNDREDTHS_PER_SECOND * 60;
    var HUNDREDTHS_PER_HOUR   = HUNDREDTHS_PER_MINUTE * 60;
    var HUNDREDTHS_PER_DAY    = HUNDREDTHS_PER_HOUR * 24;
    var HUNDREDTHS_PER_MONTH  = HUNDREDTHS_PER_DAY * (((365 * 4) + 1) / 48);
    var HUNDREDTHS_PER_YEAR   = HUNDREDTHS_PER_MONTH * 12;
    
    HundredthsOfASecond = Math.floor(intTotalMilliseconds / 10);
    
    Years = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_YEAR);
    HundredthsOfASecond -= (Years * HUNDREDTHS_PER_YEAR);
    
    Months = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_MONTH);
    HundredthsOfASecond -= (Months * HUNDREDTHS_PER_MONTH);
    
    Days = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_DAY);
    HundredthsOfASecond -= (Days * HUNDREDTHS_PER_DAY);
    
    Hours = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_HOUR);
    HundredthsOfASecond -= (Hours * HUNDREDTHS_PER_HOUR);
    
    Minutes = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_MINUTE);
    HundredthsOfASecond -= (Minutes * HUNDREDTHS_PER_MINUTE);
    
    Seconds = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_SECOND);
    HundredthsOfASecond -= (Seconds * HUNDREDTHS_PER_SECOND);
    
    if (Years > 0) {
        ScormTime += Years + "Y";
    }
    if (Months > 0){
        ScormTime += Months + "M";
    }
    if (Days > 0){
        ScormTime += Days + "D";
    }
    if ((HundredthsOfASecond + Seconds + Minutes + Hours) > 0 ){
        
        ScormTime += "T";
        
        if (Hours > 0){
            ScormTime += Hours + "H";
        }
        
        if (Minutes > 0){
            ScormTime += Minutes + "M";
        }
        
        if ((HundredthsOfASecond + Seconds) > 0){
            ScormTime += Seconds;
            
            if (HundredthsOfASecond > 0){
                ScormTime += "." + HundredthsOfASecond;
            }
            
            ScormTime += "S";
        }
        
    }
    
    if (ScormTime == ""){
        ScormTime = "0S";
    }
    
    ScormTime = "P" + ScormTime;
    
    return ScormTime;
}

</script>

</head>
<body onload="doStart(false);" onbeforeunload="doUnload(false);" onunload="doUnload();">

<iframe width="100%" id="contentFrame" src=""></iframe>

<div id="navDiv">
    <input type="button" value="<- Previous" id="butPrevious" onclick="doPrevious();"/>
    <input type="button" value="Next ->" id="butNext" onclick="doNext();"/>
    <input type="button" value="Exit" id="butExit" onclick="doExit();"/>
</div>

</body>
</html>


`;

    return  textos+contenido+faltante;
}
function generarXml() {
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
<file href="img/alfil.jpg" />\n' +
'
</resource>\n' +
' </resources>\n' +
'</manifest>`;
}
