export const FourHundredErrorName = "FourHundredError";

export class CustomError extends Error {
  payload: string | Error | Record<string, unknown>;
  extra?: Record<string, unknown>;

  constructor(
    payload: string | Error | Record<string, unknown>,
    extra?: Record<string, unknown>
  ) {
    if (payload instanceof Error) super(payload.message);
    else if (typeof payload === "string") super(payload);
    else super(payload.message as string | undefined);

    this.name = "CustomError";
    this.payload = payload;
    this.extra = extra;
  }
}

type FourHundredBody = {
  data?: null;
  error: string;
  error_code: string;
  details?: Record<string, unknown>;
};

export class FourHundredError extends Error {
  body: FourHundredBody;

  constructor(body: FourHundredBody) {
    super(body.error);
    this.name = FourHundredErrorName;
    this.body = { data: null, ...body };
  }
}
