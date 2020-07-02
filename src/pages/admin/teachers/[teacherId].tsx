import { TiArrowBack } from "react-icons/ti";
import { useEffect, useState } from "react";
import buildClient from "../../../service/build-client";
import { redirectClient } from "../../../service/redirect-client";

const teacherIdComponent = ({ data }) => {
	return (
		<div className='overlay'>
			<div className='container'>
				<h2>ID - {data.id}</h2>
				<h1>Name - {data.name}</h1>
				<h2>Role - {data.role}</h2>
				<h2>e-Mail - {data.email}</h2>
				<TiArrowBack onClick={() => {}} className='icon' />
			</div>
		</div>
	);
};

teacherIdComponent.getInitialProps = async (appContext) => {
	const { teacherId } = appContext.query;
	// try {
	const { data } = await buildClient(appContext).get(
		`/api/teacher/profile/${teacherId}`
	);
	if (!data) throw new Error("no user found");
	console.log(data);
	return { data };
	// } catch (error) {
	// 	redirectClient(appContext)
	// }
};

export default teacherIdComponent;
