import React, { useState, useEffect } from 'react';
import { IBird, IObservation } from '../interfaces/interfaces';

interface ReportProps {
	birdsProp: IBird[];
}

const Report = ({ birdsProp }: ReportProps) => {
	const [birds, setBirds] = useState<IBird[]>(birdsProp);

	useEffect(() => {
		setBirds(birdsProp);
	}, [birdsProp]);

	var allObservations: IObservation[] = [];

	birds.forEach((b) => {
		b.observations.forEach((o) => {
			allObservations.push(o);
		});
	});

	if (allObservations.length === 0) {
		return (
			<div className="sideBar">
				It seems no one in your office has seen any bird :D.
			</div>
		);
	}

	allObservations.sort((first, second) => {
		return first.createdAt.localeCompare(second.createdAt);
	});

	const rows = () => {
		return allObservations.map((observation, i) => {
			return (
				<ul key={observation.id}>
					<li key={i}>
						<p>
							{observation.createdAt} - {observation.birdName}
						</p>
					</li>
				</ul>
			);
		});
	};

	return <div className="sideBar">{rows()}</div>;
};

export default Report;
