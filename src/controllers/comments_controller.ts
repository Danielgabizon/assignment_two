import Comments from "../models/comments_model";
import BaseController from "./base_controller";

const commentController = new BaseController(Comments);

export default commentController;
