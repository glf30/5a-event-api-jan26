const express = require('express')
const router = express.Router()

const { createEvent, getEvents, getEventByID } = require('./event-controller')

router.get('/', async (req, res) => {
  try {
    const events = await getEvents()
    res.json({
      message: 'success',
      payload: events
    })
  } catch (error) {
    res.status(500).json({
      message: 'failure',
      payload: error.message
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const event = await getEventByID(req.params.id)
    res.json({
        message: "success",
        payload: event
    })
  } catch (error) {
    res.status(500).json({
      message: 'failure',
      payload: error.message
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const newEvent = await createEvent(req.body)
    res.json({
      message: 'success',
      payload: newEvent
    })
  } catch (error) {
    res.status(500).json({
      message: 'failure',
      payload: error.message
    })
  }
})

module.exports = router