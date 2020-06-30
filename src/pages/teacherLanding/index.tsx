import React from "react"
// import logoImg from "../../public/static/logo1.png"
import { FaBars, FaUserAlt } from "react-icons/fa"

const avatarStyle = {}
function teacherLanding() {
	return (
		<div className='header'>
			<FaBars id='teacherMenuicon' />

			{/* <img src={logoImg} alt='logo' id='logoImg' /> */}

			<h1 id='teacherHeading'>Teacher Workspace</h1>

			<span id='floatLeft'>
				<FaUserAlt />
				<div className='options'>
					<li>Teacher Profile</li>
					<li>Class</li>
				</div>
			</span>
		</div>
	)
}

export default teacherLanding
