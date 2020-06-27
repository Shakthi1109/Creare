import Sidebar from "../../../components/side-nav"
import Overlay from "../../../components/overlay"
import { useState, useEffect } from "react"
import { FaPencilAlt } from "react-icons/fa"
import buildClient from "../../../service/build-client"

const schoolComponent = ({ currentUser, resp }) => {
	useEffect(() => {
		console.log(currentUser)
	}, [currentUser])

	let dummyData = { name: "name", type: "scl", add: "syz" }
	const [overlay, setoverlay] = useState(false)
	return (
		<>
			<Sidebar route={"school"} />
			<div className='dashboard'>
				<h1>Schools</h1>
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
				<div className='col'>
					{Array(1)
						.fill(dummyData)
						.map((item) => {
							return (
								<div className='list-item'>
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
			</div>
		</>
	)
}

schoolComponent.getInitialProps = async (appContext) => {
	// const { data } = await buildClient(appContext).get("/api/school/byId")
	// console.log(data)
	// return { resp: data }
}

export default schoolComponent
