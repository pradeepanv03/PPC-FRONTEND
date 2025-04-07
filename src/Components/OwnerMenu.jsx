import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MoreComponent.css';
import imge1 from '../Assets/myaccountmore.png';
import imge2 from '../Assets/sellermore.png';
import imge3 from '../Assets/buyermore.png';
import more2 from '../Assets/bottom.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


// MenuLink Component
const MenuLink = ({ to, label , count }) => (
    <Link to={to} style={{ textDecoration: "none" }}>
        <li className="list-group-item d-flex justify-content-between align-items-center custom-list-item">
            <div className="d-flex align-items-center">
                <span>{label}</span>
            </div>
            {count !== undefined && count !== null && ( // This moves to the right
                <span className="badge bg-success rounded-pill">{count}</span>
            )}        </li>
    </Link>
);

const MoreComponent = ({ phoneNumber }) => {
    const [activeTab, setActiveTab] = useState('ownerMenu');
      const [loading, setLoading] = useState(false);
    

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const [buyerViewedCount, setBuyerViewedCount] = useState(0);
      const [interestBuyersCount, setInterestBuyersCount] = useState(0);
      const [helpRequestsCount, setHelpRequestsCount] = useState(0);
      const [contactBuyerCount, setContactBuyerCount] = useState(0);

      const [reportRequestsCount, setReportRequestsCount] = useState(0);
      const [soldOutRequestsCount, setSoldOutRequestsCount] = useState(0);
      const [favoriteRequestsCount, setFavoriteRequestsCount] = useState(0);

      const [photoRequestsCount, setPhotoRequestsCount] = useState(0);
      const [matchedPropertiesCount, setMatchedPropertiesCount] = useState(0);
      const [offersCount, setOffersCount] = useState(0);
      const [ownerOfferCount, setOwnerOfferCount] = useState(0);
      const [ownerPhotoRequestCount, setOwnerPhotoRequestCount] = useState(0);
      const [ownerMatchedPropertyCount, setOwnerMatchedPropertyCount] = useState(0);
      const [favoriteCount, setFavoriteCount] = useState(0);
const [favoriteOwnerCount, setFavoriteOwnerCount] = useState(0);
const [favoriteRemovedOwnerCount, setFavoriteRemovedOwnerCount] = useState(0);
const [reportPropertyOwnersCount, setReportPropertyOwnersCount] = useState(0);
const [contactOwnersCount, setContactOwnersCount] = useState(0);
const [helpOwnersCount, setHelpOwnersCount] = useState(0);
const [interestOwnersCount, setInterestOwnersCount] = useState(0);
const [viewedPropertiesCount, setViewedPropertiesCount] = useState(0);

const [totalPlansCount, setTotalPlansCount] = useState(0);

const [userCount, setUserCount] = useState(0);

const [deleteCount,setDeleteCount]= useState(0);

const [notificationCount, setNotificationCount] = useState(0);

  const [planCount, setPlanCount] = useState(0);


  useEffect(() => {

    const fetchPlanCount = async () => {
      if (!phoneNumber) return;

      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/plans/count/${phoneNumber}`
        );
        setPlanCount(data.count);
      } catch (error) {
        console.error("Error fetching plan count:", error);
        setError("Error fetching plan count.");
      }
    };

    fetchPlanCount();
  }, [phoneNumber]);


useEffect(() => {
    const fetchNotificationCount = async () => {
      if (!phoneNumber) return; // Avoid API call if phoneNumber is missing

      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/notifications/count/${phoneNumber}`
        );
        setNotificationCount(data.count);
      } catch (error) {
        console.error("Error fetching notification count:", error);
        setError("Error fetching notification count");
      }
    };

    fetchNotificationCount();
  }, [phoneNumber]);

