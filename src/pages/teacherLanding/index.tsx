import React from 'react';
import logoImg from '../../public/static/logo1.png';
import {FaBars} from "react-icons/fa";
import Avatar from 'react-avatar';

const avatarStyle = {
    

};
function teacherLanding() {
    return (
        <div className="header">

            <FaBars id='teacherMenuicon' />
                
            <img src={logoImg} alt='logo' id='logoImg'/>
                
            <h1 id="teacherHeading">Teacher Workspace</h1>
            
            
            <Avatar name="Foo Bar" color ="gray"size="50" round={true} style={{
                                                                    float: 'right',
                                                                    position:'relative',
                                                                    top: '-45px',
                                                                    right: '15px',
                                                                }}/>
        </div> 
    )
  }

  export default teacherLanding;