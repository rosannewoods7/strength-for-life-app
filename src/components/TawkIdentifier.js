'use client';

import { useEffect } from 'react';

export default function TawkIdentifier({ userEmail }) {
  useEffect(() => {
    if (!userEmail) return;

    // Use a polling mechanism to ensure Tawk.to is fully loaded before setting attributes
    const identifyInterval = setInterval(() => {
      if (window.Tawk_API && typeof window.Tawk_API.setAttributes === 'function') {
        window.Tawk_API.setAttributes({
          name: userEmail, // Set name to email to replace "Visitor"
          email: userEmail
        }, function (error) {});
        clearInterval(identifyInterval);
      }
    }, 500);

    return () => clearInterval(identifyInterval);
  }, [userEmail]);

  return null;
}
