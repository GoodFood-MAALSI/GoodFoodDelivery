import { PartialType } from '@nestjs/mapped-types';
import { CreateTransportModeDto } from './create-transport-mode.dto';

export class UpdateTransportModeDto extends PartialType(CreateTransportModeDto) {}
