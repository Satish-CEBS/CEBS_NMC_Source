import React from 'react';
import InnerHeader from '../../common/InnerHeader';
import InnerSubHeader from '../../common/InnerSubHeader';
import SidebarMenu from '../../common/SidebarMenu';
import Footer from '../../common/Footer';

const PageWrapper = ({ title, children }) => {
    return (
        <div className="dashboard">
            <InnerHeader />
            <InnerSubHeader title={title} />
            <div className="dashboard-body">
                <SidebarMenu />
                <main className="dashboard-content">
                    <div className="page-container">
                        {children}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default PageWrapper;
