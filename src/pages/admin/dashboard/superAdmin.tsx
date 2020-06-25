import Sidebar from "../../../components/sidebar"

export default () => {
    return(
        <>
        <Sidebar curr={"superAdmin"} />
        <div className='dashboard'>
				<h1>Super Admin</h1>
			</div>
        </>
    )
}