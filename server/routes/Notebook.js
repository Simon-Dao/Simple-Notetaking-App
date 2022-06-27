const express = require('express')
const router = express.Router()
const model = require('../models/model')
const getDate = require('../utils/date')

//test route
router.get('/', async (req, res) => {
    try {
        const data = 'notebook route'
        res.json(data)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/get-notebook', async (req,res) => {
    try {
        const notebooks = await model.find({name:req.body.notebookName})
        res.json(notebooks[0])
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/get-notebooks', async (req, res) => {
    try {
        const notebooks = await model.find({})
        res.json(notebooks)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/get-notebooks', async (req, res) => {
    try {
        const notebooks = await model.find( { name: { $regex: req.body.prefix, $options : 'i'} } )
        res.json(notebooks)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/add-notebook', async (req,res) => {

    try {
        const exists = await (await model.find({name: req.body.notebookName})).length > 0;

        if(exists) return res.status(500).send(`notebook ${req.body.name} already exists`)

        model.create({
            name: req.body.notebookName,
            publishDate: getDate(),
            lastEdited: getDate(),
            page: []
        })

    } catch(err) {
        res.status(500).json({message: err.message})
    }

})

router.post('/rename-notebook', async (req,res) => {

    try {

        const notebooks = await model.find({name:req.body.notebookName}) 
        const exists = notebooks.length > 0;

        if(!exists) return res.status(500).send(`notebook ${req.body.notebookName} doesn't exist`)

        const newNotebook = notebooks[0]
        newNotebook.name = req.body.newNotebookName

        await model.findOneAndUpdate({name:req.body.notebookName}, newNotebook)

    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/remove-notebook', async (req,res) => {

    try {

        const notebooks = await model.find({name:req.body.notebookName}) 
        const exists = notebooks.length > 0;

        if(!exists) return res.status(500).send(`notebook ${req.body.notebookName} doesn't exists`)

        await model.findOneAndDelete({name:req.body.notebookName})

    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router