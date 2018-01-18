import * as React from "react";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import pnp from "sp-pnp-js";
import { ITouchTheSunshineProps } from "./ITouchTheSunshineProps";
import { ITouchTheSunshineState } from "./ITouchTheSunshineState";
import styles from "./LegistationTracking.module.scss";
import { IBill } from "./IBill";
import { IBillCt } from "./IBillCt";

export class TouchTheSunshine extends React.Component<ITouchTheSunshineProps, ITouchTheSunshineState> {
    private listItemEntityTypeName: string = undefined;
    constructor(props: ITouchTheSunshineProps) {
        super(props);
        this.onChange_status = this.onChange_status.bind(this);
    }
    public onChange_status(status: string): void {
        this.props.onChange_status(status);
    }
    public render(): React.ReactElement<ITouchTheSunshineProps> {
        return (
            <div>
                <button onClick={() => this.touchSunshine()} className={styles.button}>
                    Submit Bills
            </button>
            </div>
        );
    }

    private touchSunshine(): void {
        let arrayOfSpItems: IBillCt[];
        pnp.sp.web.lists.getByTitle(this.props.listName).items.get().then(r => {
            arrayOfSpItems = r;
            this.props.billObjArr.map((indvBill: IBill, i: number) => {
                let flagOfExisting: boolean;
                arrayOfSpItems.map((spItem: IBillCt) => {
                    if (indvBill.number === spItem.legiNumber) {
                        flagOfExisting = true;
                    }
                });
                if (!flagOfExisting) {
                    this.createItem(indvBill);
                }
                flagOfExisting = undefined;
                if (i === this.props.billObjArr.length) {
                    let newStats: string = "Uploaded test bills";
                    this.onChange_status(newStats);
                }
            });
        });
    }

    private createItem(itemBill: IBill): void {
        this.getListItemEntityTypeName()
            .then((listItemEntityTypeName: string): Promise<SPHttpClientResponse> => {
                const body: string = JSON.stringify({
                    "__metadata": {
                        "type": listItemEntityTypeName
                    },
                    "Title": itemBill.title,
                    "legiNumber": itemBill.number,
                    "legiChamber": itemBill.chamber,
                    "legiDateIntro": itemBill.date_introduced,
                    "legiOutcome": itemBill.outcome,
                    "legiBody": itemBill.body,
                    "legiId": itemBill.id,
                    "legiUserId": itemBill.userId
                });
                return this.props.spHttpClient.post(`${this.props.siteUrl}/_api/web/lists/getbytitle('${this.props.listName}')/items`,
                    SPHttpClient.configurations.v1,
                    {
                        headers: {
                            "Accept": "application/json;odata=nometadata",
                            "Content-type": "application/json;odata=verbose",
                            "odata-version": ""
                        },
                        body: body
                    });
            })
            .then((response: SPHttpClientResponse): Promise<IBill> => {
                return response.json();
            });
    }

    private getListItemEntityTypeName(): Promise<string> {
        return new Promise<string>((resolve: (listItemEntityTypeName: string) => void, reject: (error: any) => void): void => {
            if (this.listItemEntityTypeName) {
                resolve(this.listItemEntityTypeName);
                return;
            }
            this.props.spHttpClient.get(`${this.props.siteUrl}/_api/web/lists/getbytitle('${this.props.listName}')?$select=ListItemEntityTypeFullName`,
                SPHttpClient.configurations.v1,
                {
                    headers: {
                        "Accept": "application/json;odata=nometadata",
                        "odata-version": ""
                    }
                })
                .then((response: SPHttpClientResponse): Promise<{ ListItemEntityTypeFullName: string }> => {
                    return response.json();
                }, (error: any): void => {
                    reject(error);
                })
                .then((response: { ListItemEntityTypeFullName: string }): void => {
                    this.listItemEntityTypeName = response.ListItemEntityTypeFullName;
                    resolve(this.listItemEntityTypeName);
                });
        });
    }
}