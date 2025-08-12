import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { buildMetadata, buildViewport } from '@/components/SchemaMetadata';
import { SEO_CONSTANTS } from '@/lib/seo';
import ListingCard from '@/components/ListingCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTASection from '@/components/CTASection';
import { JsonLd } from '@/components/JsonLd';
import { getListingsByCategory } from '@/lib/data';
import categories from '@/data/categories.json';

interface CategoryPageProps {
  params: {
    category: string;
  };
  searchParams: {
    q?: string;
  };
}

// Generate metadata for each category page
export async function generateMetadata({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.category);
  
  if (!category) {
    return buildMetadata({
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
      path: `/${params.category}`,
      ogType: 'website'
    });
  }
  
  return buildMetadata({
    title: `Best ${category.name} in Naperville & Wheaton | Naperville Home Pros`,
    description: `Compare top ${category.name.toLowerCase()} near Naperville & Wheaton. View details and contact pros fast.`,
    path: `/${category.slug}`,
    ogType: 'website'
  });
}

// Generate static paths for all categories
export async function generateStaticParams() {
  return categories.map(category => ({
    category: category.slug,
  }));
}

// Category intro content
const categoryIntros: Record<string, { intro: string; faqs: { question: string; answer: string }[] }> = {
  plumbers: {
    intro: "Finding a reliable plumber in Naperville or Wheaton shouldn't be stressful. The pros below handle leaks, water heaters, clogged drains, sump pumps, and more. Compare top choices, check availability, and call directly. For urgent issues, choose a Featured provider for fastest response.",
    faqs: [
      {
        question: "How fast can a plumber come out in Naperville?",
        answer: "Most Naperville plumbers offer same-day service for emergencies like burst pipes or major leaks. For standard service calls, expect 24-48 hours. Featured plumbers on our site typically prioritize response times and many offer after-hours service."
      },
      {
        question: "Do plumbers service both Naperville and Wheaton?",
        answer: "Yes, most plumbers listed on our site serve both Naperville and Wheaton, as well as surrounding communities in DuPage County. You can check each provider's specific service areas on their listing page."
      },
      {
        question: "What should I ask before hiring a plumber?",
        answer: "Ask about licensing, insurance, hourly rates vs. flat fees, guarantees on work, how they handle unexpected issues, and request references. Also confirm they're experienced with your specific plumbing issue."
      },
      {
        question: "Do local plumbers handle emergency calls?",
        answer: "Many Naperville and Wheaton plumbers offer 24/7 emergency services, though rates may be higher outside standard business hours. Featured listings on our site clearly indicate which providers offer emergency services."
      }
    ]
  },
  electricians: {
    intro: "Electrical work requires licensed professionals for safety and code compliance. The electricians listed below serve Naperville and Wheaton with services ranging from simple repairs to complete home rewiring. Compare qualifications, specialties, and availability to find the right pro for your electrical needs.",
    faqs: [
      {
        question: "Are electricians in Naperville licensed and insured?",
        answer: "Yes, all electricians in Illinois must be licensed. The professionals listed on our site maintain proper licensing and insurance coverage for your protection."
      },
      {
        question: "How much do electricians charge in Wheaton?",
        answer: "Electricians in the Wheaton area typically charge $75-150 per hour depending on experience and the complexity of the job. Some offer flat-rate pricing for common services like outlet installation or panel upgrades."
      },
      {
        question: "Can local electricians install EV chargers?",
        answer: "Many electricians in Naperville and Wheaton now specialize in EV charger installation. Look for listings that specifically mention this service, as it requires specific expertise with electrical load calculations."
      },
      {
        question: "How long does electrical work typically take?",
        answer: "Simple jobs like replacing outlets or fixtures usually take 1-2 hours. Larger projects like panel upgrades may take a full day, while whole-home rewiring could take several days depending on the size and complexity."
      }
    ]
  },
  roofers: {
    intro: "Your roof is your home's first line of defense against the elements. Naperville and Wheaton experience all four seasons, making quality roofing essential. The contractors below specialize in roof repairs, replacements, and inspections for all types of roofing materials. Many offer free estimates and storm damage assessments.",
    faqs: [
      {
        question: "How often should I replace my roof in Naperville?",
        answer: "Most asphalt shingle roofs in the Naperville area last 15-20 years due to our weather conditions. Cedar shake roofs typically last 20-30 years, while metal roofs can last 40-70 years with proper maintenance."
      },
      {
        question: "Do local roofers offer financing?",
        answer: "Many roofing contractors in Wheaton and Naperville offer financing options, including same-as-cash programs and monthly payment plans. Some also work directly with insurance companies for storm damage claims."
      },
      {
        question: "What's the best time of year for roof replacement?",
        answer: "Late spring through early fall is ideal for roofing projects in our area, but many professional roofers work year-round except during active precipitation or extreme cold."
      },
      {
        question: "How long does a typical roof replacement take?",
        answer: "Most residential roof replacements in Naperville and Wheaton take 1-3 days depending on the size of your home, roof complexity, and weather conditions."
      }
    ]
  },
  hvac: {
    intro: "Reliable heating and cooling is essential in our climate. The HVAC professionals listed below provide installation, repair, and maintenance services for furnaces, air conditioners, heat pumps, and indoor air quality systems throughout Naperville and Wheaton. Many offer maintenance plans to keep your systems running efficiently year-round.",
    faqs: [
      {
        question: "How often should I service my HVAC system?",
        answer: "For optimal performance, have your furnace serviced in fall and your air conditioner serviced in spring. Most HVAC companies in Naperville offer maintenance plans that include these bi-annual tune-ups."
      },
      {
        question: "What HVAC brands do local contractors install?",
        answer: "HVAC contractors in the Wheaton and Naperville area commonly install Carrier, Trane, Lennox, Rheem, and American Standard systems, though specific brand offerings vary by contractor."
      },
      {
        question: "How long do HVAC systems last in our climate?",
        answer: "With proper maintenance, furnaces typically last 15-20 years and air conditioners 10-15 years in the Naperville area. High-efficiency systems may have longer lifespans."
      },
      {
        question: "Do HVAC companies offer emergency service?",
        answer: "Many HVAC contractors in our directory offer 24/7 emergency services for heating and cooling failures, especially during extreme weather conditions."
      }
    ]
  },
  landscapers: {
    intro: "Professional landscaping enhances your home's curb appeal and creates outdoor living spaces for your family to enjoy. The landscapers below offer services ranging from regular lawn maintenance to complete landscape design and installation throughout Naperville and Wheaton. Compare specialties and portfolios to find the right match for your outdoor projects.",
    faqs: [
      {
        question: "What services do landscapers in Naperville typically offer?",
        answer: "Local landscapers offer a range of services including lawn mowing, fertilization, mulching, planting, hardscape installation, irrigation, tree trimming, and full landscape design. Many offer both one-time projects and recurring maintenance."
      },
      {
        question: "When should I schedule landscaping services?",
        answer: "For regular maintenance, most Wheaton and Naperville homeowners begin service in April and continue through November. For landscape installation projects, schedule 1-2 months in advance, especially for spring work."
      },
      {
        question: "Do landscapers offer snow removal in winter?",
        answer: "Many landscaping companies in our area transition to snow removal services during winter months. Ask about seasonal contracts that cover both landscaping and snow removal."
      },
      {
        question: "How much does regular lawn service cost in Naperville?",
        answer: "Weekly lawn mowing for an average Naperville lot (1/4 acre) typically costs $35-50 per visit. Full-service lawn care including fertilization and weed control may range from $1,000-2,000 per season."
      }
    ]
  },
  painters: {
    intro: "A fresh coat of paint transforms your home inside and out. The painting contractors listed below serve Naperville and Wheaton with interior and exterior painting services. Many also offer cabinet refinishing, deck staining, and specialty finishes. Compare their portfolios, warranties, and customer reviews to find a painter who delivers quality results.",
    faqs: [
      {
        question: "How often should I repaint my home's exterior?",
        answer: "In the Naperville and Wheaton climate, exterior paint typically lasts 5-7 years, though north-facing walls may last longer while south and west exposures may need more frequent repainting due to sun exposure."
      },
      {
        question: "What's the best time of year for exterior painting?",
        answer: "Late spring through early fall is ideal for exterior painting in our area, with temperatures between 50-85°F and moderate humidity. Most professional painters schedule exterior work May through October."
      },
      {
        question: "How long does it take to paint a home interior?",
        answer: "For an average 3-bedroom home in Wheaton, interior painting typically takes 3-5 days depending on the amount of prep work, number of colors, and whether ceilings are included."
      },
      {
        question: "Do painters move furniture and handle prep work?",
        answer: "Most painting companies in Naperville will move furniture to the center of rooms and cover it. Basic prep like filling nail holes is standard, but major wall repairs may incur additional charges."
      }
    ]
  },
  flooring: {
    intro: "Quality flooring installation requires skill and attention to detail. The flooring professionals below serve Naperville and Wheaton with installation, refinishing, and repair services for hardwood, laminate, vinyl, tile, and carpet. Many offer in-home consultations to help you select the best flooring options for your lifestyle and budget.",
    faqs: [
      {
        question: "What flooring types are most popular in Naperville homes?",
        answer: "Engineered hardwood, luxury vinyl plank (LVP), and porcelain tile are currently the most requested flooring types in Naperville homes, with hardwood still preferred in main living areas and bedrooms."
      },
      {
        question: "How long does hardwood floor refinishing take?",
        answer: "Refinishing hardwood floors in an average Wheaton home (1,000 sq ft) typically takes 3-5 days, including sanding, staining, and applying multiple coats of finish with drying time between each step."
      },
      {
        question: "Can flooring be installed over existing floors?",
        answer: "Many modern flooring products can be installed over existing surfaces, but this depends on the condition of the current floor and the type of new flooring. Most professionals in our directory offer free assessments to determine the best approach."
      },
      {
        question: "Do flooring companies remove and dispose of old flooring?",
        answer: "Most flooring contractors in Naperville and Wheaton include removal and disposal of existing flooring in their quotes, though there may be additional charges for multiple layers or specialty materials like ceramic tile."
      }
    ]
  },
  remodeling: {
    intro: "Home remodeling projects add value and functionality to your property. The remodeling contractors below specialize in kitchen, bathroom, and basement renovations throughout Naperville and Wheaton. Compare their portfolios, project timelines, and communication styles to find a contractor who can bring your vision to life while respecting your budget and timeline.",
    faqs: [
      {
        question: "How long does a typical kitchen remodel take in Naperville?",
        answer: "A complete kitchen remodel in the Naperville area typically takes 6-10 weeks from demolition to final walkthrough, depending on the scope of work and whether structural changes are involved."
      },
      {
        question: "Do remodeling contractors handle permits?",
        answer: "Most established remodeling companies in Wheaton and Naperville handle all necessary permits as part of their service, including coordinating inspections with local building departments."
      },
      {
        question: "What's the average cost of a bathroom remodel?",
        answer: "In the Naperville area, a standard bathroom remodel ranges from $15,000-30,000, while master bathroom renovations typically start at $30,000 and can exceed $50,000 for luxury finishes and custom features."
      },
      {
        question: "How far in advance should I book a remodeling contractor?",
        answer: "The best remodeling contractors in our area are often booked 3-6 months in advance, especially for larger projects. Initial consultations should be scheduled at least 1-2 months before your desired start date."
      }
    ]
  }
};

