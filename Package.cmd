@ECHO OFF
SETLOCAL

IF "%~1"=="" (
   SET /P Version=Version: 
) ELSE (
   SET Version=%~1
)

MKDIR "%~dp0dist\%Version%"
COPY "%~dp0src\VsNetSrc\wwwroot\lib\arebis-web\README.md" "%~dp0dist\%version%\README.md"
COPY "%~dp0src\VsNetSrc\wwwroot\lib\arebis-web\arebis-web-full.min.css" "%~dp0dist\%version%\arebis-web-full-%version%.min.css"
COPY "%~dp0src\VsNetSrc\wwwroot\lib\arebis-web\arebis-web.css" "%~dp0dist\%version%\arebis-web-%version%.css"
COPY "%~dp0src\VsNetSrc\wwwroot\lib\arebis-web\arebis-web.min.css" "%~dp0dist\%version%\arebis-web-%version%.min.css"
COPY "%~dp0src\VsNetSrc\wwwroot\lib\arebis-web\arebis-web-bootstrap4.css" "%~dp0dist\%version%\arebis-web-bootstrap4-%version%.css"
COPY "%~dp0src\VsNetSrc\wwwroot\lib\arebis-web\arebis-web-bootstrap4.min.css" "%~dp0dist\%version%\arebis-web-bootstrap4-%version%.min.css"
COPY "%~dp0src\VsNetSrc\wwwroot\lib\arebis-web\arebis-web-full.min.js" "%~dp0dist\%version%\arebis-web-full-%version%.min.js"
COPY "%~dp0src\VsNetSrc\wwwroot\lib\arebis-web\arebis-web.js" "%~dp0dist\%version%\arebis-web-%version%.js"
COPY "%~dp0src\VsNetSrc\wwwroot\lib\arebis-web\arebis-web.min.js" "%~dp0dist\%version%\arebis-web-%version%.min.js"
COPY "%~dp0src\VsNetSrc\wwwroot\lib\arebis-web\arebis-web-bootstrap4.js" "%~dp0dist\%version%\arebis-web-bootstrap4-%version%.js"
COPY "%~dp0src\VsNetSrc\wwwroot\lib\arebis-web\arebis-web-bootstrap4.min.js" "%~dp0dist\%version%\arebis-web-bootstrap4-%version%.min.js"
COPY "%~dp0src\VsNetSrc\wwwroot\lib\arebis-web\arebis-web-eventactions.js" "%~dp0dist\%version%\arebis-web-eventactions-%version%.js"
COPY "%~dp0src\VsNetSrc\wwwroot\lib\arebis-web\arebis-web-eventactions.min.js" "%~dp0dist\%version%\arebis-web-eventactions-%version%.min.js"
COPY "%~dp0src\VsNetSrc\wwwroot\lib\arebis-web\arebis-web-fa.js" "%~dp0dist\%version%\arebis-web-fa-%version%.js"
COPY "%~dp0src\VsNetSrc\wwwroot\lib\arebis-web\arebis-web-fa.min.js" "%~dp0dist\%version%\arebis-web-fa-%version%.min.js"
COPY "%~dp0src\VsNetSrc\wwwroot\lib\arebis-web\arebis-web-retina.js" "%~dp0dist\%version%\arebis-web-retina-%version%.js"
COPY "%~dp0src\VsNetSrc\wwwroot\lib\arebis-web\arebis-web-retina.min.js" "%~dp0dist\%version%\arebis-web-retina-%version%.min.js"
COPY "%~dp0src\VsNetSrc\wwwroot\lib\arebis-web\arebis-web-unicons.js" "%~dp0dist\%version%\arebis-web-unicons-%version%.js"
COPY "%~dp0src\VsNetSrc\wwwroot\lib\arebis-web\arebis-web-unicons.min.js" "%~dp0dist\%version%\arebis-web-unicons-%version%.min.js"

ECHO {^
 "name": "arebis-web",^
 "version": "%version%",^
 "description": "Arebis Web JS Extensions",^
 "author": "Codetuner",^
 "main": "arebis-web-full-%version%.min.js",^
 "repository": {^
 "type": "git",^
 "url": "https://github.com/codetuner/Arebis.Web"^
 },^
 "license": "MIT"^
}>"%~dp0dist\%version%\package.json"
