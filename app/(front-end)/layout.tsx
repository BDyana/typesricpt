import Footer from '@/components/(front-end)/footer';
import Navbar from '@/components/(front-end)/navbar';
import React from 'react';

export default function Layout({
  children,
  modal,
  // auth,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  auth: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="lg:w-[1185px] min-h-screen mx-auto py-2 lg:py-5 px-2 bg-[#f6f8fa]s">
        {children}

        <div className="hidden lg:block">{modal}</div>
        {/* {auth} */}
      </div>
      <Footer />
    </div>
  );
}
