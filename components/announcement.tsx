import React from 'react';
import Link from 'next/link';

export default function Announcement() {
  return (
    <div className="bg-brandColor px-4 py-3 text-white">
      <p className="text-center text-sm font-medium">
        Love our services?
        <Link
          href="https://www.google.com/search?q=bdyana&oq=bdyana&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRhBMgYIAhBFGDwyBggDEEUYPDIGCAQQRRg8MgYIBRBFGDwyBggGEEUYQTIGCAcQRRhB0gEIMzU1N2owajeoAgCwAgA&sourceid=chrome&ie=UTF-8#lrd=0x3755c58ba40a76a1:0xb594667829893d7b,3,,,,"
          target="_blank"
          className="inline-block ml-2 underline"
        >
          take time to give us a review here please 🙏 man!
        </Link>
      </p>
    </div>
  );
}
