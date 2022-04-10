
const { HTTP_STATUS_CODE } = require('../../libs/constants')
const contactsService = require('../../services/contacts')

const addContact = async (req, res) => {
  const contact = await contactsService.create(req.body, req.user)
   res.status(HTTP_STATUS_CODE.CREATED).json({ 
     status: 'success', 
     code: HTTP_STATUS_CODE.CREATED, 
     data: { contact } })
}

module.exports = addContact