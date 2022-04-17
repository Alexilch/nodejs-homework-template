
const { HTTP_STATUS_CODE } = require('../../libs/constants')
const contactsService = require('../../services/contacts')

const removeContact = async (req, res) => {
  const contact = await contactsService.remove(req.params.contactId, req.user)
  
  return res.json({ status: 'success', code: HTTP_STATUS_CODE.OK, data: { contact }, message: "contact deleted" })
  
}

module.exports = removeContact