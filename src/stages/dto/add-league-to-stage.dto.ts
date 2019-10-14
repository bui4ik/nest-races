import { ApiModelProperty } from '@nestjs/swagger';

export class AddLeagueToStageDto {
  @ApiModelProperty()
  readonly id: string;
}
