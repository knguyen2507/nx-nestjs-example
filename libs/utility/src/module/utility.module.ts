import { Injectable, Module } from '@nestjs/common';
import moment = require('moment');
import { PIC } from '../interface';
import { PostgreSQLModule, writeConnection } from '@libs/postgres';
import { ObjectId } from 'bson';

@Injectable()
export class UtilityImplement {
  randomPhone(): string {
    const charset = '0123456789';
    let [res, len] = ['09', 8];
    while (len--) res += charset[Math.floor(Math.random() * charset.length)];
    return res;
  }

  async createInitialData(Entity: any, InitialData: any[]): Promise<void> {
    const batchSize = 5000;
    const totalSize = InitialData.length;
    let currentSize = 0;
    let data = [];
    for (let i = 0; i < totalSize; i++) {
      if (currentSize >= batchSize) {
        currentSize = 1;
        await this.createData(Entity, data);
        data = [InitialData[i]];
      } else {
        currentSize += 1;
        data.push(InitialData[i]);
      }
    }

    if (data.length > 0) await this.createData(Entity, data);
    console.log(`Initial ${Entity.name}`);
  }

  async createData(Entity: any, data: any[]): Promise<void> {
    writeConnection.manager.getRepository(Entity).save(
      data.map((item) => {
        return {
          ...item,
          created_at: {
            id: 0,
            username: 'initial',
            at: moment().toDate(),
          } as unknown as PIC,
          updated_at: [],
        };
      }),
    );
  }

  generateId() {
    return new ObjectId().toString();
  }
}
@Module({
  imports: [PostgreSQLModule],
  controllers: [],
  providers: [UtilityImplement],
  exports: [UtilityImplement],
})
export class UtilityModule {}
