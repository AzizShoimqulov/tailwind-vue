import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    hmr: {
      // don't show the red error overlay in the browser (avoids constant refresh)
      overlay: false
      // To fully disable HMR set: hmr: false
    }
  },
})
