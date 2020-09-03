import { Controller, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO, SearchDTO, StatusDto } from './dto/product.dto'
import { ApiTags } from '@nestjs/swagger';

@ApiTags('商品管理')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post('list')
    productLists(@Body() body: ProductDTO) {
        return this.productService.productList(body)
    }
    @Post('search')
    searchProduct(@Body() body: SearchDTO) {
        return this.productService.productSearch(body)
    }
    @Post('status')
    productStatus(@Body() body: StatusDto) {
        return this.productService.productStatus(body)
    }
}
