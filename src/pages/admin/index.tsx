import Sidebar from "../../components/side-nav"
export default () => {
	return (
		<>
			<Sidebar route={""} />
			<div className='dashboard'>
				<div className='col'>
					<h1>Welcome Admin</h1>
					<br />
					<br />
					<h2>Students Count: 2000</h2>

					<h2>Teachers Count: 500</h2>
					<h2>Admin Count: 10</h2>
				</div>
			</div>
		</>
	)
}
