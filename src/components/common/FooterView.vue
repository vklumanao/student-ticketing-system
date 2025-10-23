<script setup>
import { ref } from 'vue'

const year = ref(new Date().getFullYear())

const links = [
  { label: 'Privacy', path: '/privacy' },
  { label: 'Terms', path: '/terms' },
  { label: 'Contact', path: '/contact' },
]

const socials = [
  { icon: 'mdi-facebook', url: '#' },
  { icon: 'mdi-twitter', url: '#' },
  { icon: 'mdi-instagram', url: '#' },
]
</script>

<template>
  <v-footer padless class="footer">
    <v-sheet class="footer-inner" elevation="0" tile>
      <v-container>
        <v-row align="center" justify="space-between" class="py-4">
          <!-- Left: Brand -->
          <v-col cols="12" md="4" class="d-flex align-center">
            <v-avatar size="48" rounded>
              <v-img src="@/assets/images/logo.png" alt="CSU Logo" />
            </v-avatar>

            <div class="ml-3">
              <div class="text-h6 font-weight-bold brand-name">Caraga State University</div>
              <div class="text-body-2 text-white">Student Ticketing System</div>
              <div class="text-caption text-white opacity-80">© {{ year }}</div>
            </div>
          </v-col>

          <!-- Center: Quick Links -->
          <v-col cols="12" md="4" class="d-flex justify-center my-3 my-md-0">
            <v-btn
              v-for="(link, i) in links"
              :key="i"
              :to="link.path"
              text
              small
              class="mx-2 text-white link-btn"
            >
              {{ link.label }}
            </v-btn>
          </v-col>

          <!-- Right: Contact & Socials -->
          <v-col cols="12" md="4" class="d-flex justify-center justify-md-end align-center">
            <div class="d-none d-md-flex align-center mr-4">
              <v-icon size="18" class="mr-1 text-yellow">mdi-email-outline</v-icon>
              <a href="mailto:help@csu.edu.ph" class="text-white contact-link">help@csu.edu.ph</a>
            </div>

            <v-btn
              v-for="(icon, i) in socials"
              :key="i"
              :href="icon.url"
              target="_blank"
              text
              small
              class="text-yellow"
            >
              <v-icon size="20">{{ icon.icon }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-divider class="my-3 opacity-30" />

        <!-- Bottom small text -->
        <v-row>
          <v-col cols="12" class="text-center text-caption text-white opacity-70">
            Designed and Developed by CSU ICT Team
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(180deg, #003a6c, #002c52);
  border-top: 4px solid #fdb913;
  color: #fff;
}
.footer-inner {
  padding: 8px 0;
}

.brand-name {
  color: #fdb913;
  font-weight: 700;
}
.link-btn:hover {
  text-decoration: underline;
  color: #fdb913 !important;
}
.contact-link:hover {
  color: #fdb913;
  text-decoration: underline;
}

.text-yellow {
  color: #fdb913;
}
.opacity-70 {
  opacity: 0.7;
}
.opacity-80 {
  opacity: 0.8;
}

/* responsive */
@media (max-width: 767px) {
  .d-none.d-md-flex {
    display: none !important;
  }
  .ml-3 {
    margin-left: 0.5rem;
  }
  .mr-4 {
    margin-right: 0.5rem;
  }
}
</style>
