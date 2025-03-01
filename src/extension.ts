import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let lastUsed: string | undefined;
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "run-command-by-id.runCommand",
      async () => {
        const commands = await vscode.commands.getCommands(true);
        const items: vscode.QuickPickItem[] = [];
        if (lastUsed !== undefined) {
          items.push({ label: lastUsed, description: "Last used" });
        }
        for (const command of commands) {
          if (command === lastUsed) {
            continue;
          }
          items.push({ label: command });
        }
        const item = await vscode.window.showQuickPick(items, {
          placeHolder: "Select a command to run",
        });
        if (item === undefined) {
          return;
        }
        lastUsed = item.label;
        try {
          await vscode.commands.executeCommand(item.label);
        } catch (error) {
          if (error instanceof Error) {
            vscode.window.showErrorMessage(
              `Failed to execute command: ${error.message}`,
            );
          } else {
            vscode.window.showErrorMessage("Failed to execute command");
          }
        }
      },
    ),
  );
}

export function deactivate() {}
