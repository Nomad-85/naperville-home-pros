import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { SEO_CONSTANTS } from '@/lib/seo';
import { buildMetadata } from '@/components/SchemaMetadata';

export const metadata = buildMetadata({
  title: 'Privacy Policy | Naperville Home Pros',
  description: 'Our privacy policy explains how we collect, use, and protect your personal information when you use the Naperville Home Pros directory.',
  path: '/privacy',
  ogType: 'website'
});

export default function PrivacyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-700 text-white">
        <div className="container py-12">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Privacy Policy', href: '/privacy', isCurrent: true },
            ]}
          />
          <h1 className="text-3xl font-bold mt-4">
            Privacy Policy
          </h1>
          <p className="mt-2 text-lg max-w-2xl">
            Last Updated: August 1, 2023
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container py-12">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <p>
            At Naperville Home Pros, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website napervillehomepros.com, including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the "Site").
          </p>
          
          <p>
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>
          
          <h2>Collection of Your Information</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
          </p>
          
          <h3>Personal Data</h3>
          <p>
            Personally identifiable information, such as your name, email address, telephone number, and business information that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as submitting your business for inclusion in our directory or contacting us. You are under no obligation to provide us with personal information of any kind, however your refusal to do so may prevent you from using certain features of the Site.
          </p>
          
          <h3>Derivative Data</h3>
          <p>
            Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
          </p>
          
          <h3>Financial Data</h3>
          <p>
            Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase a featured listing or other services offered through the Site. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor, and you are encouraged to review their privacy policy and contact them directly for responses to your questions.
          </p>
          
          <h2>Use of Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
          </p>
          
          <ul>
            <li>Create and manage your account.</li>
            <li>Process your listing submissions and payments.</li>
            <li>Email you regarding your account or listing.</li>
            <li>Fulfill and manage your business listing in our directory.</li>
            <li>Generate a personal profile about you to make future visits to the Site more personalized.</li>
            <li>Increase the efficiency and operation of the Site.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
            <li>Notify you of updates to the Site.</li>
            <li>Offer new products, services, and/or recommendations to you.</li>
            <li>Perform other business activities as needed.</li>
            <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
            <li>Request feedback and contact you about your use of the Site.</li>
            <li>Resolve disputes and troubleshoot problems.</li>
            <li>Respond to product and customer service requests.</li>
          </ul>
          
          <h2>Disclosure of Your Information</h2>
          <p>
            We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
          </p>
          
          <h3>By Law or to Protect Rights</h3>
          <p>
            If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
          </p>
          
          <h3>Third-Party Service Providers</h3>
          <p>
            We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
          </p>
          
          <h3>Marketing Communications</h3>
          <p>
            With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes, as permitted by law.
          </p>
          
          <h3>Business Transfers</h3>
          <p>
            If we reorganize or sell all or a portion of our assets, undergo a merger, or are acquired by another entity, we may transfer your information to the successor entity. If we go out of business or enter bankruptcy, your information would be an asset transferred or acquired by a third party. You acknowledge that such transfers may occur and that the transferee may decline to honor commitments we made in this Privacy Policy.
          </p>
          
          <h2>Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>
          
          <h2>Policy for Children</h2>
          <p>
            We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.
          </p>
          
          <h2>Options Regarding Your Information</h2>
          <p>
            You may at any time review or change the information in your account or terminate your account by:
          </p>
          <ul>
            <li>Logging into your account settings and updating your account</li>
            <li>Contacting us using the contact information provided below</li>
          </ul>
          
          <p>
            Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with legal requirements.
          </p>
          
          <h2>Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at:
          </p>
          
          <p>
            Naperville Home Pros<br />
            Naperville, IL 60563<br />
            hello@napervillehomepros.com<br />
            (630) 555-0134
          </p>
        </div>
      </section>

      {/* JSON-LD */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Privacy Policy | Naperville Home Pros",
          "description": "Our privacy policy explains how we collect, use, and protect your personal information when you use the Naperville Home Pros directory.",
          "url": `${SEO_CONSTANTS.DOMAIN}/privacy`
        }}
      />
    </>
  );
}
