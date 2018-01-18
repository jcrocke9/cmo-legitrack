import * as React from "react";
import { IGetTheSunshineProps } from "./IGetTheSunshineProps";
import HttpClientResponse from "@microsoft/sp-http/lib/httpClient/HttpClientResponse";
import HttpClient from "@microsoft/sp-http/lib/httpClient/HttpClient";
import { IHttpClientOptions } from "@microsoft/sp-http";
import { IBill } from "./IBill";
import styles from "./LegistationTracking.module.scss";
import ServiceScope from "@microsoft/sp-core-library/lib/serviceScope/ServiceScope";

class Abill<IBill> { }

export class GetTheSunshine extends React.Component<IGetTheSunshineProps, {}> {
    constructor(props: any) {
        super(props);
        this.onChange_billObjArr = this.onChange_billObjArr.bind(this);
        this.onChange_status = this.onChange_status.bind(this);
    }
    private legYear: string = undefined;
    // private url: string = "https://jsonplaceholder.typicode.com/posts";
    private url: string = "https://api.richmondsunlight.com/1.0/bills/" + this.legYear + ".json";
    private makeRequest(): Headers {
        console.log("making Headers");
        const requestHeaders: Headers = new Headers();
        // requestHeaders.append("Content-type", "application/json");
        // requestHeaders.append("Cache-Control", "max-age=0");
        requestHeaders.append("Accept", "application/json");
        return requestHeaders;
    }

    private httpClientOptions: IHttpClientOptions = {
        headers: this.makeRequest()
    };
    public onChange_billObjArr(billObjArr: IBill[]): void {
        this.props.onChange_billObjArr(billObjArr);
    }
    public onChange_status(status: string): void {
        this.props.onChange_status(status);
    }
    private GetSunshine(): void {
        this.legYear = this.props.legYear.toString();
        let newStats: string = "Downloaded bills";
        this.onChange_status(newStats);
        this.props.httpClient.fetch(this.url, HttpClient.configurations.v1, this.httpClientOptions)
            .then((response: HttpClientResponse): Promise<IBill[]> => {
                console.log("Response from Richmond Sunshine");
                console.log(response);
                return response.json();
            }, (error: any): void => {
                console.log(error);
            }).then((billArr: IBill[]): void => {
                console.log("Opened");
                console.log(billArr);
                billArr.forEach(bill => {
                    let newBill: IBill = new Abill;
                    if (bill.number != null) {
                        newBill.number = bill.number;
                    }
                    if (bill.chamber != null) {
                        newBill.chamber = bill.chamber;
                    }
                    if (bill.date_introduced != null) {
                        newBill.date_introduced = bill.date_introduced;
                    }
                    if (bill.outcome != null) {
                        newBill.outcome = bill.outcome;
                    }
                    if (bill.title != null) {
                        newBill.title = bill.title;
                    }
                    if (bill.body != null) {
                        newBill.body = bill.body;
                    }
                    if (bill.id != null) {
                        newBill.id = bill.id;
                    }
                    if (bill.userId != null) {
                        newBill.userId = bill.userId;
                    }
                    this.props.billObjArr.push(newBill);
                });
                this.onChange_billObjArr(this.props.billObjArr);
            });
    }
    private GetTestSunshine(): void {
        let newStats: string = "Downloaded test bills";
        this.onChange_status(newStats);
        let testSunshine: string = '[{"number":"hb1","chamber":"house","date_introduced":"2017-11-20","status":"in committee","outcome":"","title":"FOIA; release of scholastic records, definition of records includes directory information."},{"number":"hb2","chamber":"house","date_introduced":"2017-11-20","status":"in committee","outcome":"","title":"Teacher licensure; reciprocity, spouses of Armed Forces members."},{"number":"hb3","chamber":"house","date_introduced":"2017-11-20","status":"in committee","outcome":"","title":"Dual enrollment courses; quality standards, universal transfer course credit."},{"number":"hb4","chamber":"house","date_introduced":"2017-11-20","status":"in subcommittee","outcome":"","title":"Case management system; public accessibility."},{"number":"hb5","chamber":"house","date_introduced":"2017-11-20","status":"in committee","outcome":"","title":"Campaign finance; prohibited personal use, penalty."},{"number":"hb6","chamber":"house","date_introduced":"2017-11-20","status":"in committee","outcome":"","title":"Security freezes; elimination of fees."},{"number":"hb7","chamber":"house","date_introduced":"2017-11-20","status":"in committee","outcome":"","title":"Campaign finance; prohibited personal use."},{"number":"hb8","chamber":"house","date_introduced":"2017-11-20","status":"in committee","outcome":"","title":"Public procurement; agreements with labor organizations."},{"number":"hb9","chamber":"house","date_introduced":"2017-11-20","status":"in subcommittee","outcome":"","title":"Safety restraints; all occupants of motor vehicles required to utilize."},{"number":"hb10","chamber":"house","date_introduced":"2017-11-20","status":"in committee","outcome":"","title":"Hate crimes; criminal acts against persons because of gender, etc."}]';
        let testSunshineJson: any = JSON.parse(testSunshine);
        this.onChange_billObjArr(testSunshineJson);
    }

    public render(): React.ReactElement<IGetTheSunshineProps> {
        const httpClient: HttpClient = this.props.httpClient;
        return (
            <div>
                <button onClick={() => this.GetSunshine()} className={styles.button}>
                    Load Bill Titles
                </button>
                &nbsp;
                <button onClick={() => this.GetTestSunshine()} className={styles.button}>
                    Load TEST Bill Titles
                </button>
            </div>
        );
    }
}