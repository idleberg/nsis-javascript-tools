; The name of the installer
Name "Example1"

; The file to write
OutFile "example1.exe"

; Request application privileges for Windows Vista
RequestExecutionLevel user

; Build Unicode installer
Unicode true

; The default installation directory
InstallDir $DESKTOP\Example1

;--------------------------------

; Pages

Page directory
Page instfiles

;--------------------------------

; The stuff to install
Section "" ;No components page, name is not important

  ; Set output path to the installation directory.
  SetOutPath $INSTDIR

  ; Put file there
  File example1.nsi

SectionEnd