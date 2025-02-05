import BadgeListCard from "@/app/components/BadgeListCard";
import { render, screen } from "@testing-library/react";

describe("badge list card", () => {
  it("displays given heading and badge", () => {
    const category = [
      {
        heading: "test",
        badges: ["test1"],
      },
    ];

    render(<BadgeListCard categories={category} />);

    const headingEl = screen.getByText("Test");
    expect(headingEl).toBeInTheDocument();

    const badgeEl = screen.getByText("Test1");
    expect(badgeEl).toBeInTheDocument();
  });
  it("displays multiple given heading and badge", () => {
    const category = [
      {
        heading: "testheading1",
        badges: ["test1"],
      },
      {
        heading: "testheading2",
        badges: ["test2", "test3", "test4"],
      },
    ];

    render(<BadgeListCard categories={category} />);

    const heading1El = screen.getByText("Testheading1");
    expect(heading1El).toBeInTheDocument();
    const heading2El = screen.getByText("Testheading2");
    expect(heading2El).toBeInTheDocument();

    const badge1El = screen.getByText("Test1");
    expect(badge1El).toBeInTheDocument();
    const badge2El = screen.getByText("Test2");
    expect(badge2El).toBeInTheDocument();
    const badge3El = screen.getByText("Test3");
    expect(badge3El).toBeInTheDocument();
    const badge4El = screen.getByText("Test4");
    expect(badge4El).toBeInTheDocument();
  });
});
