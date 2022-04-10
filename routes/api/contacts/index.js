const express = require('express')
const {listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact} = require('../../../controllers/contacts')
const { schemaCreateContact, schemaFavoriteContact,schemaMongoId } = require('./contacts-validation-schemes')
const { validateBody, validateParams } = require('../../../middlewares/validation')
const guard = require('../../../middlewares/guard')
const { wrapper: wrapperError } = require('../../../middlewares/error-handler')
const router = express.Router()

router.get('/', guard, listContacts)
router.get('/:contactId', guard, validateParams(schemaMongoId), wrapperError(getContactById))
router.post('/', guard, validateBody(schemaCreateContact), wrapperError(addContact))
router.delete('/:contactId', guard, validateParams(schemaMongoId), wrapperError(removeContact))
router.put('/:contactId', guard, validateParams(schemaMongoId), wrapperError(updateContact))

router.patch(
  '/:contactId/favorite',
  guard,
  [validateParams(schemaMongoId), validateBody(schemaFavoriteContact)],
  wrapperError(updateContact),
)

module.exports = router
