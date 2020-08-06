import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";

import App from "./App";

it("should return successful", async () => {
  const form = render(<App />);
  const { getByLabelText, getByText } = form;
  const input = getByLabelText("input-code");

  act(() => {
    fireEvent.click(getByText("1"));
  });
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("5"));
  await wait(() => expect(input.value).toBe("1995"));
  act(() => {
    fireEvent.click(getByText("Unlock"));
  });
  await wait(() => expect(getByText("Unlocked!")).toBeInTheDocument());
});

it("should return incorrect code message", async () => {
  const form = render(<App />);
  const { getByLabelText, getByText } = form;
  const input = getByLabelText("input-code");

  fireEvent.click(getByText("1"));
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("6"));
  await wait(() => expect(input.value).toBe("1996"));

  fireEvent.click(getByText("Unlock"));

  await wait(() => expect(getByText("Incorrect entry")).toBeInTheDocument());
});

it("should remove last number when backspace is hit", async () => {
  const form = render(<App />);
  const { getByLabelText, getByText } = form;
  const input = getByLabelText("input-code");

  fireEvent.click(getByText("1"));
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("6"));
  await wait(() => expect(input.value).toBe("1996"));

  fireEvent.click(getByText("back"));
  await wait(() => expect(input.value).toBe("199"));
});

it("should remove all numbers wheh clear is hit", async () => {
  const form = render(<App />);
  const { getByLabelText, getByText } = form;
  const input = getByLabelText("input-code");

  fireEvent.click(getByText("1"));
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("6"));
  await wait(() => expect(input.value).toBe("1996"));

  fireEvent.click(getByText("clear"));
  await wait(() => expect(input.value).toBe(""));
});

it("Keypad disappears after 3 tries", async () => {
  const form = render(<App />);
  const { getByLabelText, getByText, queryByText } = form;
  const input = getByLabelText("input-code");

  fireEvent.click(getByText("1"));
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("6"));
  await wait(() => expect(input.value).toBe("1996"));
  fireEvent.click(getByText("Unlock"));
  fireEvent.click(getByText("Unlock"));
  fireEvent.click(getByText("Unlock"));

  await wait(() => expect(queryByText("unlockbutton")).not.toBeInTheDocument());
  await wait(() =>
    expect(getByText("Too many incorrect attempts!")).toBeInTheDocument()
  );
});

it("Keypad disappears after 3 tries and tries are reset", async () => {
  const form = render(<App />);
  const { getByLabelText, getByText, queryByText } = form;
  const input = getByLabelText("input-code");

  fireEvent.click(getByText("1"));
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("6"));
  await wait(() => expect(input.value).toBe("1996"));
  fireEvent.click(getByText("Unlock"));
  fireEvent.click(getByText("Unlock"));
  fireEvent.click(getByText("Unlock"));

  await wait(() => expect(queryByText("unlockbutton")).not.toBeInTheDocument());
  await wait(() =>
    expect(getByText("Too many incorrect attempts!")).toBeInTheDocument()
  );
  await wait(() => expect(getByText("Unlock")).toBeInTheDocument());
  fireEvent.click(getByText("Unlock"));
  await wait(() => expect(getByText("Incorrect entry")).toBeInTheDocument());
});

test("It should return locked when nothing is inputted", async () => {
  const { getByTestId } = render(<App />);

  expect(getByTestId("status")).toHaveTextContent("Locked");
});
