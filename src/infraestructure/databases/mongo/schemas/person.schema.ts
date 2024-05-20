import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema({
  collection: 'person',
})
export class PersonEntity {
  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  email: string;
}

export type PersonDocument = PersonEntity & Document;
export const PersonSchema = SchemaFactory.createForClass(PersonEntity);
export type PersonModel = Model<PersonDocument>;
