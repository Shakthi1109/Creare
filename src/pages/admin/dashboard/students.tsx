import Sidebar from "../../../components/sidebar"
import Overlay from "../../../components/overlay"
import Paginate from "../../../components/paginate"
import { useState, useEffect } from "react"
import { FaEye } from "react-icons/fa"
export default () => {
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

	useEffect(() => {
		console.log(slicedData)
	}, [slicedData])
	return (
		<>
			<Sidebar curr={"students"} />
			<div className='dashboard'>
				<h1>Students</h1>
				<br />
				{overlay ? (
					<Overlay
						data={data[selected]}
						closeFunc={() => {
							setoverlay(false)
						}}
					/>
				) : (
					<></>
				)}
				<div className='col'>
					{slicedData.map((item, index) => {
						return (
							<div className='list-item'>
								<h2>Name - {item.name}</h2>
								<h3>Type - {item.type}</h3>
								{indexRef + index}
								<FaEye
									onClick={() => {
										setselected(index)
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
