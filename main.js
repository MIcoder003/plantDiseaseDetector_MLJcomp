const path = require('path');
const { app, BrowserWindow, Menu, ipcMain} = require('electron');
const fs = require('os') 

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

const axios = require('axios');

import FormData  from 'form-data';


let mainWindow;

//Create the manin Window 
function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'Plant Disease Detector',
        width: isDev ? 1000 : 500,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,  
            preload: path.join(__dirname, 'preload.js')
        },
    });

    //Open devtools if in dev env
    if(isDev){
        mainWindow.webContents.openDevTools();
    }
    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

// Create Newwin ``
// App is ready 
app.whenReady().then(() => {
    createMainWindow();

//Implement menu 
const mainMenu = Menu.builfromTemplate(menu);
Menu.setApplicationMenu(mainMenu);

//Remove mainWIndow from memory on close
mainWindow.on('closed', () => (mainWindow = null)); 

    app.on('activate', ()=> {
        if(BrowserWindow.getAllWindows().length === 0){
            createMainWindow();
        }
    })
});

//Menu template
const menu  = [
    {
        role: 'fileMenu',
    },
]; 

// Respond to ipcRenderer detect
ipcMain.on('image:detect', (e, options) => {
    console.log(options)
   fetchdata(options);
});

async function fetchdata(img_path) {
    const data = new FormData(); 
    data.append('image', 
    {
        uri: image_path, 
        name: 'userProfile.jpg',
        type: 'image/jpg'
    
    });

    const res = await axios.post('http://192.168.105.159:80/uploadImage', data, {
        headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; 
            boundary=${data._boundary}`,
        }
    })

    setResult(res.data.diseased)
} 


app.on('window-all-closed', () =>{
    if(!isMac){
        app.quit()
    }
})