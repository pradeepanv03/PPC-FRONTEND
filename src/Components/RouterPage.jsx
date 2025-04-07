



import React, { useState, useEffect } from 'react';
import App from '../App'
import Nopage from './Nopage'
import Building from './Building'
import MobileViews from './MoblieViews'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import AddProps from './AddProps'
import MyProperty from './MyProperty'
import EditForm from './EditForm'
import Details from './Details'
import PricingPlans from './PricingPlans'
import AddPlan from './AddPlan'
import About from './About'
import RefundPolicy from './RefundPolicy'
import PrivacyPolicy from './PrivacyPolicy'
import InterestStatus from './InterestStatus'
import NewProperty from './NewProperty'
import BusinessOpportunity from './BusinessOpportunity'
import OurSupport from './OurSupport'
import AboutMobile from './AboutMobile'
import RefundMobile from './RefundMobile'
import MyProfile from './MyProfile'
import MyPlan from './MyPlan'
import ContactedPage from './ContactedPage'
import LeadsCenter from './LeadsCenter'
import MatchedBuyers from './MatchedBuyers'
import MyCalledList from './MyCalledList'
import MyInterestBuyers from './MyInterestBuyers'
import MyPhotoRequest from './MyPhotoRequest'
import MyOffers from './MyOffers'
import MyLastViewProperty from './MyLastViewProperty'
import MySentInterest from './MySentInterest'
import MyShortlistedProperty from './MyShortlistedProperty'
import ShortListedBuyers from './ShortListedBuyers'
import RecivedOwnerInterest from './RecivedOwnerInterest'
import PhotoRequestSent from './PhotoRequestSent'
import OfferFromBuyer from './OfferFromBuyer'
import ViewedBuyers from './ViewedBuyers'
import BuyerLists from './BuyerLists'
import Owner from './Owner'
import BuyerInterest from './Detail/BuyerInterest'
import NeedHelpOwner from './Detail/NeedHelpOwner'
import NeedHelpBuyer from './Detail/NeedHelpBuyer'
import ContactBuyer from './Detail/ContactBuyer'
import ContactOwner from './Detail/ContactOwner'
import ReportPropertyOwner from './Detail/ReportPropertyOwner'
import ReportPropertyBuyer from './Detail/ReportPropertyBuyer'
import SoldOutOwner from './Detail/SoldOutOwner'
import SoldOutBuyer from './Detail/SoldOutBuyer'
import FavoriteOwner from './Detail/FavoriteOwner'
import FavoriteBuyer from './Detail/FavoriteBuyer'
import InterestOwner from './Detail/InterestOwner'
import AddProperty from './AddProperty'
import MyProperties from './MyProperties'
import Removedproperty from './RemovedProperty'
import AddPricingPlans from './AddPricingPlans'
import ExpiredPlans from './ExpiredPlans';
import Notification  from './Notification'
import ZeroView from './ZeroView'
import AddProperties from './Addproperties'
import OfferOwner from './Detail/OfferOwner';
import OfferBuyer from './Detail/OfferBuyer';
import ViewedOwner from './Detail/ViewedOwner'
import ViewedBuyer from './Detail/ViewedBuyer'
import PhotoRequestOwner from './Detail/PhotoRequestOwner'
import PhotoRequestBuyer from './Detail/PhotoRequestBuyer'
import FavoriteRemovedBuyer from './Detail/FavoriteRemovedBuyer'
import FavoriteRemovedOwner from './Detail/FavoriteRemovedOwner'
import DetailBuyerAssistance from './DetailBuyerAssistance'
import FeaturedProperty from './FeatureProperty'
import ShippingAndDelivery from './ShipingAndDelivery'
import ContactUs from './ContactUs'
import MatchedOwner from './Detail/MatchedOwner';
import MatchedBuyer from './Detail/MatchedBuyer'
import PyProperty from './PyProperty';
import TermsAndCondition from './TermsAndCondition'
import TermsAndConditionWeb from './TermsAndConditionWeb'
import ShippingAndDeliveryApp from './ShipingandDeliveryApp'
import AllProperty from './AllProperty';





