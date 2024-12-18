const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })

blogsRouter.post('/', async (request, response) => {
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
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  })


blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.patch('/:id', async (request,response) => {
  const blog = {
    likes: request.body.likes
  }
  await Blog.findByIdAndUpdate(request.params.id, blog)
  response.status(201).json(blog)
})

module.exports = blogsRouter