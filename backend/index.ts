import express from 'express'
import bodyParser from 'body-parser'
import { Request, Response } from 'express'

import Users from './data/users.json'
import Groups from './data/groups.json'
import Components from './data/components.json'
import Contents from './data/content.json'
import { getFilteredContents, getFilteredGroups } from './function/filters'

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

	const result = getFilteredGroups(apelido, turma, Groups)

	return res.json(result)
})


app.get('/disciplinas', jsonParser, (req: Request, res: Response) => {
	const apelido = req.headers.apelido

	const associateComponents = Components.find(component => component.apelido === apelido)
	return res.json(associateComponents?.disciplinas)
})

app.get('/materiaLecionada', jsonParser, (req: Request, res: Response) => {
	const apelido = req.headers.apelido
	const turmasFilter = req.query.idTurma?.toString().split(',')
	const disciplinasFilter = req.query.disciplina?.toString().split(',')
	const associateContent = Contents.find(content => content.apelido === apelido)

	const result = getFilteredContents(turmasFilter, disciplinasFilter, associateContent)

	return res.json(result)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
