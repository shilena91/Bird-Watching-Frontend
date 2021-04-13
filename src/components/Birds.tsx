import React from 'react';
import { useState, useEffect } from 'react';
import { IBird } from '../interfaces/interfaces';

interface ObservationProps {
	birdId: number;
	birdName: string;
	initialNumberOfObservations: number;
	event: (birdName: string, birdId: number) => void;
}

const Observation = ({
	birdId,
	birdName,
	initialNumberOfObservations,
	event,
}: ObservationProps) => {
	const [numberOfObservations, setNumOfObservations] = useState<number>(
		initialNumberOfObservations
	);

	useEffect(() => {
		setNumOfObservations(initialNumberOfObservations);
		console.log('iNumOfOb change');
	}, [initialNumberOfObservations]);

	return (
		<div className="bird">
			<h4 className="name">{birdName}</h4>
			<h3>{numberOfObservations}</h3>
			<button
				onClick={() => {
					event(birdName, birdId);
				}}
			>
				+
			</button>
		</div>
	);
};

interface BirdsProps {
	ibirds: IBird[];
	event: (birdName: string, birdId: number) => void;
}

const Birds = ({ ibirds, event }: BirdsProps) => {
	const [birds, setBirds] = useState(ibirds);

	useEffect(() => {
		setBirds(ibirds);
		console.log('ibirds change');
	}, [ibirds]);

	const renderBirds = () => {
		return birds.map((bird, i) => {
			return (
				<Observation
					key={i}
					birdId={bird.id}
					birdName={bird.birdName}
					initialNumberOfObservations={bird.numberOfObservations}
					event={event}
				/>
			);
		});
	};

	return <div className="grid">{renderBirds()}</div>;
};

export default Birds;
