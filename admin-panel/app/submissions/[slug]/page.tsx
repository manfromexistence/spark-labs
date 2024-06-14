// import Head from 'next/head';
// import Script from 'next/script';
// import "./style.css";

// export default function Page({ params }: { params: { slug: string } }) {
//     return (
//         <>
//             {/* <Head>
//                 <title>Snap! Build Your Own Blocks</title>
//                 <link rel="icon" href="/snap/favicon.ico" type="image/x-icon" />
//                 <link rel="manifest" href="/snap/manifest.json" />
//                 <link rel="apple-touch-icon" href="/snap/snap-icon-152.png" />
//                 <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
//                 <meta name="viewport" content="width=device-width, initial-scale=1" />
//                 <meta name="theme-color" content="white" />
//                 <meta name="apple-mobile-web-app-capable" content="yes" />
//                 <meta name="apple-mobile-web-app-status-bar-style" content="black" />
//                 <meta name="apple-mobile-web-app-title" content="Snap!" />
//                 <meta name="msapplication-TileImage" content="/snap/snap-icon-144.png" />
//                 <meta name="msapplication-TileColor" content="#FFFFFF" />
//                 <Script strategy="beforeInteractive" src="/snap/morphic.js?version=2024-03-01"></script>
//                 <Script strategy="beforeInteractive" src="/snap/symbols.js?version=2024-01-24"></script>
//                 <Script strategy="beforeInteractive" src="/snap/widgets.js?version=2023-05-24"></script>
//                 <Script strategy="beforeInteractive" src="/snap/blocks.js?version=2024-06-04"></script>
//                 <Script strategy="beforeInteractive" src="/snap/threads.js?version=2024-04-17"></script>
//                 <Script strategy="beforeInteractive" src="/snap/objects.js?version=2024-01-15"></script>
//                 <Script strategy="beforeInteractive" src="/snap/scenes.js?version=2022-10-29"></script>
//                 <Script strategy="beforeInteractive" src="/snap/gui.js?version=2024-06-04"></script>
//                 <Script strategy="beforeInteractive" src="/snap/paint.js?version=2023-05-24"></script>
//                 <Script strategy="beforeInteractive" src="/snap/lists.js?version=2024-04-05"></script>
//                 <Script strategy="beforeInteractive" src="/snap/byob.js?version=2024-04-17"></script>
//                 <Script strategy="beforeInteractive" src="/snap/tables.js?version=2023-07-05"></script>
//                 <Script strategy="beforeInteractive" src="/snap/sketch.js?version=2023-05-24"></script>
//                 <Script strategy="beforeInteractive" src="/snap/video.js?version=2019-06-27"></script>
//                 <Script strategy="beforeInteractive" src="/snap/maps.js?version=2021-06-15"></script>
//                 <Script strategy="beforeInteractive" src="/snap/extensions.js?version=2024-02-13"></script>
//                 <Script strategy="beforeInteractive" src="/snap/xml.js?version=2021-07-05"></script>
//                 <Script strategy="beforeInteractive" src="/snap/store.js?version=2023-07-27"></script>
//                 <Script strategy="beforeInteractive" src="/snap/locale.js?version=2024-06-04"></script>
//                 <Script strategy="beforeInteractive" src="/snap/cloud.js?version=2023-04-12"></script>
//                 <Script strategy="beforeInteractive" src="/snap/api.js?version=2024-02-22"></script>
//                 <Script strategy="beforeInteractive" src="/snap/sha512.js?version=2019-06-27"></script>
//                 <Script strategy="beforeInteractive" src="/snap/FileSaver.min.js?version=2019-06-27"></script>

//             </Head> */}
//             <Script strategy="beforeInteractive" strategy='lazyOnload' id="world-script">
//                 {`console.log("Sumon")`}
//             </Script>
//             {/* <Script strategy="beforeInteractive" strategy='beforeInteractive' src="/main.js" /> */}
//             {/* <canvas id="world" tabIndex={1} style={{ position: 'absolute' }}></canvas> */}
//         </>
//     );
// }
"use client";
import { useEffect } from 'react';
import Script from 'next/script';
import "./style.css";

export default function Page({ params }: { params: { slug: string } }) {

    useEffect(() => {


        console.log("Op")
    }, []);
    return (<>


        <Script strategy="beforeInteractive" src="/snap/morphic.js" />
        <Script strategy="beforeInteractive" src="/snap/symbols.js" />
        <Script strategy="beforeInteractive" src="/snap/widgets.js" />
        <Script strategy="beforeInteractive" src="/snap/blocks.js" />
        <Script strategy="beforeInteractive" src="/snap/threads.js" />
        <Script strategy="beforeInteractive" src="/snap/objects.js" />
        <Script strategy="beforeInteractive" src="/snap/scenes.js" />
        <Script strategy="beforeInteractive" src="/snap/gui.js" />
        <Script strategy="beforeInteractive" src="/snap/paint.js" />
        <Script strategy="beforeInteractive" src="/snap/lists.js" />
        <Script strategy="beforeInteractive" src="/snap/byob.js" />
        <Script strategy="beforeInteractive" src="/snap/tables.js" />
        <Script strategy="beforeInteractive" src="/snap/sketch.js" />
        <Script strategy="beforeInteractive" src="/snap/video.js" />
        <Script strategy="beforeInteractive" src="/snap/maps.js" />
        <Script strategy="beforeInteractive" src="/snap/extensions.js" />
        <Script strategy="beforeInteractive" src="/snap/xml.js" />
        <Script strategy="beforeInteractive" src="/snap/store.js" />
        <Script strategy="beforeInteractive" src="/snap/locale.js" />
        <Script strategy="beforeInteractive" src="/snap/cloud.js" />
        <Script strategy="beforeInteractive" src="/snap/api.js" />
        <Script strategy="beforeInteractive" src="/snap/sha512.js" />
        <Script strategy="beforeInteractive" src="/snap/FileSaver.min.js" />

        <Script strategy="beforeInteractive" src="/qqqq.js" />
        {/* <Script strategy="beforeInteractive" id="world-script">
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
        </Script> */}
        {/* <div>My Post: {params.slug}</div> */}
        <canvas id="world" tabIndex={1} style={{ position: 'absolute' }}></canvas>
    </>)
}
