import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import blogPosts from '@/data/blog-posts.json';
import { SEO_CONSTANTS } from '@/lib/seo';
import { buildMetadata } from '@/components/SchemaMetadata';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
  image?: string;
  tags?: string[];
};

export const metadata = buildMetadata({
  title: 'Home Service Blog | Naperville Home Pros',
  description: 'Expert tips, advice, and insights for homeowners in Naperville and Wheaton. Learn about HVAC, plumbing, landscaping, and more from local professionals.',
  path: '/blog',
  ogType: 'website'
});

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
  // Sort blog posts by date (newest first)
  const sortedPosts = [...blogPosts as BlogPost[]].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-700 text-white">
        <div className="container py-12">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog', isCurrent: true },
            ]}
          />
          <h1 className="text-3xl font-bold mt-4">
            Home Service Blog
          </h1>
          <p className="mt-2 text-lg max-w-2xl">
            Expert tips, advice, and insights for homeowners in Naperville and Wheaton
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.map((post) => (
            <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48 w-full bg-gray-200">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{formatDate(post.date)}</span>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary-600">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-primary-600 font-medium hover:text-primary-700 flex items-center"
                >
                  Read More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* JSON-LD */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Naperville Home Pros Blog",
          "description": "Expert tips, advice, and insights for homeowners in Naperville and Wheaton.",
          "url": `${SEO_CONSTANTS.DOMAIN}/blog`,
          "publisher": {
            "@type": "Organization",
            "name": "Naperville Home Pros",
            "logo": {
              "@type": "ImageObject",
              "url": `${SEO_CONSTANTS.DOMAIN}/logo.png`
            }
          },
          "blogPost": sortedPosts.map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "datePublished": post.date,
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "url": `${SEO_CONSTANTS.DOMAIN}/blog/${post.slug}`
          }))
        }}
      />
    </>
  );
}
