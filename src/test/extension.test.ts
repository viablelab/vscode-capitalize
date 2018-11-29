import * as assert from 'assert';
import * as vscode from 'vscode';

test('capitalize', async () => {
  const config = vscode.workspace.getConfiguration('capitalize');
  const textDocument = await vscode.workspace.openTextDocument({
    content: 'this is a test title',
    language: 'plaintext',
  });
  await vscode.window.showTextDocument(textDocument);
  const editor = vscode.window.activeTextEditor as vscode.TextEditor;
  const document = editor.document;

  assert.deepEqual([], config.special, 'exposes expected configuration');

  const firstLine = document.lineAt(0);
  editor.selection = new vscode.Selection(
    firstLine.range.start,
    firstLine.range.end
  );
  await vscode.commands.executeCommand('extension.capitalizeTitle');
  const actual = document.getText(firstLine.range);
  const expected = 'This Is a Test Title';

  assert.equal(expected, actual, 'capitalizes selection on command');
});
