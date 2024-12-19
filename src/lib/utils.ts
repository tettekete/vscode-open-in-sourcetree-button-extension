import * as vscode from 'vscode';

/**
 * Find the workspace folder that contains the given file path.
 * @param filePath The file path to check.
 * @returns The root path of the workspace folder, or `undefined` if not found.
 */
export function findWorkspaceFolder(filePath: string): string | undefined
{
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if ( ! workspaceFolders )
	{
        return undefined;
    }

	for (const folder of workspaceFolders)
	{
		if (filePath.startsWith(folder.uri.fsPath))
		{
			return folder.uri.fsPath;
		}
	}

    return undefined;
}


export function escapeArgumentForShell( argument: string )
{
	if( process.platform === 'win32' )
	{
		return `"${argument.replace(/"/g, '\\"')}"`;
	}
	else
	{
		return `'${argument.replace(/'/g, "'\\''")}'`;
	}
}
