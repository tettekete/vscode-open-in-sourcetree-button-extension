import * as vscode from 'vscode';
import { openSourcetree } from './open-sourcetree';
import path from 'node:path';

import {
	CONFIG_SOURCETREE_PATH,
	CODEICON_SETTING_KEY,
	PRIORITY_SETTING_KEY
} from './constants';

let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext)
{
	updateStatusBarIcon();

	// Event listener fot config change.
	const configChangeListener = vscode.workspace.onDidChangeConfiguration((event) =>
	{
		if (event.affectsConfiguration( CODEICON_SETTING_KEY ))
		{
			updateStatusBarIcon();
		}
	});

	// registerCommand
	const disposable = vscode.commands.registerCommand('tettekete.openSourcetreeButton', openSourcetree);
	const setPathCommand = vscode.commands.registerCommand('tettekete.setSourceTreePath',setSourcetreePathConfig );

	context.subscriptions.push(
						disposable,
						statusBarItem,
						configChangeListener,
						setPathCommand
					);
}

async function setSourcetreePathConfig()
{
	const result = await vscode.window.showOpenDialog({
		canSelectMany: false,
		canSelectFiles: true,
		canSelectFolders: false,
		filters: {
			Executable: process.platform === 'win32' ? ['exe'] : [],
		},
		openLabel: 'select',
		title: vscode.l10n.t('Select SourceTree Executable')
	});

	if (result && result[0]) {
		const selectedPath = result[0].fsPath;
		if( ! /^sourcetree\.(?:exe)|(?:app)$/i.test( path.basename( selectedPath )) )
		{
			vscode.window.showErrorMessage(
				vscode.l10n.t('The specified path does not point to the Sourcetree application. For security reasons, only SourceTree.exe or SourceTree.app can be specified.\n"{0}"',selectedPath ),
				{modal: true}
			);
		}
		else
		{
			await vscode.workspace.getConfiguration().update(CONFIG_SOURCETREE_PATH, selectedPath, vscode.ConfigurationTarget.Global);
			vscode.window.showInformationMessage(`SourceTree path set to: ${selectedPath}`);
		}
	}
	
}

function updateStatusBarIcon()
{
	if( statusBarItem )
	{
		statusBarItem.dispose();
	}

	const config		= vscode.workspace.getConfiguration();
	const customIcon	= config.get<string>(CODEICON_SETTING_KEY, 'light-bulb');	// See https://code.visualstudio.com/api/references/icons-in-labels#icon-listing 
	const priority		= config.get<number>(PRIORITY_SETTING_KEY, 0);

	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right ,priority);

	statusBarItem.text		= `$(${customIcon})`;
	statusBarItem.tooltip	= vscode.l10n.t('Open SourceTree for the current workspace');
	statusBarItem.command	= 'tettekete.openSourcetreeButton';

	statusBarItem.show();
}

export function deactivate()
{
	if( statusBarItem )
	{
		statusBarItem.hide();
		statusBarItem.dispose();
	}
}
