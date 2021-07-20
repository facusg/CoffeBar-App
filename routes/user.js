const { Router } = require("express");
const {
  loginGet,
  loginPost,
  loginPut,
  loginDelete,
} = require("../controllers/userController");
const router = Router();

router.get("/login", loginGet);
router.post("/login", loginPost);
router.put("/login/:id", loginPut);
router.delete("/login", loginDelete);

module.exports = router;
