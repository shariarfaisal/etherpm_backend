const router = require('express').Router()
const {
  createTokenListing,
  getTokenListings,
  tokenListingById,
  deleteTokenListing
} = require('../controllers/tokenListing')
const userAuth = require('../middlewares/userAuth')
const { adminAuth } = require('../middlewares/adminAuth')

router.get('/', adminAuth, getTokenListings)
router.get('/:id', adminAuth, tokenListingById)
router.post('/',userAuth, createTokenListing)
router.delete('/:id',adminAuth, deleteTokenListing)

module.exports = router
