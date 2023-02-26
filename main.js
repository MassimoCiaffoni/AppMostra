const { app, BrowserWindow} = require("electron");


let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1080,
    height: 1920,
    fullscreen: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  
  win.loadFile("index.html");

  win.webContents.on('did-finish-load', () => {
    win.webContents.setZoomFactor(1); 
  });

  win.on("closed", () => {
    win = null;
  });
}



app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
