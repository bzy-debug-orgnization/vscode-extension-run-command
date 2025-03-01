# Run Command by Command Id

Run vscode(VS Code) commands by its command id.

This extension help you explore vscode's commands quickly.

You can run command by its command id:

<video controls muted>
  <source src="https://github.com/bzy-debug-orgnization/vscode-extension-run-command/raw/refs/heads/main/assets/run.mp4" type="video/mp4"/>
</video>

Or configure a keybinding for a command:

<video controls muted>
  <source src="https://github.com/bzy-debug-orgnization/vscode-extension-run-command/raw/refs/heads/main/assets/keybinding.mp4" type="video/mp4"/>
</video>

Or copy the command id to clipboard:

<video controls muted>
  <source src="https://github.com/bzy-debug-orgnization/vscode-extension-run-command/raw/refs/heads/main/assets/copy.mp4" type="video/mp4"/>
</video>

## QnA

Why need this when there is `ctrl+shift+p` (`cmd+shift+p`) ?

There are some commands registered but not declared in `contributes.commands` (for example `cline.accountLoginClicked`). In this case, you can't execute them in command palette. However, This extension can help you execute them.
