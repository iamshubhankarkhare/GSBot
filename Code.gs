function doGet(e){  
  return handleResponse(e);
}
var SCRIPT_PROP = PropertiesService.getScriptProperties(); 

function handleResponse(e) {
 
  var lock = LockService.getPublicLock();
  lock.waitLock(30000);  
  var SHEET_NAME = e.parameter.sheetName;
  
  try {
    
    var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
    var sheet = doc.getSheetByName(SHEET_NAME);
    
    // assuming header is in row 1 but you can override with header_row in GET/POST data
    var headRow = e.parameter.header_row || 1;
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow()+1; // get next row
    var row = []; 
    var date=new Date().toLocaleString();
    var intro="New response in "+SHEET_NAME +"\n"+date+"\n\n"
    var msg=""
    // loop through the header columns
    for (i in headers){
      if (headers[i] == "Timestamp"){ // special case if you include a 'Timestamp' column
        row.push(date);
      } else { // else use header name to get data
        row.push(e.parameter[headers[i]]);
        msg=msg+headers[i]+" : "+e.parameter[headers[i]]+"\n\n"
      }
    }

    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
    
// Enable notification feature here
    
//     var slackWebhook='Your slack webhook here'
//     var googleChatWebhook="Your google chat webhook here"
//     const payload ={"text": intro , "attachments": [{  "color": "#9a33a3","text": msg}]};
//         const slackOptions = {
//           'method' : 'post',
//           'contentType': 'application/json; charset=UTF-8',
//            muteHttpExceptions: true,
//           'payload' : JSON.stringify(payload)
//         };
//         UrlFetchApp.fetch(slackWebhook, slackOptions); 
//    
//    try{
//     var chatMsg=intro+"\n\n"+msg
//       const chatOptions = {
//           'method' : 'post',
//           'contentType': 'application/json; charset=UTF-8',
//         'payload' : JSON.stringify({"text":chatMsg})
//         };
//         UrlFetchApp.fetch(googleChatWebhook, chatOptions); 
//    
//    }catch(err){
//    Logger.log(err)
//    }
   

    // return json success results
    return ContentService
    .createTextOutput(JSON.stringify({"result":"success", "row": nextRow}))
          .setMimeType(ContentService.MimeType.JSON);
  } catch(err){
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": err}))
          .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function setup() {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    SCRIPT_PROP.setProperty("key", doc.getId());
}
