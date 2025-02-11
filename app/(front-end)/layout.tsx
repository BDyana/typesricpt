import Footer from '@/components/(front-end)/footer';
import Navbar from '@/components/(front-end)/navbar';
import React from 'react';

export default function Layout({
  children,
  // modal, // removed model upon request
}: {
  children: React.ReactNode;
  // modal: React.ReactNode; // removed model upon request
  auth: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="lg:w-[1185px] min-h-screen mx-auto py-2 lg:py-5 px-2 bg-[#f6f8fa]s">
        {children}
        {/* {modal} */}
      </div>
      <Footer />
    </div>
  );
}
