import Sidebar from "../../../components/sidebar"
export default () => {
	return (
		<>
			<Sidebar curr={"admin"} />
			<div className='dashboard'>
				<h1>Admins</h1>
			</div>
		</>
	)
}
