const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    let tags= await Tag.findAll({
      include: [Product]
    })
    res.json(tags)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    let id= req.params.id
    let selectedTag= await Tag.findByPk(id, {
      include: [Product]
    })
    res.json(selectedTag)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    let newTag= await Tag.create(req.body)
    res.json(newTag)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    let id= req.params.id
    let updatedTag= await Tag.update(req.body, {
      where: {
        id
      }
    })
    res.json(updatedTag)
    console.log("Tag updated successfully")
  } catch(err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    let id= req.params.id
    let deletedTag= await Tag.destroy({
      where: {
        id
      }
    })
    res.json(deletedTag)
    console.log("Tag deleted successfully")
  } catch(err) {
    res.status(500).json(err)
  }
});

module.exports = router;
