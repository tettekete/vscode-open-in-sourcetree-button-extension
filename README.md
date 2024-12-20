# Open In Sourcetree Button

This extension adds an icon to the right side of the VSCode status bar that allows you to open Sourcetree.

It opens the workspace folder containing the current file or an active workspace folder in Sourcetree.

## Requirements

Sourcetree must be installed.

## Configuration

**Sourcetree Path** (`openSourcetreeButton.SourcetreePath`)

If left blank, the default Sourcetree installation path will be used:

- Windows(One of the following): 
	- `C:\Program Files (x86)\Atlassian\SourceTree\SourceTree.exe`
	- `C:\Program Files\Atlassian\SourceTree\SourceTree.exe`
	- `<User-Home>\AppData\Local\SourceTree\SourceTree.exe`
- macOS: `Sourcetree.app`_(On a Mac, it is not usually necessary to use the full path.)_

If Sourcetree is installed in a different location and cannot be launched, specify the full path to the Sourcetree application in this setting.

You can also configure it using the file selection dialog by selecting `Open In SourceTree Button: Set the SourceTree path in the file selection dialog.` from the command palette.

NOTE: For security reasons, the file name must be `SourceTree.exe` or `Sourcetree.app`.


**Icon** (`openSourcetreeButton.icon`)

You can specify the icon (Codeicon) displayed in the status bar. Refer to the list of available icon names at [Icons in Labels](https://code.visualstudio.com/api/references/icons-in-labels#icon-listing).

By default, the `light-bulb` icon, which resembles the Sourcetree logo, is set.

**Priority** (`openSourcetreeButton.priority`)

This determines the priority value for the order of icons in the status bar.


# Appendix

- [日本語版 README](docs/README.ja.md)
