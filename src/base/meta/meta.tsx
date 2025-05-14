import { Fragment } from "react";

export const metadata = {
    title: "Cafe Street | Temukan Tempat Nongkrong Favorit Anda",
    description: "Jelajahi berbagai pilihan cafe, tempat kopi, dan spot kuliner unik di seluruh Indonesia. Temukan suasana nyaman untuk bersantai atau bekerja di Cafe Street!",
    author: "Space Digitalia - https://spacedigitalia.my.id",
    keywords: "Cafe, Kopi, Tempat Nongkrong, Kuliner, Cafe Unik, Cafe Hits, Cafe Street",
    icons: {
        icon: "/favicon.ico",
    },
    manifest: "/manifest.json",
    openGraph: {
        title: "Cafe Street",
        description: "Jelajahi berbagai pilihan cafe, tempat kopi, dan spot kuliner unik di seluruh Indonesia. Temukan suasana nyaman untuk bersantai atau bekerja di Cafe Street!",
        url: "https://cafe-street.space-digitalia.vercel.app",
        siteName: "Cafe Street",
        images: [
            {
                url: "https://cafe-street.space-digitalia.vercel.app/favicon.ico",
                width: 1920,
                height: 1080,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Cafe Street",
        description: "Jelajahi berbagai pilihan cafe, tempat kopi, dan spot kuliner unik di seluruh Indonesia. Temukan suasana nyaman untuk bersantai atau bekerja di Cafe Street!",
        creator: "@cafestreet",
        images: "https://cafe-street.space-digitalia.vercel.app/favicon.ico",
    },
};

const siteUrl = "https://cafe-street.space-digitalia.vercel.app";
const faviconUrl = `${siteUrl}/favicon.ico`;
const canonicalUrl = `${siteUrl}/`;

const Head = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CafeOrCoffeeShop",
        name: "Cafe Street",
        image: faviconUrl,
        "@id": siteUrl,
        url: siteUrl,
        description: metadata.description,
        logo: faviconUrl,
        title: metadata.title,
    };

    const jsonLdString = JSON.stringify(jsonLd);

    return (
        <Fragment>
            <title>{metadata.title}</title>
            <meta charSet="UTF-8" />
            <meta name="version" content="1.0" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content={metadata.description} />
            <meta property="og:description" content={metadata.description} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={metadata.title} />
            <meta name="author" content={metadata.author} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={faviconUrl} />
            <meta name="keywords" content={metadata.keywords} />
            <meta name="theme-color" content="#ffffff" />
            <meta name="robots" content="index, follow" />
            <link rel="icon" href={faviconUrl} type="image/x-icon" sizes="any" />
            <link rel="icon" href={faviconUrl} type="image/svg+xml" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href={faviconUrl} />
            <link rel="shortcut icon" href={faviconUrl} type="image/x-icon" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="canonical" href={canonicalUrl} />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLdString }}
            />
        </Fragment>
    );
};

export default Head;
