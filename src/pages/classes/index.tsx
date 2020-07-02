import React from "react";
import logoImg from "../../public/static/logo1.png"
import SlidingBar from "../../components/SlidingBar/index";
import { FaBars, FaUserAlt } from "react-icons/fa";

function clickMe() {
	alert("clicked");
}

function classes() {
	return (
		<div className='header'>
			<img src={logoImg} alt='logo' id='logoImg' />

			<h1 id='teacherHeading'>Classes</h1>

			<span id='floatLeft'>
				<FaUserAlt color='white' />
				<div className='options'>
					<ul>Profile</ul>
					<ul>Settings</ul>
					<ul>Logout</ul>
				</div>
			</span>

			<SlidingBar/>

			<div id="classCardContainer">
				 
			</div>
		</div>
	);
}

export default classes;
