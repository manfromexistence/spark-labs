import Head from 'next/head';
import Script from 'next/script';
import "./style.css";

export default function Page({ params }: { params: { slug: string } }) {
    return (
        <>
            {/* <Head>
                <title>Snap! Build Your Own Blocks</title>
                <link rel="icon" href="/snap/favicon.ico" type="image/x-icon" />
                <link rel="manifest" href="/snap/manifest.json" />
                <link rel="apple-touch-icon" href="/snap/snap-icon-152.png" />
                <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="white" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black" />
                <meta name="apple-mobile-web-app-title" content="Snap!" />
                <meta name="msapplication-TileImage" content="/snap/snap-icon-144.png" />
                <meta name="msapplication-TileColor" content="#FFFFFF" />
                <script src="/snap/morphic.js?version=2024-03-01"></script>
                <script src="/snap/symbols.js?version=2024-01-24"></script>
                <script src="/snap/widgets.js?version=2023-05-24"></script>
                <script src="/snap/blocks.js?version=2024-06-04"></script>
                <script src="/snap/threads.js?version=2024-04-17"></script>
                <script src="/snap/objects.js?version=2024-01-15"></script>
                <script src="/snap/scenes.js?version=2022-10-29"></script>
                <script src="/snap/gui.js?version=2024-06-04"></script>
                <script src="/snap/paint.js?version=2023-05-24"></script>
                <script src="/snap/lists.js?version=2024-04-05"></script>
                <script src="/snap/byob.js?version=2024-04-17"></script>
                <script src="/snap/tables.js?version=2023-07-05"></script>
                <script src="/snap/sketch.js?version=2023-05-24"></script>
                <script src="/snap/video.js?version=2019-06-27"></script>
                <script src="/snap/maps.js?version=2021-06-15"></script>
                <script src="/snap/extensions.js?version=2024-02-13"></script>
                <script src="/snap/xml.js?version=2021-07-05"></script>
                <script src="/snap/store.js?version=2023-07-27"></script>
                <script src="/snap/locale.js?version=2024-06-04"></script>
                <script src="/snap/cloud.js?version=2023-04-12"></script>
                <script src="/snap/api.js?version=2024-02-22"></script>
                <script src="/snap/sha512.js?version=2019-06-27"></script>
                <script src="/snap/FileSaver.min.js?version=2019-06-27"></script>

            </Head> */}
            <Script id="world-script">
                {`
    let world;
    window.onload = function () {
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
            navigator.serviceWorker.register('sw.js');
        }
        world = new WorldMorph(document.getElementById('world'));
        new IDE_Morph().openIn(world);
        requestAnimationFrame(loop);
    };
`}
            </Script>
            <canvas id="world" tabIndex={1} style={{ position: 'absolute' }}></canvas>
        </>
    );
}
