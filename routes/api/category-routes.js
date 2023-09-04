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
    res.json(newCategory)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    // update a category by its `id` value
    let id= req.params.id
    let updatedCategory= await Category.update(req.body, {
      where:{
        id
      }
    })
      res.json(updatedCategory)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // delete a category by its `id` value
    let id= req.params.id
    let deletedCategory= await Category.destroy({
      where: {
        id
      }
    })
    res.json(deletedCategory)
    console.log("Category deleted successfully")
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
