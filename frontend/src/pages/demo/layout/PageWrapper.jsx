import React from "react";
import InnerHeader from "../../common/InnerHeader";
import InnerSubHeader from "../../common/InnerSubHeader";
import SidebarMenu from "../../common/SidebarMenu";
import Footer from "../../common/Footer";
import MaritimeLayout from "../../common/Applayout";

const PageWrapper = ({ title, children }) => {
  return (
    <MaritimeLayout>
      <div className="dashboard">
        <div className="dashboard-body">
          <main className="dashboard-content">
            <div className="page-container">{children}</div>
          </main>
        </div>
        <Footer />
      </div>
    </MaritimeLayout>
  );
};

export default PageWrapper;
