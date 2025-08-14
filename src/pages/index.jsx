import Layout from "./Layout.jsx";

import Home from "./Home";

import Classes from "./Classes";

import Contact from "./Contact";

import Locations from "./Locations";

import Performances from "./Performances";

import About from "./About";

import Shop from "./Shop";

import Registration from "./Registration";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    Classes: Classes,
    
    Contact: Contact,
    
    Locations: Locations,
    
    Performances: Performances,
    
    About: About,
    
    Shop: Shop,
    
    Registration: Registration,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Home />} />
                
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/Classes" element={<Classes />} />
                
                <Route path="/Contact" element={<Contact />} />
                
                <Route path="/Locations" element={<Locations />} />
                
                <Route path="/Performances" element={<Performances />} />
                
                <Route path="/About" element={<About />} />
                
                <Route path="/Shop" element={<Shop />} />
                
                <Route path="/Registration" element={<Registration />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}