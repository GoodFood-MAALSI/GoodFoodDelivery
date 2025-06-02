import { Test, TestingModule } from '@nestjs/testing';
import { TransportModesController } from './transport-modes.controller';
import { TransportModesService } from './transport-modes.service';

describe('TransportModesController', () => {
  let controller: TransportModesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransportModesController],
      providers: [TransportModesService],
    }).compile();

    controller = module.get<TransportModesController>(TransportModesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
