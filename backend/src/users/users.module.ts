import { User } from './user.model';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, ObjectionModule.forFeature([User]), HttpModule],
  providers: [UsersService, ConfigService, UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
