import {
  Controller,
  Get,
  Query,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';

@Controller('api/recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  async getRecipes(
    @Query()
    filteredBy: {
      ingredient?: string;
      country?: string;
      category?: string;
    },
  ) {
    try {
      return this.recipeService.getRecipes(filteredBy);
    } catch (error) {
      throw new InternalServerErrorException('Recipes not found', {
        cause: error,
        description: error.message,
      });
    }
  }

  @Get(':id')
  async getRecipe(@Param('id') id: string) {
    try {
      return this.recipeService.getRecipe(id);
    } catch (error) {
      throw new InternalServerErrorException('Recipe not found', {
        cause: error,
        description: error.message,
      });
    }
  }
}
