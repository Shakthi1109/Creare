import { useState, useEffect } from 'react';
import { MdSend } from "react-icons/md";
import { UserRole } from '../../../server/util/enum/user-roles';
import { socketEvent } from '../../service/socket-client';

export default ({ classroomMessages, currentUser, classroomId }) => {
	const [messages, setMessages] = useState(classroomMessages);
	const [message, setMessage] = useState("");

	useEffect(() => {
		socketEvent.recievedMessage(recieveMessage);
	}, [])

	const recieveMessage = (data) => {
		const updatedMessages = Array.from(messages);
		updatedMessages.push({
			name: data.name,
			createdAt: Date.now(),
			message: data.message
		});
		setMessages(updatedMessages);
	}

	const getTime = (dateTime) => {
		const hours = new Date(dateTime).getHours();
		const mins = new Date(dateTime).getMinutes();
		return hours + ":" + mins;
	}

	const addMessage = () => {
		if (currentUser.role === UserRole.Admin) return;
		if (message.length === 0) return;
		const updatedMessages = Array.from(messages);
		updatedMessages.push({
			name: currentUser.name,
			createdAt: Date.now(),
			message
		});
		socketEvent.sendMessage({ id: currentUser.id, message, name: currentUser.name, room: classroomId }, () => {
			setMessages(updatedMessages);
			setMessage("");
		})
	}

	return (
		<div className='chat'>
			<div className='chatWindow'>
				{messages.map(({ name, createdAt, message }) => {

					return (
						<div id='receivedMsg' key={Math.random() * 1000}>
							<h4>
								{name} at {getTime(createdAt)} asks
							</h4>
							{message}
						</div>
					);

				})}
			</div>
			<div className='send'>
				<input type='text' placeholder='Ask your question..' onChange={({ target: { value } }) => setMessage(value)} value={message} />
				<MdSend className='icon' onClick={addMessage} />
			</div>
		</div>
	);
};
