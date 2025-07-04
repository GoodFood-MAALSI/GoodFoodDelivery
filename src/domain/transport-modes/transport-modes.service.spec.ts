import { Test, TestingModule } from '@nestjs/testing';
import { TransportModesService } from './transport-modes.service';

describe('TransportModesService', () => {
  let service: TransportModesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransportModesService],
    }).compile();

    service = module.get<TransportModesService>(TransportModesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
