/*

    gui.js

    a programming environment
    based on morphic.js, blocks.js, threads.js and objects.js
    inspired by Scratch

    written by Jens Mönig
    jens@moenig.org

    Copyright (C) 2024 by Jens Mönig

    This file is part of Snap!.

    Snap! is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of
    the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


    prerequisites:
    --------------
    needs blocks.js, threads.js, objects.js, cloud.jus and morphic.js


    toc
    ---
    the following list shows the order in which all constructors are
    defined. Use this list to locate code in this document:

        IDE_Morph
        ProjectDialogMorph
        LibraryImportDialogMorph
        SpriteIconMorph
        TurtleIconMorph
        CostumeIconMorph
        WardrobeMorph
        SoundIconMorph
        JukeboxMorph
        SceneIconMorph
        SceneAlbumMorph
        StageHandleMorph
        PaletteHandleMorph
        CamSnapshotDialogMorph
        SoundRecorderDialogMorph


    credits
    -------
    Nathan Dinsmore contributed saving and loading of projects,
    ypr-Snap! project conversion and countless bugfixes
    Ian Reynolds contributed handling and visualization of sounds
    Michael Ball contributed the LibraryImportDialogMorph and countless
    utilities to load libraries from relative urls
    Bernat Romagosa contributed more things than I can mention,
    including interfacing to the camera and microphone

*/

/*global modules, Morph, SpriteMorph, SyntaxElementMorph, Color, Cloud, Audio,
ListWatcherMorph, TextMorph, newCanvas, useBlurredShadows, Sound, Scene, Note,
StringMorph, Point, MenuMorph, morphicVersion, DialogBoxMorph, BlockEditorMorph,
ToggleButtonMorph, contains, ScrollFrameMorph, StageMorph, PushButtonMorph, sb,
InputFieldMorph, FrameMorph, Process, nop, SnapSerializer, ListMorph, detect,
AlignmentMorph, TabMorph, Costume, MorphicPreferences,BlockMorph, ToggleMorph,
InputSlotDialogMorph, ScriptsMorph, isNil, SymbolMorph, fontHeight, localize,
BlockExportDialogMorph, BlockImportDialogMorph, SnapTranslator, List, ArgMorph,
Uint8Array, HandleMorph, SVG_Costume, TableDialogMorph, CommentMorph, saveAs,
CommandBlockMorph, BooleanSlotMorph, RingReporterSlotMorph, ScriptFocusMorph,
BlockLabelPlaceHolderMorph, SpeechBubbleMorph, XML_Element, WatcherMorph, WHITE,
BlockRemovalDialogMorph,TableMorph, isSnapObject, isRetinaEnabled, SliderMorph,
disableRetinaSupport, enableRetinaSupport, isRetinaSupported, MediaRecorder,
Animation, BoxMorph, BlockDialogMorph, RingMorph, Project, ZERO, WHITE,
BlockVisibilityDialogMorph, ThreadManager, isString, SnapExtensions, snapEquals
*/

/*jshint esversion: 8*/

// Global stuff ////////////////////////////////////////////////////////

modules.gui = '2024-June-04';

// Declarations

var SnapVersion = '9.2.18';

var IDE_Morph;
var ProjectDialogMorph;
var LibraryImportDialogMorph;
var SpriteIconMorph;
var CostumeIconMorph;
var TurtleIconMorph;
var WardrobeMorph;
var SoundIconMorph;
var JukeboxMorph;
var SceneIconMorph;
var SceneAlbumMorph;
var StageHandleMorph;
var PaletteHandleMorph;
var CamSnapshotDialogMorph;
var SoundRecorderDialogMorph;

// IDE_Morph ///////////////////////////////////////////////////////////

// I am SNAP's top-level frame, the Editor window

// IDE_Morph inherits from Morph:

IDE_Morph.prototype = new Morph();
IDE_Morph.prototype.constructor = IDE_Morph;
IDE_Morph.uber = Morph.prototype;

// IDE_Morph preferences settings and skins

IDE_Morph.prototype.setDefaultDesign = function () {
    MorphicPreferences.isFlat = false;
    SpriteMorph.prototype.paletteColor = new Color(251, 251, 251);;
    SpriteMorph.prototype.paletteTextColor = new Color(0, 0, 0);
    StageMorph.prototype.paletteTextColor
        = SpriteMorph.prototype.paletteTextColor;
    StageMorph.prototype.paletteColor = SpriteMorph.prototype.paletteColor;
    SpriteMorph.prototype.sliderColor
        = SpriteMorph.prototype.paletteColor.lighter(30);

    IDE_Morph.prototype.buttonContrast = 30;
    IDE_Morph.prototype.backgroundColor = new Color(10, 10, 10);
    IDE_Morph.prototype.frameColor = SpriteMorph.prototype.paletteColor;

    IDE_Morph.prototype.groupColor
        = SpriteMorph.prototype.paletteColor.lighter(5);
    IDE_Morph.prototype.sliderColor = SpriteMorph.prototype.sliderColor;
    IDE_Morph.prototype.buttonLabelColor = BLACK;
    IDE_Morph.prototype.tabColors = [
        IDE_Morph.prototype.groupColor.darker(50),
        IDE_Morph.prototype.groupColor.darker(25),
        IDE_Morph.prototype.groupColor
    ];
    IDE_Morph.prototype.rotationStyleColors = IDE_Morph.prototype.tabColors;
    IDE_Morph.prototype.appModeColor = FOREGROUND;
    IDE_Morph.prototype.scriptsPaneTexture = this.scriptsTexture();
    IDE_Morph.prototype.padding = 1;

    SpriteIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
    CostumeIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
    SoundIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
    TurtleIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
    SceneIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;

    SyntaxElementMorph.prototype.contrast = 65;
    ScriptsMorph.prototype.feedbackColor = BLACK;
};

IDE_Morph.prototype.setFlatDesign = function () {
    MorphicPreferences.isFlat = true;
    SpriteMorph.prototype.paletteColor = FOREGROUND;
    SpriteMorph.prototype.paletteTextColor = BLACK;
    StageMorph.prototype.paletteTextColor
        = SpriteMorph.prototype.paletteTextColor;
    StageMorph.prototype.paletteColor = SpriteMorph.prototype.paletteColor;
    SpriteMorph.prototype.sliderColor = SpriteMorph.prototype.paletteColor;

    IDE_Morph.prototype.buttonContrast = 30;
    IDE_Morph.prototype.backgroundColor = BLACK;
    IDE_Morph.prototype.frameColor = FOREGROUND;

    IDE_Morph.prototype.groupColor = FOREGROUND;
    IDE_Morph.prototype.sliderColor = SpriteMorph.prototype.sliderColor;
    IDE_Morph.prototype.buttonLabelColor = BLACK;
    IDE_Morph.prototype.tabColors = [
        IDE_Morph.prototype.frameColor,
        IDE_Morph.prototype.frameColor.lighter(50),
        IDE_Morph.prototype.groupColor
    ];
    IDE_Morph.prototype.rotationStyleColors = IDE_Morph.prototype.tabColors;
    IDE_Morph.prototype.appModeColor = IDE_Morph.prototype.frameColor;
    IDE_Morph.prototype.scriptsPaneTexture = null;
    IDE_Morph.prototype.padding = 1;

    SpriteIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
    CostumeIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
    SoundIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
    TurtleIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
    SceneIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;

    SyntaxElementMorph.prototype.contrast = 25;
    ScriptsMorph.prototype.feedbackColor = new Color(153, 255, 213);
};

IDE_Morph.prototype.scriptsTexture = function () {
    var pic = newCanvas(new Point(100, 100)), // bigger scales faster
        ctx = pic.getContext('2d'),
        i;
    for (i = 0; i < 100; i += 4) {
        ctx.fillStyle = this.frameColor.toString();
        ctx.fillRect(i, 0, 1, 100);
        ctx.fillStyle = this.groupColor.lighter(2).toString();
        ctx.fillRect(i + 1, 0, 1, 100);
        ctx.fillRect(i + 3, 0, 1, 100);
        ctx.fillStyle = this.groupColor.darker(2).toString();
        ctx.fillRect(i + 2, 0, 1, 100);
    }
    return pic;
};

IDE_Morph.prototype.setDefaultDesign();

// IDE_Morph instance creation:

function IDE_Morph(config = {}) {
    this.init(config);
}

/*
    Configuring the IDE for specialized uses, e.g. as DSL inside another IDE
    can be achieved by passing in an optional configuration dictionary when
    creating an instance. This is still very much under construction. Currently
    the following options are available:

        noAutoFill      bool, do not let the IDE fill the whole World canvas
        path            str, path to additional resources (translations)
        load:           str, microworld file name (xml)
        onload:         callback, called when the microworld is loaded
        design:         str, currently "flat" (bright) or "classic" (dark)
        border:         num, pixels surrounding the IDE, default is none (zero)
        lang:           str, translation to be used, e.g. "de" for German
        mode:           str, currently "presentation" or "edit"
        hideControls:   bool, hide/show the tool bar
        hideCategories: bool, hide/show the palette block category buttons
        noDefaultCat:   bool, hide/show the buit-in bloc category buttons
        noSpriteEdits:  bool, hide/show the corral & sprite controls/menus
        noSprites:      bool, hide/show the stage, corral, sprite editor
        noPalette:      bool, hide/show the palette including the categories
        noImports:      bool, disable/allow importing files via drag&drop
        noOwnBlocks:    bool, hider/show "make a block" and "make a category"
        noRingify:      bool, disable/enable "ringify"/"unringify" in ctx menu
        noUserSettings: bool, disable/enable persistent user preferences
        noDevWarning:   bool, ignore development version incompatibility warning
        noExitWarning:  bool, do not show a browser warning when closing the IDE
                                with unsaved changes
        preserveTitle:  bool, do not set the tab title dynamically to reflect
                                the current Snap! version
        blocksZoom:     num, zoom factor for blocks, e.g. 1.5
        blocksFade:     num, fading percentage for blocks, e.g. 85
        zebra:          num, contrast percentage for nesting same-color blocks

    Note that such configurations will not affect the user's own preference
    settings, e.g. configuring the blocks zoom or language will not overwrite
    the user's own settings which are kept in localstorage.
*/

IDE_Morph.prototype.init = function (config) {
    // global font setting
    MorphicPreferences.globalFontFamily = 'Helvetica, Arial';

    // additional properties:
    this.cloud = new Cloud();
    this.cloudMsg = null;
    this.source = null;
    this.serializer = new SnapSerializer();
    this.config = config;
    this.version = Date.now(); // for outside observers

    // restore saved user preferences
    this.userLanguage = null; // user language preference for startup
    this.applySavedSettings();

    // scenes
    this.scenes = new List([new Scene()]);
    this.scene = this.scenes.at(1);
    this.isAddingScenes = false;
    this.isAddingNextScene = false;

    // editor
    this.globalVariables = this.scene.globalVariables;
    this.currentSprite = this.scene.addDefaultSprite();
    this.sprites = this.scene.sprites;
    this.currentCategory = this.scene.unifiedPalette ? 'unified' : 'motion';
    this.currentTab = 'scripts';

    // logoURL is disabled because the image data is hard-copied
    // to avoid tainting the world canvas
    // this.logoURL = this.resourceURL('src', 'snap_logo_sm.png');

    this.logo = null;
    this.controlBar = null;
    this.categories = null;
    this.palette = null;
    this.paletteHandle = null;
    this.spriteBar = null;
    this.spriteEditor = null;
    this.stage = null;
    this.stageHandle = null;
    this.corralBar = null;
    this.corral = null;

    this.embedPlayButton = null;
    this.embedOverlay = null;
    this.isEmbedMode = false;

    this.isAutoFill = !config.noAutoFill;
    this.isAppMode = false;
    this.isSmallStage = false;
    this.filePicker = null;

    // incrementally saving projects to the cloud is currently unused
    // and needs to be extended to work with scenes before reactivation
    this.hasChangedMedia = false;

    this.isAnimating = true;
    this.paletteWidth = 200; // initially same as logo width
    this.stageRatio = 1; // for IDE animations, e.g. when zooming

    this.wasSingleStepping = false; // for toggling to and from app mode

    this.loadNewProject = false; // flag when starting up translated
    this.shield = null;

    this.savingPreferences = true; // for bh's infamous "Eisenbergification"

    this.bulkDropInProgress = false; // for handling multiple file-drops
    this.cachedSceneFlag = null; // for importing multiple scenes at once
    this.isImportingLocalFile = false; // for handling imports of smart pics

    // initialize inherited properties:
    IDE_Morph.uber.init.call(this);

    // override inherited properites:
    this.color = this.backgroundColor;
};

IDE_Morph.prototype.openIn = function (world) {
    var hash, myself = this;

    window.onmessage = function (event) {
        // make the API accessible from outside an iframe
        var ide = myself;
        if (!isNil(event.data.selector)) {
            window.top.postMessage(
                {
                    selector: event.data.selector,
                    response: ide[event.data.selector].apply(
                        ide,
                        event.data.params
                    )
                },
                '*'
            );
        }
    };

    function initUser(username) {
        sessionStorage.username = username;
        myself.controlBar.cloudButton.refresh();
        if (username) {
            myself.source = 'cloud';
            if (!myself.cloud.verified) {
                new DialogBoxMorph().inform(
                    'Unverified account',
                    'Your account is still unverified.\n' +
                    'Please use the verification link that\n' +
                    'was sent to your email address when you\n' +
                    'signed up.\n\n' +
                    'If you cannot find that email, please\n' +
                    'check your spam folder. If you still\n' +
                    'cannot find it, please use the "Resend\n' +
                    'Verification Email..." option in the cloud\n' +
                    'menu.',
                    world,
                    myself.cloudIcon(null, new Color(0, 180, 0))
                );
            }
        }
    }

    this.buildPanes();
    world.add(this);
    world.userMenu = this.userMenu;

    // override SnapCloud's user message with Morphic
    this.cloud.message = (string) => {
        var m = new MenuMorph(null, string),
            intervalHandle;
        m.popUpCenteredInWorld(world);
        intervalHandle = setInterval(() => {
            m.destroy();
            clearInterval(intervalHandle);
        }, 2000);
    };

    // prevent non-DialogBoxMorphs from being dropped
    // onto the World in user-mode
    world.reactToDropOf = (morph) => {
        if (!(morph instanceof DialogBoxMorph ||
            (morph instanceof MenuMorph))) {
            if (world.hand.grabOrigin) {
                morph.slideBackTo(world.hand.grabOrigin);
            } else {
                world.hand.grab(morph);
            }
        }
    };

    this.reactToWorldResize(world.bounds);

    function applyFlags(dict) {
        if (dict.noCloud) {
            myself.cloud.disable();
        }
        if (dict.embedMode) {
            myself.setEmbedMode();
        }
        if (dict.editMode) {
            myself.toggleAppMode(false);
        } else {
            myself.toggleAppMode(true);
        }
        if (!dict.noRun) {
            autoRun();
        }
        if (dict.hideControls) {
            myself.controlBar.hide();
            window.onbeforeunload = nop;
        }
        if (dict.noExitWarning) {
            window.onbeforeunload = window.cachedOnbeforeunload;
        }
        if (dict.blocksZoom) {
            myself.savingPreferences = false;
            myself.setBlocksScale(Math.max(1, Math.min(dict.blocksZoom, 12)));
            myself.savingPreferences = true;
        }

        // only force my world to get focus if I'm not in embed mode
        // to prevent the iFrame from involuntarily scrolling into view
        if (!myself.isEmbedMode) {
            world.worldCanvas.focus();
        }
    }

    function autoRun() {
        // wait until all costumes and sounds are loaded
        if (isLoadingAssets()) {
            myself.world().animations.push(
                new Animation(nop, nop, 0, 200, nop, autoRun)
            );
        } else {
            myself.runScripts();
        }
    }

    function isLoadingAssets() {
        return myself.sprites.asArray().concat([myself.stage]).some(any =>
            (any.costume ? any.costume.loaded !== true : false) ||
            any.costumes.asArray().some(each => each.loaded !== true) ||
            any.sounds.asArray().some(each => each.loaded !== true)
        );
    }

    // dynamic notifications from non-source text files
    // has some issues, commented out for now
    /*
    this.cloudMsg = getURL('https://snap.berkeley.edu/cloudmsg.txt');
    motd = getURL('https://snap.berkeley.edu/motd.txt');
    if (motd) {
        this.inform('Snap!', motd);
    }
    */

    function interpretUrlAnchors() {
        var dict, idx;

        if (location.hash.substr(0, 6) === '#open:') {
            hash = location.hash.substr(6);
            if (hash.charAt(0) === '%'
                || hash.search(/\%(?:[0-9a-f]{2})/i) > -1) {
                hash = decodeURIComponent(hash);
            }
            if (contains(
                ['project', 'blocks', 'sprites', 'snapdata'].map(each =>
                    hash.substr(0, 8).indexOf(each)
                ),
                1
            )) {
                this.droppedText(hash);
            } else if (hash.match(/\.(png|gif|svg|jpe?g|tiff)$/i)) {
                // Import an image, which could contain embedded scripts
                fetch(hash).then(res => res.blob()).then(blob => {
                    let pic = new Image(),
                        imgURL = URL.createObjectURL(blob),
                        dataMarker = MorphicPreferences.pngPayloadMarker;

                    pic.src = imgURL;
                    pic.onload = (async () => {
                        let buff = new Uint8Array(await blob.arrayBuffer()),
                            strBuff = buff.reduce((acc, b) =>
                                acc + String.fromCharCode(b), ""),
                            hasImportanbleCode = (txt) =>
                                txt.match(
                                    /^<(blocks|block|script|sprite)/i
                                ),
                            embeddedData, canvas;

                        if (strBuff.includes(dataMarker)) {
                            embeddedData = decodeURIComponent(
                                strBuff.split(dataMarker)[1]
                            );
                            if (hasImportanbleCode(embeddedData)) {
                                return this.rawOpenScriptString(
                                    embeddedData,
                                    true
                                );
                            }
                        } else {
                            canvas = newCanvas(
                                new Point(pic.width, pic.height),
                                true
                            );
                            canvas.getContext('2d').drawImage(pic, 0, 0);
                            this.droppedImage(canvas, decodeURIComponent(hash));
                        }
                    })();
                });
            } else {
                idx = hash.indexOf("&");
                if (idx > 0) {
                    dict = myself.cloud.parseDict(hash.substr(idx));
                    dict.editMode = true;
                    hash = hash.slice(0, idx);
                    applyFlags(dict);
                }
                this.shield = new Morph();
                this.shield.alpha = 0;
                this.shield.setExtent(this.parent.extent());
                this.parent.add(this.shield);
                this.showMessage('Fetching project...');

                this.getURL(
                    hash,
                    projectData => {
                        var msg;
                        this.nextSteps([
                            () => msg = this.showMessage('Opening project...'),
                            () => {
                                if (projectData.indexOf('<snapdata') === 0) {
                                    this.rawOpenCloudDataString(projectData);
                                } else if (
                                    projectData.indexOf('<project') === 0
                                ) {
                                    this.rawOpenProjectString(projectData);
                                } else if (
                                    projectData.indexOf('<blocks') === 0
                                ) {
                                    this.rawOpenBlocksString(
                                        projectData,
                                        null, // name, optional
                                        true  // silently
                                    );
                                }
                                this.hasChangedMedia = true;
                            },
                            () => {
                                this.shield.destroy();
                                this.shield = null;
                                msg.destroy();
                                this.toggleAppMode(false);
                            }
                        ]);
                    }
                );
            }
        } else if (location.hash.substr(0, 5) === '#run:') {
            dict = '';
            hash = location.hash.substr(5);

            //decoding if hash is an encoded URI
            if (hash.charAt(0) === '%'
                || hash.search(/\%(?:[0-9a-f]{2})/i) > -1) {
                hash = decodeURIComponent(hash);
            }
            idx = hash.indexOf("&");

            // supporting three URL cases

            // xml project
            if (hash.substr(0, 8) === '<project') {
                this.rawOpenProjectString(
                    hash.slice(0, hash.indexOf('</project>') + 10)
                );
                applyFlags(
                    myself.cloud.parseDict(
                        hash.substr(hash.indexOf('</project>') + 10)
                    )
                );
                // no project, only flags
            } else if (idx == 0) {
                applyFlags(myself.cloud.parseDict(hash));
                // xml file path
                // three path types allowed:
                //  (1) absolute (http...),
                //  (2) relative to site ("/path") or
                //  (3) relative to folder ("path")
            } else {
                this.shield = new Morph();
                this.shield.alpha = 0;
                this.shield.setExtent(this.parent.extent());
                this.parent.add(this.shield);
                this.showMessage('Fetching project...');
                if (idx > 0) {
                    dict = myself.cloud.parseDict(hash.substr(idx));
                    hash = hash.slice(0, idx);
                }
                this.getURL(
                    hash,
                    projectData => {
                        var msg;
                        this.nextSteps([
                            () => msg = this.showMessage('Opening project...'),
                            () => {
                                if (projectData.indexOf('<snapdata') === 0) {
                                    this.rawOpenCloudDataString(projectData);
                                } else if (
                                    projectData.indexOf('<project') === 0
                                ) {
                                    this.rawOpenProjectString(projectData);
                                }
                                this.hasChangedMedia = true;
                            },
                            () => {
                                this.shield.destroy();
                                this.shield = null;
                                msg.destroy();
                                // this.toggleAppMode(true);
                                applyFlags(dict);
                            }
                        ]);
                    }
                );
            }
        } else if (location.hash.substr(0, 9) === '#present:') {
            this.shield = new Morph();
            this.shield.color = this.color;
            this.shield.setExtent(this.parent.extent());
            this.parent.add(this.shield);
            myself.showMessage('Fetching project\nfrom the cloud...');

            // make sure to lowercase the username
            dict = myself.cloud.parseDict(location.hash.substr(9));
            dict.Username = dict.Username.toLowerCase();

            myself.cloud.getPublicProject(
                dict.ProjectName,
                dict.Username,
                projectData => {
                    var msg;
                    myself.nextSteps([
                        () => msg = myself.showMessage('Opening project...'),
                        () => {
                            if (projectData.indexOf('<snapdata') === 0) {
                                myself.rawOpenCloudDataString(projectData);
                            } else if (
                                projectData.indexOf('<project') === 0
                            ) {
                                myself.rawOpenProjectString(projectData);
                            }
                            myself.hasChangedMedia = true;
                        },
                        () => {
                            myself.shield.destroy();
                            myself.shield = null;
                            msg.destroy();
                            applyFlags(dict);
                        }
                    ]);
                },
                this.cloudError()
            );
        } else if (location.hash.substr(0, 7) === '#cloud:') {
            this.shield = new Morph();
            this.shield.alpha = 0;
            this.shield.setExtent(this.parent.extent());
            this.parent.add(this.shield);
            myself.showMessage('Fetching project\nfrom the cloud...');

            // make sure to lowercase the username
            dict = myself.cloud.parseDict(location.hash.substr(7));

            myself.cloud.getPublicProject(
                dict.ProjectName,
                dict.Username,
                projectData => {
                    var msg;
                    myself.nextSteps([
                        () => msg = myself.showMessage('Opening project...'),
                        () => {
                            if (projectData.indexOf('<snapdata') === 0) {
                                myself.rawOpenCloudDataString(projectData);
                            } else if (
                                projectData.indexOf('<project') === 0
                            ) {
                                myself.rawOpenProjectString(projectData);
                            }
                            myself.hasChangedMedia = true;
                        },
                        () => {
                            myself.shield.destroy();
                            myself.shield = null;
                            msg.destroy();
                            myself.toggleAppMode(false);
                        }
                    ]);
                },
                this.cloudError()
            );
        } else if (location.hash.substr(0, 4) === '#dl:') {
            myself.showMessage('Fetching project\nfrom the cloud...');

            // make sure to lowercase the username
            dict = myself.cloud.parseDict(location.hash.substr(4));
            dict.Username = dict.Username.toLowerCase();

            myself.cloud.getPublicProject(
                dict.ProjectName,
                dict.Username,
                projectData => {
                    myself.saveXMLAs(projectData, dict.ProjectName);
                    myself.showMessage(
                        'Saved project\n' + dict.ProjectName,
                        2
                    );
                },
                this.cloudError()
            );
        } else if (location.hash.substr(0, 6) === '#lang:') {
            dict = myself.cloud.parseDict(location.hash.substr(6));
            applyFlags(dict);
        } else if (location.hash.substr(0, 7) === '#signup') {
            this.createCloudAccount();
        }
        this.loadNewProject = false;
    }

    function launcherLangSetting() {
        var langSetting = null;
        if (location.hash.substr(0, 6) === '#lang:') {
            if (location.hash.charAt(8) === '_') {
                langSetting = location.hash.slice(6, 11);
            } else {
                langSetting = location.hash.slice(6, 8);
            }
        }
        // lang-flag wins lang-anchor setting
        langSetting = myself.cloud.parseDict(location.hash).lang || langSetting;
        return langSetting;
    }

    if (launcherLangSetting()) {
        // launch with this non-persisten lang setting
        this.loadNewProject = true;
        this.setLanguage(launcherLangSetting(), interpretUrlAnchors, true);
    } else if (this.userLanguage) {
        this.loadNewProject = true;
        this.setLanguage(this.userLanguage, interpretUrlAnchors);
    } else {
        interpretUrlAnchors.call(this);
    }

    if (location.protocol === 'file:') {
        Process.prototype.enableJS = true;
    } else {
        if (!sessionStorage.username) {
            // check whether login should persist across browser sessions
            this.cloud.initSession(initUser);
        } else {
            // login only persistent during a single browser session
            this.cloud.checkCredentials(initUser);
        }
    }

    world.keyboardFocus = this.stage;
    this.warnAboutIE();

    // configure optional settings
    this.applyConfigurations();

    this.warnAboutDev();
    return this;
};

// IDE_Morph configuration

IDE_Morph.prototype.applyConfigurations = function () {
    var cnf = this.config,
        refreshLater = false,
        lang, translation, src,

        refresh = () => {
            // load project
            if (cnf.load) {
                this.getURL(
                    cnf.load,
                    projectData => {
                        if (projectData.indexOf('<snapdata') === 0) {
                            this.rawOpenCloudDataString(projectData);
                        } else if (
                            projectData.indexOf('<project') === 0
                        ) {
                            this.rawOpenProjectString(projectData);
                        }
                        this.hasChangedMedia = true;
                        this.applyPaneHidingConfigurations();
                        if (cnf.onload) {
                            cnf.onload();
                        }
                    }
                );
            } else {
                this.buildPanes();
                this.fixLayout();
                this.newProject();
                this.applyPaneHidingConfigurations();
            }
        };

    if (!Object.keys(cnf).length) {
        return;
    }

    // design
    if (cnf.design) {
        if (cnf.design === 'flat') {
            this.setFlatDesign();
        } else if (cnf.design === 'classic') {
            this.setDefaultDesign();
        }
        SpriteMorph.prototype.initBlocks();
    }

    // interaction mode
    if (cnf.mode === "presentation") {
        this.toggleAppMode(true);
    } else {
        this.toggleAppMode(false);
    }

    // blocks size
    if (cnf.blocksZoom) {
        SyntaxElementMorph.prototype.setScale(
            Math.max(1, Math.min(cnf.blocksZoom, 12))
        );
        CommentMorph.prototype.refreshScale();
        SpriteMorph.prototype.initBlocks();
    }

    // blocks fade
    if (cnf.blocksFade) {
        SyntaxElementMorph.prototype.setAlphaScaled(100 - cnf.blocksFade);
    }

    // zebra coloring //
    if (isNil(cnf.zebra)) {
        BlockMorph.prototype.zebraContrast = 40;
    } else {
        BlockMorph.prototype.zebraContrast = cnf.zebra;
    }

    // language
    if (cnf.lang) {
        lang = cnf.lang;
        translation = document.getElementById('language');

        // this needs to be directed to something more generic:
        src = this.resourceURL('locale', 'lang-' + lang + '.js');

        SnapTranslator.unload();
        if (translation) {
            document.head.removeChild(translation);
        }
        SnapTranslator.language = lang;
        if (lang !== 'en') {
            refreshLater = true;
            translation = document.createElement('script');
            translation.id = 'language';
            translation.onload = () => refresh();
            document.head.appendChild(translation);
            translation.src = src;
        }
    }

    // no palette
    if (cnf.noPalette) {
        ScriptsMorph.prototype.enableKeyboard = false;
    }

    if (!refreshLater) {
        refresh();
    }

    // disable cloud access
    if (cnf.noCloud) {
        this.cloud.disable();
        this.fixLayout();
    }

    // disable onbeforeunload close warning
    if (cnf.noExitWarning) {
        window.onbeforeunload = window.cachedOnbeforeunload;
    }
};

IDE_Morph.prototype.applyPaneHidingConfigurations = function () {
    var cnf = this.config;

    // hide controls
    if (cnf.hideControls) {
        this.logo.hide();
        this.controlBar.hide();
        window.onbeforeunload = nop;
    }

    // hide categories
    if (cnf.hideCategories) {
        this.categories.hide();
    }

    // no sprites
    if (cnf.noSprites) {
        this.stage.hide();
        cnf.noSpriteEdits = true;
    }

    // hide sprite editing widgets
    if (cnf.noSpriteEdits) {
        this.spriteBar.hide();
        this.stageHandle.hide();
        this.corralBar.hide();
        this.corral.hide();
    }

    // no palette
    if (cnf.noPalette) {
        this.categories.hide();
        this.palette.hide();
        this.paletteHandle.hide();
    }
};

// IDE_Morph construction

IDE_Morph.prototype.buildPanes = function () {
    this.createLogo();
    this.createControlBar();
    this.createCategories();
    this.createPalette();
    this.createStage();
    this.createSpriteBar();
    this.createSpriteEditor();
    this.createCorralBar();
    this.createCorral();
};

IDE_Morph.prototype.createLogo = function () {
    var myself = this;

    if (this.logo) {
        this.logo.destroy();
    }

    this.logo = new Morph();

    // the logo texture is not loaded dynamically as an image, but instead
    // hard-copied here to avoid tainting the world canvas. This lets us
    // use Snap's (and Morphic's) color pickers to sense any pixel which
    // otherwise would be compromised by annoying browser security.

    // this.logo.texture = this.resourceURL('src', 'snap_logo_sm.png'); // original code, commented out
    // this.logo.texture = this.logoURL; // original code, commented out
    this.logo.texture = "data:image/png;base64," +
        "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" +
        "gg==";

    // var img = new Image();
    // this.logo.texture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAC2UAAAgkCAYAAACAtj0lAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAP+lSURBVHhe7NyxahRBHMDhncNCLgFFsIiCip2V5zWWCWitjSBJ6Rv4Ar6Az2C7YCeWVklrtb5B8gIhQVisbpzJ7coakzOaXO5y933wZ3ZnYbl2uR9TAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+P/24JgAAAAAYdD6pzaFHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/NUAtd7/NW4ovvcAAAAASUVORK5CYII=";
    // document.body.appendChild(img);
    // this.logo.texture = "data:image/PNG;base64,iVBORw0KGgoAAAANSUhEUgAAC2UAAAgkCAYAAACAtj0lAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAP+lSURBVHhe7NyxahRBHMDhncNCLgFFsIiCip2V5zWWCWitjSBJ6Rv4Ar6Az2C7YCeWVklrtb5B8gIhQVisbpzJ7coakzOaXO5y933wZ3ZnYbl2uR9TAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+P/24JgAAAAAYdD6pzaFHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/NUAtd7/NW4ovvcAAAAASUVORK5CYII=";

    this.logo.render = function (ctx) {
        var gradient = ctx.createLinearGradient(
            0,
            0,
            this.width(),
            0
        );
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(0.5, myself.frameColor.toString());
        ctx.fillStyle = MorphicPreferences.isFlat ?
            myself.frameColor.toString() : gradient;
        ctx.fillRect(0, 0, this.width(), this.height());
        if (this.cachedTexture) {
            this.renderCachedTexture(ctx);
        } else if (this.texture) {
            this.renderTexture(this.texture, ctx);
        }
    };

    this.logo.renderCachedTexture = function (ctx) {
        ctx.drawImage(
            this.cachedTexture,
            5,
            Math.round((this.height() - this.cachedTexture.height) / 2)
        );
        this.changed();
    };

    this.logo.mouseClickLeft = function () {
        myself.snapMenu();
    };

    this.logo.color = WHITE;
    this.logo.setExtent(new Point(200, 28)); // dimensions are fixed
    this.add(this.logo);
};

IDE_Morph.prototype.createControlBar = function () {
    // assumes the logo has already been created
    var padding = 5,
        button,
        slider,
        stopButton,
        pauseButton,
        startButton,
        projectButton,
        settingsButton,
        stageSizeButton,
        appModeButton,
        steppingButton,
        cloudButton,
        x,
        colors = MorphicPreferences.isFlat ? this.tabColors
            : [
                this.groupColor,
                this.frameColor.darker(50),
                this.frameColor.darker(50)
            ],
        activeColor = TERTINARY,
        activeColors = [
            activeColor,
            activeColor.lighter(40),
            activeColor.lighter(40)
        ],
        myself = this;

    if (this.controlBar) {
        this.controlBar.destroy();
    }

    this.controlBar = new Morph();
    this.controlBar.color = TERTINARY;
    this.controlBar.setHeight(28); // height is fixed
console.log(this.logo.height());
    // let users manually enforce re-layout when changing orientation
    // on mobile devices
    // Leaving it out, because it's most probably unneeded
    /*
    this.controlBar.mouseClickLeft = function () {
        this.world().fillPage();
    };
    */

    this.add(this.controlBar);

    //smallStageButton
    button = new ToggleButtonMorph(
        null, //colors,
        this, // the IDE is the target
        'toggleStageSize',
        [
            new SymbolMorph('smallStage', 14),
            new SymbolMorph('normalStage', 14)
        ],
        () => this.isSmallStage // query
    );

    button.hasNeutralBackground = true;
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[0];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = MorphicPreferences.isFlat ?
        FOREGROUND
        : this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    // button.hint = 'stage size\nsmall & normal';
    button.fixLayout();
    button.refresh();
    stageSizeButton = button;
    this.controlBar.add(stageSizeButton);
    this.controlBar.stageSizeButton = button; // for refreshing

    //appModeButton
    button = new ToggleButtonMorph(
        null, //colors,
        this, // the IDE is the target
        'toggleAppMode',
        [
            new SymbolMorph('fullScreen', 14),
            new SymbolMorph('normalScreen', 14)
        ],
        () => this.isAppMode // query
    );

    button.hasNeutralBackground = true;
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[0];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    // button.hint = 'app & edit\nmodes';
    button.fixLayout();
    button.refresh();
    appModeButton = button;
    this.controlBar.add(appModeButton);
    this.controlBar.appModeButton = appModeButton; // for refreshing

    //steppingButton
    button = new ToggleButtonMorph(
        null, //colors,
        this, // the IDE is the target
        'toggleSingleStepping',
        [
            new SymbolMorph('footprints', 16),
            new SymbolMorph('footprints', 16)
        ],
        () => Process.prototype.enableSingleStepping // query
    );

    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = activeColor;
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    button.hint = 'Visible stepping';
    button.fixLayout();
    button.refresh();
    steppingButton = button;
    this.controlBar.add(steppingButton);
    this.controlBar.steppingButton = steppingButton; // for refreshing

    // stopButton
    button = new ToggleButtonMorph(
        null, // colors
        this, // the IDE is the target
        'stopAllScripts',
        [
            new SymbolMorph('octagon', 14),
            new SymbolMorph('square', 14)
        ],
        () => this.stage ? // query
            myself.stage.enableCustomHatBlocks &&
            myself.stage.threads.pauseCustomHatBlocks
            : true
    );

    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = new Color(
        MorphicPreferences.isFlat ? 128 : 200,
        0,
        0
    );
    button.contrast = this.buttonContrast;
    // button.hint = 'stop\nevery-\nthing';
    button.fixLayout();
    button.refresh();
    stopButton = button;
    this.controlBar.add(stopButton);
    this.controlBar.stopButton = stopButton; // for refreshing

    //pauseButton
    button = new ToggleButtonMorph(
        null, //colors,
        this, // the IDE is the target
        'togglePauseResume',
        [
            new SymbolMorph('pause', 12),
            new SymbolMorph('pointRight', 14)
        ],
        () => this.isPaused() // query
    );

    button.hasNeutralBackground = true;
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[0];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = MorphicPreferences.isFlat ?
        new Color(220, 185, 0)
        : new Color(255, 220, 0);
    button.contrast = this.buttonContrast;
    // button.hint = 'pause/resume\nall scripts';
    button.fixLayout();
    button.refresh();
    pauseButton = button;
    this.controlBar.add(pauseButton);
    this.controlBar.pauseButton = pauseButton; // for refreshing

    // startButton
    button = new PushButtonMorph(
        this,
        'pressStart',
        new SymbolMorph('flag', 14)
    );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.fps = 4;
    button.isActive = false;

    button.step = function () {
        var isRunning;
        if (!myself.stage) {
            return;
        }
        isRunning = !!myself.stage.threads.processes.length;
        if (isRunning === this.isActive) {
            return;
        }
        this.isActive = isRunning;
        if (isRunning) {
            this.color = activeColors[0];
            this.highlightColor = activeColors[1];
            this.pressColor = activeColors[2];
        } else {
            this.color = colors[0];
            this.highlightColor = colors[1];
            this.pressColor = colors[2];
        }
        this.rerender();
    };

    button.labelColor = new Color(
        0,
        MorphicPreferences.isFlat ? 100 : 200,
        0
    );
    button.contrast = this.buttonContrast;
    // button.hint = 'start green\nflag scripts';
    button.fixLayout();
    startButton = button;
    this.controlBar.add(startButton);
    this.controlBar.startButton = startButton;

    // steppingSlider
    slider = new SliderMorph(
        61,
        1,
        Process.prototype.flashTime * 100 + 1,
        6,
        'horizontal'
    );
    slider.action = (num) => {
        Process.prototype.flashTime = (num - 1) / 100;
        this.controlBar.refreshResumeSymbol();
    };
    // slider.alpha = MorphicPreferences.isFlat ? 0.1 : 0.3;
    slider.color = activeColor;
    slider.alpha = 0.3;
    slider.setExtent(new Point(50, 14));
    this.controlBar.add(slider);
    this.controlBar.steppingSlider = slider;

    // projectButton
    button = new PushButtonMorph(
        this,
        'projectMenu',
        new SymbolMorph('file', 14)
        //'\u270E'
    );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    // button.hint = 'open, save, & annotate project';
    button.fixLayout();
    projectButton = button;
    this.controlBar.add(projectButton);
    this.controlBar.projectButton = projectButton; // for menu positioning

    // settingsButton
    button = new PushButtonMorph(
        this,
        'settingsMenu',
        new SymbolMorph('gears', 14)
        //'\u2699'
    );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    // button.hint = 'edit settings';
    button.fixLayout();
    settingsButton = button;
    this.controlBar.add(settingsButton);
    this.controlBar.settingsButton = settingsButton; // for menu positioning

    // cloudButton
    button = new ToggleButtonMorph(
        null, //colors,
        this, // the IDE is the target
        'cloudMenu',
        [
            new SymbolMorph('cloudOutline', 11),
            new SymbolMorph('cloud', 11)
        ],
        () => !isNil(this.cloud.username) // query
    );

    button.hasNeutralBackground = true;
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[0];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    // button.hint = 'cloud operations';
    button.fixLayout();
    button.refresh();
    cloudButton = button;
    this.controlBar.add(cloudButton);
    this.controlBar.cloudButton = cloudButton; // for menu positioning & refresh

    this.controlBar.fixLayout = function () {
        x = this.right() - padding;
        [stopButton, pauseButton, startButton].forEach(button => {
            button.setCenter(myself.controlBar.center());
            button.setRight(x);
            x -= button.width();
            x -= padding;
        }
        );

        x = startButton.left() - (3 * padding + 2 * stageSizeButton.width());
        if (!myself.config.noSprites) {
            x = Math.min(
                x,
                myself.right() - myself.stage.dimensions.x *
                (myself.isSmallStage ? myself.stageRatio : 1) -
                (myself.config.border || 0)
            );
            x = Math.max(x, this.left());
        }
        [stageSizeButton, appModeButton].forEach(button => {
            x += padding;
            button.setCenter(myself.controlBar.center());
            button.setLeft(x);
            x += button.width();
        }
        );

        slider.setCenter(myself.controlBar.center());
        slider.setRight(stageSizeButton.left() - padding);

        steppingButton.setCenter(myself.controlBar.center());
        steppingButton.setRight(slider.left() - padding);

        settingsButton.setCenter(myself.controlBar.center());
        settingsButton.setLeft(this.left());

        if (myself.config.hideSettings) {
            settingsButton.hide();
        }

        projectButton.setCenter(myself.controlBar.center());

        if (myself.config.noImports || myself.config.hideProjects) {
            projectButton.hide();
        }

        if (myself.cloud.disabled) {
            cloudButton.hide();
            projectButton.setRight(settingsButton.left() - padding);
        } else {
            cloudButton.setCenter(myself.controlBar.center());
            cloudButton.setRight(settingsButton.left() - padding);
            projectButton.setRight(cloudButton.left() - padding);
        }

        this.refreshSlider();
        this.updateLabel();
    };

    this.controlBar.refreshSlider = function () {
        if (Process.prototype.enableSingleStepping && !myself.isAppMode) {
            slider.fixLayout();
            slider.rerender();
            slider.show();
        } else {
            slider.hide();
        }
        this.refreshResumeSymbol();
    };

    this.controlBar.refreshResumeSymbol = function () {
        var pauseSymbols;
        if (Process.prototype.enableSingleStepping &&
            Process.prototype.flashTime > 0.5) {
            myself.stage.threads.pauseAll(myself.stage);
            pauseSymbols = [
                new SymbolMorph('pause', 12),
                new SymbolMorph('stepForward', 14)
            ];
        } else {
            pauseSymbols = [
                new SymbolMorph('pause', 12),
                new SymbolMorph('pointRight', 14)
            ];
        }
        pauseButton.labelString = pauseSymbols;
        pauseButton.createLabel();
        pauseButton.fixLayout();
        pauseButton.refresh();
    };

    this.controlBar.updateLabel = function () {
        var prefix = myself.hasUnsavedEdits() ? '\u270E ' : '',
            suffix = myself.world().isDevMode ?
                ' - ' + localize('development mode') : '',
            name, scene, txt;

        if (this.label) {
            this.label.destroy();
        }
        if (myself.isAppMode) {
            return;
        }
        scene = myself.scenes.at(1) !== myself.scene ?
            ' (' + myself.scene.name + ')' : '';
        name = (myself.getProjectName() || localize('untitled'));
        if (!myself.config.preserveTitle) {
            document.title = "Snap! " +
                (myself.getProjectName() ? name : SnapVersion);
        }
        txt = new StringMorph(
            prefix + name + scene + suffix,
            14,
            'sans-serif',
            true,
            false,
            false,
            MorphicPreferences.isFlat ? null : new Point(2, 1),
            myself.frameColor.darker(myself.buttonContrast)
        );
        txt.color = myself.buttonLabelColor;

        this.label = new FrameMorph();
        this.label.acceptsDrops = false;
        this.label.alpha = 0;
        txt.setPosition(this.label.position());
        this.label.add(txt);
        this.label.setExtent(
            new Point(
                steppingButton.left() - settingsButton.right() - padding * 2,
                txt.height()
            )
        );
        this.label.setCenter(this.center());
        this.label.setLeft(this.settingsButton.right() + padding);
        this.add(this.label);
    };
};

IDE_Morph.prototype.createCategories = function () {
    var myself = this,
        categorySelectionAction = this.scene.unifiedPalette ? scrollToCategory
            : changePalette,
        categoryQueryAction = this.scene.unifiedPalette ? queryTopCategory
            : queryCurrentCategory,
        shift = this.config.noDefaultCat ? 4 : 0,
        flag = true;

    if (this.categories) {
        flag = this.categories.isVisible;
        this.categories.destroy();
    }
    this.categories = new Morph();
    this.categories.color = this.groupColor;
    this.categories.bounds.setWidth(this.paletteWidth);
    this.categories.buttons = [];
    this.categories.isVisible = flag;

    this.categories.droppedImage = (aCanvas, name, embeddedData) => {
        this.droppedImage(aCanvas, name, embeddedData, 'categories');
    };

    this.categories.refresh = function () {
        this.buttons.forEach(cat => {
            cat.refresh();
            if (cat.state) {
                cat.scrollIntoView();
            }
        });
    };

    this.categories.refreshEmpty = function () {
        var dict = myself.currentSprite.emptyCategories();
        dict.variables = dict.variables || dict.lists || dict.other;
        this.buttons.forEach(cat => {
            if (dict[cat.category]) {
                cat.enable();
            } else {
                cat.disable();
            }
        });
    };

    function changePalette(category) {
        return () => {
            myself.currentCategory = category;
            myself.categories.buttons.forEach(each =>
                each.refresh()
            );
            myself.refreshPalette(true);
        };
    }

    function scrollToCategory(category) {
        return () => myself.scrollPaletteToCategory(category);
    }

    function queryCurrentCategory(category) {
        return () => myself.currentCategory === category;
    }

    function queryTopCategory(category) {
        return () => myself.topVisibleCategoryInPalette() === category;
    }

    function addCategoryButton(category) {
        var labelWidth = 75,
            colors = [
                myself.frameColor,
                myself.frameColor.darker(MorphicPreferences.isFlat ? 5 : 50),
                SpriteMorph.prototype.blockColor[category]
            ],
            button;

        button = new ToggleButtonMorph(
            colors,
            myself, // the IDE is the target
            categorySelectionAction(category),
            category[0].toUpperCase().concat(category.slice(1)), // label
            categoryQueryAction(category), // query
            null, // env
            null, // hint
            labelWidth, // minWidth
            true // has preview
        );

        button.category = category;
        button.corner = 8;
        button.padding = 0;
        button.labelShadowOffset = new Point(-1, -1);
        button.labelShadowColor = colors[1];
        button.labelColor = myself.buttonLabelColor;
        if (MorphicPreferences.isFlat) {
            button.labelPressColor = FOREGROUND;
        }
        button.fixLayout();
        button.refresh();
        myself.categories.add(button);
        myself.categories.buttons.push(button);
        return button;
    }

    function addCustomCategoryButton(category, color) {
        var labelWidth = 168,
            colors = [
                myself.frameColor,
                myself.frameColor.darker(MorphicPreferences.isFlat ? 5 : 50),
                color
            ],
            button;

        button = new ToggleButtonMorph(
            colors,
            myself, // the IDE is the target
            categorySelectionAction(category),
            category, // label
            categoryQueryAction(category), // query
            null, // env
            null, // hint
            labelWidth, // minWidth
            true // has preview
        );

        button.category = category;
        button.corner = 8;
        button.padding = 0;
        button.labelShadowOffset = new Point(-1, -1);
        button.labelShadowColor = colors[1];
        button.labelColor = myself.buttonLabelColor;
        if (MorphicPreferences.isFlat) {
            button.labelPressColor = FOREGROUND;
        }
        button.fixLayout();
        button.refresh();
        myself.categories.add(button);
        myself.categories.buttons.push(button);
        return button;
    }

    function fixCategoriesLayout() {
        var buttonWidth = myself.categories.children[0].width(),
            buttonHeight = myself.categories.children[0].height(),
            more = SpriteMorph.prototype.customCategories.size,
            border = 3,
            xPadding = (200 // myself.logo.width()
                - border
                - buttonWidth * 2) / 3,
            yPadding = 2,
            l = myself.categories.left(),
            t = myself.categories.top(),
            scroller,
            row,
            col,
            i;

        myself.categories.children.forEach((button, i) => {
            row = i < 8 ? i % 4 : i - 4;
            col = (i < 4 || i > 7) ? 1 : 2;
            button.setPosition(new Point(
                l + (col * xPadding + ((col - 1) * buttonWidth)),
                t + (((row - shift) + 1) * yPadding + ((row - shift) * buttonHeight) + border) +
                (i > 7 ? border + 2 : 0)
            ));
        });

        if (shift) { // hide the built-in category buttons
            for (i = 0; i < 8; i += 1) {
                myself.categories.children[i].hide();
            }
        }

        if (more > 6) {
            scroller = new ScrollFrameMorph(null, null, myself.sliderColor);
            scroller.setColor(myself.groupColor);
            scroller.acceptsDrops = false;
            scroller.contents.acceptsDrops = false;
            scroller.setPosition(
                new Point(0, myself.categories.children[8].top())
            );
            scroller.setWidth(myself.paletteWidth);
            scroller.setHeight(buttonHeight * 6 + yPadding * 5);

            for (i = 0; i < more; i += 1) {
                scroller.addContents(myself.categories.children[8]);
            }
            myself.categories.add(scroller);
            myself.categories.scroller = scroller;
            myself.categories.setHeight(
                (4 + 1 - shift) * yPadding
                + (4 - shift) * buttonHeight
                + 6 * (yPadding + buttonHeight) + border + 2
                + 2 * border
            );
        } else {
            myself.categories.setHeight(
                (4 + 1 - shift) * yPadding
                + (4 - shift) * buttonHeight
                + (more ?
                    (more * (yPadding + buttonHeight) + border + 2)
                    : 0)
                + 2 * border
            );
        }
    }

    SpriteMorph.prototype.categories.forEach(cat => {
        if (!contains(['lists', 'other'], cat)) {
            addCategoryButton(cat);
        }
    });

    // sort alphabetically
    Array.from(
        SpriteMorph.prototype.customCategories.keys()
    ).sort().forEach(name =>
        addCustomCategoryButton(
            name,
            SpriteMorph.prototype.customCategories.get(name)
        )
    );

    fixCategoriesLayout();
    this.add(this.categories);
};

IDE_Morph.prototype.createPalette = function (forSearching) {
    // assumes that the logo pane has already been created
    // needs the categories pane for layout
    var myself = this,
        vScrollAction;

    if (this.palette) {
        this.palette.destroy();
    }

    if (forSearching) {
        this.palette = new ScrollFrameMorph(
            null,
            null,
            this.currentSprite.sliderColor
        );
        this.palette.isForSearching = true;

        // search toolbar (floating cancel button):
        /* commented out for now
        this.palette.toolBar = new PushButtonMorph(
            this,
            () => {
                this.refreshPalette();
                this.palette.adjustScrollBars();
            },
            new SymbolMorph("magnifierOutline", 16)
        );
        this.palette.toolBar.alpha = 0.2;
        this.palette.toolBar.padding = 1;
        // this.palette.toolBar.hint = 'Cancel';
        this.palette.toolBar.labelShadowColor = new Color(140, 140, 140);
        this.palette.toolBar.fixLayout();
        this.palette.add(this.palette.toolBar);
        */

    } else {
        this.palette = this.currentSprite.palette(this.currentCategory);
    }
    this.palette.isDraggable = false;
    this.palette.acceptsDrops = true;
    this.palette.enableAutoScrolling = false;
    this.palette.contents.acceptsDrops = false;

    if (this.scene.unifiedPalette) {
        this.palette.adjustScrollBars = function () {
            ScrollFrameMorph.prototype.adjustScrollBars.call(this);
            myself.categories.refresh();
        };

        vScrollAction = this.palette.vBar.action;
        this.palette.vBar.action = function (num) {
            vScrollAction(num);
            myself.categories.buttons.forEach(each => each.refresh());
        };
    }

    this.palette.reactToDropOf = (droppedMorph, hand) => {
        if (droppedMorph instanceof DialogBoxMorph) {
            this.world().add(droppedMorph);
        } else if (droppedMorph instanceof SpriteMorph) {
            this.removeSprite(droppedMorph);
        } else if (droppedMorph instanceof SpriteIconMorph) {
            droppedMorph.destroy();
            this.removeSprite(droppedMorph.object);
        } else if (droppedMorph instanceof CostumeIconMorph) {
            // this.currentSprite.wearCostume(null); // do we need this?
            droppedMorph.perish(myself.isAnimating ? 200 : 0);
        } else if (droppedMorph instanceof BlockMorph) {
            this.stage.threads.stopAllForBlock(droppedMorph);
            if (hand && hand.grabOrigin.origin instanceof ScriptsMorph) {
                hand.grabOrigin.origin.clearDropInfo();
                hand.grabOrigin.origin.lastDroppedBlock = droppedMorph;
                hand.grabOrigin.origin.recordDrop(hand.grabOrigin);
            }
            droppedMorph.perish(myself.isAnimating ? 200 : 0);
            this.currentSprite.recordUserEdit(
                'scripts',
                'block',
                'delete',
                droppedMorph.abstractBlockSpec()
            );
        } else {
            droppedMorph.perish(myself.isAnimating ? 200 : 0);
            if (droppedMorph instanceof CommentMorph) {
                this.currentSprite.recordUserEdit(
                    'scripts',
                    'comment',
                    'delete'
                );
            }
        }
    };

    this.palette.contents.reactToDropOf = (droppedMorph) => {
        // for "undrop" operation
        if (droppedMorph instanceof BlockMorph) {
            droppedMorph.destroy();
        }
    };

    this.palette.droppedImage = (aCanvas, name, embeddedData) => {
        this.droppedImage(aCanvas, name, embeddedData, 'palette');
    };

    this.palette.setWidth(this.logo.width());
    this.add(this.palette);
    return this.palette;
};

IDE_Morph.prototype.createPaletteHandle = function () {
    // assumes that the palette has already been created
    if (this.paletteHandle) { this.paletteHandle.destroy(); }
    this.paletteHandle = new PaletteHandleMorph(this.categories);
    this.add(this.paletteHandle);
};

IDE_Morph.prototype.createStage = function () {
    if (this.stage) {
        this.stage.destroy();
    }
    this.add(this.scene.stage);
    this.stage = this.scene.stage;
};

IDE_Morph.prototype.createStageHandle = function () {
    // assumes that the stage has already been created
    if (this.stageHandle) { this.stageHandle.destroy(); }
    this.stageHandle = new StageHandleMorph(this.stage);
    this.add(this.stageHandle);
};

IDE_Morph.prototype.createSpriteBar = function () {
    // assumes that the categories pane has already been created
    var rotationStyleButtons = [],
        thumbSize = new Point(45, 45),
        nameField,
        padlock,
        thumbnail,
        tabCorner = 15,
        tabColors = this.tabColors,
        tabBar = new AlignmentMorph('row', -tabCorner * 2),
        tab,
        symbols = [
            new SymbolMorph('arrowRightThin', 10),
            new SymbolMorph('turnAround', 10),
            new SymbolMorph('arrowLeftRightThin', 10),
        ],
        labels = ['don\'t rotate', 'can rotate', 'only face left/right'],
        myself = this;

    if (this.spriteBar) {
        this.spriteBar.destroy();
    }

    this.spriteBar = new Morph();
    this.spriteBar.color = this.frameColor;
    this.add(this.spriteBar);

    function addRotationStyleButton(rotationStyle) {
        var colors = myself.rotationStyleColors,
            button;

        button = new ToggleButtonMorph(
            colors,
            myself, // the IDE is the target
            () => {
                if (myself.currentSprite instanceof SpriteMorph) {
                    myself.currentSprite.rotationStyle = rotationStyle;
                    myself.currentSprite.changed();
                    myself.currentSprite.fixLayout();
                    myself.currentSprite.rerender();
                    myself.currentSprite.recordUserEdit(
                        'sprite',
                        'rotation',
                        rotationStyle
                    );
                }
                rotationStyleButtons.forEach(each =>
                    each.refresh()
                );
            },
            symbols[rotationStyle], // label
            () => myself.currentSprite instanceof SpriteMorph // query
                && myself.currentSprite.rotationStyle === rotationStyle,
            null, // environment
            localize(labels[rotationStyle])
        );

        button.corner = 8;
        button.labelMinExtent = new Point(11, 11);
        button.padding = 0;
        button.labelShadowOffset = new Point(-1, -1);
        button.labelShadowColor = colors[1];
        button.labelColor = myself.buttonLabelColor;
        button.fixLayout();
        button.refresh();
        rotationStyleButtons.push(button);
        button.setPosition(myself.spriteBar.position().add(new Point(2, 4)));
        button.setTop(button.top()
            + ((rotationStyleButtons.length - 1) * (button.height() + 2))
        );
        myself.spriteBar.add(button);
        if (myself.currentSprite instanceof StageMorph) {
            button.hide();
        }
        return button;
    }

    addRotationStyleButton(1);
    addRotationStyleButton(2);
    addRotationStyleButton(0);
    this.rotationStyleButtons = rotationStyleButtons;

    thumbnail = new Morph();
    thumbnail.isCachingImage = true;
    thumbnail.bounds.setExtent(thumbSize);
    thumbnail.cachedImage = this.currentSprite.thumbnail(thumbSize);
    thumbnail.setPosition(
        rotationStyleButtons[0].topRight().add(new Point(5, 3))
    );
    this.spriteBar.add(thumbnail);

    thumbnail.fps = 3;

    thumbnail.step = function () {
        if (thumbnail.version !== myself.currentSprite.version) {
            thumbnail.cachedImage = myself.currentSprite.thumbnail(
                thumbSize,
                thumbnail.cachedImage
            );
            thumbnail.changed();
            thumbnail.version = myself.currentSprite.version;
        }
    };

    nameField = new InputFieldMorph(this.currentSprite.name);
    nameField.setWidth(100); // fixed dimensions
    nameField.contrast = 90;
    nameField.setPosition(thumbnail.topRight().add(new Point(10, 3)));
    this.spriteBar.add(nameField);
    this.spriteBar.nameField = nameField;
    nameField.fixLayout();
    nameField.accept = function () {
        var newName = nameField.getValue();
        myself.currentSprite.setName(
            myself.newSpriteName(newName, myself.currentSprite)
        );
        nameField.setContents(myself.currentSprite.name);
    };
    this.spriteBar.reactToEdit = nameField.accept;

    // padlock
    padlock = new ToggleMorph(
        'checkbox',
        null,
        () => {
            this.currentSprite.isDraggable = !this.currentSprite.isDraggable;
            this.currentSprite.recordUserEdit(
                'sprite',
                'draggable',
                this.currentSprite.isDraggable
            );
        },
        localize('draggable'),
        () => this.currentSprite.isDraggable
    );
    padlock.label.isBold = false;
    padlock.label.setColor(this.buttonLabelColor);
    padlock.color = tabColors[2];
    padlock.highlightColor = tabColors[0];
    padlock.pressColor = tabColors[1];

    padlock.tick.shadowOffset = MorphicPreferences.isFlat ?
        ZERO : new Point(-1, -1);
    padlock.tick.shadowColor = FOREGROUND;
    padlock.tick.color = this.buttonLabelColor;
    padlock.tick.isBold = false;
    padlock.tick.fixLayout();

    padlock.setPosition(nameField.bottomLeft().add(2));
    padlock.fixLayout();
    this.spriteBar.add(padlock);
    if (this.currentSprite instanceof StageMorph) {
        padlock.hide();
    }

    // tab bar
    tabBar.tabTo = function (tabString) {
        var active;
        if (myself.currentTab === tabString) { return; }
        myself.world().hand.destroyTemporaries();
        myself.currentTab = tabString;
        this.children.forEach(each => {
            each.refresh();
            if (each.state) { active = each; }
        });
        active.refresh(); // needed when programmatically tabbing
        myself.createSpriteEditor();
        myself.fixLayout('tabEditor');
    };

    tab = new TabMorph(
        tabColors,
        null, // target
        () => tabBar.tabTo('scripts'),
        localize('Scripts'), // label
        () => this.currentTab === 'scripts' // query
    );
    tab.padding = 3;
    tab.corner = tabCorner;
    tab.edge = 1;
    tab.labelShadowOffset = new Point(-1, -1);
    tab.labelShadowColor = tabColors[1];
    tab.labelColor = this.buttonLabelColor;

    tab.getPressRenderColor = function () {
        if (MorphicPreferences.isFlat ||
            SyntaxElementMorph.prototype.alpha > 0.85) {
            return this.pressColor;
        }
        return this.pressColor.mixed(
            Math.max(SyntaxElementMorph.prototype.alpha - 0.15, 0),
            SpriteMorph.prototype.paletteColor
        );
    };

    tab.fixLayout();
    tabBar.add(tab);

    tab = new TabMorph(
        tabColors,
        null, // target
        () => tabBar.tabTo('costumes'),
        localize(this.currentSprite instanceof SpriteMorph ?
            'Costumes' : 'Backgrounds'
        ),
        () => this.currentTab === 'costumes' // query
    );
    tab.padding = 3;
    tab.corner = tabCorner;
    tab.edge = 1;
    tab.labelShadowOffset = new Point(-1, -1);
    tab.labelShadowColor = tabColors[1];
    tab.labelColor = this.buttonLabelColor;
    tab.fixLayout();
    tabBar.add(tab);

    tab = new TabMorph(
        tabColors,
        null, // target
        () => tabBar.tabTo('sounds'),
        localize('Sounds'), // label
        () => this.currentTab === 'sounds' // query
    );
    tab.padding = 3;
    tab.corner = tabCorner;
    tab.edge = 1;
    tab.labelShadowOffset = new Point(-1, -1);
    tab.labelShadowColor = tabColors[1];
    tab.labelColor = this.buttonLabelColor;
    tab.fixLayout();
    tabBar.add(tab);

    tabBar.fixLayout();
    tabBar.children.forEach(each =>
        each.refresh()
    );
    this.spriteBar.tabBar = tabBar;
    this.spriteBar.add(this.spriteBar.tabBar);

    this.spriteBar.fixLayout = function () {
        this.tabBar.setLeft(this.left());
        this.tabBar.setBottom(this.bottom() + myself.padding);
    };
};

IDE_Morph.prototype.createSpriteEditor = function () {
    // assumes that the logo pane and the stage have already been created
    var scripts = this.currentSprite.scripts;

    if (this.spriteEditor) {
        this.spriteEditor.destroy();
    }

    if (this.currentTab === 'scripts') {
        scripts.isDraggable = false;
        scripts.color = this.groupColor;
        scripts.cachedTexture = this.scriptsPaneTexture;

        this.spriteEditor = new ScrollFrameMorph(
            scripts,
            null,
            this.sliderColor
        );
        this.spriteEditor.color = this.groupColor;
        this.spriteEditor.padding = 10;
        this.spriteEditor.growth = 50;
        this.spriteEditor.isDraggable = false;
        this.spriteEditor.acceptsDrops = false;
        this.spriteEditor.contents.acceptsDrops = true;

        scripts.scrollFrame = this.spriteEditor;
        scripts.updateToolbar();
        this.add(this.spriteEditor);
        this.spriteEditor.scrollX(this.spriteEditor.padding);
        this.spriteEditor.scrollY(this.spriteEditor.padding);
    } else if (this.currentTab === 'costumes') {
        this.spriteEditor = new WardrobeMorph(
            this.currentSprite,
            this.sliderColor
        );
        this.spriteEditor.color = this.groupColor;
        this.add(this.spriteEditor);
        this.spriteEditor.updateSelection();

        this.spriteEditor.acceptsDrops = false;
        this.spriteEditor.contents.acceptsDrops = false;
    } else if (this.currentTab === 'sounds') {
        this.spriteEditor = new JukeboxMorph(
            this.currentSprite,
            this.sliderColor
        );
        this.spriteEditor.color = this.groupColor;
        this.add(this.spriteEditor);
        this.spriteEditor.updateSelection();
        this.spriteEditor.acceptDrops = false;
        this.spriteEditor.contents.acceptsDrops = false;
    } else {
        this.spriteEditor = new Morph();
        this.spriteEditor.color = this.groupColor;
        this.spriteEditor.acceptsDrops = true;
        this.spriteEditor.reactToDropOf = (droppedMorph) => {
            if (droppedMorph instanceof DialogBoxMorph) {
                this.world().add(droppedMorph);
            } else if (droppedMorph instanceof SpriteMorph) {
                this.removeSprite(droppedMorph);
            } else {
                droppedMorph.destroy();
            }
        };
        this.add(this.spriteEditor);
    }

    this.spriteEditor.mouseEnterDragging = (morph) => {
        if (morph instanceof BlockMorph) {
            this.spriteBar.tabBar.tabTo('scripts');
        } else if (morph instanceof CostumeIconMorph) {
            this.spriteBar.tabBar.tabTo('costumes');
        } else if (morph instanceof SoundIconMorph) {
            this.spriteBar.tabBar.tabTo('sounds');
        }
    };

    this.spriteEditor.contents.mouseEnterDragging =
        this.spriteEditor.mouseEnterDragging;
};

IDE_Morph.prototype.createCorralBar = function () {
    // assumes the stage has already been created
    var padding = 5,
        newbutton,
        paintbutton,
        cambutton,
        trashbutton,
        flag = true,
        myself = this,
        colors = MorphicPreferences.isFlat ? this.tabColors
            : [
                this.groupColor,
                this.frameColor.darker(50),
                this.frameColor.darker(50)
            ];

    if (this.corralBar) {
        flag = this.corralBar.isVisible;
        this.corralBar.destroy();
    }

    this.corralBar = new Morph();
    this.corralBar.color = TERTINARY;
    this.corralBar.isVisible = flag;
    this.corralBar.setHeight(this.logo.height()); // height is fixed
    this.corralBar.setWidth(this.stage.width());
    this.add(this.corralBar);

    // new sprite button
    newbutton = new PushButtonMorph(
        this,
        "addNewSprite",
        new SymbolMorph("turtle", 14)
    );
    newbutton.corner = 12;
    newbutton.color = colors[0];
    newbutton.highlightColor = colors[1];
    newbutton.pressColor = colors[2];
    newbutton.labelMinExtent = new Point(36, 18);
    newbutton.padding = 0;
    newbutton.labelShadowOffset = new Point(-1, -1);
    newbutton.labelShadowColor = colors[1];
    newbutton.labelColor = this.buttonLabelColor;
    newbutton.contrast = this.buttonContrast;
    newbutton.hint = "add a new Turtle sprite";
    newbutton.fixLayout();
    newbutton.setCenter(this.corralBar.center());
    newbutton.setLeft(this.corralBar.left() + padding);
    this.corralBar.add(newbutton);

    paintbutton = new PushButtonMorph(
        this,
        "paintNewSprite",
        new SymbolMorph("brush", 15)
    );
    paintbutton.corner = 12;
    paintbutton.color = colors[0];
    paintbutton.highlightColor = colors[1];
    paintbutton.pressColor = colors[2];
    paintbutton.labelMinExtent = new Point(36, 18);
    paintbutton.padding = 0;
    paintbutton.labelShadowOffset = new Point(-1, -1);
    paintbutton.labelShadowColor = colors[1];
    paintbutton.labelColor = this.buttonLabelColor;
    paintbutton.contrast = this.buttonContrast;
    paintbutton.hint = "paint a new sprite";
    paintbutton.fixLayout();
    paintbutton.setCenter(this.corralBar.center());
    paintbutton.setLeft(
        this.corralBar.left() + padding + newbutton.width() + padding
    );
    this.corralBar.add(paintbutton);

    if (CamSnapshotDialogMorph.prototype.enableCamera) {
        cambutton = new PushButtonMorph(
            this,
            "newCamSprite",
            new SymbolMorph("camera", 15)
        );
        cambutton.corner = 12;
        cambutton.color = colors[0];
        cambutton.highlightColor = colors[1];
        cambutton.pressColor = colors[2];
        cambutton.labelMinExtent = new Point(36, 18);
        cambutton.padding = 0;
        cambutton.labelShadowOffset = new Point(-1, -1);
        cambutton.labelShadowColor = colors[1];
        cambutton.labelColor = this.buttonLabelColor;
        cambutton.contrast = this.buttonContrast;
        cambutton.hint = "take a camera snapshot and\n" +
            "import it as a new sprite";
        cambutton.fixLayout();
        cambutton.setCenter(this.corralBar.center());
        cambutton.setLeft(
            this.corralBar.left() +
            padding +
            newbutton.width() +
            padding +
            paintbutton.width() +
            padding
        );
        this.corralBar.add(cambutton);
        document.addEventListener(
            'cameraDisabled',
            event => {
                cambutton.disable();
                cambutton.hint =
                    CamSnapshotDialogMorph.prototype.notSupportedMessage;
            }
        );
    }

    // trash button
    trashbutton = new PushButtonMorph(
        this,
        "undeleteSprites",
        new SymbolMorph("trash", 18)
    );
    trashbutton.corner = 12;
    trashbutton.color = colors[0];
    trashbutton.highlightColor = colors[1];
    trashbutton.pressColor = colors[2];
    trashbutton.labelMinExtent = new Point(36, 18);
    trashbutton.padding = 0;
    trashbutton.labelShadowOffset = new Point(-1, -1);
    trashbutton.labelShadowColor = colors[1];
    trashbutton.labelColor = this.buttonLabelColor;
    trashbutton.contrast = this.buttonContrast;
    // trashbutton.hint = "bring back deleted sprites";
    trashbutton.fixLayout();
    trashbutton.setCenter(this.corralBar.center());
    trashbutton.setRight(this.corralBar.right() - padding);
    this.corralBar.add(trashbutton);

    trashbutton.wantsDropOf = (morph) =>
        morph instanceof SpriteMorph || morph instanceof SpriteIconMorph;

    trashbutton.reactToDropOf = (droppedMorph) => {
        if (droppedMorph instanceof SpriteMorph) {
            this.removeSprite(droppedMorph);
        } else if (droppedMorph instanceof SpriteIconMorph) {
            droppedMorph.destroy();
            this.removeSprite(droppedMorph.object);
        }
    };

    this.corralBar.fixLayout = function () {
        function updateDisplayOf(button) {
            if (button && button.right() > trashbutton.left() - padding) {
                button.hide();
            } else {
                button.show();
            }
        }
        this.setWidth(myself.stage.width());
        trashbutton.setRight(this.right() - padding);
        updateDisplayOf(cambutton);
        updateDisplayOf(paintbutton);
    };
};

IDE_Morph.prototype.createCorral = function (keepSceneAlbum) {
    // assumes the corral bar has already been created
    var frame, padding = 5, myself = this,
        album = this.corral ? this.corral.album : null;

    this.createStageHandle();
    this.createPaletteHandle();

    if (this.corral) {
        this.corral.destroy();
    }

    this.corral = new Morph();
    this.corral.color = this.groupColor;
    this.corral.getRenderColor = ScriptsMorph.prototype.getRenderColor;

    this.add(this.corral);

    this.corral.stageIcon = new SpriteIconMorph(this.stage);
    this.corral.stageIcon.isDraggable = false;
    this.corral.add(this.corral.stageIcon);

    frame = new ScrollFrameMorph(null, null, this.sliderColor);
    frame.acceptsDrops = false;
    frame.contents.acceptsDrops = false;

    frame.contents.wantsDropOf = (morph) => morph instanceof SpriteIconMorph;

    frame.contents.reactToDropOf = (spriteIcon) =>
        this.corral.reactToDropOf(spriteIcon);

    frame.alpha = 0;

    this.sprites.asArray().forEach(morph => {
        if (!morph.isTemporary) {
            frame.contents.add(new SpriteIconMorph(morph));
        }
    });

    this.corral.frame = frame;
    this.corral.add(frame);

    // scenes corral
    this.corral.album = keepSceneAlbum ? album
        : new SceneAlbumMorph(this, this.sliderColor);
    this.corral.album.color = this.frameColor;
    this.corral.add(this.corral.album);

    this.corral.fixLayout = function () {
        this.stageIcon.setCenter(this.center());
        this.stageIcon.setLeft(this.left() + padding);

        // scenes
        if (myself.scenes.length() < 2) {
            this.album.hide();
        } else {
            this.stageIcon.setTop(this.top());
            this.album.show();
            this.album.setLeft(this.left());
            this.album.setTop(this.stageIcon.bottom() + padding);
            this.album.setWidth(this.stageIcon.width() + padding * 2);
            this.album.setHeight(
                this.height() - this.stageIcon.height() - padding
            );
        }

        this.frame.setLeft(this.stageIcon.right() + padding);
        this.frame.setExtent(new Point(
            this.right() - this.frame.left(),
            this.height()
        ));
        this.arrangeIcons();
        this.refresh();
    };

    this.corral.arrangeIcons = function () {
        var x = this.frame.left(),
            y = this.frame.top(),
            max = this.frame.right(),
            start = this.frame.left();

        this.frame.contents.children.forEach(icon => {
            var w = icon.width();

            if (x + w > max) {
                x = start;
                y += icon.height(); // they're all the same
            }
            icon.setPosition(new Point(x, y));
            x += w;
        });
        this.frame.contents.adjustBounds();
    };

    this.corral.addSprite = function (sprite) {
        this.frame.contents.add(new SpriteIconMorph(sprite));
        this.fixLayout();
        sprite.recordUserEdit(
            'corral',
            'add',
            sprite.name
        );
    };

    this.corral.refresh = function () {
        this.stageIcon.refresh();
        this.frame.contents.children.forEach(icon =>
            icon.refresh()
        );
    };

    this.corral.wantsDropOf = (morph) => morph instanceof SpriteIconMorph;

    this.corral.reactToDropOf = function (spriteIcon) {
        var idx = 1,
            pos = spriteIcon.position();
        spriteIcon.destroy();
        this.frame.contents.children.forEach(icon => {
            if (pos.gt(icon.position()) || pos.y > icon.bottom()) {
                idx += 1;
            }
        });
        myself.sprites.add(spriteIcon.object, idx);
        myself.createCorral(true); // keep scenes
        myself.fixLayout();
    };
};

// IDE_Morph layout

IDE_Morph.prototype.fixLayout = function (situation) {
    // situation is a string, i.e.
    // 'selectSprite' or 'refreshPalette' or 'tabEditor'
    var padding = this.padding,
        cnf = this.config,
        border = cnf.border || 0,
        flag,
        maxPaletteWidth;

    // logo
    this.logo.setLeft(this.left() + border);
    this.logo.setTop(this.top() + border);

    if (situation !== 'refreshPalette') {
        // controlBar
        this.controlBar.setPosition(this.logo.topRight());
        this.controlBar.setWidth(
            this.right() - this.controlBar.left() - border
        );
        this.controlBar.fixLayout();

        // categories
        this.categories.setLeft(this.logo.left());
        this.categories.setTop(
            cnf.hideControls ? this.top() + border : this.logo.bottom()
        );
        this.categories.setWidth(this.paletteWidth);
        if (this.categories.scroller) {
            this.categories.scroller.setWidth(this.paletteWidth);
        }
    }

    // palette
    this.palette.setLeft(this.logo.left());
    this.palette.setTop(
        cnf.hideCategories ?
            (cnf.hideControls ?
                this.top() + border
                : this.controlBar.bottom() + padding)
            : this.categories.bottom()
    );
    this.palette.setHeight(this.bottom() - this.palette.top() - border);
    this.palette.setWidth(this.paletteWidth);

    if (situation !== 'refreshPalette') {
        // stage
        if (this.isEmbedMode) {
            this.stage.setScale(Math.floor(Math.min(
                this.width() / this.stage.dimensions.x,
                this.height() / this.stage.dimensions.y
            ) * 100) / 100);
            flag = this.embedPlayButton.flag;
            flag.size = Math.floor(Math.min(
                this.width(), this.height())) / 5;
            flag.fixLayout();
            this.embedPlayButton.size = flag.size * 1.6;
            this.embedPlayButton.fixLayout();
            if (this.embedOverlay) {
                this.embedOverlay.setExtent(this.extent());
            }
            this.stage.setCenter(this.center());
            this.embedPlayButton.setCenter(this.stage.center());
            flag.setCenter(this.embedPlayButton.center());
            flag.setLeft(flag.left() + flag.size * 0.1); // account for slight asymmetry
        } else if (this.isAppMode) {
            this.stage.setScale(Math.floor(Math.min(
                (this.width() - padding * 2) / this.stage.dimensions.x,
                (this.height() - this.controlBar.height() * 2 - padding * 2)
                / this.stage.dimensions.y
            ) * 10) / 10);
            this.stage.setCenter(this.center());
        } else {
            this.stage.setScale(this.isSmallStage ? this.stageRatio : 1);
            this.stage.setTop(
                cnf.hideControls ?
                    this.top() + border
                    : this.logo.bottom() + padding
            );
            this.stage.setRight(this.right() - border);
            if (cnf.noSprites) {
                maxPaletteWidth = Math.max(
                    200,
                    this.width() -
                    border * 2
                );
            } else {
                maxPaletteWidth = Math.max(
                    200,
                    this.width() -
                    this.stage.width() -
                    this.spriteBar.tabBar.width() -
                    padding * 2 -
                    border * 2
                );
            }
            if (this.paletteWidth > maxPaletteWidth) {
                this.paletteWidth = maxPaletteWidth;
                this.fixLayout();
            }
            this.stageHandle.fixLayout();
            this.paletteHandle.fixLayout();
        }

        // spriteBar
        this.spriteBar.setLeft(cnf.noPalette ?
            this.left() + border
            : this.paletteWidth + padding + border
        );
        this.spriteBar.setTop(
            cnf.hideControls ?
                this.top() + border
                : this.logo.bottom() + padding
        );
        this.spriteBar.setWidth(
            Math.max(0, this.stage.left() - padding - this.spriteBar.left())
        );
        this.spriteBar.setHeight(
            Math.round(this.logo.height() * 2.6)
        );
        this.spriteBar.fixLayout();

        // spriteEditor
        if (this.spriteEditor.isVisible) {
            this.spriteEditor.setLeft(this.spriteBar.left());
            this.spriteEditor.setTop(
                cnf.noSprites || cnf.noSpriteEdits ?
                    (cnf.hideControls ? this.top() + border
                        : this.controlBar.bottom() + padding)
                    : this.spriteBar.bottom() + padding
            );
            this.spriteEditor.setWidth(
                cnf.noSprites ?
                    this.right() - this.spriteEditor.left() - border
                    : this.spriteBar.width()
            );
            this.spriteEditor.setHeight(
                this.bottom() - this.spriteEditor.top() - border
            );
        }

        // corralBar
        this.corralBar.setLeft(this.stage.left());
        this.corralBar.setTop(this.stage.bottom() + padding);
        this.corralBar.setWidth(this.stage.width());

        // corral
        if (!contains(['selectSprite', 'tabEditor'], situation)) {
            this.corral.setPosition(this.corralBar.bottomLeft());
            this.corral.setWidth(this.stage.width());
            this.corral.setHeight(this.bottom() - this.corral.top() - border);
            this.corral.fixLayout();
        }
    }
};

// IDE_Morph project properties

IDE_Morph.prototype.getProjectName = function () {
    return this.scenes.at(1).name;
};

IDE_Morph.prototype.setProjectName = function (string) {
    var projectScene = this.scenes.at(1),
        name = this.newSceneName(string, projectScene);
    if (name !== projectScene.name) {
        projectScene.name = name;
        projectScene.stage.version = Date.now();
        this.recordUnsavedChanges();
        if (projectScene === this.scene) {
            this.controlBar.updateLabel();
        }
    }
    return name;
};

IDE_Morph.prototype.getProjectNotes = function () {
    return this.scenes.at(1).notes;
};

IDE_Morph.prototype.setProjectNotes = function (string) {
    var projectScene = this.scenes.at(1);
    if (string !== projectScene.notes) {
        projectScene.notes = string;
        projectScene.stage.version = Date.now();
        this.recordUnsavedChanges();
        if (projectScene === this.scene) {
            this.controlBar.updateLabel();
        }
    }
};

// IDE_Morph resizing

IDE_Morph.prototype.setExtent = function (point) {
    var cnf = this.config,
        padding = new Point(430, 110),
        minExt,
        ext,
        maxWidth,
        minWidth,
        maxHeight,
        minRatio,
        maxRatio;

    // determine the minimum dimensions making sense for the current mode
    if (this.isAppMode) {
        minExt = new Point(100, 100);
        if (!this.isEmbedMode) {
            minExt = minExt.add(this.controlBar.height() + 10);
        }
    } else if (cnf.noSprites) {
        minExt = new Point(100, 100);
    } else {
        if (this.stageRatio > 1) {
            minExt = padding.add(this.stage.dimensions);
        } else {
            minExt = padding.add(
                this.stage.dimensions.multiplyBy(this.stageRatio)
            );
        }
    }
    ext = point.max(minExt);

    if (!this.isAppMode) {
        // in edit mode adjust stage ratio if necessary
        // (in presentation mode this is already handled separately)
        if (!cnf.noSprites) {
            maxWidth = ext.x -
                (200 + this.spriteBar.tabBar.width() + (this.padding * 2));
            minWidth = SpriteIconMorph.prototype.thumbSize.x * 3;
            maxHeight = (ext.y - SpriteIconMorph.prototype.thumbSize.y * 3.5);
            minRatio = minWidth / this.stage.dimensions.x;
            maxRatio = Math.min(
                (maxWidth / this.stage.dimensions.x),
                (maxHeight / this.stage.dimensions.y)
            );
            this.stageRatio = Math.min(
                maxRatio,
                Math.max(minRatio, this.stageRatio)
            );
        }
    }

    // apply
    IDE_Morph.uber.setExtent.call(this, ext);
    this.fixLayout();
};

// IDE_Morph rendering

IDE_Morph.prototype.render = function (ctx) {
    var frame;
    IDE_Morph.uber.render.call(this, ctx);
    if (this.isAppMode && this.stage) {
        // draw a subtle outline rectangle around the stage
        // in presentation mode
        frame = this.stage.bounds.translateBy(
            this.position().neg()
        ).expandBy(2);
        ctx.strokeStyle = (MorphicPreferences.isFlat ? this.backgroundColor
            : this.groupColor).toString();
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(frame.origin.x, frame.origin.y);
        ctx.lineTo(frame.corner.x, frame.origin.y);
        ctx.lineTo(frame.corner.x, frame.corner.y);
        ctx.lineTo(frame.origin.x, frame.corner.y);
        ctx.closePath();
        ctx.stroke();
    }
};

// IDE_Morph events

IDE_Morph.prototype.reactToWorldResize = function (rect) {
    if (this.isAutoFill) {
        this.setPosition(rect.origin);
        this.setExtent(rect.extent());
    }
    if (this.filePicker) {
        document.body.removeChild(this.filePicker);
        this.filePicker = null;
        this.isImportingLocalFile = false;
    }
};

IDE_Morph.prototype.beginBulkDrop = function () {
    this.bulkDropInProgress = true;
    this.cachedSceneFlag = this.isAddingScenes;
    this.isAddingScenes = true;
};

IDE_Morph.prototype.endBulkDrop = function () {
    this.isAddingScenes = this.cachedSceneFlag;
    this.bulkDropInProgress = false;
};

IDE_Morph.prototype.droppedImage = function (aCanvas, name, embeddedData, src) {
    if (this.config.noImports) { return; }

    var costume = new Costume(
        aCanvas,
        this.currentSprite.newCostumeName(
            name ? name.split('.')[0] : '' // up to period
        )
    );

    if (costume.isTainted()) {
        this.inform(
            'Unable to import this image',
            'The picture you wish to import has been\n' +
            'tainted by a restrictive cross-origin policy\n' +
            'making it unusable for costumes in Snap!. \n\n' +
            'Try downloading this picture first to your\n' +
            'computer, and import it from there.'
        );
        return;
    }

    // directly import embedded blocks if the image was dropped on
    // a scripting area or the palette, otherwise import as costume
    // (with embedded data)
    if (!this.isImportingLocalFile &&
        isString(embeddedData) &&
        ['scripts', 'palette', 'categories'].includes(src) &&
        embeddedData[0] === '<' &&
        ['blocks', 'block', 'script', 'sprite'].some(tag =>
            embeddedData.slice(1).startsWith(tag))
    ) {
        this.isImportingLocalFile = false;
        return this.droppedText(embeddedData, name, '');
    }

    this.isImportingLocalFile = false;
    costume.embeddedData = embeddedData || null;
    this.currentSprite.addCostume(costume);
    this.currentSprite.wearCostume(costume);
    this.spriteBar.tabBar.tabTo('costumes');
    this.spriteEditor.updateList();
    this.hasChangedMedia = true;
    this.currentSprite.recordUserEdit(
        'costume',
        'imported',
        costume.name
    );
};

IDE_Morph.prototype.droppedSVG = function (anImage, name) {
    if (this.config.noImports) { return; }

    var myself,
        viewBox,
        w = 300, h = 150, // setting HTMLImageElement default values
        scale = 1,
        svgNormalized,
        headerLenght = anImage.src.search('base64') + 7,
        // usually 26 from "data:image/svg+xml;base64,"
        svgStrEncoded = anImage.src.substring(headerLenght),
        svgObj = new DOMParser().parseFromString(
            atob(svgStrEncoded), "image/svg+xml"
        ).firstElementChild,
        normalizing = false;

    name = name.split('.')[0];

    // checking for svg 'width' and 'height' attributes
    if (svgObj.attributes.getNamedItem("width") &&
        svgObj.attributes.getNamedItem("height")) {
        w = parseFloat(svgObj.attributes.getNamedItem("width").value);
        h = parseFloat(svgObj.attributes.getNamedItem("height").value);
    } else {
        normalizing = true;
    }

    // checking for svg 'viewBox' attribute
    if (svgObj.attributes.getNamedItem("viewBox")) {
        viewBox = svgObj.attributes.getNamedItem('viewBox').value;
        viewBox = viewBox.split(/[ ,]/).filter(item => item);
        if (viewBox.length == 4) {
            if (normalizing) {
                w = parseFloat(viewBox[2]);
                h = parseFloat(viewBox[3]);
            }
        }
    } else {
        svgObj.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
        normalizing = true;
    }

    // checking if the costume is bigger than the stage and, if so, fit it
    if (this.stage.dimensions.x < w || this.stage.dimensions.y < h) {
        scale = Math.min(
            (this.stage.dimensions.x / w),
            (this.stage.dimensions.y / h)
        );
        normalizing = true;
        w = w * scale;
        h = h * scale;
    }

    // loading image, normalized if it needed
    // all the images are:
    // sized, with 'width' and 'height' attributes
    // fitted to stage dimensions
    // and with their 'viewBox' attribute
    if (normalizing) {
        svgNormalized = new Image(w, h);
        svgObj.setAttribute('width', w);
        svgObj.setAttribute('height', h);
        svgNormalized.src = 'data:image/svg+xml;base64,' +
            btoa(new XMLSerializer().serializeToString(svgObj));
        myself = this;
        svgNormalized.onload = () => myself.loadSVG(svgNormalized, name);
    } else {
        this.loadSVG(anImage, name);
    }
};

IDE_Morph.prototype.loadSVG = function (anImage, name) {
    var costume = new SVG_Costume(anImage, name);

    this.currentSprite.addCostume(costume);
    this.currentSprite.wearCostume(costume);
    this.spriteBar.tabBar.tabTo('costumes');
    this.spriteEditor.updateList();
    this.hasChangedMedia = true;
};

IDE_Morph.prototype.droppedAudio = function (anAudio, name) {
    if (this.config.noImports) { return; }

    if (anAudio.src.indexOf('data:audio') !== 0) {
        // fetch and base 64 encode samples using FileReader
        this.getURL(
            anAudio.src,
            blob => {
                var reader = new window.FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    var base64 = reader.result;
                    base64 = 'data:audio/ogg;base64,' +
                        base64.split(',')[1];
                    anAudio.src = base64;
                    this.droppedAudio(anAudio, name);
                };
            },
            'blob'
        );
    } else {
        this.currentSprite.addSound(anAudio, name.split('.')[0]); // up to '.'
        this.spriteBar.tabBar.tabTo('sounds');
        this.hasChangedMedia = true;
        this.currentSprite.recordUserEdit(
            'sound',
            'imported',
            name
        );
    }
};

IDE_Morph.prototype.droppedText = function (aString, name, fileType) {
    if (this.config.noImports) { return; }

    var lbl = name ? name.split('.')[0] : '',
        ext = name ? name.slice(name.lastIndexOf('.') + 1).toLowerCase() : '',
        setting = this.isAddingScenes;

    // handle the special situation of adding a scene to the current project
    if (this.isAddingNextScene) {
        this.isAddingScenes = true;
        if (aString.indexOf('<project') === 0) {
            location.hash = '';
            this.openProjectString(aString);
        } else if (aString.indexOf('<snapdata') === 0) {
            location.hash = '';
            this.openCloudDataString(aString);
        }
        this.isAddingScenes = setting;
        this.isAddingNextScene = false;
        return;
    }

    // check for Snap specific files, projects, libraries, sprites, scripts
    if (aString.indexOf('<project') === 0) {
        this.backup(
            () => {
                location.hash = '';
                this.openProjectString(aString);
            }
        );
        return;
    }
    if (aString.indexOf('<snapdata') === 0) {
        location.hash = '';
        return this.openCloudDataString(aString);
    }

    this.recordUnsavedChanges();

    if (aString.indexOf('<blocks') === 0) {
        return this.openBlocksString(aString, lbl, true);
    }
    if (aString.indexOf('<sprites') === 0) {
        return this.openSpritesString(aString);
    }
    if (aString.indexOf('<media') === 0) {
        return this.openMediaString(aString);
    }
    if (aString.indexOf('<block') === 0) {
        aString = '<script>' + aString + '</script>';
    }
    if (aString.indexOf('<scriptsonly') === 0) {
        return this.openScriptsOnlyString(aString);
    }
    if (aString.indexOf('<script') === 0) {
        return this.openScriptString(aString);
    }

    // check for encoded data-sets, CSV, JSON
    if (fileType.indexOf('csv') !== -1 || ext === 'csv') {
        return this.openDataString(aString, lbl, 'csv');
    }
    if (fileType.indexOf('json') !== -1 || ext === 'json') {
        return this.openDataString(aString, lbl, 'json');
    }

    // import as plain text data
    this.openDataString(aString, lbl, 'text');
};

IDE_Morph.prototype.droppedBinary = function (anArrayBuffer, name) {
    if (this.config.noImports) { return; }

    // dynamically load ypr->Snap!
    var ypr = document.getElementById('ypr'),
        myself = this,
        suffix = name.substring(name.length - 3);

    if (suffix.toLowerCase() !== 'ypr') { return; }

    function loadYPR(buffer, lbl) {
        var reader = new sb.Reader(),
            pname = lbl.split('.')[0]; // up to period
        reader.onload = function (info) {
            myself.droppedText(new sb.XMLWriter().write(pname, info));
        };
        reader.readYPR(new Uint8Array(buffer));
    }

    if (!ypr) {
        ypr = document.createElement('script');
        ypr.id = 'ypr';
        ypr.onload = function () { loadYPR(anArrayBuffer, name); };
        document.head.appendChild(ypr);
        ypr.src = this.resourceURL('src', 'ypr.js');
    } else {
        loadYPR(anArrayBuffer, name);
    }
};

// IDE_Morph button actions

IDE_Morph.prototype.refreshPalette = function (shouldIgnorePosition) {
    var oldTop = this.palette.contents.top();

    this.createPalette();
    if (this.isAppMode) {
        this.palette.hide();
        return;
    }
    this.fixLayout('refreshPalette');
    if (!shouldIgnorePosition) {
        this.palette.contents.setTop(oldTop);
    }
    this.palette.adjustScrollBars();
};

IDE_Morph.prototype.scrollPaletteToCategory = function (category) {
    var palette = this.palette,
        msecs = this.isAnimating ? 200 : 0,
        firstInCategory,
        delta;

    if (palette.isForSearching) {
        this.refreshPalette();
        palette = this.palette;
    }
    firstInCategory = palette.contents.children.find(
        block => block.category === category
    );
    if (firstInCategory === undefined) { return; }
    delta = palette.top() - firstInCategory.top() + palette.padding;
    if (delta === 0) { return; }
    this.world().animations.push(new Animation(
        y => { // setter
            palette.contents.setTop(y);
            palette.contents.keepInScrollFrame();
            palette.adjustScrollBars();
        },
        () => palette.contents.top(), // getter
        delta, // delta
        msecs, // duration in ms
        t => Math.pow(t, 6), // easing
        null // onComplete
    ));
};

IDE_Morph.prototype.topVisibleCategoryInPalette = function () {
    // private - answer the topmost (partially) visible
    // block category in the palette, so it can be indicated
    // as "current category" in the category selection buttons
    var top;
    if (!this.palette) { return; }
    top = this.palette.contents.children.find(morph =>
        morph.category && morph.bounds.intersects(this.palette.bounds)
    );
    if (top) {
        if (top.category === 'other') {
            if (top.selector === 'doWarp') {
                return 'control';
            }
            if (top instanceof RingMorph) {
                return 'operators';
            }
            return 'variables';
        }
        if (top.category === 'lists') {
            return 'variables';
        }
        return top.category;
    }
    return null;
};

IDE_Morph.prototype.pressStart = function () {
    if (this.world().currentKey === 16) { // shiftClicked
        this.toggleFastTracking();
    } else {
        this.stage.threads.pauseCustomHatBlocks = false;
        this.controlBar.stopButton.refresh();
        this.runScripts();
    }
};

IDE_Morph.prototype.toggleFastTracking = function () {
    if (this.stage.isFastTracked) {
        this.stopFastTracking();
    } else {
        this.startFastTracking();
    }
};

IDE_Morph.prototype.toggleSingleStepping = function () {
    this.stage.threads.toggleSingleStepping();
    this.controlBar.steppingButton.refresh();
    this.controlBar.refreshSlider();
};

IDE_Morph.prototype.toggleCameraSupport = function () {
    CamSnapshotDialogMorph.prototype.enableCamera =
        !CamSnapshotDialogMorph.prototype.enableCamera;
    this.spriteBar.tabBar.tabTo(this.currentTab);
    this.createCorralBar();
    this.fixLayout();
};

IDE_Morph.prototype.startFastTracking = function () {
    this.stage.isFastTracked = true;
    this.controlBar.startButton.labelString = new SymbolMorph('flash', 14);
    this.controlBar.startButton.createLabel();
    this.controlBar.startButton.fixLayout();
    this.controlBar.startButton.rerender();
};

IDE_Morph.prototype.stopFastTracking = function () {
    this.stage.isFastTracked = false;
    this.controlBar.startButton.labelString = new SymbolMorph('flag', 14);
    this.controlBar.startButton.createLabel();
    this.controlBar.startButton.fixLayout();
    this.controlBar.startButton.rerender();
};

IDE_Morph.prototype.runScripts = function () {
    if (this.stage.threads.pauseCustomHatBlocks) {
        this.stage.threads.pauseCustomHatBlocks = false;
        this.controlBar.stopButton.refresh();
    }
    this.stage.fireGreenFlagEvent();
};

IDE_Morph.prototype.togglePauseResume = function () {
    if (this.stage.threads.isPaused()) {
        this.stage.threads.resumeAll(this.stage);
    } else {
        this.stage.threads.pauseAll(this.stage);
    }
    this.controlBar.pauseButton.refresh();
};

IDE_Morph.prototype.isPaused = function () {
    if (!this.stage) { return false; }
    return this.stage.threads.isPaused();
};

IDE_Morph.prototype.stopAllScripts = function () {
    if (this.world().currentKey === 16) { // shiftClicked
        this.scenes.map(scn => scn.stop(true));
    } else {
        this.scene.stop();
    }
    this.controlBar.stopButton.refresh();
};

IDE_Morph.prototype.selectSprite = function (sprite, noEmptyRefresh) {
    // prevent switching to another sprite if a block editor or a block
    // visibility dialog box is open
    // so local blocks of different sprites don't mix
    if (
        detect(
            this.world().children,
            morph => morph instanceof BlockEditorMorph ||
                morph instanceof BlockDialogMorph ||
                morph instanceof BlockVisibilityDialogMorph
        )
    ) {
        return;
    }
    if (this.currentSprite && this.currentSprite.scripts.focus) {
        this.currentSprite.scripts.focus.stopEditing();
    }
    this.currentSprite = sprite;
    this.scene.currentSprite = sprite;
    if (!noEmptyRefresh) {
        this.categories.refreshEmpty();
    }
    this.createPalette();
    this.createSpriteBar();
    this.createSpriteEditor();
    this.corral.refresh();
    this.fixLayout('selectSprite');
    this.currentSprite.scripts.fixMultiArgs();
};

// IDE_Morph retina display support

IDE_Morph.prototype.toggleRetina = function () {
    if (isRetinaEnabled()) {
        disableRetinaSupport();
    } else {
        enableRetinaSupport();
    }
    this.world().fillPage();
    if (!MorphicPreferences.isFlat) {
        IDE_Morph.prototype.scriptsPaneTexture = this.scriptsTexture();
    }
    this.stage.clearPenTrails();
    this.refreshIDE();
};

// IDE_Morph skins

IDE_Morph.prototype.defaultDesign = function () {
    this.setDefaultDesign();
    this.refreshIDE();
    this.removeSetting('design');
};

IDE_Morph.prototype.flatDesign = function () {
    this.setFlatDesign();
    this.refreshIDE();
    this.saveSetting('design', 'flat');
};

IDE_Morph.prototype.refreshIDE = function () {
    var projectData;

    this.scene.captureGlobalSettings();
    if (Process.prototype.isCatchingErrors) {
        try {
            projectData = this.serializer.serialize(
                new Project(this.scenes, this.scene)
            );
        } catch (err) {
            this.showMessage('Serialization failed: ' + err);
        }
    } else {
        projectData = this.serializer.serialize(
            new Project(this.scenes, this.scene)
        );
    }
    SpriteMorph.prototype.initBlocks();
    this.buildPanes();
    this.fixLayout();
    if (this.loadNewProject) {
        this.newProject();
    } else {
        this.openProjectString(projectData);
    }
};

// IDE_Morph settings persistance

IDE_Morph.prototype.applySavedSettings = function () {
    if (this.config.noUserSettings) { return; }

    var design = this.getSetting('design'),
        zoom = this.getSetting('zoom'),
        fade = this.getSetting('fade'),
        language = this.getSetting('language'),
        click = this.getSetting('click'),
        longform = this.getSetting('longform'),
        plainprototype = this.getSetting('plainprototype'),
        keyboard = this.getSetting('keyboard'),
        tables = this.getSetting('tables'),
        tableLines = this.getSetting('tableLines'),
        autoWrapping = this.getSetting('autowrapping'),
        solidshadow = this.getSetting('solidshadow');

    // design
    if (design === 'flat') {
        this.setFlatDesign();
    } else {
        this.setDefaultDesign();
    }

    // blocks zoom
    if (zoom) {
        SyntaxElementMorph.prototype.setScale(Math.min(zoom, 12));
        CommentMorph.prototype.refreshScale();
        SpriteMorph.prototype.initBlocks();
    }

    // blocks fade
    if (!isNil(fade)) {
        this.setBlockTransparency(+fade);
    }

    // language
    if (language && language !== 'en') {
        this.userLanguage = language;
    } else {
        this.userLanguage = null;
    }

    //  click
    if (click && !BlockMorph.prototype.snapSound) {
        BlockMorph.prototype.toggleSnapSound();
    }

    // long form
    if (longform) {
        InputSlotDialogMorph.prototype.isLaunchingExpanded = true;
    }

    // keyboard editing
    if (keyboard === 'false') {
        ScriptsMorph.prototype.enableKeyboard = false;
    } else {
        ScriptsMorph.prototype.enableKeyboard = true;
    }

    // tables
    if (tables === 'false') {
        List.prototype.enableTables = false;
    } else {
        List.prototype.enableTables = true;
    }

    // tableLines
    if (tableLines) {
        TableMorph.prototype.highContrast = true;
    } else {
        TableMorph.prototype.highContrast = false;
    }

    // nested auto-wrapping
    if (autoWrapping === 'false') {
        ScriptsMorph.prototype.enableNestedAutoWrapping = false;
    } else {
        ScriptsMorph.prototype.enableNestedAutoWrapping = true;
    }

    // plain prototype labels
    if (plainprototype) {
        BlockLabelPlaceHolderMorph.prototype.plainLabel = true;
    }

    // solid shadow
    if (solidshadow) {
        window.useBlurredShadows = false;
        this.rerender();
    }
};

IDE_Morph.prototype.saveSetting = function (key, value) {
    if (!this.savingPreferences || this.config.noUserSettings) {
        return;
    }
    if (this.hasLocalStorage()) {
        localStorage['-snap-setting-' + key] = value;
    }
};

IDE_Morph.prototype.getSetting = function (key) {
    if (this.hasLocalStorage()) {
        return localStorage['-snap-setting-' + key];
    }
    return null;
};

IDE_Morph.prototype.removeSetting = function (key) {
    if (this.hasLocalStorage()) {
        delete localStorage['-snap-setting-' + key];
    }
};

IDE_Morph.prototype.hasLocalStorage = function () {
    // checks whether localStorage is available,
    // this kludgy try/catch mechanism is needed
    // because Safari 11 is paranoid about accessing
    // localstorage from the file:// protocol
    try {
        return !isNil(localStorage);
    } catch (err) {
        return false;
    }
};

// IDE_Morph recording unsaved changes

IDE_Morph.prototype.hasUnsavedEdits = function () {
    return this.scenes.itemsArray().some(any => any.hasUnsavedEdits);
};

IDE_Morph.prototype.recordUnsavedChanges = function (spriteName, details) {
    this.scene.hasUnsavedEdits = true;
    this.updateChanges(spriteName, details);
};

IDE_Morph.prototype.recordSavedChanges = function () {
    this.scenes.itemsArray().forEach(scene => scene.hasUnsavedEdits = false);
    this.updateChanges(this.currentSprite.name, ['project', 'save']);
};

IDE_Morph.prototype.updateChanges = function (spriteName, details) {
    // private
    // invalidate saved backup, if any - but don't actually delete it yet
    if (this.hasLocalStorage() &&
        (localStorage['-snap-bakuser-'] == this.cloud.username)) {
        localStorage['-snap-bakflag-'] = 'expired';
    }

    // update the version timestamp so my observer can react
    this.version = Date.now();

    // indicate unsaved changes in the project title display
    this.controlBar.updateLabel();

    // trigger an event
    this.stage.fireUserEditEvent(
        spriteName || this.currentSprite.name,
        details || [],
        this.version
    );
};

// IDE_Morph project backup

IDE_Morph.prototype.backup = function (callback) {
    // in case of unsaved changes let the user confirm whether to
    // abort the operation or go ahead with it.
    // Save the current project for the currently logged in user
    // to localstorage, then perform the given callback, e.g.
    // load a new project.
    if (this.hasUnsavedEdits()) {
        this.confirm(
            'Replace the current project with a new one?',
            'Unsaved Changes!',
            () => this.backupAndDo(callback)
        );
    } else {
        callback();
    }
};

IDE_Morph.prototype.backupAndDo = function (callback) {
    // private
    var username = this.cloud.username;
    this.scene.captureGlobalSettings();
    try {
        localStorage['-snap-backup-'] = this.serializer.serialize(
            new Project(this.scenes, this.scene)
        );
        delete localStorage['-snap-bakflag-'];
        if (username) {
            localStorage['-snap-bakuser-'] = username;
        } else {
            delete localStorage['-snap-bakuser-'];
        }
        callback();
    } catch (err) {
        nop(err);
        this.confirm(
            'Backup failed. This cannot be undone, proceed anyway?',
            'Unsaved Changes!',
            callback
        );
    }
};

IDE_Morph.prototype.clearBackup = function () {
    delete localStorage['-snap-bakflag-'];
    delete localStorage['-snap-bakuser-'];
    delete localStorage['-snap-backup-'];
};

IDE_Morph.prototype.availableBackup = function (anyway) {
    // return the name of the project that can be restored in double
    // quotes for the currently logged in user.
    // Otherwise return null
    var username = this.cloud.username,
        bak, ix;
    if (this.hasLocalStorage()) {
        if (
            localStorage['-snap-bakuser-'] == username &&  // null == undefined
            (!localStorage['-snap-bakflag-'] || anyway)
        ) {
            bak = localStorage['-snap-backup-'];
            if (bak) {
                ix = bak.indexOf('"', 15);
                if (ix > 15) {
                    return bak.slice(15, ix);
                }
            }
        }
    }
    return null;
};

IDE_Morph.prototype.restore = function () {
    // load the backed up project for the currently logged im user
    // and backup the current one, in case they want to switch back to it
    var username = this.cloud.username,
        bak;
    if (this.hasLocalStorage()) {
        if (localStorage['-snap-bakuser-'] == username) { // null == undefined
            bak = localStorage['-snap-backup-'];
            if (bak) {
                this.backup(() => {
                    this.openProjectString(
                        bak,
                        () => this.recordUnsavedChanges()
                    );
                });
            }
        }
    }
};

// IDE_Morph sprite list access

IDE_Morph.prototype.addNewSprite = function () {
    var sprite = new SpriteMorph(this.globalVariables),
        rnd = Process.prototype.reportBasicRandom;

    sprite.name = this.newSpriteName(sprite.name);
    sprite.setCenter(this.stage.center());
    this.stage.add(sprite);
    sprite.fixLayout();
    sprite.rerender();

    // randomize sprite properties
    sprite.setColorDimension(0, rnd.call(this, 0, 100));
    sprite.setColorDimension(1, 100);
    sprite.setColorDimension(2, rnd.call(this, 25, 75));

    sprite.setXPosition(rnd.call(this, -220, 220));
    sprite.setYPosition(rnd.call(this, -160, 160));

    if (this.world().currentKey === 16) { // shift-click
        sprite.turn(rnd.call(this, 1, 360));
    }

    this.sprites.add(sprite);
    this.corral.addSprite(sprite);
    this.selectSprite(sprite);
};

IDE_Morph.prototype.paintNewSprite = function () {
    var sprite = new SpriteMorph(this.globalVariables),
        cos = new Costume();

    sprite.name = this.newSpriteName(sprite.name);
    sprite.setCenter(this.stage.center());
    this.stage.add(sprite);
    this.sprites.add(sprite);
    this.corral.addSprite(sprite);
    this.selectSprite(sprite);
    cos.edit(
        this.world(),
        this,
        true,
        () => this.removeSprite(sprite),
        () => {
            sprite.addCostume(cos);
            sprite.wearCostume(cos);
        }
    );
};

IDE_Morph.prototype.newCamSprite = function () {
    var sprite = new SpriteMorph(this.globalVariables),
        camDialog;

    sprite.name = this.newSpriteName(sprite.name);
    sprite.setCenter(this.stage.center());
    this.stage.add(sprite);
    this.sprites.add(sprite);
    this.corral.addSprite(sprite);
    this.selectSprite(sprite);

    camDialog = new CamSnapshotDialogMorph(
        this,
        sprite,
        () => this.removeSprite(sprite),
        function (costume) { // needs to be "function" so it can access "this"
            sprite.addCostume(costume);
            sprite.wearCostume(costume);
            this.close();
        });

    camDialog.popUp(this.world());
};

IDE_Morph.prototype.recordNewSound = function () {
    var soundRecorder;

    soundRecorder = new SoundRecorderDialogMorph(
        audio => {
            var sound;
            if (audio) {
                sound = this.currentSprite.addSound(
                    audio,
                    this.newSoundName('recording')
                );
                this.makeSureRecordingIsMono(sound);
                this.spriteBar.tabBar.tabTo('sounds');
                this.hasChangedMedia = true;
            }
        });

    soundRecorder.key = 'microphone';
    soundRecorder.popUp(this.world());
};

IDE_Morph.prototype.makeSureRecordingIsMono = function (sound) {
    // private and temporary, a horrible kludge to work around browsers'
    // reluctance to implement audio recording constraints that let us
    // record sound in mono only. As of January 2020 the audio channelCount
    // constraint only works in Firefox, hence this terrible function to
    // force convert a stereo sound to mono for Chrome.
    // If this code is still here next year, something is very wrong.
    // -Jens

    decodeSound(sound, makeMono);

    function decodeSound(sound, callback) {
        var base64, binaryString, len, bytes, i, arrayBuffer, audioCtx;
        if (sound.audioBuffer) {
            return callback(sound);
        }
        base64 = sound.audio.src.split(',')[1];
        binaryString = window.atob(base64);
        len = binaryString.length;
        bytes = new Uint8Array(len);
        for (i = 0; i < len; i += 1) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        arrayBuffer = bytes.buffer;
        audioCtx = Note.prototype.getAudioContext();
        sound.isDecoding = true;
        audioCtx.decodeAudioData(
            arrayBuffer,
            buffer => {
                sound.audioBuffer = buffer;
                return callback(sound);
            },
            err => { throw err; }
        );
    }

    function makeMono(sound) {
        var samples, audio, blob, reader;
        if (sound.audioBuffer.numberOfChannels === 1) { return; }
        samples = sound.audioBuffer.getChannelData(0);

        audio = new Audio();
        blob = new Blob(
            [
                audioBufferToWav(
                    encodeSound(samples, 44100).audioBuffer
                )
            ],
            { type: "audio/wav" }
        );
        reader = new FileReader();
        reader.onload = () => {
            audio.src = reader.result;
            sound.audio = audio; // .... aaaand we're done!
            sound.audioBuffer = null;
            sound.cachedSamples = null;
            sound.isDecoding = false;
            // console.log('made mono', sound);
        };
        reader.readAsDataURL(blob);
    }

    function encodeSound(samples, rate) {
        var ctx = Note.prototype.getAudioContext(),
            frameCount = samples.length,
            arrayBuffer = ctx.createBuffer(1, frameCount, +rate || 44100),
            i,
            source;

        if (!arrayBuffer.copyToChannel) {
            arrayBuffer.copyToChannel = function (src, channel) {
                var buffer = this.getChannelData(channel);
                for (i = 0; i < src.length; i += 1) {
                    buffer[i] = src[i];
                }
            };
        }
        arrayBuffer.copyToChannel(
            Float32Array.from(samples),
            0,
            0
        );
        source = ctx.createBufferSource();
        source.buffer = arrayBuffer;
        source.audioBuffer = source.buffer;
        return source;
    }

    function audioBufferToWav(buffer, opt) {
        var sampleRate = buffer.sampleRate,
            format = (opt || {}).float32 ? 3 : 1,
            bitDepth = format === 3 ? 32 : 16,
            result;

        result = buffer.getChannelData(0);
        return encodeWAV(result, format, sampleRate, 1, bitDepth);
    }

    function encodeWAV(
        samples,
        format,
        sampleRate,
        numChannels,
        bitDepth
    ) {
        var bytesPerSample = bitDepth / 8,
            blockAlign = numChannels * bytesPerSample,
            buffer = new ArrayBuffer(44 + samples.length * bytesPerSample),
            view = new DataView(buffer);

        function writeFloat32(output, offset, input) {
            for (var i = 0; i < input.length; i += 1, offset += 4) {
                output.setFloat32(offset, input[i], true);
            }
        }

        function floatTo16BitPCM(output, offset, input) {
            var i, s;
            for (i = 0; i < input.length; i += 1, offset += 2) {
                s = Math.max(-1, Math.min(1, input[i]));
                output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
            }
        }

        function writeString(view, offset, string) {
            for (var i = 0; i < string.length; i += 1) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        }

        writeString(view, 0, 'RIFF'); // RIFF identifier
        // RIFF chunk length:
        view.setUint32(4, 36 + samples.length * bytesPerSample, true);
        writeString(view, 8, 'WAVE'); // RIFF type
        writeString(view, 12, 'fmt '); // format chunk identifier
        view.setUint32(16, 16, true); // format chunk length
        view.setUint16(20, format, true); // sample format (raw)
        view.setUint16(22, numChannels, true); // channel count
        view.setUint32(24, sampleRate, true); // sample rate
        // byte rate (sample rate * block align):
        view.setUint32(28, sampleRate * blockAlign, true);
        // block align (channel count * bytes per sample):
        view.setUint16(32, blockAlign, true);
        view.setUint16(34, bitDepth, true); // bits per sample
        writeString(view, 36, 'data'); // data chunk identifier
        // data chunk length:
        view.setUint32(40, samples.length * bytesPerSample, true);
        if (format === 1) { // Raw PCM
            floatTo16BitPCM(view, 44, samples);
        } else {
            writeFloat32(view, 44, samples);
        }
        return buffer;
    }
};

IDE_Morph.prototype.duplicateSprite = function (sprite) {
    var duplicate = sprite.fullCopy();
    duplicate.isDown = false;
    duplicate.setPosition(this.world().hand.position());
    duplicate.appearIn(this);
    duplicate.keepWithin(this.stage);
    duplicate.isDown = sprite.isDown;
    this.selectSprite(duplicate);
    duplicate.recordUserEdit(
        'corral',
        'duplicate',
        sprite.name
    );
};

IDE_Morph.prototype.instantiateSprite = function (sprite) {
    var instance = sprite.fullCopy(true),
        hats = instance.allHatBlocksFor('__clone__init__');
    instance.isDown = false;
    instance.appearIn(this);
    if (hats.length) {
        instance.initClone(hats);
    } else {
        instance.setPosition(this.world().hand.position());
        instance.keepWithin(this.stage);
    }
    instance.isDown = sprite.isDown;
    this.selectSprite(instance);
    instance.recordUserEdit(
        'corral',
        'clone',
        sprite.name
    );
};

IDE_Morph.prototype.removeSprite = function (sprite, enableUndelete = true) {
    var idx;
    sprite.parts.slice().forEach(part =>
        this.removeSprite(part)
    );
    idx = this.sprites.asArray().indexOf(sprite) + 1;
    this.stage.threads.stopAllForReceiver(sprite);
    sprite.recordUserEdit(
        'corral',
        'delete',
        sprite.name
    );
    sprite.corpsify();
    sprite.destroy();
    this.stage.watchers().forEach(watcher => {
        if (watcher.object() === sprite) {
            watcher.destroy();
        }
    });
    if (idx > 0) {
        this.sprites.remove(idx);
    }
    this.createCorral(true); // keep scenes
    this.fixLayout();
    this.currentSprite = detect(
        this.stage.children,
        morph => morph instanceof SpriteMorph && !morph.isTemporary
    ) || this.stage;

    this.selectSprite(this.currentSprite);

    // remember the deleted sprite so it can be recovered again later
    if (enableUndelete) {
        this.scene.trash.push(sprite);
    }
};

IDE_Morph.prototype.newSoundName = function (name) {
    var lastSound = this.currentSprite.sounds.at(
        this.currentSprite.sounds.length()
    );

    return this.newName(
        name || lastSound.name,
        this.currentSprite.sounds.asArray().map(eachSound =>
            eachSound.name
        )
    );
};

IDE_Morph.prototype.newSpriteName = function (name, ignoredSprite) {
    var all = this.sprites.asArray().concat(this.stage).filter(each =>
        each !== ignoredSprite
    ).map(each => each.name);
    return this.newName(name, all);
};

IDE_Morph.prototype.newSceneName = function (name, ignoredScene) {
    var sName = name.replace(/['"]/g, ''), // filter out quotation marks
        all = this.scenes.asArray().filter(each =>
            each !== ignoredScene
        ).map(each => each.name);
    return this.newName(sName, all);
};

IDE_Morph.prototype.newName = function (name, elements) {
    var count = 1,
        newName = name,
        exist = e => snapEquals(e, newName);

    while (elements.some(exist)) {
        count += 1;
        newName = name + '(' + count + ')';
    }
    return newName;
};

// IDE_Morph identifying sprites by name

IDE_Morph.prototype.spriteNamed = function (name) {
    // answer the SnapObject (sprite or stage) indicated by its name
    // or the currently edited object if no name is given or none is found
    var match;
    if (name === this.stage.name) {
        return this.stage;
    }
    match = detect(
        this.sprites,
        sprite => sprite.name === name
    );
    if (!match) {
        // check if the sprite in question is currently being
        // dragged around
        match = detect(
            this.world().hand.children,
            morph => morph instanceof SpriteMorph && morph.name === name
        );
    }
    return match || this.currentSprite;
};

// IDE_Morph deleting scripts

IDE_Morph.prototype.removeBlock = function (aBlock, justThis) {
    this.stage.threads.stopAllForBlock(aBlock);
    aBlock.destroy(justThis);
};

// IDE_Morph menus

IDE_Morph.prototype.userMenu = function () {
    var menu = new MenuMorph(this);
    // menu.addItem('help', 'nop');
    return menu;
};

IDE_Morph.prototype.snapMenu = function () {
    var menu,
        world = this.world();

    menu = new MenuMorph(this);
    menu.addItem('About...', 'aboutSnap');
    menu.addLine();
    menu.addItem(
        'Reference manual',
        () => {
            var url = this.resourceURL('help', 'SnapManual.pdf');
            window.open(url, 'SnapReferenceManual');
        }
    );
    menu.addItem(
        'Snap! website',
        () => window.open('https://snap.berkeley.edu/', 'SnapWebsite')
    );
    menu.addItem(
        'Download source',
        () => window.open(
            'https://github.com/jmoenig/Snap/releases/latest',
            'SnapSource'
        )
    );
    if (world.isDevMode) {
        menu.addLine();
        menu.addItem(
            'Switch back to user mode',
            'switchToUserMode',
            'disable deep-Morphic\ncontext menus'
            + '\nand show user-friendly ones',
            new Color(0, 100, 0)
        );
    } else if (world.currentKey === 16) { // shift-click
        menu.addLine();
        menu.addItem(
            'Switch to dev mode',
            'switchToDevMode',
            'enable Morphic\ncontext menus\nand inspectors,'
            + '\nnot user-friendly!',
            new Color(100, 0, 0)
        );
    }
    menu.popup(world, this.logo.bottomLeft());
};

IDE_Morph.prototype.cloudMenu = function () {
    var menu,
        world = this.world(),
        pos = this.controlBar.cloudButton.bottomLeft(),
        shiftClicked = (world.currentKey === 16);

    if (location.protocol === 'file:' && !shiftClicked) {
        this.showMessage('cloud unavailable without a web server.');
        return;
    }

    menu = new MenuMorph(this);
    if (shiftClicked) {
        menu.addItem(
            'url...',
            'setCloudURL',
            null,
            new Color(100, 0, 0)
        );
        menu.addLine();
    }
    if (!this.cloud.username) {
        menu.addItem(
            'Login...',
            'initializeCloud'
        );
        menu.addItem(
            'Signup...',
            'createCloudAccount'
        );
        menu.addItem(
            'Reset Password...',
            'resetCloudPassword'
        );
        menu.addItem(
            'Resend Verification Email...',
            'resendVerification'
        );
    } else {
        menu.addItem(
            localize('Logout') + ' ' + this.cloud.username,
            'logout'
        );
        menu.addItem(
            'Change Password...',
            'changeCloudPassword'
        );
    }
    if (this.hasCloudProject()) {
        menu.addLine();
        menu.addItem(
            'Open in Community Site',
            () => {
                var dict = this.urlParameters();
                window.open(
                    this.cloud.showProjectPath(
                        dict.Username, dict.ProjectName
                    ),
                    '_blank'
                );
            }
        );
    }
    if (shiftClicked) {
        menu.addLine();
        menu.addItem(
            'export project media only...',
            () => {
                var pn = this.getProjectName();
                if (pn) {
                    this.exportProjectMedia(pn);
                } else {
                    this.prompt(
                        'Export Project As...',
                        name => this.exportProjectMedia(name),
                        null,
                        'exportProject'
                    );
                }
            },
            null,
            this.hasChangedMedia ? new Color(100, 0, 0) : new Color(0, 100, 0)
        );
        menu.addItem(
            'export project without media...',
            () => {
                var pn = this.getProjectName();
                if (pn) {
                    this.exportProjectNoMedia(pn);
                } else {
                    this.prompt(
                        'Export Project As...',
                        name => this.exportProjectNoMedia(name),
                        null,
                        'exportProject'
                    );
                }
            },
            null,
            new Color(100, 0, 0)
        );
        menu.addItem(
            'export project as cloud data...',
            () => {
                var pn = this.getProjectName();
                if (pn) {
                    this.exportProjectAsCloudData(pn);
                } else {
                    this.prompt(
                        'Export Project As...',
                        name => this.exportProjectAsCloudData(name),
                        null,
                        'exportProject'
                    );
                }
            },
            null,
            new Color(100, 0, 0)
        );
        menu.addLine();
        menu.addItem(
            'open shared project from cloud...',
            () => {
                this.prompt(
                    'Author name…',
                    usr => {
                        this.prompt(
                            'Project name...',
                            prj => {
                                this.showMessage(
                                    'Fetching project\nfrom the cloud...'
                                );
                                this.cloud.getPublicProject(
                                    prj,
                                    usr.toLowerCase(),
                                    projectData => {
                                        var msg;
                                        if (
                                            !Process.prototype.isCatchingErrors
                                        ) {
                                            window.open(
                                                'data:text/xml,' + projectData
                                            );
                                        }
                                        this.nextSteps([
                                            () => {
                                                msg = this.showMessage(
                                                    'Opening project...'
                                                );
                                            },
                                            () => {
                                                this.rawOpenCloudDataString(
                                                    projectData
                                                );
                                                msg.destroy();
                                            },
                                        ]);
                                    },
                                    this.cloudError()
                                );
                            },
                            null,
                            'project'
                        );
                    },
                    null,
                    'project'
                );
            },
            null,
            new Color(100, 0, 0)
        );
    }
    menu.popup(world, pos);
};

IDE_Morph.prototype.settingsMenu = function () {
    var menu,
        stage = this.stage,
        world = this.world(),
        pos = this.controlBar.settingsButton.bottomLeft(),
        shiftClicked = (world.currentKey === 16),
        on = new SymbolMorph(
            'checkedBox',
            MorphicPreferences.menuFontSize * 0.75
        ),
        off = new SymbolMorph(
            'rectangle',
            MorphicPreferences.menuFontSize * 0.75
        );

    function addPreference(label, toggle, test, onHint, offHint, hide) {
        if (!hide || shiftClicked) {
            menu.addItem(
                [
                    (test ? on : off),
                    localize(label)
                ],
                toggle,
                test ? onHint : offHint,
                hide ? new Color(100, 0, 0) : null
            );
        }
    }

    function addSubPreference(label, toggle, test, onHint, offHint, hide) {
        if (!hide || shiftClicked) {
            menu.addItem(
                [
                    (test ? on : off),
                    '  ' + localize(label)
                ],
                toggle,
                test ? onHint : offHint,
                hide ? new Color(100, 0, 0) : null
            );
        }
    }

    menu = new MenuMorph(this);
    menu.addPair(
        [
            new SymbolMorph(
                'globe',
                MorphicPreferences.menuFontSize
            ),
            localize('Language...')
        ],
        'languageMenu'
    );
    menu.addItem(
        'Zoom blocks...',
        'userSetBlocksScale'
    );
    menu.addItem(
        'Fade blocks...',
        'userFadeBlocks'
    );
    menu.addItem(
        'Stage size...',
        'userSetStageSize'
    );
    if (shiftClicked) {
        menu.addItem(
            'Dragging threshold...',
            'userSetDragThreshold',
            'specify the distance the hand has to move\n' +
            'before it picks up an object',
            new Color(100, 0, 0)
        );
    }
    menu.addItem(
        'Microphone resolution...',
        'microphoneMenu'
    );
    menu.addLine();
    addPreference(
        'JavaScript extensions',
        () => {
            /*
            if (!Process.prototype.enableJS) {
                this.logout();
            }
            */
            Process.prototype.enableJS = !Process.prototype.enableJS;
            if (Process.prototype.enableJS) {
                // show JS-func primitive in case a microworld hides it
                delete StageMorph.prototype.hiddenPrimitives.reportJSFunction;
            }
            this.flushBlocksCache('operators');
            this.refreshPalette();
            this.categories.refreshEmpty();
        },
        Process.prototype.enableJS,
        'uncheck to disable support for\nnative JavaScript functions',
        'check to support\nnative JavaScript functions' /* +
            '.\n' +
            'NOTE: You will have to manually\n' +
            'sign in again to access your account.' */
    );
    addPreference(
        'Extension blocks',
        () => {
            SpriteMorph.prototype.showingExtensions =
                !SpriteMorph.prototype.showingExtensions;
            this.flushBlocksCache('variables');
            this.refreshPalette();
            this.categories.refreshEmpty();
        },
        SpriteMorph.prototype.showingExtensions,
        'uncheck to hide extension\nprimitives in the palette',
        'check to show extension\nprimitives in the palette'
    );
    /*
    addPreference(
        'Add scenes',
        () => this.isAddingScenes = !this.isAddingScenes,
        this.isAddingScenes,
        'uncheck to replace the current project,\nwith a new one',
        'check to add other projects,\nto this one',
        true
    );
    */
    if (isRetinaSupported()) {
        addPreference(
            'Retina display support',
            'toggleRetina',
            isRetinaEnabled(),
            'uncheck for lower resolution,\nsaves computing resources',
            'check for higher resolution,\nuses more computing resources',
            true
        );
    }
    addPreference(
        'Input sliders',
        'toggleInputSliders',
        MorphicPreferences.useSliderForInput,
        'uncheck to disable\ninput sliders for\nentry fields',
        'check to enable\ninput sliders for\nentry fields'
    );
    if (MorphicPreferences.useSliderForInput) {
        addSubPreference(
            'Execute on slider change',
            'toggleSliderExecute',
            ArgMorph.prototype.executeOnSliderEdit,
            'uncheck to suppress\nrunning scripts\nwhen moving the slider',
            'check to run\nthe edited script\nwhen moving the slider'
        );
    }
    addPreference(
        'Turbo mode',
        'toggleFastTracking',
        this.stage.isFastTracked,
        'uncheck to run scripts\nat normal speed',
        'check to prioritize\nscript execution'
    );
    addPreference(
        'Visible stepping',
        'toggleSingleStepping',
        Process.prototype.enableSingleStepping,
        'uncheck to turn off\nvisible stepping',
        'check to turn on\n visible stepping (slow)',
        false
    );
    addPreference(
        'Log pen vectors',
        () => StageMorph.prototype.enablePenLogging =
            !StageMorph.prototype.enablePenLogging,
        StageMorph.prototype.enablePenLogging,
        'uncheck to turn off\nlogging pen vectors',
        'check to turn on\nlogging pen vectors',
        false
    );
    addPreference(
        'Case sensitivity',
        () => Process.prototype.isCaseInsensitive =
            !Process.prototype.isCaseInsensitive,
        !Process.prototype.isCaseInsensitive,
        'uncheck to ignore upper- and\n lowercase when comparing texts',
        'check to distinguish upper- and\n lowercase when comparing texts',
        false
    );
    addPreference(
        'Ternary Boolean slots',
        () => BooleanSlotMorph.prototype.isTernary =
            !BooleanSlotMorph.prototype.isTernary,
        BooleanSlotMorph.prototype.isTernary,
        'uncheck to limit\nBoolean slots to true / false',
        'check to allow\nempty Boolean slots',
        true
    );
    addPreference(
        'Camera support',
        'toggleCameraSupport',
        CamSnapshotDialogMorph.prototype.enableCamera,
        'uncheck to disable\ncamera support',
        'check to enable\ncamera support',
        true
    );
    addPreference(
        'Dynamic sprite rendering',
        () => SpriteMorph.prototype.isCachingImage =
            !SpriteMorph.prototype.isCachingImage,
        !SpriteMorph.prototype.isCachingImage,
        'uncheck to render\nsprites dynamically',
        'check to cache\nsprite renderings',
        true
    );
    menu.addLine(); // everything visible below is persistent
    addPreference(
        'Blurred shadows',
        'toggleBlurredShadows',
        useBlurredShadows,
        'uncheck to use solid drop\nshadows and highlights',
        'check to use blurred drop\nshadows and highlights',
        true
    );
    addPreference(
        'Zebra coloring',
        'toggleZebraColoring',
        BlockMorph.prototype.zebraContrast,
        'uncheck to disable alternating\ncolors for nested block',
        'check to enable alternating\ncolors for nested blocks',
        true
    );
    addPreference(
        'Dynamic input labels',
        'toggleDynamicInputLabels',
        SyntaxElementMorph.prototype.dynamicInputLabels,
        'uncheck to disable dynamic\nlabels for variadic inputs',
        'check to enable dynamic\nlabels for variadic inputs',
        true
    );
    addPreference(
        'Prefer empty slot drops',
        'togglePreferEmptySlotDrops',
        ScriptsMorph.prototype.isPreferringEmptySlots,
        'uncheck to allow dropped\nreporters to kick out others',
        'settings menu prefer empty slots hint',
        true
    );
    addPreference(
        'Long form input dialog',
        'toggleLongFormInputDialog',
        InputSlotDialogMorph.prototype.isLaunchingExpanded,
        'uncheck to use the input\ndialog in short form',
        'check to always show slot\ntypes in the input dialog'
    );
    addPreference(
        'Plain prototype labels',
        'togglePlainPrototypeLabels',
        BlockLabelPlaceHolderMorph.prototype.plainLabel,
        'uncheck to always show (+) symbols\nin block prototype labels',
        'check to hide (+) symbols\nin block prototype labels'
    );
    addPreference(
        'Clicking sound',
        () => {
            BlockMorph.prototype.toggleSnapSound();
            if (BlockMorph.prototype.snapSound) {
                this.saveSetting('click', true);
            } else {
                this.removeSetting('click');
            }
        },
        BlockMorph.prototype.snapSound,
        'uncheck to turn\nblock clicking\nsound off',
        'check to turn\nblock clicking\nsound on'
    );
    addPreference(
        'Animations',
        () => this.isAnimating = !this.isAnimating,
        this.isAnimating,
        'uncheck to disable\nIDE animations',
        'check to enable\nIDE animations',
        true
    );
    /*
    addPreference(
        'Cache Inputs',
        () => {
            BlockMorph.prototype.isCachingInputs =
                !BlockMorph.prototype.isCachingInputs;
        },
        BlockMorph.prototype.isCachingInputs,
        'uncheck to stop caching\ninputs (for debugging the evaluator)',
        'check to cache inputs\nboosts recursion',
        true
    );
    */
    addPreference(
        'Rasterize SVGs',
        () => MorphicPreferences.rasterizeSVGs =
            !MorphicPreferences.rasterizeSVGs,
        MorphicPreferences.rasterizeSVGs,
        'uncheck for smooth\nscaling of vector costumes',
        'check to rasterize\nSVGs on import',
        true
    );
    addPreference(
        'Flat design',
        () => {
            if (MorphicPreferences.isFlat) {
                return this.defaultDesign();
            }
            this.flatDesign();
        },
        MorphicPreferences.isFlat,
        'uncheck for default\nGUI design',
        'check for alternative\nGUI design',
        false
    );
    addPreference(
        'Nested auto-wrapping',
        () => {
            ScriptsMorph.prototype.enableNestedAutoWrapping =
                !ScriptsMorph.prototype.enableNestedAutoWrapping;
            if (ScriptsMorph.prototype.enableNestedAutoWrapping) {
                this.removeSetting('autowrapping');
            } else {
                this.saveSetting('autowrapping', false);
            }
        },
        ScriptsMorph.prototype.enableNestedAutoWrapping,
        'uncheck to confine auto-wrapping\nto top-level block stacks',
        'check to enable auto-wrapping\ninside nested block stacks',
        true
    );
    addPreference(
        'Sprite Nesting',
        () => SpriteMorph.prototype.enableNesting =
            !SpriteMorph.prototype.enableNesting,
        SpriteMorph.prototype.enableNesting,
        'uncheck to disable\nsprite composition',
        'check to enable\nsprite composition',
        true
    );
    addPreference(
        'First-Class Sprites',
        () => {
            SpriteMorph.prototype.enableFirstClass =
                !SpriteMorph.prototype.enableFirstClass;
            this.flushBlocksCache('sensing');
            this.refreshPalette();
            this.categories.refreshEmpty();
        },
        SpriteMorph.prototype.enableFirstClass,
        'uncheck to disable support\nfor first-class sprites',
        'check to enable support\n for first-class sprite',
        true
    );
    addPreference(
        'Keyboard Editing',
        () => {
            ScriptsMorph.prototype.enableKeyboard =
                !ScriptsMorph.prototype.enableKeyboard;
            this.currentSprite.scripts.updateToolbar();
            if (ScriptsMorph.prototype.enableKeyboard) {
                this.removeSetting('keyboard');
            } else {
                this.saveSetting('keyboard', false);
            }
        },
        ScriptsMorph.prototype.enableKeyboard,
        'uncheck to disable\nkeyboard editing support',
        'check to enable\nkeyboard editing support',
        true
    );
    addPreference(
        'Table support',
        () => {
            List.prototype.enableTables =
                !List.prototype.enableTables;
            if (List.prototype.enableTables) {
                this.removeSetting('tables');
            } else {
                this.saveSetting('tables', false);
            }
        },
        List.prototype.enableTables,
        'uncheck to disable\nmulti-column list views',
        'check for multi-column\nlist view support',
        true
    );
    if (List.prototype.enableTables) {
        addPreference(
            'Table lines',
            () => {
                TableMorph.prototype.highContrast =
                    !TableMorph.prototype.highContrast;
                if (TableMorph.prototype.highContrast) {
                    this.saveSetting('tableLines', true);
                } else {
                    this.removeSetting('tableLines');
                }
            },
            TableMorph.prototype.highContrast,
            'uncheck for less contrast\nmulti-column list views',
            'check for higher contrast\ntable views',
            true
        );
    }
    addPreference(
        'Live coding support',
        () => Process.prototype.enableLiveCoding =
            !Process.prototype.enableLiveCoding,
        Process.prototype.enableLiveCoding,
        'EXPERIMENTAL! uncheck to disable live\ncustom control structures',
        'EXPERIMENTAL! check to enable\n live custom control structures',
        true
    );
    addPreference(
        'JIT compiler support',
        () => {
            Process.prototype.enableCompiling =
                !Process.prototype.enableCompiling;
            this.flushBlocksCache('operators');
            this.refreshPalette();
            this.categories.refreshEmpty();
        },
        Process.prototype.enableCompiling,
        'EXPERIMENTAL! uncheck to disable live\nsupport for compiling',
        'EXPERIMENTAL! check to enable\nsupport for compiling',
        true
    );
    menu.addLine(); // everything below this line is stored in the project
    addPreference(
        'Thread safe scripts',
        () => stage.isThreadSafe = !stage.isThreadSafe,
        this.stage.isThreadSafe,
        'uncheck to allow\nscript reentrance',
        'check to disallow\nscript reentrance'
    );
    addPreference(
        'Flat line ends',
        () => SpriteMorph.prototype.useFlatLineEnds =
            !SpriteMorph.prototype.useFlatLineEnds,
        SpriteMorph.prototype.useFlatLineEnds,
        'uncheck for round ends of lines',
        'check for flat ends of lines'
    );
    addPreference(
        'Codification support',
        () => {
            StageMorph.prototype.enableCodeMapping =
                !StageMorph.prototype.enableCodeMapping;
            this.flushBlocksCache('variables');
            this.refreshPalette();
            this.categories.refreshEmpty();
        },
        StageMorph.prototype.enableCodeMapping,
        'uncheck to disable\nblock to text mapping features',
        'check for block\nto text mapping features',
        false
    );
    addPreference(
        'Inheritance support',
        () => {
            StageMorph.prototype.enableInheritance =
                !StageMorph.prototype.enableInheritance;
            this.flushBlocksCache('variables');
            this.refreshPalette();
            this.categories.refreshEmpty();
        },
        StageMorph.prototype.enableInheritance,
        'uncheck to disable\nsprite inheritance features',
        'check for sprite\ninheritance features',
        true
    );
    addPreference(
        'Hyper blocks support',
        () => Process.prototype.enableHyperOps =
            !Process.prototype.enableHyperOps,
        Process.prototype.enableHyperOps,
        'uncheck to disable\nusing operators on lists and tables',
        'check to enable\nusing operators on lists and tables',
        true
    );
    addPreference(
        'Single palette',
        () => this.toggleUnifiedPalette(),
        this.scene.unifiedPalette,
        'uncheck to show only the selected category\'s blocks',
        'check to show all blocks in a single palette',
        false
    );
    if (this.scene.unifiedPalette) {
        addSubPreference(
            'Show categories',
            () => this.toggleCategoryNames(),
            this.scene.showCategories,
            'uncheck to hide\ncategory names\nin the palette',
            'check to show\ncategory names\nin the palette'
        );
        addSubPreference(
            'Show buttons',
            () => this.togglePaletteButtons(),
            this.scene.showPaletteButtons,
            'uncheck to hide buttons\nin the palette',
            'check to show buttons\nin the palette'
        );
    }
    addPreference(
        'Wrap list indices',
        () => {
            List.prototype.enableWrapping =
                !List.prototype.enableWrapping;
        },
        List.prototype.enableWrapping,
        'uncheck to disable\nwrapping list indices',
        'check for wrapping\nlist indices',
        true
    );
    addPreference(
        'Persist linked sublist IDs',
        () => StageMorph.prototype.enableSublistIDs =
            !StageMorph.prototype.enableSublistIDs,
        StageMorph.prototype.enableSublistIDs,
        'uncheck to disable\nsaving linked sublist identities',
        'check to enable\nsaving linked sublist identities',
        true
    );
    addPreference(
        'Enable command drops in all rings',
        () => RingReporterSlotMorph.prototype.enableCommandDrops =
            !RingReporterSlotMorph.prototype.enableCommandDrops,
        RingReporterSlotMorph.prototype.enableCommandDrops,
        'uncheck to disable\ndropping commands in reporter rings',
        'check to enable\ndropping commands in all rings',
        true
    );

    addPreference(
        'HSL pen color model',
        () => {
            SpriteMorph.prototype.penColorModel =
                SpriteMorph.prototype.penColorModel === 'hsl' ? 'hsv' : 'hsl';
            this.refreshIDE();
        },
        SpriteMorph.prototype.penColorModel === 'hsl',
        'uncheck to switch pen colors\nand graphic effects to HSV',
        'check to switch pen colors\nand graphic effects to HSL',
        false
    );

    addPreference(
        'Disable click-to-run',
        () => ThreadManager.prototype.disableClickToRun =
            !ThreadManager.prototype.disableClickToRun,
        ThreadManager.prototype.disableClickToRun,
        'uncheck to enable\ndirectly running blocks\nby clicking on them',
        'check to disable\ndirectly running blocks\nby clicking on them',
        false
    );
    addPreference(
        'Disable dragging data',
        () => SpriteMorph.prototype.disableDraggingData =
            !SpriteMorph.prototype.disableDraggingData,
        SpriteMorph.prototype.disableDraggingData,
        'uncheck to drag media\nand blocks out of\nwatchers and balloons',
        'disable dragging media\nand blocks out of\nwatchers and balloons',
        false
    );
    menu.popup(world, pos);
};

IDE_Morph.prototype.projectMenu = function () {
    var menu,
        world = this.world(),
        pos = this.controlBar.projectButton.bottomLeft(),
        graphicsName = this.currentSprite instanceof SpriteMorph ?
            'Costumes' : 'Backgrounds',
        shiftClicked = (world.currentKey === 16),
        backup = this.availableBackup(shiftClicked);

    menu = new MenuMorph(this);
    menu.addItem('Notes...', 'editNotes');
    menu.addLine();
    menu.addPair('New', 'createNewProject', '^N');
    menu.addPair('Open...', 'openProjectsBrowser', '^O');
    menu.addPair('Save', "save", '^S');
    menu.addItem('Save As...', 'saveProjectsBrowser');
    if (backup) {
        menu.addItem(
            'Restore unsaved project',
            'restore',
            backup,
            shiftClicked ? new Color(100, 0, 0) : null
        );
        if (shiftClicked) {
            menu.addItem(
                'Clear backup',
                'clearBackup',
                backup,
                new Color(100, 0, 0)
            );
        }
    }
    menu.addLine();
    menu.addItem(
        'Import...',
        'importLocalFile',
        'file menu import hint' // looks up the actual text in the translator
    );
    menu.addItem(
        'Export project...',
        () => {
            var pn = this.getProjectName();
            if (pn) {
                this.exportProject(pn);
            } else {
                this.prompt(
                    'Export Project As...',
                    name => this.exportProject(name),
                    null,
                    'exportProject'
                );
            }
        },
        'save project data as XML\nto your downloads folder'
    );
    menu.addItem(
        'Export summary...',
        () => this.exportProjectSummary(),
        'save a summary\nof this project'
    );
    if (shiftClicked) {
        menu.addItem(
            'Export summary with drop-shadows...',
            () => this.exportProjectSummary(true),
            'download and save' +
            '\nwith a summary of this project' +
            '\nwith drop-shadows on all pictures.' +
            '\nnot supported by all browsers',
            new Color(100, 0, 0)
        );
        menu.addItem(
            'Export all scripts as pic...',
            () => this.exportScriptsPicture(),
            'show a picture of all scripts\nand block definitions',
            new Color(100, 0, 0)
        );
    }
    menu.addLine();
    if (this.stage.globalBlocks.length) {
        menu.addItem(
            'Export blocks...',
            () => this.exportGlobalBlocks(),
            'save global custom block\ndefinitions as XML'
        );
        menu.addItem(
            'Unused blocks...',
            () => this.removeUnusedBlocks(),
            'find unused global custom blocks' +
            '\nand remove their definitions'
        );
    }
    menu.addItem(
        'Hide blocks...',
        () => new BlockVisibilityDialogMorph(this.currentSprite).popUp(world)
    );
    menu.addItem(
        'New category...',
        () => this.createNewCategory()
    );
    if (SpriteMorph.prototype.customCategories.size) {
        menu.addItem(
            'Remove a category...',
            () => this.deleteUserCategory(pos)
        );
    }
    if (this.currentSprite instanceof SpriteMorph &&
        !this.currentSprite.solution) {
        menu.addItem(
            'Generate puzzle',
            'generatePuzzle',
            'generate a Parson\'s Puzzle\n' +
            'from the current sprite'
        );
    }
    menu.addLine();
    if (this.scenes.length() > 1) {
        menu.addItem('Scenes...', 'scenesMenu');
    }
    menu.addPair('New scene', 'createNewScene');
    menu.addPair('Add scene...', 'addScene');
    menu.addLine();
    menu.addItem(
        'Libraries...',
        () => {
            if (location.protocol === 'file:') {
                this.importLocalFile();
                return;
            }
            this.getURL(
                this.resourceURL('libraries', 'LIBRARIES'),
                txt => {
                    var libraries = this.parseResourceFile(txt);
                    new LibraryImportDialogMorph(this, libraries).popUp();
                }
            );
        },
        'Select categories of additional blocks to add to this project.'
    );
    menu.addItem(
        localize(graphicsName) + '...',
        () => {
            if (location.protocol === 'file:') {
                this.importLocalFile();
                return;
            }
            this.importMedia(graphicsName);
        },
        'Select a costume from the media library'
    );
    menu.addItem(
        localize('Sounds') + '...',
        () => {
            if (location.protocol === 'file:') {
                this.importLocalFile();
                return;
            }
            this.importMedia('Sounds');
        },
        'Select a sound from the media library'
    );

    if (this.scene.trash.length) {
        menu.addLine();
        menu.addItem(
            'Undelete sprites...',
            () => this.undeleteSprites(
                this.controlBar.projectButton.bottomLeft()
            ),
            'Bring back deleted sprites'
        );
    }
    menu.popup(world, pos);
};

IDE_Morph.prototype.resourceURL = function () {
    // Take in variadic inputs that represent an a nested folder structure.
    // Method can be easily overridden if running in a custom location.
    // Default Snap! simply returns a path (relative to snap.html)
    // Note: You can specify a base path to the root directory in the
    // configuration object's "path" property that's passed when creating
    // an IDE instance, e.g. either a relative one: {path: '../' }
    // or a full url, depending on where (your) Snap! distro ist hosted
    var args = Array.prototype.slice.call(arguments, 0),
        path = this.config.path ? [this.config.path] : [];
    return path.concat(args).join('/');
};

IDE_Morph.prototype.getMediaList = function (dirname, callback) {
    // Invoke the given callback with a list of files in a directory
    // based on the contents file.
    // If no callback is specified, synchronously return the list of files
    // Note: Synchronous fetching has been deprecated and should be switched
    var url = this.resourceURL(dirname, dirname.toUpperCase()),
        async = callback instanceof Function,
        data;

    function alphabetically(x, y) {
        return x.name.toLowerCase() < y.name.toLowerCase() ? -1 : 1;
    }

    if (async) {
        this.getURL(
            url,
            txt => {
                var data = this.parseResourceFile(txt);
                data.sort(alphabetically);
                callback.call(this, data);
            }
        );
    } else {
        data = this.parseResourceFile(this.getURL(url));
        data.sort(alphabetically);
        return data;
    }
};

IDE_Morph.prototype.parseResourceFile = function (text) {
    // A Resource File lists all the files that could be loaded in a submenu
    // Examples are libraries/LIBRARIES, Costumes/COSTUMES, etc
    // The file format is tab-delimited, with unix newlines:
    // file-name, Display Name, Help Text (optional)
    var parts,
        items = [];

    text.split('\n').map(line =>
        line.trim()
    ).filter(line =>
        line.length > 0
    ).forEach(line => {
        parts = line.split('\t').map(str => str.trim());

        if (parts.length < 2) { return; }

        items.push({
            fileName: parts[0],
            name: parts[1],
            description: parts.length > 2 ? parts[2] : ''
        });
    });

    return items;
};

IDE_Morph.prototype.importLocalFile = function () {
    var inp = document.createElement('input'),
        addingScenes = this.isAddingScenes,
        myself = this,
        world = this.world();

    if (this.filePicker) {
        document.body.removeChild(this.filePicker);
        this.filePicker = null;
    }
    inp.type = 'file';
    inp.style.color = "transparent";
    inp.style.backgroundColor = "transparent";
    inp.style.border = "none";
    inp.style.outline = "none";
    inp.style.position = "absolute";
    inp.style.top = "0px";
    inp.style.left = "0px";
    inp.style.width = "0px";
    inp.style.height = "0px";
    inp.style.display = "none";
    inp.addEventListener(
        "change",
        () => {
            document.body.removeChild(inp);
            this.filePicker = null;
            if (addingScenes) {
                myself.isAddingNextScene = true;
            }
            myself.isImportingLocalFile = true;
            world.hand.processDrop(inp.files);
        },
        false
    );
    document.body.appendChild(inp);
    this.filePicker = inp;
    inp.click();
};

IDE_Morph.prototype.importMedia = function (folderName) {
    // open a dialog box letting the user browse available "built-in"
    // costumes, backgrounds or sounds
    var msg = this.showMessage('Opening ' + folderName + '...');
    this.getMediaList(
        folderName,
        items => {
            msg.destroy();
            this.popupMediaImportDialog(folderName, items);
        }
    );

};

IDE_Morph.prototype.popupMediaImportDialog = function (folderName, items) {
    // private - this gets called by importMedia() and creates
    // the actual dialog
    var dialog = new DialogBoxMorph().withKey('import' + folderName),
        frame = new ScrollFrameMorph(),
        selectedIcon = null,
        turtle = new SymbolMorph('turtle', 60),
        myself = this,
        world = this.world(),
        handle;

    frame.acceptsDrops = false;
    frame.contents.acceptsDrops = false;
    frame.color = myself.groupColor;
    frame.fixLayout = nop;
    dialog.labelString = folderName;
    dialog.createLabel();
    dialog.addBody(frame);
    dialog.addButton('ok', 'Import');
    dialog.addButton('cancel', 'Cancel');

    dialog.ok = function () {
        if (selectedIcon) {
            if (selectedIcon.object instanceof Sound) {
                myself.droppedAudio(
                    selectedIcon.object.copy().audio,
                    selectedIcon.labelString
                );
            } else if (selectedIcon.object instanceof SVG_Costume) {
                myself.droppedSVG(
                    selectedIcon.object.contents,
                    selectedIcon.labelString
                );
            } else {
                myself.droppedImage(
                    selectedIcon.object.contents,
                    selectedIcon.labelString
                );
            }
        }
    };

    dialog.fixLayout = function () {
        var th = fontHeight(this.titleFontSize) + this.titlePadding * 2,
            x = 0,
            y = 0,
            fp, fw;
        this.buttons.fixLayout();
        this.body.setPosition(this.position().add(new Point(
            this.padding,
            th + this.padding
        )));
        this.body.setExtent(new Point(
            this.width() - this.padding * 2,
            this.height() - this.padding * 3 - th - this.buttons.height()
        ));
        fp = this.body.position();
        fw = this.body.width();
        frame.contents.children.forEach(function (icon) {
            icon.setPosition(fp.add(new Point(x, y)));
            x += icon.width();
            if (x + icon.width() > fw) {
                x = 0;
                y += icon.height();
            }
        });
        frame.contents.adjustBounds();
        this.label.setCenter(this.center());
        this.label.setTop(this.top() + (th - this.label.height()) / 2);
        this.buttons.setCenter(this.center());
        this.buttons.setBottom(this.bottom() - this.padding);

        // refresh shadow
        this.removeShadow();
        this.addShadow();
    };

    items.forEach(item => {
        // Caution: creating very many thumbnails can take a long time!
        var url = this.resourceURL(folderName, item.fileName),
            img = new Image(),
            suffix = url.slice(url.lastIndexOf('.') + 1).toLowerCase(),
            isSVG = suffix === 'svg' && !MorphicPreferences.rasterizeSVGs,
            isSound = contains(['wav', 'mp3'], suffix),
            icon;

        if (isSound) {
            icon = new SoundIconMorph(new Sound(new Audio(), item.name));
        } else {
            icon = new CostumeIconMorph(
                new Costume(turtle.getImage(), item.name)
            );
        }
        icon.isDraggable = false;
        icon.userMenu = nop;
        icon.action = function () {
            if (selectedIcon === icon) { return; }
            var prevSelected = selectedIcon;
            selectedIcon = icon;
            if (prevSelected) { prevSelected.refresh(); }
        };
        icon.doubleClickAction = dialog.ok;
        icon.query = function () {
            return icon === selectedIcon;
        };
        frame.addContents(icon);
        if (isSound) {
            icon.object.audio.onloadeddata = function () {
                icon.createThumbnail();
                icon.fixLayout();
                icon.refresh();
            };

            icon.object.audio.src = url;
            icon.object.audio.load();
        } else if (isSVG) {
            img.onload = function () {
                icon.object = new SVG_Costume(img, item.name);
                icon.refresh();
            };
            this.getURL(
                url,
                txt => img.src = 'data:image/svg+xml;base64,' +
                    window.btoa(txt)
            );
        } else {
            img.onload = function () {
                var canvas = newCanvas(new Point(img.width, img.height), true);
                canvas.getContext('2d').drawImage(img, 0, 0);
                icon.object = new Costume(canvas, item.name);
                icon.refresh();
            };
            img.src = url;
        }
    });
    dialog.popUp(world);
    dialog.setExtent(new Point(400, 300));
    dialog.setCenter(world.center());

    handle = new HandleMorph(
        dialog,
        300,
        280,
        dialog.corner,
        dialog.corner
    );
};

IDE_Morph.prototype.undeleteSprites = function (pos) {
    // pop up a menu showing deleted sprites that can be recovered
    // by clicking on them

    var menu = new MenuMorph(sprite => this.undelete(sprite, pos), null, this);
    pos = pos || this.corralBar.bottomRight();

    if (!this.scene.trash.length) {
        this.showMessage('trash is empty');
        return;
    }
    this.scene.trash.forEach(sprite =>
        menu.addItem(
            [
                sprite.thumbnail(new Point(24, 24), null, true), // no corpse
                sprite.name,
            ],
            sprite
        )
    );
    menu.popup(this.world(), pos);
};

IDE_Morph.prototype.undelete = function (aSprite, pos) {
    var rnd = Process.prototype.reportBasicRandom;

    aSprite.setCenter(pos);
    this.world().add(aSprite);
    aSprite.glideTo(
        this.stage.center().subtract(aSprite.extent().divideBy(2)),
        this.isAnimating ? 100 : 0,
        null, // easing
        () => {
            aSprite.isCorpse = false;
            aSprite.version = Date.now();
            aSprite.name = this.newSpriteName(aSprite.name);
            this.stage.add(aSprite);
            aSprite.setXPosition(rnd.call(this, -50, 50));
            aSprite.setYPosition(rnd.call(this, -50, 59));
            aSprite.fixLayout();
            aSprite.rerender();
            this.sprites.add(aSprite);
            this.corral.addSprite(aSprite);
            this.selectSprite(aSprite);
            this.scene.updateTrash();
        }
    );
};

// IDE_Morph menu actions

IDE_Morph.prototype.aboutSnap = function () {
    var dlg, aboutTxt, noticeTxt, creditsTxt, versions = '', translations,
        module, btn1, btn2, btn3, btn4, licenseBtn, translatorsBtn,
        world = this.world();

    aboutTxt = 'Snap! ' + SnapVersion + '\nBuild Your Own Blocks\n\n'
        + 'Copyright \u24B8 2008-2024 Jens M\u00F6nig and '
        + 'Brian Harvey\n'
        + 'jens@moenig.org, bh@cs.berkeley.edu\n\n'
        + '        Snap! is developed by the University of California, '
        + 'Berkeley and SAP        \n'
        + 'with support from the National Science Foundation (NSF),\n'
        + 'MIOsoft and YC Research.\n'
        + 'The design of Snap! is influenced and inspired by Scratch,\n'
        + 'from the Lifelong Kindergarten group at the MIT Media Lab\n\n'

        + 'for more information see https://snap.berkeley.edu';

    noticeTxt = localize('License')
        + '\n\n'
        + 'Snap! is free software: you can redistribute it and/or modify\n'
        + 'it under the terms of the GNU Affero General Public License as\n'
        + 'published by the Free Software Foundation, either version 3 of\n'
        + 'the License, or (at your option) any later version.\n\n'

        + 'This program is distributed in the hope that it will be useful,\n'
        + 'but WITHOUT ANY WARRANTY; without even the implied warranty of\n'
        + 'MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the\n'
        + 'GNU Affero General Public License for more details.\n\n'

        + 'You should have received a copy of the\n'
        + 'GNU Affero General Public License along with this program.\n'
        + 'If not, see http://www.gnu.org/licenses/\n\n'

        + 'Want to use Snap! but scared by the open-source license?\n'
        + 'Get in touch with us, we\'ll make it work.';

    creditsTxt = localize('Contributors')
        + '\n\nNathan Dinsmore: Saving/Loading, Snap-Logo Design, '
        + '\ncountless bugfixes and optimizations'
        + '\nMichael Ball: Time/Date UI, Library Import Dialog,'
        + '\ncountless bugfixes and optimizations'
        + '\nBernat Romagosa: Countless contributions'
        + '\nBartosz Leper: Retina Display Support'
        + '\nDariusz Dorożalski: Web Serial Support,'
        + '\ncountless bugfixes and optimizations'
        + '\nZhenlei Jia and Dariusz Dorożalski: IME text editing'
        + '\nKen Kahn: IME support and countless other contributions'
        + '\nJosep Ferràndiz: Video Motion Detection'
        + '\nJoan Guillén: Countless contributions'
        + '\nKartik Chandra: Paint Editor'
        + '\nCarles Paredes: Initial Vector Paint Editor'
        + '\n"Ava" Yuan Yuan, Deborah Servilla: Graphic Effects'
        + '\nKyle Hotchkiss: Block search design'
        + '\nBrian Broll: Many bugfixes and optimizations'
        + '\nEckart Modrow: SciSnap! Extension'
        + '\nBambi Brewer: Birdbrain Robotics Extension Support'
        + '\nGlen Bull & team: TuneScope Music Extension'
        + '\nIan Reynolds: UI Design, Event Bindings, '
        + 'Sound primitives'
        + '\nJadga Hügle: Icons and countless other contributions'
        + '\nSimon Walters & Xavier Pi: MQTT extension'
        + '\nVictoria Phelps: Reporter results tracing'
        + '\nIvan Motyashov: Initial Squeak Porting'
        + '\nLucas Karahadian: Piano Keyboard Design'
        + '\nDavide Della Casa: Morphic Optimizations'
        + '\nAchal Dave: Web Audio'
        + '\nJoe Otto: Morphic Testing and Debugging'
        + '\n\n'
        + 'Jahrd, Derec, Jamet, Sarron, Aleassa, and Lirin costumes'
        + '\nare watercolor paintings by Meghan Taylor and represent'
        + '\n characters from her webcomic Prophecy of the Circle,'
        + '\nlicensed to us only for use in Snap! projects.'
        + '\nMeghan also painted the Tad costumes,'
        + '\nbut that character is in the public domain.';

    for (module in modules) {
        if (Object.prototype.hasOwnProperty.call(modules, module)) {
            versions += ('\n' + module + ' (' +
                modules[module] + ')');
        }
    }
    if (versions !== '') {
        versions = localize('current module versions:') + ' \n\n' +
            'morphic (' + morphicVersion + ')' +
            versions;
    }
    translations = localize('Translations') + '\n' + SnapTranslator.credits();

    dlg = new DialogBoxMorph();

    function txt(textString) {
        var tm = new TextMorph(
            textString,
            dlg.fontSize,
            dlg.fontStyle,
            true,
            false,
            'center',
            null,
            null,
            MorphicPreferences.isFlat ? null : new Point(1, 1),
            BLACK
        ),
            scroller,
            maxHeight = world.height() - dlg.titleFontSize * 10;
        if (tm.height() > maxHeight) {
            scroller = new ScrollFrameMorph();
            scroller.acceptsDrops = false;
            scroller.contents.acceptsDrops = false;
            scroller.bounds.setWidth(tm.width());
            scroller.bounds.setHeight(maxHeight);
            scroller.addContents(tm);
            scroller.color = new Color(0, 255, 213);
            return scroller;
        }
        return tm;
    }

    dlg.inform('About Snap', aboutTxt, world, this.logo.cachedTexture);
    btn1 = dlg.buttons.children[0];
    translatorsBtn = dlg.addButton(
        () => {
            dlg.addBody(txt(translations));
            dlg.body.fixLayout();
            btn1.show();
            btn2.show();
            btn3.hide();
            btn4.hide();
            licenseBtn.hide();
            translatorsBtn.hide();
            dlg.fixLayout();
            dlg.setCenter(world.center());
        },
        'Translators...'
    );
    btn2 = dlg.addButton(
        () => {
            dlg.addBody(txt(aboutTxt));
            dlg.body.fixLayout();
            btn1.show();
            btn2.hide();
            btn3.show();
            btn4.show();
            licenseBtn.show();
            translatorsBtn.hide();
            dlg.fixLayout();
            dlg.setCenter(world.center());
        },
        'Back...'
    );
    btn2.hide();
    licenseBtn = dlg.addButton(
        () => {
            dlg.addBody(txt(noticeTxt));
            dlg.body.fixLayout();
            btn1.show();
            btn2.show();
            btn3.hide();
            btn4.hide();
            licenseBtn.hide();
            translatorsBtn.hide();
            dlg.fixLayout();
            dlg.setCenter(world.center());
        },
        'License...'
    );
    btn3 = dlg.addButton(
        () => {
            dlg.addBody(txt(versions));
            dlg.body.fixLayout();
            btn1.show();
            btn2.show();
            btn3.hide();
            btn4.hide();
            licenseBtn.hide();
            translatorsBtn.hide();
            dlg.fixLayout();
            dlg.setCenter(world.center());
        },
        'Modules...'
    );
    btn4 = dlg.addButton(
        () => {
            dlg.addBody(txt(creditsTxt));
            dlg.body.fixLayout();
            btn1.show();
            btn2.show();
            translatorsBtn.show();
            btn3.hide();
            btn4.hide();
            licenseBtn.hide();
            dlg.fixLayout();
            dlg.setCenter(world.center());
        },
        'Credits...'
    );
    translatorsBtn.hide();
    dlg.fixLayout();
};

IDE_Morph.prototype.scenesMenu = function () {
    var menu = new MenuMorph(scn => this.switchToScene(scn), null, this),
        world = this.world(),
        pos = this.controlBar.projectButton.bottomLeft(),
        tick = new SymbolMorph(
            'tick',
            MorphicPreferences.menuFontSize * 0.75
        ),
        empty = tick.fullCopy();

    empty.render = nop;
    this.scenes.asArray().forEach(scn =>
        menu.addItem(
            [
                this.scene === scn ? tick : empty,
                scn.name
            ],
            scn
        )
    );
    menu.popup(world, pos);
};

IDE_Morph.prototype.editNotes = function () {
    var dialog = new DialogBoxMorph().withKey('notes'),
        frame = new ScrollFrameMorph(),
        text = new TextMorph(this.scenes.at(1).notes || ''),
        size = 250,
        world = this.world();

    frame.padding = 6;
    frame.setWidth(size);
    frame.acceptsDrops = false;
    frame.contents.acceptsDrops = false;

    text.setWidth(size - frame.padding * 2);
    text.setPosition(frame.topLeft().add(frame.padding));
    text.enableSelecting();
    text.isEditable = true;

    frame.setHeight(size);
    frame.fixLayout = nop;
    frame.edge = InputFieldMorph.prototype.edge;
    frame.fontSize = InputFieldMorph.prototype.fontSize;
    frame.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    frame.contrast = InputFieldMorph.prototype.contrast;
    frame.render = InputFieldMorph.prototype.render;
    frame.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    frame.addContents(text);

    dialog.getInput = () => text.text;

    dialog.target = this;

    dialog.action = (note) => {
        this.scene.notes = note;
        this.recordUnsavedChanges();
    };

    dialog.justDropped = () => text.edit();

    dialog.labelString = 'Notes';
    dialog.createLabel();
    dialog.addBody(frame);
    dialog.addButton('ok', 'OK');
    dialog.addButton('cancel', 'Cancel');
    dialog.fixLayout();
    dialog.popUp(world);
    dialog.setCenter(world.center());
    text.edit();
};

IDE_Morph.prototype.newProject = function () {
    var project = new Project();

    project.addDefaultScene();
    this.source = this.cloud.username ? 'cloud' : null;
    if (location.hash.substr(0, 6) !== '#lang:') {
        location.hash = '';
    }
    this.openProject(project);
};

IDE_Morph.prototype.createNewScene = function () {
    var setting = this.isAddingScenes;
    this.isAddingScenes = true;
    this.newProject();
    this.isAddingScenes = setting;
};

IDE_Morph.prototype.createNewCategory = function () {
    new DialogBoxMorph(
        this,
        cat => this.addPaletteCategory(cat.name, cat.color),
        this
    ).promptCategory(
        "New Category",
        null,
        new Color(0, 116, 143),
        this.world(),
        null, // pic
        'Blocks category name:' // msg
    );
};

IDE_Morph.prototype.addPaletteCategory = function (name, color) {
    if (name === '') { return; }
    SpriteMorph.prototype.customCategories.set(name, color);
    this.createCategories();
    this.categories.refreshEmpty();
    this.createPaletteHandle();
    this.categories.fixLayout();
    this.fixLayout();
};

IDE_Morph.prototype.deleteUserCategory = function (pos) {
    var menu = new MenuMorph(
        this.deletePaletteCategory,
        null,
        this
    );

    // sort alphabetically
    Array.from(
        SpriteMorph.prototype.customCategories.keys()
    ).sort().forEach(name =>
        menu.addItem(
            name,
            name,
            null,
            null,
            null,
            null,
            null,
            null,
            true // verbatim - don't translate
        )
    );
    if (pos) {
        menu.popup(this.world(), pos);
    } else {
        menu.popUpAtHand(this.world());
    }
};

IDE_Morph.prototype.deletePaletteCategory = function (name) {
    this.stage.globalBlocks.forEach(def => {
        if (def.category === name) {
            def.category = 'other';
            this.currentSprite.allBlockInstances(def).reverse().forEach(
                block => block.refresh()
            );
        }
    });
    this.sprites.asArray().concat(this.stage).forEach(obj => {
        obj.customBlocks.forEach(def => {
            if (def.category === name) {
                def.category = 'other';
                obj.allDependentInvocationsOf(
                    def.blockSpec()
                ).reverse().forEach(
                    block => block.refresh(def)
                );
            }
        });
    });
    SpriteMorph.prototype.customCategories.delete(name);
    this.createCategories();
    this.createPaletteHandle();
    this.categories.fixLayout();
    this.flushPaletteCache();
    this.refreshPalette(true);
    this.categories.refreshEmpty();
    this.fixLayout();
    this.recordUnsavedChanges();
};

IDE_Morph.prototype.save = function () {
    // temporary hack - only allow exporting projects to disk
    // when running Snap! locally without a web server
    var pn = this.getProjectName();
    if (location.protocol === 'file:') {
        if (pn) {
            this.exportProject(pn);
        } else {
            this.prompt(
                'Export Project As...',
                name => this.exportProject(name),
                null,
                'exportProject'
            );
        }
        return;
    }

    if (this.source === 'examples' || this.source === 'local') {
        // cannot save to examples, deprecated localStorage
        this.source = null;
    }

    if (this.cloud.disabled) { this.source = 'disk'; }

    if (pn) {
        if (this.source === 'disk') {
            this.exportProject(pn);
        } else if (this.source === 'cloud') {
            this.saveProjectToCloud(pn);
        } else {
            this.saveProjectsBrowser();
        }
    } else {
        this.saveProjectsBrowser();
    }
};

IDE_Morph.prototype.exportProject = function (name) {
    // Export project XML, saving a file to disk
    var menu, str;
    if (name) {
        name = this.setProjectName(name);
        this.scene.captureGlobalSettings();
        try {
            menu = this.showMessage('Exporting');
            str = this.serializer.serialize(
                new Project(this.scenes, this.scene)
            );
            this.saveXMLAs(str, name);
            menu.destroy();
            this.recordSavedChanges();
            this.showMessage('Exported!', 1);
        } catch (err) {
            if (Process.prototype.isCatchingErrors) {
                this.showMessage('Export failed: ' + err);
            } else {
                throw err;
            }
        }
    }
};

IDE_Morph.prototype.exportGlobalBlocks = function () {
    if (this.stage.globalBlocks.length > 0) {
        new BlockExportDialogMorph(
            this.serializer,
            this.stage.globalBlocks,
            this
        ).popUp(this.world());
    } else {
        this.inform(
            'Export blocks',
            'this project doesn\'t have any\n'
            + 'custom global blocks yet'
        );
    }
};

IDE_Morph.prototype.removeUnusedBlocks = function () {
    var targets = this.sprites.asArray().concat([this.stage]),
        globalBlocks = this.stage.globalBlocks,
        unused = [],
        isDone = false,
        found;

    function scan() {
        return globalBlocks.filter(def => {
            if (contains(unused, def)) { return false; }
            return targets.every((each, trgIdx) =>
                !each.usesBlockInstance(def, true, trgIdx, unused)
            );
        });
    }

    while (!isDone) {
        found = scan();
        if (found.length) {
            unused = unused.concat(found);
        } else {
            isDone = true;
        }
    }
    if (unused.length > 0) {
        new BlockRemovalDialogMorph(
            unused,
            this
        ).popUp(this.world());
    } else {
        this.inform(
            'Remove unused blocks',
            'there are currently no unused\n'
            + 'global custom blocks in this project'
        );
    }
};

IDE_Morph.prototype.generatePuzzle = function () {
    if (this.sprites.asArray().some(any => any.solution)) {
        return this.addToPuzzle();
    }

    var current = this.currentSprite,
        allBlocks = current.allPaletteBlocks(),
        used = current.scripts.allChildren().filter(
            m => m instanceof BlockMorph),
        uPrim = [],
        uCust = [],
        uVars = [],
        unused,
        puzzle;

    // add stage-only blocks
    this.stage.allPaletteBlocks().forEach(b => {
        if (!allBlocks.includes(b)) {
            allBlocks.push(b);
        }
    });

    // determine unused blocks
    used.forEach(b => {
        if (b.isCustomBlock) {
            uCust.push(b.isGlobal ? b.definition
                : current.getMethod(b.semanticSpec));
        } else if (b.selector === 'reportGetVar') {
            uVars.push(b.blockSpec);
        } else {
            uPrim.push(b.selector);
        }
    });
    unused = allBlocks.filter(b => {
        if (b.isCustomBlock) {
            return !contains(
                uCust,
                b.isGlobal ? b.definition
                    : current.getMethod(b.semanticSpec)
            );
        } else if (b.selector === 'reportGetVar') {
            return !contains(uVars, b.blockSpec);
        } else {
            return !contains(uPrim, b.selector);
        }
    });

    // hide all unused blocks and show all used ones in the palette
    allBlocks.forEach(block => current.changeBlockVisibility(
        block,
        contains(unused, block),
        true // quick - without palette update
    ));
    if (unused.length === 0) {
        StageMorph.prototype.hiddenPrimitives = [];
    }

    // fire user edit event
    current.recordUserEdit(
        'palette',
        'hide block'
    );

    // turn on single palette and hide buttons
    this.setUnifiedPalette(true);
    this.scene.showPaletteButtons = false;

    // refresh
    this.flushBlocksCache();
    this.refreshPalette();
    this.categories.refreshEmpty();

    // generate a new puzzle sprite by duplicating the current one
    this.duplicateSprite(current);
    puzzle = this.currentSprite; // this is now the duplicate
    puzzle.setPosition(current.position());
    puzzle.setName(this.newSpriteName(current.name + ' ' + localize('Puzzle')));

    // remove all scripts but keep the comments that are either unattached
    // or attached to the top block of a script
    puzzle.scripts.children.forEach(m => {
        if (m instanceof CommentMorph) {
            m.prepareToBeGrabbed();
        }
    });
    puzzle.scripts.children.filter(m =>
        m instanceof BlockMorph
    ).forEach(b => b.destroy());

    // store the solution inside the puzzlem
    // and remove the solution from the stage
    puzzle.solution = current;
    this.removeSprite(current, false); // disable undelete

    // refresh
    this.selectSprite(puzzle);
};

IDE_Morph.prototype.addToPuzzle = function () {
    var current = this.currentSprite,
        allBlocks = current.allPaletteBlocks(),
        used = current.scripts.allChildren().filter(
            m => m instanceof BlockMorph),
        uCust = [],
        unused,
        puzzle;

    // add stage-only blocks
    this.stage.allPaletteBlocks().forEach(b => {
        if (!allBlocks.includes(b)) {
            allBlocks.push(b);
        }
    });

    // determine unused local blocks only
    used.forEach(b => {
        if (b.isCustomBlock && !b.isGlobal) {
            uCust.push(current.getMethod(b.semanticSpec));
        }
    });
    unused = allBlocks.filter(b => b.isCustomBlock && !b.isGlobal &&
        !contains(uCust, current.getMethod(b.semanticSpec))
    );

    // hide unused local custom bocks
    unused.forEach(block => current.changeBlockVisibility(block, true, true));

    // show used blocks
    used.forEach(block => current.changeBlockVisibility(block, false, true));

    // fire user edit event
    current.recordUserEdit(
        'palette',
        'hide block'
    );

    // refresh
    this.flushBlocksCache();
    this.refreshPalette();
    this.categories.refreshEmpty();

    // generate a new puzzle sprite by duplicating the current one
    this.duplicateSprite(current);
    puzzle = this.currentSprite; // this is now the duplicate
    puzzle.setPosition(current.position());
    puzzle.setName(this.newSpriteName(current.name + ' ' + localize('Puzzle')));

    // remove all scripts but keep the comments that are either unattached
    // or attached to the top block of a script
    puzzle.scripts.children.forEach(m => {
        if (m instanceof CommentMorph) {
            m.prepareToBeGrabbed();
        }
    });
    puzzle.scripts.children.filter(m =>
        m instanceof BlockMorph
    ).forEach(b => b.destroy());

    // store the solution inside the puzzlem
    // and remove the solution from the stage
    puzzle.solution = current;
    this.removeSprite(current, false); // disable undelete

    // refresh
    this.selectSprite(puzzle);
};
IDE_Morph.prototype.exportSprite = function (sprite) {
    this.saveXMLAs(sprite.toXMLString(), sprite.name);
};

IDE_Morph.prototype.exportScriptsPicture = function () {
    var pics = [],
        pic,
        padding = 20,
        w = 0,
        h = 0,
        y = 0,
        ctx;

    // collect all script pics
    this.sprites.asArray().forEach(sprite => {
        pics.push(sprite.getImage());
        pics.push(sprite.scripts.scriptsPicture());
        sprite.customBlocks.forEach(def =>
            pics.push(def.scriptsPicture())
        );
    });
    pics.push(this.stage.getImage());
    pics.push(this.stage.scripts.scriptsPicture());
    this.stage.customBlocks.forEach(def =>
        pics.push(def.scriptsPicture())
    );

    // collect global block pics
    this.stage.globalBlocks.forEach(def =>
        pics.push(def.scriptsPicture())
    );

    pics = pics.filter(each => !isNil(each));

    // determine dimensions of composite
    pics.forEach(each => {
        w = Math.max(w, each.width);
        h += (each.height);
        h += padding;
    });
    h -= padding;
    pic = newCanvas(new Point(w, h));
    ctx = pic.getContext('2d');

    // draw all parts
    pics.forEach(each => {
        ctx.drawImage(each, 0, y);
        y += padding;
        y += each.height;
    });
    this.saveCanvasAs(pic, this.scene.name || localize('Untitled'));
};

IDE_Morph.prototype.exportProjectSummary = function (useDropShadows) {
    var html, head, meta, css, body, pname, notes, toc, globalVars,
        stage = this.stage;

    function addNode(tag, node, contents) {
        if (!node) { node = body; }
        return new XML_Element(tag, contents, node);
    }

    function add(contents, tag, node) {
        if (!tag) { tag = 'p'; }
        if (!node) { node = body; }
        return new XML_Element(tag, contents, node);
    }

    function addImage(canvas, node, inline) {
        if (!node) { node = body; }
        var para = !inline ? addNode('p', node) : null,
            pic = addNode('img', para || node);
        pic.attributes.src = canvas.toDataURL();
        return pic;
    }

    function addVariables(varFrame) {
        var names = varFrame.names().sort(),
            isFirst = true,
            ul;
        if (names.length) {
            add(localize('Variables'), 'h3');
            names.forEach(name => {
                /*
                addImage(
                    SpriteMorph.prototype.variableBlock(name).scriptPic()
                );
                */
                var watcher, listMorph, li, img;

                if (isFirst) {
                    ul = addNode('ul');
                    isFirst = false;
                }
                li = addNode('li', ul);
                watcher = new WatcherMorph(
                    name,
                    SpriteMorph.prototype.blockColor.variables,
                    varFrame,
                    name
                );
                listMorph = watcher.cellMorph.contentsMorph;
                if (listMorph instanceof ListWatcherMorph) {
                    listMorph.expand();
                }
                img = addImage(watcher.fullImage(), li);
                img.attributes.class = 'script';
            });
        }
    }

    function addBlocks(definitions) {
        if (definitions.length) {
            add(localize('Blocks'), 'h3');
            SpriteMorph.prototype.allCategories().forEach(category => {
                var isFirst = true,
                    ul;
                definitions.forEach(def => {
                    var li, blockImg;
                    if (def.category === category) {
                        if (isFirst) {
                            add(
                                localize(
                                    category[0].toUpperCase().concat(
                                        category.slice(1)
                                    )
                                ),
                                'h4'
                            );
                            ul = addNode('ul');
                            isFirst = false;
                        }
                        li = addNode('li', ul);
                        blockImg = addImage(
                            def.templateInstance().scriptPic(),
                            li
                        );
                        blockImg.attributes.class = 'script';
                        def.sortedElements().forEach(script => {
                            var defImg = addImage(
                                script instanceof BlockMorph ?
                                    script.scriptPic()
                                    : script.fullImage(),
                                li
                            );
                            defImg.attributes.class = 'script';
                        });
                    }
                });
            });
        }
    }

    pname = this.scene.name || localize('untitled');

    html = new XML_Element('html');
    html.attributes.lang = SnapTranslator.language;
    // html.attributes.contenteditable = 'true';

    head = addNode('head', html);

    meta = addNode('meta', head);
    meta.attributes.charset = 'UTF-8';

    if (useDropShadows) {
        css = 'img {' +
            'vertical-align: top;' +
            'filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5));' +
            '-webkit-filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5));' +
            '-ms-filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5));' +
            '}' +
            '.toc {' +
            'vertical-align: middle;' +
            'padding: 2px 1em 2px 1em;' +
            '}';
    } else {
        css = 'img {' +
            'vertical-align: top;' +
            '}' +
            '.toc {' +
            'vertical-align: middle;' +
            'padding: 2px 1em 2px 1em;' +
            '}' +
            '.sprite {' +
            'border: 1px solid lightgray;' +
            '}';
    }
    addNode('style', head, css);

    add(pname, 'title', head);

    body = addNode('body', html);
    add(pname, 'h1');

    /*
    if (this.cloud.username) {
        add(localize('by ') + this.cloud.username);
    }
    */
    if (location.hash.indexOf('#present:') === 0) {
        add(location.toString(), 'a', body).attributes.href =
            location.toString();
        addImage(
            stage.thumbnail(stage.dimensions)
        ).attributes.class = 'sprite';
        add(this.serializer.app, 'h4');
    } else {
        add(this.serializer.app, 'h4');
        addImage(
            stage.thumbnail(stage.dimensions)
        ).attributes.class = 'sprite';
    }

    // project notes
    notes = Process.prototype.reportTextSplit(this.scene.notes, 'line');
    notes.asArray().forEach(paragraph => add(paragraph));

    // table of contents
    add(localize('Contents'), 'h4');
    toc = addNode('ul');

    // sprites & stage
    this.sprites.asArray().concat([stage]).forEach(sprite => {
        var tocEntry = addNode('li', toc),
            scripts = sprite.scripts.sortedElements(),
            cl = sprite.costumes.length(),
            pic,
            ol;

        addNode('hr');
        addImage(
            sprite.thumbnail(new Point(40, 40)),
            tocEntry,
            true
        ).attributes.class = 'toc';
        add(sprite.name, 'a', tocEntry).attributes.href = '#' + sprite.name;

        add(sprite.name, 'h2').attributes.id = sprite.name;
        // if (sprite instanceof SpriteMorph || sprite.costume) {
        pic = addImage(
            sprite.thumbnail(sprite.extent().divideBy(stage.scale))
        );
        pic.attributes.class = 'sprite';
        if (sprite instanceof SpriteMorph) {
            if (sprite.exemplar) {
                addImage(
                    sprite.exemplar.thumbnail(new Point(40, 40)),
                    add(localize('Kind of') + ' ' + sprite.exemplar.name),
                    true
                ).attributes.class = 'toc';
            }
            if (sprite.anchor) {
                addImage(
                    sprite.anchor.thumbnail(new Point(40, 40)),
                    add(localize('Part of') + ' ' + sprite.anchor.name),
                    true
                ).attributes.class = 'toc';
            }
            if (sprite.parts.length) {
                add(localize('Parts'), 'h3');
                ol = addNode('ul');
                sprite.parts.forEach(part => {
                    var li = addNode('li', ol, part.name);
                    addImage(part.thumbnail(new Point(40, 40)), li, true)
                        .attributes.class = 'toc';
                });
            }
        }

        // costumes
        if (cl > 1 || (sprite.getCostumeIdx() !== cl)) {
            add(localize('Costumes'), 'h3');
            ol = addNode('ol');
            sprite.costumes.asArray().forEach(costume => {
                var li = addNode('li', ol, costume.name);
                addImage(costume.thumbnail(new Point(40, 40)), li, true)
                    .attributes.class = 'toc';
            });
        }

        // sounds
        if (sprite.sounds.length()) {
            add(localize('Sounds'), 'h3');
            ol = addNode('ol');
            sprite.sounds.asArray().forEach(sound =>
                add(sound.name, 'li', ol)
            );
        }

        // variables
        addVariables(sprite.variables);

        // scripts
        if (scripts.length) {
            add(localize('Scripts'), 'h3');
            scripts.forEach(script => {
                var img = addImage(script instanceof BlockMorph ?
                    script.scriptPic()
                    : script.fullImage());
                img.attributes.class = 'script';
            });
        }

        // custom blocks
        addBlocks(sprite.customBlocks);
    });

    // globals
    globalVars = stage.globalVariables();
    if (Object.keys(globalVars.vars).length || stage.globalBlocks.length) {
        addNode('hr');
        add(
            localize('For all Sprites'),
            'a',
            addNode('li', toc)
        ).attributes.href = '#global';
        add(localize('For all Sprites'), 'h2').attributes.id = 'global';

        // variables
        addVariables(globalVars);

        // custom blocks
        addBlocks(stage.globalBlocks);
    }

    this.saveFileAs(
        '<!DOCTYPE html>' + html.toString(),
        'text/html;charset=utf-8',
        pname
    );
};

IDE_Morph.prototype.openProjectString = function (str, callback) {
    var msg;
    if (this.bulkDropInProgress || this.isAddingScenes) {
        this.rawOpenProjectString(str);
        if (callback) { callback(); }
        return;
    }
    this.nextSteps([
        () => msg = this.showMessage('Opening project...'),
        () => {
            this.rawOpenProjectString(str);
            msg.destroy();
            if (callback) { callback(); }
        }
    ]);
};

IDE_Morph.prototype.rawOpenProjectString = function (str) {
    this.toggleAppMode(false);
    this.spriteBar.tabBar.tabTo('scripts');
    if (Process.prototype.isCatchingErrors) {
        try {
            this.openProject(
                this.serializer.load(str, this)
            );
        } catch (err) {
            this.showMessage('Load failed: ' + err);
        }
    } else {
        this.openProject(
            this.serializer.load(str, this)
        );
    }
    this.autoLoadExtensions();
    this.stopFastTracking();
};

IDE_Morph.prototype.openCloudDataString = function (str) {
    var msg,
        size = Math.round(str.length / 1024);
    this.nextSteps([
        () => msg = this.showMessage('Opening project\n' + size + ' KB...'),
        () => {
            this.rawOpenCloudDataString(str);
            msg.destroy();
        }
    ]);
};

IDE_Morph.prototype.rawOpenCloudDataString = function (str) {
    var model,
        setting = this.isAddingScenes;

    if (this.isAddingNextScene) {
        this.isAddingScenes = true;
    }
    if (Process.prototype.isCatchingErrors) {
        try {
            model = this.serializer.parse(str);
            this.serializer.loadMediaModel(model.childNamed('media'));
            this.openProject(
                this.serializer.loadProjectModel(
                    model.childNamed('project'),
                    this,
                    model.attributes.remixID
                )
            );
        } catch (err) {
            this.showMessage('Load failed: ' + err);
        }
    } else {
        model = this.serializer.parse(str);
        this.serializer.loadMediaModel(model.childNamed('media'));
        this.openProject(
            this.serializer.loadProjectModel(
                model.childNamed('project'),
                this,
                model.attributes.remixID
            )
        );
    }
    this.autoLoadExtensions();
    this.stopFastTracking();
    this.isAddingScenes = setting;
    this.isAddingNextScene = false;
};

IDE_Morph.prototype.openBlocksString = function (str, name, silently) {
    var msg;
    this.nextSteps([
        () => msg = this.showMessage('Opening blocks...'),
        () => {
            this.rawOpenBlocksString(str, name, silently);
            msg.destroy();
        }
    ]);
};

IDE_Morph.prototype.rawOpenBlocksString = function (str, name, silently) {
    // name is optional (string), so is silently (bool)
    var blocks;
    this.toggleAppMode(false);
    this.spriteBar.tabBar.tabTo('scripts');
    if (Process.prototype.isCatchingErrors) {
        try {
            blocks = this.serializer.loadBlocks(str, this.stage);
        } catch (err) {
            this.showMessage('Load failed: ' + err);
        }
    } else {
        blocks = this.serializer.loadBlocks(str, this.stage);
    }
    if (silently) {
        blocks.global.forEach(def => {
            def.receiver = this.stage;
            this.stage.globalBlocks.push(def);
            this.stage.replaceDoubleDefinitionsFor(def);
        });
        blocks.local.forEach(def => {
            def.receiver = this.currentSprite;
            this.currentSprite.customBlocks.push(def);
            this.currentSprite.replaceDoubleDefinitionsFor(def);
        });
        if (blocks.data) {
            this.globalVariables.merge(blocks.data);
            this.flushBlocksCache('variables');
        }
        if (blocks.localData) {
            this.currentSprite.variables.merge(blocks.localData);
            this.flushBlocksCache('variables');
        }
        this.flushPaletteCache();
        this.refreshPalette();
        this.showMessage(
            'Imported Blocks Module' + (name ? ': ' + name : '') + '.',
            2
        );
    } else {
        new BlockImportDialogMorph(
            blocks.global.concat(blocks.local),
            this.stage,
            name
        ).popUp();
    }
    this.createCategories();
    this.categories.refreshEmpty();
    this.createPaletteHandle();
    this.categories.fixLayout();
    this.fixLayout();
    this.autoLoadExtensions();
};

IDE_Morph.prototype.openSpritesString = function (str) {
    var msg;
    this.nextSteps([
        () => msg = this.showMessage('Opening sprite...'),
        () => {
            this.rawOpenSpritesString(str);
            msg.destroy();
        },
    ]);
};

IDE_Morph.prototype.rawOpenSpritesString = function (str) {
    this.toggleAppMode(false);
    this.spriteBar.tabBar.tabTo('scripts');
    if (Process.prototype.isCatchingErrors) {
        try {
            this.deserializeSpritesString(str);
        } catch (err) {
            this.showMessage('Load failed: ' + err);
        }
    } else {
        this.deserializeSpritesString(str);
    }
    this.autoLoadExtensions();
};

IDE_Morph.prototype.deserializeSpritesString = function (str) {
    var xml = this.serializer.parse(str, true), // assert version
        blocksModel = xml.childNamed('blocks'),
        blocks;

    if (blocksModel) {
        // load the custom block definitions the sprites depend on
        blocks = this.serializer.loadBlocksModel(blocksModel, this.stage);
        blocks.global.forEach(def => {
            def.receiver = this.stage;
            this.stage.globalBlocks.push(def);
            this.stage.replaceDoubleDefinitionsFor(def);
        });
        // load global variables which the custom blocks rely on
        if (blocks.data) {
            this.globalVariables.merge(blocks.data);
            this.flushBlocksCache('variables');
        }
        // notice, there should not be any local blocks or datain this part of
        // the model instead we're expecting them inside each sprite
        this.flushPaletteCache();
        this.refreshPalette();
        this.createCategories();
        this.categories.refreshEmpty();
        this.createPaletteHandle();
        this.categories.fixLayout();
        this.fixLayout();
    }
    this.serializer.loadSpritesModel(xml, this);
};

IDE_Morph.prototype.openMediaString = function (str) {
    if (Process.prototype.isCatchingErrors) {
        try {
            this.serializer.loadMedia(str);
        } catch (err) {
            this.showMessage('Load failed: ' + err);
        }
    } else {
        this.serializer.loadMedia(str);
    }
    this.showMessage('Imported Media Module.', 2);
};

IDE_Morph.prototype.openScriptString = function (str) {
    var msg;
    this.nextSteps([
        () => msg = this.showMessage('Opening script...'),
        () => {
            this.rawOpenScriptString(str);
            msg.destroy();
        }
    ]);
};

IDE_Morph.prototype.rawOpenScriptString = function (str, silently) {
    var world = this.world(),
        script;

    if (Process.prototype.isCatchingErrors) {
        try {
            script = this.deserializeScriptString(str);
        } catch (err) {
            this.showMessage('Load failed: ' + err);
        }
    } else {
        script = this.deserializeScriptString(str);
    }
    script.fixBlockColor(null, true);
    this.spriteBar.tabBar.tabTo('scripts');
    if (silently) {
        this.currentSprite.scripts.add(script);
        this.currentSprite.scripts.cleanUp();
    } else {
        script.pickUp(world);
        world.hand.grabOrigin = {
            origin: this.palette,
            position: this.palette.center()
        };
    }
    this.showMessage(
        'Imported Script.',
        2
    );
    this.autoLoadExtensions();
};

IDE_Morph.prototype.deserializeScriptString = function (str) {
    var xml = this.serializer.parse(str, true), // assert version
        blocksModel = xml.childNamed('blocks'),
        scriptModel = xml.childNamed('script') || xml,
        blocks;

    if (blocksModel) {
        // load the custom block definitions the script depends on
        blocks = this.serializer.loadBlocksModel(blocksModel, this.stage);
        blocks.global.forEach(def => {
            def.receiver = this.stage;
            this.stage.globalBlocks.push(def);
            this.stage.replaceDoubleDefinitionsFor(def);
        });
        blocks.local.forEach(def => {
            def.receiver = this.currentSprite;
            this.currentSprite.customBlocks.push(def);
            this.currentSprite.replaceDoubleDefinitionsFor(def);
        });
        if (blocks.data) {
            this.globalVariables.merge(blocks.data);
            this.flushBlocksCache('variables');
        }
        if (blocks.localData) {
            this.currentSprite.variables.merge(blocks.localData);
            this.flushBlocksCache('variables');
        }
        this.flushPaletteCache();
        this.refreshPalette();
        this.createCategories();
        this.categories.refreshEmpty();
        this.createPaletteHandle();
        this.categories.fixLayout();
        this.fixLayout();
    }
    return this.serializer.loadScriptModel(scriptModel, this.currentSprite);
};

IDE_Morph.prototype.openScriptsOnlyString = function (str) {
    // open scripts that do not contain dependencies such as variable
    // declarations and custom block definitions (!)
    var msg;
    this.nextSteps([
        () => msg = this.showMessage('Opening scripts...'),
        () => {
            this.rawOpenScriptsOnlyString(str);
            msg.destroy();
        }
    ]);
};

IDE_Morph.prototype.rawOpenScriptsOnlyString = function (str) {
    // import scripts that do not contain dependencies such as variable
    // declarations and custom block definitions (!)
    var object = this.currentSprite,
        scripts = object.scripts,
        xml;

    if (Process.prototype.isCatchingErrors) {
        try {
            xml = this.serializer.parse(str, true);
            this.serializer.loadScripts(object, scripts, xml);
        } catch (err) {
            this.showMessage('Load failed: ' + err);
        }
    } else {
        xml = this.serializer.parse(str, true);
        this.serializer.loadScripts(object, scripts, xml);
    }
    scripts.changed();
    this.spriteBar.tabBar.tabTo('scripts');
    this.showMessage(
        'Imported Scripts.',
        2
    );
};

IDE_Morph.prototype.openDataString = function (str, name, type) {
    var msg;
    this.nextSteps([
        () => msg = this.showMessage('Opening data...'),
        () => {
            this.rawOpenDataString(str, name, type);
            msg.destroy();
        }
    ]);
};

IDE_Morph.prototype.rawOpenDataString = function (str, name, type) {
    var data, vName, dlg,
        globals = this.currentSprite.globalVariables();

    function newVarName(name) {
        var existing = globals.names(),
            ix = name.indexOf('\('),
            stem = ((ix < 0) ? name : name.substring(0, ix)).trim(),
            count = 1,
            newName = stem;
        while (contains(existing, newName)) {
            count += 1;
            newName = stem + ' (' + count + ')';
        }
        return newName;
    }

    switch (type) {
        case 'csv':
            data = Process.prototype.parseCSV(str);
            break;
        case 'json':
            data = Process.prototype.parseJSON(str);
            break;
        default: // assume plain text
            data = str;
    }
    vName = newVarName(name || 'data');
    globals.addVar(vName);
    globals.setVar(vName, data);
    this.currentSprite.toggleVariableWatcher(vName, true); // global
    this.flushBlocksCache('variables');
    this.currentCategory = this.scene.unifiedPalette ? 'unified' : 'variables';
    this.categories.refresh();
    this.refreshPalette(true);
    if (data instanceof List) {
        dlg = new TableDialogMorph(data);
        dlg.labelString = localize(dlg.labelString) + ': ' + vName;
        dlg.createLabel();
        dlg.popUp(this.world());
    }
    this.autoLoadExtensions();
};

IDE_Morph.prototype.openProjectName = function (name) {
    var str;
    if (name) {
        this.showMessage('opening project\n' + name);
        this.setProjectName(name);
        str = localStorage['-snap-project-' + name];
        this.openProjectString(str);
    }
};

IDE_Morph.prototype.openProject = function (project) {
    if (this.isAddingScenes) {
        project.scenes.itemsArray().forEach(scene => {
            scene.name = this.newSceneName(scene.name, scene);
            this.scenes.add(scene);
        });
    } else {
        this.scenes = project.scenes;
    }
    this.switchToScene(
        project.currentScene || project.scenes.at(1),
        true,  // refresh album
        null, // msg
        null, // data
        true // pause generic WHEN hat blocks
    );
};

IDE_Morph.prototype.autoLoadExtensions = function () {
    // experimental - allow auto-loading extensions from urls specified
    // in global variables whose names start with "__module__".
    // Still very much under construction, also needs to be tweaked for
    // asynch operation
    var urls = [];
    Object.keys(this.globalVariables.vars).forEach(vName => {
        var val;
        if (vName.startsWith('__module__')) {
            val = this.globalVariables.getVar(vName);
            if (isString(val)) {
                urls.push(val);
            }
        }
    });
    urls.forEach(url => {
        var scriptElement;
        if (contains(SnapExtensions.scripts, url)) {
            return;
        }
        if (Process.prototype.enableJS || SnapExtensions.urls.some(
            any => url.indexOf(any) === 0)
        ) {
            scriptElement = document.createElement('script');
            scriptElement.onload = () => {
                SnapExtensions.scripts.push(url);
            };
            document.head.appendChild(scriptElement);
            scriptElement.src = url;
            /*
            } else {
                // throw new Error(
                    'unlisted extension url:\n"' + url + '"\n' +
                    'JavaScript extensions for Snap!\nare turned off'
                );
            */
        }
    });
};

IDE_Morph.prototype.switchToScene = function (
    scene,
    refreshAlbum,
    msg,
    data,
    pauseHats
) {
    var appMode = this.isAppMode,
        listeners;
    if (!scene || !scene.stage) {
        return;
    }
    this.siblings().filter(
        morph => !morph.nag
    ).forEach(
        morph => morph.destroy()
    );
    this.scene.captureGlobalSettings();
    this.scene = scene;
    this.globalVariables = scene.globalVariables;
    listeners = this.stage.messageCallbacks;
    this.stage.destroy();
    this.add(scene.stage);
    this.stage = scene.stage;
    this.stage.messageCallbacks = listeners;
    this.sprites = scene.sprites;
    if (pauseHats) {
        this.stage.pauseGenericHatBlocks();
    }
    this.createCorral(!refreshAlbum); // keep scenes
    this.selectSprite(this.scene.currentSprite, true);
    this.corral.album.updateSelection();
    this.fixLayout();
    this.corral.album.contents.children.forEach(function (morph) {
        if (morph.state) {
            morph.scrollIntoView();
        }
    });
    scene.applyGlobalSettings();
    if (!SpriteMorph.prototype.allCategories().includes(this.currentCategory)) {
        this.currentCategory = 'motion';
    }
    if (!this.setUnifiedPalette(scene.unifiedPalette)) {
        this.createCategories();
        this.createPaletteHandle();
        this.categories.fixLayout();
        this.fixLayout();
        this.flushBlocksCache();
        this.categories.refreshEmpty();
        this.currentSprite.palette(this.currentCategory);
        this.refreshPalette(true);
    }
    this.toggleAppMode(appMode);
    this.controlBar.stopButton.refresh();
    this.world().keyboardFocus = this.stage;
    if (msg) {
        this.stage.fireChangeOfSceneEvent(msg, data);
    }
};

IDE_Morph.prototype.saveFileAs = function (
    contents,
    fileType,
    fileName
) {
    /** Allow for downloading a file to a disk.
        This relies the FileSaver.js library which exports saveAs()
        Two utility methods saveImageAs and saveXMLAs should be used first.
    */
    var blobIsSupported = false,
        world = this.world(),
        fileExt,
        dialog;

    // fileType is a <kind>/<ext>;<charset> format.
    fileExt = fileType.split('/')[1].split(';')[0];
    // handle text/plain as a .txt file
    fileExt = '.' + (fileExt === 'plain' ? 'txt' : fileExt);

    function dataURItoBlob(text, mimeType) {
        var i,
            data = text,
            components = text.split(','),
            hasTypeStr = text.indexOf('data:') === 0;
        // Convert to binary data, in format Blob() can use.
        if (hasTypeStr && components[0].indexOf('base64') > -1) {
            text = atob(components[1]);
            data = new Uint8Array(text.length);
            i = text.length;
            while (i--) {
                data[i] = text.charCodeAt(i);
            }
        } else if (hasTypeStr) {
            // not base64 encoded
            text = text.replace(/^data:image\/.*?, */, '');
            data = new Uint8Array(text.length);
            i = text.length;
            while (i--) {
                data[i] = text.charCodeAt(i);
            }
        }
        return new Blob([data], { type: mimeType });
    }

    try {
        blobIsSupported = !!new Blob();
    } catch (e) { }

    if (blobIsSupported) {
        if (!(contents instanceof Blob)) {
            contents = dataURItoBlob(contents, fileType);
        }
        // download a file and delegate to FileSaver
        // false: Do not preprend a BOM to the file.
        saveAs(contents, fileName + fileExt, false);
    } else {
        dialog = new DialogBoxMorph();
        dialog.inform(
            localize('Could not export') + ' ' + fileName,
            'unable to export text',
            world
        );
        dialog.fixLayout();
    }
};

IDE_Morph.prototype.saveCanvasAs = function (canvas, fileName) {
    // Export a Canvas object as a PNG image
    // Note: This commented out due to poor browser support.
    // cavas.toBlob() is currently supported in Firefox, IE, Chrome but
    // browsers prevent easily saving the generated files.
    // Do not re-enable without revisiting issue #1191
    // if (canvas.toBlob) {
    //     var myself = this;
    //     canvas.toBlob(function (blob) {
    //         myself.saveFileAs(blob, 'image/png', fileName);
    //     });
    //     return;
    // }

    this.saveFileAs(canvas.toDataURL(), 'image/png', fileName);
};

IDE_Morph.prototype.saveAudioAs = function (audio, fileName) {
    // Export a Sound object as a WAV file
    this.saveFileAs(audio.src, 'audio/wav', fileName);
};

IDE_Morph.prototype.saveXMLAs = function (xml, fileName) {
    // wrapper to saving XML files with a proper type tag.
    this.saveFileAs(xml, 'text/xml;chartset=utf-8', fileName);
};

IDE_Morph.prototype.switchToUserMode = function () {
    var world = this.world();

    world.isDevMode = false;
    Process.prototype.isCatchingErrors = true;
    this.controlBar.updateLabel();
    this.isAutoFill = true;
    this.isDraggable = false;
    this.reactToWorldResize(world.bounds.copy());
    this.siblings().forEach(morph => {
        if (morph instanceof DialogBoxMorph) {
            world.add(morph); // bring to front
        } else {
            morph.destroy();
        }
    });
    this.flushBlocksCache();
    this.refreshPalette();
    this.categories.refreshEmpty();
    // prevent non-DialogBoxMorphs from being dropped
    // onto the World in user-mode
    world.reactToDropOf = (morph) => {
        if (!(morph instanceof DialogBoxMorph ||
            (morph instanceof MenuMorph))) {
            if (world.hand.grabOrigin) {
                morph.slideBackTo(world.hand.grabOrigin);
            } else {
                world.hand.grab(morph);
            }
        }
    };
    this.showMessage('entering user mode', 1);
};

IDE_Morph.prototype.switchToDevMode = function () {
    var world = this.world();

    world.isDevMode = true;
    Process.prototype.isCatchingErrors = false;
    this.controlBar.updateLabel();
    this.isAutoFill = false;
    this.isDraggable = true;
    this.setExtent(world.extent().subtract(100));
    this.setPosition(world.position().add(20));
    this.flushBlocksCache();
    this.refreshPalette();
    this.categories.refreshEmpty();
    // enable non-DialogBoxMorphs to be dropped
    // onto the World in dev-mode
    delete world.reactToDropOf;
    this.showMessage(
        'entering development mode.\n\n'
        + 'error catching is turned off,\n'
        + 'use the browser\'s web console\n'
        + 'to see error messages.'
    );
};

IDE_Morph.prototype.flushBlocksCache = function (category) {
    // if no category is specified, the whole cache gets flushed
    if (category && category !== 'unified') {
        this.stage.primitivesCache[category] = null;
        this.stage.children.forEach(m => {
            if (m instanceof SpriteMorph) {
                m.primitivesCache[category] = null;
            }
        });
    } else {
        this.stage.primitivesCache = {};
        this.stage.children.forEach(m => {
            if (m instanceof SpriteMorph) {
                m.primitivesCache = {};
            }
        });
    }
    this.flushPaletteCache(category);
};

IDE_Morph.prototype.flushPaletteCache = function (category) {
    // if no category is specified, the whole cache gets flushed
    if (category) {
        this.stage.paletteCache[category] = null;
        this.stage.paletteCache.unified = null;
        this.stage.children.forEach(m => {
            if (m instanceof SpriteMorph) {
                m.paletteCache[category] = null;
                m.paletteCache.unified = null;
            }
        });
    } else {
        this.stage.paletteCache = {};
        this.stage.children.forEach(m => {
            if (m instanceof SpriteMorph) {
                m.paletteCache = {};
            }
        });
    }
    this.stage.categoriesCache = null;
    this.stage.children.forEach(m => {
        if (m instanceof SpriteMorph) {
            m.categoriesCache = null;
        }
    });
};

IDE_Morph.prototype.toggleZebraColoring = function () {
    var scripts = [];

    if (!BlockMorph.prototype.zebraContrast) {
        BlockMorph.prototype.zebraContrast = 40;
    } else {
        BlockMorph.prototype.zebraContrast = 0;
    }

    // select all scripts:
    this.stage.children.concat(this.stage).forEach(morph => {
        if (isSnapObject(morph)) {
            scripts = scripts.concat(
                morph.scripts.children.filter(morph =>
                    morph instanceof BlockMorph
                )
            );
        }
    });

    // force-update all scripts:
    scripts.forEach(topBlock =>
        topBlock.fixBlockColor(null, true)
    );
};

IDE_Morph.prototype.toggleDynamicInputLabels = function () {
    SyntaxElementMorph.prototype.dynamicInputLabels =
        !SyntaxElementMorph.prototype.dynamicInputLabels;
    this.refreshIDE();
};

IDE_Morph.prototype.toggleBlurredShadows = function () {
    window.useBlurredShadows = !useBlurredShadows;
    this.rerender();
    if (window.useBlurredShadows) {
        this.removeSetting('solidshadow');
    } else {
        this.saveSetting('solidshadow', false);
    }
};

IDE_Morph.prototype.toggleLongFormInputDialog = function () {
    InputSlotDialogMorph.prototype.isLaunchingExpanded =
        !InputSlotDialogMorph.prototype.isLaunchingExpanded;
    if (InputSlotDialogMorph.prototype.isLaunchingExpanded) {
        this.saveSetting('longform', true);
    } else {
        this.removeSetting('longform');
    }
};

IDE_Morph.prototype.togglePlainPrototypeLabels = function () {
    BlockLabelPlaceHolderMorph.prototype.plainLabel =
        !BlockLabelPlaceHolderMorph.prototype.plainLabel;
    if (BlockLabelPlaceHolderMorph.prototype.plainLabel) {
        this.saveSetting('plainprototype', true);
    } else {
        this.removeSetting('plainprototype');
    }
};

IDE_Morph.prototype.togglePreferEmptySlotDrops = function () {
    ScriptsMorph.prototype.isPreferringEmptySlots =
        !ScriptsMorph.prototype.isPreferringEmptySlots;
};

IDE_Morph.prototype.toggleInputSliders = function () {
    MorphicPreferences.useSliderForInput =
        !MorphicPreferences.useSliderForInput;
};

IDE_Morph.prototype.toggleSliderExecute = function () {
    ArgMorph.prototype.executeOnSliderEdit =
        !ArgMorph.prototype.executeOnSliderEdit;
};

IDE_Morph.prototype.setEmbedMode = function () {
    var myself = this;

    this.isEmbedMode = true;
    this.appModeColor = new Color(243, 238, 235);
    this.embedOverlay = new Morph();
    this.embedOverlay.color = new Color(128, 128, 128);
    this.embedOverlay.alpha = 0.5;

    this.embedPlayButton = new SymbolMorph('circleSolid');
    this.embedPlayButton.color = new Color(64, 128, 64);
    this.embedPlayButton.alpha = 0.75;
    this.embedPlayButton.flag = new SymbolMorph('flag');
    this.embedPlayButton.flag.color = new Color(128, 255, 128);
    this.embedPlayButton.flag.alpha = 0.75;
    this.embedPlayButton.add(this.embedPlayButton.flag);
    this.embedPlayButton.mouseClickLeft = function () {
        myself.runScripts();
        myself.embedOverlay.destroy();
        this.destroy();
    };

    this.controlBar.hide();

    this.add(this.embedOverlay);
    this.add(this.embedPlayButton);

    this.fixLayout();
};

IDE_Morph.prototype.toggleAppMode = function (appMode) {
    var world = this.world(),
        elements = [
            this.logo,
            this.controlBar.cloudButton,
            this.controlBar.projectButton,
            this.controlBar.settingsButton,
            this.controlBar.steppingButton,
            this.controlBar.stageSizeButton,
            this.paletteHandle,
            this.stageHandle,
            this.corral,
            this.corralBar,
            this.spriteEditor,
            this.spriteBar,
            this.palette,
            this.categories
        ];

    this.isAppMode = isNil(appMode) ? !this.isAppMode : appMode;

    if (this.isAppMode) {
        this.wasSingleStepping = Process.prototype.enableSingleStepping;
        if (this.wasSingleStepping) {
            this.toggleSingleStepping();
        }
        this.setColor(this.appModeColor);
        this.controlBar.setColor(this.color);
        this.controlBar.appModeButton.refresh();
        elements.forEach(e =>
            e.hide()
        );
        world.children.forEach(morph => {
            if (morph instanceof DialogBoxMorph) {
                morph.hide();
            }
        });
        if (world.keyboardFocus instanceof ScriptFocusMorph) {
            world.keyboardFocus.stopEditing();
        }
    } else {
        if (this.wasSingleStepping && !Process.prototype.enableSingleStepping) {
            this.toggleSingleStepping();
        }
        this.setColor(this.backgroundColor);
        this.controlBar.setColor(this.frameColor);
        elements.forEach(e =>
            e.show()
        );
        this.stage.setScale(1);
        // show all hidden dialogs
        world.children.forEach(morph => {
            if (morph instanceof DialogBoxMorph) {
                morph.show();
            }
        });
        // prevent scrollbars from showing when morph appears
        world.allChildren().filter(c =>
            c instanceof ScrollFrameMorph
        ).forEach(s =>
            s.adjustScrollBars()
        );
        // prevent rotation and draggability controls from
        // showing for the stage
        if (this.currentSprite === this.stage) {
            this.spriteBar.children.forEach(child => {
                if (child instanceof PushButtonMorph) {
                    child.hide();
                }
            });
        }
        // update undrop controls
        this.currentSprite.scripts.updateToolbar();
        // hide hidden panes
        if (this.config.noSpriteEdits) {
            this.spriteBar.hide();
            this.stageHandle.hide();
            this.corralBar.hide();
            this.corral.hide();
        }
    }
    this.setExtent(this.world().extent());
};

IDE_Morph.prototype.toggleStageSize = function (isSmall, forcedRatio) {
    var myself = this,
        smallRatio = forcedRatio || 0.5,
        msecs = this.isAnimating ? 100 : 0,
        world = this.world(),
        shiftClicked = (world.currentKey === 16),
        altClicked = (world.currentKey === 18);

    function toggle() {
        myself.isSmallStage = isNil(isSmall) ? !myself.isSmallStage : isSmall;
    }

    function zoomTo(targetRatio) {
        myself.isSmallStage = true;
        world.animations.push(new Animation(
            ratio => {
                myself.stageRatio = ratio;
                myself.setExtent(world.extent());
            },
            () => myself.stageRatio,
            targetRatio - myself.stageRatio,
            msecs,
            null, // easing
            () => {
                myself.isSmallStage = (targetRatio !== 1);
                myself.controlBar.stageSizeButton.refresh();
            }
        ));
    }

    if (shiftClicked) {
        smallRatio = SpriteIconMorph.prototype.thumbSize.x * 3 /
            this.stage.dimensions.x;
        if (!this.isSmallStage || (smallRatio === this.stageRatio)) {
            toggle();
        }
    } else if (altClicked) {
        smallRatio = this.width() / 2 /
            this.stage.dimensions.x;
        if (!this.isSmallStage || (smallRatio === this.stageRatio)) {
            toggle();
        }
    } else {
        toggle();
    }
    if (this.isSmallStage) {
        zoomTo(smallRatio);
    } else {
        zoomTo(1);
    }
};

IDE_Morph.prototype.toggleUnifiedPalette = function () {
    this.setUnifiedPalette(!this.scene.unifiedPalette);
    this.recordUnsavedChanges();
};

IDE_Morph.prototype.setUnifiedPalette = function (bool) {
    // answer true or false indicating whether the palette
    // has already been refreshed by this operation
    if (this.scene.unifiedPalette === bool &&
        (bool === (this.currentCategory === 'unified'))
    ) {
        return false;
    }
    this.scene.unifiedPalette = bool;
    this.currentCategory = bool ? 'unified' : 'motion';
    this.createCategories();
    this.createPaletteHandle();
    this.categories.fixLayout();
    this.fixLayout();
    this.flushBlocksCache();
    this.categories.refreshEmpty();
    this.currentSprite.palette(this.currentCategory);
    this.refreshPalette(true);
    return true;
};

IDE_Morph.prototype.toggleCategoryNames = function () {
    this.scene.showCategories = !this.scene.showCategories;
    this.flushBlocksCache();
    this.refreshPalette();
    this.recordUnsavedChanges();
};

IDE_Morph.prototype.togglePaletteButtons = function () {
    this.scene.showPaletteButtons = !this.scene.showPaletteButtons;
    this.flushBlocksCache();
    this.refreshPalette();
    this.recordUnsavedChanges();
};

IDE_Morph.prototype.setPaletteWidth = function (newWidth) {
    var msecs = this.isAnimating ? 100 : 0,
        world = this.world();

    world.animations.push(new Animation(
        newWidth => {
            this.paletteWidth = newWidth;
            this.setExtent(world.extent());
        },
        () => this.paletteWidth,
        newWidth - this.paletteWidth,
        msecs
    ));
};

IDE_Morph.prototype.createNewProject = function () {
    this.backup(() => this.newProject());
};

IDE_Morph.prototype.addScene = function () {
    var setting = this.isAddingScenes;
    if (location.protocol === 'file:') {
        // bypass the project import dialog and directly pop up
        // the local file picker.
        // this should not be necessary, we should be able
        // to access the cloud even when running Snap! locally
        // to be worked on.... (jens)
        this.isAddingScenes = true;
        this.importLocalFile();
        this.isAddingScenes = setting;
        return;
    }
    new ProjectDialogMorph(this, 'add').popUp();
};

IDE_Morph.prototype.openProjectsBrowser = function () {
    if (location.protocol === 'file:') {
        // bypass the project import dialog and directly pop up
        // the local file picker.
        // this should not be necessary, we should be able
        // to access the cloud even when running Snap! locally
        // to be worked on.... (jens)
        this.importLocalFile();
        return;
    }
    new ProjectDialogMorph(this, 'open').popUp();
};

IDE_Morph.prototype.saveProjectsBrowser = function () {
    // temporary hack - only allow exporting projects to disk
    // when running Snap! locally without a web server
    if (location.protocol === 'file:') {
        this.prompt(
            'Export Project As...',
            name => this.exportProject(name),
            null,
            'exportProject'
        );
        return;
    }

    if (this.source === 'examples') {
        this.source = null; // cannot save to examples
    }
    new ProjectDialogMorph(this, 'save').popUp();
};

// IDE_Morph microphone settings

IDE_Morph.prototype.microphoneMenu = function () {
    var menu = new MenuMorph(this),
        world = this.world(),
        pos = this.controlBar.settingsButton.bottomLeft(),
        resolutions = ['low', 'normal', 'high', 'max'],
        microphone = this.stage.microphone,
        tick = new SymbolMorph(
            'tick',
            MorphicPreferences.menuFontSize * 0.75
        ),
        on = new SymbolMorph(
            'checkedBox',
            MorphicPreferences.menuFontSize * 0.75
        ),
        empty = tick.fullCopy();

    empty.render = nop;
    if (microphone.isReady) {
        menu.addItem(
            [
                on,
                localize('Microphone')
            ],
            () => microphone.stop()
        );
        menu.addLine();
    }
    resolutions.forEach((res, i) => {
        menu.addItem(
            [
                microphone.resolution === i + 1 ? tick : empty,
                localize(res)
            ],
            () => microphone.setResolution(i + 1)
        );
    });
    menu.popup(world, pos);
};

// IDE_Morph localization

IDE_Morph.prototype.languageMenu = function () {
    var menu = new MenuMorph(this),
        world = this.world(),
        pos = this.controlBar.settingsButton.bottomLeft(),
        tick = new SymbolMorph(
            'tick',
            MorphicPreferences.menuFontSize * 0.75
        ),
        empty = tick.fullCopy();

    empty.render = nop;
    SnapTranslator.languages().forEach(lang =>
        menu.addItem(
            [
                SnapTranslator.language === lang ? tick : empty,
                SnapTranslator.languageName(lang)
            ],
            () => {
                this.loadNewProject = false;
                this.setLanguage(
                    lang,
                    () => this.stage.fireUserEditEvent(
                        this.currentSprite.name,
                        ['project', 'language', lang],
                        this.version
                    )
                );
            }
        )
    );
    menu.popup(world, pos);
};

IDE_Morph.prototype.setLanguage = function (lang, callback, noSave) {
    var translation = document.getElementById('language'),
        src;
    SnapTranslator.unload();
    if (translation) {
        document.head.removeChild(translation);
    }
    if (!(lang in SnapTranslator.dict)) {
        if (lang.includes('_') && lang.split('_')[0] in SnapTranslator.dict) {
            lang = lang.split('_')[0];
        } else {
            lang = 'en';
        }
    }
    if (lang === 'en') {
        return this.reflectLanguage('en', callback, noSave);
    }

    src = this.resourceURL('locale', 'lang-' + lang + '.js');
    translation = document.createElement('script');
    translation.id = 'language';
    translation.onload = () =>
        this.reflectLanguage(lang, callback, noSave);
    document.head.appendChild(translation);
    translation.src = src;
};

IDE_Morph.prototype.reflectLanguage = function (lang, callback, noSave) {
    var projectData,
        urlBar = location.hash;
    SnapTranslator.language = lang;
    if (!this.loadNewProject) {
        this.scene.captureGlobalSettings();
        if (Process.prototype.isCatchingErrors) {
            try {
                projectData = this.serializer.serialize(
                    new Project(this.scenes, this.scene)
                );
            } catch (err) {
                this.showMessage('Serialization failed: ' + err);
            }
        } else {
            projectData = this.serializer.serialize(
                new Project(this.scenes, this.scene)
            );
        }
    }
    SpriteMorph.prototype.initBlocks();
    this.spriteBar.tabBar.tabTo('scripts');
    this.createCategories();
    this.categories.refreshEmpty();
    this.createCorralBar();
    this.fixLayout();
    if (this.loadNewProject) {
        this.newProject();
        location.hash = urlBar;
        if (callback) { callback.call(this); }
    } else {
        this.openProjectString(projectData, callback);
    }
    if (!noSave) {
        this.saveSetting('language', lang);
    }
};

// IDE_Morph blocks scaling

IDE_Morph.prototype.userSetBlocksScale = function () {
    var scrpt,
        blck,
        shield,
        sample,
        action,
        dlg;

    scrpt = new CommandBlockMorph();
    scrpt.color = SpriteMorph.prototype.blockColor.motion;
    scrpt.setSpec(localize('build'));
    blck = new CommandBlockMorph();
    blck.color = SpriteMorph.prototype.blockColor.sound;
    blck.setSpec(localize('your own'));
    scrpt.nextBlock(blck);
    blck = new CommandBlockMorph();
    blck.color = SpriteMorph.prototype.blockColor.operators;
    blck.setSpec(localize('blocks'));
    scrpt.bottomBlock().nextBlock(blck);
    /*
    blck = SpriteMorph.prototype.blockForSelector('doForever');
    blck.inputs()[0].nestedBlock(scrpt);
    */

    sample = new FrameMorph();
    sample.acceptsDrops = false;
    sample.color = IDE_Morph.prototype.groupColor;
    if (SyntaxElementMorph.prototype.alpha > 0.8) {
        sample.cachedTexture = this.scriptsPaneTexture;
    }
    sample.setExtent(new Point(250, 180));
    scrpt.setPosition(sample.position().add(10));
    sample.add(scrpt);

    shield = new Morph();
    shield.alpha = 0;
    shield.setExtent(sample.extent());
    shield.setPosition(sample.position());
    sample.add(shield);

    action = (num) => {
        scrpt.blockSequence().forEach(block => {
            block.setScale(num);
            block.setSpec(block.blockSpec);
        });
        scrpt.fullChanged();
    };

    dlg = new DialogBoxMorph(
        null,
        num => this.setBlocksScale(Math.min(num, 12))
    ).withKey('zoomBlocks');
    if (MorphicPreferences.isTouchDevice) {
        dlg.isDraggable = false;
    }
    dlg.prompt(
        'Zoom blocks',
        SyntaxElementMorph.prototype.scale.toString(),
        this.world(),
        sample, // pic
        {
            'normal (1x)': 1,
            'demo (1.2x)': 1.2,
            'presentation (1.4x)': 1.4,
            'big (2x)': 2,
            'huge (4x)': 4,
            'giant (8x)': 8,
            'monstrous (10x)': 10
        },
        false, // read only?
        true, // numeric
        1, // slider min
        5, // slider max
        action // slider action
    );
};

IDE_Morph.prototype.setBlocksScale = function (num) {
    var projectData;
    this.scene.captureGlobalSettings();
    if (Process.prototype.isCatchingErrors) {
        try {
            projectData = this.serializer.serialize(
                new Project(this.scenes, this.scene)
            );
        } catch (err) {
            this.showMessage('Serialization failed: ' + err);
        }
    } else {
        projectData = this.serializer.serialize(
            new Project(this.scenes, this.scene)
        );
    }
    SyntaxElementMorph.prototype.setScale(num);
    CommentMorph.prototype.refreshScale();
    SpriteMorph.prototype.initBlocks();
    this.spriteBar.tabBar.tabTo('scripts');
    this.createCategories();
    this.categories.refreshEmpty();
    this.createCorralBar();
    this.fixLayout();
    this.openProjectString(projectData);
    this.saveSetting('zoom', num);
};

// IDE_Morph blocks fading

IDE_Morph.prototype.userFadeBlocks = function () {
    var dlg,
        initial = 100 - (SyntaxElementMorph.prototype.alpha * 100);

    dlg = new DialogBoxMorph(
        null,
        num => this.setBlockTransparency(num, true) // and save setting
    ).withKey('fadeBlocks');
    if (MorphicPreferences.isTouchDevice) {
        dlg.isDraggable = false;
    }

    dlg.cancel = () => {
        this.setBlockTransparency(initial);
        dlg.destroy();
    };

    dlg.prompt(
        'Fade blocks',
        initial.toString(),
        this.world(),
        null, // pic
        {
            'block-solid (0)': 0,
            'medium (50)': 50,
            'light (70)': 70,
            'shimmering (80)': 80,
            'elegant (90)': 90,
            'subtle (95)': 95,
            'text-only (100)': 100
        },
        false, // read only?
        true, // numeric
        0, // slider min
        100, // slider max
        num => this.setBlockTransparency(num), // slider action
        0 // decimals
    );
};

IDE_Morph.prototype.setBlockTransparency = function (num, save) {
    SyntaxElementMorph.prototype.setAlphaScaled(100 - num);
    this.changed();
    if (save) {
        if (num === 0) {
            this.removeSetting('fade');
        } else {
            this.saveSetting('fade', num);
        }
    }
};

// IDE_Morph stage size manipulation

IDE_Morph.prototype.userSetStageSize = function () {
    new DialogBoxMorph(
        this,
        this.setStageExtent,
        this
    ).promptVector(
        "Stage size",
        this.stage.dimensions,
        new Point(480, 360),
        'Stage width',
        'Stage height',
        this.world(),
        null, // pic
        null // msg
    );
};

IDE_Morph.prototype.setStageExtent = function (aPoint) {
    var myself = this,
        world = this.world(),
        ext = aPoint.max(new Point(240, 180));

    function zoom() {
        myself.step = function () {
            var delta = ext.subtract(
                myself.stage.dimensions
            ).divideBy(2);
            if (delta.abs().lt(new Point(5, 5))) {
                myself.stage.dimensions = ext;
                delete myself.step;
            } else {
                myself.stage.dimensions =
                    myself.stage.dimensions.add(delta);
            }
            myself.stage.setExtent(myself.stage.dimensions);
            myself.stage.clearPenTrails();
            myself.fixLayout();
            this.setExtent(world.extent());
        };
    }

    this.stageRatio = 1;
    this.isSmallStage = false;
    this.controlBar.stageSizeButton.refresh();
    this.stage.stopVideo();
    this.setExtent(world.extent());
    Costume.prototype.maxDimensions = aPoint;
    this.stage.stopVideo();
    this.stage.stopProjection();
    if (this.isAnimating) {
        zoom();
    } else {
        this.stage.dimensions = ext;
        this.stage.setExtent(this.stage.dimensions);
        this.stage.clearPenTrails();
        this.fixLayout();
        this.setExtent(world.extent());
    }
};

// IDE_Morph dragging threshold (internal feature)

IDE_Morph.prototype.userSetDragThreshold = function () {
    new DialogBoxMorph(
        this,
        num => MorphicPreferences.grabThreshold = Math.min(
            Math.max(+num, 0),
            200
        ),
        this
    ).prompt(
        "Dragging threshold",
        MorphicPreferences.grabThreshold.toString(),
        this.world(),
        null, // pic
        null, // choices
        null, // read only
        true // numeric
    );
};

// IDE_Morph cloud interface

IDE_Morph.prototype.initializeCloud = function () {
    var world = this.world();
    new DialogBoxMorph(
        null,
        user => this.cloud.login(
            user.username.toLowerCase(),
            user.password,
            user.choice,
            (username, role, response) => {
                sessionStorage.username = username;
                this.controlBar.cloudButton.refresh();
                this.source = 'cloud';
                if (!isNil(response.days_left)) {
                    var duration = response.days_left + ' day' +
                        (response.days_left > 1 ? 's' : '');
                    new DialogBoxMorph().inform(
                        'Unverified account: ' + duration + ' left' +
                        'You are now logged in, and your account\n' +
                        'is enabled for ' + duration + '.\n' +
                        'Please use the verification link that\n' +
                        'was sent to your email address when you\n' +
                        'signed up.\n\n' +
                        'If you cannot find that email, please\n' +
                        'check your spam folder. If you still\n' +
                        'cannot find it, please use the "Resend\n' +
                        'Verification Email..." option in the cloud\n' +
                        'menu.\n\n' +
                        'You have ' + duration + ' left.',
                        world,
                        this.cloudIcon(null, new Color(0, 180, 0))
                    );
                } else if (response.title) {
                    new DialogBoxMorph().inform(
                        response.title,
                        response.message,
                        world,
                        this.cloudIcon(null, new Color(0, 180, 0))
                    );
                } else {
                    this.showMessage(response.message, 2);
                }
            },
            this.cloudError()
        )
    ).withKey('cloudlogin').promptCredentials(
        'Sign in',
        'login',
        null,
        null,
        null,
        null,
        'stay signed in on this computer\nuntil logging out',
        world,
        this.cloudIcon(),
        this.cloudMsg
    );
};

IDE_Morph.prototype.createCloudAccount = function () {
    var world = this.world();

    new DialogBoxMorph(
        null,
        user => this.cloud.signup(
            user.username,
            user.password,
            user.passwordRepeat,
            user.email,
            (txt, title) => new DialogBoxMorph().inform(
                title,
                txt + '.\n\nYou can now log in.',
                world,
                this.cloudIcon(null, new Color(0, 180, 0))
            ),
            this.cloudError()
        )
    ).withKey('cloudsignup').promptCredentials(
        'Sign up',
        'signup',
        'https://snap.berkeley.edu/tos.html',
        'Terms of Service...',
        'https://snap.berkeley.edu/privacy.html',
        'Privacy...',
        'I have read and agree\nto the Terms of Service',
        world,
        this.cloudIcon(),
        this.cloudMsg
    );
};

IDE_Morph.prototype.resetCloudPassword = function () {
    var world = this.world();

    new DialogBoxMorph(
        null,
        user => this.cloud.resetPassword(
            user.username,
            (txt, title) => new DialogBoxMorph().inform(
                title,
                txt +
                '\n\nAn e-mail with a link to\n' +
                'reset your password\n' +
                'has been sent to the address provided',
                world,
                this.cloudIcon(null, new Color(0, 180, 0))
            ),
            this.cloudError()
        )
    ).withKey('cloudresetpassword').promptCredentials(
        'Reset password',
        'resetPassword',
        null,
        null,
        null,
        null,
        null,
        world,
        this.cloudIcon(),
        this.cloudMsg
    );
};

IDE_Morph.prototype.resendVerification = function () {
    var world = this.world();

    new DialogBoxMorph(
        null,
        user => this.cloud.resendVerification(
            user.username,
            (txt, title) => new DialogBoxMorph().inform(
                title,
                txt,
                world,
                this.cloudIcon(null, new Color(0, 180, 0))
            ),
            this.cloudError()
        )
    ).withKey('cloudresendverification').promptCredentials(
        'Resend verification email',
        'resendVerification',
        null,
        null,
        null,
        null,
        null,
        world,
        this.cloudIcon(),
        this.cloudMsg
    );
};

IDE_Morph.prototype.changeCloudPassword = function () {
    var world = this.world();

    new DialogBoxMorph(
        null,
        user => this.cloud.changePassword(
            user.oldpassword,
            user.password,
            user.passwordRepeat,
            () => this.showMessage('password has been changed.', 2),
            this.cloudError()
        )
    ).withKey('cloudpassword').promptCredentials(
        'Change Password',
        'changePassword',
        null,
        null,
        null,
        null,
        null,
        world,
        this.cloudIcon(),
        this.cloudMsg
    );
};

IDE_Morph.prototype.logout = function () {
    this.cloud.logout(
        () => {
            delete (sessionStorage.username);
            this.controlBar.cloudButton.refresh();
            this.showMessage('disconnected.', 2);
        },
        () => {
            delete (sessionStorage.username);
            this.controlBar.cloudButton.refresh();
            this.showMessage('disconnected.', 2);
        }
    );
};

IDE_Morph.prototype.buildProjectRequest = function () {
    var proj = new Project(this.scenes, this.scene),
        body,
        xml;

    this.scene.captureGlobalSettings();
    this.serializer.isCollectingMedia = true;
    xml = this.serializer.serialize(proj);
    body = {
        notes: proj.notes,
        xml: xml,
        /*
        media: this.hasChangedMedia ? // incremental media upload, disabled
            this.serializer.mediaXML(proj.name) : null,
        */
        media: this.serializer.mediaXML(proj.name),
        thumbnail: proj.thumbnail.toDataURL(),
        remixID: this.stage.remixID
    };
    this.serializer.isCollectingMedia = false;
    this.serializer.flushMedia();

    return body;
};

IDE_Morph.prototype.verifyProject = function (body) {
    // Ensure the project is less than 10MB and serializes correctly.
    var encodedBody = JSON.stringify(body);
    if (encodedBody.length > Cloud.MAX_FILE_SIZE) {
        new DialogBoxMorph().inform(
            'Snap!Cloud - Cannot Save Project',
            'The media inside this project exceeds 10 MB.\n' +
            'Please reduce the size of costumes or sounds.\n',
            this.world(),
            this.cloudIcon(null, new Color(180, 0, 0))
        );
        return false;
    }

    // console.log(encodedBody.length);
    // check if serialized data can be parsed back again
    try {
        this.serializer.parse(body.xml);
    } catch (err) {
        this.showMessage('Serialization of program data failed:\n' + err);
        return false;
    }
    if (body.media !== null) {
        try {
            this.serializer.parse(body.media);
        } catch (err) {
            this.showMessage('Serialization of media failed:\n' + err);
            return false;
        }
    }
    this.serializer.isCollectingMedia = false;
    this.serializer.flushMedia();

    return encodedBody.length;
};

IDE_Morph.prototype.saveProjectToCloud = function (name) {
    var projectBody, projectSize;

    if (name) {
        name = this.setProjectName(name);
    }

    this.showMessage('Saving project\nto the cloud...');
    projectBody = this.buildProjectRequest();
    projectSize = this.verifyProject(projectBody);
    if (!projectSize) { return; } // Invalid Projects don't return anything.
    this.showMessage(
        'Uploading ' + Math.round(projectSize / 1024) + ' KB...'
    );
    this.cloud.saveProject(
        this.getProjectName(),
        projectBody,
        () => {
            this.recordSavedChanges();
            this.showMessage('saved.', 2);
        },
        this.cloudError()
    );
};

IDE_Morph.prototype.exportProjectMedia = function (name) {
    var menu, media;
    this.scene.captureGlobalSettings();
    this.serializer.isCollectingMedia = true;
    if (name) {
        this.setProjectName(name);
        try {
            menu = this.showMessage('Exporting');
            this.serializer.serialize(new Project(this.scenes, this.scene));
            media = this.serializer.mediaXML(name);
            this.saveXMLAs(media, this.getProjectName() + ' media');
            menu.destroy();
            this.showMessage('Exported!', 1);
        } catch (err) {
            if (Process.prototype.isCatchingErrors) {
                this.serializer.isCollectingMedia = false;
                this.showMessage('Export failed: ' + err);
            } else {
                throw err;
            }
        }
    }
    this.serializer.isCollectingMedia = false;
    this.serializer.flushMedia();
    // this.hasChangedMedia = false;
};

IDE_Morph.prototype.exportProjectNoMedia = function (name) {
    var menu, str;
    this.scene.captureGlobalSettings();
    this.serializer.isCollectingMedia = true;
    if (name) {
        name = this.setProjectName(name);
        if (Process.prototype.isCatchingErrors) {
            try {
                menu = this.showMessage('Exporting');
                str = this.serializer.serialize(
                    new Project(this.scenes, this.scene)
                );
                this.saveXMLAs(str, name);
                menu.destroy();
                this.showMessage('Exported!', 1);
            } catch (err) {
                this.serializer.isCollectingMedia = false;
                this.showMessage('Export failed: ' + err);
            }
        } else {
            menu = this.showMessage('Exporting');
            str = this.serializer.serialize(
                new Project(this.scenes, this.scene)
            );
            this.saveXMLAs(str, name);
            menu.destroy();
            this.showMessage('Exported!', 1);
        }
    }
    this.serializer.isCollectingMedia = false;
    this.serializer.flushMedia();
};

IDE_Morph.prototype.exportProjectAsCloudData = function (name) {
    var menu, str, media, dta;
    this.scene.captureGlobalSettings();
    this.serializer.isCollectingMedia = true;
    if (name) {
        name = this.setProjectName(name);
        if (Process.prototype.isCatchingErrors) {
            try {
                menu = this.showMessage('Exporting');
                str = this.serializer.serialize(
                    new Project(this.scenes, this.scene)
                );
                media = this.serializer.mediaXML(name);
                dta = '<snapdata>' + str + media + '</snapdata>';
                this.saveXMLAs(dta, name);
                menu.destroy();
                this.showMessage('Exported!', 1);
            } catch (err) {
                this.serializer.isCollectingMedia = false;
                this.showMessage('Export failed: ' + err);
            }
        } else {
            menu = this.showMessage('Exporting');
            str = this.serializer.serialize(
                new Project(this.scenes, this.scene)
            );
            media = this.serializer.mediaXML(name);
            dta = '<snapdata>' + str + media + '</snapdata>';
            this.saveXMLAs(str, name);
            menu.destroy();
            this.showMessage('Exported!', 1);
        }
    }
    this.serializer.isCollectingMedia = false;
    this.serializer.flushMedia();
    // this.hasChangedMedia = false;
};

IDE_Morph.prototype.cloudAcknowledge = function () {
    return (responseText, url) => {
        nop(responseText);
        new DialogBoxMorph().inform(
            'Cloud Connection',
            'Successfully connected to:\n'
            + 'http://'
            + url,
            this.world(),
            this.cloudIcon(null, new Color(0, 180, 0))
        );
    };
};

IDE_Morph.prototype.cloudResponse = function () {
    return (responseText, url) => {
        var response = responseText;
        if (response.length > 50) {
            response = response.substring(0, 50) + '...';
        }
        new DialogBoxMorph().inform(
            'Snap!Cloud',
            'http://'
            + url + ':\n\n'
            + 'responds:\n'
            + response,
            this.world(),
            this.cloudIcon(null, new Color(0, 180, 0))
        );
    };
};

IDE_Morph.prototype.cloudError = function () {
    return (responseText, url) => {
        // first, try to find out an explanation for the error
        // and notify the user about it,
        // if none is found, show an error dialog box
        var response = responseText,
            // explanation = getURL('https://snap.berkeley.edu/cloudmsg.txt'),
            explanation = null;
        if (this.shield) {
            this.shield.destroy();
            this.shield = null;
        }
        if (explanation) {
            this.showMessage(explanation);
            return;
        }
        new DialogBoxMorph().inform(
            'Snap!Cloud',
            (url ? url + '\n' : '')
            + response,
            this.world(),
            this.cloudIcon(null, new Color(180, 0, 0))
        );
    };
};

IDE_Morph.prototype.cloudIcon = function (height, color) {
    var clr = color || DialogBoxMorph.prototype.titleBarColor,
        isFlat = MorphicPreferences.isFlat,
        icon = new SymbolMorph(
            isFlat ? 'cloud' : 'cloudGradient',
            height || 50,
            clr,
            isFlat ? null : new Point(-1, -1),
            clr.darker(50)
        );
    if (!isFlat) {
        icon.addShadow(new Point(1, 1), 1, clr.lighter(95));
    }
    return icon;
};

IDE_Morph.prototype.setCloudURL = function () {
    new DialogBoxMorph(
        null,
        url => {
            this.cloud.url = url;
            this.cloud.checkCredentials(
                () => this.controlBar.cloudButton.refresh(),
                () => this.controlBar.cloudButton.refresh()
            );
        }
    ).withKey('cloudURL').prompt(
        'Cloud URL',
        this.cloud.url,
        this.world(),
        null,
        this.cloud.knownDomains
    );
};

IDE_Morph.prototype.urlParameters = function () {
    var parameters = location.hash.slice(location.hash.indexOf(':') + 1);
    return this.cloud.parseDict(parameters);
};

IDE_Morph.prototype.hasCloudProject = function () {
    var params = this.urlParameters();
    return params.hasOwnProperty('Username') &&
        params.hasOwnProperty('ProjectName');
};

// IDE_Morph HTTP data fetching

IDE_Morph.prototype.getURL = function (url, callback, responseType) {
    // fetch the contents of a url and pass it into the specified callback.
    // If no callback is specified synchronously fetch and return it
    // Note: Synchronous fetching has been deprecated and should be switched
    // Note: Do Not attemp to prevent caching of requests.
    //   This has caused issues for BJC and the finch.
    var request = new XMLHttpRequest(),
        async = callback instanceof Function,
        rsp;
    if (async) {
        request.responseType = responseType || 'text';
    }
    rsp = (!async || request.responseType === 'text') ? 'responseText'
        : 'response';
    try {
        request.open('GET', url, async);
        if (async) {
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    if (request[rsp]) {
                        callback.call(
                            this,
                            request[rsp]
                        );
                    } else {
                        this.showMessage('unable to retrieve ' + url);
                        throw new Error('unable to retrieve ' + url);
                    }
                }
            };
        }
        request.send();
        if (!async) {
            if (request.status === 200) {
                return request[rsp];
            }
            throw new Error('unable to retrieve ' + url);
        }
    } catch (err) {
        this.showMessage(err.toString());
        if (async) {
            callback.call(this);
        } else {
            return request[rsp];
        }
    }
};

// IDE_Morph serialization helper ops

IDE_Morph.prototype.blocksLibraryXML = function (
    definitions,
    moreCategories,
    asFile,
    dataFrame, // optional: include global variable dependencies in libraries
    localData // optional: include sprite-local variable dependencies
) {
    // answer an XML string encoding of an array of CustomBlockDefinitions
    var globals = definitions.filter(def => def.isGlobal),
        locals = definitions.filter(def => !def.isGlobal),
        glbStr = globals.length ? this.serializer.serialize(globals, true) : '',
        locStr = locals.length ? this.serializer.serialize(locals, true) : '',
        dtaStr = dataFrame && dataFrame.names(true).length ?
            this.serializer.serialize(dataFrame, true)
            : '',
        ldtStr = localData && localData.names(true).length ?
            this.serializer.serialize(localData, true)
            : '',
        cats = moreCategories || [],
        appStr = ' app="' +
            this.serializer.app +
            '" version="' +
            this.serializer.version +
            '"';

    return '<blocks' +
        (asFile ? appStr : '') +
        '>' +
        this.paletteXML(definitions.map(def => def.category).concat(cats)) +
        (globals.length ? glbStr : '') +
        (locals.length ? ('<local>' + locStr + '</local>') : '') +
        (dtaStr ? '<variables>' + dtaStr + '</variables>' : '') +
        (ldtStr ? '<local-variables>' + ldtStr + '</local-variables>' : '') +
        '</blocks>';
};

IDE_Morph.prototype.paletteXML = function (categoryNames) {
    // answer an XML string containing the palette information
    // found in an array of category names
    var palette = new Map();
    categoryNames.forEach(cat => {
        if (SpriteMorph.prototype.customCategories.has(cat)) {
            palette.set(
                cat,
                SpriteMorph.prototype.customCategories.get(cat)
            );
        }
    });
    return this.serializer.paletteToXML(palette);
};

// IDE_Morph user dialog shortcuts

IDE_Morph.prototype.showMessage = function (message, secs) {
    var m = new MenuMorph(null, message),
        intervalHandle;
    m.popUpCenteredInWorld(this.world());
    if (secs) {
        intervalHandle = setInterval(
            () => {
                m.destroy();
                clearInterval(intervalHandle);
            },
            secs * 1000
        );
    }
    return m;
};

IDE_Morph.prototype.inform = function (title, message) {
    return new DialogBoxMorph().inform(
        title,
        localize(message),
        this.world()
    );
};

IDE_Morph.prototype.confirm = function (message, title, action) {
    new DialogBoxMorph(null, action).askYesNo(
        title,
        localize(message),
        this.world()
    );
};

IDE_Morph.prototype.prompt = function (message, callback, choices, key) {
    (new DialogBoxMorph(null, callback)).withKey(key).prompt(
        message,
        '',
        this.world(),
        null,
        choices
    );
};

// IDE_Morph bracing against IE

IDE_Morph.prototype.warnAboutIE = function () {
    var dlg, txt;
    if (this.isIE()) {
        dlg = new DialogBoxMorph();
        txt = new TextMorph(
            'Please do not use Internet Explorer.\n' +
            'Snap! runs best in a web-standards\n' +
            'compliant browser',
            dlg.fontSize,
            dlg.fontStyle,
            true,
            false,
            'center',
            null,
            null,
            MorphicPreferences.isFlat ? null : new Point(1, 1),
            BLACK
        );

        dlg.key = 'IE-Warning';
        dlg.labelString = "Internet Explorer";
        dlg.createLabel();
        dlg.addBody(txt);
        dlg.fixLayout();
        dlg.popUp(this.world());
        dlg.nag = true;
    }
};

IDE_Morph.prototype.isIE = function () {
    var ua = navigator.userAgent;
    return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
};

// IDE_Morph warn about saving project in the dev version

IDE_Morph.prototype.warnAboutDev = function () {
    if (!SnapVersion.includes('-dev') || this.config.noDevWarning) {
        return;
    }
    this.inform(
        "CAUTION! Development Version",
        'This version of Snap! is being developed.\n' +
        '*** It is NOT supported for end users. ***\n' +
        'Saving a project in THIS version is likely to\n' +
        'make it UNUSABLE or DEFECTIVE for current and\n' +
        'even future official versions!\n\n' +
        'visit https://snap.berkeley.edu/run\n' +
        'for the official Snap! installation.'
    ).nag = true;
};

// ProjectDialogMorph ////////////////////////////////////////////////////

// ProjectDialogMorph inherits from DialogBoxMorph:

ProjectDialogMorph.prototype = new DialogBoxMorph();
ProjectDialogMorph.prototype.constructor = ProjectDialogMorph;
ProjectDialogMorph.uber = DialogBoxMorph.prototype;

// ProjectDialogMorph instance creation:

function ProjectDialogMorph(ide, label) {
    this.init(ide, label);
}

ProjectDialogMorph.prototype.init = function (ide, task) {
    // additional properties:
    this.ide = ide;
    this.task = task || 'open'; // String describing what do do (open, save)
    this.source = ide.source;
    this.projectList = []; // [{name: , thumb: , notes:}]

    this.handle = null;
    this.srcBar = null;
    this.nameField = null;
    this.filterField = null;
    this.magnifyingGlass = null;
    this.listField = null;
    this.preview = null;
    this.notesText = null;
    this.notesField = null;
    this.deleteButton = null;
    this.shareButton = null;
    this.unshareButton = null;
    this.publishButton = null;
    this.unpublishButton = null;
    this.recoverButton = null;

    // initialize inherited properties:
    ProjectDialogMorph.uber.init.call(
        this,
        this, // target
        null, // function
        null // environment
    );

    // override inherited properites:
    switch (this.task) {
        case 'save':
            this.labelString = 'Save Project';
            break;
        case 'add':
            this.labelString = 'Add Scene';
            break;
        default: // 'open'
            this.task = 'open';
            this.labelString = 'Open Project';
    }

    this.createLabel();
    this.key = 'project' + task;

    // build contents
    if ((task === 'open' || task === 'add') && this.source === 'disk') {
        // give the user a chance to switch to another source
        this.source = null;
        this.buildContents();
        this.projectList = [];
        this.listField.hide();
        this.source = 'disk';
    } else {
        this.buildContents();
        this.onNextStep = () => // yield to show "updating" message
            this.setSource(this.source);
    }
};

ProjectDialogMorph.prototype.buildContents = function () {
    var thumbnail, notification;

    this.addBody(new Morph());
    this.body.color = this.color;

    this.srcBar = new AlignmentMorph('column', this.padding / 2);

    if (this.ide.cloudMsg) {
        notification = new TextMorph(
            this.ide.cloudMsg,
            10,
            null, // style
            false, // bold
            null, // italic
            null, // alignment
            null, // width
            null, // font name
            new Point(1, 1), // shadow offset
            FOREGROUND // shadowColor
        );
        notification.refresh = nop;
        this.srcBar.add(notification);
    }

    if (!this.ide.cloud.disabled) {
        this.addSourceButton('cloud', localize('Cloud'), 'cloud');
    }

    if (this.task === 'open' || this.task === 'add') {
        this.buildFilterField();
        this.addSourceButton('examples', localize('Examples'), 'poster');
        if (this.hasLocalProjects() || this.ide.world().currentKey === 16) {
            // shift- clicked
            this.addSourceButton('local', localize('Browser'), 'globe');
        }
    }
    this.addSourceButton('disk', localize('Computer'), 'storage');

    this.srcBar.fixLayout();
    this.body.add(this.srcBar);

    if (this.task === 'save') {
        this.nameField = new InputFieldMorph(this.ide.getProjectName());
        this.body.add(this.nameField);
    }

    this.listField = new ListMorph([]);
    this.fixListFieldItemColors();
    this.listField.fixLayout = nop;
    this.listField.edge = InputFieldMorph.prototype.edge;
    this.listField.fontSize = InputFieldMorph.prototype.fontSize;
    this.listField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.listField.contrast = InputFieldMorph.prototype.contrast;
    this.listField.render = InputFieldMorph.prototype.render;
    this.listField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    this.body.add(this.listField);

    this.preview = new Morph();
    this.preview.fixLayout = nop;
    this.preview.edge = InputFieldMorph.prototype.edge;
    this.preview.fontSize = InputFieldMorph.prototype.fontSize;
    this.preview.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.preview.contrast = InputFieldMorph.prototype.contrast;
    this.preview.render = function (ctx) {
        InputFieldMorph.prototype.render.call(this, ctx);
        if (this.cachedTexture) {
            this.renderCachedTexture(ctx);
        } else if (this.texture) {
            this.renderTexture(this.texture, ctx);
        }
    };
    this.preview.renderCachedTexture = function (ctx) {
        ctx.drawImage(this.cachedTexture, this.edge, this.edge);
    };
    this.preview.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;
    this.preview.setExtent(
        this.ide.serializer.thumbnailSize.add(this.preview.edge * 2)
    );

    this.body.add(this.preview);
    if (this.task === 'save') {
        thumbnail = this.ide.scenes.at(1).stage.thumbnail(
            SnapSerializer.prototype.thumbnailSize
        );
        this.preview.texture = null;
        this.preview.cachedTexture = thumbnail;
        this.preview.rerender();
    }

    this.notesField = new ScrollFrameMorph();
    this.notesField.fixLayout = nop;

    this.notesField.edge = InputFieldMorph.prototype.edge;
    this.notesField.fontSize = InputFieldMorph.prototype.fontSize;
    this.notesField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.notesField.contrast = InputFieldMorph.prototype.contrast;
    this.notesField.render = InputFieldMorph.prototype.render;
    this.notesField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    this.notesField.acceptsDrops = false;
    this.notesField.contents.acceptsDrops = false;

    if (this.task === 'open' || this.task === 'add') {
        this.notesText = new TextMorph('');
    } else { // 'save'
        this.notesText = new TextMorph(this.ide.getProjectNotes());
        this.notesText.isEditable = true;
        this.notesText.enableSelecting();
    }

    this.notesField.isTextLineWrapping = true;
    this.notesField.padding = 3;
    this.notesField.setContents(this.notesText);
    this.notesField.setWidth(this.preview.width());

    this.body.add(this.notesField);

    if (this.task === 'open') {
        this.addButton('openProject', 'Open');
        this.action = 'openProject';
        this.recoverButton = this.addButton('recoveryDialog', 'Recover', true);
        this.recoverButton.hide();
    } else if (this.task === 'add') {
        this.addButton('addScene', 'Add');
        this.action = 'addScene';
        this.recoverButton = this.addButton('recoveryDialog', 'Recover', true);
        this.recoverButton.hide();
    } else { // 'save'
        this.addButton('saveProject', 'Save');
        this.action = 'saveProject';
    }
    this.shareButton = this.addButton('shareProject', 'Share', true);
    this.unshareButton = this.addButton('unshareProject', 'Unshare', true);
    this.shareButton.hide();
    this.unshareButton.hide();
    this.publishButton = this.addButton('publishProject', 'Publish', true);
    this.unpublishButton = this.addButton(
        'unpublishProject',
        'Unpublish',
        true
    );
    this.publishButton.hide();
    this.unpublishButton.hide();
    this.deleteButton = this.addButton('deleteProject', 'Delete');
    this.addButton('cancel', 'Cancel');

    if (notification) {
        this.setExtent(new Point(500, 360).add(notification.extent()));
    } else {
        this.setExtent(new Point(500, 360));
    }
    this.fixLayout();

};

ProjectDialogMorph.prototype.popUp = function (wrrld) {
    var world = wrrld || this.ide.world();
    if (world) {
        ProjectDialogMorph.uber.popUp.call(this, world);
        this.handle = new HandleMorph(
            this,
            350,
            330,
            this.corner,
            this.corner
        );
    }
};

// ProjectDialogMorph action buttons

ProjectDialogMorph.prototype.createButtons = function () {
    if (this.buttons) {
        this.buttons.destroy();
    }
    this.buttons = new AlignmentMorph('column', this.padding / 3);
    this.buttons.bottomRow = new AlignmentMorph('row', this.padding);
    this.buttons.topRow = new AlignmentMorph('row', this.padding);
    this.buttons.add(this.buttons.topRow);
    this.buttons.add(this.buttons.bottomRow);
    this.add(this.buttons);

    this.buttons.fixLayout = function () {
        if (this.topRow.children.some(function (any) {
            return any.isVisible;
        })) {
            this.topRow.show();
            this.topRow.fixLayout();
        } else {
            this.topRow.hide();
        }
        this.bottomRow.fixLayout();
        AlignmentMorph.prototype.fixLayout.call(this);
    };
};

ProjectDialogMorph.prototype.addButton = function (action, label, topRow) {
    var button = new PushButtonMorph(
        this,
        action || 'ok',
        '  ' + localize((label || 'OK')) + '  '
    );
    button.fontSize = this.buttonFontSize;
    button.corner = this.buttonCorner;
    button.edge = this.buttonEdge;
    button.outline = this.buttonOutline;
    button.outlineColor = this.buttonOutlineColor;
    button.outlineGradient = this.buttonOutlineGradient;
    button.padding = this.buttonPadding;
    button.contrast = this.buttonContrast;
    button.fixLayout();
    if (topRow) {
        this.buttons.topRow.add(button);
    } else {
        this.buttons.bottomRow.add(button);
    }
    return button;
};

// ProjectDialogMorph source buttons

ProjectDialogMorph.prototype.addSourceButton = function (
    source,
    label,
    symbol
) {
    var lbl1 = new StringMorph(
        label,
        10,
        null,
        true,
        null,
        null,
        new Point(1, 1),
        FOREGROUND
    ),
        lbl2 = new StringMorph(
            label,
            10,
            null,
            true,
            null,
            null,
            new Point(-1, -1),
            this.titleBarColor.darker(50),
            FOREGROUND
        ),
        l1 = new Morph(),
        l2 = new Morph(),
        button;

    lbl1.add(new SymbolMorph(
        symbol,
        24,
        this.titleBarColor.darker(20),
        new Point(1, 1),
        this.titleBarColor.darker(50)
    ));
    lbl1.children[0].setCenter(lbl1.center());
    lbl1.children[0].setBottom(lbl1.top() - this.padding / 2);

    l1.isCachingImage = true;
    l1.cachedImage = lbl1.fullImage();
    l1.bounds = lbl1.fullBounds();

    lbl2.add(new SymbolMorph(
        symbol,
        24,
        FOREGROUND,
        new Point(-1, -1),
        this.titleBarColor.darker(50)
    ));
    lbl2.children[0].setCenter(lbl2.center());
    lbl2.children[0].setBottom(lbl2.top() - this.padding / 2);

    l2.isCachingImage = true;
    l2.cachedImage = lbl2.fullImage();
    l2.bounds = lbl2.fullBounds();

    button = new ToggleButtonMorph(
        null, //colors,
        this, // the ProjectDialog is the target
        () => this.setSource(source), // action
        [l1, l2],
        () => this.source === source // query
    );

    button.corner = this.buttonCorner;
    button.edge = this.buttonEdge;
    button.outline = this.buttonOutline;
    button.outlineColor = this.buttonOutlineColor;
    button.outlineGradient = this.buttonOutlineGradient;
    button.labelMinExtent = new Point(60, 0);
    button.padding = this.buttonPadding;
    button.contrast = this.buttonContrast;
    button.pressColor = this.titleBarColor.darker(20);
    button.fixLayout();
    button.refresh();
    this.srcBar.add(button);
};

// ProjectDialogMorph list field control

ProjectDialogMorph.prototype.fixListFieldItemColors = function () {
    // remember to always fixLayout() afterwards for the changes
    // to take effect
    this.listField.contents.children[0].alpha = 0;
    this.listField.contents.children[0].children.forEach(item => {
        item.pressColor = this.titleBarColor.darker(20);
        item.color = new Color(0, 255, 213);
    });
};

// ProjectDialogMorph filter field

ProjectDialogMorph.prototype.buildFilterField = function () {
    var myself = this;

    this.filterField = new InputFieldMorph('');
    this.magnifyingGlass = new SymbolMorph(
        'magnifyingGlass',
        this.filterField.height(),
        this.titleBarColor.darker(50)
    );

    this.body.add(this.magnifyingGlass);
    this.body.add(this.filterField);

    this.filterField.reactToInput = function (evt) {
        var text = this.getValue();

        myself.listField.elements =
            myself.projectList.filter(aProject => {
                var name = aProject.projectname || aProject.name,
                    notes = aProject.notes || '';
                return name.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
                    notes.toLowerCase().indexOf(text.toLowerCase()) > -1;
            });

        if (myself.listField.elements.length === 0) {
            myself.listField.elements.push('(no matches)');
        }

        myself.clearDetails();
        myself.listField.buildListContents();
        myself.fixListFieldItemColors();
        myself.listField.adjustScrollBars();
        myself.listField.scrollY(myself.listField.top());
        myself.fixLayout();
    };
};

// ProjectDialogMorph ops

ProjectDialogMorph.prototype.setSource = function (source) {
    var msg, setting;

    this.source = source;
    this.srcBar.children.forEach(button =>
        button.refresh()
    );

    switch (this.source) {
        case 'cloud':
            msg = this.ide.showMessage('Updating\nproject list...');
            this.projectList = [];
            this.ide.cloud.getProjectList(
                response => {
                    // Don't show cloud projects if user has since switched panes.
                    if (this.source === 'cloud') {
                        this.installCloudProjectList(response.projects);
                    }
                    msg.destroy();
                },
                (err, lbl) => {
                    msg.destroy();
                    this.ide.cloudError().call(null, err, lbl);
                }
            );
            return;
        case 'examples':
            this.projectList = this.getExamplesProjectList();
            break;
        case 'local':
            // deprecated, only for reading
            this.projectList = this.getLocalProjectList();
            break;
        case 'disk':
            if (this.task === 'save') {
                this.projectList = [];
            } else {
                this.destroy();
                if (this.task === 'add') {
                    setting = this.ide.isAddingScenes;
                    this.ide.isAddingScenes = true;
                    this.ide.importLocalFile();
                    this.ide.isAddingScenes = setting;
                } else {
                    this.ide.importLocalFile();
                }
                return;
            }
            break;
    }

    this.listField.destroy();
    this.listField = new ListMorph(
        this.projectList,
        this.projectList.length > 0 ?
            (element) => { return element.name || element; }
            : null,
        null,
        () => this.ok()
    );
    if (this.source === 'disk') {
        this.listField.hide();
    }

    this.fixListFieldItemColors();
    this.listField.fixLayout = nop;
    this.listField.edge = InputFieldMorph.prototype.edge;
    this.listField.fontSize = InputFieldMorph.prototype.fontSize;
    this.listField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.listField.contrast = InputFieldMorph.prototype.contrast;
    this.listField.render = InputFieldMorph.prototype.render;
    this.listField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    if (this.source === 'local') {
        this.listField.action = (item) => {
            var src, xml;
            if (item === undefined) { return; }
            if (this.nameField) {
                this.nameField.setContents(item.name || '');
            }
            if (this.task === 'open') {
                src = localStorage['-snap-project-' + item.name];
                if (src) {
                    xml = this.ide.serializer.parse(src);
                    this.notesText.text =
                        xml.childNamed('notes').contents || '';
                    this.notesText.rerender();
                    this.notesField.contents.adjustBounds();
                    this.preview.texture =
                        xml.childNamed('thumbnail').contents || null;
                    this.preview.cachedTexture = null;
                    this.preview.rerender();
                }
            }
            this.edit();
        };
    } else { // 'examples'; 'cloud' is initialized elsewhere
        this.listField.action = (item) => {
            var src, xml;
            if (item === undefined) { return; }
            if (this.nameField) {
                this.nameField.setContents(item.name || '');
            }
            src = this.ide.getURL(
                this.ide.resourceURL('Examples', item.fileName)
            );
            xml = this.ide.serializer.parse(src);
            this.notesText.text = xml.childNamed('notes').contents || '';
            this.notesText.rerender();
            this.notesField.contents.adjustBounds();
            this.preview.texture = xml.childNamed('thumbnail').contents || null;
            this.preview.cachedTexture = null;
            this.preview.rerender();
            this.edit();
        };
    }
    this.body.add(this.listField);
    this.shareButton.hide();
    this.unshareButton.hide();

    if (this.task === 'open' || this.task === 'add') {
        this.recoverButton.hide();
    }

    this.publishButton.hide();
    this.unpublishButton.hide();
    if (this.source === 'local') {
        this.deleteButton.show();
    } else { // examples
        this.deleteButton.hide();
    }
    this.buttons.fixLayout();
    this.fixLayout();
    if (this.task === 'open' || this.task === 'add') {
        this.clearDetails();
    }
};

ProjectDialogMorph.prototype.hasLocalProjects = function () {
    // check and report whether old projects still exist in the
    // browser's local storage, which as of v5 has been deprecated,
    // so the user can recover and move them elsewhere
    return Object.keys(localStorage).some(any =>
        any.indexOf('-snap-project-') === 0
    );
};

ProjectDialogMorph.prototype.getLocalProjectList = function () {
    var stored, name, dta,
        projects = [];
    for (stored in localStorage) {
        if (Object.prototype.hasOwnProperty.call(localStorage, stored)
            && stored.substr(0, 14) === '-snap-project-') {
            name = stored.substr(14);
            dta = {
                name: name,
                thumb: null,
                notes: null
            };
            projects.push(dta);
        }
    }
    projects.sort((x, y) =>
        x.name.toLowerCase() < y.name.toLowerCase() ? -1 : 1
    );
    return projects;
};

ProjectDialogMorph.prototype.getExamplesProjectList = function () {
    return this.ide.getMediaList('Examples');
};

ProjectDialogMorph.prototype.installCloudProjectList = function (pl) {
    this.projectList = pl[0] ? pl : [];
    this.projectList.sort((x, y) =>
        x.projectname.toLowerCase() < y.projectname.toLowerCase() ? -1 : 1
    );

    this.listField.destroy();
    this.listField = new ListMorph(
        this.projectList,
        this.projectList.length > 0 ?
            (element) => { return element.projectname || element; }
            : null,
        [ // format: display shared project names bold
            [
                'bold',
                proj => proj.ispublic
            ],
            [
                'italic',
                proj => proj.ispublished
            ]
        ],
        () => this.ok()
    );
    this.fixListFieldItemColors();
    this.listField.fixLayout = nop;
    this.listField.edge = InputFieldMorph.prototype.edge;
    this.listField.fontSize = InputFieldMorph.prototype.fontSize;
    this.listField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.listField.contrast = InputFieldMorph.prototype.contrast;
    this.listField.render = InputFieldMorph.prototype.render;
    this.listField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    this.listField.action = (item) => {
        if (item === undefined) { return; }
        if (this.nameField) {
            this.nameField.setContents(item.projectname || '');
        }
        if (this.task === 'open' || this.task === 'add') {
            this.notesText.text = item.notes || '';
            this.notesText.rerender();
            this.notesField.contents.adjustBounds();
            this.preview.texture = '';
            this.preview.rerender();
            // we ask for the thumbnail when selecting a project
            this.ide.cloud.getThumbnail(
                null, // username is implicit
                item.projectname,
                thumbnail => {
                    this.preview.texture = thumbnail;
                    this.preview.cachedTexture = null;
                    this.preview.rerender();
                });
            new SpeechBubbleMorph(new TextMorph(
                localize('last changed') + '\n' + item.lastupdated,
                null,
                null,
                null,
                null,
                'center'
            )).popUp(
                this.world(),
                this.preview.rightCenter().add(new Point(2, 0))
            );
        }
        if (item.ispublic) {
            this.shareButton.hide();
            this.unshareButton.show();
            if (item.ispublished) {
                this.publishButton.hide();
                this.unpublishButton.show();
            } else {
                this.publishButton.show();
                this.unpublishButton.hide();
            }
        } else {
            this.unshareButton.hide();
            this.shareButton.show();
            this.publishButton.hide();
            this.unpublishButton.hide();
        }
        this.buttons.fixLayout();
        this.fixLayout();
        this.edit();
    };
    this.body.add(this.listField);
    if (this.task === 'open' || this.task === 'add') {
        this.recoverButton.show();
    }
    this.shareButton.show();
    this.unshareButton.hide();
    this.deleteButton.show();
    this.buttons.fixLayout();
    this.fixLayout();
    if (this.task === 'open' || this.task === 'add') {
        this.clearDetails();
    }
};

ProjectDialogMorph.prototype.clearDetails = function () {
    this.notesText.text = '';
    this.notesText.rerender();
    this.notesField.contents.adjustBounds();
    this.preview.texture = null;
    this.preview.cachedTexture = null;
    this.preview.rerender();
};

ProjectDialogMorph.prototype.recoveryDialog = function () {
    var proj = this.listField.selected;
    if (!proj) { return; }
    this.removeShadow();
    this.hide();
    new ProjectRecoveryDialogMorph(this.ide, proj.projectname, this).popUp();
};

ProjectDialogMorph.prototype.addScene = function () {
    var proj = this.listField.selected,
        src;
    if (!proj) { return; }
    this.ide.isAddingNextScene = true;
    this.ide.source = this.source;
    if (this.source === 'cloud') {
        this.addCloudScene(proj);
    } else if (this.source === 'examples') {
        // Note "file" is a property of the parseResourceFile function.
        src = this.ide.getURL(this.ide.resourceURL('Examples', proj.fileName));
        this.ide.openProjectString(src);
        this.destroy();

    } else { // 'local'
        this.ide.source = null;
        this.ide.openProjectName(proj.name);
        this.destroy();
    }
};

ProjectDialogMorph.prototype.openProject = function () {
    var proj = this.listField.selected,
        src;
    if (!proj) { return; }
    this.ide.source = this.source;
    if (this.source === 'cloud') {
        this.openCloudProject(proj);
    } else if (this.source === 'examples') {
        // Note "file" is a property of the parseResourceFile function.
        src = this.ide.getURL(this.ide.resourceURL('Examples', proj.fileName));
        this.ide.backup(() => this.ide.openProjectString(src));
        this.destroy();

    } else { // 'local'
        this.ide.source = null;
        this.ide.backup(() => this.ide.openProjectName(proj.name));
        this.destroy();
    }
};

ProjectDialogMorph.prototype.addCloudScene = function (project, delta) {
    // no need to backup
    this.ide.nextSteps([
        () => this.ide.showMessage('Fetching project\nfrom the cloud...'),
        () => this.rawOpenCloudProject(project, delta)
    ]);
};

ProjectDialogMorph.prototype.openCloudProject = function (project, delta) {
    this.ide.backup(
        () => {
            this.ide.nextSteps([
                () => this.ide.showMessage('Fetching project\nfrom the cloud...'),
                () => this.rawOpenCloudProject(project, delta)
            ]);
        }
    );
};

ProjectDialogMorph.prototype.rawOpenCloudProject = function (proj, delta) {
    this.ide.cloud.getProject(
        proj.projectname,
        delta,
        clouddata => {
            this.ide.source = 'cloud';
            this.ide.nextSteps([
                () => this.ide.openCloudDataString(clouddata)
            ]);
            location.hash = '';
            if (proj.ispublic) {
                location.hash = '#present:Username=' +
                    encodeURIComponent(this.ide.cloud.username) +
                    '&ProjectName=' +
                    encodeURIComponent(proj.projectname);
            }
        },
        this.ide.cloudError()
    );
    this.destroy();
};

ProjectDialogMorph.prototype.saveProject = function () {
    var name = this.nameField.contents().text.text,
        notes = this.notesText.text;

    if (this.ide.getProjectNotes() !== notes) {
        this.ide.setProjectNotes(notes);
    }
    if (name) {
        if (this.source === 'cloud') {
            if (detect(
                this.projectList,
                item => item.projectname === name
            )) {
                this.ide.confirm(
                    localize(
                        'Are you sure you want to replace'
                    ) + '\n"' + name + '"?',
                    'Replace Project',
                    () => {
                        this.ide.setProjectName(name);
                        this.saveCloudProject();
                    }
                );
            } else {
                this.ide.setProjectName(name);
                this.saveCloudProject();
            }
        } else if (this.source === 'disk') {
            this.ide.exportProject(name);
            this.ide.source = 'disk';
            this.destroy();
        }
    }
};

ProjectDialogMorph.prototype.saveCloudProject = function () {
    this.ide.source = 'cloud';
    this.ide.saveProjectToCloud();
    this.destroy();
};

ProjectDialogMorph.prototype.deleteProject = function () {
    var proj,
        idx,
        name;

    if (this.source === 'cloud') {
        proj = this.listField.selected;
        if (proj) {
            this.ide.confirm(
                localize(
                    'Are you sure you want to delete'
                ) + '\n"' + proj.projectname + '"?',
                'Delete Project',
                () => this.ide.cloud.deleteProject(
                    proj.projectname,
                    null, // username is implicit
                    () => {
                        this.ide.hasChangedMedia = true;
                        idx = this.projectList.indexOf(proj);
                        this.projectList.splice(idx, 1);
                        this.installCloudProjectList( // refresh list
                            this.projectList
                        );
                    },
                    this.ide.cloudError()
                )
            );
        }
    } else { // 'local, examples'
        if (this.listField.selected) {
            name = this.listField.selected.name;
            this.ide.confirm(
                localize(
                    'Are you sure you want to delete'
                ) + '\n"' + name + '"?',
                'Delete Project',
                () => {
                    delete localStorage['-snap-project-' + name];
                    this.setSource(this.source); // refresh list
                }
            );
        }
    }
};

ProjectDialogMorph.prototype.shareProject = function () {
    var ide = this.ide,
        proj = this.listField.selected,
        entry = this.listField.active;

    if (proj) {
        this.ide.confirm(
            localize(
                'Are you sure you want to share'
            ) + '\n"' + proj.projectname + '"?',
            'Share Project',
            () => {
                ide.showMessage('sharing\nproject...');
                ide.cloud.shareProject(
                    proj.projectname,
                    null, // username is implicit
                    () => {
                        proj.ispublic = true;
                        this.unshareButton.show();
                        this.shareButton.hide();
                        this.publishButton.show();
                        this.unpublishButton.hide();
                        entry.label.isBold = true;
                        entry.label.rerender();
                        this.buttons.fixLayout();
                        this.rerender();
                        this.ide.showMessage('shared.', 2);

                        // Set the Shared URL if the project is currently open
                        if (proj.projectname === ide.getProjectName()) {
                            var usr = ide.cloud.username,
                                projectId = 'Username=' +
                                    encodeURIComponent(usr.toLowerCase()) +
                                    '&ProjectName=' +
                                    encodeURIComponent(proj.projectname);
                            location.hash = 'present:' + projectId;
                        }
                    },
                    this.ide.cloudError()
                );
            }
        );
    }
};

ProjectDialogMorph.prototype.unshareProject = function () {
    var ide = this.ide,
        proj = this.listField.selected,
        entry = this.listField.active;

    if (proj) {
        this.ide.confirm(
            localize(
                'Are you sure you want to unshare'
            ) + '\n"' + proj.projectname + '"?',
            'Unshare Project',
            () => {
                ide.showMessage('unsharing\nproject...');
                ide.cloud.unshareProject(
                    proj.projectname,
                    null, // username is implicit
                    () => {
                        proj.ispublic = false;
                        this.shareButton.show();
                        this.unshareButton.hide();
                        this.publishButton.hide();
                        this.unpublishButton.hide();
                        entry.label.isBold = false;
                        entry.label.isItalic = false;
                        entry.label.rerender();
                        this.buttons.fixLayout();
                        this.rerender();
                        this.ide.showMessage('unshared.', 2);
                        if (proj.projectname === ide.getProjectName()) {
                            location.hash = '';
                        }
                    },
                    this.ide.cloudError()
                );
            }
        );
    }
};

ProjectDialogMorph.prototype.publishProject = function () {
    var ide = this.ide,
        proj = this.listField.selected,
        entry = this.listField.active;

    if (proj) {
        this.ide.confirm(
            localize(
                'Are you sure you want to publish'
            ) + '\n"' + proj.projectname + '"?',
            'Publish Project',
            () => {
                ide.showMessage('publishing\nproject...');
                ide.cloud.publishProject(
                    proj.projectname,
                    null, // username is implicit
                    () => {
                        proj.ispublished = true;
                        this.unshareButton.show();
                        this.shareButton.hide();
                        this.publishButton.hide();
                        this.unpublishButton.show();
                        entry.label.isItalic = true;
                        entry.label.rerender();
                        this.buttons.fixLayout();
                        this.rerender();
                        this.ide.showMessage('published.', 2);

                        // Set the Shared URL if the project is currently open
                        if (proj.projectname === ide.getProjectName()) {
                            var usr = ide.cloud.username,
                                projectId = 'Username=' +
                                    encodeURIComponent(usr.toLowerCase()) +
                                    '&ProjectName=' +
                                    encodeURIComponent(proj.projectname);
                            location.hash = 'present:' + projectId;
                        }
                    },
                    this.ide.cloudError()
                );
            }
        );
    }
};

ProjectDialogMorph.prototype.unpublishProject = function () {
    var proj = this.listField.selected,
        entry = this.listField.active;

    if (proj) {
        this.ide.confirm(
            localize(
                'Are you sure you want to unpublish'
            ) + '\n"' + proj.projectname + '"?',
            'Unpublish Project',
            () => {
                this.ide.showMessage('unpublishing\nproject...');
                this.ide.cloud.unpublishProject(
                    proj.projectname,
                    null, // username is implicit
                    () => {
                        proj.ispublished = false;
                        this.unshareButton.show();
                        this.shareButton.hide();
                        this.publishButton.show();
                        this.unpublishButton.hide();
                        entry.label.isItalic = false;
                        entry.label.rerender();
                        this.buttons.fixLayout();
                        this.rerender();
                        this.ide.showMessage('unpublished.', 2);
                    },
                    this.ide.cloudError()
                );
            }
        );
    }
};

ProjectDialogMorph.prototype.edit = function () {
    if (this.nameField) {
        this.nameField.edit();
    } else if (this.filterField) {
        this.filterField.edit();
    }
};

// ProjectDialogMorph layout

ProjectDialogMorph.prototype.fixLayout = function () {
    var th = fontHeight(this.titleFontSize) + this.titlePadding * 2,
        thin = this.padding / 2,
        inputField = this.nameField || this.filterField;

    if (this.buttons && (this.buttons.children.length > 0)) {
        this.buttons.fixLayout();
    }

    if (this.body) {
        this.body.setPosition(this.position().add(new Point(
            this.padding,
            th + this.padding
        )));
        this.body.setExtent(new Point(
            this.width() - this.padding * 2,
            this.height() - this.padding * 3 - th - this.buttons.height()
        ));
        this.srcBar.setPosition(this.body.position());

        inputField.setWidth(
            this.body.width() - this.srcBar.width() - this.padding * 6
        );
        inputField.setLeft(this.srcBar.right() + this.padding * 3);
        inputField.setTop(this.srcBar.top());

        this.listField.setLeft(this.srcBar.right() + this.padding);
        this.listField.setWidth(
            this.body.width()
            - this.srcBar.width()
            - this.preview.width()
            - this.padding
            - thin
        );
        this.listField.contents.children[0].adjustWidths();

        this.listField.setTop(inputField.bottom() + this.padding);
        this.listField.setHeight(
            this.body.height() - inputField.height() - this.padding
        );

        if (this.magnifyingGlass) {
            this.magnifyingGlass.setTop(inputField.top());
            this.magnifyingGlass.setLeft(this.listField.left());
        }

        this.preview.setRight(this.body.right());
        this.preview.setTop(inputField.bottom() + this.padding);

        this.notesField.setTop(this.preview.bottom() + thin);
        this.notesField.setLeft(this.preview.left());
        this.notesField.setHeight(
            this.body.bottom() - this.preview.bottom() - thin
        );
    }

    if (this.label) {
        this.label.setCenter(this.center());
        this.label.setTop(this.top() + (th - this.label.height()) / 2);
    }

    if (this.buttons && (this.buttons.children.length > 0)) {
        this.buttons.setCenter(this.center());
        this.buttons.setBottom(this.bottom() - this.padding);
    }

    // refresh shadow
    this.removeShadow();
    this.addShadow();
};

// ProjectRecoveryDialogMorph /////////////////////////////////////////
// I show previous versions for a particular project and
// let users recover them.

ProjectRecoveryDialogMorph.prototype = new DialogBoxMorph();
ProjectRecoveryDialogMorph.prototype.constructor = ProjectRecoveryDialogMorph;
ProjectRecoveryDialogMorph.uber = DialogBoxMorph.prototype;

// ProjectRecoveryDialogMorph instance creation:

function ProjectRecoveryDialogMorph(ide, project, browser) {
    this.init(ide, project, browser);
}

ProjectRecoveryDialogMorph.prototype.init = function (
    ide,
    projectName,
    browser
) {
    // initialize inherited properties:
    ProjectRecoveryDialogMorph.uber.init.call(
        this,
        this, // target
        null, // function
        null  // environment
    );

    this.ide = ide;
    this.browser = browser;
    this.key = 'recoverProject';
    this.projectName = projectName;

    this.versions = null;

    this.handle = null;
    this.listField = null;
    this.preview = null;
    this.notesText = null;
    this.notesField = null;

    this.labelString = 'Recover project';
    this.createLabel();

    this.buildContents();
};

ProjectRecoveryDialogMorph.prototype.buildContents = function () {
    this.addBody(new Morph());
    this.body.color = this.color;

    this.buildListField();

    this.preview = new Morph();
    this.preview.fixLayout = nop;
    this.preview.edge = InputFieldMorph.prototype.edge;
    this.preview.fontSize = InputFieldMorph.prototype.fontSize;
    this.preview.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.preview.contrast = InputFieldMorph.prototype.contrast;
    this.preview.render = function (ctx) {
        InputFieldMorph.prototype.render.call(this, ctx);
        if (this.cachedTexture) {
            this.renderCachedTexture(ctx);
        } else if (this.texture) {
            this.renderTexture(this.texture, ctx);
        }
    };
    this.preview.renderCachedTexture = function (ctx) {
        ctx.drawImage(this.cachedTexture, this.edge, this.edge);
    };
    this.preview.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;
    this.preview.setExtent(
        this.ide.serializer.thumbnailSize.add(this.preview.edge * 2)
    );

    this.body.add(this.preview);

    this.notesField = new ScrollFrameMorph();
    this.notesField.fixLayout = nop;

    this.notesField.edge = InputFieldMorph.prototype.edge;
    this.notesField.fontSize = InputFieldMorph.prototype.fontSize;
    this.notesField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.notesField.contrast = InputFieldMorph.prototype.contrast;
    this.notesField.render = InputFieldMorph.prototype.render;
    this.notesField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    this.notesField.acceptsDrops = false;
    this.notesField.contents.acceptsDrops = false;

    this.notesText = new TextMorph('');

    this.notesField.isTextLineWrapping = true;
    this.notesField.padding = 3;
    this.notesField.setContents(this.notesText);
    this.notesField.setWidth(this.preview.width());

    this.body.add(this.notesField);

    this.addButton('recoverProject', 'Recover', true);
    this.addButton('cancel', 'Cancel');

    this.setExtent(new Point(360, 300));
    this.fixLayout();
};

ProjectRecoveryDialogMorph.prototype.buildListField = function () {
    this.listField = new ListMorph([]);
    this.fixListFieldItemColors();
    this.listField.fixLayout = nop;
    this.listField.edge = InputFieldMorph.prototype.edge;
    this.listField.fontSize = InputFieldMorph.prototype.fontSize;
    this.listField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.listField.contrast = InputFieldMorph.prototype.contrast;
    this.listField.render = InputFieldMorph.prototype.render;
    this.listField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    this.listField.action = (item) => {
        var version;
        if (item === undefined) { return; }
        version = detect(
            this.versions,
            version => version.lastupdated === item
        );
        this.notesText.text = version.notes || '';
        this.notesText.rerender();
        this.notesField.contents.adjustBounds();
        this.preview.texture = version.thumbnail;
        this.preview.cachedTexture = null;
        this.preview.rerender();
    };

    this.ide.cloud.getProjectVersionMetadata(
        this.projectName,
        versions => {
            var today = new Date(),
                yesterday = new Date();
            yesterday.setDate(today.getDate() - 1);
            this.versions = versions;
            this.versions.forEach(version => {
                var date = new Date(
                    new Date().getTime() - version.lastupdated * 1000
                );
                if (date.toDateString() === today.toDateString()) {
                    version.lastupdated = localize('Today, ') +
                        date.toLocaleTimeString();
                } else if (date.toDateString() === yesterday.toDateString()) {
                    version.lastupdated = localize('Yesterday, ') +
                        date.toLocaleTimeString();
                } else {
                    version.lastupdated = date.toLocaleString();
                }
            });
            this.listField.elements = this.versions.map(version =>
                version.lastupdated
            );
            this.clearDetails();
            this.listField.buildListContents();
            this.fixListFieldItemColors();
            this.listField.adjustScrollBars();
            this.listField.scrollY(this.listField.top());
            this.fixLayout();
        },
        this.ide.cloudError()
    );

    this.body.add(this.listField);
};

ProjectRecoveryDialogMorph.prototype.cancel = function () {
    this.browser.show();
    this.browser.listField.select(
        detect(
            this.browser.projectList,
            item => item.projectname === this.projectName
        )
    );
    ProjectRecoveryDialogMorph.uber.cancel.call(this);
};

ProjectRecoveryDialogMorph.prototype.recoverProject = function () {
    var lastupdated = this.listField.selected,
        version = detect(
            this.versions,
            version => version.lastupdated === lastupdated
        );

    this.browser.openCloudProject(
        { projectname: this.projectName },
        version.delta
    );
    this.destroy();
};

ProjectRecoveryDialogMorph.prototype.popUp = function () {
    var world = this.ide.world();
    if (world) {
        ProjectRecoveryDialogMorph.uber.popUp.call(this, world);
        this.handle = new HandleMorph(
            this,
            300,
            300,
            this.corner,
            this.corner
        );
    }
};

ProjectRecoveryDialogMorph.prototype.fixListFieldItemColors =
    ProjectDialogMorph.prototype.fixListFieldItemColors;

ProjectRecoveryDialogMorph.prototype.clearDetails =
    ProjectDialogMorph.prototype.clearDetails;

ProjectRecoveryDialogMorph.prototype.fixLayout = function () {
    var titleHeight = fontHeight(this.titleFontSize) + this.titlePadding * 2,
        thin = this.padding / 2;

    if (this.body) {
        this.body.setPosition(this.position().add(new Point(
            this.padding,
            titleHeight + this.padding
        )));
        this.body.setExtent(new Point(
            this.width() - this.padding * 2,
            this.height()
            - this.padding * 3 // top, bottom and button padding.
            - titleHeight
            - this.buttons.height()
        ));

        this.listField.setWidth(
            this.body.width()
            - this.preview.width()
            - this.padding
        );
        this.listField.contents.children[0].adjustWidths();

        this.listField.setPosition(this.body.position());
        this.listField.setHeight(this.body.height());

        this.preview.setRight(this.body.right());
        this.preview.setTop(this.listField.top());

        this.notesField.setTop(this.preview.bottom() + thin);
        this.notesField.setLeft(this.preview.left());
        this.notesField.setHeight(
            this.body.bottom() - this.preview.bottom() - thin
        );
    }

    if (this.label) {
        this.label.setCenter(this.center());
        this.label.setTop(
            this.top() + (titleHeight - this.label.height()) / 2
        );
    }

    if (this.buttons) {
        this.buttons.fixLayout();
        this.buttons.setCenter(this.center());
        this.buttons.setBottom(this.bottom() - this.padding);
    }

    // refresh shadow
    this.removeShadow();
    this.addShadow();
};

// LibraryImportDialogMorph ///////////////////////////////////////////
// I am preview dialog shown before importing a library.
// I inherit from a DialogMorph but look similar to
// ProjectDialogMorph, and BlockImportDialogMorph

LibraryImportDialogMorph.prototype = new DialogBoxMorph();
LibraryImportDialogMorph.prototype.constructor = LibraryImportDialogMorph;
LibraryImportDialogMorph.uber = DialogBoxMorph.prototype;

// LibraryImportDialogMorph instance creation:

function LibraryImportDialogMorph(ide, librariesData) {
    this.init(ide, librariesData);
}

LibraryImportDialogMorph.prototype.init = function (ide, librariesData) {
    // additional properties
    this.isLoadingLibrary = false;
    this.originalCategories = null;
    this.captureOriginalCategories();

    // initialize inherited properties:
    LibraryImportDialogMorph.uber.init.call(
        this,
        this, // target
        null, // function
        null  // environment
    );

    this.ide = ide;
    this.key = 'importLibrary';
    this.action = 'importLibrary';
    this.librariesData = librariesData; // [{name: , fileName: , description:}]

    // I contain a cached version of the libaries I have displayed,
    // because users may choose to explore a library many times before
    // importing.
    this.libraryCache = new Map(); // fileName: { blocks: [], palette: {} }

    this.handle = null;
    this.listField = null;
    this.palette = null;
    this.notesText = null;
    this.notesField = null;

    this.labelString = 'Import library';
    this.createLabel();

    this.buildContents();
};

LibraryImportDialogMorph.prototype.captureOriginalCategories = function () {
    this.originalCategories = new Map();
    SpriteMorph.prototype.customCategories.forEach((color, name) =>
        this.originalCategories.set(name, color)
    );
};

LibraryImportDialogMorph.prototype.buildContents = function () {
    this.addBody(new Morph());
    this.body.color = this.color;

    this.initializePalette();
    this.initializeLibraryDescription();
    this.installLibrariesList();

    this.addButton('ok', 'Import');
    this.addButton('cancel', 'Cancel');

    this.setExtent(new Point(460, 455));
    this.fixLayout();
};

LibraryImportDialogMorph.prototype.initializePalette = function () {
    // I will display a scrolling list of blocks.
    if (this.palette) { this.palette.destroy(); }

    this.palette = new ScrollFrameMorph(
        null,
        null,
        SpriteMorph.prototype.sliderColor
    );
    this.palette.color = SpriteMorph.prototype.paletteColor;
    this.palette.padding = 4;
    this.palette.isDraggable = false;
    this.palette.acceptsDrops = false;
    this.palette.contents.acceptsDrops = false;

    this.body.add(this.palette);
};

LibraryImportDialogMorph.prototype.initializeLibraryDescription = function () {
    if (this.notesField) { this.notesField.destroy(); }

    this.notesField = new ScrollFrameMorph();
    this.notesField.fixLayout = nop;

    this.notesField.edge = InputFieldMorph.prototype.edge;
    this.notesField.fontSize = InputFieldMorph.prototype.fontSize;
    this.notesField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.notesField.contrast = InputFieldMorph.prototype.contrast;
    this.notesField.render = InputFieldMorph.prototype.render;
    this.notesField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    this.notesField.acceptsDrops = false;
    this.notesField.contents.acceptsDrops = false;

    this.notesText = new TextMorph('');

    this.notesField.isTextLineWrapping = true;
    this.notesField.padding = 3;
    this.notesField.setContents(this.notesText);
    this.notesField.setHeight(100);

    this.body.add(this.notesField);
};

LibraryImportDialogMorph.prototype.installLibrariesList = function () {
    if (this.listField) { this.listField.destroy(); }

    this.listField = new ListMorph(
        this.librariesData,
        element => element.name,
        null,
        () => this.importLibrary(),
        '~', // separator
        false // verbatim
    );

    this.fixListFieldItemColors();

    this.listField.fixLayout = nop;
    this.listField.edge = InputFieldMorph.prototype.edge;
    this.listField.fontSize = InputFieldMorph.prototype.fontSize;
    this.listField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.listField.contrast = InputFieldMorph.prototype.contrast;
    this.listField.render = InputFieldMorph.prototype.render;
    this.listField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    this.listField.action = ({ name, fileName, description }) => {
        if (isNil(name)) { return; }

        this.notesText.text = localize(description) || '';
        this.notesText.rerender();
        this.notesField.contents.adjustBounds();

        if (this.hasCached(fileName)) {
            this.displayBlocks(fileName);
        } else {
            this.showMessage(`${localize('Loading')}\n${localize(name)}`);
            this.ide.getURL(
                this.ide.resourceURL('libraries', fileName),
                libraryXML => {
                    let serializer = this.ide.serializer,
                        palette = serializer.parse(libraryXML).childNamed('palette');
                    this.cacheLibrary(
                        fileName,
                        serializer.loadBlocks(libraryXML),
                        palette ? serializer.loadPalette(palette) : {}
                    );
                    this.displayBlocks(fileName);
                }
            );
        }
    };

    this.listField.setWidth(200);
    this.body.add(this.listField);

    this.fixLayout();
};

LibraryImportDialogMorph.prototype.popUp = function () {
    var world = this.ide.world();
    if (world) {
        LibraryImportDialogMorph.uber.popUp.call(this, world);
        this.handle = new HandleMorph(
            this,
            300,
            300,
            this.corner,
            this.corner
        );
    }
};

LibraryImportDialogMorph.prototype.destroy = function () {
    LibraryImportDialogMorph.uber.destroy.call(this);
    if (!this.isLoadingLibrary) {
        SpriteMorph.prototype.customCategories = this.originalCategories;
    }
};

LibraryImportDialogMorph.prototype.fixListFieldItemColors =
    ProjectDialogMorph.prototype.fixListFieldItemColors;

LibraryImportDialogMorph.prototype.clearDetails =
    ProjectDialogMorph.prototype.clearDetails;

LibraryImportDialogMorph.prototype.fixLayout = function () {
    var titleHeight = fontHeight(this.titleFontSize) + this.titlePadding * 2,
        thin = this.padding / 2;

    if (this.body) {
        this.body.setPosition(this.position().add(new Point(
            this.padding,
            titleHeight + this.padding
        )));
        this.body.setExtent(new Point(
            this.width() - this.padding * 2,
            this.height()
            - this.padding * 3 // top, bottom and button padding.
            - titleHeight
            - this.buttons.height()
        ));

        this.listField.setExtent(new Point(
            200,
            this.body.height()
        ));
        this.notesField.setExtent(new Point(
            this.body.width() - this.listField.width() - thin,
            100
        ));
        this.palette.setExtent(new Point(
            this.notesField.width(),
            this.body.height() - this.notesField.height() - thin
        ));
        this.listField.contents.children[0].adjustWidths();

        this.listField.setPosition(this.body.position());
        this.palette.setPosition(this.listField.topRight().add(
            new Point(thin, 0)
        ));
        this.notesField.setPosition(this.palette.bottomLeft().add(
            new Point(0, thin)
        ));
    }

    if (this.label) {
        this.label.setCenter(this.center());
        this.label.setTop(
            this.top() + (titleHeight - this.label.height()) / 2
        );
    }

    if (this.buttons) {
        this.buttons.fixLayout();
        this.buttons.setCenter(this.center());
        this.buttons.setBottom(this.bottom() - this.padding);
    }

    // refresh shadow
    this.removeShadow();
    this.addShadow();
};

// Library Cache Utilities.
LibraryImportDialogMorph.prototype.hasCached = function (key) {
    return this.libraryCache.hasOwnProperty(key);
};

LibraryImportDialogMorph.prototype.cacheLibrary = function (key, blocks, palette) {
    this.libraryCache.set(key, { blocks, palette });
};

LibraryImportDialogMorph.prototype.cachedLibrary = function (key) {
    return this.libraryCache.get(key).blocks;
};

LibraryImportDialogMorph.prototype.cachedPalette = function (key) {
    return this.libraryCache.get(key).palette;
};

LibraryImportDialogMorph.prototype.importLibrary = function () {
    if (!this.listField.selected) { return; }

    var ide = this.ide,
        selectedLibrary = this.listField.selected.fileName,
        libraryName = this.listField.selected.name;

    // restore captured user-blocks categories
    SpriteMorph.prototype.customCategories = this.originalCategories;

    if (this.hasCached(selectedLibrary)) {
        this.cachedLibrary(selectedLibrary).forEach(def => {
            def.receiver = ide.stage;
            ide.stage.globalBlocks.push(def);
            ide.stage.replaceDoubleDefinitionsFor(def);
        });
        this.cachedPalette(selectedLibrary).forEach((value, key) =>
            SpriteMorph.prototype.customCategories.set(key, value)
        );
        ide.showMessage(localize('Imported') + ' ' + localize(libraryName), 2);
    } else {
        ide.showMessage(localize('Loading') + ' ' + localize(libraryName));
        ide.getURL(
            ide.resourceURL('libraries', selectedLibrary),
            libraryText => {
                ide.droppedText(libraryText, libraryName);
                this.isLoadingLibrary = true;
            }
        );
    }
};

LibraryImportDialogMorph.prototype.displayBlocks = function (libraryKey) {
    var x, y, blockImage, blockContainer, text,
        padding = 4,
        libraryBlocks = this.cachedLibrary(libraryKey),
        blocksByCategory = new Map(
            SpriteMorph.prototype.allCategories().map(cat => [cat, []])
        );

    // populate palette, grouped by categories.
    this.initializePalette();
    x = this.palette.left() + padding;
    y = this.palette.top();

    libraryBlocks.global.concat(libraryBlocks.local).forEach(definition => {
        if (!definition.isHelper) {
            blocksByCategory.get(definition.category).push(definition);
        }
    });

    blocksByCategory.forEach((blocks, category) => {
        if (blocks.length > 0) {
            text = SpriteMorph.prototype.categoryText(category);
            text.setPosition(new Point(x, y));
            this.palette.addContents(text);
            y += text.fullBounds().height() + padding;
        }

        blocks.forEach(definition => {
            blockImage = definition.templateInstance().fullImage();
            blockContainer = new Morph();
            blockContainer.isCachingImage = true;
            blockContainer.bounds.setWidth(blockImage.width);
            blockContainer.bounds.setHeight(blockImage.height);
            blockContainer.cachedImage = blockImage;
            blockContainer.setPosition(new Point(x, y));
            this.palette.addContents(blockContainer);

            y += blockContainer.fullBounds().height() + padding;
        });
    });

    this.palette.scrollX(padding);
    this.palette.scrollY(padding);
    this.fixLayout();
};

LibraryImportDialogMorph.prototype.showMessage = function (msgText) {
    var msg = new MenuMorph(null, msgText);
    this.initializePalette();
    this.fixLayout();
    msg.popUpCenteredInWorld(this.palette.contents);
};

// SpriteIconMorph ////////////////////////////////////////////////////

/*
    I am a selectable element in the Sprite corral, keeping a self-updating
    thumbnail of the sprite I'm respresenting, and a self-updating label
    of the sprite's name (in case it is changed elsewhere)
*/

// SpriteIconMorph inherits from ToggleButtonMorph (Widgets)

SpriteIconMorph.prototype = new ToggleButtonMorph();
SpriteIconMorph.prototype.constructor = SpriteIconMorph;
SpriteIconMorph.uber = ToggleButtonMorph.prototype;

// SpriteIconMorph settings

SpriteIconMorph.prototype.thumbSize = new Point(40, 40);
SpriteIconMorph.prototype.labelShadowOffset = null;
SpriteIconMorph.prototype.labelShadowColor = null;
SpriteIconMorph.prototype.labelColor = FOREGROUND;
SpriteIconMorph.prototype.fontSize = 9;

// SpriteIconMorph instance creation:

function SpriteIconMorph(aSprite) {
    this.init(aSprite);
}

SpriteIconMorph.prototype.init = function (aSprite) {
    var colors, action, query, hover;

    colors = [
        IDE_Morph.prototype.groupColor,
        IDE_Morph.prototype.frameColor,
        IDE_Morph.prototype.frameColor
    ];

    action = () => {
        // make my sprite the current one
        var ide = this.parentThatIsA(IDE_Morph);

        if (ide) {
            ide.selectSprite(this.object);
        }
    };

    query = () => {
        // answer true if my sprite is the current one
        var ide = this.parentThatIsA(IDE_Morph);

        if (ide) {
            return ide.currentSprite === this.object;
        }
        return false;
    };

    hover = () => {
        if (!aSprite.exemplar) { return null; }
        return (localize('parent') + ':\n' + aSprite.exemplar.name);
    };

    // additional properties:
    this.object = aSprite || new SpriteMorph(); // mandatory, actually
    this.version = this.object.version;
    this.thumbnail = null;
    this.rotationButton = null; // synchronous rotation of nested sprites

    // additional properties for highlighting
    this.isFlashing = false;
    this.previousColor = null;
    this.previousOutline = null;
    this.previousState = null;

    // initialize inherited properties:
    SpriteIconMorph.uber.init.call(
        this,
        colors, // color overrides, <array>: [normal, highlight, pressed]
        null, // target - not needed here
        action, // a toggle function
        this.object.name, // label string
        query, // predicate/selector
        null, // environment
        hover // hint
    );

    // override defaults and build additional components
    this.isDraggable = true;
    this.createThumbnail();
    this.padding = 2;
    this.corner = 8;
    this.fixLayout();
    this.fps = 1;
};

SpriteIconMorph.prototype.createThumbnail = function () {
    if (this.thumbnail) {
        this.thumbnail.destroy();
    }

    this.thumbnail = new Morph();
    this.thumbnail.isCachingImage = true;
    this.thumbnail.bounds.setExtent(this.thumbSize);
    if (this.object instanceof SpriteMorph) { // support nested sprites
        this.thumbnail.cachedImage = this.object.fullThumbnail(
            this.thumbSize,
            this.thumbnail.cachedImage
        );
        this.add(this.thumbnail);
        this.createRotationButton();
    } else {
        this.thumbnail.cachedImage = this.object.thumbnail(
            this.thumbSize,
            this.thumbnail.cachedImage
        );
        this.add(this.thumbnail);
    }
};

SpriteIconMorph.prototype.createLabel = function () {
    var txt;

    if (this.label) {
        this.label.destroy();
    }
    txt = new StringMorph(
        this.object.name,
        this.fontSize,
        this.fontStyle,
        true,
        false,
        false,
        this.labelShadowOffset,
        this.labelShadowColor,
        this.labelColor
    );

    this.label = new FrameMorph();
    this.label.acceptsDrops = false;
    this.label.alpha = 0;
    this.label.setExtent(txt.extent());
    txt.setPosition(this.label.position());
    this.label.add(txt);
    this.add(this.label);
};

SpriteIconMorph.prototype.createRotationButton = function () {
    var button;

    if (this.rotationButton) {
        this.rotationButton.destroy();
        this.roationButton = null;
    }
    if (!this.object.anchor) {
        return;
    }

    button = new ToggleButtonMorph(
        null, // colors,
        null, // target
        () => this.object.rotatesWithAnchor = !this.object.rotatesWithAnchor,
        [
            '\u2192',
            '\u21BB'
        ],
        () => this.object.rotatesWithAnchor // query
    );

    button.corner = 8;
    button.labelMinExtent = new Point(11, 11);
    button.padding = 0;
    button.pressColor = button.color;
    // button.hint = 'rotate synchronously\nwith anchor';
    button.fixLayout();
    button.refresh();
    this.rotationButton = button;
    this.add(this.rotationButton);
};

// SpriteIconMorph stepping

SpriteIconMorph.prototype.step = function () {
    if (this.version !== this.object.version) {
        this.createThumbnail();
        this.createLabel();
        this.fixLayout();
        this.version = this.object.version;
        this.refresh();
    }
};

// SpriteIconMorph layout

SpriteIconMorph.prototype.fixLayout = function () {
    if (!this.thumbnail || !this.label) { return null; }

    this.bounds.setWidth(
        this.thumbnail.width()
        + this.outline * 2
        + this.edge * 2
        + this.padding * 2
    );

    this.bounds.setHeight(
        this.thumbnail.height()
        + this.outline * 2
        + this.edge * 2
        + this.padding * 3
        + this.label.height()
    );

    this.thumbnail.setCenter(this.center());
    this.thumbnail.setTop(
        this.top() + this.outline + this.edge + this.padding
    );

    if (this.rotationButton) {
        this.rotationButton.setTop(this.top());
        this.rotationButton.setRight(this.right());
    }

    this.label.setWidth(
        Math.min(
            this.label.children[0].width(), // the actual text
            this.thumbnail.width()
        )
    );
    this.label.setCenter(this.center());
    this.label.setTop(
        this.thumbnail.bottom() + this.padding
    );
};

// SpriteIconMorph menu

SpriteIconMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this);

    if (this.object instanceof StageMorph) {
        menu.addItem(
            'pic...',
            () => {
                var ide = this.parentThatIsA(IDE_Morph);
                ide.saveCanvasAs(
                    this.object.fullImage(),
                    this.object.name
                );
            },
            'save a picture\nof the stage'
        );
        if (this.object.trailsLog.length) {
            menu.addItem(
                'svg...',
                () => this.object.exportTrailsLogAsSVG(),
                'export pen trails\nline segments as SVG'
            );
        }
        return menu;
    }
    if (!(this.object instanceof SpriteMorph)) { return null; }
    menu.addItem("show", 'showSpriteOnStage');
    menu.addLine();
    menu.addItem("duplicate", 'duplicateSprite');
    if (StageMorph.prototype.enableInheritance) {
        menu.addItem("clone", 'instantiateSprite');
    }
    menu.addItem("delete", 'removeSprite');
    menu.addLine();
    if (this.object.solution) {
        menu.addItem(
            'extract solution',
            () => {
                this.parentThatIsA(IDE_Morph).undelete(
                    this.object.solution.fullCopy(),
                    this.center()
                );
            }
        );
        menu.addItem(
            'delete solution',
            () => {
                this.parentThatIsA(IDE_Morph).removeSprite(
                    this.object.solution
                );
                this.object.solution = null;
                this.object.recordUserEdit(
                    'sprite',
                    'solution',
                    'delete'
                );
            }
        );
        menu.addLine();
    }
    if (StageMorph.prototype.enableInheritance) {
        /* version that hides refactoring capability unless shift-clicked
        if (this.world().currentKey === 16) { // shift-clicked
            menu.addItem(
                "parent...",
                'chooseExemplar',
                null,
                new Color(100, 0, 0)
            );
        }
        */
        menu.addItem("parent...", 'chooseExemplar');
        if (this.object.exemplar) {
            menu.addItem(
                "release",
                'releaseSprite',
                'make temporary and\nhide in the sprite corral'
            );
        }
    }
    if (this.object.anchor) {
        menu.addItem(
            localize('detach from') + ' ' + this.object.anchor.name,
            () => this.object.detachFromAnchor()
        );
    }
    if (this.object.parts.length) {
        menu.addItem(
            'detach all parts',
            () => this.object.detachAllParts()
        );
    }
    menu.addItem("export...", 'exportSprite');
    return menu;
};

SpriteIconMorph.prototype.duplicateSprite = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    if (ide) {
        ide.duplicateSprite(this.object);
    }
};

SpriteIconMorph.prototype.instantiateSprite = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    if (ide) {
        ide.instantiateSprite(this.object);
    }
};

SpriteIconMorph.prototype.removeSprite = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    if (ide) {
        ide.removeSprite(this.object);
    }
};

SpriteIconMorph.prototype.exportSprite = function () {
    this.object.exportSprite();
};

SpriteIconMorph.prototype.chooseExemplar = function () {
    this.object.chooseExemplar();
};

SpriteIconMorph.prototype.releaseSprite = function () {
    this.object.release();
    this.object.recordUserEdit(
        'sprite',
        'release',
        this.object.name
    );
};

SpriteIconMorph.prototype.showSpriteOnStage = function () {
    this.object.showOnStage();
};

// SpriteIconMorph events

SpriteIconMorph.prototype.mouseDoubleClick = function () {
    if (this.object instanceof SpriteMorph) {
        this.object.flash();
    }
};

// SpriteIconMorph drawing

SpriteIconMorph.prototype.render = function (ctx) {
    // only draw the edges if I am selected
    switch (this.userState) {
        case 'highlight':
            this.drawBackground(ctx, this.highlightColor);
            break;
        case 'pressed':
            this.drawOutline(ctx);
            this.drawBackground(ctx, this.pressColor);
            this.drawEdges(
                ctx,
                this.pressColor,
                this.pressColor.lighter(40),
                this.pressColor.darker(40)
            );
            break;
        default:
            this.drawBackground(ctx, this.getRenderColor());
    }
};

SpriteIconMorph.prototype.getRenderColor =
    ScriptsMorph.prototype.getRenderColor;

// SpriteIconMorph drag & drop

SpriteIconMorph.prototype.prepareToBeGrabbed = function () {
    var ide = this.parentThatIsA(IDE_Morph),
        idx;
    this.mouseClickLeft(); // select me
    this.alpha = 0.85;
    if (ide) {
        idx = ide.sprites.asArray().indexOf(this.object);
        ide.sprites.remove(idx + 1);
        ide.createCorral(true); // keep scenes
        ide.fixLayout();
    }
};

SpriteIconMorph.prototype.justDropped = function () {
    this.alpha = 1;
};

SpriteIconMorph.prototype.wantsDropOf = function (morph) {
    // allow scripts & media to be copied from one sprite to another
    // by drag & drop
    return morph instanceof BlockMorph
        || (morph instanceof CommentMorph)
        || (morph instanceof CostumeIconMorph)
        || (morph instanceof SoundIconMorph);
};

SpriteIconMorph.prototype.reactToDropOf = function (morph, hand) {
    if (morph instanceof BlockMorph || morph instanceof CommentMorph) {
        this.copyStack(morph);
    } else if (morph instanceof CostumeIconMorph) {
        this.copyCostume(morph.object);
    } else if (morph instanceof SoundIconMorph) {
        this.copySound(morph.object);
    }
    this.world().add(morph);
    morph.slideBackTo(hand.grabOrigin);
};

SpriteIconMorph.prototype.copyStack = function (block) {
    var sprite = this.object,
        dup = block.fullCopy(),
        y = Math.max(
            sprite.scripts.children.map(stack =>
                stack.fullBounds().bottom()
            ).concat([sprite.scripts.top()])
        );

    dup.setPosition(new Point(sprite.scripts.left() + 20, y + 20));
    sprite.scripts.add(dup);
    if (dup instanceof BlockMorph) {
        dup.allComments().forEach(comment => comment.align(dup));
    }
    sprite.scripts.adjustBounds();

    // delete all local custom blocks (methods) that the receiver
    // doesn't understand
    dup.allChildren().forEach(morph => {
        if (morph.isCustomBlock &&
            !morph.isGlobal &&
            !sprite.getMethod(morph.blockSpec)
        ) {
            morph.deleteBlock();
        }
    });
};

SpriteIconMorph.prototype.copyCostume = function (costume) {
    var dup = costume.copy();
    dup.name = this.object.newCostumeName(dup.name);
    this.object.addCostume(dup);
    this.object.wearCostume(dup);
};

SpriteIconMorph.prototype.copySound = function (sound) {
    var dup = sound.copy();
    this.object.addSound(dup.audio, dup.name);
};

// SpriteIconMorph flashing

SpriteIconMorph.prototype.flash = function () {
    var world = this.world();

    if (this.isFlashing) { return; }
    this.flashOn();

    world.animations.push(new Animation(
        nop,
        nop,
        0,
        800,
        nop,
        () => this.flashOff()
    ));
};

SpriteIconMorph.prototype.flashOn = function () {
    var isFlat = MorphicPreferences.isFlat,
        highlight = SpriteMorph.prototype.highlightColor;

    if (this.isFlashing) { return; }

    this.previousColor = isFlat ? this.pressColor : this.outlineColor;
    this.previousOutline = this.outline;
    this.previousState = this.userState;

    if (isFlat) {
        this.pressColor = highlight;
    } else {
        this.outlineColor = highlight;
        this.outline = 2;
    }
    this.userState = 'pressed';
    this.rerender();
    this.isFlashing = true;
};

SpriteIconMorph.prototype.flashOff = function () {
    if (!this.isFlashing) { return; }

    if (MorphicPreferences.isFlat) {
        this.pressColor = this.previousColor;
    } else {
        this.outlineColor = this.previousColor;
        this.outline = this.previousOutline;
    }
    this.userState = this.previousState;
    this.rerender();
    this.isFlashing = false;
};

// CostumeIconMorph ////////////////////////////////////////////////////

/*
    I am a selectable element in the SpriteEditor's "Costumes" tab, keeping
    a self-updating thumbnail of the costume I'm respresenting, and a
    self-updating label of the costume's name (in case it is changed
    elsewhere)
*/

// CostumeIconMorph inherits from ToggleButtonMorph (Widgets)
// ... and copies methods from SpriteIconMorph

CostumeIconMorph.prototype = new ToggleButtonMorph();
CostumeIconMorph.prototype.constructor = CostumeIconMorph;
CostumeIconMorph.uber = ToggleButtonMorph.prototype;

// CostumeIconMorph settings

CostumeIconMorph.prototype.thumbSize = new Point(80, 60);
CostumeIconMorph.prototype.labelShadowOffset = null;
CostumeIconMorph.prototype.labelShadowColor = null;
CostumeIconMorph.prototype.labelColor = FOREGROUND;
CostumeIconMorph.prototype.fontSize = 9;

// CostumeIconMorph instance creation:

function CostumeIconMorph(aCostume) {
    this.init(aCostume);
}

CostumeIconMorph.prototype.init = function (aCostume) {
    var colors, action, query;

    colors = [
        IDE_Morph.prototype.groupColor,
        IDE_Morph.prototype.frameColor,
        IDE_Morph.prototype.frameColor
    ];

    action = () => {
        // make my costume the current one
        var ide = this.parentThatIsA(IDE_Morph),
            wardrobe = this.parentThatIsA(WardrobeMorph);

        if (ide) {
            ide.currentSprite.wearCostume(this.object);
        }
        if (wardrobe) {
            wardrobe.updateSelection();
        }
    };

    query = () => {
        // answer true if my costume is the current one
        var ide = this.parentThatIsA(IDE_Morph);

        if (ide) {
            return ide.currentSprite.costume === this.object;
        }
        return false;
    };

    // additional properties:
    this.object = aCostume || new Costume(); // mandatory, actually
    this.version = this.object.version;
    this.thumbnail = null;

    // initialize inherited properties:
    CostumeIconMorph.uber.init.call(
        this,
        colors, // color overrides, <array>: [normal, highlight, pressed]
        null, // target - not needed here
        action, // a toggle function
        this.object.name, // label string
        query, // predicate/selector
        null, // environment
        null // hint
    );

    // override defaults and build additional components
    this.isDraggable = true;
    this.createThumbnail();
    this.padding = 2;
    this.corner = 8;
    this.fixLayout();
    this.fps = 1;
};

CostumeIconMorph.prototype.createThumbnail = function () {
    var watermark, txt;
    SpriteIconMorph.prototype.createThumbnail.call(this);
    watermark = this.object instanceof SVG_Costume ? 'svg'
        : (this.object.embeddedData ? (
            this.typeOfStringData(this.object.embeddedData) === 'data' ?
                'dta' : '</>'
        )
            : null);
    if (watermark) {
        txt = new StringMorph(
            watermark,
            this.fontSize * 0.8,
            this.fontStyle,
            false,
            false,
            false,
            this.labelShadowOffset,
            this.labelShadowColor,
            this.labelColor
        );
        txt.setBottom(this.thumbnail.bottom());
        this.thumbnail.add(txt);
    }
};

CostumeIconMorph.prototype.createLabel
    = SpriteIconMorph.prototype.createLabel;

// CostumeIconMorph stepping

CostumeIconMorph.prototype.step
    = SpriteIconMorph.prototype.step;

// CostumeIconMorph layout

CostumeIconMorph.prototype.fixLayout
    = SpriteIconMorph.prototype.fixLayout;

// CostumeIconMorph menu

CostumeIconMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this);
    if (!(this.object instanceof Costume)) { return null; }
    menu.addItem("edit", "editCostume");
    if (this.world().currentKey === 16) { // shift clicked
        menu.addItem(
            'edit rotation point only...',
            'editRotationPointOnly',
            null,
            new Color(100, 0, 0)
        );
    }
    menu.addItem("rename", "renameCostume");
    menu.addLine();
    menu.addItem("duplicate", "duplicateCostume");
    menu.addItem("delete", "removeCostume");
    menu.addLine();
    if (this.object.embeddedData) {
        menu.addItem(
            "get" + ' ' + this.typeOfStringData(this.object.embeddedData),
            "importEmbeddedData"
        );
    }
    menu.addItem("export", "exportCostume");
    return menu;
};

CostumeIconMorph.prototype.editCostume = function () {
    this.disinherit();

    if (this.object instanceof SVG_Costume && this.object.shapes.length === 0) {
        try {
            this.object.parseShapes();
        } catch (e) {
            this.editRotationPointOnly();
            return;
        }
    }

    this.object.edit(
        this.world(),
        this.parentThatIsA(IDE_Morph),
        false // not a new costume, retain existing rotation center
    );
};

CostumeIconMorph.prototype.editRotationPointOnly = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    this.object.editRotationPointOnly(this.world(), ide);
    ide.hasChangedMedia = true;
    ide.currentSprite.recordUserEdit(
        'costume',
        'rotation point',
        this.object.name
    );
};

CostumeIconMorph.prototype.renameCostume = function () {
    this.disinherit();
    var costume = this.object,
        wardrobe = this.parentThatIsA(WardrobeMorph),
        ide = this.parentThatIsA(IDE_Morph);
    new DialogBoxMorph(
        null,
        answer => {
            var old = costume.name;
            if (answer && (answer !== costume.name)) {
                costume.name = wardrobe.sprite.newCostumeName(
                    answer,
                    costume
                );
                costume.version = Date.now();
                ide.hasChangedMedia = true;
                wardrobe.sprite.recordUserEdit(
                    'costume',
                    'rename',
                    old,
                    costume.name
                );
            }
        }
    ).prompt(
        wardrobe.sprite instanceof SpriteMorph ?
            'rename costume' : 'rename background',
        costume.name,
        this.world()
    );
};

CostumeIconMorph.prototype.duplicateCostume = function () {
    var wardrobe = this.parentThatIsA(WardrobeMorph),
        ide = this.parentThatIsA(IDE_Morph),
        newcos = this.object.copy();
    newcos.name = wardrobe.sprite.newCostumeName(newcos.name);
    wardrobe.sprite.addCostume(newcos);
    wardrobe.updateList();
    if (ide) {
        ide.currentSprite.wearCostume(newcos);
    }
};

CostumeIconMorph.prototype.removeCostume = function () {
    var wardrobe = this.parentThatIsA(WardrobeMorph),
        idx = this.parent.children.indexOf(this),
        off = CamSnapshotDialogMorph.prototype.enableCamera ? 3 : 2;
    wardrobe.removeCostumeAt(idx - off); // ignore paintbrush and camera buttons
    if (wardrobe.sprite.costume === this.object) {
        wardrobe.sprite.wearCostume(null);
    }
    wardrobe.sprite.recordUserEdit(
        'costume',
        'delete',
        idx - off,
        this.object.name
    );
};

CostumeIconMorph.prototype.importEmbeddedData = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    ide.spriteBar.tabBar.tabTo('scripts');
    ide.droppedText(this.object.embeddedData, this.object.name, '');
};

CostumeIconMorph.prototype.typeOfStringData = function (aString) {
    // check for Snap specific files, projects, libraries, sprites, scripts
    if (aString[0] === '<') {
        if ([
            'project',
            'snapdata',
            'blocks',
            'sprites',
            'block',
            'script'
        ].some(tag => aString.slice(1).startsWith(tag))
        ) {
            return 'blocks';
        }
    }
    return 'data';
};

CostumeIconMorph.prototype.exportCostume = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    if (this.object instanceof SVG_Costume) {
        // don't show SVG costumes in a new tab (shows text)
        ide.saveFileAs(this.object.contents.src, 'text/svg', this.object.name);
    } else if (this.object.embeddedData) {
        // embed payload data (e.g blocks)  inside the PNG image data
        ide.saveFileAs(this.object.pngData(), 'image/png', this.object.name);
    } else { // rasterized Costume
        ide.saveCanvasAs(this.object.contents, this.object.name);
    }
};

// CostumeIconMorph drawing

CostumeIconMorph.prototype.render
    = SpriteIconMorph.prototype.render;

// CostumeIconMorph inheritance

CostumeIconMorph.prototype.disinherit = function () {
    var wardrobe = this.parentThatIsA(WardrobeMorph),
        idx = this.parent.children.indexOf(this);
    if (wardrobe.sprite.inheritsAttribute('costumes')) {
        wardrobe.sprite.shadowAttribute('costumes');
        this.object = wardrobe.sprite.costumes.at(idx - 3);
    }
};

// CostumeIconMorph drag & drop

CostumeIconMorph.prototype.prepareToBeGrabbed = function () {
    this.disinherit();
    this.mouseClickLeft(); // select me
    this.removeCostume();
};

// TurtleIconMorph ////////////////////////////////////////////////////

/*
    I am a selectable element in the SpriteEditor's "Costumes" tab, keeping
    a thumbnail of the sprite's or stage's default "Turtle" costume.
*/

// TurtleIconMorph inherits from ToggleButtonMorph (Widgets)
// ... and copies methods from SpriteIconMorph

TurtleIconMorph.prototype = new ToggleButtonMorph();
TurtleIconMorph.prototype.constructor = TurtleIconMorph;
TurtleIconMorph.uber = ToggleButtonMorph.prototype;

// TurtleIconMorph settings

TurtleIconMorph.prototype.thumbSize = new Point(80, 60);
TurtleIconMorph.prototype.labelShadowOffset = null;
TurtleIconMorph.prototype.labelShadowColor = null;
TurtleIconMorph.prototype.labelColor = FOREGROUND;
TurtleIconMorph.prototype.fontSize = 9;

// TurtleIconMorph instance creation:

function TurtleIconMorph(aSpriteOrStage) {
    this.init(aSpriteOrStage);
}

TurtleIconMorph.prototype.init = function (aSpriteOrStage) {
    var colors, action, query;

    colors = [
        IDE_Morph.prototype.groupColor,
        IDE_Morph.prototype.frameColor,
        IDE_Morph.prototype.frameColor
    ];

    action = () => {
        // make my costume the current one
        var ide = this.parentThatIsA(IDE_Morph),
            wardrobe = this.parentThatIsA(WardrobeMorph);

        if (ide) {
            ide.currentSprite.wearCostume(null);
        }
        if (wardrobe) {
            wardrobe.updateSelection();
        }
    };

    query = () => {
        // answer true if my costume is the current one
        var ide = this.parentThatIsA(IDE_Morph);

        if (ide) {
            return ide.currentSprite.costume === null;
        }
        return false;
    };

    // additional properties:
    this.object = aSpriteOrStage; // mandatory, actually
    this.version = this.object.version;
    this.thumbnail = null;

    // initialize inherited properties:
    TurtleIconMorph.uber.init.call(
        this,
        colors, // color overrides, <array>: [normal, highlight, pressed]
        null, // target - not needed here
        action, // a toggle function
        'default', // label string
        query, // predicate/selector
        null, // environment
        null // hint
    );

    // override defaults and build additional components
    this.isDraggable = false;
    this.createThumbnail();
    this.padding = 2;
    this.corner = 8;
    this.fixLayout();
};

TurtleIconMorph.prototype.createThumbnail = function () {
    var isFlat = MorphicPreferences.isFlat;

    if (this.thumbnail) {
        this.thumbnail.destroy();
    }
    if (this.object instanceof SpriteMorph) {
        this.thumbnail = new SymbolMorph(
            'turtle',
            this.thumbSize.y,
            this.labelColor,
            isFlat ? null : new Point(-1, -1),
            new Color(0, 0, 0)
        );
    } else {
        this.thumbnail = new SymbolMorph(
            'stage',
            this.thumbSize.y,
            this.labelColor,
            isFlat ? null : new Point(-1, -1),
            new Color(0, 0, 0)
        );
    }
    this.add(this.thumbnail);
};

TurtleIconMorph.prototype.createLabel = function () {
    var txt;

    if (this.label) {
        this.label.destroy();
    }
    txt = new StringMorph(
        localize(
            this.object instanceof SpriteMorph ? 'Turtle' : 'Empty'
        ),
        this.fontSize,
        this.fontStyle,
        true,
        false,
        false,
        this.labelShadowOffset,
        this.labelShadowColor,
        this.labelColor
    );

    this.label = new FrameMorph();
    this.label.acceptsDrops = false;
    this.label.alpha = 0;
    this.label.setExtent(txt.extent());
    txt.setPosition(this.label.position());
    this.label.add(txt);
    this.add(this.label);
};

// TurtleIconMorph layout

TurtleIconMorph.prototype.fixLayout
    = SpriteIconMorph.prototype.fixLayout;

// TurtleIconMorph drawing

TurtleIconMorph.prototype.render
    = SpriteIconMorph.prototype.render;

// TurtleIconMorph user menu

TurtleIconMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this, 'pen'),
        on = '\u25CF',
        off = '\u25CB';
    if (this.object instanceof StageMorph) {
        return null;
    }
    menu.addItem(
        (this.object.penPoint === 'tip' ? on : off) + ' ' + localize('tip'),
        () => {
            this.object.penPoint = 'tip';
            this.object.changed();
            this.object.fixLayout();
            this.object.rerender();
        }
    );
    menu.addItem(
        (this.object.penPoint === 'middle' ? on : off) + ' ' + localize(
            'middle'
        ),
        () => {
            this.object.penPoint = 'middle';
            this.object.changed();
            this.object.fixLayout();
            this.object.rerender();
        }
    );
    return menu;
};

// WardrobeMorph ///////////////////////////////////////////////////////

// I am a watcher on a sprite's costume list

// WardrobeMorph inherits from ScrollFrameMorph

WardrobeMorph.prototype = new ScrollFrameMorph();
WardrobeMorph.prototype.constructor = WardrobeMorph;
WardrobeMorph.uber = ScrollFrameMorph.prototype;

// WardrobeMorph settings

// ... to follow ...

// WardrobeMorph instance creation:

function WardrobeMorph(aSprite, sliderColor) {
    this.init(aSprite, sliderColor);
}

WardrobeMorph.prototype.init = function (aSprite, sliderColor) {
    // additional properties
    this.sprite = aSprite || new SpriteMorph();
    this.costumesVersion = null;
    this.spriteVersion = null;

    // initialize inherited properties
    WardrobeMorph.uber.init.call(this, null, null, sliderColor);

    // configure inherited properties
    // this.fps = 2; // commented out to make scrollbars more responsive
    this.updateList();
};

// Wardrobe updating

WardrobeMorph.prototype.updateList = function () {
    var x = this.left() + 5,
        y = this.top() + 5,
        padding = 4,
        toolsPadding = 5,
        oldPos = this.contents.position(),
        icon,
        txt,
        paintbutton,
        cambutton;

    this.changed();

    this.contents.destroy();
    this.contents = new FrameMorph(this);
    this.contents.acceptsDrops = false;
    this.contents.reactToDropOf = (icon) => {
        this.reactToDropOf(icon);
    };
    this.addBack(this.contents);

    icon = new TurtleIconMorph(this.sprite);
    icon.setPosition(new Point(x, y));
    this.addContents(icon);
    y = icon.bottom() + padding;

    paintbutton = new PushButtonMorph(
        this,
        "paintNew",
        new SymbolMorph("brush", 15)
    );
    paintbutton.padding = 0;
    paintbutton.corner = 12;
    paintbutton.color = IDE_Morph.prototype.groupColor;
    paintbutton.highlightColor = IDE_Morph.prototype.frameColor.darker(50);
    paintbutton.pressColor = paintbutton.highlightColor;
    paintbutton.labelMinExtent = new Point(36, 18);
    paintbutton.labelShadowOffset = new Point(-1, -1);
    paintbutton.labelShadowColor = paintbutton.highlightColor;
    paintbutton.labelColor = TurtleIconMorph.prototype.labelColor;
    paintbutton.contrast = this.buttonContrast;
    paintbutton.hint = "Paint a new costume";
    paintbutton.setPosition(new Point(x, y));
    paintbutton.fixLayout();
    paintbutton.setCenter(icon.center());
    paintbutton.setLeft(icon.right() + padding * 4);

    this.addContents(paintbutton);

    if (CamSnapshotDialogMorph.prototype.enableCamera) {
        cambutton = new PushButtonMorph(
            this,
            "newFromCam",
            new SymbolMorph("camera", 15)
        );
        cambutton.padding = 0;
        cambutton.corner = 12;
        cambutton.color = IDE_Morph.prototype.groupColor;
        cambutton.highlightColor = IDE_Morph.prototype.frameColor.darker(50);
        cambutton.pressColor = paintbutton.highlightColor;
        cambutton.labelMinExtent = new Point(36, 18);
        cambutton.labelShadowOffset = new Point(-1, -1);
        cambutton.labelShadowColor = paintbutton.highlightColor;
        cambutton.labelColor = TurtleIconMorph.prototype.labelColor;
        cambutton.contrast = this.buttonContrast;
        cambutton.hint = "Import a new costume from your webcam";
        cambutton.setPosition(new Point(x, y));
        cambutton.fixLayout();
        cambutton.setCenter(paintbutton.center());
        cambutton.setLeft(paintbutton.right() + toolsPadding);

        this.addContents(cambutton);

        if (!CamSnapshotDialogMorph.prototype.enabled) {
            cambutton.disable();
            cambutton.hint =
                CamSnapshotDialogMorph.prototype.notSupportedMessage;
        }

        document.addEventListener(
            'cameraDisabled',
            () => {
                cambutton.disable();
                cambutton.hint =
                    CamSnapshotDialogMorph.prototype.notSupportedMessage;
            }
        );
    }

    txt = new TextMorph(localize(
        "costumes tab help" // look up long string in translator
    ));
    txt.fontSize = 9;
    txt.setColor(SpriteMorph.prototype.paletteTextColor);

    txt.setPosition(new Point(x, y));
    this.addContents(txt);
    y = txt.bottom() + padding;

    this.sprite.costumes.asArray().forEach(costume => {
        icon = new CostumeIconMorph(costume);
        icon.setPosition(new Point(x, y));
        this.addContents(icon);
        y = icon.bottom() + padding;
    });
    this.costumesVersion = this.sprite.costumes.lastChanged;

    this.contents.setPosition(oldPos);
    this.adjustScrollBars();
    this.changed();

    this.updateSelection();
};

WardrobeMorph.prototype.updateSelection = function () {
    this.contents.children.forEach(function (morph) {
        if (morph.refresh) {
            morph.refresh();
        }
    });
    this.spriteVersion = this.sprite.version;
};

// Wardrobe stepping

WardrobeMorph.prototype.step = function () {
    if (this.costumesVersion !== this.sprite.costumes.lastChanged) {
        this.updateList();
    }
    if (this.spriteVersion !== this.sprite.version) {
        this.updateSelection();
    }
};

// Wardrobe ops

WardrobeMorph.prototype.removeCostumeAt = function (idx) {
    this.sprite.shadowAttribute('costumes');
    this.sprite.costumes.remove(idx);
    this.updateList();
};

WardrobeMorph.prototype.paintNew = function () {
    var ide = this.parentThatIsA(IDE_Morph),
        cos = new Costume(
            newCanvas(null, true),
            this.sprite.newCostumeName(localize('Untitled')),
            null, // rotation center
            null, // don't shrink-to-fit
            ide.stage.dimensions // max extent
        );

    cos.edit(
        this.world(),
        ide,
        true,
        null,
        () => {
            this.sprite.shadowAttribute('costumes');
            this.sprite.addCostume(cos);
            this.updateList();
            this.sprite.wearCostume(cos);
            this.sprite.recordUserEdit(
                'costume',
                'draw',
                cos.name
            );
        }
    );
};

WardrobeMorph.prototype.newFromCam = function () {
    var camDialog,
        ide = this.parentThatIsA(IDE_Morph),
        sprite = this.sprite;

    camDialog = new CamSnapshotDialogMorph(
        ide,
        sprite,
        nop,
        costume => {
            sprite.addCostume(costume);
            sprite.wearCostume(costume);
            this.updateList();
            sprite.recordUserEdit(
                'costume',
                'snap',
                costume.name
            );
        });

    camDialog.key = 'camera';
    camDialog.popUp(this.world());
};

// Wardrobe drag & drop

WardrobeMorph.prototype.wantsDropOf = function (morph) {
    return morph instanceof CostumeIconMorph;
};

WardrobeMorph.prototype.reactToDropOf = function (icon) {
    var idx = 0,
        costume = icon.object,
        top = icon.top();
    icon.destroy();
    this.contents.children.forEach(item => {
        if (item instanceof CostumeIconMorph && item.top() < top - 4) {
            idx += 1;
        }
    });
    this.sprite.shadowAttribute('costumes');
    this.sprite.costumes.add(costume, idx + 1);
    this.updateList();
    icon.mouseClickLeft(); // select
    this.sprite.recordUserEdit(
        'costume',
        'add',
        costume.name,
        idx + 1
    );
};

// SoundIconMorph ///////////////////////////////////////////////////////

/*
    I am an element in the SpriteEditor's "Sounds" tab.
*/

// SoundIconMorph inherits from ToggleButtonMorph (Widgets)
// ... and copies methods from SpriteIconMorph

SoundIconMorph.prototype = new ToggleButtonMorph();
SoundIconMorph.prototype.constructor = SoundIconMorph;
SoundIconMorph.uber = ToggleButtonMorph.prototype;

// SoundIconMorph settings

SoundIconMorph.prototype.thumbSize = new Point(80, 60);
SoundIconMorph.prototype.labelShadowOffset = null;
SoundIconMorph.prototype.labelShadowColor = null;
SoundIconMorph.prototype.labelColor = FOREGROUND;
SoundIconMorph.prototype.fontSize = 9;

// SoundIconMorph instance creation:

function SoundIconMorph(aSound) {
    this.init(aSound);
}

SoundIconMorph.prototype.init = function (aSound) {
    var colors, action, query;

    colors = [
        IDE_Morph.prototype.groupColor,
        IDE_Morph.prototype.frameColor,
        IDE_Morph.prototype.frameColor
    ];

    action = nop; // When I am selected (which is never the case for sounds)

    query = () => false;

    // additional properties:
    this.object = aSound; // mandatory, actually
    this.version = this.object.version;
    this.thumbnail = null;

    // initialize inherited properties:
    SoundIconMorph.uber.init.call(
        this,
        colors, // color overrides, <array>: [normal, highlight, pressed]
        null, // target - not needed here
        action, // a toggle function
        this.object.name, // label string
        query, // predicate/selector
        null, // environment
        null // hint
    );

    // override defaults and build additional components
    this.isDraggable = true;
    this.createThumbnail();
    this.padding = 2;
    this.corner = 8;
    this.fixLayout();
    this.fps = 1;
};

SoundIconMorph.prototype.createThumbnail = function () {
    var label;
    if (this.thumbnail) {
        this.thumbnail.destroy();
    }
    this.thumbnail = new Morph();
    this.thumbnail.bounds.setExtent(this.thumbSize);
    this.add(this.thumbnail);
    label = new StringMorph(
        this.createInfo(),
        '16',
        '',
        true,
        false,
        false,
        this.labelShadowOffset,
        this.labelShadowColor,
        new Color(200, 200, 200)
    );
    this.thumbnail.add(label);
    label.setCenter(new Point(40, 15));

    this.button = new PushButtonMorph(
        this,
        'toggleAudioPlaying',
        (this.object.previewAudio ? 'Stop' : 'Play')
    );
    this.button.hint = 'Play sound';
    this.button.fixLayout();
    this.thumbnail.add(this.button);
    this.button.setCenter(new Point(40, 40));
};

SoundIconMorph.prototype.createInfo = function () {
    var dur = Math.round(this.object.audio.duration || 0),
        mod = dur % 60;
    return Math.floor(dur / 60).toString()
        + ":"
        + (mod < 10 ? "0" : "")
        + mod.toString();
};

SoundIconMorph.prototype.toggleAudioPlaying = function () {
    if (!this.object.previewAudio) {
        //Audio is not playing
        this.button.labelString = 'Stop';
        this.button.hint = 'Stop sound';
        this.object.previewAudio = this.object.play();
        this.object.previewAudio.addEventListener(
            'ended',
            () => this.audioHasEnded(),
            false
        );
    } else {
        //Audio is currently playing
        this.button.labelString = 'Play';
        this.button.hint = 'Play sound';
        this.object.previewAudio.pause();
        this.object.previewAudio.terminated = true;
        this.object.previewAudio = null;
    }
    this.button.createLabel();
};

SoundIconMorph.prototype.audioHasEnded = function () {
    this.button.trigger();
    this.button.mouseLeave();
};

SoundIconMorph.prototype.createLabel
    = SpriteIconMorph.prototype.createLabel;

// SoundIconMorph stepping

/*
SoundIconMorph.prototype.step
    = SpriteIconMorph.prototype.step;
*/

// SoundIconMorph layout

SoundIconMorph.prototype.fixLayout
    = SpriteIconMorph.prototype.fixLayout;

// SoundIconMorph menu

SoundIconMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this);
    if (!(this.object instanceof Sound)) { return null; }
    menu.addItem('rename', 'renameSound');
    menu.addItem('delete', 'removeSound');
    menu.addLine();
    menu.addItem('export', 'exportSound');
    return menu;
};


SoundIconMorph.prototype.renameSound = function () {
    var sound = this.object,
        ide = this.parentThatIsA(IDE_Morph);
    this.disinherit();
    new DialogBoxMorph(
        null,
        answer => {
            var old = sound.name;
            if (answer && (answer !== old)) {
                sound.name = answer;
                sound.version = Date.now();
                this.createLabel(); // can be omitted once I'm stepping
                this.fixLayout(); // can be omitted once I'm stepping
                ide.hasChangedMedia = true;
                ide.currentSprite.recordUserEdit(
                    'sound',
                    'rename',
                    old,
                    sound.name
                );

            }
        }
    ).prompt(
        'rename sound',
        sound.name,
        this.world()
    );
};

SoundIconMorph.prototype.removeSound = function () {
    var jukebox = this.parentThatIsA(JukeboxMorph),
        idx = this.parent.children.indexOf(this) - 1;
    jukebox.removeSound(idx);
    jukebox.sprite.recordUserEdit(
        'sound',
        'delete',
        idx,
        this.object.name
    );
};

SoundIconMorph.prototype.exportSound = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    ide.saveAudioAs(this.object.audio, this.object.name);
};

SoundIconMorph.prototype.render
    = SpriteIconMorph.prototype.render;

SoundIconMorph.prototype.createLabel
    = SpriteIconMorph.prototype.createLabel;

// SoundIconMorph inheritance

SoundIconMorph.prototype.disinherit = function () {
    var jukebox = this.parentThatIsA(JukeboxMorph),
        idx = this.parent.children.indexOf(this);
    if (jukebox.sprite.inheritsAttribute('sounds')) {
        jukebox.sprite.shadowAttribute('sounds');
        this.object = jukebox.sprite.sounds.at(idx - 1);
    }
};

// SoundIconMorph drag & drop

SoundIconMorph.prototype.prepareToBeGrabbed = function () {
    this.disinherit();
    this.userState = 'pressed';
    this.state = true;
    this.rerender();
    this.removeSound();
};

// JukeboxMorph /////////////////////////////////////////////////////

/*
    I am JukeboxMorph, like WardrobeMorph, but for sounds
*/

// JukeboxMorph instance creation

JukeboxMorph.prototype = new ScrollFrameMorph();
JukeboxMorph.prototype.constructor = JukeboxMorph;
JukeboxMorph.uber = ScrollFrameMorph.prototype;

function JukeboxMorph(aSprite, sliderColor) {
    this.init(aSprite, sliderColor);
}

JukeboxMorph.prototype.init = function (aSprite, sliderColor) {
    // additional properties
    this.sprite = aSprite || new SpriteMorph();
    this.soundsVersion = null;
    this.spriteVersion = null;

    // initialize inherited properties
    JukeboxMorph.uber.init.call(this, null, null, sliderColor);

    // configure inherited properties
    this.acceptsDrops = false;
    // this.fps = 2; // commented out to make scrollbars more responsive
    this.updateList();
};

// Jukebox updating

JukeboxMorph.prototype.updateList = function () {
    var x = this.left() + 5,
        y = this.top() + 5,
        padding = 4,
        icon,
        txt,
        ide = this.sprite.parentThatIsA(IDE_Morph),
        recordButton;

    this.changed();

    this.contents.destroy();
    this.contents = new FrameMorph(this);
    this.contents.acceptsDrops = false;
    this.contents.reactToDropOf = (icon) => this.reactToDropOf(icon);
    this.addBack(this.contents);

    txt = new TextMorph(localize(
        'import a sound from your computer\nby dragging it into here'
    ));
    txt.fontSize = 9;
    txt.setColor(SpriteMorph.prototype.paletteTextColor);
    txt.setPosition(new Point(x, y));
    this.addContents(txt);

    recordButton = new PushButtonMorph(
        ide,
        'recordNewSound',
        new SymbolMorph('circleSolid', 15)
    );
    recordButton.padding = 0;
    recordButton.corner = 12;
    recordButton.color = IDE_Morph.prototype.groupColor;
    recordButton.highlightColor = IDE_Morph.prototype.frameColor.darker(50);
    recordButton.pressColor = recordButton.highlightColor;
    recordButton.labelMinExtent = new Point(36, 18);
    recordButton.labelShadowOffset = new Point(-1, -1);
    recordButton.labelShadowColor = recordButton.highlightColor;
    recordButton.labelColor = TurtleIconMorph.prototype.labelColor;
    recordButton.contrast = this.buttonContrast;
    recordButton.hint = 'Record a new sound';
    recordButton.fixLayout();
    recordButton.label.setColor(new Color(255, 20, 20));
    recordButton.setPosition(txt.bottomLeft().add(new Point(0, padding * 2)));

    this.addContents(recordButton);

    y = recordButton.bottom() + padding;

    this.sprite.sounds.asArray().forEach(sound => {
        icon = new SoundIconMorph(sound);
        icon.setPosition(new Point(x, y));
        this.addContents(icon);
        y = icon.bottom() + padding;
    });
    this.soundsVersion = this.sprite.sounds.lastChanged;

    this.changed();
    this.updateSelection();
};

JukeboxMorph.prototype.updateSelection = function () {
    this.contents.children.forEach(morph => {
        if (morph.refresh) {
            morph.refresh();
        }
    });
    this.spriteVersion = this.sprite.version;
};

// Jukebox stepping

JukeboxMorph.prototype.step = function () {
    if (this.soundsVersion !== this.sprite.sounds.lastChanged) {
        this.updateList();
    }
    if (this.spriteVersion !== this.sprite.version) {
        this.updateSelection();
    }
};

// Jukebox ops

JukeboxMorph.prototype.removeSound = function (idx) {
    this.sprite.sounds.remove(idx);
    this.updateList();
};

// Jukebox drag & drop

JukeboxMorph.prototype.wantsDropOf = function (morph) {
    return morph instanceof SoundIconMorph;
};

JukeboxMorph.prototype.reactToDropOf = function (icon) {
    var idx = 0,
        sound = icon.object,
        top = icon.top();

    icon.destroy();
    this.contents.children.forEach(item => {
        if (item instanceof SoundIconMorph && item.top() < top - 4) {
            idx += 1;
        }
    });

    this.sprite.shadowAttribute('sounds');
    this.sprite.sounds.add(sound, idx + 1);
    this.updateList();

    this.sprite.recordUserEdit(
        'sound',
        'add',
        sound.name,
        idx + 1
    );
};

// SceneIconMorph ////////////////////////////////////////////////////

/*
    I am a selectable element in a SceneAlbum, keeping
    a self-updating thumbnail of the scene I'm respresenting, and a
    self-updating label of the scene's name (in case it is changed
    elsewhere)
*/

// SceneIconMorph inherits from ToggleButtonMorph (Widgets)
// ... and copies methods from SpriteIconMorph

SceneIconMorph.prototype = new ToggleButtonMorph();
SceneIconMorph.prototype.constructor = SceneIconMorph;
SceneIconMorph.uber = ToggleButtonMorph.prototype;

// SceneIconMorph settings

SceneIconMorph.prototype.thumbSize = new Point(40, 30);
SceneIconMorph.prototype.labelShadowOffset = null;
SceneIconMorph.prototype.labelShadowColor = null;
SceneIconMorph.prototype.labelColor = FOREGROUND;
SceneIconMorph.prototype.fontSize = 9;

// SceneIconMorph instance creation:

function SceneIconMorph(aScene) {
    this.init(aScene);
}

SceneIconMorph.prototype.init = function (aScene) {
    var colors, action, query;

    colors = [
        IDE_Morph.prototype.frameColor,
        IDE_Morph.prototype.groupColor,
        IDE_Morph.prototype.groupColor
    ];

    action = () => {
        // make my scene the current one
        var ide = this.parentThatIsA(IDE_Morph),
            album = this.parentThatIsA(SceneAlbumMorph);
        album.scene = this.object;
        ide.switchToScene(this.object);
    };

    query = () => {
        // answer true if my scene is the current one
        var album = this.parentThatIsA(SceneAlbumMorph);
        if (album) {
            return album.scene === this.object;
        }
        return false;
    };

    // additional properties:
    this.object = aScene || new Scene(); // mandatory, actually
    this.version = this.object.stage.version;
    this.thumbnail = null;

    // initialize inherited properties:
    SceneIconMorph.uber.init.call(
        this,
        colors, // color overrides, <array>: [normal, highlight, pressed]
        null, // target - not needed here
        action, // a toggle function
        this.object.name || localize('untitled'), // label string
        query, // predicate/selector
        null, // environment
        null // hint
    );

    // override defaults and build additional components
    this.isDraggable = true;
    this.createThumbnail();
    this.padding = 2;
    this.corner = 8;
    this.fixLayout();
    this.fps = 1;
};

SceneIconMorph.prototype.createThumbnail = function () {
    if (this.thumbnail) {
        this.thumbnail.destroy();
    }

    this.thumbnail = new Morph();
    this.thumbnail.isCachingImage = true;
    this.thumbnail.bounds.setExtent(this.thumbSize);
    this.thumbnail.cachedImage = this.object.stage.thumbnail(
        this.thumbSize,
        this.thumbnail.cachedImage
    );
    this.add(this.thumbnail);
};

SceneIconMorph.prototype.createLabel = function () {
    var txt;

    if (this.label) {
        this.label.destroy();
    }
    txt = new StringMorph(
        this.object.name || localize('untitled'),
        this.fontSize,
        this.fontStyle,
        false, // true
        false,
        false,
        this.labelShadowOffset,
        this.labelShadowColor,
        this.labelColor
    );

    this.label = new FrameMorph();
    this.label.acceptsDrops = false;
    this.label.alpha = 0;
    this.label.setExtent(txt.extent());
    txt.setPosition(this.label.position());
    this.label.add(txt);
    this.add(this.label);
};

// SceneIconMorph stepping

SceneIconMorph.prototype.step = function () {
    if (this.version !== this.object.stage.version) {
        this.createThumbnail();
        this.createLabel();
        this.fixLayout();
        this.version = this.object.stage.version;
        this.refresh();
    }
};

// SceneIconMorph layout

SceneIconMorph.prototype.fixLayout
    = SpriteIconMorph.prototype.fixLayout;

// SceneIconMorph menu

SceneIconMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this);
    if (!(this.object instanceof Scene)) {
        return null;
    }
    if (!this.isProjectScene()) {
        menu.addItem("rename", "renameScene");
        menu.addItem("delete", "removeScene");
    }
    menu.addItem("export", "exportScene");
    return menu;
};

SceneIconMorph.prototype.renameScene = function () {
    var scene = this.object,
        ide = this.parentThatIsA(IDE_Morph);
    new DialogBoxMorph(
        null,
        answer => {
            if (answer && (answer !== scene.name)) {
                scene.name = ide.newSceneName(
                    answer,
                    scene
                );
                scene.stage.version = Date.now();
                if (scene === ide.scene) {
                    ide.controlBar.updateLabel();
                }
                ide.recordUnsavedChanges();
            }
        }
    ).prompt(
        'rename scene',
        scene.name,
        this.world()
    );
};

SceneIconMorph.prototype.removeScene = function () {
    var album = this.parentThatIsA(SceneAlbumMorph),
        idx = this.parent.children.indexOf(this) + 1,
        off = 0, // 2,
        ide = this.parentThatIsA(IDE_Morph);
    album.removeSceneAt(idx - off); // ignore buttons
    if (ide.scene === this.object) {
        ide.switchToScene(ide.scenes.at(1));
    }
};

SceneIconMorph.prototype.exportScene = function () {
    // Export scene as project XML, saving a file to disk
    var menu, str,
        ide = this.parentThatIsA(IDE_Morph),
        name = this.object.name || localize('untitled');

    try {
        menu = ide.showMessage('Exporting');
        str = ide.serializer.serialize(
            new Project(new List([this.object]), this.object)
        );
        ide.saveXMLAs(str, name);
        menu.destroy();
        ide.showMessage('Exported!', 1);
    } catch (err) {
        if (Process.prototype.isCatchingErrors) {
            ide.showMessage('Export failed: ' + err);
        } else {
            throw err;
        }
    }
};

// SceneIconMorph ops

SceneIconMorph.prototype.isProjectScene = function (anIDE) {
    // the first scene of a project cannot be renamed, deleted or rearranged,
    // because its name and project notes are those of the project
    var ide = anIDE || this.parentThatIsA(IDE_Morph);
    return ide.scenes.indexOf(this.object) === 1;
};

// SceneIconMorph drawing

SceneIconMorph.prototype.render
    = SpriteIconMorph.prototype.render;

// SceneIconMorph drag & drop

SceneIconMorph.prototype.rootForGrab = function () {
    return this;
};

SceneIconMorph.prototype.prepareToBeGrabbed = function () {
    this.mouseClickLeft(); // select me
    this.removeScene();
};

// SceneAlbumMorph ///////////////////////////////////////////////////////

// I am a watcher on a project's scenes list

// SceneAlbumMorph inherits from ScrollFrameMorph

SceneAlbumMorph.prototype = new ScrollFrameMorph();
SceneAlbumMorph.prototype.constructor = SceneAlbumMorph;
SceneAlbumMorph.uber = ScrollFrameMorph.prototype;

// SceneAlbumMorph instance creation:

function SceneAlbumMorph(anIDE, sliderColor) {
    this.init(anIDE, sliderColor);
}

SceneAlbumMorph.prototype.init = function (anIDE, sliderColor) {
    // additional properties
    this.ide = anIDE;
    this.scene = anIDE.scene;
    this.version = null;

    // initialize inherited properties
    SceneAlbumMorph.uber.init.call(this, null, null, sliderColor);

    // configure inherited properties
    // this.fps = 2; // commented out to make scrollbars more responsive
    this.updateList();
    this.updateSelection();
};

// SceneAlbumMorph updating

SceneAlbumMorph.prototype.updateList = function () {
    var x = this.left() + 5,
        y = this.top() + 5,
        padding = 4,
        oldPos = this.contents.position(),
        icon;

    this.changed();

    this.contents.destroy();
    this.contents = new FrameMorph(this);
    this.contents.acceptsDrops = false;
    this.contents.reactToDropOf = (icon) => {
        this.reactToDropOf(icon);
    };
    this.addBack(this.contents);

    this.ide.scenes.asArray().forEach((scene, i) => {
        icon = new SceneIconMorph(scene);
        if (i < 1) {
            icon.isDraggable = false; // project scene cannot be rearranged
        }
        icon.setPosition(new Point(x, y));
        this.addContents(icon);
        y = icon.bottom() + padding;
    });
    this.version = this.ide.scenes.lastChanged;

    this.contents.setPosition(oldPos);
    this.adjustScrollBars();
    this.changed();

    this.updateSelection();
};

SceneAlbumMorph.prototype.updateSelection = function () {
    this.scene = this.ide.scene;
    this.contents.children.forEach(function (morph) {
        if (morph.refresh) {
            morph.refresh();
        }
    });
};

// SceneAlbumMorph stepping

SceneAlbumMorph.prototype.step = function () {
    if (this.version !== this.ide.scenes.lastChanged) {
        this.updateList();
    }
    if (this.scene !== this.ide.scene) {
        this.updateSelection();
    }
};

// Wardrobe ops

SceneAlbumMorph.prototype.removeSceneAt = function (idx) {
    this.ide.scenes.remove(idx);
    this.updateList();
};

// SceneAlbumMorph drag & drop

SceneAlbumMorph.prototype.wantsDropOf = function (morph) {
    return morph instanceof SceneIconMorph;
};

SceneAlbumMorph.prototype.reactToDropOf = function (icon) {
    var idx = 0,
        scene = icon.object,
        top = icon.top();
    icon.destroy();
    this.contents.children.forEach(item => {
        if (item instanceof SceneIconMorph && item.top() < top - 4) {
            idx += 1;
        }
    });
    idx = Math.max(idx, 1); // the project scene cannot the rearranged
    this.ide.scenes.add(scene, idx + 1);
    this.updateList();
    icon.mouseClickLeft(); // select
};

// StageHandleMorph ////////////////////////////////////////////////////////

// I am a horizontal resizing handle for a StageMorph

// StageHandleMorph inherits from Morph:

StageHandleMorph.prototype = new Morph();
StageHandleMorph.prototype.constructor = StageHandleMorph;
StageHandleMorph.uber = Morph.prototype;

// StageHandleMorph instance creation:

function StageHandleMorph(target) {
    this.init(target);
}

StageHandleMorph.prototype.init = function (target) {
    this.target = target || null;
    this.userState = 'normal'; // or 'highlight'
    HandleMorph.uber.init.call(this);
    this.color = MorphicPreferences.isFlat ?
        IDE_Morph.prototype.backgroundColor : new Color(190, 190, 190);
    this.isDraggable = false;
    this.setExtent(new Point(12, 50));
};

// StageHandleMorph drawing:

StageHandleMorph.prototype.render = function (ctx) {
    if (this.userState === 'highlight') {
        this.renderOn(
            ctx,
            MorphicPreferences.isFlat ?
                new Color(245, 245, 255) : new Color(100, 100, 255),
            this.color
        );
    } else { // assume 'normal'
        this.renderOn(ctx, this.color);
    }
};

StageHandleMorph.prototype.renderOn = function (
    ctx,
    color,
    shadowColor
) {
    var l = this.height() / 8,
        w = this.width() / 6,
        r = w / 2,
        x,
        y,
        i;

    ctx.lineWidth = w;
    ctx.lineCap = 'round';
    y = this.height() / 2;

    ctx.strokeStyle = color.toString();
    x = this.width() / 12;
    for (i = 0; i < 3; i += 1) {
        if (i > 0) {
            ctx.beginPath();
            ctx.moveTo(x, y - (l - r));
            ctx.lineTo(x, y + (l - r));
            ctx.stroke();
        }
        x += (w * 2);
        l *= 2;
    }
    if (shadowColor) {
        ctx.strokeStyle = shadowColor.toString();
        x = this.width() / 12 + w;
        l = this.height() / 8;
        for (i = 0; i < 3; i += 1) {
            if (i > 0) {
                ctx.beginPath();
                ctx.moveTo(x, y - (l - r));
                ctx.lineTo(x, y + (l - r));
                ctx.stroke();
            }
            x += (w * 2);
            l *= 2;
        }
    }
};

// StageHandleMorph layout:

StageHandleMorph.prototype.fixLayout = function () {
    if (!this.target) { return; }
    var ide = this.target.parentThatIsA(IDE_Morph);
    this.setTop(this.target.top() + 10);
    this.setRight(this.target.left());
    if (ide) { ide.add(this); } // come to front
};

// StageHandleMorph stepping:

StageHandleMorph.prototype.step = null;

StageHandleMorph.prototype.mouseDownLeft = function (pos) {
    var world = this.world(),
        offset = this.right() - pos.x,
        ide = this.target.parentThatIsA(IDE_Morph);

    if (!this.target) {
        return null;
    }
    ide.isSmallStage = true;
    ide.controlBar.stageSizeButton.refresh();

    this.step = function () {
        var newPos, newWidth;
        if (world.hand.mouseButton) {
            newPos = world.hand.bounds.origin.x + offset;
            newWidth = this.target.right() - newPos;
            ide.stageRatio = newWidth / this.target.dimensions.x;
            ide.setExtent(world.extent());

        } else {
            this.step = null;
            ide.isSmallStage = (ide.stageRatio !== 1);
            ide.controlBar.stageSizeButton.refresh();
        }
    };
};

// StageHandleMorph events:

StageHandleMorph.prototype.mouseEnter = function () {
    this.userState = 'highlight';
    this.rerender();
};

StageHandleMorph.prototype.mouseLeave = function () {
    this.userState = 'normal';
    this.rerender();
};

StageHandleMorph.prototype.mouseDoubleClick = function () {
    this.target.parentThatIsA(IDE_Morph).toggleStageSize(true, 1);
};

// PaletteHandleMorph ////////////////////////////////////////////////////////

// I am a horizontal resizing handle for a blocks palette
// I pseudo-inherit many things from StageHandleMorph

// PaletteHandleMorph inherits from Morph:

PaletteHandleMorph.prototype = new Morph();
PaletteHandleMorph.prototype.constructor = PaletteHandleMorph;
PaletteHandleMorph.uber = Morph.prototype;

// PaletteHandleMorph instance creation:

function PaletteHandleMorph(target) {
    this.init(target);
}

PaletteHandleMorph.prototype.init = function (target) {
    this.target = target || null;
    this.userState = 'normal';
    HandleMorph.uber.init.call(this);
    this.color = MorphicPreferences.isFlat ?
        IDE_Morph.prototype.backgroundColor : new Color(190, 190, 190);
    this.isDraggable = false;
    this.setExtent(new Point(12, 50));
};

// PaletteHandleMorph drawing:

PaletteHandleMorph.prototype.render =
    StageHandleMorph.prototype.render;

PaletteHandleMorph.prototype.renderOn =
    StageHandleMorph.prototype.renderOn;

// PaletteHandleMorph layout:

PaletteHandleMorph.prototype.fixLayout = function () {
    if (!this.target) { return; }
    var ide = this.target.parentThatIsA(IDE_Morph);
    this.setTop(this.target.top() + 10);
    this.setRight(this.target.right());
    if (ide) { ide.add(this); } // come to front
};

// PaletteHandleMorph stepping:

PaletteHandleMorph.prototype.step = null;

PaletteHandleMorph.prototype.mouseDownLeft = function (pos) {
    var world = this.world(),
        offset = this.right() - pos.x,
        ide = this.target.parentThatIsA(IDE_Morph),
        cnf = ide.config,
        border = cnf.border || 0;

    if (!this.target) {
        return null;
    }
    this.step = function () {
        var newPos;
        if (world.hand.mouseButton) {
            newPos = world.hand.bounds.origin.x + offset;
            ide.paletteWidth = Math.min(
                Math.max(
                    200, newPos - ide.left() - border * 2),
                cnf.noSprites ?
                    ide.width() - border * 2
                    : ide.stageHandle.left() -
                    ide.spriteBar.tabBar.width()
            );
            ide.setExtent(world.extent());

        } else {
            this.step = null;
        }
    };
};

// PaletteHandleMorph events:

PaletteHandleMorph.prototype.mouseEnter
    = StageHandleMorph.prototype.mouseEnter;

PaletteHandleMorph.prototype.mouseLeave
    = StageHandleMorph.prototype.mouseLeave;

PaletteHandleMorph.prototype.mouseDoubleClick = function () {
    this.target.parentThatIsA(IDE_Morph).setPaletteWidth(200);
};

// CamSnapshotDialogMorph ////////////////////////////////////////////////////

/*
    I am a dialog morph that lets users take a snapshot using their webcam
    and use it as a costume for their sprites or a background for the Stage.
*/

// CamSnapshotDialogMorph inherits from DialogBoxMorph:

CamSnapshotDialogMorph.prototype = new DialogBoxMorph();
CamSnapshotDialogMorph.prototype.constructor = CamSnapshotDialogMorph;
CamSnapshotDialogMorph.uber = DialogBoxMorph.prototype;

// CamSnapshotDialogMorph settings

CamSnapshotDialogMorph.prototype.enableCamera = true;
CamSnapshotDialogMorph.prototype.enabled = true;

CamSnapshotDialogMorph.prototype.notSupportedMessage =
    'Please make sure your web browser is up to date\n' +
    'and your camera is properly configured. \n\n' +
    'Some browsers also require you to access Snap!\n' +
    'through HTTPS to use the camera.\n\n' +
    'Please replace the "http://" part of the address\n' +
    'in your browser by "https://" and try again.';

// CamSnapshotDialogMorph instance creation

function CamSnapshotDialogMorph(ide, sprite, onCancel, onAccept) {
    this.init(ide, sprite, onCancel, onAccept);
}

CamSnapshotDialogMorph.prototype.init = function (
    ide,
    sprite,
    onCancel,
    onAccept
) {
    this.ide = ide;
    this.sprite = sprite;
    this.padding = 10;
    this.oncancel = onCancel;
    this.accept = onAccept;
    this.videoElement = null; // an HTML5 video element
    this.videoView = new Morph(); // a morph where we'll copy the video contents
    this.videoView.isCachingImage = true;

    CamSnapshotDialogMorph.uber.init.call(this);
    this.labelString = 'Camera';
    this.createLabel();
    this.buildContents();
};

CamSnapshotDialogMorph.prototype.buildContents = function () {
    var myself = this,
        stage = this.sprite.parentThatIsA(StageMorph);

    function noCameraSupport() {
        myself.disable();
        myself.ide.inform(
            'Camera not supported',
            CamSnapshotDialogMorph.prototype.notSupportedMessage
        );
        if (myself.videoElement) {
            myself.videoElement.remove();
        }
        myself.cancel();
    }

    this.videoElement = document.createElement('video');
    this.videoElement.hidden = true;
    this.videoElement.width = stage.dimensions.x;
    this.videoElement.height = stage.dimensions.y;

    document.body.appendChild(this.videoElement);

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                this.videoElement.srcObject = stream;
                this.videoElement.play().catch(noCameraSupport);
                this.videoElement.stream = stream;
            }).catch(noCameraSupport);
    }

    this.videoView.setExtent(stage.dimensions);
    this.videoView.cachedImage = newCanvas(
        stage.dimensions,
        true, // retina, maybe overkill here
        this.videoView.cachedImage
    );

    this.videoView.drawOn = function (ctx, rect) {
        var videoWidth = myself.videoElement.videoWidth,
            videoHeight = myself.videoElement.videoHeight,
            w = stage.dimensions.x,
            h = stage.dimensions.y,
            clippingWidth, clippingHeight;

        if (!videoWidth) { return; }

        ctx.save();

        // Flip the image so it looks like a mirror
        ctx.translate(w, 0);
        ctx.scale(-1, 1);

        if (videoWidth / w > videoHeight / h) {
            // preserve height, crop width
            clippingWidth = w * (videoHeight / h);
            clippingHeight = videoHeight;
        } else {
            // preserve width, crop height
            clippingWidth = videoWidth;
            clippingHeight = h * (videoWidth / w);
        }

        ctx.drawImage(
            myself.videoElement,
            0,
            0,
            clippingWidth,
            clippingHeight,
            this.left() * -1,
            this.top(),
            w,
            h
        );

        ctx.restore();
    };

    this.videoView.step = function () {
        this.changed();
    };

    this.addBody(new AlignmentMorph('column', this.padding / 2));
    this.body.add(this.videoView);
    this.body.fixLayout();

    this.addButton('ok', 'Save');
    this.addButton('cancel', 'Cancel');

    this.fixLayout();
    this.rerender();
};

CamSnapshotDialogMorph.prototype.ok = function () {
    this.accept(
        new Costume(
            this.videoView.fullImage(),
            this.sprite.newCostumeName('camera'),
            null,
            true // no shrink-wrap
        ).flipped()
    );
};

CamSnapshotDialogMorph.prototype.disable = function () {
    CamSnapshotDialogMorph.prototype.enabled = false;
    document.dispatchEvent(new Event('cameraDisabled'));
};

CamSnapshotDialogMorph.prototype.destroy = function () {
    this.oncancel.call(this);
    this.close();
};

CamSnapshotDialogMorph.prototype.close = function () {
    if (this.videoElement && this.videoElement.stream) {
        this.videoElement.stream.getTracks()[0].stop();
        this.videoElement.remove();
    }
    CamSnapshotDialogMorph.uber.destroy.call(this);
};

// SoundRecorderDialogMorph ////////////////////////////////////////////////////

/*
    I am a dialog morph that lets users record sound snippets for their
    sprites or Stage.
*/

// SoundRecorderDialogMorph inherits from DialogBoxMorph:

SoundRecorderDialogMorph.prototype = new DialogBoxMorph();
SoundRecorderDialogMorph.prototype.constructor = SoundRecorderDialogMorph;
SoundRecorderDialogMorph.uber = DialogBoxMorph.prototype;

// SoundRecorderDialogMorph instance creation

function SoundRecorderDialogMorph(onAccept) {
    this.init(onAccept);
}

SoundRecorderDialogMorph.prototype.init = function (onAccept) {
    var myself = this;
    this.padding = 10;
    this.accept = onAccept;

    this.mediaRecorder = null; // an HTML5 MediaRecorder object
    this.audioElement = document.createElement('audio');
    this.audioElement.hidden = true;
    this.audioElement.onended = function (event) {
        myself.stop();
    };
    document.body.appendChild(this.audioElement);

    this.recordButton = null;
    this.stopButton = null;
    this.playButton = null;
    this.progressBar = new BoxMorph();

    SoundRecorderDialogMorph.uber.init.call(this);
    this.labelString = 'Sound Recorder';
    this.createLabel();
    this.buildContents();
};

SoundRecorderDialogMorph.prototype.buildContents = function () {
    var audioChunks = [];

    this.recordButton = new PushButtonMorph(
        this,
        'record',
        new SymbolMorph('circleSolid', 10)
    );

    this.stopButton = new PushButtonMorph(
        this,
        'stop',
        new SymbolMorph('rectangleSolid', 10)
    );

    this.playButton = new PushButtonMorph(
        this,
        'play',
        new SymbolMorph('pointRight', 10)
    );

    this.buildProgressBar();

    this.addBody(new AlignmentMorph('row', this.padding));
    this.body.add(this.recordButton);
    this.body.add(this.stopButton);
    this.body.add(this.playButton);
    this.body.add(this.progressBar);

    this.body.fixLayout();

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(
            {
                audio: {
                    channelCount: 1 // force mono, currently only works on FF
                }

            }
        ).then(stream => {
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };
            this.mediaRecorder.onstop = (event) => {
                var buffer = new Blob(audioChunks),
                    reader = new window.FileReader();
                reader.readAsDataURL(buffer);
                reader.onloadend = () => {
                    var base64 = reader.result;
                    base64 = 'data:audio/ogg;base64,' +
                        base64.split(',')[1];
                    this.audioElement.src = base64;
                    this.audioElement.load();
                    audioChunks = [];
                };
            };
        });
    }

    this.addButton('ok', 'Save');
    this.addButton('cancel', 'Cancel');

    this.fixLayout();
    this.rerender();
};

SoundRecorderDialogMorph.prototype.buildProgressBar = function () {
    var line = new Morph(),
        myself = this;

    this.progressBar.setExtent(new Point(150, 20));
    this.progressBar.setColor(new Color(200, 200, 200));
    this.progressBar.setBorderWidth(1);
    this.progressBar.setBorderColor(new Color(150, 150, 150));

    line.setExtent(new Point(130, 2));
    line.setColor(new Color(50, 50, 50));
    line.setCenter(this.progressBar.center());
    this.progressBar.add(line);

    this.progressBar.indicator = new Morph();
    this.progressBar.indicator.setExtent(new Point(5, 15));
    this.progressBar.indicator.setColor(new Color(50, 200, 50));
    this.progressBar.indicator.setCenter(line.leftCenter());

    this.progressBar.add(this.progressBar.indicator);

    this.progressBar.setPercentage = function (percentage) {
        this.indicator.setLeft(
            line.left() +
            (line.width() / 100 * percentage) -
            this.indicator.width() / 2
        );
    };

    this.progressBar.step = function () {
        if (myself.audioElement.duration) {
            this.setPercentage(
                myself.audioElement.currentTime /
                myself.audioElement.duration * 100);
        } else {
            this.setPercentage(0);
        }
    };
};

SoundRecorderDialogMorph.prototype.record = function () {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
        this.stop();
        return;
    }

    this.mediaRecorder.start();
    this.recordButton.label.setColor(new Color(255, 0, 0));
    this.playButton.label.setColor(new Color(0, 0, 0));
};

SoundRecorderDialogMorph.prototype.stop = function () {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
        this.mediaRecorder.stop();
    }

    this.audioElement.pause();
    this.audioElement.currentTime = 0;

    this.recordButton.label.setColor(new Color(0, 0, 0));
    this.playButton.label.setColor(new Color(0, 0, 0));
};

SoundRecorderDialogMorph.prototype.play = function () {
    this.stop();
    this.audioElement.oncanplaythrough = function () {
        this.play();
        this.oncanplaythrough = nop;
    };
    this.playButton.label.setColor(new Color(0, 255, 0));
};

SoundRecorderDialogMorph.prototype.ok = function () {
    var myself = this;
    this.stop();
    this.audioElement.oncanplaythrough = function () {
        if (this.duration && this.duration !== Infinity) {
            myself.accept(this);
            this.oncanplaythrough = nop;
            myself.destroy();
        } else {
            // For some reason, we need to play the sound
            // at least once to get its duration.
            myself.buttons.children.forEach(button =>
                button.disable()
            );
            this.play();
        }
    };

};

SoundRecorderDialogMorph.prototype.destroy = function () {
    this.stop();
    this.audioElement.remove();
    if (this.mediaRecorder && this.mediaRecorder.stream) {
        this.mediaRecorder.stream.getTracks()[0].stop();
    }
    SoundRecorderDialogMorph.uber.destroy.call(this);
};
