import React from "react"
import logoImg from "../../public/static/logo1.png"
import { FaBars, FaUserAlt } from "react-icons/fa"
import styled from 'styled-components';

function clickMe(){
alert('clicked');
}

function teacherLanding() {
	return (
		<div className='header'>

			<img src={logoImg} alt='logo' id='logoImg' />

			<h1 id='teacherHeading'>Teacher Workspace</h1>

			<span id='floatLeft'>
				<FaUserAlt color='white'/>
				<div className='options'>
					<ul>Profile</ul>
					<ul>Settings</ul>
                    <ul>Logout</ul>

				</div>
			</span>

            <body className="teacherBody">
                <input type="checkbox" id="openSidebarMenu"></input>
                <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
                    <div className="spinner top"></div>
                    <div className="spinner middle"></div>
                    <div className="spinner bottom"></div>
                </label>
                    <div id="sidebarMenu1">
                        <ul className="menu">
                            <li><a href="#">Tech Corner</a></li>
                            <li><a href="#">Tutorial Videos</a></li>
                            <li><a href="#">Sports</a></li>
                            <li><a href="#">Exam Results</a></li>
                            <li><a href="#">Discover Yourself</a></li>
                            <li><a href="#">Knowledge Centre</a></li>
                            <li><a href="#">Chats</a></li>
                            <li><a href="#">Languages</a></li>
                        </ul>
                    </div>

                <div className="btnContainer">
                    <button className="teacherCards" onClick={clickMe}>
                        Classes
                    </button>

                    <button className="teacherCards" onClick={clickMe}>
                        Classes
                    </button>

                    <button className="teacherCards" onClick={clickMe}>
                        Classes
                    </button>
                </div>
            </body>
		</div>
        
	)
}

export default teacherLanding