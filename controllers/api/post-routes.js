const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

// URL: api/post
router.post('/', withAuth, async (req, res) => {
  const body = req.body;
  console.log("Post: api/post/");
  console.log(req.session);
  try {
    const newPost = await Post.create({
      // TODO: POST BODY SENT IN REQUEST. HINT USING SPREAD 
      ...body,
      // TODO: SET USERID userId TO LOGGEDIN USERID
      userId: req.session.userId
    });
    res.json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  console.log("Put: api/post/:id");
  try {
    const [affectedRows] = await Post.update(req.body, {
      // TODO: SET ID TO ID PARAMETER INSIDE WHERE CLAUSE CONDITION FIELD
      where: {id: req.params.id}
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  console.log("Delete: api/post/:id");
  try {
    const [affectedRows] = await Post.destroy({
      // TODO: SET ID TO ID PARAMETER INSIDE WHERE CLAUSE CONDITION FIELD
      where: {id: req.params.id}
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
