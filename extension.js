const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "caffeine" is now active!');
	let lastTime = Date.now();
	let thisTime = Date.now();
	let diff = 0;
	let totalCodeTime = 0;
	
	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);
	let disposable = vscode.commands.registerCommand('type', function (args) {
		vscode.commands.executeCommand('default:type', {
      text: args.text
		});
		thisTime = Date.now();
		diff = thisTime - lastTime;
		if (diff <= 900000) {
			totalCodeTime += diff;
		}
		statusBarItem.text = `Code time today: ${(totalCodeTime/1000).toString()} seconds`;
		statusBarItem.show();
		lastTime = thisTime;
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
