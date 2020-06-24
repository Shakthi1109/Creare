import Router from "next/router"
import { FaSchool, FaChalkboardTeacher, FaUsersCog } from "react-icons/fa"
export default ({ curr }) => {
	return (
		<div className='sideBar'>
			<div className='logo'>
				<h2>Creare</h2>
			</div>
			<div
				className={curr == "school" ? "current" : "option"}
				onClick={(e) => Router.push("/admin/dashboard/school")}>
				<a>Schools</a>

				<FaSchool className='icon' />
			</div>
			<div
				className={curr == "teachers" ? "current" : "option"}
				onClick={(e) => Router.push("/admin/dashboard/teachers")}>
				<a>Teachers</a>
				<FaChalkboardTeacher className='icon' />
			</div>

			<div
				className={curr == "admin" ? "current" : "option"}
				onClick={(e) => Router.push("/admin/dashboard/admins")}>
				<a>Admins</a>
				<FaUsersCog className='icon' />
			</div>
		</div>
	)
}
