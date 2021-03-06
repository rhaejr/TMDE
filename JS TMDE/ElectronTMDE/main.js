const electron = require('electron');
const url = require('url');
const path = require('path');
const XLSX = require('xlsx');
tableify = require('tableify');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;

// Listin for app to be ready
app.on('ready', function()
{
    // create new window
    mainWindow = new BrowserWindow({});
    //load html into window
    mainWindow.loadURL(url.format({
        pathname : path.join(__dirname, 'mainWindow.html'),
        protocol : 'file',
        slashes: true
    }));
    //Quit app when closed
    mainWindow.on('closed', function(){app.quit();})

    // build menu from template
const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

// insert menu
Menu.setApplicationMenu(mainMenu);
});

// TODO: Load tmde tracker excel into a table
var workbook = XLSX.readFile('TMDE EQUIPMENT.xlsm');
var sheet_name_list = workbook.SheetNames;
var sheet = sheet_name_list.indexOf('Consolidated');


var consolodated = XLSX.utils.sheet_to_html(workbook.Sheets[sheet_name_list[1]], {id : "tracker", editable:true});
// TODO: make tools to quickly update the tracker

// TODO: in a perfect world scanned returned doc could auto update the tracker

// TODO: Export tracker back to excel



// create menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu:[
            {
                label:'Clear Items',
            click(){
                sendTable();
                }
        }
        ]
    }
];

function sendTable(){
    mainWindow.webContents.send('table:add', consolodated);
    console.log('456');
}

// If Mac add empty object to menu
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({})
}

// Add developer tools item if not in production
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
              label: 'Toggle DevTools',
              accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
              click(item, focusedWindow){
                  focusedWindow.toggleDevTools();
              }  
            },
            {
                role: 'reload'
            }
        ]
    })
}