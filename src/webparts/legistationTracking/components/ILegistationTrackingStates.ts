import { IBill } from "./IBill";

export interface ILegistationTrackingStates {
    bill?: string;
    billNumber?: string;
    billChamber?: string;
    billDateIntroduced?: string;
    billOutcome?: string;
    billTitle?: string;
    testBody?: string;
    testId?: number;
    testUserId?: number;
    billObjArr?: IBill[];
}