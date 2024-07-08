import { Injectable } from '@nestjs/common';
import { readConnection } from '@libs/postgres';
import { InitialUser, UtilityImplement } from '@libs/utility';
import User from 'libs/postgres/src/lib/entities/user.entity';

@Injectable()
export class SeedUserService {
  constructor(private readonly util: UtilityImplement) {}

  seed = async () => {
    const users = await readConnection.query('SELECT * FROM "user" LIMIT 1');
    if (users.length === 0) {
      await this.util.createInitialData(User, InitialUser);
    }
  };
}
