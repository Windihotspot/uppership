<template>
  <div class="min-h-screen bg-white text-gray-800 flex flex-col">
   <Header/>

    <!-- Main Content -->
    <main class="flex-1 p-6 md:p-12 max-w-4xl mx-auto space-y-8">
      <section>
        <h2 class="text-4xl font-extrabold text-red-600 mb-2">
          <i class="fas fa-gavel mr-2"></i>Legal Notice
        </h2>
        <p class="text-lg text-gray-700">Company and regulatory information as required by German law.</p>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">Company Name</h3>
        <p>Deutsche Post AG</p>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">Board of Management</h3>
        <ul class="list-disc list-inside space-y-1">
          <li>Dr. Tobias Meyer, Chairman</li>
          <li>Oscar de Bok</li>
          <li>Pablo Ciano</li>
          <li>Nikola Hagleitner</li>
          <li>Melanie Kreis</li>
          <li>Dr. Thomas Ogilvie</li>
          <li>John Pearson</li>
          <li>Tim Scharwath</li>
        </ul>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">Chair of the Supervisory Board</h3>
        <p>Dr. Katrin Suder</p>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">Commercial Details</h3>
        <ul class="list-disc list-inside space-y-1">
          <li>Commercial Register No.: Bonn HRB 6792</li>
          <li>Turnover Tax ID No.: DE 169838187</li>
        </ul>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">Address</h3>
        <p>
          Charles-de-Gaulle-Straße 20<br />
          53113 Bonn<br />
          Tel. +49 (0) 228-18 20
        </p>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">Press Contact</h3>
        <p>
          Please use the
          <a href="#" class="text-blue-600 underline">press office contact form</a>
          for inquiries.
        </p>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">Supervisory Authority</h3>
        <p>
          According to § 5 (1) No. 3 of the German Digital Services Act (for mail transportation up to 1000 grams):
        </p>
        <p class="mt-2">
          Bundesnetzagentur für Elektrizität, Gas, Telekommunikation, Post und Eisenbahnen (BNetzA)<br />
          Tulpenfeld 4, 53113 Bonn<br />
          Germany<br />
          Tel.: +49 / (0) 228 / 14-0<br />
          <a href="https://www.bundesnetzagentur.de" target="_blank" class="text-blue-600 underline">www.bundesnetzagentur.de</a>
        </p>
      </section>

      <section>
        <h3 class="text-2xl font-bold mb-2">Website</h3>
        <a href="https://www.upperships.com" target="_blank" class="text-blue-600 underline">www.upperships.com</a>
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
