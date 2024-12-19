import { exec } from 'child_process';
import * as vscode from 'vscode';
import { findWorkspaceFolder ,escapeArgumentForShell } from './lib/utils';
import path from 'node:path';
import fs from 'node:fs';

import { CONFIG_SOURCETREE_PATH } from './constants';

function findSourcetreeOnWindows():string | undefined
{
	const DEFAULT_PATHS = [
		'C:\\Program Files\\Atlassian\\SourceTree\\SourceTree.exe',
		'C:\\Program Files (x86)\\Atlassian\\SourceTree\\SourceTree.exe',
		path.join(process.env.USERPROFILE || '', 'AppData\\Local\\SourceTree\\SourceTree.exe'),
	];

	return DEFAULT_PATHS.find((path) => fs.existsSync(path) );
}

export async function openSourcetree()
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
	let sourcetreePath	= config.get<string>(CONFIG_SOURCETREE_PATH, '');
	const isWindows		= process.platform === 'win32';
	
	if( sourcetreePath.length )
	{
		if( ! /^sourcetree\.(?:exe)|(?:app)$/i.test( path.basename( sourcetreePath )) )
		{
			vscode.window.showErrorMessage(
				vscode.l10n.t('The specified path does not point to the Sourcetree application. For security reasons, only SourceTree.exe or SourceTree.app can be specified.\n"{0}"',sourcetreePath )
			);
			return;
		}
		sourcetreePath = escapeArgumentForShell( sourcetreePath );
	}
	else
	{
		if( isWindows )
		{
			const sourcetreeOnWindows:string | undefined = findSourcetreeOnWindows();
			if( sourcetreeOnWindows )
			{
				sourcetreePath = sourcetreeOnWindows;

				// update Sourcetree path config.
				await vscode.workspace.getConfiguration().update(
					CONFIG_SOURCETREE_PATH,
					sourcetreePath,
					vscode.ConfigurationTarget.Global
				);
			}
			else
			{
				vscode.window.showErrorMessage(
					vscode.l10n.t('SourceTree.exe was not found. Please set the config “Open Sourcetree Button: Sourcetree Path” to the full path of SourceTree.exe.' )
				);
			}
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