const express = require('express');
const {validateToken, adminOnly} = require('../jwtAuth');
const shopitems = require('../models/shopitemsSchema');


const router = express.Router();

router.use(validateToken);

// get all shop items
router.get('/', async (req, res) => {
    try {
        const shopItems = await shopitems.find();
        if(!shopItems){
            return res.status(400).json({ message: "failed to get all shop items"});
        }
        return res.status(200).json({ message: " successfull", shopItems: shopItems });
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});

// get shop items by id
router.get('/getById/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const shopItem = await shopitems.findById({_id: id});

        if(!shopItem){
            return res.status(400).json({ message: "failed to get all shop items"});
        }
        return res.status(200).json({ message: " successfull", shopItems: shopItem });
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});


// create a shop item
router.post('/', adminOnly, async (req, res) => {
    try {
        const {name, description, price,  isInStock } = req.body;
        const shopItem = await shopitems.create({
            name:name,
            description:description,
            price:price,
            isInStock: isInStock,
            userId: req.userDetails.id,
        });
        if(!shopItem){
            return res.status(400).json({ message: "failed to create a shop items"}); 
        }
        return res.status(200).json({ message: " successfull", shopItem: shopItem });
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});

//edit a task.
router.patch('/edit-item', adminOnly, async (req, res) => {
    try {
        const { name, description, price, id } = req.body;
        const editItem = await shopitems.findByIdAndUpdate(id, {
            name:name,
            description: description,
            price:price,
        });
        if(!editItem) {
            return res.status(400).json({message: 'failed to update'})
        }
        return res.status(201).json({message: 'updated successfully'})
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});

//delete a shop item.
router.delete('/remove-item', adminOnly, async (req, res) =>{

    try {
        const {id} = req.body;
        const removeItem = await shopitems.findByIdAndDelete(id);
        if(!removeItem){
            return res.status(400).json({message: 'failed to remove'});
        }
        return res.status(200).json({message: 'item deleted successfully'});
    } catch (error) {
        return res.status(500).json(error.message);
    }
 })


module.exports = router;