import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";

import * as strings from "LegistationTrackingWebPartStrings";
import LegistationTracking from "./components/LegistationTracking";
import { ILegistationTrackingProps } from "./components/ILegistationTrackingProps";

export interface ILegistationTrackingWebPartProps {
  description: string;
  listName: string;
  legYear: number;
}

export default class LegistationTrackingWebPart extends BaseClientSideWebPart<ILegistationTrackingWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ILegistationTrackingProps > = React.createElement(
      LegistationTracking,
      {
        description: this.properties.description,
        httpClient: this.context.httpClient,
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        relativeUrl: this.context.pageContext.web.serverRelativeUrl,
        listName: this.properties.listName,
        legYear: this.properties.legYear
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField("legYear",{
                  label: strings.LegYearFieldLabel
                }),
                PropertyPaneTextField("listName", {
                  label: strings.ListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
