const os = require('os')
const path = require('path')
const {contextBridge, ipcRenderer } = require('electron');

Window.ipcRenderer;
contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, data) => ipcRenderer.send(channel, data) ,
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)), 
});