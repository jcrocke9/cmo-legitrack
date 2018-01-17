import * as React from "react";
import styles from "./LegistationTracking.module.scss";
import { ILegistationTrackingProps } from "./ILegistationTrackingProps";
import { ILegistationTrackingStates } from "./ILegistationTrackingStates";
import { escape } from "@microsoft/sp-lodash-subset";
import HttpClient from "@microsoft/sp-http/lib/httpClient/HttpClient";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { GetTheSunshine } from "./GetTheSunshine";
import { TouchTheSunshine } from "./TouchTheSunshine";

import { IBill } from "./IBill";

class Abill<IBill> { }

export default class LegistationTracking extends React.Component<ILegistationTrackingProps, ILegistationTrackingStates> {
  constructor(props: any) {
    super(props);
    /* this.onChange_bill = this.onChange_bill.bind(this);
    this.onChange_billNumber = this.onChange_billNumber.bind(this);
    this.onChange_billChamber = this.onChange_billChamber.bind(this);
    this.onChange_billDateIntroduced = this.onChange_billDateIntroduced.bind(this);
    this.onChange_billOutcome = this.onChange_billOutcome.bind(this);
    this.onChange_billTitle = this.onChange_billTitle.bind(this);
    this.onChange_testBody = this.onChange_testBody.bind(this);
    this.onChange_testId = this.onChange_testId.bind(this);
    this.onChange_testUserId = this.onChange_testUserId.bind(this); */
    this.onChange_billObjArr = this.onChange_billObjArr.bind(this);
    this.state = {
      /* bill: "",
      billNumber: "",
      billChamber: "",
      billDateIntroduced: "",
      billOutcome: "",
      billTitle: "",
      testBody: "",
      testId: 0,
      testUserId: 0, */
      billObjArr: []
    };
  }
  //#region
  /* public onChange_bill(bill: string): void {
    this.setState({ bill });
  }
  public onChange_billNumber(billNumber: string): void {
    this.setState({ billNumber });
  }
  public onChange_billChamber(billChamber: string): void {
    this.setState({ billChamber });
  }
  public onChange_billDateIntroduced(billDateIntroduced: string): void {
    this.setState({ billDateIntroduced });
  }
  public onChange_billOutcome(billOutcome: string): void {
    this.setState({ billOutcome });
  }
  public onChange_billTitle(billTitle: string): void {
    this.setState({ billTitle });
  }
  public onChange_testBody(testBody: string): void {
    this.setState({ testBody });
  }
  public onChange_testId(testId: number): void {
    this.setState({ testId });
  }
  public onChange_testUserId(testUserId: number): void {
    this.setState({ testUserId });
  } */
  public onChange_billObjArr(billObjArr: IBill[]): void {
    this.setState({ billObjArr });
  }
  //#endregion

  public render(): React.ReactElement<ILegistationTrackingProps> {
    /* let bill: string = this.state.bill;
    let billNumber: string = this.state.billNumber;
    let billChamber: string = this.state.billChamber;
    let billDateIntroduced: string = this.state.billDateIntroduced;
    let billOutcome: string = this.state.billOutcome;
    let billTitle: string = this.state.billTitle;
    let testBody: string = this.state.testBody;
    let testId: number = this.state.testId;
    let testUserId: number = this.state.testUserId;*/
    let billObjArr: IBill[] = this.state.billObjArr;
    let httpClient: HttpClient = this.props.httpClient;
    const daBills: JSX.Element[] = this.state.billObjArr.map((indvBill: IBill, i: number): JSX.Element => {
      return (
        <tr>
          <td>{indvBill.title}</td>
          <td>{indvBill.body}</td>
          <td>{indvBill.id}</td>
          <td>{indvBill.userId}</td>
        </tr>
      );
    });

    return (
      <div className={styles.legistationTracking} >
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <p className={styles.description}>{escape(this.props.description)}</p>
              <GetTheSunshine
                httpClient={httpClient}
                /*bill={bill} onChange_bill={this.onChange_bill}
                billNumber={billNumber} onChange_billNumber={this.onChange_billNumber}
                billChamber={billChamber} onChange_billChamber={this.onChange_billChamber}
                billDateIntroduced={billDateIntroduced} onChange_billDateIntroduced={this.onChange_billDateIntroduced}
                billOutcome={billOutcome} onChange_billOutcome={this.onChange_billOutcome}
                billTitle={billTitle} onChange_billTitle={this.onChange_billTitle}
                testBody={testBody} onChange_testBody={this.onChange_testBody}
                testId={testId} onChange_testId={this.onChange_testId}
                testUserId={testUserId} onChange_testUserId={this.onChange_testUserId} */
                billObjArr={billObjArr} onChange_billObjArr={this.onChange_billObjArr}
              />
              <table>
                <tr>
                  <td>Title</td>
                  <td>Body</td>
                  <td>Id</td>
                  <td>UserId</td>
                </tr>
                {daBills}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
