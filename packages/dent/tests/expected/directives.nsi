; Test formatter directives

; Normal formatting applies here
Name "Directives Test"
OutFile "directives.exe"
RequestExecutionLevel user

; fmt:off
; This section is intentionally left unformatted
outfile "custom.exe"
name 'My Custom Name'
WriteRegStr hklm "Software\Test" "Key" "Value"
; fmt:on

; Formatting resumes here
DetailPrint "formatted again"

Section "Test"

	; fmt:ignore-next-line
detailprint 'ignored line'
	DetailPrint "formatted line"

	; fmt:off
setoutpath $INSTDIR
file "test.nsi"
	; fmt:on

	CopyFiles /SILENT "a" "b"

SectionEnd

; fmt:off block across a section boundary
; fmt:off
section "Unformatted"
detailprint "inside"
sectionend

; fmt:on

Section "Back to Normal"
	DetailPrint "formatted"
SectionEnd
