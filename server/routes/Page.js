const express = require('express')
const router = express.Router()
const model = require('../models/model')
const getDate = require('../utils/date')

//test route
router.post('/', async (req, res) => {
    try {
        const data = 'page route'
        res.json(data)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

//THIS IS A GET ROUTE
router.post('/get-page', async (req,res) => {
    try {
        const notebooks = await model.find({name:req.body.notebookName})
        
        const page = notebooks[0].pages.filter((page) => 
            page.name === req.body.pageName
        )

        res.json(page[0])
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

//THIS IS A GET ROUTE
router.post('/get-pages', async (req, res) => {
    try {
        const notebooks = await model.find({name:req.body.notebookName})
        const pages = notebooks[0].pages
        res.json(pages)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

//THIS IS A GET ROUTE
router.post('/get-pages', async (req, res) => {
    try {
        const notebooks = await model.find( { name: { $regex: req.body.notebookName, $options : 'i'} } )
        const pages = notebooks[0].pages.filter((page) => page.name.toLowerCase().startsWith(req.body.prefix.toLowerCase())) 
        
        res.json(pages)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/add-page', async (req,res) => {

    try {

        const notebooks = await model.find({name:req.body.notebookName}) 
        const exists = notebooks[0].pages.filter(page => page.name === req.body.pageName).length > 0;

        if(exists) return res.status(500).send(`page ${req.body.pageName} already exists`)

        const newPage = {
            name: req.body.pageName,
            publishDate: getDate(),
            lastEdited: getDate(),
            content: ''
        }

        notebooks[0].pages.push(newPage) 

        await model.findOneAndUpdate({name:req.body.notebookName}, notebooks[0])

    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/rename-page', async (req,res) => {

    try {

        const notebooks = await model.find({name:req.body.notebookName}) 
        const pages = notebooks[0].pages.filter(page => page.name === req.body.pageName)
        const exists = pages.length > 0;

        if(!exists) return res.status(500).send(`page ${req.body.pageName} doesn't exist`)

        const newPage = pages[0]
        newPage.name = req.body.newPageName
        
        console.log(notebooks[0].pages)
        
        notebooks[0].pages.forEach((page, index) => {
            if(page.name === req.body.pageName) {
                notebooks[0].pages[index] = newPage
            }
        })
        
        console.log(notebooks[0].pages)

        await model.findOneAndUpdate({name:req.body.notebookName}, notebooks[0])

    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/edit-page', async (req,res) => {

    try {
        
        const notebooks = await model.find({name:req.body.notebookName}) 
        const pages = notebooks[0].pages.filter(page => page.name === req.body.pageName)
        const exists = pages.length > 0;

        if(!exists || !req.body.content) return res.status(500).send(`page ${req.body.pageName} doesn't exist`)

        const newPage = pages[0]
        newPage.content = req.body.content 
        
        notebooks[0].pages.forEach((page, index) => {
            if(page.name === req.body.pageName) {
                notebooks[0].pages[index] = newPage
            }
        })
        
        await model.findOneAndUpdate({name:req.body.notebookName}, notebooks[0])

    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/remove-page', async (req,res) => {

    try {
        
        const notebooks = await model.find({name:req.body.notebookName}) 
        const exists = notebooks[0].pages.filter(page => page.name === req.body.pageName).length > 0;

        if(!exists) return res.status(500).send(`page ${req.body.pageName} doesn't exist`)

        notebooks[0].pages = notebooks[0].pages.filter(page => page.name !== req.body.pageName)
        console.log(notebooks[0])

        await model.findOneAndUpdate({name:req.body.notebookName}, notebooks[0])


    } catch(err) {
        res.status(500).json({message: err.message})
    }
})


module.exports = router