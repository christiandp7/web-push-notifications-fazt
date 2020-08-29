const { Router } = require('express')
const router = Router()

const webpush = require('../webpush')
let pushSubscription;

router.post('/subscription', async (req, res) => {
  console.log(req.body)
  pushSubscription = req.body
  res.status(200).json()


  const payload = JSON.stringify({
    title: 'My custom Notification',
    message: 'Hello World, this is a large message to notification push, this is a latge message papu, yeees this is a large message yeah!'
  })

  try {
    await webpush.sendNotification(pushSubscription, payload)
  } catch (error) {
    console.log(error)
  }
  
})



module.exports = router