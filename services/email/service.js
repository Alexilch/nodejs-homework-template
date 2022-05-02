const Mailgen = require('mailgen');

class EmailService {
    constructor(sender) {
        this.sender = sender
        this.link = 'https://1fd0-185-244-170-155.eu.ngrok.io'
        this.mailgen = new Mailgen({
            theme: 'default',
            product: {
                name: 'Phonebook app',
                link: this.link,
            },
        })
    }

    createEmailTemplate(username, token) {
        const email = {
            body: {
                name: username,
                intro: `Welcome ${username}! We\'re very excited to have you on board.`,
                action: {
                    instructions: 'To get started with phonebook, please click here:',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Confirm your account',
                        link: `${this.link}/api/auth/verify-email/${token}`,
                    },
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            },
        }
        return this.mailgen.generate(email)
    }

    async sendEmail(email, username, token) {
        const emailTemplate = this.createEmailTemplate(username, token)
        const message = {
            to: email,
            subject: 'Email verification for Phonebook app',
            html: emailTemplate,
        }
            const result = await this.sender.send(message)
            // console.log(result)
            return result
        }
    
}

module.exports = EmailService