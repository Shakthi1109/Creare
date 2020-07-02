import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import useRequest from "../../../custom-hook/use-request";
import Router from "next/router";

const addClassComponent = ({ closeFunc, teachers, subjects }) => {
	useEffect(() => {
		setteacherId(teachers[0][1]);
		setsubjectId(subjects[0][1]);
	}, [teachers, subjects]);

	const [topic, settopic] = useState("");
	const [teacherId, setteacherId] = useState("");
	const [subjectId, setsubjectId] = useState("");
	const [startDateTime, setstartDateTime] = useState(Date.now());
	const [endDateTime, setendDateTime] = useState(Date.now());
	const { doRequest } = useRequest({
		url: "/api/user/signin",
		method: "post",
		body: {
			topic,
			teacherId,
			subjectId,
			startDateTime,
			endDateTime
		},
		onSuccess: () => closeFunc(),
		onError: (error) => {}
	});

	let postClass = async () => {
		// const resp = await doRequest();
		console.log(startDateTime, endDateTime);
	};

	return (
		<div className='overlay'>
			<div className='container'>
				<div className='form'>
					<h1>Schedule New Class</h1>
					<input
						type='text'
						placeholder='Title of Class'
						onChange={(e) => settopic(e.target.value)}
					/>
					<select onChange={(e) => setteacherId(e.target.value)}>
						{teachers.map((item) => {
							return <option value={item[1]}>{item[0]}</option>;
						})}
					</select>
					<select onChange={(e) => setsubjectId(e.target.value)}>
						{subjects.map((item) => {
							return <option value={item[1]}>{item[0]}</option>;
						})}
					</select>
					<span>
						<h2>Choose Starting date</h2>
						<input
							type='datetime-local'
							value={startDateTime || Date.now()}
							onChange={(e) => {
								const dt = new Date(e.target.value);
								setstartDateTime(dt.valueOf());
							}}
						/>
					</span>
					<span>
						<h2>Choose ending date</h2>
						<input
							type='datetime-local'
							value={endDateTime || Date.now()}
							onChange={(e) => {
								const dt = new Date(e.target.value);
								setendDateTime(dt.valueOf());
							}}
						/>
					</span>
					<button
						className='btn--orange'
						onClick={() => {
							postClass();
						}}>
						Submit
					</button>
				</div>
				<MdClose
					onClick={() => {
						closeFunc();
					}}
					className='icon'
				/>
			</div>
		</div>
	);
};

export default addClassComponent;
