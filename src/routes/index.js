const { Router } = require('express')
const router = Router()

const webpush = require('../webpush')
let pushSubscription;

router.post('/subscription', async (req, res) => {
  console.log(req.body)
  pushSubscription = req.body
  res.status(200).json()
  
})

router.post('/new-message', async (req, res) => {

  const { message } = req.body;

  const payload = JSON.stringify({
    title: 'New Custom Notification',
    message: message
  })

  try {
    await webpush.sendNotification(pushSubscription, payload)
  } catch (error) {
    console.log(error)
  }
})


module.exports = router