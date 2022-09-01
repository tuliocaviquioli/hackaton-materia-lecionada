import * as dotenv from 'dotenv'
dotenv.config()

interface Config {
  slu: {
    slu_secret: string
    slu_url: string
    slu_port: string
  }
  sophia: {
    url: string
  }

}
const config: Config = {
  slu: {
    slu_secret: process.env.SLU_SECRET ?? '',
    slu_url: process.env.SLU_URL ?? '',
    slu_port: process.env.SLU_PORT ?? ''
  },
  sophia: {
    url: process.env.SOPHIA_URL ?? ''
  },
}
export default config
