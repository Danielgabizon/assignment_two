import Posts from "../models/posts_model";
import BaseController from "./base_controller";

const postController = new BaseController(Posts);

export default postController;
