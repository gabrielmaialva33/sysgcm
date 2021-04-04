import { container } from 'tsyringe'

import {
  IGcmsRepository,
  IEscalaRepository,
  IDadosPessoaisRepository,
} from 'App/Modules/Gcm/Interfaces'

import {
  DadosPessoaisRepository,
  EscalaRepository,
  GcmsRepository,
} from 'App/Modules/Gcm/Repositories'

import {
  IEstadosRepository,
  IBairrosRepository,
  IMunicipiosRepository,
  IEnderecosRepository,
} from 'App/Modules/Endereco/Interfaces'
import {
  EstadosRepository,
  MunicipiosRepository,
  BairrosRepository,
  EnderecosRepository,
} from 'App/Modules/Endereco/Repositories'

import {
  IUsersRepository,
  IKeycodesRepository,
  IRolesRepository,
} from 'App/Modules/User/Interfaces'
import { UsersRepository, RolesRepository, KeycodesRepository } from 'App/Modules/User/Repositories'

/* -------------------------------- Singleton --------------------------------*/

// -> user
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton<IKeycodesRepository>('KeycodesRepository', KeycodesRepository)
container.registerSingleton<IRolesRepository>('RolesRepository', RolesRepository)

// -> gcm
container.registerSingleton<IDadosPessoaisRepository>(
  'DadosPessoaisRepository',
  DadosPessoaisRepository
)
container.registerSingleton<IEscalaRepository>('EscalaRepository', EscalaRepository)
container.registerSingleton<IGcmsRepository>('GcmsRepository', GcmsRepository)

// -> endereco
container.registerSingleton<IEstadosRepository>('EstadosRepository', EstadosRepository)
container.registerSingleton<IMunicipiosRepository>('MunicipiosRepository', MunicipiosRepository)
container.registerSingleton<IBairrosRepository>('BairrosRepository', BairrosRepository)
container.registerSingleton<IEnderecosRepository>('EnderecosRepository', EnderecosRepository)
