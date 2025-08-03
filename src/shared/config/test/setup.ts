import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

beforeEach(() => {
  const style = document.createElement("style");
  style.innerHTML = `
  .opacity-0 {
      opacity: 0;
  }
  .opacity-100 {
      opacity: 1;
  }
  `;
  document.head.appendChild(style);
});

afterEach(() => {
  cleanup();
});

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
