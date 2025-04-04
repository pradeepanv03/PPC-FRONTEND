




import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPhone, FaRupeeSign } from "react-icons/fa";
import { BsBuildings, BsBank } from "react-icons/bs";
import { HiOutlineBuildingOffice2, HiOutlineNewspaper } from "react-icons/hi2";
import { LiaBedSolid, LiaMoneyCheckSolid } from "react-icons/lia";
import { RiCompass3Line } from "react-icons/ri";
import { AiOutlineFileDone } from "react-icons/ai";
import { RxDimensions } from "react-icons/rx";
import { IoLocationOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import imge from "../Assets/xd_profile1.png"
import axios from "axios";

export default function DetailBuyerAssistance() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [buyerData, setBuyerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestData, setRequestData] = useState(null);
const [matchedProperties, setMatchedProperties] = useState([]);



  // useEffect(() => {
  //   const fetchRequest = async () => {
  //     try {
  //       const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-buyerAssistance/${id}`);
  //       setRequestData(response.data.data);
  //     } catch (error) {
  //       setError("Error fetching data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (id) fetchRequest();
  // }, [id]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-buyerAssistance/${id}`);
        const data = response.data.data;
        setRequestData(data);
  
        // if (data?.interestedUserPhone) {
        //   // Fetch matched properties directly from the backend
        //   const matchedResponse = await axios.get(
        //     `${process.env.REACT_APP_API_URL}/fetch-owner-matched-properties?phoneNumber=${data.buyerPhoneNumber}`
        //   );
        //   setMatchedProperties(matchedResponse.data.properties);
        // }
        if (data?.interestedUserPhone) {
          const matchedResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/fetch-owner-matched-properties?phoneNumber=${data.buyerPhoneNumber}`
          );
          setMatchedProperties(matchedResponse.data.properties);
        }
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
  
    if (id) fetchRequest();
  }, [id]);
  
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!requestData) return <p>No data found.</p>;
  
    const handleViewMore = (phoneNumber, ppcId) => {
      navigate("/detail", { state: { ppcId, phoneNumber } });
    };
  
  return (
    <div className='d-flex justify-content-center algin-item-center w-100'>
    
    <div className='d-flex flex-column ' style={{maxWidth:"500px", width:"500px"}}>
    <div className="d-flex align-items-center justify-content-start w-100 pt-2 pb-2" style={{background:"#EFEFEF" }}>
              <button className="pe-5" onClick={() => navigate('/mobileviews')}><FaArrowLeft color="#30747F"/> 
            </button> <h3 className="m-0 ms-3" style={{fontSize:"15px", fontWeight:"bold"}}>DETAILED BUYER ASSISTANT</h3> </div>
       <div className='d-flex algin-item-center justify-content-center w-100' style={{height:"200px"}}>

        <img src={imge} alt="" style={{width:"200px"}}/></div>
        <div className='d-flex algin-item-center justify-content-center w-100'>    
              <div style={{background:"#C5C5C5", height:"2px", width:"90%"}}></div>
        </div>

        <div className='row w-100 mt-5'>
        <h5 className='ps-3 ms-3' style={{ color: "#30747F", fontWeight: "bold", marginBottom: "10px" }}> Budget</h5>   
            <div className="d-flex align-items-center mb-2">
                      <div className="d-flex  flex-row align-items-start w-100 ps-3">
                      <div className="d-flex align-items-center col-6">
                          <FaRupeeSign color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
                            Minimum Amount                           </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500"}}>
                            {requestData.minPrice || "N/A"}
                            </span>
                          </div>
                        </div>  
                     
      <div className="d-flex align-items-center col-6">
                          <FaRupeeSign color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
                            Maximum Amount                           </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500"}}>
                            {requestData.maxPrice || "N/A"}
                            </span>
                          </div>
                        </div>  
                        </div>
                        </div>
           {/* Lookin for */}
           <h5 className='ps-3 ms-3' style={{ color: "#30747F", fontWeight: "bold", marginBottom: "10px" }}> Looking for</h5>   
            <div className="d-flex align-items-center mb-2">
                      <div className="d-flex  flex-row align-items-start w-100 ps-3">
                      <div className="d-flex align-items-center col-6">
                          <BsBuildings   color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
                            Property Mode                           </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500"}}>
                            {requestData.propertyMode || "N/A"}
                            </span>
                          </div>
                        </div>  
                     
      <div className="d-flex align-items-center col-6">
                          <HiOutlineBuildingOffice2 color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
                           Property Type                           </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500"}}>
                            {requestData.propertyType || "N/A"}
                            </span>
                          </div>
                        </div>  
                        </div>
                        </div>
                        
             
            <div className="d-flex align-items-center mb-2">
                      <div className="d-flex  flex-row align-items-start w-100 ps-3">
                      <div className="d-flex align-items-center col-6">
                          <LiaBedSolid color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
                            Min.Bedroom                           </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500"}}>
                            {requestData.noOfBHK || "N/A"}
                            </span>
                          </div>
                        </div>  
                     
      <div className="d-flex align-items-center col-6">
                          <RiCompass3Line color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
                            Select Facing                          </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500"}}>
                            {requestData.facing || "N/A"}
                            </span>
                          </div>
                        </div>  
                        </div>
                        </div>
                        
            <div className="d-flex align-items-center mb-2">
                      <div className="d-flex  flex-row align-items-start w-100 ps-3">
                      <div className="d-flex align-items-center col-6">
                          <AiOutlineFileDone   color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
                            Approved                         </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500"}}>
                            {requestData.propertyApproved || "N/A"}
                            </span>
                          </div>
                        </div>  
                     
      <div className="d-flex align-items-center col-6">
                          <BsBank color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
                            Bank Loan                         </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500"}}>
                            {requestData.bankLoan || "N/A"}
                            </span>
                          </div>
                        </div>  
                        </div>
                        </div>
                        
                        
            <div className="d-flex align-items-center mb-2">
                      <div className="d-flex  flex-row align-items-start w-100 ps-3">
                      <div className="d-flex align-items-center col-6">
                          <RxDimensions color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
                            Minimum Area                             </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500"}}>
                            {requestData.totalArea || "N/A" }{requestData.areaUnit || "N/A"}
                            </span>
                          </div>
                        </div>  
                     
      <div className="d-flex align-items-center col-6">
                          <LuCalendarDays color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
                             Posted Date                   </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500"}}>
                            {new Date(requestData.createdAt).toLocaleString() || "N/A"}
                            </span>
                          </div>
                        </div>  
                        </div>
                        </div> 
                        
<div className="d-flex align-items-center mb-2">
  <div className="d-flex flex-row align-items-start w-100 ps-3">

    {/* Buyer Phone Number */}
    <div className="d-flex align-items-center col-6 mt-2" >
      <FaPhone color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
      <div>
        <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
          Buyer Phone Number
        </h6>
        <span className="card-text" style={{ color: "#1D1D1D", fontWeight: "500" }}>
          {requestData?.phoneNumber || "N/A"}
        </span>
      </div>
    </div>

    {/* Interested User Phone Number */}
    <div className="d-flex align-items-center col-6 mt-2">
      <FaPhone color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
      <div>
        <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
          Interested User Phone
        </h6>
        <span className="card-text" style={{ color: "#1D1D1D", fontWeight: "500" }}>
          {requestData?.interestedUserPhone || "N/A"}
        </span>
      </div>
    </div>

  </div>
</div>

                        <h5 className='ps-3 ms-3' style={{ color: "#30747F", fontWeight: "bold", marginBottom: "10px" }}> Location Preffered</h5>   
                        <div className='ps-3 ms-3 mb-2' style={{ display: 'flex', alignItems: 'center' }}>
  <IoLocationOutline color='#30747F' style={{ fontSize: '24px', flexShrink: 0, marginRight: '8px' }} />
  <p style={{ margin: 0, flex: 1 }}>{requestData.city || "N/A"}</p>

</div>


                        <h5 className='ps-3 ms-3' style={{ color: "#30747F", fontWeight: "bold", marginBottom: "10px" }}>Description</h5>   

<div className='ps-3 ms-3 mb-3' style={{ display: 'flex', alignItems: 'center' }}>
  <HiOutlineNewspaper color='#30747F' style={{ fontSize: '24px', flexShrink: 0, marginRight: '8px' }} />
  <p style={{ margin: 0, flex: 1 }}>{requestData.description || "No Description Available"}</p>
</div>

            <div className="d-flex align-items-center mb-2">
                      <div className="d-flex  flex-row align-items-start w-100 ps-3">
                      <div className="d-flex align-items-center col-6">
                          <LiaMoneyCheckSolid color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
                           Plan Name                      </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500"}}>
                            {requestData.paymentType || "N/A"}
                            </span>
                          </div>
                        </div>  
                     
      <div className="d-flex align-items-center col-6">
                          <LuCalendarDays color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                          <div>
                            <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
                           Expire Date                          </h6>
                            <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500"}}>
                            {new Date(requestData.updatedAt).toLocaleString() || "N/A"}
                            </span>
                          </div>
                        </div>  
                        </div>
                        </div> 


                        <div className="d-flex justify-content-between align-items-center ps-2 pe-2 mt-5 mb-5 col-12">
  <button className="btn text-white px-3 py-1 mx-1" style={{ background: "#FF0000", width: "80px", fontSize: "13px" }}>
    REMOVE
  </button>

  {/* You can add the "MATCHED PROP" button here if needed */}
  {/* <button className="btn text-white px-3 py-1 mx-1" style={{ background: "#2F747F", width: "80px", fontSize: "13px" }}>
    MATCHED PROP
  </button> */}

  <div className="d-flex flex-column align-items-center justify-content-center">
    {matchedProperties.length > 0 ? (
      // Display only the first "View More" button for the first matched property
      <button
        onClick={() => handleViewMore(matchedProperties[0].phoneNumber, matchedProperties[0].ppcId)}
        className="btn text-white px-3 py-1 mx-1"
        style={{ background: "#2F747F", width: "80px", fontSize: "13px" }}
      >
        Match Prop
      </button>
    ) : (
      <p>{requestData.interestedUserPhone}</p>
    )}
  </div>

  <button className="btn text-white px-3 py-1 mx-1" style={{ background: "#0F9F2C", width: "80px", fontSize: "13px" }}>
    PAY
  </button>
</div>

       </div>
    </div>
</div>
  );
}

