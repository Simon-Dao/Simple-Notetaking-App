const express = require('express')
const router = express.Router()
const model = require('../models/model')
const getDate = require('../utils/date')

//test route
router.post('/', async (req, res) => {
    try {
        const data = 'notebook route'
        res.json(data)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

//THIS IS A GET ROUTE
router.post('/get-notebook', async (req,res) => {
    try {

        console.log(req.body)
        console.log(req.params)
        const notebooks = await model.find({name:req.body.notebookName})
        res.json(notebooks[0])
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

//THIS IS A GET ROUTE
router.post('/get-notebooks', async (req, res) => {
    try {
        const notebooks = await model.find({})
        res.json(notebooks)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

//THIS IS A GET ROUTE
router.post('/get-notebooks', async (req, res) => {
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

        if(exists) return res.status(500).send(`notebook ${req.body.notebookName} already exists`)


        console.log(req.body)

        model.create({
            name: req.body.notebookName,
            color: req.body.color,
            publishDate: getDate(),
            lastEdited: getDate(),
            pages: []
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
        console.log(err)
    }
})

router.post('/remove-notebook', async (req,res) => {

    try {

        console.log(req.body)
        const notebooks = await model.find({name:req.body.notebookName}) 
        const exists = notebooks.length > 0;

        if(!exists) return res.status(500).send(`notebook ${req.body.notebookName} doesn't exists`)

        await model.findOneAndDelete({name:req.body.notebookName})

    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router