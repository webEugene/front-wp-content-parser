<script setup lang="ts">
useSeoMeta({
  title: "Terms of Service",
  description: "",
});
</script>

<template>
  <div>
    <heading-page heading="Terms of Service"> </heading-page>
    <content-wrapper>
      <p>Last Updated: 03/12/2025</p>
      <p>
        Welcome to <strong>WP Content Parser</strong> (“Service”), available at
        <strong
          ><nuxt-link to="/" class="hover:hover:text-blue-600"
            >wp-content-parser.vercel.app</nuxt-link
          ></strong
        >. By using the Service, you agree to the following Terms of Service.
      </p>
      <h2 class="text-xl font-semibold text-gray-800 mb-2">
        1. Purpose of the Service
      </h2>
      <p>
        WP Content Parser provides tools for retrieving and analyzing website
        content, including:
      </p>
      <ul class="list-disc list-inside mb-2">
        <li>HTML parsing</li>
        <li>
          Extraction of WordPress metadata, headings, featured images, and
          content images
        </li>
        <li>Sitemap parsing and link extraction</li>
      </ul>
      <p>
        The Service performs HTTP requests to the website specified by the user
        and returns the retrieved data. The Service is available through a web
        interface only and does not provide an API.
      </p>

      <h2 class="text-xl font-semibold text-gray-800 mb-2">
        2. User Responsibility
      </h2>
      <p>By using the Service, you agree that:</p>
      <ul class="list-disc list-inside mb-5">
        <li>You are solely responsible for the URLs and websites you parse.</li>
        <li>You will use the Service only for lawful purposes.</li>
        <li>
          You will parse only content that you have the right to access or
          extract.
        </li>
        <li>
          You will not use the Service to bypass website protections,
          restrictions, or robots.txt rules.
        </li>
        <li>
          You will comply with all applicable copyright, data protection, and
          privacy laws.
        </li>
      </ul>
      <h2 class="text-xl font-semibold text-gray-800 mb-2">3. Rate Limits</h2>
      <p>The Service implements usage rate limits:</p>
      <ul class="list-disc list-inside mb-2">
        <li><strong>Short window</strong>: 5 requests per 1 second</li>
        <li><strong>Long window</strong>: 10 requests per 60 seconds</li>
      </ul>
      <p>
        Abuse of rate limits may result in temporary or permanent access
        restrictions.
      </p>
      <h2 class="text-xl font-semibold text-gray-800 mb-2">
        4. No Warranty (“As Is”)
      </h2>
      <p>
        The Service is provided <strong>“as is”</strong>, without warranties of
        any kind, including but not limited to:
      </p>
      <ul class="list-disc list-inside mb-2">
        <li>accuracy or completeness of parsed data</li>
        <li>availability, uptime, or error-free operation</li>
        <li>compatibility with any websites or platforms</li>
      </ul>
      <p>We are not responsible for:</p>
      <ul class="list-disc list-inside mb-5">
        <li>incorrect, outdated, or incomplete parsed results</li>
        <li>any technical issues, data loss, or service interruptions</li>
        <li>any misuse of the Service by users</li>
        <li>
          any legal consequences arising from how users process or use parsed
          content
        </li>
      </ul>

      <h2 class="text-xl font-semibold text-gray-800 mb-2">
        5. Temporary Data
      </h2>
      <p>Storage The Service temporarily stores:</p>
      <ul class="list-disc list-inside mb-2">
        <li>extracted sitemap URLs</li>
        <li>error logs</li>
      </ul>
      <p>
        No long-term data storage of parsed content is performed unless
        explicitly stated.
      </p>
      <h2 class="text-xl font-semibold text-gray-800 mb-2">
        6. Limited Use Restrictions
      </h2>
      <p>You agree not to:</p>
      <ul class="list-disc list-inside mb-5">
        <li>
          use the Service for heavy scraping, automated scraping, spam, or
          DDoS-like behavior
        </li>
        <li>attempt to circumvent rate limits or technical restrictions</li>
        <li>attempt unauthorized access to servers or infrastructure</li>
        <li>
          engage in mass or automated scraping of third-party sites without
          permission
        </li>
      </ul>

      <h2 class="text-xl font-semibold text-gray-800 mb-2">
        7. Changes to the Service
      </h2>
      <p>
        We may modify, update, or discontinue any part of the Service at any
        time without notice.
      </p>
      <h2 class="text-xl font-semibold text-gray-800 mb-2">
        8. Future Monetization
      </h2>
      <p>
        The Service may introduce optional paid plans, donations (e.g., via
        Ko-fi), or premium features in the future. Use of paid features will be
        governed by updated terms at that time.
      </p>
      <h2 class="text-xl font-semibold text-gray-800 mb-2">
        9. Changes to These Terms
      </h2>
      <p>
        We reserve the right to modify these Terms of Service. Continued use of
        the Service constitutes acceptance of updated terms.
      </p>
      <h2 class="text-xl font-semibold text-gray-800 mb-2">10. Contact</h2>
      <p>
        For legal or support inquiries: your-email@example.com (replace with
        your actual address)
      </p>

      <h2 class="text-xl font-semibold text-gray-800 mb-2">
        11. DMCA Notice & Copyright Infringement Policy
      </h2>
      <p>
        We respect the intellectual property rights of others and expect users
        to do the same.
      </p>
      <p>
        Since WP Content Parser retrieves publicly available website content
        <strong>provided by the user’s input</strong>, we do not host or store
        copyrighted material. However, if you believe that the Service has been
        used in a way that results in copyright infringement, you may submit a
        DMCA notice.
      </p>
      <h3 class="text-lg font-semibold text-gray-800 mb-2">
        11.1. How to Submit a DMCA Notice
      </h3>
      <p>Please send a written notification that includes:</p>
      <ul class="list-decimal list-inside mb-2">
        <li>Identification of the copyrighted work claimed to be infringed.</li>
        <li>
          Identification of the URL or content being scraped or processed.
        </li>
        <li>
          A statement that you have a good-faith belief that the disputed use is
          not authorized.
        </li>
        <li>
          A statement, under penalty of perjury, that the information is
          accurate and that you are authorized to act.
        </li>
        <li>Your contact information (name, email, address).</li>
      </ul>

      <p>
        Send notices to: your-email@example.com (replace with your actual
        address)
      </p>
      <h3 class="text-lg font-semibold text-gray-800 mb-2">
        11.2. Misuse of DMCA Notices
      </h3>
      <p>Submitting fraudulent DMCA claims may result in legal liability.</p>
    </content-wrapper>
  </div>
</template>

<style scoped></style>
