import Sidebar from "../../../components/side-nav"
import Overlay from "../../../components/overlay"
import Paginate from "../../../components/paginate"
import { useState, useEffect } from "react"
import { FaExternalLinkAlt } from "react-icons/fa"
import buildClient from "../../../service/build-client"

const subjectComponent = ({ subjects }) => {
	useEffect(() => {
		console.log(subjects)
	}, [subjects])

	let dummyData = { name: "name", type: "scl", add: "syz" }
	const [overlay, setoverlay] = useState(false)
	const [data, setdata] = useState([...subjects])
	const [slicedData, setslicedData] = useState([])
	const [indexRef, setindexRef] = useState(0)

	const [index, setindex] = useState(0)
	const [capacity, setcapacity] = useState(10)
	const [selected, setselected] = useState(-1)
	const [length, setlength] = useState(subjects.length)

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
			<Sidebar route={"subjects"} />
			<div className='dashboard'>
				<h1>subjects</h1>
				{overlay ? (
					<Overlay
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
								Subject Id
								<input type='text' placeholder='search' />
							</th>
							<th>
								Name
								<input type='text' placeholder='search' />
							</th>
							<th>
								Grade
								<input type='text' placeholder='search' />
							</th>
							<th id='view'>
								View
								{/* <input type='text' placeholder='search' /> */}
							</th>
						</tr>
					</thead>
					<tbody>
						{slicedData.map(({ name, grade, subjectId }, index) => {
							return (
								<tr key={index}>
									<td>{subjectId}</td>
									<td>{name}</td>
									<td>{grade}</td>
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

subjectComponent.getInitialProps = async (appContext) => {
	const { data } = await buildClient(appContext).get("/api/subject/all")
	console.log(data)
	return { subjects: data }
}

export default subjectComponent
