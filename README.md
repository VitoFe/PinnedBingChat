# Pinned Copilot :pushpin:

Firefox addon that creates a pinned tab for Copilot, allowing to quickly switch to the tab whenever you need to access the chat. To use this add-on, you must have Firefox installed and you may have to be logged in your MS account, with access to the AI Chat feature.

## Installing an official release :inbox_tray:

Download the extension from the official public listing or grab the latest compiled addon from the Releases page and drag-and-drop it onto Firefox

## Installing a dev version (only temporary) :technologist:

- Clone or download the repository
- Execute the makexpi.sh bash script (only works on linux or WSL, you also need inkscape installed)
- Open Firefox and navigate to about:debugging
- Click on the "This Firefox" menu item and select "Load Temporary Add-on"
- Navigate to the .xpi file created earlier and select it
- The add-on is now installed and should appear in the Firefox toolbar

## How to use :thinking:

- Configure the add-on as needed, from the Add-ons options (read Options section)
- Click on the add-on button in the Firefox toolbar
- The add-on will create a pinned tab for accessing the AI Chat
- The button icon can be set according to the user's preference (either the add-on's icon or the website's favicon)
- If a pinned Chat tab already exists, it will be activated instead of creating a new one

## Options :gear:

### To change the shortcut to switch to the Chat tab or the button icon, go to the options page:

- Click on the three horizontal lines in the Firefox toolbar
- Click on "Add-ons"
- Find the add-on and click on the "Options" button
- Update the shortcut or the icon style as needed

## Contributing :handshake:

If you find any bugs or have any suggestions for improvements, please open an issue and write in detail. Pull requests are also welcome.

## License :page_with_curl:

This project is licensed under the GPLv3 License - see the LICENSE file included in this project for details.
See the NOTICE file included in this project for details.
