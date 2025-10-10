const blogPosts = [
  {
    title: 'The Future of Digital Transformation in 2024',
    excerpt:
      'Exploring emerging trends and technologies that will shape the digital landscape in the coming year.',
    author: 'Sarah Johnson',
    date: 'January 15, 2024',
    readTime: '8 min read',
    category: 'Digital Transformation',
    tags: ['AI', 'Cloud Computing', 'Automation', 'Innovation'],
    featured: true,
    content:
      'Digital transformation continues to evolve rapidly, with 2024 bringing new opportunities and challenges for businesses worldwide...',
  },
  {
    title: 'Data-Driven Decision Making: A Complete Guide',
    excerpt:
      'Learn how to leverage analytics and business intelligence to make informed strategic decisions.',
    author: 'Michael Chen',
    date: 'January 10, 2024',
    readTime: '12 min read',
    category: 'Analytics',
    tags: ['Data Analytics', 'Business Intelligence', 'KPIs', 'Strategy'],
    featured: false,
    content:
      "In today's competitive business environment, data-driven decision making has become essential for success...",
  },
  {
    title: 'Building Resilient Supply Chains in Uncertain Times',
    excerpt:
      'Strategies for creating robust and adaptable supply chain operations that can weather any storm.',
    author: 'David Rodriguez',
    date: 'January 5, 2024',
    readTime: '10 min read',
    category: 'Operations',
    tags: ['Supply Chain', 'Risk Management', 'Resilience', 'Operations'],
    featured: false,
    content:
      'Supply chain resilience has become a critical focus for organizations facing unprecedented challenges...',
  },
  {
    title: 'The ROI of Process Automation: Real Numbers',
    excerpt:
      'Quantifying the benefits of automation with real-world examples and measurable outcomes.',
    author: 'Lisa Wang',
    date: 'December 28, 2023',
    readTime: '6 min read',
    category: 'Automation',
    tags: ['Automation', 'ROI', 'Efficiency', 'Process Improvement'],
    featured: false,
    content:
      'Process automation delivers measurable returns on investment across various business functions...',
  },
  {
    title: 'Cybersecurity in the Age of Remote Work',
    excerpt:
      'Essential security measures and best practices for protecting distributed teams and data.',
    author: 'James Thompson',
    date: 'December 20, 2023',
    readTime: '9 min read',
    category: 'Security',
    tags: ['Cybersecurity', 'Remote Work', 'Data Protection', 'Best Practices'],
    featured: false,
    content:
      'Remote work has fundamentally changed how we approach cybersecurity and data protection...',
  },
  {
    title: 'Customer Experience Transformation: Beyond the Basics',
    excerpt:
      'Advanced strategies for creating exceptional customer experiences that drive loyalty and growth.',
    author: 'Maria Garcia',
    date: 'December 15, 2023',
    readTime: '11 min read',
    category: 'Customer Experience',
    tags: ['CX', 'Customer Journey', 'Personalization', 'Loyalty'],
    featured: false,
    content:
      'Exceptional customer experience goes beyond basic satisfaction to create lasting relationships...',
  },
  {
    title: 'AI and Machine Learning in Business Operations',
    excerpt:
      'How artificial intelligence is revolutionizing business processes and operational efficiency.',
    author: 'Alex Patel',
    date: 'December 10, 2023',
    readTime: '13 min read',
    category: 'AI & ML',
    tags: ['Artificial Intelligence', 'Machine Learning', 'Business Operations', 'Efficiency'],
    featured: false,
    content:
      'Artificial intelligence and machine learning are transforming how businesses operate and compete...',
  },
  {
    title: 'Sustainable Business Practices for the Modern Enterprise',
    excerpt: 'Integrating environmental responsibility with business growth and profitability.',
    author: 'Emma Wilson',
    date: 'December 5, 2023',
    readTime: '7 min read',
    category: 'Sustainability',
    tags: ['Sustainability', 'ESG', 'Green Business', 'Corporate Responsibility'],
    featured: false,
    content:
      'Sustainable business practices are no longer optional but essential for long-term success...',
  },
  {
    title: 'The Evolution of Digital Marketing Strategies',
    excerpt: 'Modern approaches to digital marketing that drive engagement and conversion.',
    author: 'Ryan Kim',
    date: 'November 30, 2023',
    readTime: '9 min read',
    category: 'Marketing',
    tags: ['Digital Marketing', 'Social Media', 'SEO', 'Content Strategy'],
    featured: false,
    content:
      'Digital marketing continues to evolve with new platforms, technologies, and consumer behaviors...',
  },
];

