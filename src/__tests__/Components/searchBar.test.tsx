import SearchBar from "@/app/components/SearchBar";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("search bar", () => {
  it("has input field and search button", async () => {
    const user = userEvent.setup();
    const setInputValue = jest.fn();
    render(
      <SearchBar
        inputValue=""
        setInputValue={setInputValue}
        searchList={[""]}
      />
    );

    const buttonEl = screen.getByRole("button");
    expect(buttonEl).toHaveTextContent("Search");

    const inputEl = screen.getByPlaceholderText("Search Here");
    expect(inputEl).toHaveTextContent("");

    await user.type(inputEl, "a");
    expect(setInputValue).toHaveBeenCalledWith("a");
  });
  it("can display different placeholder", () => {
    const setInputValue = jest.fn();
    render(
      <SearchBar
        inputValue=""
        setInputValue={setInputValue}
        placeholder="Find Pokémon"
      />
    );

    const inputEl = screen.getByPlaceholderText("Find Pokémon");
    expect(inputEl).toBeInTheDocument();
  });
  it("calls search function when button is clicked", async () => {
    const user = userEvent.setup();
    const setInputValue = jest.fn();
    const searchFunction = jest.fn();
    render(
      <SearchBar
      inputValue=""
      setInputValue={setInputValue}
      placeholder="Find Pokémon"
      searchFunction={searchFunction}
      />
    );
    
    const buttonEl = screen.getByRole("button");
    expect(buttonEl).toHaveTextContent("Search");
    await user.click(buttonEl);
    
    expect(searchFunction).toHaveBeenCalled();
  });
  it("displays given search list when user starts to type", async () => {
    const user = userEvent.setup();
    const setInputValue = jest.fn();
    const searchFunction = jest.fn();
    render(
      <SearchBar
        inputValue="t"
        setInputValue={setInputValue}
        searchList={["test1"]}
        searchFunction={searchFunction}
      />
    );

    const inputEl = screen.getByPlaceholderText("Search Here");
    expect(inputEl).toHaveTextContent("");

    await user.type(inputEl, "e");
    expect(setInputValue).toHaveBeenCalledWith("te");

    expect(screen.getByText("t")).toBeInTheDocument()
    expect(screen.getByText("est1")).toBeInTheDocument()
  })
  it("when a user clicks on an options, it sets the input value", async () => {
    const user = userEvent.setup();
    const setInputValue = jest.fn();
    const searchFunction = jest.fn();
    render(
      <SearchBar
        inputValue="t"
        setInputValue={setInputValue}
        searchList={["test1"]}
        searchFunction={searchFunction}
      />
    );
  
    const inputEl = screen.getByPlaceholderText("Search Here");
    expect(inputEl).toHaveTextContent("");
  
    await user.type(inputEl, "e");
    expect(setInputValue).toHaveBeenCalledWith("te");
  
    const optionButtonEl = screen.getByText("est1")
    await user.click(optionButtonEl)

    expect(setInputValue).toHaveBeenCalledWith("test1")
    
  })
  it("displays text as but if matches input value", async () => {
    const user = userEvent.setup();
    const setInputValue = jest.fn();
    const searchFunction = jest.fn();
    render(
      <SearchBar
        inputValue="t"
        setInputValue={setInputValue}
        searchList={["test1"]}
        searchFunction={searchFunction}
      />
    );
  
    const inputEl = screen.getByPlaceholderText("Search Here");
    expect(inputEl).toHaveTextContent("");
  
    await user.type(inputEl, "e");
    expect(setInputValue).toHaveBeenCalledWith("te");

    const boldEl = screen.getByText("t")
    expect(boldEl).toHaveClass("font-semibold")
    
  })
});
