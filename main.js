const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Crea la finestra del browser.
  let win = new BrowserWindow({
    width: 1920,
    height: 1080,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // e carica l'index.html della tua app.
  win.loadFile('index.html')
}

// Questo metodo viene chiamato quando Electron ha finito
// l'inizializzazione e pronto a creare finestre browser.
// Alcune API possono essere utilizzate solo dopo che questo evento accade.
app.whenReady().then(createWindow)

// Terminare l'app quando tutte le finestre vengono chiuse.
app.on('window-all-closed', () => {
  // Su macOS è comune che l'applicazione e la barra menu
  // rimangano attive finché l'utente non esce espressamente tramite i tasti Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // Su macOS è comune ri-creare la finestra dell'app quando
  // viene cliccata l'icona sul dock e non ci sono altre finestre aperte.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})