import { exec } from 'child_process';
import * as vscode from 'vscode';

export function openSourcetree()
{
	const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
	if( ! workspaceFolder )
	{
		vscode.window.showErrorMessage('No workspace folder is open.');
		return;
	}

	const isWindows = process.platform === 'win32';

	const command = isWindows
		? `"C:\\Program Files (x86)\\Atlassian\\SourceTree\\SourceTree.exe" "${workspaceFolder}"`
		: `open -a SourceTree.app "${workspaceFolder}"`;

	exec(command, (error) =>
	{
		if( error ) 
		{
			vscode.window.showErrorMessage(`Failed to open SourceTree: ${error.message}`);
		}
	});
}