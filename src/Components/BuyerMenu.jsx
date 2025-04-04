





import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MoreComponent.css';
import imge1 from '../Assets/myaccountmore.png';
import imge2 from '../Assets/sellermore.png';
import imge3 from '../Assets/buyermore.png';
import more2 from '../Assets/bottom.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


// MenuLink Component
const MenuLink = ({ to, label }) => (
    <Link to={to} style={{ textDecoration: "none" }}>
        <li className="list-group-item d-flex justify-content-between align-items-center custom-list-item">
            <div className="d-flex align-items-center">
                <span>{label}</span>
            </div>
            <span className="badge bg-primary rounded-pill">0</span>
        </li>
    </Link>
);

const MoreComponent = ({ phoneNumber }) => {
    const [activeTab, setActiveTab] = useState('buyerMenu');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const navigate = useNavigate();



    const handleAddProperty = async () => {
        if (!phoneNumber) {
            console.error("Missing phone number");
            return;
        }
    
    
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/store-data`,
                { phoneNumber }
            );
    
            if (response.status === 201) {
                const ppcId = response.data.ppcId;
                console.log("Navigating with PPC-ID:", ppcId); // Debugging log
                
                // Corrected navigation URL format
                navigate(`/add-property/${phoneNumber}?ppcId=${ppcId}`);
            }
        } catch (error) {
        }
    };
    


    return (
        <div className="container mt-4 p-1" 
        // style={{ fontFamily: "Inter, sans-serif", width: "100%", maxWidth: '600px' }}
        style={{
            fontFamily: "Inter, sans-serif",
            width: "100%",
            maxWidth: "600px",
            height: "80vh", // Adjust as needed
            overflowY: "auto",
            scrollbarWidth:"none"
        }}
        >
            {/* Navigation Tabs */}
            <ul className="nav nav-tabs d-flex justify-content-around align-items-center">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'myAccount' ? 'active' : ''}`}
                        style={activeTab === 'myAccount' ? { backgroundColor: '#30747F', color: 'white' } : { color: 'black' }}
                        onClick={() => handleTabClick('myAccount')}
                    >
                        MY ACCOUNT
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'ownerMenu' ? 'active' : ''}`}
                        style={activeTab === 'ownerMenu' ? { backgroundColor: '#30747F', color: 'white' } : { color: 'black' }}
                        onClick={() => handleTabClick('ownerMenu')}
                    >
                        OWNER MENU
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'buyerMenu' ? 'active' : ''}`}
                        style={activeTab === 'buyerMenu' ? { backgroundColor: '#30747F', color: 'white' } : { color: 'black' }}
                        onClick={() => handleTabClick('buyerMenu')}
                    >
                        BUYER MENU
                    </button>
                </li>
            </ul>

            {/* Content for Each Tab */}
            <div className="tab-content mt-3">
                {/* My Account Tab Content */}
               
             

 {/* My Account Tab Content */}
{activeTab === 'myAccount' && (
    <div className="tab-pane active">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="m-0" style={{ color: '#30747F' }}>My Account</h3>
            <img src={imge1} alt="My Account" className="rounded" />
        </div>
      


<ul className="list-group custom-list-group">
            <li 
                className="list-group-item d-flex justify-content-between align-items-center custom-list-item" 
                onClick={handleAddProperty} 
                style={{ cursor: "pointer" }}
            >
                <span>ADD RENTAL PROPERTY</span>
                <span className="badge bg-primary rounded-pill">0</span>
            </li>

            <MenuLink to={`/my-property`} label="My Property" />
            <MenuLink to={`/my-profile`} label="My Profile " />
            <MenuLink to={`/my-plan/${phoneNumber}`} label="My Plan" />
            <MenuLink to={`/notification`} label="Notification" />
            <MenuLink to={`/removed-property`} label="Removed Property" />
            <MenuLink to={`/expired-plans`} label="Expired Property" />
        </ul> 
    </div>
)}


                {/* Owner Menu Tab Content */}
                {activeTab === 'ownerMenu' && (
                    <div className="tab-pane active">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3 className="m-0" style={{ color: '#30747F' }}>Owner Menu</h3>
                            <img src={imge2} alt="Owner Menu" className="rounded" />
                        </div>
                        <ul className="list-group">
                            {/* Using MenuLink Component for Navigation */}
                            <MenuLink to={`/interest-owner/${phoneNumber}`} label="Interested Buyers " />
                            <MenuLink to={`/help-owner/${phoneNumber}`} label="NeedHelp Buyers" />
                            <MenuLink to={`/contact-owner/${phoneNumber}`} label="contact Buyers" />
                            <MenuLink to={`/report-property-owner/${phoneNumber}`} label="report property Buyers" />
                            <MenuLink to={`/soldout-owner/${phoneNumber}`} label="soldout Buyers" />
                            <MenuLink to={`/favorite-owner/${phoneNumber}`} label="Favorite Buyers" />
                            <MenuLink to={`/add-plan/${phoneNumber}`} label="Add Plans Buyers" />



                            <MenuLink to={`/matched-buyers`} label="Matched Buyers" />
                            <MenuLink to={`/offer-from-buyer`} label="Offers From Buyers" />
                            <MenuLink to={`/photo-request-send`} label="Photo Request Buyer" />
                            <MenuLink to={`/shortlist-buyer`} label="Shortlisted Buyers" />
                            <MenuLink to={`/view-buyers`} label="Viewed Buyers" />
                            <MenuLink to={`/buyer-lists`} label="Buyer List" />
                            <MenuLink to={`/leads`} label="Leads Center" />
                        </ul>
                    </div>
                )}

                {/* Buyer Menu Tab Content */}
                {activeTab === 'buyerMenu' && (
                    <div className="tab-pane active">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3 className="m-0" style={{ color: '#30747F' }}>Buyer Menu</h3>
                            <img src={imge3} alt="Buyer Menu" className="rounded" />
                        </div>
                        <ul className="list-group">
                            {/* Example usage of MenuLink for buyer */}
                            <MenuLink to={`/interest-buyer/${phoneNumber}`} label="Owners Interested " />
                            <MenuLink to={`/help-buyer/${phoneNumber}`} label="Owners NeedHelp " />
                            <MenuLink to={`/contact-buyer/${phoneNumber}`} label="Contacted Owners" />
                            <MenuLink to={`/report-property-buyer/${phoneNumber}`} label="Owners report property " />
                            <MenuLink to={`/soldout-buyer/${phoneNumber}`} label="Owners Soldout" />
                            <MenuLink to={`/favorite-buyer/${phoneNumber}`} label="Owners favorite" />

                            {/* <MenuLink to={`/buyer-profile/${phoneNumber}`} label="Buyer Profile" /> */}
                        </ul>
                    </div>
                )}
            </div>

            {/* Footer Image */}
            <img src={more2} alt="Footer" style={{ width: '100%', marginTop: '20px' }} />
        </div>
    );
};

export default MoreComponent;























