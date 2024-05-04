const router = require('express').Router();
const e = require('express');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll ({
      include: [{model: Product, through: ProductTag, as: 'productTag_products'}]

    });
    res.status(200).json(tagData); 
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id,{
      include:[{model: Product, through:ProductTag, as: 'productTag_products'}]
    });
    if (!tagData){
      res.status(400).json({message: 'No product found with this ID'});
      return;
    }
    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
    // create a new tag
    try {
      const tagData = await Tag.create(req.body);
      res.status(200).json(tagData);

    } catch (err){
      res.status(400).json(err);
    }
    
});

router.put('/:id', async (req, res) => {
  Tag.update(req.body,{
    where: {
      id: req.params.id,
    }, 
  })
  .then((tag)=>{
    res.status(200).json(tag);
  }) .catch((err)=>{
    console.log(err);
    res.status(400).json(err);
  });
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try{
    const tagData = await Tag.destroy({
      where:{
        id: req.params.id
      }
    }); 
    if(!tagData){
      res.status(404).json({message:'Not found!'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
