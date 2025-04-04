

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Modal, InputGroup } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Flag from 'react-world-flags';
import logo from '../images/logo.PNG';
import './log.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const [phoneNumber, setPhoneNumberState] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [mockOtp, setMockOtp] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [selectedCountry, setSelectedCountry] = useState('IN');
  const [isPhoneNumberEntered, setIsPhoneNumberEntered] = useState(false);

  const navigate = useNavigate(); // For navigation


  const countryCodes = [
    { code: '+1', country: 'USA', flag: 'US' },
    { code: '+91', country: 'India', flag: 'IN' },
    // Add more countries as needed
  ];

  const handleCountryChange = (e) => {
    const selected = e.target.value;
    const country = countryCodes.find((c) => c.flag === selected);
    setCountryCode(country.code);
    setSelectedCountry(selected);
  };

  const handlePhoneNumberChange = (e) => {
    const phone = e.target.value;
    setPhoneNumberState(phone);
    setIsPhoneNumberEntered(phone.length > 0);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      toast.error('Please enter a valid phone number.');
      return;
    }

    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setMockOtp(generatedOtp);
    localStorage.setItem('mockOtp', generatedOtp); // Store OTP for mock verification
    toast.success(`OTP sent to ${countryCode}${phoneNumber}. (Mock OTP: ${generatedOtp})`);
    setIsOtpSent(true);
  };


  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const storedOtp = localStorage.getItem('mockOtp');
    if (otp === storedOtp) {
      toast.success('OTP verified successfully!');
      navigate('/bottom-nav', { state: { phoneNumber, countryCode } }); // Pass data
    } else {
      toast.error('Invalid OTP. Please try again.');
    }
  };


  const resetFields = () => {
    setPhoneNumberState('');
    setOtp('');
    setIsOtpSent(false);
    setMockOtp('');
  };


  
  return (
   
    <Container fluid className="p-0 login">
    <Row className="g-0">
      <Col lg={12} className="d-flex align-items-center justify-content-center">
        <div className="login-container">
          <h1 className="text-center">Welcome Back</h1>
          <p className="text-center">Login to continue</p>
          <div className="text-center mb-4">
            <img src={logo} alt="Logo" style={{ width: '150px' }} />
          </div>
  
          {!isOtpSent ? (
            <Form onSubmit={handleSendOtp}>
              <Form.Group className="mb-3" controlId="countryCode">
                <InputGroup>
                  <InputGroup.Text>
                    <Flag code={selectedCountry} style={{ width: '30px' }} />
                  </InputGroup.Text>
                  <Form.Select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    className="custom-background small-input"
                  >
                    {countryCodes.map((country) => (
                      <option className='small-input' key={country.code} value={country.flag}>
                        ({country.country}) {country.code}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control
                    type="text"
                    placeholder="Enter Mobile No"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    required
                    className="small-input"
                  />
                </InputGroup>
              </Form.Group>
              <div className="d-flex justify-content-center mt-3">
                <Button
                  type="button"
                  className="btn-skip mx-2"
                >
                  SKIP
                </Button>
                <Button
                  type="submit"
                  className="btn-login mx-2"
                >
                  LOGIN
                </Button>
              </div>
            </Form>
          ) : (
            <Form onSubmit={handleVerifyOtp}>
              <Form.Group className="mb-3" controlId="otp">
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </Form.Group>
              <Button
                type="submit"
                className="btn-login w-100"
              >
                VERIFY OTP
              </Button>
            </Form>
          )}



  
          <ToastContainer />
        </div>
      </Col>
    </Row>
  </Container>
  
  );
};

export default Login;

