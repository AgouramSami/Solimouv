import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://solimouv-git-vercel-react-server-70cd75-samis-projects-8dc87455.vercel.app/sitemap.xml",
  };
}
