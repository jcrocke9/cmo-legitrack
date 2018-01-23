import HttpClient from "@microsoft/sp-http/lib/httpClient/HttpClient";
import { SPHttpClient } from "@microsoft/sp-http";
export interface ILegistationTrackingProps {
  description: string;
  httpClient: HttpClient;
  listName: string;
  siteUrl: string;
  relativeUrl: string;
  spHttpClient: SPHttpClient;
  legYear: number;

}
