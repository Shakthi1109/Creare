import { useState } from "react";
import { TiArrowBack } from "react-icons/ti";
export default () => {
	let dummyData = {
		img:
			"https://png.pngtree.com/thumb_back/fw800/background/20190223/ourmid/pngtree-fresh-chalkboard-stationery-ad-background-backgroundblackboardhand-paintedbooktextbookstationeryfreshknow-how-image_75849.jpg",
		topic: "XYZ",
		subject: "PHY",
		uploadedBy: "ABC",
		uploadedOn: "12/8/2020"
	};
	return (
		<div>
			<div className='videoId'>
				<TiArrowBack onClick={() => {}} className='icon' />
				<div className='details'>
					<h3>
						Topic: {dummyData.topic} | Subject: {dummyData.subject}{" "}
						| Uploaded by : {dummyData.uploadedBy} on{" "}
						{dummyData.uploadedOn}
					</h3>
					<h3></h3>
					<h3></h3>
				</div>
				<video className='video' controls autoPlay>
					<source src='http://techslides.com/demos/sample-videos/small.ogv' />
				</video>
			</div>
		</div>
	);
};
