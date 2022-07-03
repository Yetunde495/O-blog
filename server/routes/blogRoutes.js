const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");


             //App routes

router.get("/", blogController.homepage);
router.post("/", blogController.newsletter);
router.get("/post/:id", blogController.explorePost);
router.get("/submit-post", blogController.submitPost);
router.post("/submit-post", blogController.publishPost);
router.get("/submit-chronicle", blogController.submitChronicle);
router.post("/submit-recipe", blogController.publishChronicle);
router.post('/search', blogController.searchPost);
router.get("/about", blogController.aboutPage);
router.get("/blog", blogController.blogPage);


module.exports = router;
