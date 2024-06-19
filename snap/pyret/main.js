

var world;
window.onload = function () {
    var ide = new IDE_Morph({
            // load: 'snap-test.xml',
        }),
        code = document.getElementById('code'),
        save = document.getElementById('save'),
        load = document.getElementById('load'),
        radio = document.querySelectorAll('input[name="pl"]'),
        loop = () => {
            requestAnimationFrame(loop);
            world.doOneCycle();
        };
    world = new WorldMorph(document.getElementById('world'), false);
    ide.openIn(world);
    ide.addMessageListener('update', txt => code.value = txt);
    save.addEventListener('click', () => ide.saveXMLAs(
        // ide.getProjectXML(), 'snap-scripts'));
        ide.getSpriteScriptsXML(), 'snap-scripts'));
    clear.addEventListener('click', () =>
        ide.loadSpriteScriptsXML('<>'));
    load.addEventListener("change", () => {
        var frd = new FileReader();
        if (!load.files[0]) {return; }
        frd.onloadend = (e) =>
            ide.loadSpriteScriptsXML(e.target.result);
            // ide.loadProjectXML(e.target.result);
        frd.readAsText(load.files[0]);
    });
    radio.forEach(bt => bt.addEventListener('click', () =>
        ide.broadcast(bt.value)));
    code.onmouseup = function () {
        var ln = n => this.value.substr(0, n).split('\n').length;
        ide.unflashSpriteScripts();
        if (this.selectionStart < this.selectionEnd) {
            ide.flashSpriteScripts(
                ln(this.selectionStart),
                ln(this.selectionEnd),
                null, // optional sprite name
                null // '200,100,130' // optional rgb(a) color csv
            );

            /*
            // alternatively: highlight the block at the
            // selection start idx
            ide.flashSpriteScriptAt(
                this.selectionStart,
                null, // optional sprite name
                null // '200,100,130' // optional rgb(a) color csv
            );
            */

            /*
            // highlight the outline of block at the
            // selection start idx
            ide.flashSpriteScriptOutlineAt(
                this.selectionStart,
                null, // optional sprite name
                '200,100,130', // optional rgb(a) color csv
                3 // border
            );
            */

            /*
            // apop-up a balloon at the block at the
            // selection start idx
            ide.showScriptBalloonAt(
                'selection:\n' +
                    this.selectionStart +
                    ' - ' +
                    this.selectionEnd,
                this.selectionStart,
                null, // optional sprite name
            );
            */
        }
    };
    requestAnimationFrame(loop);
};