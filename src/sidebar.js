import React, { Component } from "react";
import './sidebar.css';



class Sidebar extends Component {
render() {
return <div>
    <div className="SidebarHeader">
        <p></p>
    </div>
<ul>
    <li>Channel Messages</li>
    <li>Channel Users List</li>
    <li>Channel Users Map</li>
    <li>Device Settings</li>
</ul>
</div>;
    
       }
}
export default Sidebar;