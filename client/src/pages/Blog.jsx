import React from 'react'
import { Link } from 'react-router-dom'
import { blogs } from '../assets/data'

const Blog = () => {
  // Defensive check if blogs are empty
  if (!blogs || blogs.length === 0) {
    return (
      <section className="max-padd-container pt-28 pb-16 min-h-screen">
        <h2 className="h2 text-3xl font-bold mb-4">Our Blog</h2>
        <p className="text-gray-500">No blog posts available at the moment.</p>
      </section>
    );
  }

  // Split into featured post (first item) and grid posts (the rest)
  const featuredPost = blogs[0];
  const gridPosts = blogs.slice(1);

  return (
    <section className="max-padd-container pt-28 pb-16 min-h-[80vh] bg-slate-50/50">
      {/* Page Header */}
      <div className="flex flex-col gap-y-4 mb-12 text-center max-w-2xl mx-auto">
        <h2 className="h2 text-4xl font-extrabold text-slate-800">Travel & Rental Insights</h2>
        <p className="text-gray-500 text-lg">
          Discover the latest trends, guides, and tips to make your car rental experience smooth and enjoyable.
        </p>
      </div>

      {/* Featured Blog Post (Hero) */}
      <div className="mb-16">
        <Link to="/blog/0" className="group flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">

          {/* Featured Image */}
          <div className="w-full lg:w-3/5 h-[300px] lg:h-[450px] overflow-hidden relative">
            <span className="absolute top-4 left-4 lg:top-6 lg:left-6 px-4 py-1.5 bg-black/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-full z-10">
              {featuredPost.category}
            </span>
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
          </div>

          {/* Featured Content */}
          <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-sm text-gray-400 mb-4 font-medium">
              <span>Featured Post</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span>5 Min Read</span>
            </div>
            <h3 className="text-2xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-amber-500 transition-colors duration-300">
              {featuredPost.title}
            </h3>
            <p className="text-gray-500 mb-8 leading-relaxed text-lg line-clamp-3">
              {featuredPost.description}
            </p>
            <div className="mt-auto inline-flex items-center gap-2 text-black font-semibold group-hover:gap-3 transition-all duration-300">
              Read Full Article
              <span className="text-lg">→</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-10">
        <h3 className="text-2xl font-bold text-slate-800 whitespace-nowrap">Latest Articles</h3>
        <div className="h-[2px] w-full bg-slate-200 rounded-full"></div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {gridPosts.map((post, index) => (
          <Link key={index} to={`/blog/${index + 1}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 flex flex-col h-full">

            {/* Grid Image */}
            <div className="w-full h-[220px] overflow-hidden relative">
              <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-black shadow-sm text-xs font-bold uppercase tracking-wide rounded-full z-10">
                {post.category}
              </span>
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
            </div>

            {/* Grid Content */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-3 text-xs text-gray-400 mb-3 font-medium">
                <span>Article</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span>3 Min Read</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-500 transition-colors duration-300 line-clamp-2">
                {post.title}
              </h4>
              <p className="text-gray-500 text-sm mb-6 line-clamp-3 flex-grow">
                {post.description}
              </p>

              <div className="mt-auto border-t border-slate-100 pt-4 inline-flex items-center justify-between w-full">
                <span className="text-black font-semibold text-sm">Read Article</span>
                <span className="w-8 h-8 rounded-full bg-slate-50 flexCenter group-hover:bg-black group-hover:text-white transition-colors duration-300">
                  <span className="-rotate-45 block leading-none">→</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Blog