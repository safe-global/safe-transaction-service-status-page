import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";

import App from "./App";

test("renders help docs link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Help Docs/i);
  expect(linkElement).toBeInTheDocument();
});
