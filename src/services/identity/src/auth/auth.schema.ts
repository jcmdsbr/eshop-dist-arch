import { SchemaFactory } from '@nestjs/mongoose';
import User from './models/user.model';
export const UserSchema = SchemaFactory.createForClass(User);
