import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            return tag.startsWith("ion-"); // (return true)
          },
        },
      },
    }),
    vueJsx(),
  ],
  server: {
    proxy: {
      "^/api/.*": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => {
          console.log(path);
          const p = path.replace(/^\/api/, "");
          console.log(p);
          return p;
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
