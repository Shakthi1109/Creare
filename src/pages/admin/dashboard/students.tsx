import Sidebar from "../../../components/sidebar";
import Overlay from "../../../components/overlay";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
export default () => {
	let dummyData = { name: "name", type: "scl", add: "syz" };
	const [overlay, setoverlay] = useState(false);
	const [index, setindex] = useState(-1);
	return (
		<>
			<Sidebar curr={"students"} />
			<div className='dashboard'>
				<h1>Students</h1>
				{overlay ? (
					<Overlay
						//should be like
						//data = {dummyData[index]}
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
						.map((item, index) => {
							return (
								<div className='list-item'>
									<h2>Name - {item.name}</h2>
									<h3>Type - {item.type}</h3>
									<FaPencilAlt
										onClick={() => {
											setoverlay(true);
											setindex(index);
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
