import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import WindiCSS from 'vite-plugin-windicss'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), WindiCSS(),svgr()],
})