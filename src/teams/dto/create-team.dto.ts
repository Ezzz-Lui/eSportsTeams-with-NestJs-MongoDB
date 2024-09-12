import { IsInt, IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateTeamDto {

    @IsInt()
    @IsPositive()
    @Min(1)
    idTeam: number;

    @IsString()
    @MinLength(1)
    name:string;

}
