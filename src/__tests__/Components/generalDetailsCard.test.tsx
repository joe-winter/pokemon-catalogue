import GeneralDetailsCard from "@/app/components/GeneralDetailsCard";
import { render, screen } from "@testing-library/react";

describe("general details card", () => {
  it("displays given headings and values", () => {
    const details = [
      { heading: "Height", value: "0.7m" },
      { heading: "Weight", value: "6.9kg" },
      { heading: "Gender", value: "Male / Female" },
    ];

    render(<GeneralDetailsCard details={details}/>)

    const headingEls = screen.getAllByRole('heading')

    expect(headingEls[0]).toHaveTextContent("Height")
    expect(headingEls[1]).toHaveTextContent("Weight")
    expect(headingEls[2]).toHaveTextContent("Gender")

    const valueEl1 = screen.getByText("0.7m")
    const valueEl2 = screen.getByText("6.9kg")
    const valueEl3 = screen.getByText("Male / Female")

    expect(valueEl1).toBeInTheDocument()
    expect(valueEl2).toBeInTheDocument()
    expect(valueEl3).toBeInTheDocument()


  });
});
