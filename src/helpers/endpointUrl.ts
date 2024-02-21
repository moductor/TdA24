export type EndpointInit = {
  params?: EndpointQueryParams;
};

export type EndpointQueryParams = {
  [param: string]: string;
};

export function getEndpoint(endpoint: string, init?: EndpointInit): URL {
  const url = new URL(window.location.href);
  url.pathname = endpoint;

  if (init?.params) {
    Object.keys(init!.params!).forEach((param) => {
      url.searchParams.set(param, init!.params![param]);
    });
  }

  return url;
}
