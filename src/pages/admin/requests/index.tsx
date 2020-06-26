
import Sidebar from "../../../components/side-nav"
import Overlay from "../../../components/overlay"
import Paginate from "../../../components/paginate"
import { useState, useEffect } from "react"
import { FaPencilAlt } from "react-icons/fa"
import buildClient from "../../../service/build-client"

const userComponent = ({ resp }) => {
	let dummyData = { name: "name", type: "scl", add: "syz" }
	const [overlay, setoverlay] = useState(false)
	const [data, setdata] = useState([])
	const [slicedData, setslicedData] = useState([])
	const [indexRef, setindexRef] = useState(0)
	useEffect(() => {
		let arr = Array(110).fill(dummyData)
		setdata([...arr])
	}, [])
	const [index, setindex] = useState(0)
	const [capacity, setcapacity] = useState(20)
	const [selected, setselected] = useState(-1)
	const [length, setlength] = useState(110)

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
				<div className='col'>
					{Array(20)
						.fill(dummyData)
						.map((item, index) => {
							return (
								<div key={index} className='list-item'>
									<h2>Name - {item.name}</h2>
									<h3>Type - {item.type}</h3>
									<FaPencilAlt
										onClick={() => {
											setoverlay(true)
										}}
										className='icon'
									/>
								</div>
							)
						})}
				</div>
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
	// const { data } = await buildClient(appContext).get("/api/user/")
	// console.log(data)
	// return { resp: data }
}

export default userComponent
