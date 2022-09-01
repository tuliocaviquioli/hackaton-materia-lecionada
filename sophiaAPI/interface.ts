
export interface SophiaOptions {
    tenant?: string
    url?: string
    user: string
    password: string
    activeSeason: string
  }
  
  export interface SophiaGroup {
    codigo: number
    nome: string
    nomeResumido: string
    situacao: number
    sala: string
    colaborador: {
      codigo: number
      nome: string
    }
    curso: {
      codigo: number
      descricao: string
      tipoCurso: string
    }
    turnos: [
      {
        codigo: number
        descricao: string
      }
    ]
    periodoLetivo: {
      codigo: number
      descricao: string
    }
    unidade: {
      codigo: number
      descricao: string
    }
    professoresDisciplinas: [
      {
        disciplina: {
          codigo: number
          codigoSetor: number
          nome: string
        }
        colaboradores: [
          {
            codigo: number
            nome: string
          }
        ]
        colaboradoresAuxiliares: [
          {
            codigo: number
            nome: string
          }
        ]
      }
    ]
  }
  
  export interface populatedGroup extends SophiaGroup {
    students: SophiaStudent[],
  }
  
  export interface SophiaGuardian {
    codigo: number;
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    tipoVinculo: {
      codigo: number;
      descricao: string;
      tipoParentesco: number;
    } | null;
    responsavelFinanceiro: boolean;
    responsavelPedagogico: boolean;
    retiradaAutorizada: boolean;
  }
  
  export interface SophiaStudent {
    codigo: number
    codigoExterno: string
    nome: string
    email: string
    contaOffice365: string
    telefone: string
    sexo: string
    dataNascimento: string
    turmas: {
      codigo: number
      descricao: string
    }[]
  }
  
  export interface SophiaSeason {
    codigo: number
    nome: string,
    inicio: string | null
    termino: string | null
  }
  
  export interface SophiaAssociate {
    codigo: number
    nome: string
    apelido: string
    email: string | null
    contaOffice365: string
    dataNascimento: string
    sexo: 'M' | 'F'
    leciona: boolean,
    codigoExterno: string
  }
  
  export interface SophiaComponent {
    codigo: number
    codigoSetor: string | null
    nome: string
  }
  
  export interface Metadata {
    user: string
    password: string
    createStudentAccounts: boolean
    createAssociateAccounts: boolean
    tenant: string
    url: string
    unity?: string
  }
  
  export type SophiaUserType = 'SophiaGuardian' | 'SophiaStudent' | 'SophiaAssociate'
  
  export type SophiaUser<T extends SophiaUserType> = T extends 'SophiaGuardian' ?
   SophiaGuardian
   : T extends 'SophiaAssociate'
   ? SophiaAssociate
   : T extends 'SophiaStudent'
   ? SophiaStudent : never
  
  
  export interface SophiaStudentEnrollment {
    codigoAluno: number,
    matriculas: Enrollments[]
    }
  
  export interface Enrollments {
      codigoMatricula: number,
      turma: number,
      nomeTurma: string,
      situacao: string,
    }
  
  
  export interface SophiaPayable {
    codigo: number,
    numeroLancamento: number,
    dataPagamento: string,
    dataVencimento: string,
    descricao: string,
    responsavelFinanceiro: string,
    recebido: number,
    boletoDisponivel: boolean,
    codigoBoleto: number,
    numeroBoleto: number,
    linhaDigitavel: string,
    valorRecebido: number,
    valorPrevisto: number,
    urlEducbank: string
  }
  
  export interface SophiaMedicalRecord {
    tipoSanguineo: string,
    nomeResponsavel: string,
    tratamentoMedico: string,
    medicacao: number,
    fonoaudiologico: boolean,
    psicologico: boolean,
    psicopedagogico: boolean,
    terapiaOcupacional: boolean,
    outroAcompanhamento: boolean,
    acompanhamento: string,
    fazUsoMedicamento: boolean,
    medicamento: string,
    alergicoMedicamento: boolean,
    medicamentoAlergico: string,
    possuiOutrasAlergias: boolean,
    outrasAlergias: string,
    catapora: boolean,
    caxumba: boolean,
    coqueluxe: boolean,
    escarlatina: boolean,
    hepatite: boolean,
    meningite: boolean,
    rubeola: boolean,
    sarampo: boolean,
    outraDoencaContagiosa: boolean,
    doencaContagiosa: string,
    asma: boolean,
    bronquite: boolean,
    diabete: boolean,
    epilepsia: boolean,
    hemofilia: boolean,
    hipertensao: boolean,
    reumatismo: boolean,
    rinite: boolean,
    doencaCeliaca: boolean,
    dependenciaInsulina: boolean,
    outraDoencaCronica: boolean,
    doencaCronica: string,
    dataInicioDoencaCronica: string,
    necessidadeAuditiva: boolean,
    necessidadeFala: boolean,
    necessidadeFisica: boolean,
    necessidadeVisual: boolean,
    outraNecessidade: boolean,
    necessidadeEspecial: string,
    possivelCuidado: string,
    possuiDoencaCongenita: boolean,
    doencaCongenita: string,
    restricaoAlimentar: string,
    medicamentoFebre: string,
    doseMedicamentoFebre: string,
    medicamentoDorCabeca: string,
    doseMedicamentoDorCabeca: string,
    planoSaude: string,
    numeroPlanoSaude: string,
    registroSus: string,
    nomeHospitalClinica: string,
    telefoneHospitalClinica: string,
    enderecoHospitalClinica: string,
    nomeMedicoContatar: string,
    enderecoMedicoContatar: string,
    contatosMedicoContatar: {
      tipoContato: number,
      contato: string
    }[],
    parentesContatar: {
      nome: string,
      parentesco: {
        codigo: number,
        descricao: string | null,
        tipoParentesco: number
      },
      rg: string,
      contatos: [
        {
          tipoContato: number,
          contato: string
        }
      ]
    }[],
    covid19GrupoRisco: boolean,
    covid19Teve: boolean,
    covid19Vacinado: boolean,
    covid19Observacoes: string
  }
  
  export type SophiaMethod = 'Payables' | 'MedicalRecords'
  
  export type SophiaData<T extends SophiaMethod> = T extends 'Payables' ?
    SophiaPayable[] : T extends 'MedicalRecords' ?
    SophiaMedicalRecord[] :
    never
  
  export type SophiaResult<T extends SophiaMethod> = T extends 'Payables' ?
    SophiaPayable[] : T extends 'MedicalRecords' ?
    SophiaMedicalRecord[] :
    never
  
  
  export interface SophiaGrades {
      nomeAluno: string,
      nomeCurso: string,
      nomeTurma: string,
      nomeUnidade: string,
      nomeTurno: string,
      numeroChamada: number,
      avaliacoes: Avaliacoes[],
    }
  
  export interface Avaliacoes {
      nomeAvaliacao? : string,
      notaAvaliacao?: string,
      nomeTurma? : string,
      nomeDisciplina?: string,
      peso? : number,
      rec? : boolean,
      global? : boolean,
      disciplinas? : Disciplinas,
      etapas? : Etapa,
    }
  
    interface Disciplinas {
      codigoDisciplina : string,
      nomeDisciplina : string,
      setores : string[]
    }
  
    interface Etapa {
      numeroEtapa: number,
      nomeEtapa: string,
    }
  
  export interface SophiaAcademicRecord {
      codigoExternoDisciplina?: string | null,
      disciplina?: string | null,
      professor?: string | null,
      ocorrencia: string,
      observacao: string,
      dataOcorrencia: string,
      interna: boolean,
    }
  