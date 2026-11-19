import Script from "next/script";

/**
 * Google Analytics 4. Renders nothing unless NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
 *
 * One `config` call sends the initial page_view; GA4 "Enhanced measurement → page changes
 * based on browser history events" (on by default) records client-side navigations.
 * Do not add manual page_view events as well, or views will be double-counted.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function Analytics() {
  if (!GA_ID || !/^G-[A-Z0-9]+$/.test(GA_ID)) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
