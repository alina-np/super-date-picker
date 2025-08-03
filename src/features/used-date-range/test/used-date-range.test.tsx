import "@testing-library/jest-dom";
import { test, describe, expect, vi } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { initialDateRange } from "../model/initial-date-range";
import { isActiveDateRange } from "../lib/active-date-range";
import { UsedDateRange } from "../ui/used-date-range";

vi.mock("@/shared/ui", () => ({
  Button: (props: any) => <button {...props}>{props.text}</button>,
  Icon: () => <svg data-testid="icon" />,
  IconType: {},
}));

describe("UsedDateRange", () => {
  const onClickMock = vi.fn();

  const defaultValue = { startDate: null, endDate: null };

  test("render icon, btns is hidden", () => {
    render(<UsedDateRange value={defaultValue} onClick={onClickMock} />);

    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByTestId("usedRange-btns")).not.toHaveClass("open");
  });

  test("btns is visible on click, actibe btn is selected", async () => {
    render(<UsedDateRange value={defaultValue} onClick={onClickMock} />);

    fireEvent.click(screen.getByTestId("icon"));
    await waitFor(() => {
      expect(screen.getByTestId("usedRange-btns")).toHaveClass("open");
    });

    initialDateRange.forEach((range) => {
      const button = screen.getByTestId(range.label);
      expect(button).toBeInTheDocument();
      isActiveDateRange(defaultValue, range)
        ? expect(button).toHaveClass("active")
        : expect(button).not.toHaveClass("active");
    });
  });

  test("button on click", () => {
    render(<UsedDateRange value={defaultValue} onClick={onClickMock} />);

    fireEvent.click(screen.getByTestId("icon"));
    fireEvent.click(screen.getByRole("button", { name: initialDateRange[1].label }));
    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(onClickMock).toHaveBeenCalledWith(initialDateRange[1]);
  });

  test("close list on click outside list", () => {
    render(<UsedDateRange value={defaultValue} onClick={onClickMock} />);

    fireEvent.click(screen.getByTestId("icon"));
    expect(screen.getByTestId("usedRange-btns")).toHaveClass("open");

    fireEvent.mouseDown(document.body);
    expect(screen.getByTestId("usedRange-btns")).not.toHaveClass("open");
  });
});
