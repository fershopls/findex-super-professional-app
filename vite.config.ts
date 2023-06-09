import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        },
    },

    plugins: [
        vue(),

        Components({
            dts: './src/components.d.ts',
            dirs: ['./src'],
            deep: true,
            directoryAsNamespace: true,
            collapseSamePrefixes: true,
        }),

        AutoImport({
            imports: ['vue'],
            dts: './src/auto-imports.d.ts',
        }),
    ],
})
