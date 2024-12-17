const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })

blogsRouter.post('/', (request, response) => {
    let blog = new Blog(request.body)
    if(!request.body.title || !request.body.author){
      return response.status(400).json({
        error: 'content missing'
      })
    }

    if(!request.body.likes){
      request.body.likes = 0
      blog = new Blog(request.body)
    }
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

module.exports = blogsRouter