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
        /*this.onChange_bill = this.onChange_bill.bind(this);
        this.onChange_billNumber = this.onChange_billNumber.bind(this);
        this.onChange_billChamber = this.onChange_billChamber.bind(this);
        this.onChange_billDateIntroduced = this.onChange_billDateIntroduced.bind(this);
        this.onChange_billOutcome = this.onChange_billOutcome.bind(this);
        this.onChange_billTitle = this.onChange_billTitle.bind(this);
        this.onChange_testBody = this.onChange_testBody.bind(this);
        this.onChange_testId = this.onChange_testId.bind(this);
        this.onChange_testUserId = this.onChange_testUserId.bind(this); */
        this.onChange_billObjArr = this.onChange_billObjArr.bind(this);
    }
    private legYear: string = "2018";
    private url: string = "https://jsonplaceholder.typicode.com/posts";
    // private url: string =  "http://api.richmondsunlight.com/1.0/bills/" + this.legYear + ".json";
    private makeRequest(): Headers {
        console.log("making Headers");
        const requestHeaders: Headers = new Headers();
        requestHeaders.append("Content-type", "application/json");
        requestHeaders.append("Cache-Control", "max-age=0");
        requestHeaders.append("Accept", "application/json");
        return requestHeaders;
    }

    private httpClientOptions: IHttpClientOptions = {
        headers: this.makeRequest()
    };
    //#region
    /* public onChange_bill(bill: string): void {
        this.props.onChange_bill(bill);
    }
    public onChange_billNumber(billNumber: string): void {
        this.props.onChange_billNumber(billNumber);
    }
    public onChange_billChamber(billChamber: string): void {
        this.props.onChange_billChamber(billChamber);
    }
    public onChange_billDateIntroduced(billDateIntroduced: string): void {
        this.props.onChange_billDateIntroduced(billDateIntroduced);
    }
    public onChange_billOutcome(billOutcome: string): void {
        this.props.onChange_billOutcome(billOutcome);
    }
    public onChange_billTitle(billTitle: string): void {
        this.props.onChange_billTitle(billTitle);
    }
    public onChange_testBody(testBody: string): void {
        this.props.onChange_testBody(testBody);
    }
    public onChange_testId(testId: number): void {
        this.props.onChange_testId(testId);
    }
    public onChange_testUserId(testUserId: number): void {
        this.props.onChange_testUserId(testUserId);
    } */
    public onChange_billObjArr(billObjArr: IBill[]): void {
        this.props.onChange_billObjArr(billObjArr);
    }
    //#endregion
    private GetSunshine(): void {
        console.log("Going to load bills");
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
                        // this.onChange_billNumber(bill.number);
                        newBill.number = bill.number;
                    }
                    if (bill.chamber != null) {
                        // this.onChange_billChamber(bill.chamber);
                        newBill.chamber = bill.chamber;
                    }
                    if (bill.date_introduced != null) {
                        // this.onChange_billDateIntroduced(bill.date_introduced);
                        newBill.date_introduced = bill.date_introduced;
                    }
                    if (bill.outcome != null) {
                        // this.onChange_billOutcome(bill.outcome);
                        newBill.outcome = bill.outcome;
                    }
                    if (bill.title != null) {
                        // this.onChange_billTitle(bill.title);
                        newBill.title = bill.title;
                    }
                    if (bill.body != null) {
                        // this.onChange_testBody(bill.body);
                        newBill.body = bill.body;
                    }
                    if (bill.id != null) {
                        // this.onChange_testId(bill.id);
                        newBill.id = bill.id;
                    }
                    if (bill.userId != null) {
                        // this.onChange_testUserId(bill.userId);
                        newBill.userId = bill.userId;
                    }
                    this.props.billObjArr.push(newBill);
                });
                this.onChange_billObjArr(this.props.billObjArr);
            });
    }

    public render(): React.ReactElement<IGetTheSunshineProps> {
        const httpClient: HttpClient = this.props.httpClient;
        return (
            <div>
                <button onClick={() => this.GetSunshine()} className={styles.button}>
                    Load Bill Titles
            </button>
            </div>
        );
    }
}