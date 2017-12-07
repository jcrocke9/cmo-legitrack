import HttpClient from "@microsoft/sp-http/lib/httpClient/HttpClient";

export interface IGetTheSunshineProps {
    httpClient?: HttpClient;
    bill: string;
    onChange_bill(bill: string): any;
    billNumber?: string;
    onChange_billNumber(billNumber: string): any;
    billChamber?: string;
    onChange_billChamber(billChamber: string): any;
    billDateIntroduced?: string;
    onChange_billDateIntroduced(billDateIntroduced: string): any;
    billOutcome?: string;
    onChange_billOutcome(billOutcome: string): any;
    billTitle?: string;
    onChange_billTitle(billTitle: string): any;
    testBody?: string;
    onChange_testBody(testBody: string): any;
    testId?: number;
    onChange_testId(testId: number): any;
    testUserId?: number;
    onChange_testUserId(testUserId: number): any;
  }