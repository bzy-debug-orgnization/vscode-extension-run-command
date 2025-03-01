import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let lastUsed: string | undefined;
  const buttons: vscode.QuickInputButton[] = [
    {
      iconPath: new vscode.ThemeIcon("copy"),
      tooltip: "Copy command ID to clipboard",
    },
    {
      iconPath: new vscode.ThemeIcon("gear"),
      tooltip: "Configure Keybinding",
    },
  ];
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "run-command-by-id.runCommand",
      async () => {
        const quickPick = vscode.window.createQuickPick();
        const commands = await vscode.commands.getCommands(true);
        const items: vscode.QuickPickItem[] = [];
        if (lastUsed !== undefined) {
          items.push({
            label: lastUsed,
            description: "Last used",
            buttons,
          });
        }
        for (const command of commands) {
          if (command === lastUsed) {
            continue;
          }
          items.push({
            label: command,
            buttons,
          });
        }
        quickPick.items = items;
        quickPick.placeholder = "Select a command to run";
        quickPick.show();
        quickPick.onDidHide(() => {
          quickPick.dispose();
        });
        quickPick.onDidAccept(async () => {
          const item = quickPick.selectedItems[0];
          quickPick.dispose();
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
        });
        quickPick.onDidTriggerItemButton(async (e) => {
          if (e.button.tooltip === undefined) {
            return;
          }
          const commandId = e.item.label;
          if (e.button.tooltip === "Copy command ID to clipboard") {
            await vscode.env.clipboard.writeText(commandId);
          } else if (e.button.tooltip === "Configure Keybinding") {
            await vscode.commands.executeCommand(
              "workbench.action.openGlobalKeybindings",
              `@command:${commandId}`,
            );
          }
        });
      },
    ),
  );
}

export function deactivate() {}
