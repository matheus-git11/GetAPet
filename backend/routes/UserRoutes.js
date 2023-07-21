const router = require("express").Router();
const UserController = require("../controllers/UserController");

//middleware
const verifyToken = require("../helpers/verify-token");
const { imageUpload } = require("../helpers/image-upload");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUserById);
router.patch(
  "/edit/:id",
  verifyToken,  //usando middleware para protecao de rota
  imageUpload.single("image"), //vou receber uma unica imagem e o campo é denominado single
  UserController.editUser
); 

module.exports = router;
