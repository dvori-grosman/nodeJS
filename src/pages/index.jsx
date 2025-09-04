import Layout from "./Layout.jsx";
import Home from "./Home";
import Classes from "./Classes";
import Contact from "./Contact";
import Locations from "./Locations";
import Performances from "./Performances";
import About from "./About";
import Shop from "./Shop";
import Registration from "./Registration";
import Admin from "./Admin";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

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

function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);

    useEffect(() => {
        window.scrollTo(0, 0); // גלול לראש העמוד
    }, [location]);

    // Admin page doesn't use the main layout
    if (location.pathname === '/admin') {
        return <Admin />;
    }

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