useEffect(() => {
    const fetchUserCount = async () => {
        if (!phoneNumber) return;
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-delete-status-count?phoneNumber=${phoneNumber}`);
            setDeleteCount(data.count);
        } catch (err) {
            console.error("Error fetching user count:", err);
            setError("Failed to fetch user count");
        } finally {
            setLoading(false);
        }
    };

    fetchUserCount();
}, [phoneNumber]);


useEffect(() => {
    const fetchUserCount = async () => {
        if (!phoneNumber) return;
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-status-count?phoneNumber=${phoneNumber}`);
            setUserCount(data.count);
        } catch (err) {
            console.error("Error fetching user count:", err);
            setError("Failed to fetch user count");
        } finally {
            setLoading(false);
        }
    };

    fetchUserCount();
}, [phoneNumber]);


    useEffect(() => {
        const fetchPlansCount = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-all-plan-count`);
                setTotalPlansCount(data.totalPlansCount);
            } catch (error) {
                console.error("Error fetching plan count:", error);
            }
        };

        fetchPlansCount();
    }, []);


useEffect(() => {
    const fetchViewedPropertiesCount = async () => {
        if (!phoneNumber) return; // Avoid API call if phoneNumber is missing

        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_URL}/property-owner-viewed-users-count?phoneNumber=${phoneNumber}`
            );
            setViewedPropertiesCount(data.viewedPropertiesCount);
        } catch (error) {
            console.error("Error fetching viewed properties count:", error);
        }
    };

    fetchViewedPropertiesCount();
}, [phoneNumber]);

useEffect(() => {
    const fetchInterestOwnersCount = async () => {
        if (!phoneNumber) return; // Avoid API call if phoneNumber is missing

        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_URL}/get-interest-owner-count?phoneNumber=${phoneNumber}`
            );
            setInterestOwnersCount(data.interestOwnersCount);
        } catch (error) {
            console.error("Error fetching interest request owners count:", error);
        }
    };

    fetchInterestOwnersCount();
}, [phoneNumber]);

    useEffect(() => {
        const fetchHelpOwnersCount = async () => {
            if (!phoneNumber) return; // Avoid API call if phoneNumber is missing

            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_API_URL}/get-help-as-owner-count?phoneNumber=${phoneNumber}`
                );
                setHelpOwnersCount(data.helpOwnersCount);
            } catch (error) {
                console.error("Error fetching help request owners count:", error);
            }
        };

        fetchHelpOwnersCount();
    }, [phoneNumber]);

useEffect(() => {
    const fetchContactOwnersCount = async () => {
        if (!phoneNumber) return; // Avoid API call if phoneNumber is missing

        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_URL}/get-contact-owner-count?phoneNumber=${phoneNumber}`
            );
            setContactOwnersCount(data.contactOwnersCount);
        } catch (error) {
            console.error("Error fetching contact owners count:", error);
        }
    };

    fetchContactOwnersCount();
}, [phoneNumber]);

    useEffect(() => {
        const fetchReportPropertyOwnersCount = async () => {
            if (!phoneNumber) return; // Ensure phoneNumber exists before making the request

            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-reportproperty-owner-count?phoneNumber=${phoneNumber}`);
                setReportPropertyOwnersCount(data.reportPropertyOwnersCount);
            } catch (error) {
                console.error("Error fetching report property owners count:", error);
            }
        };

        fetchReportPropertyOwnersCount();
    }, [phoneNumber]); 



const [soldOutOwnersCount, setSoldOutOwnersCount] = useState(0);

