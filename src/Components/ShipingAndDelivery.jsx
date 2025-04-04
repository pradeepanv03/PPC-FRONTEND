








import React, { useState, useEffect } from "react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const ShippingAndDelivery = () => {
    const [type, setType] = useState("shiping&Delivery"); // Default type
    const [content, setContent] = useState("");

          
const navigate = useNavigate();

const handlePageNavigation = () => {
  navigate('/'); // Redirect to the desired path
};

    // Fetch existing content when component loads
    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-text/${type}`);
                setContent(response.data?.content || ""); // Set empty string if undefined
            } catch (error) {
                console.error("Error fetching content:", error);
                setContent(""); // Ensure it doesn't break
            }
        };

        fetchContent();
    }, [type]); // Runs when `type` changes

    return (
           <div className="container">
                {/* <h5 style={{color:'#646464', fontWeight:'500'}}>About Us</h5> */}
                <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
                  <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
                </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>Shiping And Delivery</h3> </div>
                

            <div>
                <p dangerouslySetInnerHTML={{ __html: content }}></p>  
            </div>
        </div>
    );
};

export default ShippingAndDelivery;





