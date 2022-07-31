// File Manager functions.
const { dialog } = require('electron')

async function handleFileOpen (window, options) {
  const { canceled, filePaths } = await dialog.showOpenDialog(window, options)
  // If the user cancels the operation then just cancel.
  if (canceled) {
    return ''
  } else {
    // Otherwise return the filepath.
    return filePaths[0]
  }
}

async function handleFileSave (window, options) {
  const { canceled, filePath } = await dialog.showSaveDialog(window, options)
  // If the user cancels the operation then just cancel.
  if (canceled) {
    return ''
  } else {
    // Otherwise return the filepath.
    return filePath
  }
}

module.exports = {
  handleFileOpen,
  handleFileSave
}
