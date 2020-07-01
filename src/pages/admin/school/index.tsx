import Sidebar from "../../../components/side-nav"
import Overlay from "../../../components/overlay"
import { useState, useEffect } from "react"
import buildClient from "../../../service/build-client"
import { redirectClient } from "../../../service/redirect-client"
import useRequest from "../../../custom-hook/use-request"

const schoolComponent = ({ currentUser, school }) => {
	useEffect(() => {
		const { address1, address2, city, state, pincode, name } = school
		setaddress(address1)
		setaddress2(address2)
		setcity(city)
		setstate(state)
		setpinCode(pincode)
		setname(name)
	}, [school])

	let dummyData = { name: "name", type: "scl", add: "syz" }
	const [overlay, setoverlay] = useState(false)
	const [name, setname] = useState("school Name")
	const [address, setaddress] = useState("school Add")
	const [address2, setaddress2] = useState("Address Cont..")
	const [city, setcity] = useState("XYZ")
	const [state, setstate] = useState("ABC")
	const [pincode, setpinCode] = useState("School Phone-No")
	const [canEdit, setcanEdit] = useState(false)
	const [isLoading, setisLoading] = useState(false)
	const [onErr, setonErr] = useState(false)
	const [err, seterr] = useState("")
	const { doRequest } = useRequest({
		url: "/api/school/update",
		method: "put",
		body: {
			name,
			address,
			address2,
			city,
			state,
			pincode
		},
		onSuccess: () => {
			setcanEdit(false)
		},
		onError: (err) => {
			setonErr(true)
			seterr(err)
		}
	})

	const updateDetails = async () => {
		const resp = await doRequest()
	}

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
					<h1>School's Info</h1>
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
						value={pincode}
						disabled={!canEdit}
						onChange={(e) => {
							setpinCode(e.target.value)
						}}
					/>
					{canEdit ? (
						<button
							className='btn--blue'
							onClick={() => updateDetails()}>
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
			</div>
		</>
	)
}

schoolComponent.getInitialProps = async (appContext) => {
	try {
		const { data } = await buildClient(appContext).get("/api/school/detail")
		if (!data) throw new Error("no school found")
		return { school: data }
	} catch (error) {
		redirectClient(appContext)
	}
}

export default schoolComponent
