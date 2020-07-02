import { MdSend } from "react-icons/md";

export default ({}) => {
	const msgs = [
		{
			userName: "ayz",
			msg: "lorem",
			time: "12/12/2020 19:00"
		},
		{
			userName: "you",
			msg: "lorem ipsut lorem ipsut donor ",
			time: "12/12/2020 19:00"
		},
		{
			userName: "ayz",
			msg: "lorem ipsut donor lorem ipsut donor lorem ipsut donor ",
			time: "12/12/2020 19:00"
		},
		{
			userName: "you",
			msg:
				"lorem ipsut donor lorem ipsut donor lorem ipsut donor lorem ipsut donor lorem ipsut donor lorem ipsut donor",
			time: "12/12/2020 19:00"
		},
		{
			userName: "ayz",
			msg: "lorem ipsut donor lorem ipsut donor lorem ipsut donor ",
			time: "12/12/2020 19:00"
		},
		{
			userName: "you",
			msg: "lorem ipsut donor lorem ipsut donor lorem ipsut donor ",
			time: "12/12/2020 19:00"
		},
		{
			userName: "ayz",
			msg: "lorem ipsut donor lorem ipsut donor lorem ipsut donor ",
			time: "12/12/2020 19:00"
		},
		{
			userName: "you",
			msg: "lorem ipsut donor lorem ipsut donor lorem ipsut donor ",
			time: "12/12/2020 19:00"
		},
		{
			userName: "ayz",
			msg: "lorem ipsut ",
			time: "12/12/2020 19:00"
		},
		{
			userName: "you",
			msg: "ipsut donor lorem ipsut donor ",
			time: "12/12/2020 19:00"
		}
	];
	return (
		<div className='chat'>
			<div className='chatWindow'>
				{msgs.map(({ userName, time, msg }) => {
					if (userName == "you") {
						return (
							<div id='sentMsg'>
								<h4>
									{userName} at {time}
								</h4>
								{msg}
							</div>
						);
					} else {
						return (
							<div id='receivedMsg'>
								<h4>
									{userName} at {time}
								</h4>
								{msg}
							</div>
						);
					}
				})}
			</div>
			<div className='send'>
				<input type='text' placeholder='Ask your question..' />
				<MdSend className='icon' />
			</div>
		</div>
	);
};
