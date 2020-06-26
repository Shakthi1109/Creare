import { MdClose } from "react-icons/md";

export default ({ data, closeFunc, canAccept = false }) => (
	<div className='overlay'>
		<div className='container'>
			<h1>{data.name}</h1>
			<h2>{data.type}</h2>
			<h3>{data.add}</h3>
			<MdClose onClick={() => closeFunc()} className='icon' />
			{canAccept ? (
				<div className='row'>
					<button className='red-btn'>Reject</button>
					<button className='btn-inverse'>Accept</button>
				</div>
			) : (
				<></>
			)}
		</div>
	</div>
);
