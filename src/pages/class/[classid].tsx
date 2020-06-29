import {
	FaVideoSlash,
	FaMicrophoneSlash,
	FaChevronDown,
	FaChevronUp
} from "react-icons/fa"
import { MdScreenShare, MdClose } from "react-icons/md"
import { useState } from "react"
import Chat from "../../components/chat"
export default () => {
	const [sideOptions, setsideOptions] = useState(false)
	const [QA, setQA] = useState(false)
	let dummyData = { name: "name", type: "scl", add: "syz" }
	return (
		<div>
			<div className='classRoom'>
				<video
					className={!sideOptions ? "activeVideo" : "video"}
					controls
					autoPlay>
					<source src='http://techslides.com/demos/sample-videos/small.ogv' />
				</video>
				<div className='controls'>
					<span className='btn--blue circle'>
						<MdScreenShare />
					</span>
					<span className='btn--blue circle'>
						<FaVideoSlash />
					</span>
					<span className='btn--blue circle'>
						<FaMicrophoneSlash />
					</span>
				</div>
				{sideOptions ? (
					<div className='rightBar'>
						{QA ? (
							<button className='btn' onClick={() => setQA(!QA)}>
								<span>Students</span>
								<FaChevronDown />
							</button>
						) : (
							<button className='btn' onClick={() => setQA(!QA)}>
								<span>Q & A</span>
								<FaChevronDown />
							</button>
						)}

						<div className='content'>
							{QA ? (
								<div>
									<button className='btn' disabled>
										<span>Q & A</span>
										<FaChevronUp />
									</button>
									<Chat />
								</div>
							) : (
								<div>
									<button className='btn' disabled>
										<span>Students</span>
										<FaChevronUp />
									</button>
									{Array(10)
										.fill(dummyData)
										.map((item) => {
											return <h3>{item.name}</h3>
										})}
								</div>
							)}
						</div>

						<button
							className='btn'
							onClick={() => setsideOptions(!sideOptions)}>
							<span>Close</span>
							<MdClose />
						</button>
					</div>
				) : (
					<div className='sideOptions'>
						<button
							className='btn--blue'
							onClick={() => setsideOptions(!sideOptions)}>
							Students
						</button>
						<button
							className='btn--blue'
							onClick={() => {
								setsideOptions(!sideOptions)
								setQA(true)
							}}>
							Q & A
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
