export interface AssociateContents {
    apelido: string
    materia: Materia[]
}

export interface Materia {
    idMateria: string
    turma: string
    idTurma: string
    disciplina: string
    idAula: string
    data: string
    materiaLecionada: boolean
    conteudo: string
}

export interface Group {
    nome: string
    id: string
    colaboradores: Colaboradores[]
}

interface Colaboradores {
    apelido: string
    disciplina: string
}

