import React, { FormEvent, useState } from 'react';
import '../styles/PopupForm.css';

interface PopupFormProps {
	trigger: boolean;
	setTrigger: (buttonPopup: boolean) => void;
	event: (newBirdName: string) => void;
}

const PopupForm = ({ trigger, setTrigger, event }: PopupFormProps) => {
	const [birdTitle, setBirdTitle] = useState<string>('');

	const handleSubmitClick = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			window.confirm(
				`Are you sure you want to add new bird call ${birdTitle}?`
			)
		) {
			event(birdTitle);
			setTrigger(false);
		}
	};

	return trigger ? (
		<div className="form-popup">
			<form className="form-container" onSubmit={handleSubmitClick}>
				<h1>Add New Bird to Observe</h1>
				<input
					type="text"
					value={birdTitle}
					placeholder="enter new bird's name"
					required
					onChange={(e) => setBirdTitle(e.target.value)}
				></input>
				<button type="submit" className="btn">
					ADD
				</button>
				<button
					type="button"
					className="btn cancel"
					onClick={() => setTrigger(false)}
				>
					CANCEL
				</button>
			</form>
		</div>
	) : null;
};

export default PopupForm;
