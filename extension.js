const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('Congratulations, your extension "caffeine" is now active!');
  let lastTime = Date.now();
  let thisTime = Date.now();
  let diff = 0;

  const state = context.workspaceState.get("caffeine.state") || {};
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const currentDate = year + "/" + month + "/" + day;

  let totalCodeTime = state[currentDate] || 0;

  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    1000
  );
  let disposable = vscode.commands.registerCommand("type", function (args) {
    vscode.commands.executeCommand("default:type", {
      text: args.text,
    });
    thisTime = Date.now();
    diff = thisTime - lastTime;
    if (diff <= 900000) {
      totalCodeTime += diff;
    }
    statusBarItem.text = `Code time today: ${(
      totalCodeTime / 1000
    ).toString()} seconds`;
    statusBarItem.show();
    lastTime = thisTime;

    const state = context.workspaceState.get("caffeine.state") || {};

    state[currentDate] = totalCodeTime;

    context.workspaceState.update("caffeine.state", state);
  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
