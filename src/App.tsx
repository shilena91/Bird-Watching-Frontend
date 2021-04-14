import { useState, useEffect, useCallback } from 'react';
import './styles/App.css';
import Birds from './components/Birds';
import Report from './components/Report';
import PopupForm from './components/PopupForm';
import * as networkService from './Network/NetworkService';
import { IObservation, IBird } from './interfaces/interfaces';

function App() {
	const [birds, setBirds] = useState<IBird[]>([]);
	const [error, setError] = useState<Error | null>(null);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [buttonPopup, setButtonPopup] = useState<boolean>(false);

	useEffect(() => {
		networkService.getBirds().then(
			(data: IBird[]) => {
				setIsLoaded(true);
				setBirds(data);
			},
			(error: Error) => {
				setIsLoaded(true);
				setError(error);
			}
		);
	}, []);

	// Use useCallback to keep the same function object as long as "birds" is not changed
	const addNewObservation = useCallback(
		(birdName: string, birdId: number) => {
			if (
				window.confirm(
					`Are you sure you saw a ${birdName} and want to report it?`
				)
			) {
				networkService.addNewObservation(birdId).then(
					(data: IObservation) => {
						var bird: IBird = birds.find((b) => b.id === birdId)!;
						bird.observations.push(data);
						bird.numberOfObservations += 1;
						setBirds([...birds]);
					},
					(error: Error) => {
						alert(error);
					}
				);
			}
		},
		[birds]
	);

	// called when user submit new bird
	const handleAddSubmit = (newBirdName: string): void => {
		networkService.addNewBird(newBirdName).then(
			(data: IBird) => {
				setBirds([...birds, data]);
			},
			(error: Error) => {
				alert(error);
			}
		);
	};

	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		return (
			<div>
				<Birds birdsProp={birds} event={addNewObservation} />
				<Report birdsProp={birds} />

				<button
					className="form-open-button"
					onClick={() => setButtonPopup(true)}
				>
					Add New Bird
				</button>

				<PopupForm
					trigger={buttonPopup}
					setTrigger={setButtonPopup}
					event={handleAddSubmit}
				></PopupForm>
			</div>
		);
	}
}

export default App;
