<template>
  <footer class="bg-[#111827] text-white pt-12 pb-6 px-4 border-t border-gray-800">
    <div class="max-w-[1400px] mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div>
          <h3 class="text-xl font-bold mb-4">{{ t('footer.company_name') }}</h3>
          <p class="text-gray-400 text-sm leading-relaxed mb-6">{{ t('footer.description') }}</p>
          <div class="flex space-x-3">
            <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#E93325] transition-colors duration-300 group">

              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-300 group-hover:text-white">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#E93325] transition-colors duration-300 group">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-300 group-hover:text-white">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 class="text-lg font-bold mb-6">{{ t('footer.contact_heading') }}</h3>
          <ul class="space-y-4 text-sm text-gray-400">
            <li class="flex items-start">
              <span class="mr-3 mt-1 text-[#E93325]">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </span>
              <div>
                <p>{{ t('footer.address_line1') }}</p>
                <p>{{ t('footer.address_line2') }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ t('footer.address_note') }}</p>
              </div>
            </li>

            <li class="flex items-start">
              <span class="mr-3 mt-1 text-[#E93325]">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </span>
              <div>
                <template v-for="(p, idx) in phones" :key="idx">
                  <a :href="`tel:${p.replace(/\s+/g, '')}`" class="block hover:text-white transition">{{ p }}</a>
                </template>
              </div>
            </li>

            <li class="flex items-center">
              <span class="mr-3 text-[#E93325]">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </span>
              <a :href="`mailto:${t('footer.email')}`" class="hover:text-white transition">{{ t('footer.email') }}</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-bold mb-6">{{ t('footer.hours_heading') }}</h3>
          <div class="text-sm text-gray-400">
            <div class="flex justify-between items-center border-b border-gray-800 pb-2">
              <span>{{ t('footer.everyday') }}</span>
              <span class="text-white font-medium">08:00 - 24:00</span>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-800 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <div class="mb-4 md:mb-0 text-center md:text-left">{{ t('footer.copyright') }}</div>
        <div class="flex space-x-6">
          <template v-for="(p, idx) in phones" :key="`f-${idx}`">
            <a :href="`tel:${p.replace(/\s+/g, '')}`" class="hover:text-gray-300 transition">{{ p }}</a>
          </template>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const phones = computed(() => {
  const raw = (typeof tm === 'function') ? tm('footer.phones') : t('footer.phones')
  if (Array.isArray(raw)) return raw
  if (raw == null) return []
  return String(raw).split(',').map(s => s.trim()).filter(Boolean)
})
</script>