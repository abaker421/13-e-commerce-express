const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // find all categories
    let categories= await Category.findAll({
      // be sure to include its associated Products
      include: [Product]
    })
    res.json(categories)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
  // find one category by its `id` value
  let id= req.params.id
  let selectedCategory= await Category.findByPk({
    where: {
      id
    },
    // be sure to include its associated Products
    include : [Product]
  })
  res.json(selectedCategory)
} catch(err) {
  res.status(500).json(err)
}
});

router.post('/', async (req, res) => {
  try{
    let newCategory= await Category.create(req.body)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
