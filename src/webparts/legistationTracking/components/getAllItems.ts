import { sp, List } from 'sp-pnp-js';

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

const list = sp.web.getList('/sites/dev-a/Lists/MyList');
let tickCallback = (chunk: any[], data: any[]) => {
    // Can tick progress in the UI
    console.log(`Id: ${chunk[chunk.length - 1].Id}, retrived: ${data.length}`);
};
getAllItems(list, 'Id,Title', tickCallback).then(console.log).catch(console.log);