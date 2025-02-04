import PageSwitcher from "@/app/components/PageSwitcher";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
describe("page switcher", () => {
  it("should have forward and back buttons", () => {
    const setPageNumber = jest.fn();
    render(
      <PageSwitcher
      totalItems={1000}
      itemsPerPage={12}
      pageNumber={5}
      setPageNumber={setPageNumber}
      />
    );

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
      totalItems={1000}
      itemsPerPage={12}
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
  it("should disable back button if page number is 0", () => {
    const setPageNumber = jest.fn();
    render(
      <PageSwitcher
      totalItems={1000}
      itemsPerPage={12}
      pageNumber={0}
      setPageNumber={setPageNumber}
      />
    );

    const nextButtonEl = screen.getByRole("button", { name: "Next" });
    expect(nextButtonEl).toBeEnabled();

    const backButtonEl = screen.getByRole("button", { name: "Back" });
    expect(backButtonEl).toBeDisabled();
  })
  it("should disable next button if the page number is the final page", () => {
    const setPageNumber = jest.fn();
    render(
      <PageSwitcher
      totalItems={23}
      itemsPerPage={12}
      pageNumber={1}
      setPageNumber={setPageNumber}
      />
    );

    const nextButtonEl = screen.getByRole("button", { name: "Next" });
    expect(nextButtonEl).toBeDisabled();

    const backButtonEl = screen.getByRole("button", { name: "Back" });
    expect(backButtonEl).toBeEnabled();
  })
});
