const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
};

const mockLoggerFunc = (): any => mockLogger;
mockLoggerFunc.destination = jest.fn();

jest.doMock("pino", () => mockLoggerFunc);

export { mockLogger, mockLoggerFunc };
