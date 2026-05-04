import { execSync } from 'child_process';

const notify = (message) => {
  if (process.platform !== 'win32') return;
  const ps = [
    '[Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null',
    '[Windows.Data.Xml.Dom.XmlDocument, Windows.Data.Xml.Dom.XmlDocument, ContentType = WindowsRuntime] | Out-Null',
    '$t = [Windows.UI.Notifications.ToastNotificationManager]::GetTemplateContent([Windows.UI.Notifications.ToastTemplateType]::ToastText02)',
    '$x = [xml]$t.GetXml()',
    `$x.GetElementsByTagName('text')[0].AppendChild($x.CreateTextNode('Claude Code')) | Out-Null`,
    `$x.GetElementsByTagName('text')[1].AppendChild($x.CreateTextNode('${message}')) | Out-Null`,
    '$d = New-Object Windows.Data.Xml.Dom.XmlDocument',
    '$d.LoadXml($x.OuterXml)',
    '$n = [Windows.UI.Notifications.ToastNotification]::new($d)',
    `[Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier('Claude Code').Show($n)`,
  ].join('; ');

  try {
    execSync(`powershell -Command "${ps}"`, { stdio: 'ignore' });
  } catch {
    // ignore
  }
};

let data = '';
process.stdin.on('data', (chunk) => (data += chunk));
process.stdin.on('end', () => {
  let payload;
  try {
    payload = JSON.parse(data);
  } catch {
    payload = {};
  }

  const message = process.argv[2] ?? payload.message ?? 'タスクが完了しました';
  notify(message);
});
