'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

export default function Chatbot() {
  const pathname = usePathname();

  // Hide on public marketing pages
  if (pathname === '/' || pathname === '/login' || pathname === '/trial') {
    return null;
  }

  return (
    <Script id="tawk" strategy="afterInteractive">
      {`
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/6a541c0a9b730d1d46be04ba/1jtc8r2ec';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
      `}
    </Script>
  );
}
