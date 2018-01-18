import * as React from "react";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import pnp from "sp-pnp-js";
import { sp, List } from 'sp-pnp-js';
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
                &nbsp;
            <button onClick={() => this.GetTestSunshine()} className={styles.button}>
                    Test
            </button>
            </div>
        );
    }
    private touchSunshine(): void {
        let arrayOfSpItems: IBillCt[];
        let newStats: string = "Starting upload";
        this.onChange_status(newStats);
        pnp.sp.web.lists.getByTitle(this.props.listName).items.get().then(r => {
            arrayOfSpItems = r;
            let trueLengthNum: number = this.props.billObjArr.length - 1;
            let createdNum: number = 0;
            let existingNum: number = 0;
            this.props.billObjArr.map((indvBill: IBill, i: number) => {
                let flagOfExisting: boolean;
                arrayOfSpItems.map((spItem: IBillCt) => {
                    if (indvBill.number === spItem.legiNumber) {
                        flagOfExisting = true;
                        existingNum++;
                        console.log("if " + spItem.legiNumber);
                    } else {
                        console.log("else " + spItem.legiNumber);
                    }
                });
                if (!flagOfExisting) {
                    this.createItem(indvBill);
                    console.log(indvBill.number);
                    createdNum++;
                }
                flagOfExisting = undefined;
                if (i === trueLengthNum) {
                    let newStats: string = "Uploaded test bills! New: " + createdNum + " Existing: " + existingNum;
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
    private GetTestSunshine(): void {
        const list = sp.web.getList('/sites/cmo/Lists/Bills');
        const getAllItems = (
            list: List,
            select: string = '',
            tickCallback?: (chunk?: any[], allData?: any[]) => void,
            skip: number = 0,
            results: any[] = []
        ): Promise<any[]> => {
            return new Promise(resolve => {
                let items = list.items;
                if (select) {
                    if (select.indexOf('Id') === -1) {
                        select = `Id,${select}`;
                    }
                    items = items.select(select);
                }
                if (skip) {
                    items = items.skip(skip);
                }
                items.top(5000).get()
                    .then((res: any[]) => {
                        if (res.length > 0) {
                            results = results.concat(res);
                            if (tickCallback && typeof tickCallback === 'function') {
                                tickCallback(res, results);
                            }
                            skip = res[res.length - 1].Id;
                            return resolve(getAllItems(list, select, tickCallback, skip, results));
                        } else {
                            return resolve(results);
                        }
                    });
            });
        };
        let tickCallback = (chunk: any[], data: any[]) => {
            // Can tick progress in the UI
            console.log(`Id: ${chunk[chunk.length - 1].Id}, retrived: ${data.length}`);
        };
        getAllItems(list, 'Id,Title', tickCallback).then(console.log).catch(console.log);
    }

}