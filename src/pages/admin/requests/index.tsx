import Sidebar from "../../../components/side-nav"
import Overlay from "../../../components/overlay"
import Paginate from "../../../components/paginate"
import { useState, useEffect } from "react"
import { FaPencilAlt } from "react-icons/fa"
import buildClient from "../../../service/build-client"
import Router from "next/router"
const userComponent = ({ resp }) => {
	useEffect(() => {
		setdata([...resp])
		setlength(resp.length)
	}, [resp])

	let dummyData = { name: "name", type: "scl", add: "syz" }
	const [overlay, setoverlay] = useState(false)
	const [data, setdata] = useState([])
	const [slicedData, setslicedData] = useState([])
	const [indexRef, setindexRef] = useState(0)

	const [index, setindex] = useState(0)
	const [capacity, setcapacity] = useState(20)
	const [selected, setselected] = useState(-1)
	const [length, setlength] = useState(0)

	useEffect(() => {
		setslicedData(data.slice(0, capacity))
	}, [data])

	useEffect(() => {
		let ind = index * capacity
		setindexRef(ind)
		setslicedData(data.slice(ind, ind + capacity))
	}, [index])
	return (
		<>
			<Sidebar route={"users"} />
			<div className='dashboard'>
				<h1>Users</h1>
				{overlay ? (
					<Overlay
						canAccept={true}
						data={dummyData}
						closeFunc={() => {
							setoverlay(false)
						}}
					/>
				) : (
					<></>
				)}
				<table>
					<thead>
						<tr>
							<th>
								Id
								<input type='text' placeholder='search' />
							</th>
							<th>
								Name
								<input type='text' placeholder='search' />
							</th>
							<th>
								Role
								<input type='text' placeholder='search' />
							</th>
							<th>
								e-Mail
								<input type='text' placeholder='search' />
							</th>
							<th id='view'>
								View
								{/* <input type='text' placeholder='search' /> */}
							</th>
						</tr>
					</thead>
					<tbody>
						{slicedData.map((item, index) => {
							return (
								<tr key={item.id}>
									<td>{item.id}</td>
									<td>{item.name}</td>
									<td>{item.role}</td>
									<td>{item.email}</td>
									<td id='view'>
										<FaPencilAlt
											onClick={() => {
												Router.push(
													`/admin/requests/${item.id}`
												)
											}}
											className='icon'
										/>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
				<Paginate
					prev={() => {
						setindex(index - 1)
					}}
					next={() => {
						setindex(index + 1)
					}}
					length={length}
					currentIndex={index}
					capacity={capacity}
				/>
			</div>
		</>
	)
}

userComponent.getInitialProps = async (appContext) => {
	const { data } = await buildClient(appContext).get(`/api/user/requested`)
	return { resp: data }
}

export default userComponent
