import { GetServerSidePropsContext } from 'next'
import {
	FaVideoSlash,
	FaMicrophoneSlash,
	FaChevronDown,
	FaChevronUp
} from "react-icons/fa"
import { MdScreenShare, MdClose } from "react-icons/md"
import { useState, useEffect } from "react"
import Chat from "../../components/chat"
import { socketEvent } from '../../service/socket-client'
import { StudentAdd } from '../../../server/util/interface/student-add'
import { UserRole } from '../../../server/util/enum/user-roles'
import buildClient from '../../service/build-client'
import { redirectClient } from '../../service/redirect-client'

// { students: [],
// status: 'scheduled',
// topic: 'sub3',
// subject:
//  { name: 'breanne.net', grade: 8, id: '5ef9d90db71c3c818bdc57ac' },
// teacher: { name: 'Trace71', id: '5ef9d90fb71c3c818bdc57b7' },
// addedBy: '5ef9d90fb71c3c818bdc57b7',
// duration: 1.0166666666666666,
// startDateTime: '2020-07-01T12:19:00.000Z',
// endDateTime: '2020-07-01T13:20:00.000Z',
// id: '5efc70f62714285a6ceddfb4',
// messages: [ [Object] ] }

const Classroom = ({ classroom, currentUser }) => {
	// states
	const [sideOptions, setsideOptions] = useState(false)
	const [QA, setQA] = useState(false)
	let dummyData = { name: "name", type: "scl", add: "syz" }
	// effects
	useEffect(() => {

	}, [])
	// method 
	// add student to classroom
	// const addStudentToClassroom = (data: StudentAdd) => {
	// 	// alert(JSON.stringify(data));
	// }
	// if (currentUser.role === UserRole.Student) {
	// 	socketEvent.joinClassroom({ id: currentUser.id, name: currentUser.name, room: classroomId });
	// 	socketEvent.addToClassroom(addStudentToClassroom)
	// }

	// render
	return (
		<div>
			<div className='classRoom'>
				<video
					className={!sideOptions ? "activeVideo" : "video"}
					controls
					autoPlay>
					<source src='http://techslides.com/demos/sample-videos/small.ogv' />
				</video>
				<div className='controls'>
					<span className='btn--blue circle'>
						<MdScreenShare />
					</span>
					<span className='btn--blue circle'>
						<FaVideoSlash />
					</span>
					<span className='btn--blue circle'>
						<FaMicrophoneSlash />
					</span>
				</div>
				{sideOptions ? (
					<div className='rightBar'>
						{QA ? (
							<button className='btn' onClick={() => setQA(!QA)}>
								<span>Students</span>
								<FaChevronDown />
							</button>
						) : (
								<button className='btn' onClick={() => setQA(!QA)}>
									<span>Q & A</span>
									<FaChevronDown />
								</button>
							)}

						<div className='content'>
							{QA ? (
								<div>
									<button className='btn' disabled>
										<span>Q & A</span>
										<FaChevronUp />
									</button>
									<Chat />
								</div>
							) : (
									<div>
										<button className='btn' disabled>
											<span>Students</span>
											<FaChevronUp />
										</button>
										{Array(10)
											.fill(dummyData)
											.map((item) => {
												return <h3>{item.name}</h3>
											})}
									</div>
								)}
						</div>

						<button
							className='btn'
							onClick={() => setsideOptions(!sideOptions)}>
							<span>Close</span>
							<MdClose />
						</button>
					</div>
				) : (
						<div className='sideOptions'>
							<button
								className='btn--blue'
								onClick={() => setsideOptions(!sideOptions)}>
								Students
						</button>
							<button
								className='btn--blue'
								onClick={() => {
									setsideOptions(!sideOptions)
									setQA(true)
								}}>
								Q & A
						</button>
						</div>
					)}
			</div>
		</div>
	)
}

Classroom.getInitialProps = async (ctx: GetServerSidePropsContext) => {
	let classroom: any;
	try {
		const { classroomId } = ctx.query;
		const { data } = await buildClient(ctx).get(`api/classroom/${classroomId}`);
		classroom = data;
	} catch (error) {
		redirectClient(ctx);
	}
	console.log({ classroom })
	return ({ classroom })
}

export default Classroom;