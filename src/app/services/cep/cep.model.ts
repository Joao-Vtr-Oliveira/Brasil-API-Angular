export interface LocationCep {
	cep: string;
	state: string;
	city: string;
	neighborhood: string;
	street: string;
	service: string;
	location: {
		coordinates: {
			longitude: string;
			latitude: string;
		};
	};
}

interface serviceError {
	name: string;
	message: string;
	service: string;
}

export interface LocationError {
	name: string;
	message: string;
	type: string;
	errors: serviceError[];
}
