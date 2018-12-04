// ServiceResult.js

function ServiceResult(reply, resultCode, resultMessage) {
    this.reply = reply;
    this.resultCode = resultCode;
    this.resultMessage = resultMessage;
}

module.exports = ServiceResult;