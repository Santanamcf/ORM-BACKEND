const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const getTag = await Tag.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(getTag);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async(req, res) => {
  try {
    const getTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product}],
    });

    if (!getTag) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(getTag);
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try{
 const tagData = await Tag.create({
    tag_name: req.body.tag_name
  });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
const updateTag = 
 {where: {id: req.params.id}};

const val = {tag_name: req.body.tag_name};
  // update a tag's name by its `id` value

Tag.update(
  val,
  updateTag
).then(data=>{
  res.json(data)
}).catch(err=>{
  res.status(500).json({msg:"error", err})
})
});
router.delete('/:id', async (req, res) => {
  Tag.destroy( {
    where: {
      id: req.params.id,
    }
  }).then(data=>{
    res.json(data)
  }).catch(err=>{
    res.status(500).json({
      msg: "error", err})
    })
  // delete on tag by its `id` value
});

module.exports = router;
