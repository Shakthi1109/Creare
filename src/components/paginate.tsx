import { FaAngleRight, FaAngleLeft } from "react-icons/fa"
import { useEffect, useState } from "react"

/*
prev -> function for prev page offset
next -> function for next page offset
length -> total lenght of whole data got.
currenIndex -> specifies the current page
capacity -> specifies the no.of.data items per page
*/
export default ({ prev, next, length, currentIndex, capacity }) => {
	const [pages, setpages] = useState(0)
	useEffect(() => {
		if (
			length != undefined &&
			currentIndex != undefined &&
			capacity != undefined
		) {
			if (length % capacity == 0) setpages(Math.floor(length / capacity))
			else setpages(Math.floor(length / capacity) + 1)
		}
	}, [length, currentIndex, capacity])
	return (
		<div className='pages'>
			<div className='row'>
				{currentIndex + 1 != 1 ? (
					<FaAngleLeft
						className='icon'
						onClick={() => {
							prev()
						}}
					/>
				) : (
					<></>
				)}
				<h1>{`${currentIndex + 1} / ${pages}`}</h1>
				{currentIndex + 1 != pages ? (
					<FaAngleRight
						className='icon'
						onClick={() => {
							next()
						}}
					/>
				) : (
					<></>
				)}
			</div>
		</div>
	)
}
