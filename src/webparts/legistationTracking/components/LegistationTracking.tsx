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
  private listItemEntityTypeName: string = undefined;
  constructor(props: any) {
    super(props);
    this.onChange_billObjArr = this.onChange_billObjArr.bind(this);
    this.onChange_status = this.onChange_status.bind(this);
    this.state = {
      billObjArr: [],
      status: this.listNotConfigured(this.props) ? "Please configure list in Web Part properties" : "Ready"
    };
  }
  public componentWillReceiveProps(nextProps: ILegistationTrackingProps): void {
    this.listItemEntityTypeName = undefined;
    this.setState({
      status: this.listNotConfigured(nextProps) ? "Please configure list in Web Part properties" : "Ready"
    });
  }
  public onChange_billObjArr(billObjArr: IBill[]): void {
    this.setState({ billObjArr });
  }
  public onChange_status(status: string): void {
    this.setState({ status });
  }

  public render(): React.ReactElement<ILegistationTrackingProps> {
    let billObjArr: IBill[] = this.state.billObjArr;
    let status: string = this.state.status;
    let httpClient: HttpClient = this.props.httpClient;
    let listName: string = this.props.listName;
    let spHttpClient: SPHttpClient = this.props.spHttpClient;
    let siteUrl: string = this.props.siteUrl;
    let relativeUrl: string = this.props.relativeUrl;
    let legYear: number = this.props.legYear;
    const daBills: JSX.Element[] = this.state.billObjArr.map((indvBill: IBill, i: number): JSX.Element => {
      return (
        <tr>
          <td>{indvBill.title}</td>
          <td>{indvBill.number}</td>
        </tr>
      );
    });

    return (
      <div className={styles.legistationTracking} >
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <p className={styles.description}>{escape(this.props.description)}</p>
              <div>{this.state.status}</div>
              <div>&nbsp;</div>
              <GetTheSunshine
                httpClient={httpClient}
                billObjArr={billObjArr} onChange_billObjArr={this.onChange_billObjArr}
                legYear={legYear}
                status={status} onChange_status={this.onChange_status}
              />
              <table>
                <tr>
                  <td>Title</td>
                  <td>Number</td>
                </tr>
                {daBills}
              </table>
              <TouchTheSunshine
                listName={listName}
                spHttpClient={spHttpClient}
                siteUrl={siteUrl}
                relativeUrl={relativeUrl}
                billObjArr={billObjArr}
                status={status} onChange_status={this.onChange_status}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  private listNotConfigured(props: ILegistationTrackingProps): boolean {
    return props.listName === undefined ||
      props.listName === null ||
      props.listName.length === 0;
  }
}