useEffect(() => {
    const fetchSoldOutOwnersCount = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-soldout-owner-count?phoneNumber=${phoneNumber}`);
            setSoldOutOwnersCount(data.soldOutOwnersCount);
        } catch (error) {
            console.error("Error fetching sold-out owners count:", error);
        }
    };

    fetchSoldOutOwnersCount();
}, [phoneNumber]);


useEffect(() => {
    const fetchFavoriteRemovedOwnerCount = async () => {
        try {
            if (!phoneNumber) return;

            const { data } = await axios.get(
                `${process.env.REACT_APP_API_URL}/get-favorite-removed-owner-count?phoneNumber=${phoneNumber}`
            );

            setFavoriteRemovedOwnerCount(data.favoriteRemovedOwnerCount);
        } catch (error) {
            console.error("Error fetching favorite removed owner count:", error);
            setError("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    fetchFavoriteRemovedOwnerCount();
}, [phoneNumber]);


useEffect(() => {
    const fetchFavoriteOwnerCount = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-favorite-owner-count?phoneNumber=${phoneNumber}`);
            setFavoriteOwnerCount(data.favoriteOwnerCount);
        } catch (error) {
            console.error("Error fetching favorite owner count:", error);
        }
    };

    if (phoneNumber) {
        fetchFavoriteOwnerCount();
    }
}, [phoneNumber]); // Re-run when phoneNumber changes





useEffect(() => {
    const fetchOwnerMatchedPropertyCount = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-owner-matched-properties/count?phoneNumber=${phoneNumber}`);
            setOwnerMatchedPropertyCount(data.matchedPropertyCount);
        } catch (error) {
            console.error("Error fetching owner matched property count:", error);
        }
    };

    fetchOwnerMatchedPropertyCount();
}, [phoneNumber]);


useEffect(() => {
    const fetchOwnerPhotoRequestCount = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/photo-requests/owner/count/${phoneNumber}`);
            setOwnerPhotoRequestCount(data.photoRequestCount);
        } catch (error) {
            console.error("Error fetching owner photo request count:", error);
        }
    };

    fetchOwnerPhotoRequestCount();
}, [phoneNumber]);


      useEffect(() => {
          const fetchOwnerOfferCount = async () => {
              try {
                  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/offers/owner/count/${phoneNumber}`);
                  setOwnerOfferCount(data.offerCount);
              } catch (error) {
                  console.error("Error fetching owner offer count:", error);
              }
          };
      
          fetchOwnerOfferCount();
      }, [phoneNumber]);
      


useEffect(() => {
    const fetchOffersCount = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/offers/buyer/count/${phoneNumber}`);
            setOffersCount(data.offersCount);
        } catch (error) {
            console.error("Error fetching offer count:", error);
        }
    };

    fetchOffersCount();
}, [phoneNumber]);


useEffect(() => {
    const fetchMatchedPropertiesCount = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-buyer-matched-properties/count?phoneNumber=${phoneNumber}`);
            setMatchedPropertiesCount(data.matchedPropertiesCount);
        } catch (error) {
            console.error("Error fetching matched properties count:", error);
        }
    };

    fetchMatchedPropertiesCount();
}, [phoneNumber]);


      useEffect(() => {
          const fetchPhotoRequestsCount = async () => {
              try {
                  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/photo-requests/buyer/count/${phoneNumber}`);
                  setPhotoRequestsCount(data.photoRequestsCount);
              } catch (error) {
                  console.error("Error fetching photo requests count:", error);
              }
          };
      
          fetchPhotoRequestsCount();
      }, [phoneNumber]);
      

useEffect(() => {
    const fetchFavoriteRequestsCount = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-favorite-buyer-count?postedPhoneNumber=${phoneNumber}`);
            setFavoriteRequestsCount(data.favoriteRequestsCount);
        } catch (error) {
            console.error("Error fetching favorite requests count:", error);
        }
    };

    fetchFavoriteRequestsCount();
}, [phoneNumber]);


useEffect(() => {
    const fetchSoldOutRequestsCount = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-soldout-buyer-count?postedPhoneNumber=${phoneNumber}`);
            setSoldOutRequestsCount(data.soldOutRequestsCount);
        } catch (error) {
            console.error("Error fetching sold-out requests count:", error);
        }
    };

    fetchSoldOutRequestsCount();
}, [phoneNumber]);


