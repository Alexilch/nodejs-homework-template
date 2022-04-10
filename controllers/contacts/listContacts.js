// const contactsRepository = require('../../repository/contacts')
const { HTTP_STATUS_CODE } = require('../../libs/constants')
const contactsService = require('../../services/contacts')

const listContacts = async (req, res) => {
  const contacts = await contactsService.getAll(req.query, req.user)
   res.json({ 
      status: 'success',
      code: HTTP_STATUS_CODE.OK,
      data: { contacts },
     })
}

module.exports = listContacts