import { ApiModelProperty } from '@nestjs/swagger';

export class CreateRaceDto {
  @ApiModelProperty()
  readonly title: string;
  @ApiModelProperty()
  readonly time: number;
  @ApiModelProperty()
  readonly description: string;
  @ApiModelProperty()
  readonly userId: string;
  @ApiModelProperty()
  readonly stageId: string;
}
