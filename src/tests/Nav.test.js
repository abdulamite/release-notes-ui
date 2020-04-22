import React from "react";
import { render } from "@testing-library/react";
import Nav from "../Nav";

describe("Navigation", () => {
  it("Renders the nav component", () => {
    const { container } = render(<Nav />);
    expect(container).toBeInTheDocument();
  });

  it("Has the correct header logo text", () => {
    const { getByText } = render(<Nav />);
    const nav = getByText("QNotes");
    expect(nav.innerHTML).toBe("QNotes");
  });
});
