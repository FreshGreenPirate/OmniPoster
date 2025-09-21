import axios, { AxiosInstance } from 'axios';
import { ProviderError } from '@omniposter/core';
import type { ProviderOptions } from '../types';

export abstract class OAuthPublisher {
  protected readonly http: AxiosInstance;

  constructor(protected readonly options: ProviderOptions & { baseURL: string }) {
    this.http = axios.create({
      baseURL: options.baseURL,
      headers: {
        Authorization: `Bearer ${options.accessToken}`,
      },
    });
  }

  protected handleError(error: unknown, provider: string): never {
    if (axios.isAxiosError(error)) {
      throw new ProviderError(error.message, provider, {
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    throw new ProviderError('Unexpected provider error', provider, {
      error,
    });
  }
}
