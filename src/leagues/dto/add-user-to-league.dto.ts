import { ApiModelProperty } from '@nestjs/swagger';

export class AddUserToLeagueDto {
  @ApiModelProperty()
  readonly id: string;
}
