import React from "react";
import logoImg from "../../public/static/logo1.png"
import SlidingBar from "../../components/SlidingBar/index";
import { FaBars, FaUserAlt } from "react-icons/fa";

function clickMe() {
	alert("clicked");
}

function teacherLanding() {
	return (
		<div className='header'>
			<img src={logoImg} alt='logo' id='logoImg' />

			<h1 id='teacherHeading'>Teacher Workspace</h1>

			<span id='floatLeft'>
				<FaUserAlt color='white' />
				<div className='options'>
					<ul>Profile</ul>
					<ul>Settings</ul>
					<ul>Logout</ul>
				</div>
			</span>

			<SlidingBar/>

			<div id='btnContainer'>
				<button className='teacherCards' onClick={clickMe}>
					Classes
				</button>

				<button className='teacherCards' onClick={clickMe}>
					Classes
				</button>

				<button className='teacherCards' onClick={clickMe}>
					Classes
				</button>
			</div>
		</div>
	);
}

export default teacherLanding;
