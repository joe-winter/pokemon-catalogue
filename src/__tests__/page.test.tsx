import Home from "@/app/page";
import { render, screen } from "@testing-library/react";
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
  it("has back and next buttons", () => {
    render(<Home />);

    const nextButtonEl = screen.getByRole('button', {name: 'Next'})
    expect(nextButtonEl).toBeInTheDocument()

    const backButtonEl = screen.getByRole('button', {name: 'Back'})
    expect(backButtonEl).toBeInTheDocument()
  })
});
