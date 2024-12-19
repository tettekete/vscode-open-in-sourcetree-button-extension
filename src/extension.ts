import * as vscode from 'vscode';
import { openSourcetree } from './open-sourcetree';

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
	context.subscriptions.push(disposable, statusBarItem ,configChangeListener );
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
