import * as React from 'react';
import { IGetTheSunshineProps } from './IGetTheSunshineProps';

export default class GetTheSunshine extends React.Component<IGetTheSunshineProps, {}> {
    private GetSunshine(): void {
        let p1 =  new Promise<string>((resolve: (itemId: string) => void, reject: (error: any) => void): void => {
            const xhr = new XMLHttpRequest();
            const url = 'http://api.richmondsunlight.com/1.0/bills/2018.json'
            xhr.open("GET", url);
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        });
        p1.then((response) => {
            return response.json();
        })
    }

    render() {
        return (
            <div>
                <input value={this.GetSunshine()}></input>
            </div>
        )
    }
}