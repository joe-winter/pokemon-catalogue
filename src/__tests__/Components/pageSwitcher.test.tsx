import PageSwitcher from "@/app/components/PageSwitcher";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
describe("page switcher", () => {
  it("should have forward and back buttons", () => {
    render(<PageSwitcher />);

    const nextButtonEl = screen.getByRole("button", { name: "Next" });
    expect(nextButtonEl).toBeInTheDocument();

    const backButtonEl = screen.getByRole("button", { name: "Back" });
    expect(backButtonEl).toBeInTheDocument();
  });
  it("should call page swithcer function when buttons are clicks", async () => {
    const user = userEvent.setup()
    const setPageNumber = jest.fn();
    render(
      <PageSwitcher
      next={true}
      previous={true}
      pageNumber={5}
      setPageNumber={setPageNumber}
      />
    );
    
    const nextButtonEl = screen.getByRole("button", { name: "Next" });
    await user.click(nextButtonEl)
    expect(setPageNumber).toHaveBeenLastCalledWith(6)
    
    const backButtonEl = screen.getByRole("button", { name: "Back" });
    await user.click(backButtonEl)
    expect(setPageNumber).toHaveBeenLastCalledWith(4)
  });
  it("should disable buttons depending on props", () => {
    const setPageNumber = jest.fn();
    render(
      <PageSwitcher
      next={false}
      previous={false}
      pageNumber={5}
      setPageNumber={setPageNumber}
      />
    );

    const nextButtonEl = screen.getByRole("button", { name: "Next" });
    expect(nextButtonEl).toBeDisabled();

    const backButtonEl = screen.getByRole("button", { name: "Back" });
    expect(backButtonEl).toBeDisabled();
  })
});
