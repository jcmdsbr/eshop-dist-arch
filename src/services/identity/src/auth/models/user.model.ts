import { Document } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Schema()
class User extends Document {
  @Prop({ required: true })
  public email: string;

  @Prop({ required: true })
  private password: string;

  @Prop({ required: true })
  public createdAt: Date;

  static async Create(email: string, pass: string): Promise<any> {
    const saltOrRounds = 999; // NOT USE IN PROD
    const hash = await bcrypt.hash(pass, saltOrRounds);
    return {
      email: email,
      password: hash,
      createdAt: new Date(),
    };
  }

  async Compare(pass: string): Promise<boolean> {
    return await bcrypt.compare(pass, this.password);
  }
}
export default User;
