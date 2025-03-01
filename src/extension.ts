import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("run-command.runCommand", async () => {
      const commandId = await vscode.window.showQuickPick(
        vscode.commands.getCommands(true),
        { placeHolder: "Select a command to run" },
      );
      if (commandId === undefined) {
        return;
      }
      try {
        await vscode.commands.executeCommand(commandId);
      } catch (error) {
        if (error instanceof Error) {
          vscode.window.showErrorMessage(
            `Failed to execute command: ${error.message}`,
          );
        } else {
          vscode.window.showErrorMessage("Failed to execute command");
        }
      }
    }),
  );
}

export function deactivate() {}
