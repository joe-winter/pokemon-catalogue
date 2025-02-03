import Home from "@/app/page";
import { render } from "@testing-library/react";
import PokemonService from "@/app/services/pokemonService";
import { act } from "react";

jest.mock("../app/services/pokemonService.ts");
describe("Home", () => {
  it("calls pokemonservice when page loads", () => {
    act(() => {
      render(<Home />);
    });
    expect(PokemonService.getPokemonList).toHaveBeenCalledWith(12, 0);
  });
});
