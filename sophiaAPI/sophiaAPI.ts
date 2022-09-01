import axios, { AxiosInstance } from 'axios'
import config from '../config'
import {
  SophiaAssociate,
  SophiaSeason,
  SophiaStudent,
  SophiaGroup,
  SophiaComponent,
  Metadata } from './interface'
import _ from 'lodash'
import AES from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8'

export default class SophiaAPI {
  private sophia: AxiosInstance
  private token: string
  private seasonCode: string
  private metadata: Metadata
  // private tenant: string
  public endpoint: string
  
  private constructor(token: string, seasonCode: string, metadata: Metadata) {
    const domain = metadata.url || `${config.sophia.url}/${metadata.tenant}`
    const baseURL = domain + '/api/v1'
    this.metadata = metadata
    this.token = token
    this.seasonCode = seasonCode
    this.endpoint = domain
    this.sophia = axios.create({
      baseURL: baseURL,
      headers: {
        token: this.token,
      },
    })
  }

  // asynchronous sophiaAPI configs
  static async init(metadata: Metadata, activeSeason: string) {
    const { tenant, user, password, url } = metadata
    const decryptedPassword = AES.decrypt(password, config.slu.slu_secret).toString(Utf8)
    const credentials = {
      usuario: user,
      senha: decryptedPassword,
    }

    const authEndpoint = 'api/v1/Autenticacao'
    const authUrl = url ? `${url}/${authEndpoint}` : `${config.sophia.url}/${tenant}/${authEndpoint}`

    const { data: token } = await axios.post(
      authUrl,
        credentials
    )

    const seasonsEndpoint = 'api/v1/Periodos'
    const seasonsUrl = url ? `${url}/${seasonsEndpoint}` : `${config.sophia.url}/${tenant}/${seasonsEndpoint}`

    const { data: sophiaSeasons } = await axios.get(seasonsUrl, { headers: { token } }
    )

    const activeSophiaSeason = _.find(
        sophiaSeasons, (sophiaSeason: SophiaSeason) => {
          return sophiaSeason.nome === activeSeason
        }
    )

    return new SophiaAPI(token, activeSophiaSeason.codigo, metadata)
  }

  get getToken() {
    return this.token
  }

  // get getTenant() {
  //   return this.tenant
  // }

  async getAllStudents(): Promise<SophiaStudent[]> {
    const { data: students } = await this.sophia.get(
        '/Alunos', { params: { Periodos: this.seasonCode, Unidades: this.metadata.unity } }
    )
    return students
  }

  async getAllAssociates(): Promise<SophiaAssociate[]> {
    const { data: associates } = await this.sophia.get('/Colaboradores', { params: { Unidades: this.metadata.unity } })
    return associates
  }

  async getAllGroups(): Promise<SophiaGroup[]> {
    const { data: groups } = await this.sophia.get('/Turmas', { params: { Unidades: this.metadata.unity } })
    return groups
  }

  async getAllComponents(componentsCodes: string): Promise<SophiaComponent[]> {
    const { data: groups } = await this.sophia.get('/disciplinas', { params: { Codigos: componentsCodes } })
    return groups
  }

  async getSeasons():
  Promise<SophiaSeason[]> {
    const { data: seasons } = await this.sophia.get(
        '/Periodos'
    )
    return seasons
  }



}
