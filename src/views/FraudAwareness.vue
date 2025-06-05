<template>
    <Header/>
  <main class="bg-white text-gray-800 p-6 md:p-12 max-w-4xl mx-auto">
    <div class="border-t-4 border-yellow-400 mb-6"></div>

    <h1 class="text-4xl font-extrabold text-red-600 mb-2">
      <i class="fas fa-exclamation-triangle mr-2"></i>Fraud Awareness
    </h1>
    <div class="w-12 border-b-2 border-black mb-6"></div>

    <section class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold mb-2">Fraudulent Use of the uppership Brand</h2>
        <p>
          Attempts have been made to defraud Internet shoppers by the unauthorized use of the uppership name and brand via email communications and graphics which appear, on the surface, to have originated from uppership.
        </p>
        <p>
          In most cases the communications concern the sale of consumer goods over the Internet where payment may be requested before the goods are delivered.
        </p>
        <p>
          Please be advised that uppership does not request payment in this manner. uppership only collects money due for official uppership related shipping expenses.
        </p>
        <p>
          This security notice does not affect the obligation of a consignee to pay shipping, customs, VAT or similar charges, where these are properly payable at the time of delivery.
        </p>
        <p>
          uppership accepts no responsibility for any costs, charges or payments made which were improperly incurred as a result of fraudulent activity.
        </p>
      </div>

      <div>
        <h2 class="text-2xl font-bold mb-2">Websites</h2>
        <p>
          If you are in any doubt as to the integrity of a website that uses the uppership brand, please always access uppership websites via our global website.
        </p>
        <a href="https://www.uppership.com/global-en/home.html" target="_blank" class="text-blue-600 underline">
          Visit uppership Global Website
        </a>
      </div>

      <div>
        <h2 class="text-2xl font-bold mb-2">uppership Fraud Awareness Guidelines</h2>
        <p>
          Thank you for joining our effort to combat online fraud. uppership goes to great lengths to protect our customers from fraud.
        </p>
        <p>
          If you suspect having received fraudulent emails, SMS or found a website or social media account that tries to pass off as uppership, please report it to: 
          <a href="mailto:phishing-dpuppership@uppership.com" class="text-blue-600 underline">
            phishing-dpuppership@uppership.com
          </a>
        </p>
      </div>

      <div>
        <h2 class="text-2xl font-bold mb-2">Fraudulent Email</h2>
        <ul class="list-disc list-inside space-y-2">
          <li>Official uppership emails come from domains like @uppership.com, @dpuppership.com, @uppership.de, etc.</li>
          <li>Watch out for fake domains and urgent tone or grammar issues in emails.</li>
          <li>Never click unknown links or open suspicious attachments.</li>
          <li>uppership does not use free email services like @gmail or @yahoo.</li>
        </ul>
      </div>

      <div>
        <h2 class="text-2xl font-bold mb-2">Fraudulent SMS</h2>
        <ul class="list-disc list-inside space-y-2">
          <li>Scam SMS may use shortened links like <code>bit.ly</code>.</li>
          <li>Sender may appear as “Delivery” or unknown numbers.</li>
          <li>Report screenshots to 
            <a href="mailto:phishing-dpuppership@uppership.com" class="text-blue-600 underline">phishing-dpuppership@uppership.com</a>.
          </li>
        </ul>
      </div>

      <div>
        <h2 class="text-2xl font-bold mb-2">Fraudulent Social Media Accounts</h2>
        <ul class="list-disc list-inside space-y-2">
          <li>No verification badge, new account, or unprofessional photos.</li>
          <li>May promote scams like free flights or investments.</li>
          <li>Report them via email and on the platform.</li>
        </ul>
      </div>

      <div>
        <h2 class="text-2xl font-bold mb-2">Hacked uppership Accounts</h2>
        <p>
          If you get unexpected alerts (address or password changes), it may be a hack attempt. Log in and change your password. If you’ve lost access, contact 
          <a href="https://www.uppership.com/global-en/home/customer-service.html" class="text-blue-600 underline" target="_blank">customer support</a>.
        </p>
      </div>
    </section>
  </main>
  <Footer/>
</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>

<style scoped>
code {
  background-color: #f3f4f6;
  padding: 0 0.25rem;
  border-radius: 0.25rem;
}
</style>
