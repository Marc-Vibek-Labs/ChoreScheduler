import { Knex } from 'knex'
import { Module } from '@nestjs/common'
import { ObjectionModule } from '@willsoto/nestjs-objection'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ObjectionModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          config: {
            ...config.get<Knex.Config>('database')
          }
        }
      }
    })
  ],
  exports: [ObjectionModule]
})
export class DatabaseModule {}
