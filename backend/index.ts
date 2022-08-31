import express from 'express'
import bodyParser from 'body-parser'
import { Request, Response } from 'express'

import Users from './data/users.json'
import Groups from './data/groups.json'
import Components from './data/components.json'
import Contents from './data/contentStaging.json'

const jsonParser = bodyParser.json()

const app = express()
const port = process.env.PORT || 3000

app.get('/professores', jsonParser, (req: Request, res: Response) => {
	const apelido = req.headers.apelido

	const associates = Users.filter(user => user.apelido === apelido)
	return res.json(associates)
})

app.get('/turmas', jsonParser, (req: Request, res: Response) => {
	const apelido = req.headers.apelido
	const turma = req.headers.turma

	console.log('Requisição chegou')
	
	const associateGroups = turma 
	?	Groups.filter(group => (group.colaboradores.find(colaborador => colaborador.apelido === apelido) && group.id === turma ))
	: Groups.filter(group => (group.colaboradores.find(colaborador => colaborador.apelido === apelido) ))

	return res.json(associateGroups)
})

app.get('/disciplinas', jsonParser, (req: Request, res: Response) => {
	const apelido = req.headers.apelido

	const associateComponents = Components.find(component => component.apelido === apelido)
	return res.json(associateComponents?.disciplinas)
})

app.get('/materiaLecionada', jsonParser, (req: Request, res: Response) => {
	const apelido = req.headers.apelido
	const turma = req.headers.turma
	const disciplina = req.headers.disciplina


	const associateContents = Contents.find(content => content.apelido === apelido)
	return res.json(associateContents?.materia)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})



