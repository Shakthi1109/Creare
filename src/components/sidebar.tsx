import Router from "next/router";
import {
	FaSchool,
	FaChalkboardTeacher,
	FaUsers,
	FaUserGraduate,
	FaUsersCog,
	FaTools,
} from "react-icons/fa"

export default ({ curr }) => {
	return (
		<div className='sideBar'>
			<div className='logo'>
				<h2>Creare</h2>
			</div>
			<div
				className={curr == "users" ? "current" : "option"}
				onClick={(e) => Router.push("/admin/dashboard/users")}>
				<FaUsers className='icon' />
				<a>Registered</a>
			</div>
			<div
				className={curr == "school" ? "current" : "option"}
				onClick={(e) => Router.push("/admin/dashboard/school")}>
				<FaSchool className='icon' />
				<a>School</a>
			</div>
			<div
				className={curr == "teachers" ? "current" : "option"}
				onClick={(e) => Router.push("/admin/dashboard/teachers")}>
				<FaChalkboardTeacher className='icon' />
				<a>Teachers</a>
			</div>
			<div
				className={curr == "students" ? "current" : "option"}
				onClick={(e) => Router.push("/admin/dashboard/students")}>
				<FaUserGraduate className='icon' />
				<a>Students</a>
			</div>
			<div
				className={curr == "admin" ? "current" : "option"}
				onClick={(e) => Router.push("/admin/dashboard/admins")}>
				<FaUsersCog className='icon' />
				<a>Admins</a>
			</div>
			<div
				className={curr == "Super Admin" ? "current" : "option"}
				onClick={(e) => Router.push("/admin/dashboard/superAdmin")}>
				<FaTools className='icon' />
				<a>Super</a>
				<a>Admin</a>
			</div>
		</div>
	);
};
