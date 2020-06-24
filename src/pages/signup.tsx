import { useState, useEffect } from "react"
import Link from "next/link"
import Router from "next/router"
import useRequest from "../custom-hook/use-request"
import Loader from "../components/loader"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import Toast from "../components/toasts"
export default () => {
	const [name, setname] = useState("")
	const [email, setemail] = useState("")
	const [password, setpassword] = useState("")
	const [rePass, setrePass] = useState("")
	const [err, seterr] = useState("")
	const [vEmail, setvEmail] = useState(false)
	const [vPass, setvPass] = useState(false)
	const [canLogin, setcanLogin] = useState(false)
	const [visiblePass, setvisiblePass] = useState(false)
	const [samepass, setsamePass] = useState(false)
	const [isLoading, setisLoading] = useState(false)
	const [onErr, setonErr] = useState(false)
	const { doRequest } = useRequest({
		url: "/api/user/signup",
		method: "post",
		body: {
			name,
			email,
			password,
			role: "student",
		},
		onSuccess: () => Router.push("/home"),
	})

	const SignUp = async () => {
		if (email != "" && password != "" && password == rePass && name != "") {
			setisLoading(true)
			const resp = await doRequest()
			if (resp[0].message) {
				setonErr(true)
				seterr(resp[0].message)
				setisLoading(false)
			}
		}
	}

	let checkEmail = () => {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			setvEmail(true)
		} else {
			setvEmail(false)
		}
	}

	let checkPassword = () => {
		if (password.length >= 8) {
			setvPass(true)
		} else {
			setvPass(false)
		}
	}

	let checkConfirmPassword = () => {
		if (password == rePass) {
			setsamePass(true)
		} else {
			setsamePass(false)
		}
	}

	useEffect(() => {
		checkEmail()
		checkPassword()
		checkConfirmPassword()
	}, [email, password, rePass])

	useEffect(() => {
		if (vEmail && vPass && samepass && name != "") {
			setcanLogin(true)
		} else {
			setcanLogin(false)
			seterr(
				`Please Provide a valid email \nPassword must be of 8 characters & matching with each.`,
			)
		}
	}, [vEmail, vPass, samepass])

	return (
		<div className='sign'>
			<h1>Creare</h1>
			{onErr ? (
				<Toast
					data={err}
					closeErr={() => {
						setonErr(false)
					}}
				/>
			) : (
				<> </>
			)}
			<div className='form'>
				<input
					type='text'
					placeholder='Name'
					onChange={(e) => setname(e.target.value)}
				/>
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
				<br />
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
						<p>{err}</p>
						<button
							disabled={!canLogin}
							className='btn'
							onClick={() => SignUp()}>
							Sign Up
						</button>
					</>
				)}
				<br />
				or
				<Link href='/login'>
					<a>Already Having an Account ?</a>
				</Link>
			</div>
		</div>
	)
}
