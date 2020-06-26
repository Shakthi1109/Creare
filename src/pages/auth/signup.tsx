import { useState, useEffect } from "react"
import Link from "next/link"
import Router from "next/router"
import useRequest from "../../custom-hook/use-request"
import Loader from "../../components/loader"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import Toast from "../../components/toasts/index"
import buildClient from "../../service/build-client"
const signUpComponent = ({ schools }) => {
	const [name, setname] = useState("")
	const [email, setemail] = useState("")
	const [password, setpassword] = useState("")
	const [rePass, setrePass] = useState("")
	const [err, seterr] = useState([])
	const [visiblePass, setvisiblePass] = useState(false)
	const [isLoading, setisLoading] = useState(false)
	const [onErr, setonErr] = useState(false)
	const [suggest, setsuggest] = useState([])
	const [selected, setselected] = useState(false)
	const [school, setschool] = useState("")
	const [uniqRef, setuniqRef] = useState("")
	const [role, setrole] = useState("student")
	const { doRequest } = useRequest({
		url: "/api/user/signup",
		method: "post",
		body: {
			name,
			email,
			password,
			role,
			uniqRef
		},
		onSuccess: () => Router.push("/home"),
		onError: (error) => {
			setonErr(true)
			seterr(error)
			setisLoading(false)
		}
	})

	const SignUp = async () => {
		setisLoading(true)
		alert(role)
		const resp = await doRequest()
	}

	useEffect(() => {
		console.log(suggest)
	}, [suggest])

	let search = (val) => {
		setselected(false)
		val = val.toLowerCase()
		let filterd = schools.filter(({ name, uniqRef }) => {
			name = name.toLowerCase()
			uniqRef = uniqRef.toLowerCase()
			if (
				(name.substring(0, val.length) == val ||
					uniqRef.substring(0, val.length) == val) &&
				val.length >= 1
			) {
				return name
			}
		})
		setsuggest([...filterd])
	}

	return (
		<div className='sign'>
			{onErr ? <Toast data={err} /> : <> </>}
			<div className='form'>
				<h1>Creare</h1>
				<input
					type='text'
					placeholder='Name'
					onChange={(e) => setname(e.target.value)}
				/>
				<br />
				<select
					onChange={(e) => {
						setrole(e.target.value)
					}}>
					<option selected value='student'>
						Student
					</option>
					<option value='teacher'>Teacher</option>
					<option value='admin'>Admin</option>
				</select>
				<br />
				<div id='suggest'>
					<input
						type='text'
						placeholder="Specify your School name or School's UniqueID"
						value={school}
						onChange={(e) => {
							setschool(e.target.value)
							search(e.target.value)
						}}
					/>
					{suggest.length >= 1 && !selected ? (
						suggest.map(({ name, city, uniqRef }) => {
							return (
								<button
									className='suggest'
									onClick={() => {
										setuniqRef(uniqRef)
										setselected(true)
										setschool(`${name}, ${city}`)
									}}>{`${name}, ${city}`}</button>
							)
						})
					) : (
						<> </>
					)}
				</div>
				<br />
				<input
					type='text'
					placeholder='e-Mail'
					onChange={(e) => setemail(e.target.value)}
				/>
				<br />
				<div className='pass'>
					<input
						type={visiblePass ? "text" : "password"}
						placeholder='Password'
						onChange={(e) => setpassword(e.target.value)}
					/>
					{visiblePass ? (
						<FaEyeSlash
							className='icon'
							onClick={() => {
								setvisiblePass(false)
							}}
						/>
					) : (
						<FaEye
							className='icon'
							onClick={() => {
								setvisiblePass(true)
							}}
						/>
					)}
				</div>
				<br /> <br />
				<div className='pass'>
					<input
						type={visiblePass ? "text" : "password"}
						placeholder='Re-type Password'
						onChange={(e) => setrePass(e.target.value)}
					/>
					{visiblePass ? (
						<FaEyeSlash
							className='icon'
							onClick={() => {
								setvisiblePass(false)
							}}
						/>
					) : (
						<FaEye
							className='icon'
							onClick={() => {
								setvisiblePass(true)
							}}
						/>
					)}
				</div>
				<br />
				{isLoading ? (
					<Loader isLoading={isLoading}></Loader>
				) : (
					<>
						<button className='btn' onClick={() => SignUp()}>
							Sign Up
						</button>
					</>
				)}
				<br />
				<b>or</b>
				<Link href='/login'>
					<a>Already Having an Account ?</a>
				</Link>
			</div>
		</div>
	)
}

signUpComponent.getInitialProps = async (appContext) => {
	const { data } = await buildClient(appContext).get("/api/school/")
	return { schools: data }
}

export default signUpComponent