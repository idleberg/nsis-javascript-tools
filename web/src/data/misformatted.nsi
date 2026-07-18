; The name of the installer
name 'Example1'

; The file to write
OUTFILE `example1.exe`

; Request application privileges for Windows Vista
requestExecutionLevel user

; Build Unicode installer
unicode TRUE

; The default installation directory
  InstallDIR $DESKTOP\Example1

;--------------------------------

 ; Pages
   Page directory
     Page instfiles

;--------------------------------

; The stuff to install
Section "" ; No components page, name is not important

; Set output path to the installation directory.
setOutPath       $INSTDIR

; Put file there
      file example1.nsi

SectionEnd
