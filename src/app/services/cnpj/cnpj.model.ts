interface QsaInterface {
	pais: string | null;
	nome_socio: string;
	faixa_etaria: string;
	qualificacao_socio: string;
	cpf_representante_legal: string | null;
}

interface CnaesInterface {
	codigo: number;
	descricao: string;
}

export interface CnpjError {
	name: string;
	message: string;
	type: string;
	errors: { message: string }[];
}

export interface CnpjInterface {
	uf: string;
	cep: number;
	qsa: QsaInterface[];
	pais: string | null;
	email: string | null;
	porte:
		| 'NÃO INFORMADO'
		| 'MICRO EMPRESA'
		| 'EMPRESA DE PEQUENO PORTE'
		| 'DEMAIS'
		| null;
	razao_social: string;
	nome_fantasia: string;
	bairro: string;
	numero: string;
	municipio: string;
	ddd_telefone_1: string;
	ddd_telefone_2: string | null;
	cnaes_secundarios: CnaesInterface[];
	natureza_juridica: string;
	data_inicio_atividade: string;
}

export const cnpjMockData: CnpjInterface = {
	uf: 'MG',
	cep: 32604155,
	pais: null,
	email: null,
	porte: 'DEMAIS',
	bairro: 'ANGOLA',
	numero: '1503',
	municipio: 'BETIM',
	razao_social: 'PPI INFORMATICA E PAPELARIA LTDA',
	nome_fantasia: 'PORT PAPELARIA',
	ddd_telefone_1: '3133495031',
	ddd_telefone_2: '3133495039',
	cnaes_secundarios: [
		{
			codigo: 4751201,
			descricao:
				'Comércio varejista especializado de equipamentos e suprimentos de informática',
		},
	],
	natureza_juridica: 'Sociedade Empresária Limitada',
	data_inicio_atividade: '2009-03-23',
	qsa: [],
};

export const cnpjMockError: CnpjError = {
	name: 'ServiceError',
	message: 'CNPJ não encontrado',
	type: 'service',
	errors: [
		{
			message: 'CNPJ não encontrado',
		},
	],
};

export const cnpjMockError2 = {
	status: 404,
	statusText: 'Not Found',
	error: {
		type: 'cnpj_not_found',
		errors: [
			{
				name: 'ServiceError',
				message: 'CNPJ não encontrado',
				service: 'brasilapi',
			},
		],
	},
};