function InstagramPost({ post }: { post: (typeof blogPosts)[0]; index: number }) {
  return (
    <div className='bg-black border border-gray-800 rounded-lg overflow-hidden'>
      {/* Post Header */}
      <div className='flex items-center justify-between p-3 md:p-4 border-b border-gray-800'>
        <div className='flex items-center gap-2 md:gap-3 min-w-0 flex-1'>
          <div className='w-7 h-7 md:w-8 md:h-8 bg-gold rounded-full flex items-center justify-center flex-shrink-0'>
            <span className='text-black text-xs md:text-sm font-bold'>
              {post.author
                .split(' ')
                .map(n => n[0])
                .join('')}
            </span>
          </div>
          <div className='min-w-0 flex-1'>
            <div className='flex items-center gap-1 md:gap-2'>
              <span className='text-white font-semibold text-sm md:text-base truncate'>
                {post.author}
              </span>
              {post.featured && (
                <span className='w-1 h-1 bg-gold rounded-full flex-shrink-0'></span>
              )}
            </div>
            <span className='text-gray-400 text-xs md:text-sm truncate'>{post.category}</span>
          </div>
        </div>
        <button className='text-white hover:text-gold transition-colors flex-shrink-0 ml-2'>
          <svg
            className='w-4 h-4 md:w-5 md:h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
            />
          </svg>
        </button>
      </div>

      {/* Post Content */}
      <div className='p-3 md:p-4 space-y-3 md:space-y-4'>
        <h3 className='text-white font-semibold text-base md:text-lg leading-tight'>
          {post.title}
        </h3>

        <p className='text-gray-300 text-sm leading-relaxed'>{post.excerpt}</p>

        {/* Tags */}
        <div className='flex flex-wrap gap-1 md:gap-2'>
          {post.tags.slice(0, 4).map((tag, tagIndex) => (
            <span key={tagIndex} className='text-gold text-xs md:text-sm font-medium'>
              #{tag.toLowerCase().replace(/\s+/g, '')}
            </span>
          ))}
        </div>
      </div>

      {/* Post Actions */}
      <div className='px-3 md:px-4 py-3 border-t border-gray-800'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3 md:gap-6'>
            <button className='flex items-center gap-1 md:gap-2 text-white hover:text-red-500 transition-colors'>
              <svg
                className='w-5 h-5 md:w-6 md:h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                />
              </svg>
              <span className='text-xs md:text-sm hidden sm:inline'>Like</span>
            </button>
            <button className='flex items-center gap-1 md:gap-2 text-white hover:text-blue-400 transition-colors'>
              <svg
                className='w-5 h-5 md:w-6 md:h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                />
              </svg>
              <span className='text-xs md:text-sm hidden sm:inline'>Comment</span>
            </button>
            <button className='flex items-center gap-1 md:gap-2 text-white hover:text-green-400 transition-colors'>
              <svg
                className='w-5 h-5 md:w-6 md:h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z'
                />
              </svg>
              <span className='text-xs md:text-sm hidden sm:inline'>Share</span>
            </button>
          </div>
          <button className='text-white hover:text-gold transition-colors'>
            <svg
              className='w-5 h-5 md:w-6 md:h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
              />
            </svg>
          </button>
        </div>

        {/* Post Meta */}
        <div className='pt-3 border-t border-gray-800'>
          <div className='flex items-center justify-between text-sm text-gray-400'>
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NextGenBlogPage() {
  return (
    <div className='min-h-screen bg-black'>
      {/* Instagram-style Header */}
      <div id='blog-header' className='bg-black border-b border-gray-800 sticky top-0 z-50'>
        <div className='max-w-2xl mx-auto px-3 md:px-4 py-3 md:py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2 md:gap-3'>
              <button
                onClick={() => (window.location.href = '/')}
                className='p-1.5 md:p-2 text-white hover:text-gold transition-colors mr-1 md:mr-2'
                aria-label='Go back to homepage'
              >
                <svg
                  className='w-5 h-5 md:w-6 md:h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M10 19l-7-7m0 0l7-7m-7 7h18'
                  />
                </svg>
              </button>
              <div className='w-7 h-7 md:w-8 md:h-8 bg-gold rounded-full flex items-center justify-center'>
                <svg
                  className='w-4 h-4 md:w-5 md:h-5 text-black'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='min-w-0 flex-1'>
                <h1 className='text-lg md:text-xl font-bold text-white truncate'>NextGen Blog</h1>
                <p className='text-xs md:text-sm text-gray-400 truncate'>
                  Expert insights & industry trends
                </p>
              </div>
            </div>
            <div className='flex items-center gap-2 md:gap-4'>
              <button className='p-1.5 md:p-2 text-white hover:text-gold transition-colors'>
                <svg
                  className='w-5 h-5 md:w-6 md:h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Instagram Timeline Feed */}
      <section id='blog-feed' className='max-w-2xl mx-auto py-4 px-4 md:py-8'>
        <div className='space-y-4 md:space-y-8'>
          {blogPosts.map((post, index) => (
            <InstagramPost key={post.title} post={post} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
