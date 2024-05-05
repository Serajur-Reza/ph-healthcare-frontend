import Footer from "@/components/Shared/Footer/footer";
import Navbar from "@/components/Shared/Navbar/Navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const CommonLayout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
