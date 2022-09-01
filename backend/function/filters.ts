import { AssociateContents, Group } from "../interface"

export function getFilteredGroups(
    apelido: string | string[] | undefined, 
    turma: string | string[] | undefined, 
    Groups: Group[] ) {
	const associateGroups = turma 
	?	Groups.filter(
        group => (
            group.colaboradores.find((colaborador: { apelido: string | string[] }) => colaborador.apelido === apelido) 
            && group.id === turma
            )
        )
	: Groups.filter(
        group => (
            group.colaboradores.find((colaborador: { apelido: string | string[] }) => colaborador.apelido === apelido) 
            )
        )

	return associateGroups
}

export function getFilteredContents(
    turmasFilter: string[] | undefined, 
    disciplinasFilter: string[] | undefined, 
    associateContent: AssociateContents | undefined ) {
    
    const contentByGroup = turmasFilter?.flatMap(turma => {
		return 	associateContent?.materia.filter(materia => materia.idTurma === turma)
	})

	const contentByComponent = disciplinasFilter?.flatMap(disciplina => {
		return 	associateContent?.materia.filter(materia => materia.disciplina === disciplina)
	})

	const contentByBoth = turmasFilter?.flatMap(turma => {
		return disciplinasFilter?.flatMap(disciplina => {
			return associateContent?.materia.filter(materia => materia.disciplina === disciplina && materia.idTurma === turma)
		})
	})

	const turmasBool = turmasFilter  ? true : false
	const disciplinasBool = disciplinasFilter  ? true : false

	if (turmasBool && disciplinasBool) {
		const allFilters = contentByBoth
		return allFilters

	} else if (turmasBool) {
		const allFilters = contentByGroup
		return allFilters

	} else if (disciplinasBool) {
		const allFilters = contentByComponent
		return allFilters

	} else {
		const allFilters = associateContent
		return allFilters

	}
}