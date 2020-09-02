import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CategoryDTO {
    @ApiProperty()
    @IsNotEmpty({ message: '分页数不能为空' })
    readonly pageSize: number;
    @ApiProperty()
    @IsNotEmpty({ message: '分页数不能为空' })
    readonly pageIndex: number;
}

export class CreateDto {
    @ApiProperty()
    @IsNotEmpty({ message: '不能为空' })
    @IsString({ message: '必须为string 类型' })
    readonly name: string;
    @ApiProperty()
    @IsNotEmpty({ message: '不能为空' })
    @IsString({ message: '必须为string 类型' })
    readonly time: string;
}
export class UpdateDto {
    @ApiProperty()
    @IsNotEmpty({ message: '不能为空' })
    readonly id: number
    @ApiProperty()
    @IsNotEmpty({ message: '不能为空' })
    @IsString({ message: '必须为string 类型' })
    readonly name: string;
    @ApiProperty()
    @IsNotEmpty({ message: '不能为空' })
    @IsString({ message: '必须为string 类型' })
    readonly time: string;
}
export class DeleteDto {
    @ApiProperty()
    @IsNotEmpty({ message: '不能为空' })
    readonly id: number

}