const commandName = "_execute_browser_action";

// Update the user interface
async function updateUI() {
  try {
    // Update the keyboard shortcut textbox.
    let commands = await browser.commands.getAll();
    for (let command of commands) {
      if (command.name === commandName) {
        document.querySelector("#shortcut").value = command.shortcut;
      }
    }

    // Update the favicon option radio buttons.
    let { faviconOption } = await browser.storage.local.get("faviconOption");
    if (faviconOption === "addon") {
      document.querySelector('input[value="addon"]').checked = true;
    } else {
      document.querySelector('input[value="website"]').checked = true;
    }
  } catch (error) {
    console.error("Error updating UI:", error);
  }
}

// Update the keyboard shortcut based on the value in the textbox.
async function updateShortcut() {
  try {
    await browser.commands.update({
      name: commandName,
      shortcut: document.querySelector("#shortcut").value,
    });
  } catch (error) {
    console.error("Error updating shortcut:", error);
  }
}

// Update the favicon option based on the radio button selection.
async function updateFaviconOption() {
  try {
    await browser.storage.local.set({
      faviconOption: document.querySelector(
        'input[name="favicon-option"]:checked'
      ).value,
    });
  } catch (error) {
    console.error("Error updating favicon option:", error);
  }
}

// Reset shortcut and update textbox.
async function resetShortcut() {
  try {
    await browser.commands.reset(commandName);
    updateUI();
  } catch (error) {
    console.error("Error resetting shortcut:", error);
  }
}

// Update the UI on page load
document.addEventListener("DOMContentLoaded", updateUI);

// Handle changes
document
  .querySelector("#shortcut-update")
  .addEventListener("click", updateShortcut);
document
  .querySelector("#shortcut-reset")
  .addEventListener("click", resetShortcut);
document
  .querySelectorAll('input[name="favicon-option"]')
  .forEach((input) => input.addEventListener("change", updateFaviconOption));
