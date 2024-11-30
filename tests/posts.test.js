const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const postsModel = require("../models/posts_model");
const e = require("express");

const testPost = [
  {
    sender: 111,
    title: "Test title 1",
    content: "Test content 1",
  },
  {
    sender: 222,
    title: "Test title 2",
    content: "Test content 2",
  },
];
beforeAll(async () => {
  console.log("Before all tests");
  await postsModel.deleteMany();
});

afterAll(() => {
  console.log("After all tests");
  mongoose.connection.close();
});

describe("Posts test", () => {
  test("Create post", async () => {
    for (let post of testPost) {
      const response = await request(app).post("/posts").send(post);
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("Success");
      expect(response.body.data.sender).toBe(post.sender);
      expect(response.body.data.title).toBe(post.title);
      expect(response.body.data.content).toBe(post.content);
      post._id = response.body.data._id;
    }
  });
  test("Create post fail", async () => {
    const post = {
      sender: 111,
      title: "Test title 1",
    };
    const response = await request(app).post("/posts").send(post);
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe("Error");
  });
  test("Get all posts", async () => {
    const response = await request(app).get("/posts");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("Success");
    expect(response.body.data.length).toBe(testPost.length);
  });
  test("Get post by id", async () => {
    const post = testPost[0];
    const response = await request(app).get(`/posts/${post._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("Success");
    expect(response.body.data._id).toBe(post._id);
    expect(response.body.data.sender).toBe(post.sender);
    expect(response.body.data.title).toBe(post.title);
    expect(response.body.data.content).toBe(post.content);
  });
  test("Test filter by sender", async () => {
    const post = testPost[0];
    const response = await request(app).get(`/posts?sender=${post.sender}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("Success");
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].sender).toBe(111);
  });
  test("Test Delete post", async () => {
    const post = testPost[0];
    const response = await request(app).delete(`/posts/${post._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("Success");
    const response2 = await request(app).get(`/posts/${post._id}`);
    expect(response2.statusCode).toBe(404);
    expect(response2.body.status).toBe("Error");
  });
});
