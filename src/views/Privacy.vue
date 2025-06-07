<template>
  <div class="min-h-screen bg-white text-gray-800 flex flex-col">
    <!-- Header -->
    <Header/>

    <!-- Main Content -->
    <main class="flex-1 p-6 md:p-12 max-w-4xl mx-auto space-y-8">
      <section>
        <h2 class="text-4xl font-extrabold text-red-600 mb-2">
          <i class="fas fa-user-shield mr-2"></i>Privacy Notice
        </h2>
        <p class="text-lg text-gray-700">Understand your data rights and how upperships protects your personal information.</p>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">What Are My Data Rights?</h3>
        <ul class="list-disc list-inside space-y-2">
          <li>You can request information as to what personal data is stored.</li>
          <li>You can request that we correct, delete, or block your personal data if permitted by law and contracts.</li>
          <li>You can request a copy of your data in a structured, machine-readable format.</li>
          <li>You may lodge a complaint with the supervisory authority. <a href="#" class="text-blue-600 underline">Find your data protection authority</a>.</li>
        </ul>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">Right to Obtain</h3>
        <p>You can obtain your information by contacting data protection here: <a href="#" class="text-blue-600 underline">upperships Data Protection</a>.</p>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">Right to Object</h3>
        <p>The right to object applies to all processing of personal data based on Article 6 (1) f) GDPR.</p>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">Right to Withdraw Your Consent</h3>
        <p>You may withdraw your consent at any time with future effect. Use the contact details provided under "Who is Responsible" or reach out to <a href="#" class="text-blue-600 underline">upperships Data Protection</a>.</p>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">How About Data Security?</h3>
        <p>upperships takes data security seriously. We use firewalls, intrusion detection, monitoring, encryption, and secure environments to protect your data. Transmission security is ensured through SSL when supported by your browser.</p>
        <p>We maintain physical security and certified data centers. Our internal audits align with the ISO 27001 standard. Employees receive regular security training and simulation exercises are run by our Cyber Defense Center.</p>
        <p>Please note that email communication may not be secure. For confidential information, we recommend using postal mail.</p>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">Where Do I Find Service Specific Information?</h3>
        <p>Further information regarding personal data processing for specific services or products is available in the respective Customer Portal.</p>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">upperships Group Data Privacy Policy</h3>
        <p>The upperships Group Data Privacy Policy outlines our global data processing standards, especially regarding transfers to countries outside the EU without adequate data protection laws.</p>
        <p>If you wish to learn more, you can download the full policy document here: <a href="#" class="text-blue-600 underline">upperships Group Data Privacy Policy</a></p>
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
