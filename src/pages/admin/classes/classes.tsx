import Paginate from "../../../components/paginate"
import { useState, useEffect } from "react"
import { FaExternalLinkAlt } from "react-icons/fa"
export default ({ status }) => {
	let dummyData = { name: "name", type: "scl", add: "syz" }
	const [overlay, setoverlay] = useState(false)
	const [data, setdata] = useState([])
	const [slicedData, setslicedData] = useState([])
	const [indexRef, setindexRef] = useState(0)
	useEffect(() => {
		let arr = Array(50).fill(dummyData)
		setdata([...arr])
	}, [])
	useEffect(() => {
		console.log(status)
	}, [status])
	const [index, setindex] = useState(0)
	const [capacity, setcapacity] = useState(10)
	const [selected, setselected] = useState(-1)
	const [length, setlength] = useState(50)

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
			<div className='dashboard'>
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
								Teacher
								<input type='text' placeholder='search' />
							</th>
							<th>
								Date
								<input type='text' placeholder='search' />
							</th>
							<th id='view'>View</th>
						</tr>
					</thead>
					<tbody>
						{slicedData.map((item, ind) => {
							return (
								<tr key={indexRef + ind}>
									<td>{indexRef + ind}</td>
									<td>{item.name}</td>
									<td>{item.type}</td>
									<td>{item.add}</td>
									<td id='view'>
										<FaExternalLinkAlt
											onClick={() => {
												setoverlay(true)
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
