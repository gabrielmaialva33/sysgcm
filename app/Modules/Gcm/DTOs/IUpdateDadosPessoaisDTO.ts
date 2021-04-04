import { DateTime } from 'luxon'
import {
  cutis,
  escolaridade,
  estado_civil,
  sexo,
  tipo_cnh,
  tipo_sanguineo,
} from 'App/Modules/Gcm/Models/types/EnumTypes'

export interface IUpdateDadosPessoaisDTO {
  dados_pessoais_id: string
  nome?: string
  rg?: string
  cpf?: string
  data_nascimento?: DateTime
  nome_mae?: string
  nome_pai?: string
  telefone?: string[]
  municipio_nascimento_id?: string
  sexo?: sexo
  cutis?: cutis
  tipo_sanguineo?: tipo_sanguineo
  estado_civil?: estado_civil
  profissao?: string[]
  escolaridade?: escolaridade
  nome_conjuge?: string
  nome_filhos?: string[]
  titulo_eleitor?: string
  zona_eleitoral?: string
  cnh?: string
  tipo_cnh?: tipo_cnh
  validade_cnh?: DateTime
  observacao?: string
}
