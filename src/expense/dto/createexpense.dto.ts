import { IsNumber, IsString } from "class-validator"

export class CreateExpenseDTO {
    @IsString()
    description : string
    @IsNumber()
    price : number
    @IsString()
    category : string
}