// Default content for categories without specific content
const defaultCategoryContent = {
  intro: "Find trusted professionals in Naperville and Wheaton for all your home service needs. Compare providers, check availability, and contact them directly. Featured listings offer premium service and faster response times.",
  faqs: [
    {
      question: "How do I choose the right service provider?",
      answer: "Look for proper licensing, insurance, experience with your specific needs, and check reviews. Featured providers on our site have been vetted for quality service."
    },
    {
      question: "Do these professionals serve both Naperville and Wheaton?",
      answer: "Most service providers listed on our site serve both communities and surrounding areas. Check each listing for specific service areas."
    },
    {
      question: "What questions should I ask before hiring?",
      answer: "Ask about experience, licensing, insurance, pricing structure, timeline, and guarantees or warranties on their work."
    },
    {
      question: "How far in advance should I book services?",
      answer: "For routine services, 1-2 weeks notice is typically sufficient. For larger projects, schedule consultations 1-2 months in advance. Many providers also offer emergency services."
    }
  ]
};

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category: categorySlug } = params;
  const { q: searchQuery } = searchParams;
  
  // Find the category
  const category = categories.find(c => c.slug === categorySlug);
  
  // If category doesn't exist, return 404
  if (!category) {
    notFound();
  }
  
  // Get content for this category (or use default)
  const categoryContent = categoryIntros[categorySlug] || defaultCategoryContent;
  
  // Get listings by category using the data helper
  let categoryListings = getListingsByCategory(categorySlug);
  console.log('[build] category', categorySlug, categoryListings.length);
  
  // Filter by search query if provided
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    categoryListings = categoryListings.filter(listing => 
      listing.name.toLowerCase().includes(query) || 
      listing.short_description.toLowerCase().includes(query) ||
      listing.services?.some(service => service.toLowerCase().includes(query)) ||
      listing.service_areas?.some(area => area.toLowerCase().includes(query))
    );
  }
  
  // Sort listings: featured first, then alphabetically
  categoryListings = categoryListings.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.name.localeCompare(b.name);
  });
  
  // Get related categories (2 random categories excluding current)
  const relatedCategories = categories
    .filter(c => c.slug !== categorySlug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-700 text-white">
        <div className="container py-12">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Categories', href: '/categories' },
              { label: category.name, href: `/${category.slug}`, isCurrent: true },
            ]}
          />
          <h1 className="text-3xl font-bold mt-4">
            Best {category.name} in Naperville & Wheaton
          </h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="container py-8">
        <div className="max-w-3xl">
          <p className="text-lg text-gray-700">
            {categoryContent.intro}
          </p>
        </div>
      </section>

      {/* Listings Section */}
      <section className="container py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {categoryListings.length} {category.name} in Naperville & Wheaton
          {searchQuery && ` matching "${searchQuery}"`}
        </h2>
        
        {categoryListings.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categoryListings.map((listing) => (
              <ListingCard
                key={listing.slug}
                name={listing.name}
                slug={listing.slug}
                category={listing.category}
                city={listing.city || ''}
                short_description={listing.short_description}
                phone={listing.phone}
                image={listing.image}
                featured={listing.featured}
                services={listing.services}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium text-gray-900">No listings found</h3>
            <p className="mt-2 text-gray-600">
              We couldn't find any {category.name.toLowerCase()} matching your criteria.
            </p>
            <Link href={`/${category.slug}`} className="mt-4 inline-block text-primary-600 font-medium">
              Clear filters
            </Link>
          </div>
        )}
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {categoryContent.faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {faq.answer}
                  </p>

                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Categories */}
      <section className="container py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Related Categories
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {relatedCategories.map((relatedCategory) => (
            <Link
              key={relatedCategory.slug}
              href={`/${relatedCategory.slug}`}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900">
                {relatedCategory.name || relatedCategory.slug}
              </h3>
              <p className="mt-2 text-gray-600">
                Find the best {relatedCategory.name?.toLowerCase() || relatedCategory.slug} in Naperville & Wheaton
              </p>
              <div className="mt-4 text-primary-600 font-medium">
                View {relatedCategory.name || relatedCategory.slug} →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* JSON-LD */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": categoryListings.map((listing, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "LocalBusiness",
              "name": listing.name,
              "image": `${SEO_CONSTANTS.DOMAIN}${listing.image || '/images/placeholder.jpg'}`,
              "telephone": listing.phone,
              "url": `${SEO_CONSTANTS.DOMAIN}/${listing.category}/${listing.slug}`,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": listing.city,
                "addressRegion": "IL"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "41.7508",
                "longitude": "-88.1535"
              }
            }
          }))
        }}
      />
    </>
  );
}
