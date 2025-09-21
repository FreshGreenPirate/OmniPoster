import axios, { AxiosInstance } from "axios";

export interface OAuthTokenSet {
  accessToken: string;
  refreshToken?: string | null;
  expiresAt?: Date | null;
}

export function createAuthorizedClient(
  baseURL: string,
  token: string
): AxiosInstance {
  return axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export interface UploadPart {
  chunk: Buffer | Uint8Array;
  index: number;
  isLast: boolean;
}

export async function uploadInParts(
  iterator: AsyncIterable<UploadPart>,
  uploader: (part: UploadPart) => Promise<void>
) {
  for await (const part of iterator) {
    await uploader(part);
  }
}
