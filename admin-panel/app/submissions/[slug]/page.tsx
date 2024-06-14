"use client"

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import "./style.css";

const scripts = [
    "/snap/morphic.js",
    "/snap/symbols.js",
    "/snap/widgets.js",
    "/snap/blocks.js",
    "/snap/threads.js",
    "/snap/objects.js",
    "/snap/scenes.js",
    "/snap/gui.js",
    "/snap/paint.js",
    "/snap/lists.js",
    "/snap/byob.js",
    "/snap/tables.js",
    "/snap/sketch.js",
    "/snap/video.js",
    "/snap/maps.js",
    "/snap/extensions.js",
    "/snap/xml.js",
    "/snap/store.js",
    "/snap/locale.js",
    "/snap/cloud.js",
    "/snap/api.js",
    "/snap/sha512.js",
    "/snap/FileSaver.min.js"
];

export default function Page({ params }: { params: { slug: string } }) {
    const worldRef = useRef<HTMLCanvasElement | null>(null);
    let lastTime = 0;

    useEffect(() => {
        document.title = `Spark Labs Workspace(${params.slug})`;
        if (worldRef.current) {
            const world = new WorldMorph(worldRef.current);
            new IDE_Morph().openIn(world);

            const loop = (timestamp: number) => {
                requestAnimationFrame(loop);
                if (timestamp - lastTime < 1000 / 67) {
                    return;
                }
                world.doOneCycle();
                lastTime = Math.max(
                    lastTime + 1000 / 67,
                    timestamp - 1000 / 67
                );
            };

            requestAnimationFrame(loop);
        }
    }, []);

    return (
        <>
            {scripts.map((src, index) => (
                <Script key={index} strategy="beforeInteractive" src={src} />
            ))}
            {/* <div>My Post: {params.slug}</div> */}
            <canvas id="world" tabIndex={1} style={{ position: 'absolute' }} ref={worldRef}></canvas>
        </>
    )
}



// import { useEffect } from 'react';
// import Script from 'next/script';
// import "./style.css";

// const scripts = [
// "/snap/morphic.js",
// "/snap/symbols.js",
// "/snap/widgets.js",
// "/snap/blocks.js",
// "/snap/threads.js",
// "/snap/objects.js",
// "/snap/scenes.js",
// "/snap/gui.js",
// "/snap/paint.js",
// "/snap/lists.js",
// "/snap/byob.js",
// "/snap/tables.js",
// "/snap/sketch.js",
// "/snap/video.js",
// "/snap/maps.js",
// "/snap/extensions.js",
// "/snap/xml.js",
// "/snap/store.js",
// "/snap/locale.js",
// "/snap/cloud.js",
// "/snap/api.js",
// "/snap/sha512.js",
// "/snap/FileSaver.min.js"
// ];

// export default function Page({ params }: { params: { slug: string } }) {
// useEffect(() => {
//     console.log("Op")
// }, []);

// return (
//     <>
//         {scripts.map((src, index) => (
//             <Script key={index} strategy="beforeInteractive" src={src} />
//         ))}
//         <div>My Post: {params.slug}</div>
//         <canvas id="world" tabIndex={1} style={{ position: 'absolute' }}></canvas>
//     </>
// )
// }
