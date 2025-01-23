import { Field, InputType } from '@nestjs/graphql';
import { PositionInput } from 'src/positions/type/position.input';

@InputType()
export class FilterEventsData {
  @Field({ nullable: true })
  condition?: string;

  @Field({ nullable: true })
  date?: number;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  position?: PositionInput;
}
