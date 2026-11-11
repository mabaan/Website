import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { site } from './src/content'
import { renderMetadata } from './src/metadata'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'starturi-sharing-metadata',
      transformIndexHtml(html) {
        return html.replace('<!-- site:metadata -->', renderMetadata(site.seo, site.name))
      },
    },
  ],
})
