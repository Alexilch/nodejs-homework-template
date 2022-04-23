const { link } = require('fs');
const Mailgen = require('mailgen');

class EmailService {
    constructor(sender) {
        this.link = 'http://localhost:3000/'
        this.sender = sender
        this.mailgen = new Mailgen({
            theme: 'default',
            product: {
                name: 'Alexander',
                link: this.link,
            }
        })
    }

    createEmailTemplate(username, verificationToken) {
        const email = {
            body: {
                name: username,
                intro: `Welcome ${username}! We\'re very excited to have you on board.`,
                action: {
                    instructions: 'To get started with phonebook, please click here:',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Confirm your account',
                        link: `${this.link}/api/auth/verify-email/${verificationToken}`,
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        };
        return this.mailgen.generate(email)
    }

    async sendEmail(email, username, verificationToken) {
        const emailTemplate = this.createEmailTemplate(username, verificationToken)
        const message = {
            to: email,
            subject: 'Email verification for Phonebook app',
            html: emailTemplate
        }
        
        try {
            const result = await this.sender.send(message)
            console.log(result)
            return true
        } catch(error) {
            console.log(error)
            return false
        }
    }
}

module.exports = EmailService