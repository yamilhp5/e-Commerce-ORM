const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(categoryData)
  } catch(err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {

  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if (!categoryData) {
      res.status(400).json({message:'Not found with this ID'});
      return;
    }
    res.status(200).json(categoryData);
    
  } catch(err){
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new category
});

router.put('/:id', async (req, res) => {

  await Category.update(req.body,{
    where: {
      id: req.params.id,
    },
  })
  .then((category) => {
    res.status(200).json(category);
  }) .catch((err)=>{
    console.log(err);
    res.status(400).json(err);
  })
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {

  const categoryData = Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then(categoryData => res.status(200).json(categoryData))
  .catch((err)=>{
    res.status(500).json(err)
  })

  // delete a category by its `id` value
});

module.exports = router;
