import { Request, Response } from "express";

class BaseController {
  model: any;
  constructor(model: any) {
    this.model = model;
  }
  async addNewItem(req: Request, res: Response): Promise<Response> {
    try {
      const item = await this.model.create(req.body);
      return res.status(200).send({ status: "Success", data: item });
    } catch (err) {
      return res.status(400).send({ status: "Error", message: err.message });
    }
  }

  async getAllItems(req: Request, res: Response): Promise<Response> {
    try {
      const filter = req.query;
      let items = [];
      if (filter.sender) {
        // if the query string contains a sender id, filter the data by that sender
        items = await this.model.find({ sender: filter.sender });
      } else {
        // if there is no sender in the query string, get all data
        items = await this.model.find();
      }
      return res.status(200).send({ status: "Success", data: items });
    } catch (err) {
      return res.status(400).send({ status: "Error", message: err.message });
    }
  }

  async getItemById(req: Request, res: Response) {
    try {
      const itemId = req.params.id;
      const item = await this.model.findById(itemId);
      if (!item) {
        return res
          .status(404)
          .send({ status: "Error", message: "item not found" });
      }
      return res.status(200).send({ status: "Success", data: item });
    } catch (err) {
      return res.status(400).send({ status: "Error", message: err.message });
    }
  }
  async updateItem(req: Request, res: Response) {
    try {
      const itemId = req.params.id;
      const updateContent = req.body;
      // Update the item and return the updated document
      const updatedItem = await this.model.findByIdAndUpdate(
        itemId, // The ID of the item to update
        updateContent, // The content to update
        { new: true, runValidators: true } // Options: return the updated document and validate the update
      );
      if (!updatedItem) {
        return res
          .status(404)
          .send({ status: "Error", message: "item not found" });
      }
      return res.status(200).send({ status: "Success", data: updatedItem });
    } catch (err) {
      return res.status(400).send({ status: "Error", message: err.message });
    }
  }
  async deleteItem(req: Request, res: Response) {
    try {
      const itemId = req.params.id;
      const item = await this.model.findByIdAndDelete(itemId);
      if (!item) {
        return res
          .status(404)
          .send({ status: "Error", message: "item not found" });
      }
      return res.status(200).send({ status: "Success", data: "" });
    } catch (err) {
      return res.status(400).send({ status: "Error", message: err.message });
    }
  }
}

export default BaseController;
