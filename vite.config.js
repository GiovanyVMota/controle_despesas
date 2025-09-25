import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Adicione esta configuração para permitir o acesso do CodeSandbox
    allowedHosts: [".csb.app"],
  },
});
