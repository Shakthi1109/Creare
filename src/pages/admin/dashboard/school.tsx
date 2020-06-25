import Sidebar from "../../../components/sidebar"
import Overlay from "../../../components/overlay"
import { useState } from "react"
import { FaPencilAlt } from "react-icons/fa"
export default () => {
	let dummyData = { name: "name", type: "scl", add: "syz" }
	const [overlay, setoverlay] = useState(false)
	return (
		<>
			<Sidebar curr={"school"} />
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
					{Array(20)
						.fill(dummyData)
						.map((item) => {
							return (
								<div className='list-item'>
									<h2>{item.name}</h2>
									<h3>{item.type}</h3>
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
