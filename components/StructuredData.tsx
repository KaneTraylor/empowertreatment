export function TreatmentCenterSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Empower Treatment",
    "description": "Comprehensive outpatient mental health and addiction treatment center in Ohio",
    "url": "https://empowertreatment.com",
    "telephone": "+17402000016",
    "email": "info@empowertreatment.com",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "OH",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "39.9612",
      "longitude": "-82.9988"
    },
    "image": "https://empowertreatment.com/logo.png",
    "priceRange": "$$",
    "openingHours": "Mo-Fr 08:00-20:00, Sa 09:00-17:00",
    "medicalSpecialty": [
      "Psychiatry",
      "AddictionMedicine",
      "Psychology"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mental Health and Addiction Treatment Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Substance Use Disorder Treatment",
            "description": "Medication-Assisted Treatment (MAT) including Suboxone for opioid use disorder"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Mental Health Therapy",
            "description": "Individual and group therapy for depression, anxiety, PTSD, and other mental health conditions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Teen & Youth Services",
            "description": "Specialized therapy and counseling services for adolescents and teenagers"
          }
        }
      ]
    },
    "acceptsInsurance": true,
    "paymentAccepted": "Cash, Credit Card, Insurance",
    "availableService": {
      "@type": "MedicalService",
      "name": "Telehealth Services",
      "description": "Virtual therapy and medication management appointments available"
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "4.8",
        "bestRating": "5"
      },
      "author": {
        "@type": "Organization",
        "name": "Google Reviews"
      }
    },
    "sameAs": [
      "https://www.facebook.com/empowertreatment",
      "https://www.instagram.com/empowertreatment",
      "https://www.linkedin.com/company/empowertreatment"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What types of insurance do you accept?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We are in-network with all major insurance plans including Aetna, Anthem BCBS, Blue Cross Blue Shield, Cigna, United Healthcare, Humana, Kaiser Permanente, WellCare, Medicaid, and Medicare. We offer instant insurance verification on our website."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer medication-assisted treatment (MAT)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer comprehensive MAT programs including Suboxone treatment for opioid use disorder. Our medical team provides personalized treatment plans combining medication with therapy."
        }
      },
      {
        "@type": "Question",
        "name": "What age groups do you treat?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide services for both adults and youth. Our youth services specialize in treating teens and adolescents ages 12-17, while our adult programs serve individuals 18 and older."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer telehealth appointments?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer both in-person and telehealth appointments for therapy and medication management. Virtual appointments provide convenient access to care from the comfort of your home."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}