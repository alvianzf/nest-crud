import { PartialType } from '@nestjs/mapped-types';
import {CreatePic} from './create-pic.dto';

export class UpdatePic extends PartialType(CreatePic) {}