export default function RouterPage() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  // Check if the user is authenticated on initial load
  useEffect(() => {
    const storedPhone = localStorage.getItem('phoneNumber');
    if (storedPhone) {
      setPhoneNumber(storedPhone);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (phone) => {
    if (phone) {
      localStorage.setItem('phoneNumber', phone); // Store phone in localStorage
      setPhoneNumber(phone);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      localStorage.removeItem('phoneNumber'); // Remove if no phone number is entered
    }
  };
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<App />} />
    <Route path="/mobileviews" element={isAuthenticated ? <MobileViews phone={phoneNumber} /> : <App to="/" />} />
    <Route path="/login" element={<Login onLogin={handleLogin} />} />
    <Route path="/Construction" element={isAuthenticated ? <Building phone={phoneNumber} /> : <App to="/" />} />
    <Route path="*" element={<Nopage />} />
    <Route path='/my' element={isAuthenticated ? <MyProperty phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/new-property' element={isAuthenticated ? <NewProperty phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/add-form' element={<AddProps/>}/>
        <Route path='/add-property' element={<AddProperties/>}/>
        <Route path='/edit-form' element={isAuthenticated ? <EditForm phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/detail/:ppcId' element={isAuthenticated ? <Details phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/plans' element={isAuthenticated ? <PricingPlans phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/add-plan' element={isAuthenticated ? <AddPricingPlans phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/about' element={<About />} />
        <Route path='/refund-policy' element={< RefundPolicy />} />
        <Route path='/about-mobile' element={<AboutMobile  />} />
        <Route path='/refund-mobile' element={< RefundMobile/>} />
        <Route path='/privacy-policy' element={< PrivacyPolicy/>} />
        <Route path='/interest' element={isAuthenticated ? <InterestStatus phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/business' element={< BusinessOpportunity />} />
        <Route path='/our-support' element={< OurSupport  />} />
        <Route path='/my-profile/:phoneNumber' element={isAuthenticated ? <MyProfile phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/my-plan' element={isAuthenticated ? <MyPlan phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/expired-plans' element={< ExpiredPlans  />} />
        <Route path='/pricing-plans' element={< AddPlan  />} />
        <Route path='/shiping-delivery' element={< ShippingAndDelivery  />} />
        <Route path='/contact-web' element={< ContactUs   />} />
        <Route path='/contactus' element={< ContactedPage />} />
        <Route path='/leads' element={< LeadsCenter />} />
        <Route path='/matched-buyers' element={isAuthenticated ? <MatchedBuyers phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/my-call' element={< MyCalledList  />} />
        <Route path='/my-interest-buyer' element={< MyInterestBuyers/>} />
        <Route path='/my-photo' element={< MyPhotoRequest  />} />
        <Route path='/my-offers' element={< MyOffers />} />
        <Route path='/my-last-property' element={< MyLastViewProperty />} />
        <Route path='/my-sent-interest' element={< MySentInterest />} />
        <Route path='/my-short-property' element={< MyShortlistedProperty />} />
        <Route path='/my-sent-interest' element={< MySentInterest />} />
        <Route path='/shortlist-buyer' element={< ShortListedBuyers />} />
        <Route path='/recive-owner-interest' element={< RecivedOwnerInterest  />} />
        <Route path='/photo-request-send' element={< PhotoRequestSent />} />
        <Route path='/offer-from-buyer' element={< OfferFromBuyer  />} />
        <Route path='/view-buyers' element={< ViewedBuyers />} />
        <Route path='/buyer-lists' element={< BuyerLists/>} />

        <Route path='/owner' element={< Owner />} />
        <Route path='/RefundPolicy' element={< RefundPolicy />} />

        <Route path='/matched-owner/:phoneNumber' element={isAuthenticated ? <MatchedOwner phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/matched-buyer/:phoneNumber' element={isAuthenticated ? <MatchedBuyer phone={phoneNumber} /> : <App to="/" />} />


        <Route path='/terms-conditions' element={<TermsAndCondition />} />

        <Route path='/terms-conditions-web' element={<TermsAndConditionWeb />} />



        <Route path='/interest-owner/:phoneNumber' element={isAuthenticated ? <InterestOwner phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/interest-buyer/:phoneNumber' element={isAuthenticated ? <BuyerInterest phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/help-owner/:phoneNumber' element={isAuthenticated ? <NeedHelpOwner phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/help-buyer/:phoneNumber' element={isAuthenticated ? <NeedHelpBuyer phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/contact-owner/:phoneNumber' element={isAuthenticated ? <ContactOwner phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/contact-buyer/:phoneNumber' element={isAuthenticated ? <ContactBuyer phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/report-property-owner/:phoneNumber' element={isAuthenticated ? <ReportPropertyOwner phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/report-property-buyer/:phoneNumber' element={isAuthenticated ? <ReportPropertyBuyer phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/soldout-owner/:phoneNumber' element={isAuthenticated ? <SoldOutOwner phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/soldout-buyer/:phoneNumber' element={isAuthenticated ? <SoldOutBuyer phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/favorite-owner/:phoneNumber' element={isAuthenticated ? <FavoriteOwner phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/favorite-buyer/:phoneNumber' element={isAuthenticated ? <FavoriteBuyer phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/add-property/:phoneNumber' element={isAuthenticated ? <AddProperty phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/my-property' element={isAuthenticated ? <MyProperties phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/removed-property' element={isAuthenticated ? <Removedproperty phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/zero-view' element={isAuthenticated ? <ZeroView phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/favorite-remove-owner/:phoneNumber' element={isAuthenticated ? <FavoriteRemovedOwner phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/favorite-remove-buyer/:phoneNumber' element={isAuthenticated ? <FavoriteRemovedBuyer phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/notification' element={isAuthenticated ? <Notification phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/feature-property' element={isAuthenticated ? <FeaturedProperty phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/py-property' element={isAuthenticated ? <PyProperty phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/all-property' element={isAuthenticated ? <AllProperty phone={phoneNumber} /> : <App to="/" />} />


        <Route path='/offer-owner/:phoneNumber' element={isAuthenticated ? <OfferOwner phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/offer-buyer/:phoneNumber' element={isAuthenticated ? <OfferBuyer phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/View-owner/:phoneNumber' element={isAuthenticated ? <ViewedOwner phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/view-buyer/:phoneNumber' element={isAuthenticated ? <ViewedBuyer phone={phoneNumber} /> : <App to="/" />} /> 
        <Route path='/photo-request-owner/:phoneNumber' element={isAuthenticated ? <PhotoRequestOwner phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/photo-request-buyer/:phoneNumber' element={isAuthenticated ? <PhotoRequestBuyer phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/shiping-delivery-app' element={isAuthenticated ? <ShippingAndDeliveryApp phone={phoneNumber} /> : <App to="/" />} />
        <Route path='/detail-buyer-assistance/:id' element={isAuthenticated ? <DetailBuyerAssistance phone={phoneNumber} /> : <App to="/" />} />
    </Routes>
    </BrowserRouter> 
  )
}






















































