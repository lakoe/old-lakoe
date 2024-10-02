import { Test, TestingModule } from '@nestjs/testing';
import { FormProdukController } from './form-produk.controller';
import { FormProdukService } from './form-produk.service';

describe('FormProdukController', () => {
  let controller: FormProdukController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormProdukController],
      providers: [FormProdukService],
    }).compile();

    controller = module.get<FormProdukController>(FormProdukController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
