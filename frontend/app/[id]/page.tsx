"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Recipe } from "../../types/recipe";

const RecipePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [categoryRecipes, setCategoryRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<(string | null)[] | null>(
    null
  );

  useEffect(() => {
    if (!id) return;
    let apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/recipes";

    fetch(`${apiUrl}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data.meals[0]);
        setIngredients(
          Object.keys(data.meals[0])
            .filter(
              (key) =>
                key.includes("strIngredient") &&
                data.meals[0][key as keyof Recipe]
            )
            .map((key) => data.meals[0][key as keyof Recipe])
        );

        if (data.meals[0].strCategory) {
          fetch(`${apiUrl}?category=${data.meals[0].strCategory}`)
            .then((res) => res.json())
            .then((data) => setCategoryRecipes(data.meals));
        }
      });
  }, [id]);

  return (
    <div className="flex flex-col md:flex-row p-6 bg-[#fafafa]">
      {!recipe && <p className="text-center text-gray-500">Loading...</p>}

      {recipe && (
        <>
          <div className="w-full md:w-2/3 p-4">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-64 h-64 object-cover rounded-lg"
            />
            <h1 className="text-3xl font-bold mt-4 text-[#343a40]">
              {recipe.strMeal}
            </h1>
            <p
              className="text-lg text-[#78b9e3] cursor-pointer"
              onClick={() => router.push(`/?country=${recipe.strArea}`)}
            >
              {recipe.strArea}
            </p>
            <p className="mt-4 text-gray-700">{recipe.strInstructions}</p>
            <h2 className="text-xl font-semibold mt-6">Ingredients</h2>
            <ul className="list-disc pl-6">
              {ingredients &&
                ingredients.map((ingredient: string | null, index: number) => (
                  <li
                    key={`${ingredient}+${index}`}
                    className="text-[#78b9e3] cursor-pointer"
                    onClick={() =>
                      router.push(
                        `/?ingredient=${ingredient?.replace(" ", "_")}`
                      )
                    }
                  >
                    {ingredient}
                  </li>
                ))}
            </ul>
          </div>
          <aside className="w-full md:w-1/3 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-[#343a40]">
              More {recipe?.strCategory}
            </h2>
            <ul>
              {categoryRecipes.map((r) => (
                <li
                  key={r.idMeal}
                  className="cursor-pointer text-[#78b9e3]"
                  onClick={() => router.push(`/${r.idMeal}`)}
                >
                  {r.strMeal}
                </li>
              ))}
            </ul>
          </aside>
        </>
      )}
    </div>
  );
};

export default RecipePage;
