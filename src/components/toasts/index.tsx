import Toast from "./toasts"
import { useState, useEffect } from "react"
export default ({ data, type = "error" }) => {
	const [errs, seterrs] = useState([])
	useEffect(() => {
		seterrs([...data])
		console.log([...data])
	}, [data])

	useEffect(() => {
		console.log(errs)
	}, [errs])

	return (
		<div className='container'>
			{errs.map(({ message }, index) => {
				return (
					<Toast
						key={index}
						message={message}
						type={type}
						closeErr={() => {
							seterrs(errs.filter((_, ind) => ind != index))
						}}
					/>
				)
			})}
		</div>
	)
}
