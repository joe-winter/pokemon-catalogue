import StatsCard from "@/app/components/StatsCard";
import { render, screen } from "@testing-library/react";

describe("stats card", () => {
  it("displays given stat", () => {
    render(<StatsCard stats={[{ name: "HP", value: 75 }]} />);

    const nameEl = screen.getByRole("heading");
    expect(nameEl).toHaveTextContent("HP");
  });
  it("given multiple stats displays all", () => {
    const stats = [
      { name: "HP", value: 75 },
      { name: "Stealth", value: 75 },
      { name: "Speed", value: 75 },
      { name: "Attack", value: 75 },
    ];
    render(<StatsCard stats={stats} />);

    const nameEls = screen.getAllByRole('heading')

    expect(nameEls[0]).toHaveTextContent("HP")
    expect(nameEls[1]).toHaveTextContent("Stealth")
    expect(nameEls[2]).toHaveTextContent("Speed")
    expect(nameEls[3]).toHaveTextContent("Attack")
  });
});
