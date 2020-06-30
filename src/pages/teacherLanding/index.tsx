import React from "react"
import logoImg from "../../public/static/logo1.png"
import { FaBars, FaUserAlt } from "react-icons/fa"

const avatarStyle = {}
function teacherLanding() {
	return (
		<div className='header'>
			<FaBars id='teacherMenuicon' color='white' />

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
		</div>
	)
}

export default teacherLanding
