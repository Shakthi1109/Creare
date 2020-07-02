import Paginate from "../../components/paginate";
import { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import buildClient from "../../service/build-client";
import Router from "next/router";
const videoComponent = ({ resp }) => {
	let dummyData = {
		img:
			"https://png.pngtree.com/thumb_back/fw800/background/20190223/ourmid/pngtree-fresh-chalkboard-stationery-ad-background-backgroundblackboardhand-paintedbooktextbookstationeryfreshknow-how-image_75849.jpg",
		topic: "XYZ",
		subject: "PHY",
		uploadedBy: "ABC",
		uploadedOn: "12/8/2020"
	};
	const [overlay, setoverlay] = useState(false);
	const [data, setdata] = useState([]);
	const [slicedData, setslicedData] = useState([]);
	const [indexRef, setindexRef] = useState(0);

	const [index, setindex] = useState(0);
	const [capacity, setcapacity] = useState(10);
	const [selected, setselected] = useState(-1);
	const [length, setlength] = useState(50);

	useEffect(() => {
		let arr = Array(50).fill(dummyData);
		setdata([...arr]);
	}, []);

	useEffect(() => {
		setslicedData(data.slice(0, capacity));
	}, [data]);

	useEffect(() => {
		let ind = index * capacity;
		setindexRef(ind);
		setslicedData(data.slice(ind, ind + capacity));
	}, [index]);
	return (
		<>
			{/* <Sidebar route={"users"} /> */}
			<div className='vidLib_Cont'>
				<h1>Videos</h1>
				<div className='vidLib'>
					{slicedData.map(
						(
							{ img, topic, subject, uploadedBy, uploadedOn },
							index
						) => {
							return (
								<div className='vidCard' key={index}>
									<div className='img'>
										<FaPlay
											className='playIcon'
											onClick={() => {
												Router.push(`/video/${index}`);
											}}
										/>
										<img src={img} alt='' />
									</div>
									<div className='details'>
										<h2>Topic: {topic} </h2>
										<h2>Subject: {subject}</h2>
										<h2>
											Uploaded by : {uploadedBy} on{" "}
											{uploadedOn}
										</h2>
									</div>
								</div>
							);
						}
					)}
				</div>
				<Paginate
					prev={() => {
						setindex(index - 1);
					}}
					next={() => {
						setindex(index + 1);
					}}
					length={length}
					currentIndex={index}
					capacity={capacity}
				/>
			</div>
		</>
	);
};

videoComponent.getInitialProps = async (appContext) => {
	// const { data } = await buildClient(appContext).get(`/api/videos`);
	// return { resp: data };
};

export default videoComponent;
