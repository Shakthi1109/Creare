import React from "react";

function SlidingBar() {
	return (
		<div>
			<input type='checkbox' id='openSidebarMenu'></input>
			<label htmlFor='openSidebarMenu' className='sidebarIconToggle'>
				<div className='spinner top'></div>
				<div className='spinner middle'></div>
				<div className='spinner bottom'></div>
			</label>
			<div id='sidebarMenu1'>
				<ul className='menu'>
					<li>
						<a href='#'>Tech Corner</a>
					</li>
					<li>
						<a href='#'>Tutorial Videos</a>
					</li>
					<li>
						<a href='#'>Sports</a>
					</li>
					<li>
						<a href='#'>Exam Results</a>
					</li>
					<li>
						<a href='#'>Discover Yourself</a>
					</li>
					<li>
						<a href='#'>Knowledge Centre</a>
					</li>
					<li>
						<a href='#'>Chats</a>
					</li>
					<li>
						<a href='#'>Languages</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default SlidingBar;
