function request(url, method, payload, json = true){
  
  let header = {
    "Content-Type": "application/json"
  };
  
  let options = {
    method: method,
    headers: header
  };
  
  if (payload)
    options['payload'] = JSON.stringify(payload);
  
  let response;
  try {
    response = UrlFetchApp.fetch(url, options);
    
    let code = response.getResponseCode();
    
    if (code != 200 && code != 204)
      throw { error: code };
    
    console.log(`endpoint: ${url}    http response: ${code}`);
    
    if(code == 204)
      return null;
    
    if (json)
      return JSON.parse(response.getContentText("UTF-8"));
    
    return response.getContentText("UTF-8");
  } catch (error) {
    console.error(error);
    return null;
  }
}

function get_array_from_sheets(sheet_name, columns = 0) {
  const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet_name);
  
  let values;
  try {
    if (columns == 0)
      columns = ss.getLastColumn();
    
    values = ss.getRange(1, 1, ss.getLastRow(), columns).getValues();
  } catch (e) {
    return null;  
  }

  const array = [];
  for (const column of values) {
    for (const row of column)
      array.push(row);
  }
  
  return array;
}