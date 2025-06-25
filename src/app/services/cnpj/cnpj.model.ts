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
