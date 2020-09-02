import { Controller, Post, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';
import { CategoryDTO, CreateDto, UpdateDto, DeleteDto } from './dto/category.dto';


@ApiTags('品牌分类')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }


    @Post('list')
    findAllCategory(@Body() body: CategoryDTO) {
        return this.categoryService.findAllCategory(body)
    }

    @Post('create')
    createCategory(@Body() body: CreateDto) {
        return this.categoryService.createCategory(body)
    }
    @Post('update')
    updatedCategory(@Body() body: UpdateDto) {
        return this.categoryService.updatadCatagory(body)
    }
    @Post('delete')
    deleteCategory(@Body() body: DeleteDto) {
        return this.categoryService.deleteCategory(body)
    }
}
