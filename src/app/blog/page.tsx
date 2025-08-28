// src/app/blog/[slug]/page.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import posts from "@/data/blog-posts.json";
import { SEO_CONSTANTS } from "@/lib/seo";
import { buildMetadata } from "@/components/SchemaMetadata";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  date: string; // ISO
  author: string;
  category: string;
  excerpt: string;
  content: string; // HTML string
  image?: string;
  tags?: string[];
};

function getPost(slug: string): BlogPost | undefined {
  return (posts as BlogPost[]).find((p) => p.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);
  if (!post) return {};

  return buildMetadata({
    title: `${post.title} | Naperville Home Pros`,
    description: post.excerpt ?? "",
    path: `/blog/${post.slug}`,
    ogType: "article",
    ogImage: post.image ? [`${post.image}`] : undefined,
  });
}

function formatDate(dateString: string) {
  const d = new Date(dateString);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);
  if (!post) return notFound();

  return (
    <>
      {/* Hero */}
      <section className="bg-primary-700 text-white">
        <div className="container py-12">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title, href: `/blog/${post.slug}`, isCurrent: true },
            ]}
          />
          <h1 className="mt-4 text-3xl font-bold">{post.title}</h1>
          <div className="mt-2 text-white/90">
            {formatDate(post.date)} • {post.author}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container py-10">
        {/* Hero image (optional) */}
        <div className="relative mb-6 h-64 w-full overflow-hidden rounded-xl bg-gray-100">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <svg
                className="h-14 w-14"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 🚨 Render HTML content */}
        <article className="prose prose-slate max-w-none">
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* Back link */}
        <div className="mt-10">
          <Link
            href="/blog"
            className="text-primary-600 underline-offset-2 hover:underline"
          >
            ← Back to Blog
          </Link>
        </div>
      </section>

      {/* JSON-LD for the post */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          author: { "@type": "Person", name: post.author },
          image: post.image ? [`${SEO_CONSTANTS.DOMAIN}${post.image}`] : undefined,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${SEO_CONSTANTS.DOMAIN}/blog/${post.slug}`,
          },
          publisher: {
            "@type": "Organization",
            name: "Naperville Home Pros",
            logo: {
              "@type": "ImageObject",
              url: `${SEO_CONSTANTS.DOMAIN}/logo.png`,
            },
          },
        }}
      />
    </>
  );
}
