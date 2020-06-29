import Sidebar from "../../../components/side-nav"
import Overlay from "../../../components/overlay"
import { useState, useEffect } from "react"
import { FaPencilAlt } from "react-icons/fa"
import buildClient from "../../../service/build-client"

const schoolComponent = ({ currentUser, school }) => {
	useEffect(() => {
		console.log(currentUser)
	}, [currentUser])

	let dummyData = { name: "name", type: "scl", add: "syz" }
	const [overlay, setoverlay] = useState(false)
	const [name, setname] = useState("school Name")
	const [address, setaddress] = useState("school Add")
	const [address2, setaddress2] = useState("Address Cont..")
	const [city, setcity] = useState("XYZ")
	const [state, setstate] = useState("ABC")
	const [pinCode, setpinCode] = useState("School Phone-No")
	const [canEdit, setcanEdit] = useState(false)
	return (
		<>
			<Sidebar route={"school"} />
			<div className='dashboard'>
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
					<h1>Schools Info</h1>
					<br />
					<br />
					<h2>Name</h2>
					<input
						type='text'
						value={name}
						disabled={!canEdit}
						onChange={(e) => {
							setname(e.target.value)
						}}
					/>

					<h2>Address: Line 1</h2>
					<input
						type='text'
						value={address}
						disabled={!canEdit}
						onChange={(e) => {
							setaddress(e.target.value)
						}}
					/>

					<h2>Address - Line 2</h2>
					<input
						type='text'
						value={address2}
						disabled={!canEdit}
						onChange={(e) => {
							setaddress2(e.target.value)
						}}
					/>

					<h2>City</h2>
					<input
						type='text'
						value={city}
						disabled={!canEdit}
						onChange={(e) => {
							setcity(e.target.value)
						}}
					/>

					<h2>State</h2>
					<input
						type='text'
						value={state}
						disabled={!canEdit}
						onChange={(e) => {
							setstate(e.target.value)
						}}
					/>

					<h2>PinCode</h2>
					<input
						type='text'
						value={pinCode}
						disabled={!canEdit}
						onChange={(e) => {
							setpinCode(e.target.value)
						}}
					/>
				</div>
				{canEdit ? (
					<button
						className='btn--blue'
						onClick={() => {
							setcanEdit(false)
						}}>
						Confirm Changes
					</button>
				) : (
						<button
							className='btn--blue'
							onClick={() => {
								setcanEdit(true)
							}}>
							Click here to Edit
						</button>
					)}
			</div>
		</>
	)
}

schoolComponent.getInitialProps = async (appContext) => {

	const { data } = await buildClient(appContext).get("/api/school/byId")
	return { school: data }
}

export default schoolComponent
