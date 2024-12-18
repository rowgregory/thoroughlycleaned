const config = {
  siteUrl: "https://thoroughlycleaned.vercel.app",
  generateRobotsTxt: true, // Generate robots.txt
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,
  additionalPaths: async () => {
    return [
      { loc: "/", lastmod: new Date().toISOString() },
      { loc: "/about", lastmod: new Date().toISOString() },
      { loc: "/services", lastmod: new Date().toISOString() },
      { loc: "/projects", lastmod: new Date().toISOString() },
      { loc: "/testimonials", lastmod: new Date().toISOString() },
      { loc: "/auth/login", lastmod: new Date().toISOString() },
      { loc: "/auth/register", lastmod: new Date().toISOString() },
    ];
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/search?q="],
      },
    ],
    additionalSitemaps: ["https://thoroughlycleaned.vercel.app/sitemap.xml"],
  },
};

export default config;
