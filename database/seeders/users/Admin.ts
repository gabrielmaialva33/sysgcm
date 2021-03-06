import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Bairro from 'App/Modules/Endereco/Models/Bairro'
import Municipio from 'App/Modules/Endereco/Models/Municipio'
import DadosPessoais from 'App/Modules/Gcm/Models/DadosPessoais'
import User from 'App/Modules/User/Models/User'
import Endereco from 'App/Modules/Endereco/Models/Enderecos'
import Gcm from 'App/Modules/Gcm/Models/Gcm'
import Role from 'App/Modules/User/Models/Role'
import {
  atribuicao,
  cutis,
  escolaridade,
  estado_civil,
  sexo,
  tipo_cnh,
  tipo_sanguineo,
} from 'App/Modules/Gcm/Models/types/EnumTypes'
import { DateTime } from 'luxon'

export default class AdminSeeder extends BaseSeeder {
  public async run() {
    const endereco = await Endereco.create({
      logradouro: 'Rua João Prado Margarido',
      numero: '249',
      complemento: '',
      cep: '18460000',
      bairro_id: await Bairro.findBy('codigo_bairro', '1-02').then((bairro) => {
        return bairro?.id
      }),
    })

    const dados_pessoais = await DadosPessoais.create({
      nome: 'Sebastião Ademar Gonçalves',
      rg: '377953611',
      cpf: '72042940682',
      data_nascimento: DateTime.fromISO('1971-08-13'),
      nome_mae: 'José Gonçalves Rosa',
      nome_pai: 'Sebastiana Rosa dos Santos',
      telefone: ['15996962874', '1535314445'],
      municipio_nascimento_id: await Municipio.findBy('codigo_ibge', '3113503').then(
        (municipio) => {
          return municipio?.id
        }
      ),
      sexo: sexo.MASCULINO,
      cutis: cutis.BRANCO,
      tipo_sanguineo: tipo_sanguineo['O+'],
      estado_civil: estado_civil.CASADO,
      profissao: ['Guarda Civil Municipal'],
      escolaridade: escolaridade['FUNDAMENTAL-COMPLETO'],
      nome_conjuge: 'Gonçalves',
      nome_filhos: ['Vitoria Caroline Gonçalves', 'Julia Gonçalves'],
      titulo_eleitor: '101811660272',
      zona_eleitoral: '057',
      cnh: '02737170006',
      tipo_cnh: tipo_cnh.C,
      validade_cnh: DateTime.fromISO('2020-07-21'),
      observacao: 'Esse é o ADMIN',
    })

    const gcm = await Gcm.create({
      nome_guerra: 'Gonsalves',
      dados_pessoais_id: dados_pessoais.id,
      endereco_id: endereco.id,
      atribuicao: atribuicao['SUB-COMANDANTE'],
    })

    const user = await User.create({
      nome_usuario: 'gonsalves',
      email: 'gonsalves@gmail.com',
      password: '123456',
      gcm_id: gcm.id,
      role_id: await Role.findBy('role', 'admin').then((role) => {
        return role?.id
      }),
    })

    await user.related('roles').attach([user.role_id])
  }
}
