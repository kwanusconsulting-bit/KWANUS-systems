import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        include: ["lib/**/__tests__/**/*.test.ts"],
        exclude: ["node_modules", ".next", "prisma", "tests"],
        coverage: {
            provider: "v8",
            reporter: ["text", "json-summary"],
            include: ["lib/**/*.ts"],
            exclude: ["lib/**/*.d.ts"]
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, ".")
        }
    }
});
