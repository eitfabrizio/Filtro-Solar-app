const { app, BrowserWindow } = require('electron')
const path = require('path')

function crearVentana() {
  const ventana = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  ventana.loadFile('index.html')
}

app.whenReady().then(crearVentana)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
