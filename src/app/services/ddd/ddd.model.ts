export interface DDDInterface {
	state: string;
	cities: string[];
}

export interface DDDError {
	name: string;
	message: string;
	type: string;
}

export const dddMockData: DDDInterface = {
	state: 'RJ',
	cities: [
		'TERESÓPOLIS',
		'TANGUÁ',
		'SEROPÉDICA',
		'SÃO JOÃO DE MERITI',
		'SÃO GONÇALO',
	],
};

export const dddMockError: DDDError = {
	name: 'ServiceError',
	message: 'DDD não encontrado',
	type: 'ddd_error',
};
