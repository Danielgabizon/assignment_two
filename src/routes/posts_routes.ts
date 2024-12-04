// importing Express and creating a Router instance:
import express, { Request, Response } from "express";
const router = express.Router();
// importing the controller functions that will handle the logic for each route.
import postController from "../controllers/posts_controller";
// setting Up the routes:

router.post("/", (req: Request, res: Response) => {
  postController.addNewItem(req, res);
});
router.get("/", (req: Request, res: Response) => {
  postController.getAllItems(req, res);
});
router.get("/:id", (req: Request, res: Response) => {
  postController.getItemById(req, res);
});
router.put("/:id", (req: Request, res: Response) => {
  postController.updateItem(req, res);
});
router.delete("/:id", (req: Request, res: Response) => {
  postController.deleteItem(req, res);
});
//exporting the router so that it can be imported and used in other parts of application. F
export default router;
