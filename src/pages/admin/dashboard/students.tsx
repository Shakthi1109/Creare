import Sidebar from "../../../components/sidebar"
export default () => {
	return (
		<>
			<Sidebar curr={"students"} />
			<div className='dashboard'>
				<h1>Students</h1>
			</div>
		</>
	)
}
