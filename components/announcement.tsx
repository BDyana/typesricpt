import React from 'react';
import Link from 'next/link';

export default function Announcement() {
  return (
    <div className="bg-brandColor px-4 py-3 text-white">
      <p className="text-center text-sm font-medium">
        Love our services?
        <Link
          href="https://yoreview.mosespace.com/bdyana-site/review"
          target="_blank"
          className="inline-block ml-2 underline"
        >
          take time to give us a review here please 🙏 man!
        </Link>
      </p>
    </div>
  );
}
