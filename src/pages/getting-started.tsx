import { useState, useEffect } from "react"
export default () => {
	const [Index, setIndex] = useState(0)
	const [count, setCount] = useState(3)

	let slides = [
		{
			url:
				"https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc5MDg1MzU5NTcyMjk3/sir-isaac-newton.jpg",
			title: "Newton",
			content: `
      Random XYZ Quotes Lorem ipsum dolor, sit amet consectetur
      adipisicing elit. Ratione commodi obcaecati, adipisci suscipit at
      eaque dicta voluptas aut temporibus id hic eos ad et velit animi
      nesciunt, eligendi deleniti reprehenderit`,
		},
		{
			url:
				"https://cdn.britannica.com/s:600x1000/59/23359-050-BDE4C6BA/Albert-Einstein.jpg",
			title: "Eistein",
			content: `
    Random XYZ Quotes Lorem ipsum dolor, sit amet consectetur
    adipisicing elit. Ratione commodi obcaecati, adipisci suscipit at
    eaque dicta voluptas aut temporibus id hic eos ad et velit animi
    nesciunt, eligendi deleniti reprehenderit`,
		},
		{
			url:
				"data:image/jpeg;base64,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",
			title: "Tesla",
			content: `
    Random XYZ Quotes Lorem ipsum dolor, sit amet consectetur
    adipisicing elit. Ratione commodi obcaecati, adipisci suscipit at
    eaque dicta voluptas aut temporibus id hic eos ad et velit animi
    nesciunt, eligendi deleniti reprehenderit`,
		},
	]

	// useEffect(() => {
	// 	setInterval(() => {
	// 		setIndex((Index + 1) % count)
	// 	}, 8000)
	// })

	return (
		<div className='gettingStarted'>
			<div className='row'>
				<div className='card'>
					<img src={slides[Index].url} alt='' />
					<div className='below'>
						<h1>{slides[Index].title}</h1>
						<p>{slides[Index].content}</p>
					</div>
				</div>

				<div id='controls'>
					{Array.from({ length: count }, (_, index) => {
						if (index == Index) {
							return <div className='ActiveCircle'></div>
						} else {
							return (
								<div
									className='Circle'
									onClick={(e) => setIndex(index)}></div>
							)
						}
					})}
				</div>
			</div>
			<br />
			<h1>Getting Started</h1>
		</div>
	)
}