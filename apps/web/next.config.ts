import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    // Helps tree-shake icon libraries (and other packages) more aggressively.
    // Safe, low-risk win for "unused JS" reports.
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      // Ghost route cleanup: Legacy service paths → /hizmetler/*
      { source: "/servis", destination: "/hizmetler/teknik-servis", permanent: true },
      { source: "/dolum", destination: "/hizmetler/oksijen-dolum", permanent: true },
      { source: "/kiralama", destination: "/hizmetler/cihaz-kiralama", permanent: true },
      { source: "/satis", destination: "/hizmetler/cihaz-satisi", permanent: true },
      { source: "/alim", destination: "/hizmetler/ikinci-el-alim", permanent: true },
      // Navbar legacy paths (if they exist in old links)
      { source: "/oksijen-cozumleri", destination: "/rehber/solunum-sistemleri", permanent: true },
      { source: "/evde-bakim", destination: "/rehber/evde-bakim-ekipmanlari", permanent: true },
      { source: "/urunler", destination: "/ekipmanlar", permanent: true },
    ];
  },
};

export default nextConfig;
