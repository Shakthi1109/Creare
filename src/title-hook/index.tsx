export const getRouteTitle = (route: string) => {
	switch (route) {
		case "/404":
			return "Not Found!"
		case "/":
			return "Creare"
		case "/auth/signin":
			return "Sign-In"
		case "/auth/signup":
			return "Sign-Up"
		case "/auth/signout":
			return "Sign-Out"
		case "/admin/admins/index":
			return "Admins"
		case "/admin/requests/index":
			return "Registered Users"
		case "/admin/students/index":
			return "Students"
		case "/admin/subjects/index":
			return "Subjects"
		case "/admin/teachers/teachers":
			return "Teachers"
		case "/class":
			return "ClassRoom"
		case "/admin":
			return "Dashboard"
		case "":
			return ""
		case "":
			return ""
		default:
			return ""
	}
}
