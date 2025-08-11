import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { SEO_CONSTANTS } from '@/lib/seo';
import { buildMetadata, buildViewport } from '@/components/SchemaMetadata';

export const metadata = buildMetadata({
  title: 'Terms of Service | Naperville Home Pros',
  description: 'Our terms of service outline the rules, guidelines, and legal terms that govern your use of the Naperville Home Pros directory.',
  path: '/terms',
  ogType: 'website'
});

export const viewport = buildViewport({
  width: 'device-width',
  initialScale: 1,
  maximumScale: 2,
  userScalable: true,
  themeColor: '#0f766e'
});

export default function TermsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-700 text-white">
        <div className="container py-12">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Terms of Service', href: '/terms', isCurrent: true },
            ]}
          />
          <h1 className="text-3xl font-bold mt-4">
            Terms of Service
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
            Welcome to Naperville Home Pros. The following terms and conditions govern all use of the napervillehomepros.com website and all content, services, and products available at or through the website (collectively, the "Site").
          </p>
          
          <p>
            The Site is owned and operated by Naperville Home Pros ("we", "us", or "our"). The Site is offered subject to your acceptance without modification of all of the terms and conditions contained herein and all other operating rules, policies, and procedures that may be published from time to time on this Site (collectively, the "Agreement").
          </p>
          
          <p>
            Please read this Agreement carefully before accessing or using the Site. By accessing or using any part of the Site, you agree to become bound by the terms and conditions of this Agreement. If you do not agree to all the terms and conditions of this Agreement, then you may not access the Site or use any services.
          </p>
          
          <h2>1. Your Account</h2>
          <p>
            If you create an account on the Site, you are responsible for maintaining the security of your account, and you are fully responsible for all activities that occur under the account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions.
          </p>
          
          <h2>2. Business Listings</h2>
          <p>
            If you submit a business listing to our directory, you are responsible for ensuring that all information provided is accurate, complete, and up-to-date. We reserve the right to reject, remove, or modify any listing at our sole discretion, without notice or explanation.
          </p>
          
          <p>
            By submitting a business listing, you grant us a worldwide, royalty-free, and non-exclusive license to use, reproduce, modify, adapt, publish, translate, and distribute your listing content in any existing or future media. You also grant us the right to sublicense these rights and to bring an action for infringement of these rights.
          </p>
          
          <h2>3. Payment and Renewal</h2>
          <p>
            By selecting a featured listing or any other paid service, you agree to pay the subscription fee indicated for that service. Payments will be charged on a pre-pay basis on the day you sign up for a featured listing and will cover the use of that service for the subscription period indicated.
          </p>
          
          <p>
            Unless you notify us before the end of the applicable subscription period that you want to cancel a featured listing, your subscription will automatically renew and you authorize us to collect the then-applicable subscription fee using any credit card or other payment mechanism we have on record for you.
          </p>
          
          <h2>4. Responsibility of Site Visitors</h2>
          <p>
            We have not reviewed, and cannot review, all of the material, including computer software, posted to the Site, and cannot therefore be responsible for that material's content, use or effects. By operating the Site, we do not represent or imply that we endorse the material there posted, or that we believe such material to be accurate, useful or non-harmful.
          </p>
          
          <p>
            You are responsible for taking precautions as necessary to protect yourself and your computer systems from viruses, worms, Trojan horses, and other harmful or destructive content. The Site may contain content that is offensive, indecent, or otherwise objectionable, as well as content containing technical inaccuracies, typographical mistakes, and other errors. The Site may also contain material that violates the privacy or publicity rights, or infringes the intellectual property and other proprietary rights, of third parties, or the downloading, copying or use of which is subject to additional terms and conditions, stated or unstated.
          </p>
          
          <h2>5. Content Posted on Other Websites</h2>
          <p>
            We have not reviewed, and cannot review, all of the material, including computer software, made available through the websites and webpages to which napervillehomepros.com links, and that link to napervillehomepros.com. We do not have any control over those non-napervillehomepros.com websites and webpages, and are not responsible for their contents or their use. By linking to a non-napervillehomepros.com website or webpage, we do not represent or imply that we endorse such website or webpage.
          </p>
          
          <h2>6. Copyright Infringement and DMCA Policy</h2>
          <p>
            As we ask others to respect our intellectual property rights, we respect the intellectual property rights of others. If you believe that material located on or linked to by napervillehomepros.com violates your copyright, you are encouraged to notify us in accordance with our Digital Millennium Copyright Act ("DMCA") Policy.
          </p>
          
          <h2>7. Intellectual Property</h2>
          <p>
            This Agreement does not transfer from us to you any of our or third party intellectual property, and all right, title and interest in and to such property will remain (as between the parties) solely with Naperville Home Pros. All trademarks, service marks, graphics and logos used in connection with the Site are trademarks or registered trademarks of Naperville Home Pros or its licensors. Other trademarks, service marks, graphics and logos used in connection with the Site may be the trademarks of other third parties. Your use of the Site grants you no right or license to reproduce or otherwise use any Naperville Home Pros or third-party trademarks.
          </p>
          
          <h2>8. Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace any part of this Agreement. It is your responsibility to check this Agreement periodically for changes. Your continued use of or access to the Site following the posting of any changes to this Agreement constitutes acceptance of those changes.
          </p>
          
          <h2>9. Termination</h2>
          <p>
            We may terminate your access to all or any part of the Site at any time, with or without cause, with or without notice, effective immediately. If you wish to terminate this Agreement or your napervillehomepros.com account (if you have one), you may simply discontinue using the Site. All provisions of this Agreement which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
          </p>
          
          <h2>10. Disclaimer of Warranties</h2>
          <p>
            The Site is provided "as is". Naperville Home Pros and its suppliers and licensors hereby disclaim all warranties of any kind, express or implied, including, without limitation, the warranties of merchantability, fitness for a particular purpose and non-infringement. Neither Naperville Home Pros nor its suppliers and licensors, makes any warranty that the Site will be error free or that access thereto will be continuous or uninterrupted.
          </p>
          
          <h2>11. Limitation of Liability</h2>
          <p>
            In no event will Naperville Home Pros, or its suppliers or licensors, be liable with respect to any subject matter of this Agreement under any contract, negligence, strict liability or other legal or equitable theory for: (i) any special, incidental or consequential damages; (ii) the cost of procurement for substitute products or services; (iii) for interruption of use or loss or corruption of data; or (iv) for any amounts that exceed the fees paid by you to Naperville Home Pros under this Agreement during the twelve (12) month period prior to the cause of action. Naperville Home Pros shall have no liability for any failure or delay due to matters beyond their reasonable control.
          </p>
          
          <h2>12. General Representation and Warranty</h2>
          <p>
            You represent and warrant that (i) your use of the Site will be in strict accordance with this Agreement and with all applicable laws and regulations (including without limitation any local laws or regulations in your country, state, city, or other governmental area, regarding online conduct and acceptable content, and including all applicable laws regarding the transmission of technical data exported from the United States or the country in which you reside) and (ii) your use of the Site will not infringe or misappropriate the intellectual property rights of any third party.
          </p>
          
          <h2>13. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Naperville Home Pros, its contractors, and its licensors, and their respective directors, officers, employees and agents from and against any and all claims and expenses, including attorneys' fees, arising out of your use of the Site, including but not limited to your violation of this Agreement.
          </p>
          
          <h2>14. Miscellaneous</h2>
          <p>
            This Agreement constitutes the entire agreement between Naperville Home Pros and you concerning the subject matter hereof, and they may only be modified by a written amendment signed by an authorized executive of Naperville Home Pros, or by the posting by Naperville Home Pros of a revised version.
          </p>
          
          <p>
            If any part of this Agreement is held invalid or unenforceable, that part will be construed to reflect the parties' original intent, and the remaining portions will remain in full force and effect. A waiver by either party of any term or condition of this Agreement or any breach thereof, in any one instance, will not waive such term or condition or any subsequent breach thereof.
          </p>
          
          <p>
            You may assign your rights under this Agreement to any party that consents to, and agrees to be bound by, its terms and conditions; Naperville Home Pros may assign its rights under this Agreement without condition. This Agreement will be binding upon and will inure to the benefit of the parties, their successors and permitted assigns.
          </p>
          
          <h2>Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
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
          "name": "Terms of Service | Naperville Home Pros",
          "description": "Our terms of service outline the rules, guidelines, and legal terms that govern your use of the Naperville Home Pros directory.",
          "url": `${SEO_CONSTANTS.DOMAIN}/terms`
        }}
      />
    </>
  );
}
