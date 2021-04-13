import { IBird, IObservation } from '../interfaces/interfaces';

const api = '/api/';

export function getBirds(): Promise<IBird[]> {
	return fetch(api + 'birds').then((response) => handleResponse(response));
}

export function addNewObservation(birdId: number): Promise<IObservation> {
	return fetch(api + `birds/${birdId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((response) => handleResponse(response));
}

export function addNewBird(birdName: string): Promise<IBird> {
	var data = {
		birdName: birdName,
	};

	return fetch(api + 'birds', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then((response) => handleResponse(response));
}

function handleResponse(response: Response) {
	if (response.ok) {
		return response.json();
	} else {
		return response.text().then((text: string) => {
			throw new Error(text);
		});
	}
}
