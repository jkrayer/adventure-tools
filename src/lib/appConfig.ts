import {
  resolveWebAppConfig,
  type WebAppConfig,
} from "@project_goldenrod/shared";

export const appConfig: WebAppConfig = resolveWebAppConfig(import.meta.env, {
  appName: "Project Goldenrod Tools",
  appVariant: "freemium",
});
