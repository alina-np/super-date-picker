import "@testing-library/jest-dom";
import { test, describe, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { DateRangePicker } from "../ui/date-range-picker";
import { format } from "date-fns";

const onChangeMock = vi.fn();

vi.mock("@/shared/ui", () => ({
  Icon: () => <svg data-testid="icon" />,
  IconType: {},
}));

const startDate = new Date(2025, 0, 10);
const endDate = new Date(2025, 0, 20);

describe("DateRangePicker", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders with initial date", () => {
    render(
      <DateRangePicker value={{ startDate, endDate }} onChange={onChangeMock} />
    );

    expect(screen.getByText(format(startDate, "dd.MM.yyyy HH:mm"))).toBeInTheDocument();
    expect(screen.getByText(format(endDate, "dd.MM.yyyy HH:mm"))).toBeInTheDocument();
  });

  test("renders with placeholder without date", () => {
    render(
      <DateRangePicker
        value={{ startDate: null, endDate: null }}
        onChange={onChangeMock}
      />
    );

    expect(screen.getByText("Выберите дату начала")).toBeInTheDocument();
    expect(screen.getByText("Выберите дату окончания")).toBeInTheDocument();
  });

  test("calls onChange, when startDate is change", async () => {
    render(
      <DateRangePicker value={{ startDate, endDate }} onChange={onChangeMock} />
    );

    fireEvent.click(screen.getByText(format(startDate, "dd.MM.yyyy HH:mm")));
    fireEvent.click(await screen.findByText("15"));

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalled();
      const calledWith = onChangeMock.mock.calls[0][0];
      expect(calledWith.startDate.getDate()).toBe(15);
    });
  });

  test("calls onChange, when endDate is change", async () => {
    render(
      <DateRangePicker value={{ startDate, endDate }} onChange={onChangeMock} />
    );

    fireEvent.click(screen.getByText(format(endDate, "dd.MM.yyyy HH:mm")));
    fireEvent.click(await screen.findByText("15"));

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalled();
      const calledWith = onChangeMock.mock.calls[0][0];
      expect(calledWith.endDate.getDate()).toBe(15);
    });
  });

  test("impossible change more early date", async () => {
    render(
      <DateRangePicker value={{ startDate, endDate }} onChange={onChangeMock} />
    );

    fireEvent.click(screen.getByText(format(endDate, "dd.MM.yyyy HH:mm")));
    fireEvent.click(await screen.findByText("9"));

    expect(onChangeMock).not.toHaveBeenCalledWith(
      expect.objectContaining({
        endDate: expect.any(Date),
      })
    );
  });
});
