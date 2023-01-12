const express = require('express');
const partControllers = require('../../controllers/part.controller');
const { limiter } = require('../../middleware/limiter');
const viewCount = require('../../middleware/viewCount');

const router = express.Router();


// router.get("/", (req, res) => {
//     res.send('parts found')
// })


// router.post("/", (req, res) => {
//     res.send("parts added")
// })




router
    .route("/")

    /**
       * @api {get} /part All parts
       * @apiDescription Get all the parts
       * @apiPermission admin
       *
       * @apiHeader {String} Authorization   User's access token
       *
       * @apiParam  {Number{1-}}         [page=1]     List page
       * @apiParam  {Number{1-100}}      [limit=10]  Users per page
       *
       * @apiSuccess {Object[]} all the tools.
       *
       * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
       * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
       */
    .get(partControllers.getAllPart)


    /**
    * @api {post} /part save a part
    * @apiDescription send a part
    * @apiPermission admin
    *
    * @apiHeader {String} Authorization   User's access token
    *
    * @apiParam  {Number{1-}}         [page=1]     List page
    * @apiParam  {Number{1-100}}      [limit=10]  Users per page
    *
    * @apiSuccess {Object[]} all the tools.
    *
    * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
    * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
    */
    .post(partControllers.saveAllPart);


router.route("/:id").get(viewCount, limiter, partControllers.getPartDetail);

module.exports = router;