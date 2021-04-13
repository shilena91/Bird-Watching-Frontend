export interface IObservation {
	id: number;
	birdName: string;
	createdAt: string;
}

export interface IBird {
	id: number;
	birdName: string;
	numberOfObservations: number;
	observations: IObservation[];
}