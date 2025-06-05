<template>
  <div class="min-h-screen bg-white text-gray-800 flex flex-col">
    <!-- Header -->
   <Header/>
    <!-- Main Content -->
    <main class="flex-1 p-6 md:p-12 max-w-4xl mx-auto space-y-8">
      <section>
        <h2 class="text-4xl font-extrabold text-red-600 mb-2">
          <i class="fas fa-file-contract mr-2"></i>Terms of Use
        </h2>
        <p class="text-lg text-gray-700">These are the standard Terms and Conditions for use of the DHL website. Local variations may apply by country.</p>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">Copyright</h3>
        <p>The copyright in this publication is owned by DHL International GmbH.</p>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">Authorization to Reproduce</h3>
        <ul class="list-disc list-inside space-y-2">
          <li>The material may be used for informational and non-commercial purposes only.</li>
          <li>It may not be modified in any way.</li>
          <li>No unauthorized use of DHL trademarks is permitted.</li>
          <li>Copies must include this notice: <strong>Copyright © DHL International GmbH. All Rights Reserved.</strong></li>
        </ul>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">DHL Trademarks</h3>
        <p>The listed trademarks such as 'DHL', 'DHL Express', 'DHL Freight', etc., are the property of DHL International GmbH and may not be copied or used without prior written permission.</p>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">Other Trademarks and Trade Names</h3>
        <p>All other trademarks mentioned are the property of their respective owners.</p>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">Your Comments</h3>
        <p>DHL welcomes your feedback and may use it, but cannot respond to each comment individually.</p>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">Use of Interactive Features</h3>
        <p>Interactive features are provided for convenience and must be used only for their intended purposes (e.g. tracking).</p>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">Accuracy of This Site</h3>
        <p>This site may contain occasional inaccuracies. DHL regularly updates content but does not guarantee it is always accurate or current. Some content may originate outside DHL’s systems.</p>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">Viruses</h3>
        <p>DHL takes precautions to prevent viruses but cannot guarantee exclusion. You should use appropriate virus protection before downloading any content.</p>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">Disclaimer of Warranties</h3>
        <p>The website and services are provided "as is". DHL disclaims all warranties to the fullest extent permitted by law. No content or system use constitutes a warranty.</p>
        <p>Some consumer rights may still apply based on jurisdiction.</p>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">Limitation of Liability</h3>
        <p>DHL is not liable for indirect or consequential damages. Total liability, where applicable, is limited to EUR 100.00 unless otherwise required by law.</p>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">Products and Services</h3>
        <p>DHL's products and services are subject to local terms of carriage. Contact your local DHL office to obtain applicable terms and conditions. Not all services are available in all countries.</p>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">Disclosure of Information</h3>
        <p>Information you provide to DHL is treated as confidential and is only disclosed as needed to deliver services.</p>
      </section>
    </main>

    <!-- Footer -->
    <Footer/>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>
