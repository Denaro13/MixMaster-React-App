import CocktailCard from "../Components/CocktailCard";
import Wrapper from "../assets/wrappers/CocktailList";

const CocktailsList = ({ drinks }) => {
  // console.log(drinks);
  if (!drinks) {
    return (
      <h4 style={{ textAlign: "center" }}>
        sorry, there is no matching cocktail found
      </h4>
    );
  }
  const formattedDrinks = drinks.map((drink) => {
    const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = drink;
    return {
      id: idDrink,
      name: strDrink,
      image: strDrinkThumb,
      info: strAlcoholic,
      glass: strGlass,
    };
  });
  return (
    <Wrapper>
      {formattedDrinks.map((drink) => {
        return <CocktailCard key={drink.id} {...drink} />;
      })}
    </Wrapper>
  );
};
export default CocktailsList;
