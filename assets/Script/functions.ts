function delay(dt: number) {
    let ms = dt * 1000;
    return new Promise(resolve => setTimeout(resolve, ms));
}

function loadResAsync<T>(path: string, completeCallback?: (error: Error, resource: any) => void) {

    let p = new Promise<T>((r, j) => {

        cc.loader.loadRes(path, (err, res) => {

            completeCallback && completeCallback(err,res);
            
            r(res);

        });

    });
    return p;
}

export { delay, loadResAsync }
