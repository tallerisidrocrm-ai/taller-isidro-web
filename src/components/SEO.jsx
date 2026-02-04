import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { businessConfig } from '../config';

export default function SEO({ title, description, keywords, image, noindex }) {
    const location = useLocation();
    const siteUrl = 'https://tallerisidro.cloud';
    const currentUrl = `${siteUrl}${location.pathname}`;

    const seoTitle = title ? `${title} | ${businessConfig.name}` : businessConfig.seo.title;
    const seoDescription = description || businessConfig.seo.description;
    const seoKeywords = keywords || businessConfig.seo.keywords;
    const seoImage = image || `${siteUrl}/social-preview.png`;

    // LocalBusiness JSON-LD
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "AutoRepair",
        "name": businessConfig.name,
        "image": [seoImage],
        "description": seoDescription,
        "@id": `${siteUrl}/#organization`,
        "url": siteUrl,
        "telephone": businessConfig.phone || `+${businessConfig.whatsappNumber}`,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": businessConfig.address.split(',')[0],
            "addressLocality": "Béccar",
            "addressRegion": "Buenos Aires",
            "postalCode": "B1643FTQ",
            "addressCountry": "AR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": -34.4646,
            "longitude": -58.5327
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "16:30"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "08:00",
                "closes": "13:00"
            }
        ],
        "priceRange": "$$",
        "sameAs": [
            businessConfig.social.instagram,
            businessConfig.social.facebook
        ]
    };

    return (
        <Helmet>
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
            <meta name="keywords" content={seoKeywords} />
            {noindex && <meta name="robots" content="noindex, nofollow" />}
            <link rel="canonical" href={currentUrl} />

            {/* OG Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={seoTitle} />
            <meta property="og:description" content={seoDescription} />
            <meta property="og:image" content={seoImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={seoTitle} />
            <meta property="twitter:description" content={seoDescription} />
            <meta property="twitter:image" content={seoImage} />

            {/* Structured Data - Only if not noindexed */}
            {!noindex && (
                <script type="application/ld+json">
                    {JSON.stringify(localBusinessSchema)}
                </script>
            )}
        </Helmet>
    );
}
