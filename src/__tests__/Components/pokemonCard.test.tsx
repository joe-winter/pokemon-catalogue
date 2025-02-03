import PokemonCard from "@/app/components/PokemonCard";
import { render, screen, waitFor } from "@testing-library/react";

describe("pokemon card", () => {
  it("should display given pokemon details", async () => {
    render(
      <PokemonCard
        name="Test Name"
        imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
        number='#0001'
        types={['normal', 'water']}
      />
    );

    const nameEl = screen.getByText("Test Name");
    expect(nameEl).toBeInTheDocument();

    await waitFor(() => {
      const imageEl = screen.getByRole("img");
      expect(imageEl).toBeInTheDocument();
    });

    const numberEl = screen.getByText("#0001");
    expect(numberEl).toBeInTheDocument();

    const typeEl1 = screen.getByText('Normal')
    const typeEl2 = screen.getByText('Water')

    expect(typeEl1).toBeInTheDocument()
    expect(typeEl2).toBeInTheDocument()
  });
});
