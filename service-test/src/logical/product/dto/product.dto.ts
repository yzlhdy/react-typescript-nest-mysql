import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ProductDTO {
    @ApiProperty()
    @IsNotEmpty({ message: '分页数不能为空' })
    readonly pageSize: number;
    @ApiProperty()
    @IsNotEmpty({ message: '分页数不能为空' })
    readonly pageIndex: number;
}
export class SearchDTO {
    @ApiProperty()
    @IsNotEmpty({ message: '输入搜索条件' })
    readonly productType: string;
    @ApiProperty()
    @IsNotEmpty({ message: '输入搜索条件' })
    readonly keywords: string;
    @ApiProperty()
    @IsNotEmpty({ message: '分页数不能为空' })
    readonly pageSize: number;
    @ApiProperty()
    @IsNotEmpty({ message: '分页数不能为空' })
    readonly pageIndex: number;
}