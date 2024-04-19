const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get("/",controller.readAllDataset)
router.post("/", controller.createDataset);
router.get("/:id", controller.readDataset);
router.put("/:id", controller.updateDataset);
router.delete("/:id", controller.deleteDataset);
router.patch("/:id",controller.patchDataset);


module.exports = router;
