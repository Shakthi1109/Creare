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

            <body>
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
