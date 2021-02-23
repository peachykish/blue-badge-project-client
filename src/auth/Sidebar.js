import React from 'react'
import {
    Route,
    Link, 
    Switch,
} from 'react-router-dom'
import App from '../App';

// import Resources from './Resources'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-list-styling">
                <ul className="sidebar-list list-unstyled">
                    <li><Link to="/">Sidebar</Link></li>
                    <li><Link to="/">Home</Link></li>
                    {/* <li><Link to="/functionalcomponent">Functional Component</Link></li>
                    <li><Link to="/jsxrules">JSX Rules</Link></li>
                    <li><Link to="/state">useState</Link></li>
                    <li><Link to="/effects">useEffects</Link></li>
                    <li><Link to="/resources">Resources</Link></li> */}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar; 