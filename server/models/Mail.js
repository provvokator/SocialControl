class Mail {
    constructor(from,to,subject,text) {
        this.from = from||"";
        this.to = to ||"";
        this.subject = subject ||"";
        this.text = text ||"";
    }
}

module.exports = Mail;