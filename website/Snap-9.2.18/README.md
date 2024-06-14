<Script strategy="beforeInteractive" src="./snap/morphic.js?version=2024-03-01" />
<Script strategy="beforeInteractive" src="./snap/symbols.js?version=2024-01-24" />
<Script strategy="beforeInteractive" src="./snap/widgets.js?version=2023-05-24" />
<Script strategy="beforeInteractive" src="./snap/blocks.js?version=2024-06-04" />
<Script strategy="beforeInteractive" src="./snap/threads.js?version=2024-04-17" />
<Script strategy="beforeInteractive" src="./snap/objects.js?version=2024-01-15" />
<Script strategy="beforeInteractive" src="./snap/scenes.js?version=2022-10-29" />
<Script strategy="beforeInteractive" src="./snap/gui.js?version=2024-06-04" />
<Script strategy="beforeInteractive" src="./snap/paint.js?version=2023-05-24" />
<Script strategy="beforeInteractive" src="./snap/lists.js?version=2024-04-05" />
<Script strategy="beforeInteractive" src="./snap/byob.js?version=2024-04-17" />
<Script strategy="beforeInteractive" src="./snap/tables.js?version=2023-07-05" />
<Script strategy="beforeInteractive" src="./snap/sketch.js?version=2023-05-24" />
<Script strategy="beforeInteractive" src="./snap/video.js?version=2019-06-27" />
<Script strategy="beforeInteractive" src="./snap/maps.js?version=2021-06-15" />
<Script strategy="beforeInteractive" src="./snap/extensions.js?version=2024-02-13" />
<Script strategy="beforeInteractive" src="./snap/xml.js?version=2021-07-05" />
<Script strategy="beforeInteractive" src="./snap/store.js?version=2023-07-27" />
<Script strategy="beforeInteractive" src="./snap/locale.js?version=2024-06-04" />
<Script strategy="beforeInteractive" src="./snap/cloud.js?version=2023-04-12" />
<Script strategy="beforeInteractive" src="./snap/api.js?version=2024-02-22" />
<Script strategy="beforeInteractive" src="./snap/sha512.js?version=2019-06-27" />
<Script strategy="beforeInteractive" src="./snap/FileSaver.min.js?version=2019-06-27" />

        // let world:any,WorldMorph:any,IDE_Morph:any;
        // let FPS:any = 67,
        //     lastTime = 0,

        // loop = (timestamp:any) => {
        //     requestAnimationFrame(loop);
        //     if (timestamp - lastTime < 1000 / FPS) {
        //         return;
        //     }
        //     world.doOneCycle();
        //     lastTime = Math.max(
        //         lastTime + 1000 / FPS,
        //         timestamp - 1000 / FPS
        //     );
        // };

        // if ('serviceWorker' in navigator) {
        //     navigator.serviceWorker.register('/sw.js');
        // }
        // world = new WorldMorph(document.getElementById('world'));
        // new IDE_Morph().openIn(world);
        // requestAnimationFrame(loop);


                    <Script strategy="beforeInteractive" id="world-script">
                {`
                    let world;
                    let FPS = 67,
                        lastTime = 0,
        
                    loop = (timestamp) => {
                        requestAnimationFrame(loop);
                        if (timestamp - lastTime < 1000 / FPS) {
                            return;
                        }
                        world.doOneCycle();
                        lastTime = Math.max(
                            lastTime + 1000 / FPS,
                            timestamp - 1000 / FPS
                        );
                    };
        
                    if ('serviceWorker' in navigator) {
                        navigator.serviceWorker.register('/sw.js');
                    }
                    world = new WorldMorph(document.getElementById('world'));
                    new IDE_Morph().openIn(world);
                    requestAnimationFrame(loop);
                `}
            </Script>