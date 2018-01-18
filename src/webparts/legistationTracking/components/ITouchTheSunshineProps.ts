import { SPHttpClient } from "@microsoft/sp-http";
import { IBill } from "./IBill";

export interface ITouchTheSunshineProps {
    listName: string;
    spHttpClient: SPHttpClient;
    siteUrl: string;
    billObjArr?: IBill[];
    status?: string;
    onChange_status(status: string): any;
}