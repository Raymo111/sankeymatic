function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('SankeyMATIC')
      .addItem('Generate Diagram', 'showSidebar')
      .addToUi();
}

function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('index')
      .setTitle('Sankey Diagram Generator')
      .setWidth(300); // Adjust width as needed
  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Gets data from the active sheet and formats it for SankeyMATIC.
 * Assumes data is in columns A (Source), B (Amount), C (Target).
 * Skips the first row as a header.
 * @return {string} Formatted data string for SankeyMATIC or error message.
 */
function getDataFromSheet() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    let formattedDataString = "";
    let flowsFound = 0;

    // Start from the second row (index 1) to skip header
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      const source = row[0] ? String(row[0]).trim() : "";
      const amount = row[1]; // Keep as number for validation
      const target = row[2] ? String(row[2]).trim() : "";

      // Validate data: Amount must be a number, Source and Target must not be empty.
      if (source && target && typeof amount === 'number' && !isNaN(amount)) {
        if (amount < 0) {
          // Or handle as an error, skip, or take absolute value, depending on desired behavior
          Logger.log("Skipping row " + (i + 1) + " due to negative amount: " + amount);
          continue;
        }
        formattedDataString += source + " [" + amount + "] " + target + "\n";
        flowsFound++;
      } else {
        // Log skipped rows for debugging, but don't stop processing.
        if (!(source === "" && (amount === "" || amount === undefined || amount === null) && target === "")) { // Don't log completely empty rows
            Logger.log("Skipping row " + (i + 1) + " due to invalid data: Source='" + source + "', Amount='" + amount + "', Target='" + target + "'");
        }
      }
    }

    if (flowsFound === 0) {
      return "// No valid flows found in the sheet.\n// Ensure columns A, B, C contain Source, Amount, Target.\n// Example:\n// Income [1000] Budget\n// Budget [500] Rent";
    }
    return formattedDataString.trim();

  } catch (e) {
    Logger.log("Error in getDataFromSheet: " + e.toString());
    // Return a string that indicates an error to the client,
    // which can then be shown to the user.
    return "// Error reading data from sheet: " + e.message;
  }
}


/**
 * Inserts a base64 encoded image into the sheet.
 * @param {string} imageDataUrl The base64 encoded image data URL.
 * @param {string} filename The desired filename for the image.
 * @return {string} A success or error message.
 */
function insertImageToSheet(imageDataUrl, filename) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Strip the data URL prefix, e.g., "data:image/png;base64,"
    const base64Data = imageDataUrl.split(',')[1];
    if (!base64Data) {
      throw new Error("Invalid imageDataUrl format.");
    }

    const blob = Utilities.newBlob(
        Utilities.base64Decode(base64Data),
        'image/png',
        filename || 'sankey_diagram.png'
    );

    // Insert the image at the active cell's position.
    // Alternatively, specify a fixed position like sheet.insertImage(blob, 1, 1);
    const activeCell = sheet.getActiveCell();
    sheet.insertImage(blob, activeCell.getColumn(), activeCell.getRow());

    return "Image inserted successfully.";
  } catch (e) {
    Logger.log("Error in insertImageToSheet: " + e.toString() + "\nStack: " + e.stack);
    // It's better to throw the error so client-side onFailureHandler can catch it
    throw new Error("Failed to insert image: " + e.message);
  }
}
