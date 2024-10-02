import { PartialType } from '@nestjs/mapped-types';
import { CreateFormProdukDto } from './create-form-produk.dto';

export class UpdateFormProdukDto extends PartialType(CreateFormProdukDto) {}
