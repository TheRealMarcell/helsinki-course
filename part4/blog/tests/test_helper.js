const Blog = require('../models/blog')

const initialBlogs = [
    {
      "title": "Why rod wave is the greatest of all time",
      "author": "Marcellus Simanjuntak",
      "url": "x.com",
      "likes": 1000,
    },
    {
      "title": "Why rod wave sucks ass",
      "author": "Marcellus Simanjuntak",
      "url": "x.com",
      "likes": 4,
    },
    {
      "title": "Dark Lane Demo Tapes",
      "author": "Marcellus Simanjuntak",
      "url": "x.com",
      "likes": 1700,
    },
    {
      "title": "Don Toliver Glazing Article",
      "author": "Marcellus Simanjuntak",
      "url": "x.com",
      "likes": 1740,
    },
    {
      "title": "Graduation Album Review",
      "author": "Marcellus Simanjuntak",
      "url": "x.com",
      "likes": 69,
    }
  ]


  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
  }

  module.exports = {
    initialBlogs, blogsInDb
  }