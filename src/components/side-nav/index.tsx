import Router from "next/router"
import {
	FaSchool,
	FaChalkboardTeacher,
	FaUsers,
	FaUserGraduate,
	FaUsersCog,
	FaBookReader
} from "react-icons/fa"
export default ({ route }) => {
	return (
		<div className='sideBar'>
			<div className='logo'>
				<h2>Creare</h2>
			</div>
			<div
				className={route == "users" ? "current" : "option"}
				onClick={(e) => Router.push("/admin/requests")}>
				<a>Requests</a>
				<FaUsers className='icon' />
			</div>
			<div
				className={route == "school" ? "current" : "option"}
				onClick={(e) => Router.push("/admin/school")}>
				<a>School</a>
				<FaSchool className='icon' />
			</div>
			<div
				className={route == "teachers" ? "current" : "option"}
				onClick={(e) => Router.push("/admin/teachers")}>
				<a>Teachers</a>
				<FaChalkboardTeacher className='icon' />
			</div>
			<div
				className={route == "students" ? "current" : "option"}
				onClick={(e) => Router.push("/admin/students")}>
				<a>Students</a>
				<FaUserGraduate className='icon' />
			</div>
			<div
				className={route == "admin" ? "current" : "option"}
				onClick={(e) => Router.push("/admin/admins")}>
				<a>Admins</a>
				<FaUsersCog className='icon' />
			</div>
			<div
				className={route == "subjects" ? "current" : "option"}
				onClick={(e) => Router.push("/admin/subjects")}>
				<a>Subjects</a>
				<FaBookReader className='icon' />
			</div>
		</div>
	)
}
