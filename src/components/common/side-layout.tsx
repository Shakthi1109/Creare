import Sidebars from "../side-nav"
export default ({ children, route, currentUser }) => (
	<>
		<Sidebars route={route} />
		{children}
		<div /> /** THis will be footer */
	</>
)
