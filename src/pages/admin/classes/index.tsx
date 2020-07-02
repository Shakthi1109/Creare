import Sidebar from "../../../components/side-nav";
import { useState, useEffect } from "react";
import buildClient from "../../../service/build-client";
import Classes from "./classes";
import AddClass from "./addClass";
const classComponent = ({ data }) => {
	useEffect(() => {
		console.log(data);
	}, [data]);

	const [active, setactive] = useState("scheduled");
	const [addClass, setaddClass] = useState(false);
	return (
		<>
			<Sidebar route={"class"} />
			{addClass ? (
				<AddClass
					closeFunc={() => {
						setaddClass(false);
					}}
				/>
			) : (
				<></>
			)}
			<div id='dashboard'>
				<div id='row'>
					<button
						className={
							active == "scheduled" ? "btn--orange" : "btn--blue"
						}
						onClick={() => setactive("scheduled")}>
						Scheduled
					</button>
					<button
						className={
							active == "inprogress" ? "btn--orange" : "btn--blue"
						}
						onClick={() => setactive("inprogress")}>
						InProgress
					</button>
					<button
						className={
							active == "completed" ? "btn--orange" : "btn--blue"
						}
						onClick={() => setactive("completed")}>
						Completed
					</button>
					<button
						className={
							active == "cancelled" ? "btn--orange" : "btn--blue"
						}
						onClick={() => setactive("cancelled")}>
						Cancelled
					</button>
				</div>
				<Classes status={active} wholeData={data} />
				<button
					className='cbtn'
					onClick={() => {
						setaddClass(true);
					}}>
					+
				</button>
			</div>
		</>
	);
};

classComponent.getInitialProps = async (appContext) => {
	const { data } = await buildClient(appContext).get(`/api/classroom/all`);
	return { data };
};

export default classComponent;
