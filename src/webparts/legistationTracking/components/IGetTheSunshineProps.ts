import HttpClient from "@microsoft/sp-http/lib/httpClient/HttpClient";
import { IBill } from "./IBill";

export interface IGetTheSunshineProps {
    httpClient?: HttpClient;
    billObjArr?: IBill[];
    onChange_billObjArr(billObjArr: IBill[]): any;
    legYear?: number;
    status?: string;
    onChange_status(status: string): any;
  }