const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const getCategories = await Category.findAll({
      include: [Product],
    });
    res.status(200).json(getCategories);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});
  // find all categories
  // be sure to include its associated Products


router.get('/:id', async (req, res) => {
  try {
    const getCategories = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });

    if (!getCategories) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }

    res.status(200).json(getCategories);
  } catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  Category.create({
    category_name: req.body.category_name
  }).then(data=>{
    res.json(data)
  }).catch(err=>{
    res.status(500).json({msg: "error", err})
  })
});
  // create a new category


router.put('/:id', async (req, res) => {
  const updateCategory = 
 {where: {id: req.params.id}};

const val = {category_name: req.body.category_name};
  // update a tag's name by its `id` value

Category.update(
  val,
  updateCategory
).then(data=>{
  res.json(data)
}).catch(err=>{
  res.status(500).json({msg:"error", err})
})
})
  // update a category by its `id` value


router.delete('/:id', async (req, res) => {
  Category.destroy( {
    where: {
      id: req.params.id,
    }
  }).then(data=>{
    res.json(data)
  }).catch(err=>{
    res.status(500).json({
      msg: "error", err})
    })
  });
  // delete a category by its `id` value


module.exports = router;
