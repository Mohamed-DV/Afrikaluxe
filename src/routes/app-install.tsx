import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/afrikaluxe/HomePage";
import { APP_INSTALL_REDIRECT_SCRIPT } from "@/lib/app-install-redirect";

export const Route = createFileRoute("/app-install")({
  head: () => ({
    meta: [
      { title: "AfrikaLuxe — Marketplace N°1 en Afrique" },
      {
        name: "description",
        content:
          "AfrikaLuxe est la marketplace premium d'Afrique. Le luxe à prix abordable, livré à domicile en 60 minutes.",
      },
      { property: "og:title", content: "AfrikaLuxe — Marketplace N°1 en Afrique" },
      {
        property: "og:description",
        content: "Le luxe accessible, livré chez vous en 60 minutes dans 10 pays d'Afrique.",
      },
    ],
    scripts: [
      {
        type: "text/javascript",
        children: APP_INSTALL_REDIRECT_SCRIPT,
      },
    ],
  }),
  component: AppInstall,
});

function AppInstall() {
  return <HomePage />;
}
