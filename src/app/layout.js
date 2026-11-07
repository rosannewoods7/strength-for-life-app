import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const scriptFont = Dancing_Script({ subsets: ["latin"], variable: "--font-script" });

export const metadata = {
  title: 'Strength for Life | 12-Week Strength & Longevity Protocol',
  description: 'The definitive adult strength, power, and metabolic resilience protocol.',
  manifest: '/manifest.json',
  openGraph: {
    title: 'Strength for Life | 12-Week Strength & Longevity Protocol',
    description: 'Build metabolic resilience, power, and functional longevity. Test drive the interactive strength protocol today.',
    url: 'https://strength-for-life-app.vercel.app',
    siteName: 'Strength for Life',
    images: [
      {
        url: 'https://www.drrosannewoods.com/favicon.ico',
        width: 1200,
        height: 630,
        alt: 'Strength for Life',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Strength for Life | 12-Week Strength & Longevity Protocol',
    description: 'Build metabolic resilience, power, and functional longevity. Test drive the interactive strength protocol today.',
  },
  icons: {
    icon: '/icon-192x192.png?v=3',
    apple: '/icon-512x512.png?v=3',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Strength for Life',
  },
};

export const viewport = {
  themeColor: '#0f2439',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

import { Analytics } from '@vercel/analytics/react';
import Chatbot from '@/components/Chatbot';
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${scriptFont.variable}`}>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '934257109639720');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=934257109639720&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}

        {children}
        <Analytics />
        <Chatbot />
      </body>
    </html>
  );
}
