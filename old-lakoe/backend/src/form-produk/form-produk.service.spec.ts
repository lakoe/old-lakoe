import { Test, TestingModule } from '@nestjs/testing';
import { FormProdukService } from './form-produk.service';

describe('FormProdukService', () => {
  let service: FormProdukService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormProdukService],
    }).compile();

    service = module.get<FormProdukService>(FormProdukService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
