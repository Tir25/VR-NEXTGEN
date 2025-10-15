import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="VR NextGEN Solutions - Your Partner in Data-Driven Business Growth. We don't just consult; we create pathways for your business to thrive." />
        <meta name="keywords" content="business consultancy, data-driven strategy, inventory management, production coaching, analytics, business insights" />
        <meta name="author" content="VR NextGEN Solutions" />
        <meta name="robots" content="index, follow" />
        {/* Font Awesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="VR NextGEN Solutions - Data-Driven Business Growth" />
        <meta property="og:description" content="We don't just consult; we create pathways for your business to thrive." />
        <meta property="og:site_name" content="VR NextGEN Solutions" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="VR NextGEN Solutions - Data-Driven Business Growth" />
        <meta property="twitter:description" content="We don't just consult; we create pathways for your business to thrive." />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
