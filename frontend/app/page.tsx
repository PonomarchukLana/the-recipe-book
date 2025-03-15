"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FilteredRecipe, Recipe } from "../types/recipe";
import { useSearchParams } from "next/navigation";

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState<FilteredRecipe[] | Recipe[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const { ingredient, country, category } = Object.fromEntries(searchParams);
    let apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/recipes";

    if (ingredient) {
      setFilter(`Ingredient: ${ingredient}`);
      apiUrl = `${apiUrl}?ingredient=${ingredient}`;
    } else if (country) {
      setFilter(`Country: ${country}`);
      apiUrl = `${apiUrl}?country=${country}`;
    } else if (category) {
      setFilter(`Category: ${category}`);
      apiUrl = `${apiUrl}?category=${category}`;
    } else {
      setFilter(null);
    }

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.meals);
      });
  }, [searchParams]);

  const filterTitle = filter?.replace("_", " ") || "All Recipes";

  return (
    <div className="flex flex-col p-6 bg-[#fafafa]">
      <h1 className="text-4xl font-extrabold text-[#343a40] text-center mb-10">
        {filterTitle}
      </h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.length > 0 &&
          recipes.map((recipe) => (
            <Link href={`/${recipe.idMeal}`} key={recipe.idMeal}>
              <li className="hover:shadow-xl shadow-sm rounded-sm p-6 bg-white">
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-64 h-64 object-cover rounded-sm mb-3"
                />
                <p className="text-sm font-semibold text-gray-600 text-center tracking-wide">
                  {recipe.strMeal}
                </p>
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default RecipeListPage;
