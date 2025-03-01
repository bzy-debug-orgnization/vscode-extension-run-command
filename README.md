# run-command

Run vscode(VS Code) commands by its command id.

This extension help you explore vscode's various commands quickly.

## QnA

Why need this when there is `ctrl+shift+p` (`cmd+shift+p`) ?

There are some commands registered but not declared in `contributes.commands` of their `package.json`. In this case, you can't execute them in command palette. However, This extension can help you execute them.
