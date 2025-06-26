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

export const cepMockData: LocationCep = {
		cep: '32676048',
		state: 'MG',
		city: 'Betim',
		neighborhood: 'Amarante',
		street: 'Rua Padre Toledo',
		service: 'open-cep',
		location: {
			coordinates: {
				longitude: '-44.1388393',
				latitude: '-19.9468875',
			},
		},
	};

	export const	cepMockError: LocationError = {
		name: 'ServiceError',
		message: 'CEP não encontrado',
		type: 'service',
		errors: [],
	};

	export const cepMockError2 = {
			status: 404,
			statusText: 'Not Found',
			error: {
				type: 'cep_not_found',
				errors: [
					{
						name: 'ServiceError',
						message: 'CEP não encontrado',
						service: 'brasilapi',
					},
				],
			},
		};