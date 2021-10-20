const express = require('express');
const router = express.Router();
const Auther = require('../models/auther')

// all authers routes
router.get('/', async (req,res) => {
    let serachOption = {}
    if(req.query.name !== null && req.query.name !== ''){
        serachOption.name = new RegExp(req.query.name, 'i')
        
    }
    try{
        const authers = await Auther.find(serachOption)
        res.render('authers/index',{
            authers:authers,
            serachOption: req.query
        })
    }catch{
        res.redirect('/')
    }
  
})

// new auther route
router.get('/new',(req,res) => {
    res.render('authers/new')
})

// new auther post route
router.post('/', async (req,res) => {
   
    try{
        const {name} = req.body
        const user =  new Auther({name})
        const username = await user.save();
            res.render('authers',{message:"Data successfuly intered"})
    }catch{
        res.render('authers/new',{errorMessage:"something going wrong"})
    }
})

module.exports = router