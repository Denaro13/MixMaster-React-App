import axios from "axios";
import { useLoaderData } from "react-router-dom";
import CocktailList from "../Components/CocktailsList";
import SearchForm from "../Components/SearchForm";
import { useQuery } from "@tanstack/react-query";

const searchCocktailQuery = (searchTerm) => {
  return {
    queryKey: ["search", searchTerm || "all"],
    queryFn: async () => {
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
      // console.log(response);
      return response.data.drinks;
    },
  };
};

const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("search") || "";
    await queryClient.ensureQueryData(searchCocktailQuery(searchTerm));
    return { searchTerm };
  };

const Landing = () => {
  const { searchTerm } = useLoaderData();
  // console.log(drinks);
  const { data: drinks } = useQuery(searchCocktailQuery(searchTerm));
  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
};
export default Landing;
