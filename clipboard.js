document.getElementById('copy-btn').addEventListener('click', () => {
    window.electronAPI.writeTextToClipboard('Hello from Electron!');
    alert('Text copied to clipboard!');
  });
  
  document.getElementById('paste-btn').addEventListener('click', async () => {
    const text = await window.electronAPI.readTextFromClipboard();
    document.getElementById('clipboard-content').innerText = `Clipboard content: ${text}`;
  });