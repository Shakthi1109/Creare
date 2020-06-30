import Router from "next/router"
import {
	FaSchool,
	FaChalkboardTeacher,
	FaUsers,
	FaUserGraduate,
	FaUsersCog,
	FaBookReader
} from "react-icons/fa"
import { MdClass } from "react-icons/md"

export default ({ route }) => {
	return (
		<div className='sideBar'>
			<img
				className='logo'
				src={require("../../public/assets/logo.png")}
				alt=''
			/>

			<div
				className={route == "users" ? "current" : "option"}
				onClick={(e) => Router.push("/admin/requests")}>
				<FaUsers className='icon' />
				<a>Requests</a>
			</div>
			<div
				className={route == "school" ? "current" : "option"}
				onClick={(e) => Router.push("/admin/school")}>
				<FaSchool className='icon' />
				<a>School</a>
			</div>
			<div
				className={route == "teachers" ? "current" : "option"}
				onClick={(e) => Router.push("/admin/teachers")}>
				<FaChalkboardTeacher className='icon' />
				<a>Teachers</a>
			</div>
			<div
				className={route == "students" ? "current" : "option"}
				onClick={(e) => Router.push("/admin/students")}>
				<FaUserGraduate className='icon' />
				<a>Students</a>
			</div>
			<div
				className={route == "admin" ? "current" : "option"}
				onClick={(e) => Router.push("/admin/admins")}>
				<FaUsersCog className='icon' />
				<a>Admins</a>
			</div>
			<div
				className={route == "subjects" ? "current" : "option"}
				onClick={(e) => Router.push("/admin/subjects")}>
				<FaBookReader className='icon' />
				<a>Subjects</a>
			</div>
			<div
				className={route == "class" ? "current" : "option"}
				onClick={(e) => Router.push("/admin/classes")}>
				<MdClass className='icon' />
				<a>Classes</a>
			</div>
		</div>
	)
}
