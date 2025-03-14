import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RecipeService {
  async getRecipes(filteredBy: {
    ingredient?: string;
    country?: string;
    category?: string;
  }) {
    try {
      let url = `${process.env.apiUrl}/search.php?s=`;

      if (filteredBy.ingredient) {
        url = `${process.env.apiUrl}/filter.php?i=${filteredBy.ingredient}`;
      } else if (filteredBy.country) {
        url = `${process.env.apiUrl}/filter.php?a=${filteredBy.country}`;
      } else if (filteredBy.category) {
        url = `${process.env.apiUrl}/filter.php?c=${filteredBy.category}`;
      }

      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getRecipe(id: string) {
    try {
      const url = `${process.env.apiUrl}/lookup.php?i=${id}`;
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
