import { DetailProductDefinitionRequestDTO, FindProductRequestDTO, UtilityImplement } from '@libs/utility';
import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindProductDefinitions } from '../application/query/product-definition/find';
import { GetAvaiableProductDefinitions } from '../application/query/product-definition/get-with-avaiable';
import { DetailProductDefinition } from '../application/query/product-definition/detail';
import { FindProductIsSold } from '../application/query/product/find';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(`product-definition`)
@Controller(`product-definition`)
export class ProductDefinationQueryController {
  constructor(readonly queryBus: QueryBus, private readonly util: UtilityImplement) {}

  @Get(`health_check`)
  async health_check() {
    return `ok`;
  }

  @Get(`get-all`)
  async FindProductDefinitions(@Query() query: FindProductRequestDTO) {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };

    const product_definition = new FindProductDefinitions(msg);
    return await this.queryBus.execute(product_definition);
  }

  @Get(`get-by-id`)
  async DetailProductDefinition(@Query() query: DetailProductDefinitionRequestDTO) {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };

    const product_definition = new DetailProductDefinition(msg);
    return await this.queryBus.execute(product_definition);
  }

  @Get(`get-avaiable`)
  async GetAvaiableProductDefinitions(@Query() query: FindProductRequestDTO) {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };

    const product_definition = new GetAvaiableProductDefinitions(msg);
    return await this.queryBus.execute(product_definition);
  }
}

@ApiTags(`product`)
@Controller(`product`)
export class ProductQueryController {
  constructor(readonly queryBus: QueryBus, private readonly util: UtilityImplement) {}

  @Get(`health_check`)
  async health_check() {
    return `ok`;
  }

  @Get(`get-product-is-sold`)
  async FindProductIsSold(@Query() query: FindProductRequestDTO) {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };

    const product_definition = new FindProductIsSold(msg);
    return await this.queryBus.execute(product_definition);
  }
}
