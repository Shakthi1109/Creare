import Sidebar from "../../../components/sidebar"
export default () => {
	return (
		<>
			<Sidebar curr={"users"} />
			<div className='dashboard'>
				<h1>Users.</h1>
			</div>
		</>
	)
}
