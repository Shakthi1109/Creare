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


const Classroom = ({ classroom, currentUser }) => {
	// states
	const [sideOptions, setsideOptions] = useState(false)
	const [QA, setQA] = useState(false)
	const [students, setStudents] = useState(classroom.students);
	// effects
	useEffect(() => {
		if (currentUser.role === UserRole.Student) handleStudent()
		else socketEvent.joinClassroom(classroom.id)
		socketEvent.addToClassroom(addStudentToClassroom);
	}, []);
	// method
	const handleStudent = async () => {
		socketEvent.joinStudentToClassroom({ id: currentUser.id, name: currentUser.name, room: classroom.id });

	}

	// add student to classroom
	const addStudentToClassroom = (data: StudentAdd) => {
		const studentIndex = Array.from(students)
			.findIndex((student: StudentAdd) => JSON.stringify(student.id) === JSON.stringify(data.id));
		if (studentIndex === -1) {
			setStudents([...students, data])
		}
	}

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
									<Chat classroomMessages={classroom.messages} currentUser={currentUser} classroomId={classroom.id} />
								</div>
							) : (
									<div>
										<button className='btn' disabled>
											<span>Students</span>
											<FaChevronUp />
										</button>
										{students
											.map((student: StudentAdd) => {
												return <h4 key={student.id}>{student.name}</h4>
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
	return ({ classroom })
}

export default Classroom;