require('../models/database');
const Category = require('../models/Category');
const Blogpost = require('../models/Post');
const Chronicle = require('../models/Chronicle');
const https = require("https");







exports.homepage = async(req, res) => {
  try {

  const limitNumber = 3;
  const latest = await Blogpost.find().sort({_id: -1}).limit(limitNumber);
  const beans = await Blogpost.find({ 'title': 'Beans: King of Nigerian Delicacies?'});
  const featured = await Blogpost.find().sort().limit(limitNumber);
  const snacks = await Blogpost.find({ 'categories': 'Snack Relief'}).limit(limitNumber);
  const recipe = await Blogpost.find({ 'categories': 'Recipes' }).sort({_id: -1}).limit(limitNumber);
  const drinks = await Blogpost.find({ 'categories': 'Drinks' }).sort({_id: -1}).limit(limitNumber);
  const foodieChronicle = await Chronicle.find().sort({_id: -1}).limit(limitNumber);

 const food = {recipe, drinks, snacks, foodieChronicle};

  res.render("index", { latest, featured, food, beans});

  } catch (error) {
    console.log(error);
  }

}

exports.aboutPage = async(req, res) => {

  res.render("about" );
}

exports.blogPage = async(req, res) => {
    const allPosts = await Blogpost.find().sort({_id: -1});
  res.render("blog", {allPosts});
}

exports.searchPost = async(req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let post = await Blogpost.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
    res.render('search', { post } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }

}

exports.explorePost = async(req, res) => {
  try {
    let recipeId = req.params.id;
    const post = await Blogpost.findById(recipeId);

    res.render("post", {post});
  } catch (error) {
    console.log(error);
  }
}

exports.submitPost = async(req, res) => {
  try {
    const infoErrors = req.flash('infoErrors');
    const infoSubmit = req.flash('infoSubmit');
    res.render('submit-post', { infoErrors, infoSubmit  } );
  } catch (error) {
    console.log(error);
  }

}



exports.publishPost = async(req, res) => {
  try {



    let imageUploadFile;
    let secondImageUploadFile;
    let thirdImageUploadFile;

    let uploadPath;
    let secondUploadPath;
    let thirdUploadPath;


    let newImageName;


    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files were uploaded.');
    } else {

      imageUploadFile = req.files.image;
      secondImageUploadFile = req.files.secondimage;
      thirdImageUploadFile = req.files.thirdimage;


      newImageName = Date.now() + imageUploadFile.name;
      secondImageName = Date.now() + secondImageUploadFile.name;
      thirdImageName = Date.now() + thirdImageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
      secondUploadPath = require('path').resolve('./') + '/public/uploads/' + secondImageName;
      thirdUploadPath = require('path').resolve('./') + '/public/uploads/' + thirdImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.satus(500).send(err);
      });

      secondImageUploadFile.mv(secondUploadPath, function(err) {
        console.log(err);
      });

      thirdImageUploadFile.mv(thirdUploadPath, function(err) {
        console.log(err);
      });

    }

    const newPost = new Blogpost({
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      secondContent: req.body.secondcontent,
      thirdContent: req.body.lastcontent,
      categories: req.body.categories,
      image: newImageName,
      secondImage: secondImageName,
      thirdImage: thirdImageName,
      date: req.body.postDate,
    });

    await newPost.save();

    req.flash('infoSubmit', 'Post has been Published.')
    res.redirect('/');
  } catch (error) {
    // res.json(error);
  //  req.flash('infoErrors', error)
      console.log(error);
    res.redirect('/submit-post');
  }
}

exports.submitChronicle = async(req, res) => {
  try {
    const infoErrors = req.flash('infoErrors');
    const infoSubmit = req.flash('infoSubmit');
    res.render('submit-chronicle', { infoErrors, infoSubmit  } );
  } catch (error) {
    console.log(error);
  }
}

exports.publishChronicle = async(req, res) => {
  const newChronicle = new Chronicle({
    name: req.body.name,
    foodsummary: req.body.foodsumary,
    foodstory: req.body.foodstory,
  });

  await newChronicle.save();

  req.flash('infoSubmit', 'Your food story has been published')
  res.redirect('/chronicle');
} //catch (error) {
  //console.log(error);
  //res.redirect('/submit-chronicle');
//}


//Newsletter controllers

exports.newsletter = async(req, res) => {
  try {
    const firstName = req.body.fName;
    const email = req.body.email;


  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
        }}],
    update_existing:false
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us5.api.mailchimp.com/3.0/lists/3c06b60d07"
  const options = {
    method: "POST",
    auth: "Morenikeji48:863b96db0a758b7dfb61d9c230f0b69d-us5"
  };


  const request = https.request(url, options, function(response){
    if (response.statusCode === 200) {
      res.write("<h1>Successfully subscribed to Olounjeiya Newsletter</h1>");
    } else {
      res.write("Failed to subscribe to Olounjeiya Newsletter");
    }

  res.send();
  response.on("data", function(data){
    console.log(JSON.parse(data));
      })
  });

  request.write(jsonData);
  request.end();

  } catch(error) {
    console.log(error);
  }
}
