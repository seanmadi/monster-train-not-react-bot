const { app, BrowserWindow, Menu, ipcMain } = require("electron")
const { runBot } = require("./bot")

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  // and load the index.html of the app.
  win.loadFile("index.html")
}

Menu.setApplicationMenu(false)
app.whenReady().then(createWindow)

ipcMain.on("run-bot", (event, arg) => {
  runBot(arg.username, arg.channel, arg.oauth, arg.saveFilePath)
})
