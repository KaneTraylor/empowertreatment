# SEO Setup Guide for Empower Treatment

## Environment Variables Required

Add these to your `.env.local` file:

```env
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Search Console Verification (optional)
# Update the verification code in app/layout.tsx metadata
```

## SEO Implementation Checklist

### ✅ Completed

1. **Comprehensive Metadata**
   - Global metadata with title template
   - Open Graph tags for social sharing
   - Twitter Card tags
   - Keywords and descriptions
   - Robots meta tags

2. **Structured Data (JSON-LD)**
   - Medical Business schema
   - FAQ schema
   - Breadcrumb support
   - Service catalog

3. **Technical SEO**
   - Sitemap.xml generation
   - Robots.txt with proper rules
   - Canonical URLs
   - Manifest.json for PWA

4. **Analytics**
   - Google Analytics 4 setup
   - Ready for conversion tracking

### 📋 TODO

1. **Create Open Graph Image**
   - Design a 1200x630px image
   - Save as `/public/og-image.jpg`
   - Include logo and tagline

2. **Optimize Images**
   - Convert all `<img>` tags to Next.js `<Image>`
   - Add descriptive alt text
   - Use WebP format where possible

3. **Content Optimization**
   - Ensure H1 tags on all pages
   - Use proper heading hierarchy
   - Add internal linking
   - Create location-specific pages

4. **Performance**
   - Implement lazy loading
   - Optimize Core Web Vitals
   - Minimize JavaScript bundles

5. **Local SEO**
   - Create Google My Business listing
   - Add location pages for each service area
   - Implement local schema markup

## Page-Specific SEO

Each page should have:
- Unique title (50-60 characters)
- Unique description (150-160 characters)
- Proper H1 tag
- Breadcrumb navigation
- Internal links to related content

## Monitoring

1. **Google Search Console**
   - Submit sitemap
   - Monitor indexing status
   - Check for crawl errors

2. **Google Analytics**
   - Set up conversion goals
   - Track form submissions
   - Monitor user behavior

3. **Performance**
   - Use PageSpeed Insights
   - Monitor Core Web Vitals
   - Check mobile usability

## Keywords to Target

### Primary Keywords
- Outpatient mental health Ohio
- Addiction treatment center Ohio
- Suboxone clinic Ohio
- Teen therapy Ohio
- MAT program Ohio

### Long-tail Keywords
- Medication assisted treatment near me
- Outpatient addiction treatment Ohio
- Teen depression therapy Ohio
- Anxiety treatment center Ohio
- Mental health services that accept Medicaid

## Content Strategy

1. **Blog Topics** (Future)
   - Understanding MAT
   - Teen mental health signs
   - Insurance coverage guide
   - Recovery success stories
   - Treatment options explained

2. **Location Pages** (Future)
   - Service area pages
   - Directions and parking
   - Local resources

3. **Resource Pages** (Future)
   - Insurance guide
   - Treatment FAQ
   - Family resources
   - Crisis resources