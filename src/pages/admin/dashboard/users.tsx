import Sidebar from "../../../components/sidebar";
import Overlay from "../../../components/overlay";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import buildClient from "../../../service/build-client";

const userComponent = ({ resp }) => {
	console.log(resp);
	let dummyData = { name: "name", type: "scl", add: "syz" };
	const [overlay, setoverlay] = useState(false);
	return (
		<>
			<Sidebar curr={"users"} />
			<div className='dashboard'>
				<h1>Users</h1>
				{overlay ? (
					<Overlay
						canAccept={true}
						data={dummyData}
						closeFunc={() => {
							setoverlay(false);
						}}
					/>
				) : (
					<></>
				)}
				<div className='col'>
					{Array(20)
						.fill(dummyData)
						.map((item) => {
							return (
								<div className='list-item'>
									<h2>Name - {item.name}</h2>
									<h3>Type - {item.type}</h3>
									<FaPencilAlt
										onClick={() => {
											setoverlay(true);
										}}
										className='icon'
									/>
								</div>
							);
						})}
				</div>
			</div>
		</>
	);
};

userComponent.getInitialProps = async (appContext) => {
	// const { data } = await buildClient(appContext).get("/api/user/")
	// console.log(data)
	// return { resp: data }
};

export default userComponent;
