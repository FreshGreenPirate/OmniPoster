export class OmniPosterError extends Error {
  constructor(message: string, public readonly details?: Record<string, unknown>) {
    super(message);
    this.name = 'OmniPosterError';
  }
}

export class ValidationError extends OmniPosterError {
  constructor(message: string, public readonly issues: unknown) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class ProviderError extends OmniPosterError {
  constructor(message: string, public readonly provider: string, details?: Record<string, unknown>) {
    super(message, details);
    this.name = 'ProviderError';
  }
}

export class NotFoundError extends OmniPosterError {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class PermissionError extends OmniPosterError {
  constructor(message: string) {
    super(message);
    this.name = 'PermissionError';
  }
}
