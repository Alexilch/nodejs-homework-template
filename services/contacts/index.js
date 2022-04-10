const Contacts = require('../../repository/Contacts')
const { HTTP_STATUS_CODE } = require('../../libs/constants')
const { CustomError } = require('../../middlewares/error-handler')

class ContactsService {
  async getAll(query, user) {
   const contacts = await Contacts.listContacts(query, user)
    return contacts
  }

  async getById(id, user) {
    const contact = await Contacts.getContactById(id, user)
    if (!contact) {
      throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, 'Not Found')
    }
    return contact
  }

  async create(body, user) {
    const contact = await Contacts.addContact(body, user)
    return contact
  }

  async update(id, body, user) {
    const contact = await Contacts.updateContact(id, body, user)
    if (!contact) {
      throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, 'Not Found')
    }
    return contact
  }

  async remove(id, user) {
    const contact = await Contacts.removeContact(id, user)
    if (!contact) {
      throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, 'Not Found')
    }
    return contact
  }
}

module.exports = new ContactsService()