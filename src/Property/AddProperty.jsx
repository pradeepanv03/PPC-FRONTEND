import React from 'react';
import { Button, Form } from 'react-bootstrap';

const AddProperty = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="shadow p-4 rounded bg-white" style={{ maxWidth: '500px' }}>
        <h3 className="mb-4" style={{ color: '#45a29e', fontWeight: 'bold' }}>Add Property</h3>

        {/* Property Form */}
        <Form>
          <Form.Group className="mb-3" controlId="propertyName">
            <Form.Control type="text" placeholder="Property Name" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="propertyDescription">
            <Form.Control as="textarea" rows={3} placeholder="Property Description" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="propertyPrice">
            <Form.Control type="number" placeholder="Price" required />
          </Form.Group>

          {/* Submit Button */}
          <Button variant="primary" type="submit" style={{ background: '#45a29e', border: 'none' }} className="w-100">
            Add Property
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddProperty;
















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AddProperty = () => {
//   const [propertyData, setPropertyData] = useState({
//     propertyMode: '',
//     propertyType: '',
//     price: '',
//     description: '',
//     PhoneNumber: '',
//     photos: [],
//   });

//   const [video, setVideo] = useState(null);
//   const [statusMessage, setStatusMessage] = useState('');
//   const [isUpdate, setIsUpdate] = useState(false); // To check if we're updating
//   const [editMode, setEditMode] = useState(false); // To manage edit mode
//   const [newPropertyId, setNewPropertyId] = useState(null); // Store the new property ID
//   const [isLoading, setIsLoading] = useState(false); // Loading state for API requests

//   // Fetch property data for the given phone number
//   const fetchPropertyData = async (phoneNumber) => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get(`http://localhost:1000/PPC/get-property/${phoneNumber}`);
//       const property = response.data.property;

//       if (property) {
//         // Property exists, update form data for update mode
//         setPropertyData({
//           ...property,
//           photos: property.photos || [],
//         });
//         setIsUpdate(true); // Set to update mode
//         setEditMode(true); // Enable edit mode
//         setStatusMessage('');
//       } else {
//         // Property does not exist, reset the form
//         setStatusMessage('Property not found. You can add a new property.');
//         setIsUpdate(false);
//         setEditMode(false);
//       }
//     } catch (error) {
//       setStatusMessage('Error fetching property data.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPropertyData({
//       ...propertyData,
//       [name]: value,
//     });
//   };

//   // Handle photo upload
//   const handlePhotoUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const maxSize = 10 * 1024 * 1024; // 10MB limit
//     for (let file of files) {
//       if (file.size > maxSize) {
//         setStatusMessage('File size exceeds the 10MB limit');
//         return;
//       }
//     }
//     if (propertyData.photos.length + files.length <= 15) {
//       setPropertyData({
//         ...propertyData,
//         photos: [...propertyData.photos, ...files],
//       });
//     } else {
//       setStatusMessage('Maximum 15 photos can be uploaded.');
//     }
//   };

//   // Handle photo removal
//   const removePhoto = (index) => {
//     setPropertyData({
//       ...propertyData,
//       photos: propertyData.photos.filter((_, i) => i !== index),
//     });
//   };

//   // Handle video change
//   const handleVideoChange = (e) => {
//     setVideo(e.target.files[0]);
//   };

//   // Handle form submission (Add/Update property)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     const formData = new FormData();
//     formData.append('propertyMode', propertyData.propertyMode);
//     formData.append('propertyType', propertyData.propertyType);
//     formData.append('price', propertyData.price);
//     formData.append('description', propertyData.description);
//     formData.append('PhoneNumber', propertyData.PhoneNumber);

//     // Append photos
//     propertyData.photos.forEach((photo) => {
//       formData.append('photos', photo);
//     });

//     // Append video (if any)
//     if (video) {
//       formData.append('video', video);
//     }

//     try {
//       const endpoint = isUpdate
//         ? `http://localhost:1000/PPC/update-property/${propertyData.PhoneNumber}`
//         : 'http://localhost:1000/PPC/add-property';

//       const response = await axios({
//         method: isUpdate ? 'put' : 'post',
//         url: endpoint,
//         data: formData,
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       if (!isUpdate) {
//         setNewPropertyId(response.data.property._id);
//         setStatusMessage('Property added successfully!');
//         resetForm(); // Reset form after success
//       } else {
//         setStatusMessage('Property updated successfully!');
//       }

//       setIsUpdate(false);
//     } catch (error) {
//       console.error('Error submitting property:', error);
//       setStatusMessage(`Error: ${error.response ? error.response.data.message : error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Reset the form state
//   const resetForm = () => {
//     setPropertyData({
//       propertyMode: '',
//       propertyType: '',
//       price: '',
//       description: '',
//       PhoneNumber: '',
//       photos: [],
//     });
//     setVideo(null);
//     setStatusMessage('');
//   };

//   // Handle phone number input change
//   const handlePhoneNumberChange = (e) => {
//     const phoneNumber = e.target.value;
//     setPropertyData({ ...propertyData, PhoneNumber: phoneNumber });

//     // Fetch property data if phone number exists
//     if (phoneNumber) {
//       fetchPropertyData(phoneNumber);
//     } else {
//       setStatusMessage('');
//       setIsUpdate(false);
//       setEditMode(false);
//     }
//   };

//   return (
//     <div>
//       <h2>{isUpdate ? 'Update Property' : 'Add Property'}</h2>

//       {/* Show the form to add or update a property */}
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <label>Phone Number</label>
//         <input
//           type="text"
//           name="PhoneNumber"
//           value={propertyData.PhoneNumber}
//           onChange={handlePhoneNumberChange}
//           placeholder="Enter phone number"
//         />

//         <label>Property Mode</label>
//         <select name="propertyMode" value={propertyData.propertyMode} onChange={handleInputChange}>
//           <option value="Residential">Residential</option>
//           <option value="Commercial">Commercial</option>
//           <option value="Agricultural">Agricultural</option>
//           <option value="Rent">Rent</option>
//         </select>

//         <label>Property Type</label>
//         <select name="propertyType" value={propertyData.propertyType} onChange={handleInputChange}>
//           <option value="Flat/ Apartment">Flat/ Apartment</option>
//           <option value="Residential House">Residential House</option>
//           <option value="Villa">Villa</option>
//         </select>

//         <label>Price</label>
//         <input
//           type="number"
//           name="price"
//           value={propertyData.price}
//           onChange={handleInputChange}
//           placeholder="Enter price"
//         />

//         <label>Description</label>
//         <textarea
//           name="description"
//           value={propertyData.description}
//           onChange={handleInputChange}
//           placeholder="Enter description"
//         ></textarea>

//         {/* Image upload input */}
//         <div className="form-group">
//           <label>Upload Photos:</label>
//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={handlePhotoUpload}
//           />
//         </div>

//         {/* Display selected images with remove option */}
//         {propertyData.photos.map((photo, index) => (
//           <div key={index} style={{ textAlign: 'center' }}>
//             <img
//               src={typeof photo === 'string' ? photo : URL.createObjectURL(photo)} // Check if it's a URL or File
//               alt="Uploaded"
//               style={{ width: '80px', height: '80px', objectFit: 'cover' }}
//             />
//             <p
//               style={{ color: 'red', cursor: 'pointer' }}
//               onClick={() => removePhoto(index)}
//             >
//               Remove
//             </p>
//           </div>
//         ))}

//         <label>Upload Video</label>
//         <input
//           type="file"
//           name="video"
//           accept="video/*"
//           onChange={handleVideoChange}
//         />

//         {/* Loading spinner */}
//         {isLoading && <div>Loading...</div>}

//         <button type="submit">{isUpdate ? 'Update Property' : 'Add Property'}</button>
//       </form>

//       {statusMessage && <div>{statusMessage}</div>}
//     </div>
//   );
// };

// export default AddProperty;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AddPropertyForm = () => {
//   const [propertyData, setPropertyData] = useState({
//     propertyMode: '',
//     propertyType: '',
//     price: '',
//     description: '',
//     photos: [],
//     video: null,
//   });
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [previewPhotos, setPreviewPhotos] = useState([]);
//   const [previewVideo, setPreviewVideo] = useState(null);

//   // Simulating logged-in user phone number, in a real app this would come from session or JWT
//   useEffect(() => {
//     // You would typically get the phone number from a global state or session
//     setPhoneNumber('1234567890'); // Example phone number
//   }, []);

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPropertyData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle file selection (photos)
//   const handleFileChange = (e) => {
//     const files = e.target.files;
//     setPropertyData((prevData) => ({
//       ...prevData,
//       photos: files,
//     }));
//     setPreviewPhotos(Array.from(files).map((file) => URL.createObjectURL(file)));
//   };

//   // Handle video file selection
//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     setPropertyData((prevData) => ({
//       ...prevData,
//       video: file,
//     }));
//     setPreviewVideo(URL.createObjectURL(file));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('PhoneNumber', phoneNumber);
//     formData.append('propertyMode', propertyData.propertyMode);
//     formData.append('propertyType', propertyData.propertyType);
//     formData.append('price', propertyData.price);
//     formData.append('description', propertyData.description);

//     // Append photos
//     Array.from(propertyData.photos).forEach((file) => {
//       formData.append('photos', file);
//     });

//     // Append video if exists
//     if (propertyData.video) {
//       formData.append('video', propertyData.video);
//     }

//     try {
//       const response = await axios.post('/add-property', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       alert(response.data.message); // Success message
//       setPropertyData({
//         propertyMode: '',
//         propertyType: '',
//         price: '',
//         description: '',
//         photos: [],
//         video: null,
//       });
//       setPreviewPhotos([]);
//       setPreviewVideo(null);
//     } catch (error) {
//       console.error('Error submitting the form:', error);
//       alert('Error adding/updating property');
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Add/Update Property</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="form-group">
//           <label htmlFor="propertyMode">Property Mode</label>
//           <select
//             id="propertyMode"
//             name="propertyMode"
//             value={propertyData.propertyMode}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="Residential">Residential</option>
//             <option value="Commercial">Commercial</option>
//             <option value="Agricultural">Agricultural</option>
//             <option value="Rent">Rent</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label htmlFor="propertyType">Property Type</label>
//           <select
//             id="propertyType"
//             name="propertyType"
//             value={propertyData.propertyType}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="Flat/ Apartment">Flat/ Apartment</option>
//             <option value="Residential House">Residential House</option>
//             <option value="Villa">Villa</option>
//             <option value="Builder Floor Apartment">Builder Floor Apartment</option>
//             <option value="Commercial Office Space">Commercial Office Space</option>
//             <option value="Agricultural Land">Agricultural Land</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label htmlFor="price">Price</label>
//           <input
//             type="number"
//             id="price"
//             name="price"
//             value={propertyData.price}
//             onChange={handleInputChange}
//             placeholder="Enter the price"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             value={propertyData.description}
//             onChange={handleInputChange}
//             placeholder="Describe the property"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="photos">Photos (Max 15)</label>
//           <input
//             type="file"
//             id="photos"
//             name="photos"
//             accept="image/*"
//             multiple
//             onChange={handleFileChange}
//             required
//           />
//           <div id="photoPreview" className="file-preview">
//             {previewPhotos.map((photo, index) => (
//               <img key={index} src={photo} alt={`preview-${index}`} />
//             ))}
//           </div>
//         </div>

//         <div className="form-group">
//           <label htmlFor="video">Video (Optional)</label>
//           <input
//             type="file"
//             id="video"
//             name="video"
//             accept="video/*"
//             onChange={handleVideoChange}
//           />
//           {previewVideo && (
//             <div id="videoPreview" className="file-preview">
//               <video controls>
//                 <source src={previewVideo} />
//               </video>
//             </div>
//           )}
//         </div>

//         <div className="form-group">
//           <button type="submit">Add/Update Property</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddPropertyForm;

















// import React, { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom'; // To navigate after adding the property
// import { useDispatch } from 'react-redux';
// import { setIsVerified } from '../Redux/userSlice';

// const AddProperty = () => {
//   const [propertyName, setPropertyName] = useState('');
//   const [location, setLocation] = useState('');
//   const [propertyType, setPropertyType] = useState('');
//   const [price, setPrice] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Function to handle property form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation of form data
//     if (!propertyName || !location || !propertyType || !price) {
//       setError('Please fill in all fields.');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setSuccess('');

//     // Simulating a property addition to database (replace this with actual API call)
//     try {
//       // You can replace this with actual code to send data to your backend or Firebase
//       const propertyData = {
//         propertyName,
//         location,
//         propertyType,
//         price,
//       };

//       console.log('Property Data:', propertyData);
//       setSuccess('Property added successfully!');
//       dispatch(setIsVerified(false)); // Reset verification status if needed
//       setLoading(false);

//       // After successful property addition, navigate to a different page (e.g., home or properties list)
//       setTimeout(() => {
//         navigate('/'); // Navigate back to the home page or properties list
//       }, 1500);
//     } catch (error) {
//       setError('Error adding property. Please try again later.');
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="add-property-form">
//       <h2>Add Property</h2>

//       {/* Display error message */}
//       {error && <Alert variant="danger">{error}</Alert>}

//       {/* Display success message */}
//       {success && <Alert variant="success">{success}</Alert>}

//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="propertyName">
//           <Form.Label>Property Name</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter property name"
//             value={propertyName}
//             onChange={(e) => setPropertyName(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group controlId="location">
//           <Form.Label>Location</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter property location"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group controlId="propertyType">
//           <Form.Label>Property Type</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter property type (e.g., Apartment, House)"
//             value={propertyType}
//             onChange={(e) => setPropertyType(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group controlId="price">
//           <Form.Label>Price</Form.Label>
//           <Form.Control
//             type="number"
//             placeholder="Enter property price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit" disabled={loading}>
//           {loading ? 'Adding Property...' : 'Add Property'}
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default AddProperty;
