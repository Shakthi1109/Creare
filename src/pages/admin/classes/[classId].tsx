import { TiArrowBack } from "react-icons/ti";
import { useEffect, useState } from "react";
import buildClient from "../../../service/build-client";
import { redirectClient } from "../../../service/redirect-client";

const classIdComponent = ({ data }) => {
	return (
		<div className='overlay'>
			<div className='container'>
				<div className='details'>
					<h1>Topic - {data.topic}</h1>
					<h1>ID - {data.id}</h1>
					<h1>Subject - {data.subject.name}</h1>
					<h1>Grade - {data.subject.grade}</h1>
					<h1>Teacher - {data.teacher.name}</h1>
					{/* <h1>Started At - {data.startDateTime}</h1> */}
					<TiArrowBack onClick={() => {}} className='icon' />
				</div>
			</div>
		</div>
	);
};

classIdComponent.getInitialProps = async (appContext) => {
	const { classId } = appContext.query;
	const { data } = await buildClient(appContext).get(
		`/api/classroom/${classId}`
	);
	if (!data) throw new Error("no Class found");
	console.log(data);
	return { data };
};

export default classIdComponent;