useEffect(() => {
    const fetchReportRequestsCount = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-reportproperty-buyer-count?postedPhoneNumber=${phoneNumber}`);
            setReportRequestsCount(data.reportRequestsCount);
        } catch (error) {
            console.error("Error fetching reported property requests count:", error);
        }
    };

    fetchReportRequestsCount();
}, [phoneNumber]);
    
      useEffect(() => {
        if (!phoneNumber) {
          setLoading(false);
          return;
        }
    
        const fetchInterestBuyersCount = async () => {
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL}/interest-buyers-count/${phoneNumber}`
            );
    
            if (response.status === 200) {
              setInterestBuyersCount(response.data.interestBuyersCount);
            }
          } catch (error) {
            console.error("Error fetching interest buyers count:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchInterestBuyersCount();
      }, [phoneNumber]);
    

      useEffect(() => {
        // Fetch buyer viewed count
        const fetchBuyerViewedCount = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/property-buyer-viewed-count?phoneNumber=${phoneNumber}`);
                setBuyerViewedCount(data.buyerViewedCount);
            } catch (error) {
                console.error("Error fetching buyer viewed count:", error);
            }
        };
    
        fetchBuyerViewedCount();
    }, [phoneNumber]);

    useEffect(() => {
    const fetchHelpRequestsCount = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-help-as-buyer-count?postedPhoneNumber=${phoneNumber}`);
            setHelpRequestsCount(data.helpRequestsCount);
        } catch (error) {
            console.error("Error fetching help requests count:", error);
        }
    };

    fetchHelpRequestsCount();
}, [phoneNumber]);


  // Fetch contact buyer count
  useEffect(() => {
  const fetchContactBuyerCount = async () => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-contact-buyer-count?postedPhoneNumber=${phoneNumber}`);
        setContactBuyerCount(data.contactBuyerCount);
    } catch (error) {
        console.error("Error fetching contact buyer count:", error);
    }
};

fetchContactBuyerCount();
}, [phoneNumber]);




    

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
    
                // Corrected navigation
                // navigate(`/add-property`, { state: { ppcId, phoneNumber } });
                navigate(`/add-property/${phoneNumber}?ppcId=${ppcId}`);

            }
        } catch (error) {
            console.error("Error adding property:", error);
        }
    };
    

    return (
        <div className="container mb-4 p-1" 
        // style={{ fontFamily: "Inter, sans-serif", width: "100%", maxWidth: '600px' }}
        style={{
            fontFamily: "Inter, sans-serif",
            width: "100%",
            // maxWidth: "600px",
            // height: "80vh", // Adjust as needed
            overflowY: "auto",
            scrollbarWidth:"none"
        }}
        >
            {/* Navigation Tabs */}
            <ul className="nav nav-tabs d-flex flex-row flex-nowrap justify-content-between align-items-center w-100">
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
                {/* <span className="badge bg-primary rounded-pill">0</span> */}
            </li>

            
            <MenuLink 
    to={`/my-property`} 
    label="My Property "  
    count={userCount}   
/>

<MenuLink to={`/my-profile/${phoneNumber}`} label="My Profile " />


<MenuLink 
    to={`/removed-property`} 
    label="Removed Property "  
    count={deleteCount}   
/>


<MenuLink 
    to={`/notification`} 
    label="Notifications "  
    count={notificationCount}   
/>



<MenuLink 
    to={`/my-plan`} 
    label="My Plan "  
    count={planCount}   
/>
<MenuLink 
    to={`/my-last-property`} 
    label="My last view property"  
    count={planCount}   
/>
         

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

                        <MenuLink 
    to={`/interest-owner/${phoneNumber}`} 
    label="Interested Owners "  
    count={interestOwnersCount}   
/>

<MenuLink  
    to={`/help-owner/${phoneNumber}`} 
    label="Help Requests"
    count={helpOwnersCount}
    badgeClass="bg-warning" 
/>

<MenuLink  
    to={`/contact-owner/${phoneNumber}`} 
    label="Contacted Owners"
    count={contactOwnersCount}
    badgeClass="bg-primary" 
/>

<MenuLink  
    to={`/report-property-owner/${phoneNumber}`} 
    label="Report Property Owners"
    count={reportPropertyOwnersCount}
    badgeClass="bg-warning" 
/>

<MenuLink  
    to={`/soldout-owner/${phoneNumber}`} 
    label="Sold-Out Owners"
    count={soldOutOwnersCount}
    badgeClass="bg-warning" 
/>

<MenuLink  
    to={`/favorite-owner/${phoneNumber}`} 
    label="Favorites Owner"
    count={favoriteOwnerCount}
    badgeClass="bg-success" 
/>

<MenuLink  
    to={`/favorite-remove-owner/${phoneNumber}`} 
    label="Removed Favorites Owner"
    count={favoriteRemovedOwnerCount}
    badgeClass="bg-danger" 
/>

<MenuLink  
    to={`/photo-request-owner/${phoneNumber}`} 
    label="Photo Requests"
    count={ownerPhotoRequestCount}
    badgeClass="bg-info" 
/>

<MenuLink  
    to={`/offer-owner/${phoneNumber}`} 
    label="Offers Owner"
    count={ownerOfferCount}
    badgeClass="bg-success" 
/>

<MenuLink  
    to={`/matched-owner/${phoneNumber}`} 
    label="Matched Properties"
    count={ownerMatchedPropertyCount}
    badgeClass="bg-success" 
/>

<MenuLink  
    to={`/view-owner/${phoneNumber}`} 
    label="Viewed Properties"
    count={viewedPropertiesCount}
    badgeClass="bg-info" 
/>

<MenuLink  
    to={`/add-plan`} 
    label="Add Plans Owners"
    count={totalPlansCount}
    badgeClass="bg-success" 
/>

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
                 
                           
                            <MenuLink  
    to={`/interest-buyer/${phoneNumber}`} 
    label="Buyer Interested"
    count={interestBuyersCount}
    badgeClass="bg-primary" 
/>

<MenuLink  
    to={`/help-buyer/${phoneNumber}`} 
    label="Help Requests"
    count={helpRequestsCount}
    badgeClass="bg-danger" 
/>

<MenuLink  
    to={`/contact-buyer/${phoneNumber}`} 
    label="Contact Buyer Requests"
    count={contactBuyerCount}
    badgeClass="bg-warning" 
/>

<MenuLink  
    to={`/report-property-buyer/${phoneNumber}`} 
    label="Buyer Report Property Request"
    count={reportRequestsCount}
    badgeClass="bg-warning" 
/>

<MenuLink  
    to={`/soldout-buyer/${phoneNumber}`} 
    label="Buyer Sold-Out Requests"
    count={soldOutRequestsCount}
    badgeClass="bg-danger" 
/>

<MenuLink  
    to={`/favorite-buyer/${phoneNumber}`} 
    label="Buyer Favorite Requests"
    count={favoriteRequestsCount}
    badgeClass="bg-primary" 
/>

<MenuLink  
    to={`/view-buyer/${phoneNumber}`} 
    label="Buyer Viewed"
    count={buyerViewedCount}
    badgeClass="bg-success" 
/>

<MenuLink  
    to={`/offer-buyer/${phoneNumber}`} 
    label="Offers Received"
    count={offersCount}
    badgeClass="bg-info" 
/>

<MenuLink  
    to={`/photo-request-buyer/${phoneNumber}`} 
    label="Buyer Photo Requests"
    count={photoRequestsCount}
    badgeClass="bg-info" 
/>

<MenuLink  
    to={`/matched-buyer/${phoneNumber}`} 
    label="Matched Buyer Requests"
    count={matchedPropertiesCount}
    badgeClass="bg-success" 
/>
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
























