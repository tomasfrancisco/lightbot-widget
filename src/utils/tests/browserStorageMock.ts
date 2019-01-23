import { Storage } from "lightbot-ssot/lib";

interface BrowserStorageMockProps {
  localStorage?: any;
  sessionStorage?: any;
}

export const getBrowserStorageMock = (
  { localStorage, sessionStorage }: BrowserStorageMockProps = {
    localStorage: {
      getItem: jest.fn(),
      setItem: jest.fn(),
    },
    sessionStorage: {
      getItem: jest.fn(),
      setItem: jest.fn(),
    },
  },
) => new Storage({ localStorage, sessionStorage });
