import { exec } from 'child_process';
import * as vscode from 'vscode';
import { findWorkspaceFolder ,escapeArgumentForShell } from './lib/utils'

const CONFIG_SOUCETREE_PATH = 'openSourcetreeButton.SourcetreePath';

export function openSourcetree()
{
	// Determine the folder to open
	let folderToOpen:string | undefined = undefined;
	const editor	= vscode.window.activeTextEditor;

	if( editor )
	{
		folderToOpen = findWorkspaceFolder( editor.document.uri.fsPath );

		if( ! folderToOpen )
		{
			folderToOpen =  vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

			if( ! folderToOpen )
			{
				vscode.window.showErrorMessage(
					vscode.l10n.t('The active editor is not part of the workspace, and no other workspace folders could be found.')
				);
				return;
			}
		}
	}
	else
	{
		folderToOpen =  vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

		if( ! folderToOpen )
		{
			vscode.window.showErrorMessage(
				vscode.l10n.t('There is no active editor, and no other workspace folders could be found.')
			);
			return;
		}
	}
	

	// Determine the path to Sourcetree.
	const config		= vscode.workspace.getConfiguration();
	let sourcetreePath	= config.get<string>(CONFIG_SOUCETREE_PATH, '');
	const isWindows		= process.platform === 'win32';
	
	if( sourcetreePath.length )
	{
		sourcetreePath = escapeArgumentForShell( sourcetreePath );
	}
	else
	{
		if( isWindows )
		{
			sourcetreePath = `"C:\\Program Files (x86)\\Atlassian\\SourceTree\\SourceTree.exe"`;
		}
		else
		{
			// There is currently no Linux version of Sourcetree. In other words, if it’s not Windows, then it must be macOS.
			sourcetreePath = 'SourceTree.app';
		}
	}

	// open in Sourcetree
	const safeFolderToOpen = escapeArgumentForShell( folderToOpen );	
	const command = isWindows
		? `${sourcetreePath} ${safeFolderToOpen}`
		: `open -a ${sourcetreePath} ${safeFolderToOpen}`;

	exec(command, (error) =>
	{
		if( error ) 
		{
			vscode.window.showErrorMessage(
				vscode.l10n.t('Failed to open SourceTree: {0}' ,error.message )
			);
		}
	});
	

	
}