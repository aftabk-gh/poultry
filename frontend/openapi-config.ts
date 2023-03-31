import type { ConfigFile } from "@rtk-query/codegen-openapi";
const config: ConfigFile = {
  schemaFile: "swagger.json",
  apiFile: "./src/store/emptyApi.ts",
  apiImport: "api",
  outputFile: "./src/store/generated.ts",
  exportName: "rtk",
  hooks: true,
};

export default config;
