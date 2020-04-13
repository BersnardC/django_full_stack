// Utils for helpers and tools
export default {
	// Show alert form Element Ui
	showAlert (title, message, type) {
		this.$message({
          showClose: true,
          message: title + '. ' + message,
          type: type
        });
	}
}