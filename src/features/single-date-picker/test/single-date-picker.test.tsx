import "@testing-library/jest-dom";
import { test, describe, expect, vi } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { SingleDatePicker } from "../ui/single-date-picker";
import { format } from "date-fns";

describe("SingleDatePicker", () => {
  const value = { startDate: new Date(2025, 0, 2) };
  const onChangeMock = vi.fn();

  test("renders with initial date", () => {
    render(<SingleDatePicker value={value} onChange={onChangeMock} />);

    expect(screen.getByText(format(value.startDate, "dd.MM.yyyy HH:mm"))).toBeInTheDocument();
  });

  test("renders with placeholder without date", () => {
    render(
      <SingleDatePicker value={{ startDate: null }} onChange={onChangeMock} />
    );

    expect(screen.getByText("Выберите дату начала")).toBeInTheDocument();
  });

  test("calls onChange, when date is changed", async () => {
    render(<SingleDatePicker value={value} onChange={onChangeMock} />);

    fireEvent.click(screen.getByText(format(value.startDate, "dd.MM.yyyy HH:mm")));
    fireEvent.click(await screen.findByText("15"));

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalled();
      const calledWithDate = onChangeMock.mock.calls[0][0];
      expect(calledWithDate).toBeInstanceOf(Date);
      expect(calledWithDate.getDate()).toBe(15);
    });
  });
});
