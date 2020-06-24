import Sidebar from "../../../components/sidebar"
export default () => {
	return (
		<>
			<Sidebar curr={"school"} />
			<div className='dashboard'>
				<h1>Schools</h1>
			</div>
		</>
	)
}
