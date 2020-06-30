import Sidebar from "../../../components/side-nav"
import { useState, useEffect } from "react"
import Classes from "./classes"
import AddClass from "./addClass"
export default () => {
	const [active, setactive] = useState("Upcoming")
	const [addClass, setaddClass] = useState(false)
	return (
		<>
			<Sidebar route={"class"} />
			{addClass ? (
				<AddClass
					closeFunc={() => {
						setaddClass(false)
					}}
				/>
			) : (
				<></>
			)}
			<div id='dashboard'>
				<div id='row'>
					<button
						className={
							active == "Upcoming" ? "btn--orange" : "btn--blue"
						}
						onClick={() => setactive("Upcoming")}>
						Upcoming
					</button>
					<button
						className={
							active == "InProgress" ? "btn--orange" : "btn--blue"
						}
						onClick={() => setactive("InProgress")}>
						InProgress
					</button>
					<button
						className={
							active == "Completed" ? "btn--orange" : "btn--blue"
						}
						onClick={() => setactive("Completed")}>
						Completed
					</button>
				</div>
				<Classes status={active} />
				<button
					className='cbtn'
					onClick={() => {
						setaddClass(true)
					}}>
					+
				</button>
			</div>
		</>
	)
}
