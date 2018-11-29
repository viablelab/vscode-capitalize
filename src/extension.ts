'use strict';

import * as vscode from 'vscode';
import title = require('title');

export function activate(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration('capitalize');

  let disposable = vscode.commands.registerCommand(
    'extension.capitalizeTitle',
    () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        return;
      }

      const document = editor.document;
      let notifyAboutSingleLineSelections = false;

      try {
        editor.selections.forEach(selection => {
          if (selection.isEmpty) {
            return;
          }

          if (!selection.isSingleLine) {
            notifyAboutSingleLineSelections = true;
            return;
          }

          const range = new vscode.Range(selection.start, selection.end);
          const text = document.getText(range);
          const capitalized = title(text, { special: config.special });

          editor.edit(edit => {
            edit.replace(range, capitalized);
          });
        });
      } catch (e) {
        const message = 'Something went wrong\n  ' + e.message;
        vscode.window.showErrorMessage(message);
      } finally {
        if (notifyAboutSingleLineSelections) {
          vscode.window.setStatusBarMessage(
            'Ignoring selection(s) spanning multiple lines.',
            2000
          );
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
