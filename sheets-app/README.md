# SankeyMATIC Google Sheets Extension

This Google Sheets extension allows you to generate Sankey diagrams directly from your sheet data using the SankeyMATIC web tool's engine. You can visualize flows within your data and insert the resulting diagram as an image into your active sheet.

## Manual Installation Steps

Follow these steps to manually install the SankeyMATIC extension in your Google Sheet:

1.  **Open or Create a Google Sheet:** Start with the Google Sheet that contains your data or a new sheet where you plan to add data.
2.  **Open the Apps Script Editor:**
    *   Click on "Extensions" in the menu bar.
    *   Select "Apps Script". This will open a new tab with the Google Apps Script editor.
3.  **Create Project Files:**
    By default, a new Apps Script project will have a `Code.gs` file. You will need to add two more files: `appsscript.json` and `index.html`.

    *   **`appsscript.json` (Manifest File):**
        *   In the Apps Script editor, click the `+` icon next to "Files" in the left-hand sidebar.
        *   Choose "JSON" as the file type.
        *   Name the file `appsscript.json` (all lowercase) and press Enter.
        *   Delete any content that might be pre-filled in this new file.
    *   **`index.html` (Sidebar UI):**
        *   Click the `+` icon next to "Files" again.
        *   Choose "HTML" as the file type.
        *   Name the file `index.html` (all lowercase) and press Enter.
        *   Delete any content that might be pre-filled in this new file.
    *   **`Code.gs` (Server-side Logic):**
        *   This file should already exist. Delete any content that might be pre-filled in it.

4.  **Copy and Paste File Contents:**
    You will now copy the entire content from the files provided in this `sheets-app` directory into the corresponding files you just created in the Apps Script editor.

    *   **For `appsscript.json`:**
        1.  Open the `appsscript.json` file located in this `sheets-app` directory (alongside this README).
        2.  Select and copy its entire content.
        3.  Paste this content into the `appsscript.json` file you created in the Apps Script editor.
        4.  Save the file (File > Save, or `Ctrl+S`/`Cmd+S`).
    *   **For `Code.gs`:**
        1.  Open the `Code.gs` file located in this `sheets-app` directory.
        2.  Select and copy its entire content.
        3.  Paste this content into the `Code.gs` file in the Apps Script editor.
        4.  Save the file.
    *   **For `index.html`:**
        1.  Open the `index.html` file located in this `sheets-app` directory.
        2.  Select and copy its entire content.
        3.  Paste this content into the `index.html` file in the Apps Script editor.
        4.  Save the file.

5.  **Refresh Your Google Sheet:** Close the Apps Script editor tab and refresh the Google Sheet page in your browser.

## Usage Instructions

1.  **Open the Extension:**
    *   After installation and refreshing your sheet, a new menu item "SankeyMATIC" should appear in your Google Sheets menu.
    *   Click on "SankeyMATIC" and then select "Generate Diagram". This will open a sidebar.
    *   *Note: Depending on other extensions or Google updates, this menu might sometimes be under "Extensions" or "Tools" > "Macros" initially.*

2.  **Prepare Your Data:**
    *   Organize your flow data in the active Google Sheet.
    *   **Column A:** Should contain the "Source" node name.
    *   **Column B:** Should contain the "Amount" (numeric value) of the flow.
    *   **Column C:** Should contain the "Target" node name.
    *   The script assumes the **first row is a header row and will skip it** during data processing.

3.  **Get Data from Sheet:**
    *   In the SankeyMATIC sidebar, click the "**Get Data from Sheet**" button.
    *   The script will read the data from your active sheet, format it, and populate the "Inputs" text area in the sidebar.

4.  **Customize (Optional):**
    *   Use the various controls within the sidebar (Labels, Nodes, Flows, Layout Options, Diagram Size & Background) to customize the appearance of your Sankey diagram.
    *   Click the "**Show >**" button below the "Inputs" area to preview your diagram with the current settings.

5.  **Insert Diagram to Sheet:**
    *   Once you are satisfied with the diagram preview in the sidebar, click the "**Insert Diagram to Sheet**" button.
    *   The diagram will be generated as a PNG image and inserted into your active sheet at the currently active cell's position.

## Customization

The sidebar provides a rich set of controls to customize the visual appearance of your Sankey diagram:
*   **Labels:** Adjust font, size, color, and positioning of node labels and values.
*   **Nodes:** Control node height, width, spacing, border, opacity, and color themes.
*   **Flows:** Modify flow opacity, curviness, and color inheritance.
*   **Layout Options:** Justify origins/endpoints, reverse graph direction.
*   **Diagram Size & Background:** Set the dimensions of the output image and its background color (or make it transparent).

Experiment with these settings and use the "Show >" button to preview your changes before inserting the image.

## Important Considerations

*   **Active Sheet:** The script always processes data from the *currently active sheet* in your Google Spreadsheet.
*   **Processing Time:** Complex diagrams with many nodes and flows, or very large datasets, might take a moment to process and render.
*   **Authorization:** The first time you run the extension, Google will prompt you to authorize the script. You must grant the necessary permissions for it to function (accessing your spreadsheet data and inserting images).
*   **Data Validation:** The "Get Data from Sheet" function performs basic validation (checks for non-empty Source/Target and numeric Amount). Rows with invalid data will be skipped. Check the Apps Script logs (View > Logs in the editor) if you suspect data issues.
*   **Image Format:** Diagrams are inserted as PNG images.

Happy Sankey-ing!
