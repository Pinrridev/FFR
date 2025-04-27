// =============================================================================
// Knight Engine Plugins - Knight Editor
// KNT_Editor.js
// =============================================================================

//=============================================================================
/*:
 * @plugindesc v1.4 A Point-and-click UI written for Yanfly's Doodads plugin.
 * @version 1.4
 * @author Kaelan
 *
 * @param ---General---
 * @default
 *
 * @param Editor Toggle Key
 * @parent ---General---
 * @desc Key used to toggle the editor. F10 by default.
 * @type text
 * @default F10
 *
 * @param Doodad Selection Effect
 * @parent ---General---
 * @desc How should the editor highlight the currently selected doodad?
 * @type select
 * @option No Change
 * @option Outline (Red)
 * @option Outline (Black)
 * @option Increase Brightness
 * @option Increase Contrast
 * @default Increase Brightness
 *
 * @param ---Font---
 * @default
 *
 * @param Editor
 * @parent ---Font---
 * @desc The font used in the toolbar & doodad selection windows.
 * @type text
 * @default GameFont
 *
 * @param Edit Panel
 * @parent ---Font---
 * @desc The font used in the Doodad Edit Panel.
 * @type text
 * @default GameFont
 *
 * @param ---Sliders---
 * @default
 * 
 * @param Anchor
 * @parent ---Sliders---
 * @default
 * 
 * @param Anchor Min
 * @text Min
 * @parent Anchor
 * @desc Anchor minimum value.
 * @type number
 * @default 0
 * @max 1000
 * @min -1000
 * 
 * @param Anchor Max
 * @text Max
 * @parent Anchor
 * @desc Anchor max value.
 * @type number
 * @default 1
 * @max 1000
 * @min -1000
 * 
 * @param Anchor Step
 * @text Step
 * @parent Anchor
 * @desc Increment used when changing the value. Sliders snap to multiples of this.
 * @type number
 * @default 0.1
 * @decimals 1
 * @max 1000
 * @min -1000
 * 
 * @param Scale
 * @parent ---Sliders---
 * @default
 * 
 * @param Scale Min
 * @text Min
 * @parent Scale
 * @desc Scale minimum value.
 * @type number
 * @default -10
 * @max 1000
 * @min -1000
 * 
 * @param Scale Max
 * @text Max
 * @parent Scale
 * @desc Scale max value.
 * @type number
 * @default 10
 * @max 1000
 * @min -1000
 * 
 * @param Scale Step
 * @text Step
 * @parent Scale
 * @desc Increment used when changing the value. Sliders snap to multiples of this.
 * @type number
 * @default 0.1
 * @decimals 1
 * @max 1000
 * @min -1000
 * 
 * @param Grid Lock
 * @parent ---Sliders---
 * @default
 * 
 * @param Grid Lock Min
 * @text Min
 * @parent Grid Lock
 * @desc Grid Lock minimum value.
 * @type number
 * @default 1
 * 
 * @param Grid Lock Max
 * @text Max
 * @parent Grid Lock
 * @desc Grid Lock max value.
 * @type number
 * @default 240
 * 
 * @param ---SE---
 * @default
 *
 * @param Toggle
 * @parent ---SE---
 * @desc Sound clip played when the editor is toggled.
 * @type file
 * @dir audio/se/
 * @default Book1
 *
 * @param Place
 * @parent ---SE---
 * @desc Sound clip played when a new doodad is placed.
 * @type file
 * @dir audio/se/
 * @default Key
 *
 * @param Minimize
 * @parent ---SE---
 * @desc Sound clip played when the editor is minimized.
 * @type file
 * @dir audio/se/
 * @default Cursor1
 *
 * @param Undo
 * @parent ---SE---
 * @desc Sound clip played when the undo button is used.
 * @type file
 * @dir audio/se/
 * @default Cancel2
 *
 * @param Reset Settings
 * @parent ---SE---
 * @desc Sound clip played when the revert to default button is used.
 * @type file
 * @dir audio/se/
 * @default Cancel2
 *
 * @param Delete
 * @parent ---SE---
 * @desc Sound clip played when the delete button is used.
 * @type file
 * @dir audio/se/
 * @default Cancel2
 *
 * @param Delete All
 * @parent ---SE---
 * @desc Sound clip played when the delete all button is used.
 * @type file
 * @dir audio/se/
 * @default Cancel2
 *
 * @param Save
 * @parent ---SE---
 * @desc Sound clip played when the save button is used.
 * @type file
 * @dir audio/se/
 * @default Save
 *
 * @param Copy
 * @parent ---SE---
 * @desc Sound clip played when the copy button is used.
 * @type file
 * @dir audio/se/
 * @default Decision1
 *
 * @param Region Toggle
 * @parent ---SE---
 * @desc Sound clip played when the region overlay toggle button is used.
 * @type file
 * @dir audio/se/
 * @default Cursor1
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * Provides a point-and-click UI for use with Yanfly's Grid Free Doodads plugin.
 *
 * ============================================================================
 * Usage Requirements
 * ============================================================================
 *
 * For this plugin to work, you must do the following:
 *
 * 1. Install Yanfly's Grid Free Doodads plugin, as per the plugin instructions.
 *    Make sure it works correctly before continuing.
 *
 * 2. Copy the 'gui' folder that comes with this plugin into your project's 'img'
 *    folder.
 *
 * 3. Copy the 'pixi-filters.js' file that comes with this plugin into your
 *    project's '/js/libs' folder.
 *
 * 4. Replace your project's 'index.html' file with the one that comes with this
 *    plugin. Alternatively, if you'd like to keep your current 'index.html' file,
 *    insert the following line inside the <body></body> tag of your index file,
 *    after all other pixi-___.js files:
 *    <script type="text/javascript" src="js/libs/pixi-filters.js"></script>
 *
 * 5. Place this plugin below Yanfly's plugin in your load order and configure
 *    the plugin parameters to your liking.
 *
 * ============================================================================
 * Additional Notes and Restrictions
 * ============================================================================
 *
 * Please note that there are a few differences when using this plugin, when
 * compared to Yanfly's built-in editor:
 *
 * 1. Subfolders are not supported. All doodads must be in a folder of the form
 *    "doodads/category/doodad.png". So, "doodads/Plants/Tree1.png" works, but
 *     not "doodads/Plants/Trees/Tree1.png". In this case, please move the
 *     Tree folder, so it's directly under 'doodads/'.
 *
 * 2. Switches & Party Member Checks from Yanfly's 'Extended Doodads Pack 1'
 *    plugin are currently not supported.
 *
 * ============================================================================
 * Instructions - Controls
 * ============================================================================
 *
 * This plugin changes Yanfly's default Doodad editor to function via mouse
 * point-and-click controls.
 *
 * To place a Doodad, press F10 to open the editor, click on one of the Doodad
 * folders on the bottom right window, then click on the image of any Doodad
 * you'd like to place on the map.
 *
 * With the editor open, the following commands are available:
 *
 *  Editor Toggle (Hotkey: F10)
 *  - Use this to bring up the editor while in Play-Test mode. Press it again
 *    to make the editor disappear.
 *
 *  Map Scroll (Hokeys: W A S D)
 *  - Scrolls the map in the given direction.
 *
 *  Edit Doodad
 *  - When no Doodads are selected, left-click on an existing Doodad to bring up the Doodad
 *    Edit Panel.
 *
 *  Move Doodad
 *  - When no Doodads are selected, click-and-drag an existing Doodad to move it. Alternatively,
 *    you can also click on it, then move it with the arrow keys. Using the arrow keys moves the
 *    Doodad one pixel at a time, for precise placement. Holding Shift while pressing an arrow
 *    key allows for continous movement.
 *
 *  Window Scroll (Hotkey: Mouse Wheel)
 *  - When hovering the mouse over either the Doodad Selection window, or the Doodad Folder window,
 *    use the mouse wheel to scroll the contents of the window, if you have more Doodads or Folders
 *    than the window can display at once.
 *
 *  Import (Hotkey: I)
 *  - Imports Doodads from another map. Helpful when making many similar maps.
 *    Can also be used by clicking on the Import icon on the toolbar.
 *
 *  Minimize (Hotkey: N)
 *  - Hides all of the editor windows, except the toolbar. This is helpful when
 *    trying to place doodads in a part of your map that is behind one of the
 *    editor windows. Can also be used by clicking on the Minimize icon on
 *    the toolbar. Clicking the button again causes windows to re-appear.
 *
 *  Save (Hotkey: Ctrl + S)
 *  - Save your current doodad settings to your Doodads.json file. Can also be
 *    used by clicking on the Save icon on the toolbar.
 *
 *  Undo (Hokey: Ctrl + Z)
 *  - Reverses the most recent change. This can also reverse the effects of the
 *    'Delete', 'Delete All' and 'Import' buttons. The editor only keeps track
 *    of a single change at a time - pressing the button multiple times has no
 *    effect. Can also be used by clicking the Undo icon on the toolbar.
 *
 *  Delete All
 *  - Deletes all Doodads on the map. Can only be used by clicking the Delete All
 *    icon on the toolbar. There's no hotkey for this for safety reasons. If
 *    you accidentally press the Delete All button, you can bring your Doodads
 *    back by pressing Undo (Ctrl + Z).
 *
 *  Toggle Region Overlay (Hotkey: R)
 *  - Toggles the region ovelay on or off. This is the same as Yanfly's. Can also
 *    be used by clicking the Region icon on the toolbar.
 *
 * Additionally, the following commands can be used when you have a Doodad selected:
 *
 *  Place Doodad
 *  - With a Doodad on your cursor, left-click on the map to place it.
 *
 *  Cancel Doodad Placement
 *  - With a Doodad on your cursor, right-click to unselect it.
 *
 *  Revert to Default Settings (Hotkey: Backspace)
 *  - Restores the default settings for the selected Doodad. Can also be used by clicking
 *    on the Revert icon on the top-right corner of the Doodad Edit Panel.
 *
 *  Copy Doodad (Hotkey: C)
 *  - Makes a copy of the currently selected Doodad and places it on your mouse cursor,
 *    so you can place more of them on the map. Useful if you want to place a Doodad, spend
 *    time tweaking it, then make many copies of it. Can also be used by clicking on the
 *    Copy icon on the top-right corner of the Doodad Edit Panel.
 *
 *  Delete Doodad (Hotkey: Del)
 *  - Deletes the currently selected Doodad. Can also be used by clicking on the Delete icon
 *    on the top-right corner of the Doodad Edit Panel.
 *
 *  Change Layer (Hotkey: Mouse Wheel)
 *  - Scroll the mouse wheel up or down to change the layer of the currently selected Doodad.
 *    This is the same as moving the Layer slider in the Doodad Edit Panel.
 *
 *  Change Opacity (Hotkey: Number Keys)
 *  - Number keys from 1 to 0 will change the currently selected Doodad's opacity. '1' sets opacity
 *    to 0 (fully transparent), while '0' sets it to 255 (fully visible).
 *
 *  Change Scale (Hotkey: Z/X)
 *  - X increases the currently selected Doodad's size by the step value (default: 0.1, i.e.: +10%), 
 *    while Z decreases it by the same amount. Both X and Y scale are changed together. Holding Shift
 *    while pressing Z/X will change the scale 10x faster.
 * 
 *  Rotate (Hotkey: Q/E)
 *  - E rotates the currently selected Doodad's clockwise, while Q rotates it counter-clockwise.
 *    Holding Shift while pressing Q/E will rotate it faster.
 * 
 *  Toggle Grid Lock Mode (Hotkey: G)
 *  - Toggles whether Doodads should be moved freely or along grid tiles. You can adjust the size
 *    of the grid in the Doodad Edit Panel. This is the same as clicking the Grid Lock box in
 *    the Doodad Edit Panel.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * The 'Grid Free Doodads' plugin was originally written by Yanfly:
 * http://www.yanfly.moe/wiki/Grid-Free_Doodads_(YEP)
 *
 * Icons used under the free licence from:
 * https://icons8.com
 *
 * pixi-filters is provided under the MIT license:
 * https://github.com/pixijs/pixi-filters/blob/master/LICENSE
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 * This plugin may be freely used in any free or commercial project. You are
 * free to modify or distribute this plugin, as long you credit the original
 * author when doing so.
 *
 * If you use this plguin to develop your project, credits are appreciated but
 * not required.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.4:
 * - Added another fix for a variety of plugins that mess with MV's input handling.
 *   Input-based conflicts should be impossible now.
 * - Added support for rotation
 * - Added support for user-defined slider min/max/step values.
 * 
 * Version 1.31:
 * - Added a fix for event test mode.
 * 
 * Version 1.3:
 * - Added keyboard support to Switch and Party Member conditional selection
 *   fields, with autocomplete and  full support for multi-languge typing and
 *   UTF-8.
 * 
 * Version 1.21:
 * - Moved Window_Extension initialization code to avoid conflicts with some
 *   Yanfly plugins.
 * 
 * Version 1.20:
 * - Added compatibility for UltraMode7
 * - Added compatibility for DragonBones. Load this plugin after DragonBones.
 * - Fixed a bug when using arrow keys to move Doodads in large maps
 * - Fixed a crash when Undo removes the currently selected doodad
 *
 * Version 1.10:
 * - Added support for switches and party member checks from YEP_X_ExtDoodadPack1
 * - Fixed a bug in original YEP code when a Doodad is loaded requiring a switch
 *   or party member that no longer exists in the database.
 * - Fixed an issue with Doodad position outside Test Play mode.
 *
 * Version 1.00:
 * - First Version!
 */

var Imported = Imported || {}; // eslint-disable-line no-var
Imported.KNT_Editor = '1.4';

if (!Imported.YEP_GridFreeDoodads) {
    alert('Error: Knight Object Editor requires YEP_GridFreeDoodads to work.');
    throw new Error('Error: Knight Object Editor requires YEP_GridFreeDoodads to work.');
}

var Knight = Knight || {}; // eslint-disable-line no-var
Knight.EDITOR = Knight.EDITOR || {};
Knight.INPUT = Knight.INPUT || {};
Knight.Editor = Knight.Editor || {};

//=============================================================================
// Parameter Variables
//=============================================================================
Knight.Parameters = PluginManager.parameters('KNT_Editor');
Knight.Param = Knight.Param || {};

Knight.Param.KEFilterType = String(Knight.Parameters['Doodad Selection Effect']);
Knight.Param.KEFont = String(Knight.Parameters['Editor']);
Knight.Param.KEPanelFont = String(Knight.Parameters['Edit Panel']);
Knight.Param.KEToggleKey = String(Knight.Parameters['Editor Toggle Key']).toLowerCase();
Knight.Param.KEToggleKeyCode = null;

Knight.Param.KESEToggle = String(Knight.Parameters['Toggle']);
Knight.Param.KESEPlace = String(Knight.Parameters['Place']);
Knight.Param.KESEMinimize = String(Knight.Parameters['Minimize']);
Knight.Param.KESEUndo = String(Knight.Parameters['Undo']);
Knight.Param.KESEReset = String(Knight.Parameters['Reset Settings']);
Knight.Param.KESEDelete = String(Knight.Parameters['Delete']);
Knight.Param.KESEClear = String(Knight.Parameters['Delete All']);
Knight.Param.KESESave = String(Knight.Parameters['Save']);
Knight.Param.KESECopy = String(Knight.Parameters['Copy']);
Knight.Param.KESERegion = String(Knight.Parameters['Region Toggle']);

Knight.Param.KEAnchorMin = Number(Knight.Parameters['Anchor Min']);
Knight.Param.KEAnchorMax = Number(Knight.Parameters['Anchor Max']);
if (Knight.Param.KEAnchorMin >= Knight.Param.KEAnchorMax ||
    Knight.Param.KEAnchorMax <= Knight.Param.KEAnchorMin) {
    Knight.Param.KEAnchorMin = 0;
    Knight.Param.KEAnchorMax = 1;
}

Knight.Param.KEAnchorStep = Number(Knight.Parameters['Anchor Step']);
if (Knight.Param.KEAnchorStep <= 0 ||
    Knight.Param.KEAnchorStep >= Knight.Param.KEAnchorMax - Knight.Param.KEAnchorMin) {
    Knight.Param.KEAnchorStep = (Knight.Param.KEAnchorMax - Knight.Param.KEAnchorMin) / 10;
}

Knight.Param.KEScaleMin = Number(Knight.Parameters['Scale Min']);
Knight.Param.KEScaleMax = Number(Knight.Parameters['Scale Max']);
if (Knight.Param.KEScaleMin >= Knight.Param.KEScaleMax ||
    Knight.Param.KEScaleMax <= Knight.Param.KEScaleMin) {
    Knight.Param.KEScaleMin = -10;
    Knight.Param.KEScaleMax = 10;
}

Knight.Param.KEScaleStep = Number(Knight.Parameters['Scale Step']);
if (Knight.Param.KEScaleStep <= 0 ||
    Knight.Param.KEScaleStep >= Knight.Param.KEScaleMax - Knight.Param.KEScaleMin) {
    Knight.Param.KEScaleStep = 0.1;
}

Knight.Param.KEGridLockMin = Number(Knight.Parameters['Grid Lock Min']);
Knight.Param.KEGridLockMax = Number(Knight.Parameters['Grid Lock Max']);
if (Knight.Param.KEGridLockMin < 1)
    Knight.Param.KEGridLockMin = 1;
if (Knight.Param.KEGridLockMin >= Knight.Param.KEGridLockMax ||
    Knight.Param.KEGridLockMax <= Knight.Param.KEGridLockMin) {
    Knight.Param.KEGridLockMin = 1;
    Knight.Param.KEGridLockMax = 240;
}

//=============================================================================
// Utility Functions
//=============================================================================
Knight.Editor.isActive = function() {
    return SceneManager.sceneIs(Scene_Map) &&
        SceneManager._scene._editor &&
        SceneManager._scene._editor.active();
};

Knight.EDITOR.isTestPlay = function() {
    return Utils.isNwjs() && Utils.isOptionValid('test') && !DataManager.isEventTest();
};

//=============================================================================
// SceneManager
//=============================================================================
SceneManager.sceneIs = function(sceneClass) {
    return this._scene && this._scene.constructor === sceneClass;
};

//=============================================================================
// TouchInput
// - Add a version of isLongPressed that takes the wait as a parameter
// - Update TouchInput x/y when mouse moves
// - Fix the mouse wheel preventDefault bug in Chrome.
//=============================================================================
TouchInput.isLongPressedFor = function(keyRepeatWait) {
    return this.isPressed() && this._pressedTime >= keyRepeatWait;
};

Knight.EDITOR.TouchInput_onMouseMove = TouchInput._onMouseMove;
TouchInput._onMouseMove = function(event) {
    Knight.EDITOR.TouchInput_onMouseMove.call(this, event);
    if (!this._mousePressed) {
        const x = Graphics.pageToCanvasX(event.pageX);
        const y = Graphics.pageToCanvasY(event.pageY);
        this._onMove(x, y);
    }
};

TouchInput._setupEventHandlers = function() {
    var isSupportPassive = Utils.isSupportPassiveEvent(); /* eslint-disable-line no-var */
    document.addEventListener('mousedown', this._onMouseDown.bind(this));
    document.addEventListener('mousemove', this._onMouseMove.bind(this));
    document.addEventListener('mouseup', this._onMouseUp.bind(this));
    document.addEventListener('wheel', this._onWheel.bind(this), isSupportPassive ? {passive: false} : false);
    document.addEventListener('touchstart', this._onTouchStart.bind(this), isSupportPassive ? {passive: false} : false);
    document.addEventListener('touchmove', this._onTouchMove.bind(this), isSupportPassive ? {passive: false} : false);
    document.addEventListener('touchend', this._onTouchEnd.bind(this));
    document.addEventListener('touchcancel', this._onTouchCancel.bind(this));
    document.addEventListener('pointerdown', this._onPointerDown.bind(this));
};

//=============================================================================
// Yanfly Overwrites
//=============================================================================
Sprite_Doodad.prototype.initData = function() {
    if (this._data.scaleX > 10 || this._data.scaleX < -10) this._data.scaleX /= 100;
    if (this._data.scaleY > 10 || this._data.scaleY < -10) this._data.scaleY /= 100;
    this._data.toneRed = this._data.toneRed || 0;
    this._data.toneGreen = this._data.toneGreen || 0;
    this._data.toneBlue = this._data.toneBlue || 0;
    this._data.toneGrey = this._data.toneGrey || 0;
    this._currentCount = 0;
    this.x = this._data.x;
    this.y = this._data.y;
    this.z = this._data.z;
    this._iconIndex = this._data.iconIndex || 0;
    this._xFrames = this._data.xFrames || 1;
    this._yFrames = this._data.yFrames || 1;
    this._index = this._xFrames * this._yFrames - 1;
    this._frameUpdate = this._data.frameUpdate || 15;
    this.anchor.x = this._data.anchorX;
    this.anchor.y = this._data.anchorY;
    this.scale.x = this._data.scaleX;
    this.scale.y = this._data.scaleY;
    if (this.scale.x <= 0) {
        if (this.anchor.x === 0) {
            this.anchor.x = 1;
        } else if (this.anchor.x === 1) {
            this.anchor.x = 0;
        }
    }
    if (this.scale.y <= 0) {
        if (this.anchor.y === 0) {
            this.anchor.y = 1;
        } else if (this.anchor.y === 1) {
            this.anchor.y = 0;
        }
    }
    this.rotation = this._data.rotation || 0;
    this.blendMode = this._data.blend || 0;
    this.opacity = this._data.opacity || 0;
    const folder = this._data.folder || '';
    const path = folder + this._data.bitmap;
    this.bitmap = ImageManager.loadDoodad(path, 0, this._data.smooth || false);
    const toneRed = this._data.toneRed;
    const toneGreen = this._data.toneGreen;
    const toneBlue = this._data.toneBlue;
    const toneGrey = this._data.toneGrey;
    this.setColorTone([toneRed, toneGreen, toneBlue, toneGrey]);
    this.updatePosition();
    this.mode7Adjustment();
    this.updateFrame();
    this.initSwitches();
    this._loadedData = true;
};

Sprite_Doodad.prototype.initSwitches = function() {
    if (Imported.YEP_X_ExtDoodadPack1) {
        // Fix a bug with Yanfly's original code: When a switch or actor requirement is saved to Doodad data,
        // then later removed from the Database, the Doodad will continue checking for it even though it no
        // longer exists, causing the check to always fail but not allowing you to change Doodad settings via
        // menus. To fix, filter for valid switches/actorIDs on load.
        this.switchOn = this._data.switchOn ? this._data.switchOn.filter((id) => id < $dataSystem.switches.length) : [];
        this.switchOff = this._data.switchOff ? this._data.switchOff.filter((id) => id < $dataSystem.switches.length) : [];
        this.partyHave = this._data.partyHave ? this._data.partyHave.filter((id) => id < $dataActors.length) : [];
        this.partyMiss = this._data.partyMiss ? this._data.partyMiss.filter((id) => id < $dataActors.length) : [];
    }
};

Sprite_Doodad.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    this.updatePosition();
    this.mode7Adjustment();
    if (!this._loadedData) return;
    this.updateCustomA();
    this.updateFrame();
    this.updateCustomZ();
    if (!this._loadedData) return;
    this.updateSwitches();
};

Sprite_Doodad.prototype.updateSwitches = function() {
    if (Imported.YEP_X_ExtDoodadPack1 && !Knight.Editor.isActive()) {
        this.updateCustomEDP1Z();
    }
};

Sprite_Doodad.prototype.mode7Adjustment = function() {
    if (Imported.Blizzard_UltraMode7) {
		const scale = this.screenScale();
		this.scale.x = scale * this._data.scaleX;
		this.scale.y = scale * this._data.scaleY;
    }
};

//=============================================================================
// Spriteset_Map
//=============================================================================
Spriteset_Map.prototype.doodads = function() {
    return this._doodads;
};

// =============================================================================
// Dependencies
// =============================================================================
if (Knight.EDITOR.isTestPlay()) {
    // =============================================================================
    // Resource Manager
    // =============================================================================
    var Imported = Imported || {}; // eslint-disable-line no-var
    if (!Imported.KNT_ResourceManager) {
        var Knight = Knight || {}; // eslint-disable-line no-var
        Knight.RM = Knight.RM || {};

        //=============================================================================
        // Parameter Variables
        //=============================================================================
        Knight.Param = Knight.Param || {};
        Knight.Param.Menu = Knight.Param.Menu || {};
        Knight.Param.Menu.ImageFolder = "img/gui/";

        //=============================================================================
        // Utility Functions
        //=============================================================================
        Knight.Util = Knight.Util || {};
        Knight.Util.getFilesInFolder = function(folder) {
            if (folder === '') return [];
            const fs = require('fs');
            const results = [];
            const njsPath = require('path');
            const base = njsPath.dirname(process.mainModule.filename);
            const path = njsPath.join(base, folder);
            fs.readdirSync(path).forEach(function(file) {
                name = file;
                file = path + '/' + name;
                const stat = fs.statSync(file);
                if (stat && stat.isDirectory()) {
                    // Do nothing
                } else if (name.match(/.png/g)) {
                    name = name.replace(/.png/g, '');
                    results.push({dir: folder, name: name});
                }
            });
            return results;
        };

        //=============================================================================
        // Resources
        //=============================================================================
        Knight.Preload = Knight.Preload || {};
        Knight.Preload.MenuFiles = Knight.Util.getFilesInFolder(Knight.Param.Menu.ImageFolder);

        //=============================================================================
        // Preloading
        //=============================================================================
        Knight.RM.Scene_Boot_initialize = Scene_Boot.prototype.initialize;
        Scene_Boot.prototype.initialize = function() {
            Knight.RM.preloadMenu();
            Knight.RM.Scene_Boot_initialize.call(this);
        };

        Knight.RM.preloadMenu = function() {
            const files = Knight.Preload.MenuFiles;
            for (file of files) {
                ImageManager.reserveBitmap(file.dir, file.name, null, false, ImageManager._systemReservationId);
            }
        };

        ImageManager.loadGui = function(filename, hue) {
            return this.loadBitmap(Knight.Param.Menu.ImageFolder, filename, hue, false);
        };
    };

    // =============================================================================
    // Knight.COLOR
    // =============================================================================
    /* eslint-disable key-spacing */
    if (!Knight.COLOR) {
        Knight.COLOR = {
            WHITE:          '#ffffff',
            LIGHT:          '#fefefe',
            GREY:           '#A9A8A9',
            MID_GREY:       '#343232',
            DARK_GREY:      '#282729',
            NIGHT:          '#222222',
            DARK:           '#111111',
            BLACK:          '#000000',

            BROWN:          '#a58b76',
            SEPIA:          '#e4cbb7',
            ROSE:           '#c85c5c',
            DARK_ROSE:      '#963232',

            PASTEL_GREEN:   '#a3d39c',
            LIGHT_GREEN:    '#7fff7f',
            GREEN:          '#00a651',
            DARK_GREEN:     '#32965e',
            AQUA:           '#00a99d',
            LIGHT_BLUE:     '#00bff3',
            PASTEL_BLUE:    '#0072bc',
            NAVY_BLUE:      '#0054a6',
            DARK_BLUE:      '#325396',
            BLUE:           '#0000ff',

            YELLOW:         '#fff200',
            DARK_YELLOW:    '#ffd800',
            LIGHT_ORANGE:   '#f7941d',
            ORANGE:         '#ff7f00',
            DARK_ORANGE:    '#ff4000',
            RED:            '#ff0000',
            IMPERIAL_RED:   '#ed1c24',
            BLOOD_RED:      '#bf0000',
            BRIGHT_PINK:    '#ed145b',
            LIGHT_PINK:     '#f06eaa',
            HOT_PINK:       '#ff00d8',
            PINK:           '#ff00ff',
            PASTEL_PURPLE:  '#a864a8',
        };
    }
    /* eslint-enable key-spacing */

    //=============================================================================
    // Support for HTML input fields
    //=============================================================================
    // Inject our CSS into the document
    (function(){
        const style = `
            .knight-editor-input-form {
                /* Make the text box render above the game */
                position: absolute;
                z-index:999;
                
                /* Font settings, set to mirror the in-game editor */ 
                font-size: 16px; /* Must be in px */
                font-weight: normal; 
                font-family: ${Knight.Param.KEPanelFont};
                color: #f8f8f8;

                /* Text box settings. Width and height must be in em. */ 
                width : 15.2em;
                height : 1.5em;
                border:solid 1px ${Knight.COLOR.MID_GREY};
                background: ${Knight.COLOR.BLACK};
            }`;
        const styleSheet = document.createElement("style")
        styleSheet.type = "text/css"
        styleSheet.innerText = style
        document.head.appendChild(styleSheet)
    })();

    // Add function to reposition HTML elements and adjust font size
    HTMLElement.prototype.positionAdjust = function(screenPos, targetPos) {
        if (this.defaultFontSize == null) {
            const elem = window.getComputedStyle(document.getElementById(this.id), null);
            this.defaultFontSize = parseInt(elem['font-size']) || 24;
        }
        // set width by scale
        const scale = Graphics._realScale;
        this.style.left = Math.floor(screenPos['x'] + targetPos['x'] * scale) + 'px';
        this.style.top  = Math.floor(screenPos['y'] + targetPos['y'] * scale) + 'px';
        this.style['font-size'] = Math.floor(this.defaultFontSize * scale) + 'px';
    };

    // =============================================================================
    // KNT_Window
    // =============================================================================
    if (!Knight.WINDOW) {
        var Knight = Knight || {}; // eslint-disable-line no-var
        Knight.WINDOW = Knight.WINDOW || {};

        //=============================================================================
        // Initiailize logic can't be directly added via Window_Extension, so we have to
        // make a minor modification so it's called from Window_Base.
        //=============================================================================
        Knight.WINDOW.Base_Window_Base_initialize = Window_Base.prototype.initialize;
        Window_Base.prototype.initialize = function(...arguments) {
            Knight.WINDOW.Base_Window_Base_initialize.call(this, ...arguments);
            this.windowExtensionInitialize();
        };

        // Does nothing in normal RM windows
        // Initializes values in Knight.Window_Extension windows
        Window_Base.prototype.windowExtensionInitialize = function() {
        };

        Window_Base.prototype.maxItems = function() {
            return this._data ? this._data.length : 0;
        };

        Window_Base.prototype.item = function() {
            const index = this.index();
            return this._data && index >= 0 ? this._data[index] : null;
        };

        //=============================================================================
        // New class for holding Knight changes to default Window behavior
        //=============================================================================
        Knight.Window_Extension = function(...arguments) {
            this.initialize(...arguments);
        };
        Knight.Window_Extension.prototype = Object.create(Object.prototype);
        Knight.Window_Extension.prototype.constructor = Knight.Window_Extension;

        Knight.Window_Extension.prototype.windowExtensionInitialize = function() {
            this._handlers = {};
            this._index = -1;
            this._rects = [];
            this._data = null;
            this._enabled = true;
            this._useMouseInput = false;
        };

        //=============================================================================
        // Override old methods for better default behavior
        //=============================================================================
        // remove drawing of window background
        Knight.Window_Extension.prototype._refreshBack = function() {
        };

        // remove drawing of window frame
        Knight.Window_Extension.prototype._refreshFrame = function() {
        };

        // remove drawing of window cursor
        Knight.Window_Extension.prototype._refreshCursor = function() {
        };

        // remove window border padding so contents size matches window size
        Knight.Window_Extension.prototype.standardPadding = function() {
            return 0;
        };

        // reduce text margin
        Knight.Window_Extension.prototype.textPadding = function() {
            return 4;
        };

        Knight.Window_Extension.prototype.standardBackOpacity = function() {
            return 0;
        };

        // decouple default font face definition for easier modification by subclasses
        Knight.Window_Extension.prototype.standardFontFace = function() {
            if ($gameSystem.isChinese()) {
                return 'SimHei, Heiti TC, sans-serif';
            } else if ($gameSystem.isKorean()) {
                return 'Dotum, AppleGothic, sans-serif';
            } else {
                return this.menuFontFace();
            }
        };

        Knight.Window_Extension.prototype.standardFontSize = function() {
            return 16;
        };

        // turn off text outline by default
        Knight.Window_Extension.prototype.resetFontSettings = function() {
            Window_Base.prototype.resetFontSettings.call(this);
            this.contents.outlineWidth = 0;
            this.contents.fontBold = false;
        };

        // add callback handler logic to every window
        Knight.Window_Extension.prototype.setHandler = function(symbol, method) {
            this._handlers[symbol] = method;
        };

        Knight.Window_Extension.prototype.isHandled = function(symbol) {
            return !!this._handlers[symbol];
        };

        Knight.Window_Extension.prototype.callHandler = function(symbol) {
            if (this.isHandled(symbol)) {
                this._handlers[symbol](this);
            }
        };

        Knight.Window_Extension.prototype.show = function() {
            this.visible = true;
        };

        Knight.Window_Extension.prototype.hide = function() {
            this.visible = false;
        };

        Knight.Window_Extension.prototype.enabled = function() {
            return this._enabled;
        };

        Knight.Window_Extension.prototype.enable = function() {
            this._enabled = true;
        };

        Knight.Window_Extension.prototype.disable = function() {
            this._enabled = false;
        };

        // Counterpart to isOpenAndActive()
        // The active flag is not relevant when primarily using mouse input
        Knight.Window_Extension.prototype.isOpenAndEnabled = function() {
            return this.isOpen() && this.enabled();
        };

        Knight.Window_Extension.prototype.index = function() {
            return this._index;
        };

        Knight.Window_Extension.prototype.itemRect = function(index) {
            const rect = new Rectangle();
            const maxCols = this.maxCols();
            rect.width = this.itemWidth();
            rect.height = this.itemHeight();
            rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
            rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
            return rect;
        };

        // Cache item rects so they don't need to be reallocated every frame
        Knight.Window_Extension.prototype.makeItemRects = function() {
            this._rects = [];
            for (let i = 0; i < this.maxItems(); i++) {
                this._rects.push(this.itemRect(i));
            }
        };

        Knight.Window_Extension.prototype.getItemRect = function(index) {
            return this._rects[index];
        };

        Knight.Window_Extension.prototype.select = function(index) {
            this._index = index;
        };

        //=============================================================================
        // Mouse Input Handling
        //=============================================================================
        Knight.Window_Extension.prototype.update = function() {
            Window_Base.prototype.update.call(this);
            if (this._useMouseInput) this.processHover();
        };

        Knight.Window_Extension.prototype.isMouseInsideFrame = function() {
            const x = this.canvasToLocalX(TouchInput.x);
            const y = this.canvasToLocalY(TouchInput.y);
            return x >= 0 && y >= 0 && x < this.width && y < this.height;
        };

        Knight.Window_Extension.prototype.isMouseInsideRect = function(x, y, rect) {
            return x >= rect.x && y >= rect.y && x < (rect.x + rect.width) && y < (rect.y + rect.height);
        };

        Knight.Window_Extension.prototype.processHover = function() {
            if (this.isOpenAndEnabled()) {
                let mouseOverIndex = null;
                if (this.isMouseInsideFrame()) {
                    const x = this.canvasToLocalX(TouchInput.x);
                    const y = this.canvasToLocalY(TouchInput.y);
                    const topIndex = this.topIndex();
                    for (let i = 0; i < this.maxPageItems(); i++) {
                        const index = topIndex + i;
                        if (index < this.maxItems()) {
                            const rect = this.getItemRect(index);
                            if (this.isMouseInsideRect(x, y, rect)) {
                                mouseOverIndex = index;
                                break;
                            }
                        }
                    }
                }
                this.onHover(mouseOverIndex);
            }
        };

        Knight.Window_Extension.prototype.onHover = function(index) {
            const lastIndex = this.index();
            if (index !== null) {
                this.select(index);
                if (this.isHandled('ok') && TouchInput.isReleased()) {
                    this.processOk();
                }
                if (this.isHandled('cancel') && TouchInput.isCancelled()) {
                    this.processCancel();
                }
            } else {
                this.select(-1);
            }
            if (this.index() !== lastIndex && this.index() >= 0) {
                this.playCursorSound();
            }
        };

        Knight.Window_Extension.prototype.playCursorSound = function() {
            SoundManager.playCursor();
        };

        Knight.Window_Extension.prototype.processOk = function() {
            this.playOkSound();
            this.updateInputData();
            this.callHandler('ok');
        };

        Knight.Window_Extension.prototype.processCancel = function() {
            this.playCancelSound();
            this.updateInputData();
            this.callHandler('cancel');
        };

        Knight.Window_Extension.prototype.playOkSound = function() {
            SoundManager.playOk();
        };

        Knight.Window_Extension.prototype.playCancelSound = function() {
            SoundManager.playCancel();
        };

        Knight.Window_Extension.prototype.updateInputData = function() {
            Input.update();
            TouchInput.update();
        };

        Knight.Window_Extension.prototype.processWheel = function() {
            if (this.isOpenAndEnabled() && this.isMouseInsideFrame()) {
                const threshold = 20;
                if (TouchInput.wheelY >= threshold) {
                    this.scrollDown();
                    this.updateInputData();
                }
                if (TouchInput.wheelY <= -threshold) {
                    this.scrollUp();
                    this.updateInputData();
                }
            }
        };

        //=============================================================================
        // Utility Methods
        //=============================================================================
        Knight.Window_Extension.prototype.menuFontFace = function() {
            return Knight.Param.KEFont;
        };

        Knight.Window_Extension.prototype.drawGui = function(name, x, y, dw = null, dh = null) {
            const bitmap = ImageManager.loadGui(name);
            dw = dw || bitmap.width;
            dh = dh || bitmap.height;
            this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, dw, dh);
        };

        // Like Window_Base.drawGauge() but using images instead of flat colors, for better looking gauges
        Knight.Window_Extension.prototype.drawImageGauge = function(x, y, rate, backImg, frontImg, reverseFill = false) {
            if (rate >= 0) {
                const backBitmap = ImageManager.loadGui(backImg);
                this.drawGui(backImg, x, y);
                if (rate !== 0) {
                    const dw = backBitmap.width * rate;
                    if (reverseFill) { // Fills right-to-left instead of left-to-right
                        const xoffset = backBitmap.width - dw;
                        const frontBitmap = ImageManager.loadGui(frontImg);
                        this.contents.blt(frontBitmap, xoffset, 0, dw, frontBitmap.height, x + xoffset, y, dw, frontBitmap.height);
                    } else {
                        this.drawGui(frontImg, x, y, dw);
                    }
                }
            }
        };

        // Adds child windows to the scene. Should be overriden by child classes
        // which contain their own internal windows.
        Knight.Window_Extension.prototype.addChildrenToScene = function(scene) {
        };

        //=============================================================================
        // Window_Base
        //-----------------------------------------------------------------------------
        // Add extensions to Window_Base
        //=============================================================================
        Knight.Window_Base = function(...arguments) {
            this.initialize(...arguments);
        };
        Knight.Window_Base.prototype = Object.create(Window_Base.prototype);
        Object.assign(Knight.Window_Base.prototype, Knight.Window_Extension.prototype);
        Knight.Window_Base.prototype.constructor = Knight.Window_Base;

        //=============================================================================
        // Window_Selectable
        //-----------------------------------------------------------------------------
        // Add extensions to Window_Selectable
        //=============================================================================
        Knight.Window_Selectable = function(...arguments) {
            this.initialize(...arguments);
        };
        Knight.Window_Selectable.prototype = Object.create(Window_Selectable.prototype);
        Object.assign(Knight.Window_Selectable.prototype, Knight.Window_Extension.prototype);
        Knight.Window_Selectable.prototype.constructor = Knight.Window_Selectable;

        Knight.WINDOW.Window_Selectable_update = Knight.Window_Selectable.prototype.update;
        Knight.Window_Selectable.prototype.update = function() {
            Knight.WINDOW.Window_Selectable_update.call(this);
            this.processWheel();
        };

        //=============================================================================
        // Window_ItemList
        //-----------------------------------------------------------------------------
        // Add extensions to Window_ItemList
        //=============================================================================
        Knight.Window_ItemList = function(...arguments) {
            this.initialize(...arguments);
        };
        Knight.Window_ItemList.prototype = Object.create(Window_ItemList.prototype);
        Object.assign(Knight.Window_ItemList.prototype, Knight.Window_Extension.prototype);
        Knight.Window_ItemList.prototype.constructor = Knight.Window_ItemList;

        Knight.WINDOW.Window_ItemList_update = Knight.Window_ItemList.prototype.update;
        Knight.Window_ItemList.prototype.update = function() {
            Knight.WINDOW.Window_ItemList_update.call(this);
            this.processWheel();
        };

        //=============================================================================
        // Window_Command
        //-----------------------------------------------------------------------------
        // Add extensions to Window_Command
        //=============================================================================
        Knight.Window_Command = function(...arguments) {
            this.initialize(...arguments);
        };
        Knight.Window_Command.prototype = Object.create(Window_Command.prototype);
        Object.assign(Knight.Window_Command.prototype, Knight.Window_Extension.prototype);
        Knight.Window_Command.prototype.constructor = Knight.Window_Command;

        //=============================================================================
        // Window_HorzCommand
        //-----------------------------------------------------------------------------
        // Add extensions to Window_HorzCommand
        //=============================================================================
        Knight.Window_HorzCommand = function(...arguments) {
            this.initialize(...arguments);
        };
        Knight.Window_HorzCommand.prototype = Object.create(Window_HorzCommand.prototype);
        Object.assign(Knight.Window_HorzCommand.prototype, Knight.Window_Extension.prototype);
        Knight.Window_HorzCommand.prototype.constructor = Knight.Window_HorzCommand;

        //=============================================================================
        // WindowLayer
        //-----------------------------------------------------------------------------
        // Reverse update order so overlapping windows handle input correctly. Normally,
        // MV both renders and updates windows in order. That means that windows at the
        // end of the windowLayer draw on top, but windows at the top handle input first.
        // By updating them in reverse order, windows that are drawn on top will handle
        // input first.
        //=============================================================================
        WindowLayer.prototype.update = function() {
            let i = this.children.length;
            while (i--) {
                if (this.children[i].update) {
                    this.children[i].update();
                }
            }
        };
    }
    // =============================================================================
    // KNT_Button
    // =============================================================================
    if (!Knight.Button) {
        var Knight = Knight || {}; // eslint-disable-line no-var
        /**
         * Window representing a clickable button.
         *
         * @class Knight.Button
         * @extends {Knight.Window_Base}
         */
        Knight.Button = class extends Knight.Window_Base {
            /**
             * Creates an instance of Knight.Button.
             *
             * @param {number} x            Window x coordinate
             * @param {number} y            Window y coordinate
             * @param {string} image        Name of the normal button image
             * @param {string} hoverImage   Name of the image displayed when hovering over the button
             * @param {string} text         Text to display on the button. Can be null.
             * @param {number} forceWidth   Forces the button to be a ceirtain width. If NULL, defaults
             *                              to width of the button image.
             * @param {number} forceHeight  Forces the button to be a ceirtain height. If NULL, defaults
             *                              to height of the button image.
             * @param {String} textAlign    Button text alignment
             */
            constructor(x, y, image, hoverImage, text = null, forceWidth = null, forceHeight = null, textAlign = 'center') {
                const bitmap = ImageManager.loadGui(image);
                const width = forceWidth || bitmap.width;
                const height = forceHeight || bitmap.height;
                super(x, y, width, height);
                this._image = image;
                this._hoverImage = hoverImage;
                this._enabled = true;
                this._isHovering = false;
                this._wasHovering = false;
                this._text = text;
                this._useOnOff = false;
                this._textAlign = textAlign;
                this.refresh();
            }

            /**
             * Buttons controlled by on()/off() ignore enable()/disable()
             */
            enable() {
                if (this._useOnOff) return;
                Knight.Window_Base.prototype.enable.call(this);
            }
            /**
             * Buttons controlled by on()/off() ignore enable()/disable()
             */
            disable() {
                if (this._useOnOff) return;
                Knight.Window_Base.prototype.disable.call(this);
            }

            /**
             * Turn button on. Button only accepts input when on.
             */
            on() {
                this._useOnOff = true;
                this._enabled = true;
                this.refresh();
            }

            /**
             * Turn button off. Button doesn't accept input when off.
             */
            off() {
                this._useOnOff = true;
                this._offImage = this._offImage || (this._image + "_Off");
                this._enabled = false;
                this.refresh();
            }

            /**
             * @return {Boolean}
             */
            isOff() {
                return this._offImage && this._enabled === false;
            }

            /**
             * @return {boolean}    Button state
             */
            value() {
                return this._enabled;
            }

            /**
             * Frame update
             */
            update() {
                Window_Base.prototype.update.call(this);
                this.processHover();
                this.processHandling();
                this.processTouch();
            }

            /**
             * @return {Object} Data contained in the Button. Can be null.
             */
            item() {
                return null;
            }

            /**
             * Handle mouse hovering behavior
             */
            processHover() {
                this._wasHovering = this._isHovering;
                this._isHovering = this.isMouseInsideFrame();
                if (this._isHovering !== this._wasHovering) {
                    this.refresh();
                }
            }

            /**
             * Handle keyboard input
             */
            processHandling() {
                if (this.isOpenAndEnabled()) {
                    if (this.isCancelEnabled() && this.isCancelTriggered()) {
                        this.processCancel();
                    }
                }
            }

            /**
             * Handle mouse input
             */
            processTouch() {
                if (this.isOpenAndEnabled()) {
                    if (TouchInput.isReleased() && this.isMouseInsideFrame()) {
                        this.onTouch();
                    }
                }
            }

            /**
             * Handle mouse click events
             */
            onTouch() {
                if (this.isTouchOkEnabled()) {
                    this.processOk();
                }
            }

            /**
             * @return  {boolean}   Whether mouse input can be handled
             */
            isTouchOkEnabled() {
                return this.isOkEnabled();
            }

            /**
             * @return  {boolean}   Whether mouse input can be handled
             */
            isOkEnabled() {
                return this.isHandled('ok');
            }

            /**
             * @return  {boolean}   True when button is triggered
             */
            isOkTriggered() {
                return Input.isRepeatedKE('ok');
            }

            /**
             * @return  {boolean}   Whether cancel command is handled
             */
            isCancelEnabled() {
                return this.isHandled('cancel');
            }

            /**
             * @return  {boolean}   True when cancel command is triggered
             */
            isCancelTriggered() {
                return Input.isRepeatedKE('cancel');
            }

            /**
             * Behavior executed when button is triggered
             */
            processOk() {
                this.playOkSound();
                this.callHandler('ok');
                this.updateInputData();
            }

            /**
             * Button SE
             */
            playOkSound() {
            };

            /**
             * @param {string} name
             */
            setOkSound(name) {
                this._okSound = name;
            };

            /**
             */
            processCancel() {
                this.callHandler('cancel');
                this.updateInputData();
            }

            /**
             * Redraw button
             */
            refresh() {
                if (this.contents) {
                    this.contents.clear();
                    this.drawContents();
                }
            }

            /**
             */
            drawContents() {
                const image = this.isOff() ? this._offImage : (this._isHovering ? this._hoverImage : this._image);
                this.drawGui(image, 0, 0);
                if (this._text) {
                    this.contents.fontBold = true;
                    this.contents.fontSize = 16;
                    const color = this._isHovering ? Knight.COLOR.GREY : this.normalColor();
                    this.changeTextColor(color);
                    const x = this._textAlign === 'center' ? 0 : 30;
                    const y = (this.contents.height - this.lineHeight()) / 2;
                    this.contents.drawText(this._text, x, y, this.contents.width, this.lineHeight(), this._textAlign);
                }
            }
        };
    }
    // =============================================================================
    // KNT_Checkbox
    // =============================================================================
    if (!Knight.Checkbox) {
        var Knight = Knight || {}; // eslint-disable-line no-var
        /**
         * Window representing a checkbox
         *
         * @class Knight.Checkbox
         * @extends {Knight.Button}
         */
        Knight.Checkbox = class extends Knight.Button {
            /**
             * Creates an instance of Knight.Checkbox.
             *
             * @param {number} x            Window x coordinate
             * @param {number} y            Window y coordinate
             * @param {string} onImage      Image shown when checkbox is 'checked'
             * @param {string} offImage     Image shown when checkbox is not 'checked'
             * @param {string} hoverImage   Image shown when hovering over the checkbox
             * @param {boolean} checked     Default value for 'checked'
             * @param {string} label        Checkbox label text
             */
            constructor(x, y, onImage, offImage, hoverImage = null, checked = true, label = '') {
                super(x, y, onImage, hoverImage);
                this._onImage = onImage;
                this._offImage = offImage;
                this._checked = checked;
                this._label = label;
                this.width = ImageManager.loadGui(onImage).width + this.textWidth(label) + 10;
                this.createContents();
                this.refresh();
            }

            /**
             * Toggle checkbox
             */
            toggle() {
                this._checked = !this._checked;
                this.refresh();
                this.onChange();
            }

            /**
             * Set checkbox to 'checked'
             */
            check() {
                this._checked = true;
                this.refresh();
                this.onChange();
            }

            /**
             * Set checkbox to 'unchecked'
             */
            uncheck() {
                this._checked = false;
                this.refresh();
                this.onChange();
            }

            /**
             * @return {boolean}            Whether checkbox is checked
             */
            checked() {
                return this._checked;
            }

            /**
             * Plays a sound when the checkbox is interacted with.
             */
            playOkSound() {
            };

            /**
             * Frame update
             */
            update() {
                Window_Base.prototype.update.call(this);
                this.processHover();
                this.processTouch();
            }

            /**
             * Handle mouse input
             */
            processTouch() {
                if (this.isOpenAndEnabled()) {
                    if (TouchInput.isReleased() && this.isMouseInsideFrame()) {
                        this.onTouch();
                    }
                }
            }

            /**
             * Handle mouse click events
             */
            onTouch() {
                this.playOkSound();
                this.toggle();
                this.updateInputData();
            }

            /**
             * Called whenever the checkbox value changes
             */
            onChange() {
                if (this.isHandled('onChange')) {
                    this._handlers['onChange'](this._checked, this);
                }
            }

            /**
             * Redraw checkbox
             */
            refresh() {
                if (this.contents && this._onImage) {
                    this.contents.clear();
                    this.drawContents();
                }
            }

            /**
             */
            drawContents() {
                this.changeTextColor(Knight.COLOR.BROWN);
                if (this.checked()) {
                    this.drawGui(this._onImage, 0, 0);
                } else {
                    this.drawGui(this._offImage, 0, 0);
                }
                if (this.isMouseInsideFrame() && this._hoverImage) {
                    this.drawGui(this._hoverImage, 0, 0);
                    this.changeTextColor(Knight.COLOR.SEPIA);
                }
                const drawX = ImageManager.loadGui(this._onImage).width + 10;
                this.contents.drawText(this._label, drawX, 0, this.contents.width, this.contents.height, 'left');
            }
        };
    }

    // =============================================================================
    // Knight.EditorHTMLTextInput
    // =============================================================================
    Knight.EditorHTMLTextInput = class {
        /**
         * Class that creates an instance of an HTML text input field which mimics the
         * Editor's styling. This allows us to take advantage of all the built-in browser
         * features, like Copy/Paste, Autocomplete, Datalists and support for typing in
         * any language.
         * 
         * To avoid issues with conflicting HTML element IDs, you must provide a unique
         * string ID when creating this class. The easiest way to do this is by calling
         * Date.now().toString().
         *
         * @param {String} id               ID used to create the internal HTML elements. Must be unique.
         * @param {Array[String]} data      List of fields to feed the autocomplete. Can be null.
         * @param {number} x                Window x coordinate
         * @param {number} y                Window y coordinate
         * @param {number} w                Text box width, in em.
         */
        constructor(id, data = null, x = 0, y = 0, width = null) {
            this.id = id;
            this.input = null;
            this.data = data;
            this.x = x;
            this.y = y;
            this.width = width;
            this._handlers = {};
            this.create();
            this.screenAdjust();
            this.addEventListeners();
        }

        /**
         * @param {String} symbol       Name of the command to be handled
         * @param {Function} method     Function that will be called to handle the command when it is received
         */
        setHandler(symbol, method) {
            this._handlers[symbol] = method;
        };

        /**
         * @param {String} symbol
         * @return {Boolean}
         */
        isHandled(symbol) {
            return this._handlers[symbol];
        };

        /**
         * @param {String} symbol
         */
        callHandler(symbol) {
            if (this.isHandled(symbol)) {
                this._handlers[symbol]();
            }
        };

        /**
         * @return {Object} Current drop-down property value
         */
        value() {
            return this.hasValidValue() ? this.input.value : null;
        }

        /**
         */
        show() {
            this.input.style.visibility = "visible";
        }

        /**
         */
        hide () {
            this.input.style.visibility = "hidden";
        }

        /**
         * Create the inner HTML elements.
         */
        create() {
            // Input form
            this.list_id = 'list' + this.id;
            this.input = document.createElement('input');
            this.input.setAttribute('id', this.id);
            this.input.setAttribute('class', 'knight-editor-input-form');
            this.input.setAttribute('list', this.list_id);
            this.input.setAttribute('placeholder', 'Start Typing...');
            document.body.appendChild(this.input);

            // Datalist field used to feed the input box's autocomplete
            this.datalist = document.createElement('datalist');
            this.datalist.setAttribute('id', this.list_id);
            this.datalist.setAttribute('class', 'knight-editor-input-form');
            if (this.data) {
                for (const text of this.data) {
                    const option = document.createElement('option');
                    option.value = text;
                    this.datalist.appendChild(option);
                }
            }
            document.body.appendChild(this.datalist);
            if (this.width) this.input.style.cssText += `width: ${this.width} em`;
        }

        /**
         */
        addEventListeners() {
            this.resizeEventHandler = this.screenAdjust.bind(this);
            window.addEventListener("resize", this.resizeEventHandler, false);
            this.input.addEventListener("keydown", this.onKeyDown.bind(this));
            this.input.addEventListener("change", this.confirm.bind(this));
            this.input.addEventListener("focus", this.onFocus.bind(this));
            this.input.addEventListener("blur", this.unblockEditorInput.bind(this));
            this.input.addEventListener("mousedown", this.stopPropagation.bind(this));
            this.input.addEventListener("touchstart", this.stopPropagation.bind(this));
        }

        /**
         * Prevent events from trickling down to the rest of the game any time we intercept them.
         * 
         * @param {event}
         */
        stopPropagation(event) {
            event.stopPropagation();
        }

        /**
         * Called whenever user presses a key while the input box is in focus.
         * 
         * @param {event}
         */
        onKeyDown(event) {
            this.hideErrorPopup();
            switch (event.keyCode) {
                case 27: // ESC
                    Input.clear();
                    this.cancel();
                    event.stopPropagation();
                    break;
                case Knight.Param.KEToggleKeyCode:
                    this.cancel();
                    // Intentionally let the event propagate to the game, the editor will handle it
                    break;
            }
        }

        /**
         */
        confirm() {
            Input.clear();
            this.input.blur();
            if (this.hasValidValue()) {
                this.callHandler('ok');
            } else {
                this.showErrorPopup();
            }
        }

        /**
         */
        cancel() {
            this.input.value = "";
            this.input.blur();
            this.callHandler('cancel');
        }

        /**
         */
        onFocus() {
            this.input.value = "";
            this.blockEditorInput();
        }

        /**
         * Prevents the game from getting input while the form is active.
         */
        blockEditorInput() {
          Input.clear();
          Input.formMode = true;
        }

        /**
         * Return input control to the game.
         */
        unblockEditorInput() {
            Input.formMode = false;
        }

        /**
         * Shows an error popup using the HTML5 validity checking API.
         */
        showErrorPopup() {
            this.input.setCustomValidity('Please select a valid value.');
            this.input.reportValidity();
        }

        /**
         * Setting the error to empty string causes the pop-up bubble to disappear.
         */
        hideErrorPopup() {
            this.input.setCustomValidity('');
            this.input.reportValidity();
        }

        /**
         * Adjust element positioning.
         */
        screenAdjust() {
            const canvas = document.querySelector('#UpperCanvas');
            const rect = canvas.getBoundingClientRect();
            const screenX = rect.left;
            const screenY = rect.top;
            this.input.positionAdjust({x:screenX, y:screenY}, {x:this.x, y:this.y});
        }

        /**
         * @return {boolean}    Whether the current input value is valid. 
         *                      Always true if no datalist was provided.
         */
        hasValidValue() {
            return this.data ? this.data.includes(this.input.value) : true;
        }
    }
    // =============================================================================
    // Knight.EditorDropDown
    // =============================================================================
    Knight.EditorDropDown = class extends Knight.Button {
        /**
         * Creates a drop-down window with text input and autocomplete. Mostly just 
         * handles the text field label and positioning, everything else is managed
         * by the embedded HTML text input field.
         *
         * @param {number} x                Window x coordinate
         * @param {number} y                Window y coordinate
         * @param {number} w                Window width
         * @param {Array} values            Possible drop-down values.
         * @param {string} label            Drop-down displayed title.
         */
        constructor(x, y, w, values, label = null) {
            const h = 24 + (label ? 30 : 0);
            super(x, y, null, null, null, w, h);
            this._values = values;
            this._label = label;
            this._labelHeight = label ? 30 : 0;
            this._inputField = new Knight.EditorHTMLTextInput(Date.now().toString(), this._values, x, y + h/2+ 2);
            this._inputField.setHandler('ok', this.onChange.bind(this));
            this.refresh();
        }

        /**
         * Repositions child windows. Called when X coordinate changes.
         */
        reposition() {
            this._inputField.x = this.x;
            this._inputField.screenAdjust();
        }

        /**
         * Adds child windows to parent scene's window layer.
         * @param {Scene_Base} scene    Parent scene
         */
        addWindowsToScene(scene) {
        };

        /**
         * Shows the window and all child windows.
         */
        show() {
            super.show();
            this._inputField.show();
        }

        /**
         * Hides the window and all child windows.
         */
        hide() {
            super.hide();
            this._inputField.hide();
        }

        /**
         * Called whenever the dropdown value changes
         */
        onChange() {
            if (this.isHandled('onChange')) {
                this._handlers['onChange']();
            }
        }

        /**
         * @return {Object} Current drop-down property value
         */
        value() {
            return this._inputField.value();
        }

        /**
         * Frame update
         */
        update() {
            Window_Base.prototype.update.call(this);
        }

        /**
         */
        drawContents() {
            if (this._label) {
                this.contents.fontFace = Knight.Param.KEPanelFont;
                this.contents.fontSize = 16;
                this.contents.outlineWidth = 4;
                this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)';
                this.changeTextColor(Knight.COLOR.LIGHT);
                this.contents.drawText(this._label, 10, 0, this.contents.width, this.lineHeight(), 'left');
            }
        }
    };

    // =============================================================================
    // EditorSwitchBox
    // =============================================================================
    Knight.EditorSwitchBox = class extends Knight.Window_Selectable {
        /**
         * Creates an instance of Knight.EditorSwitchBox.
         *
         * @param {number} x            Window x coordinate
         * @param {number} y            Window y coordinate
         * @param {number} w            Window width
         * @param {number} h            Window height
         */
        constructor(x, y, w, h) {
            super(x, y, w, h);
            this._data = [];
            this._useMouseInput = true;
            this.makeButtons();
            this.refresh();
        }

        /**
         * @return {Number}
         */
        maxItems() {
            return this._data ? this._data.length : 0;
        };

        /**
         * @return {Number}
         */
        itemHeight() {
            return Knight.EditorSwitchBox.itemHeight();
        }

        /**
         * @return {Number}
         */
        static itemHeight() {
            return 24;
        }

        /**
         * @return {Number}
         */
        lineHeight() {
            return this.contents.fontSize;
        }

        /**
         * @return {Array<Object>}
         */
        values() {
            return this._data;
        }

        /**
         * Adds child windows to parent scene's window layer.
         * @param {Scene_Base} scene    Parent scene
         */
        addWindowsToScene(scene) {
            this._buttons.forEach((w) => scene.addChild(w));
        };

        /**
         * Shows the window and all child windows.
         */
        show() {
            super.show();
            this._buttons.forEach((w) => w.show());
            this.updateButtonVisibility();
        }

        /**
         * Hides the window and all child windows.
         */
        hide() {
            super.hide();
            this._buttons.forEach((w) => w.hide());
        }

        /**
         * Shows the window and all child windows.
         */
        enable() {
            super.enable();
            this._buttons.forEach((w) => w.enable());
        }

        /**
         * Disable the window and all child windows.
         */
        disable() {
            super.disable();
            this._buttons.forEach((w) => w.disable());
        }

        /**
         */
        makeButtons() {
            this._buttonGroups = [];
            this._buttons = [];
            for (let i = 0; i < this.maxPageRows(); i++) {
                const rect = this.itemRect(i);
                const x = this.x + rect.x;
                const y = this.y + rect.y;
                const deleteButton = new Knight.Button(x + 2, y + 2, 'Close', 'Close_Hover');
                const switchButton = new Knight.Checkbox(x + rect.width - 60, y + 3, 'Switch_On', 'Switch_Off', null, true);
                deleteButton.setHandler('ok', this.remove.bind(this, i));
                switchButton.setHandler('onChange', this.toggle.bind(this, i, switchButton));
                this._buttons.push(deleteButton);
                this._buttons.push(switchButton);
                this._buttonGroups[i] = [];
                this._buttonGroups[i].push(deleteButton);
                this._buttonGroups[i].push(switchButton);
            }
        }

        /**
         */
        updateButtonVisibility() {
            const visibleRows = Math.min(this._data.length, this.maxPageRows());
            for (let i = 0; i < this._buttonGroups.length; ++i) {
                const visible = this.visible && (i < visibleRows);
                for (let j = 0; j < this._buttonGroups[i].length; ++j) {
                    this._buttonGroups[i][j].visible = visible;
                }
            }
        }

        /**
         */
        updateButtonState() {
            const topIndex = this.topIndex();
            for (let i = 0; i < this.maxPageItems(); ++i) {
                const index = topIndex + i;
                const checkbox = this._buttonGroups[i][1];
                if (index < this.maxItems()) {
                    this._data[index].value ? checkbox.check() : checkbox.uncheck();
                }
            }
        }

        /**
         * @param {*} id
         * @param {*} name
         * @param {*} value
         * @return {Object}
         */
        makeData(id, name, value) {
            return {name: name, id: id, value: value};
        }

        /**
         * @param {*} id
         * @param {*} name
         * @param {*} value
         */
        add(id, name, value) {
            const element = this.get(id);
            if (element) {
                element.name = name;
                element.value = value;
                this.refresh();
                this.onChange();
            } else {
                this._data.push(this.makeData(id, name, value));
                this.refresh();
                this.onChange();
            }
        }

        /**
         * @param {Array<Object>} data
         * @param {Boolean} callOnChange    When false, doesn't call the onChange callback. 
         *                                  Used to silently initialize data.
         */
        set(data, callOnChange = true) {
            this._data = data;
            this.setTopRow(0);
            this.refresh();
            if (callOnChange) this.onChange();
        }

        /**
         * @param {*} id
         * @return {Object}
         */
        get(id) {
            const index = this._data.findIndex(function(element) {
                return element.id === id;
            });
            return index === -1 ? null : this._data[index];
        }

        /**
         * @param {Number} visibleIndex
         */
        remove(visibleIndex) {
            const index = this.topIndex() + visibleIndex;
            if (this._data[index]) {
                this._data.splice(index, 1);
                this.scrollUp();
                this.refresh();
                this.onChange();
            }
        }

        /**
         * @param {Number} visibleIndex
         * @param {Checkbox} checkbox
         */
        toggle(visibleIndex, checkbox) {
            const index = this.topIndex() + visibleIndex;
            if (this._data[index]) {
                this._data[index].value = checkbox.checked();
                this.onChange();
            }
        }

        /**
         * Called whenever any value changes
         */
        onChange() {
            if (this.isHandled('onChange')) {
                this._handlers['onChange']();
            }
        }

        /**
         * Selects an item.
         * @param {number} index     Item selection index
         */
        select(index) {
            if (index !== this.index()) {
                super.select(index);
                this.refresh();
            }
        };

        /**
         * Redraw button
         */
        refresh() {
            if (this.contents) {
                this.contents.clear();
                this.resetFontSettings();
                this.makeItemRects();
                this.drawOutline();
                this.drawAllItems();
                this.updateButtonVisibility();
                this.updateButtonState();
            }
        }

        /**
         */
        drawOutline() {
            this.contents.fillRect(0, 0, this.contents.width, this.contents.height, Knight.COLOR.MID_GREY);
            this.contents.fillRect(1, 1, this.contents.width-2, this.contents.height-2, Knight.COLOR.BLACK);
        }

        /**
         */
        resetFontSettings() {
            Knight.Window_Base.prototype.resetFontSettings.call(this);
            this.contents.fontBold = false;
            this.contents.fontSize = 16;
        };

        /**
         * @param {Number} index
         */
        drawItem(index) {
            const rect = this.itemRect(index);
            const isSelected = this._index === index;
            const data = this._data[index];
            const text = `${data.id.padZero(4)}: ${data.name}`;

            // Background
            if (isSelected) {
                this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, Knight.COLOR.NIGHT);
            }

            // Text
            const ty = rect.y + (rect.height - this.lineHeight()) / 2;
            const bw = this._buttonGroups[0][0].width;
            const margin = bw + 8;
            const textColor = isSelected ? Knight.COLOR.GREY : Knight.COLOR.WHITE;
            this.changeTextColor(textColor);
            this.contents.drawText(text, rect.x + margin, ty, rect.width - margin, this.lineHeight(), "left");
        }
    };

    // =============================================================================
    // EditorPartyBox
    // =============================================================================
    Knight.EditorPartyBox = class extends Knight.EditorSwitchBox {
        /**
         * @return {Number}
         */
        itemHeight() {
            return 60;
        }

        /**
         */
        makeButtons() {
            this._buttonGroups = [];
            this._buttons = [];
            const deleteHeight = 24;
            const switchHeight = 18;
            for (let i = 0; i < this.maxPageRows(); i++) {
                const rect = this.itemRect(i);
                const dx = this.x + rect.x + 2;
                const sx = this.x + rect.x + rect.width - 60;
                const dy = this.y + rect.y + (rect.height - deleteHeight)/2 + 2;
                const sy = this.y + rect.y + (rect.height - switchHeight)/2;
                const deleteButton = new Knight.Button(dx, dy, 'Close', 'Close_Hover');
                const switchButton = new Knight.Checkbox(sx, sy, 'Switch_On', 'Switch_Off', null, true);
                deleteButton.setHandler('ok', this.remove.bind(this, i));
                switchButton.setHandler('onChange', this.toggle.bind(this, i, switchButton));
                this._buttons.push(deleteButton);
                this._buttons.push(switchButton);
                this._buttonGroups[i] = [];
                this._buttonGroups[i].push(deleteButton);
                this._buttonGroups[i].push(switchButton);
            }
        }

        /**
         * @param {Number} index
         */
        drawItem(index) {
            const rect = this.itemRect(index);
            const isSelected = this._index === index;
            const data = this._data[index];
            const text = data.name;

            // Background
            if (isSelected) {
                this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, Knight.COLOR.NIGHT);
            }

            // Character
            const actor = $dataActors[data.id];
            const charHeight = 48;
            const cx = rect.x + charHeight;
            const cy = rect.y + (rect.height - charHeight) / 2 + charHeight;
            this.drawCharacter(actor.characterName, actor.characterIndex, cx, cy);

            // Text
            const tx = cx + 30;
            const ty = rect.y + (rect.height - this.lineHeight()) / 2;
            const textColor = isSelected ? Knight.COLOR.GREY : Knight.COLOR.WHITE;
            this.changeTextColor(textColor);
            this.contents.drawText(text, tx, ty, rect.width - tx, this.lineHeight(), "left");
        }
    };

    // =============================================================================
    // Knight.Container
    // =============================================================================
    if (!Knight.Container) {
        Knight.Container = class extends PIXI.Container {
            /**
             */
            update() {
                let i = this.children.length;
                while (i--) {
                    if (this.children[i].update) {
                        this.children[i].update();
                    }
                }
            }
        };
    }
}

//=============================================================================
// Play Test Only
//=============================================================================
if (Knight.EDITOR.isTestPlay()) {
    //=============================================================================
    // Declarations & Utility Functions
    //=============================================================================
    if (!Imported.KNT_Movement) {
        Game_Map.prototype.roundPX = function(px) {
            return this.isLoopHorizontal() ? px.mod(this.width() * Knight.MOVEMENT.TileSize) : px;
        };

        Game_Map.prototype.roundPY = function(py) {
            return this.isLoopVertical() ? py.mod(this.height() * Knight.MOVEMENT.TileSize) : py;
        };

        Game_Map.prototype.canvasToMapPX = function(px) {
            const originX = this.displayX() * this.tileWidth();
            return Math.round(this.roundPX(originX + px));
        };

        Game_Map.prototype.canvasToMapPY = function(py) {
            const originY = this.displayY() * this.tileHeight();
            return Math.round(this.roundPY(originY + py));
        };
    }

    //=============================================================================
    // Input
    // Add an entirely separate input buffer to avoid compatibility issues with other
    // plugins that re-define ConfigManager.keyMapper, like Yanfly's Keyboard Config.
    //
    // Add input checking for various keys, with compatibility for QInput key codes.
    // Delete key isn't included in QInput for some reason, so we add it here too.
    //=============================================================================
    Knight.EDITOR.KEYS = {
        8: 'backspace', 9: 'tab', 13: 'enter', 16: 'shift', 17: 'ctrl', 18: 'alt',
        27: 'esc', 32: 'space', 33: 'pageup', 34: 'pagedown', 37: 'left',
        38: 'up', 39: 'right', 40: 'down', 45: 'escape', 46: 'del',
        48: '0', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6',
        55: '7', 56: '8', 57: '9',
        96: 'num0', 97: 'num1', 98: 'num2', 99: 'num3', 100: 'num4',
        101: 'num5', 102: 'num6', 103: 'num7', 104: 'num8', 105: 'num9',
        65: 'a', 66: 'b', 67: 'c', 68: 'd', 69: 'e', 70: 'f', 71: 'g',
        72: 'h', 73: 'i', 74: 'j', 75: 'k', 76: 'l', 77: 'm', 78: 'n',
        79: 'o', 80: 'p', 81: 'q', 82: 'r', 83: 's', 84: 't', 85: 'u',
        86: 'v', 87: 'w', 88: 'x', 89: 'y', 90: 'z',
        112: 'f1', 113: 'f2', 114: 'f3', 115: 'f4', 116: 'f5', 117: 'f6',
        118: 'f7', 119: 'f8', 120: 'f9', 121: 'f10', 122: 'f11', 123: 'f12',
        186: 'semicolon', 187: 'equal', 188: 'comma', 189: 'minus', 190: 'period',
        191: 'slash', 192: 'grave', 219: 'openbracket', 220: 'backslash',
        221: 'closedbracket', 222: 'singlequote',
    };

    // Default editor trigger key in case of invalid plugin config values
    if (!Object.values(Knight.EDITOR.KEYS).includes(Knight.Param.KEToggleKey)) {
        Knight.Param.KEToggleKey = 'f10';
    }
    for (const keyCode in Knight.EDITOR.KEYS) {
        if (Knight.EDITOR.KEYS[keyCode] === Knight.Param.KEToggleKey) {
            Knight.Param.KEToggleKeyCode = Number(keyCode);
            break;
        }
    }

    // QInput compatibility
    for (keyCode in Knight.EDITOR.KEYS) {
        if (Knight.EDITOR.KEYS.hasOwnProperty(keyCode)) {
            const keyName = Knight.EDITOR.KEYS[keyCode];
            if (Imported.QInput) {
                if (!QInput.keys.hasOwnProperty(keyCode)) QInput.keys[keyCode] = keyName;
                Knight.INPUT[keyName] = '#' + keyName;
            } else {
                Knight.INPUT[keyName] = keyName
            }
        }
    }

    Knight.EDITOR.Input_clear = Input.clear;
    Input.clear = function() {
        Knight.EDITOR.Input_clear.call(this);
        this._currentStateKE = {};
        this._previousStateKE = {};
        this._latestButtonKE = null;
        this._pressedTimeKE = 0;
    };

    Knight.EDITOR.Input_update = Input.update;
    Input.update = function() {
        Knight.EDITOR.Input_update.call(this);
        if (this._currentStateKE[this._latestButtonKE]) {
            this._pressedTimeKE++;
        } else {
            this._latestButtonKE = null;
        }
        for (var name in this._currentStateKE) {
            if (this._currentStateKE[name] && !this._previousStateKE[name]) {
                this._latestButtonKE = name;
                this._pressedTimeKE = 0;
                this._date = Date.now();
            }
            this._previousStateKE[name] = this._currentStateKE[name];
        }
    };

    Input.isPressedKE = function(keyName) {
        if (this._isEscapeCompatible(keyName) && this.isPressed('escape')) {
            return true;
        } else {
            return !!this._currentStateKE[keyName];
        }
    };
    
    Input.isTriggeredKE = function(keyName) {
        if (this._isEscapeCompatible(keyName) && this.isTriggered('escape')) {
            return true;
        } else {
            return this._latestButtonKE === keyName && this._pressedTimeKE === 0;
        }
    };
    
    Input.isRepeatedKE = function(keyName) {
        if (this._isEscapeCompatible(keyName) && this.isRepeated('escape')) {
            return true;
        } else {
            return (this._latestButtonKE === keyName &&
                    (this._pressedTimeKE === 0 ||
                     (this._pressedTimeKE >= this.keyRepeatWait &&
                      this._pressedTimeKE % this.keyRepeatInterval === 0)));
        }
    };

    Input.isLongPressedKE = function(keyName) {
        if (this._isEscapeCompatible(keyName) && this.isLongPressed('escape')) {
            return true;
        } else {
            return (this._latestButtonKE === keyName &&
                    this._pressedTimeKE >= this.keyRepeatWait);
        }
    };
    
    // Block game input while text fields are active
    Input.formMode = false;
    Knight.EDITOR.Input__onKeyDown = Input._onKeyDown;
    Input._onKeyDown = function(event) {
        if (Input.formMode) return;
        Knight.EDITOR.Input__onKeyDown.call(this, event);
        const buttonName = Knight.EDITOR.KEYS[event.keyCode];
        if (ResourceHandler.exists() && buttonName === 'ok') {
        } else if (buttonName) {
            this._currentStateKE[buttonName] = true;
        }
    };
    
    Knight.EDITOR.Input__onKeyUp = Input._onKeyUp;
    Input._onKeyUp = function(event) {
        if (Input.formMode) return;
        Knight.EDITOR.Input__onKeyUp.call(this, event);
        const buttonName = Knight.EDITOR.KEYS[event.keyCode];
        if (buttonName) {
            this._currentStateKE[buttonName] = false;
        }
    };

    // Overwrite to avoid repeating update logic
    Input._updateGamepadState = function(gamepad) {
        var lastState = this._gamepadStates[gamepad.index] || [];
        var newState = [];
        var buttons = gamepad.buttons;
        var axes = gamepad.axes;
        var threshold = 0.5;
        newState[12] = false;
        newState[13] = false;
        newState[14] = false;
        newState[15] = false;
        for (var i = 0; i < buttons.length; i++) {
            newState[i] = buttons[i].pressed;
        }
        if (axes[1] < -threshold) {
            newState[12] = true;    // up
        } else if (axes[1] > threshold) {
            newState[13] = true;    // down
        }
        if (axes[0] < -threshold) {
            newState[14] = true;    // left
        } else if (axes[0] > threshold) {
            newState[15] = true;    // right
        }
        for (var j = 0; j < newState.length; j++) {
            if (newState[j] !== lastState[j]) {
                var buttonName = this.gamepadMapper[j];
                if (buttonName) {
                    this._currentState[buttonName] = newState[j];
                    this._currentStateKE[buttonName] = newState[j];
                }
            }
        }
        this._gamepadStates[gamepad.index] = newState;
    };

    //=============================================================================
    // Game_Player
    //=============================================================================
    Knight.EDITOR.Game_Player_canMove = Game_Player.prototype.canMove;
    Game_Player.prototype.canMove = function() {
        if (Knight.Editor.isActive()) return false;
        return Knight.EDITOR.Game_Player_canMove.call(this);
    };

    //=============================================================================
    // Game_Event
    //=============================================================================
    Knight.EDITOR.Game_Event_updateSelfMovement = Game_Event.prototype.updateSelfMovement;
    Game_Event.prototype.updateSelfMovement = function() {
        if (Knight.Editor.isActive()) return;
        Knight.EDITOR.Game_Event_updateSelfMovement.call(this);
    };

    //=============================================================================
    // Game_Map
    //=============================================================================
    Knight.EDITOR.Game_Map_isEventRunning = Game_Map.prototype.isEventRunning;
    Game_Map.prototype.isEventRunning = function() {
        if (Knight.Editor.isActive()) return true;
        return Knight.EDITOR.Game_Map_isEventRunning.call(this);
    };

    //=============================================================================
    // Scene_Map
    //=============================================================================
    if (Imported.KNT_Collision) {
        Knight.EDITOR.Scene_Map_updateCharacterSelection = Scene_Map.prototype.updateCharacterSelection;
        Scene_Map.prototype.updateCharacterSelection = function() {
            if (Knight.Editor.isActive()) return;
            Knight.EDITOR.Scene_Map_updateCharacterSelection.call(this);
        };
    }

    Knight.EDITOR.Scene_Map_isDebugCalled = Scene_Map.prototype.isDebugCalled;
    Scene_Map.prototype.isDebugCalled = function() {
        if (Knight.Editor.isActive()) return false;
        return Knight.EDITOR.Scene_Map_isDebugCalled.call(this);
    };


    Knight.EDITOR.Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        Knight.EDITOR.Scene_Map_update.call(this);
        this._editor.update();
    };

    Knight.EDITOR.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        Knight.EDITOR.Scene_Map_createAllWindows.call(this);
        this.createEditor();
    };

    Scene_Map.prototype.createEditor = function() {
        this._editor = new Knight.Editor.KnightEditor(this);
    };

    Knight.EDITOR.Scene_Map_isMenuEnabled = Scene_Map.prototype.isMenuEnabled;
    Scene_Map.prototype.isMenuEnabled = function() {
        return Knight.EDITOR.Scene_Map_isMenuEnabled.call(this) && !Knight.Editor.isActive();
    };

    Scene_Map.prototype.currentDoodad = function() {
        return this._editor._currentDoodad;
    };

    Knight.EDITOR.Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function() {
        Knight.EDITOR.Scene_Map_createDisplayObjects.call(this);
        if (Imported.KNT_CollisionViewer) this.addChild(this.debugContainer());
        if (Imported.KNT_Editor) this.addChild(this.editorContainer());
    };

    Scene_Map.prototype.debugContainer = function() {
        this._debugContainer = this._debugContainer || new Knight.Container();
        return this._debugContainer;
    };

    Scene_Map.prototype.editorContainer = function() {
        this._editorContainer = this._editorContainer || new Knight.Container();
        return this._editorContainer;
    };

    //=============================================================================
    // Knight Editor
    //=============================================================================
    Knight.EDITOR.SELECTION_MODE = 0;
    Knight.EDITOR.PLACEMENT_MODE = 1;
    /**
     * A manager class that handles all of the editor logic, so we don't have to
     * write it directly in the Scene.
     *
     * @class KnightEditor
     */
    Knight.Editor.KnightEditor = class {
        /**
         *Creates an instance of KnightEditor.
        * @memberof KnightEditor
        *
        * @param {Scene_Base} scene  Current scene
        */
        constructor(scene) {
            this.initData(scene);
            this.createWindows();
            this.setInputHandlers();
            this.addWindowsToScene(scene);
            this.clearUndoQueue();
        }

        /**
         * @param {Scene} scene
         */
        initData(scene) {
            this._active = false;
            this._windows = [];
            this._buttons = [];
            this._windowGroups = {};
            this._handlers = {};
            this._managers = {};
            const windowGroups = Knight.Editor.KnightEditor.windowGroups();
            windowGroups.forEach(function(group) {
                this._windowGroups[group] = [];
                this._handlers[group] = {};
                this._managers[group] = null;
            }, this);
            this._activeGroup = windowGroups[0];
            this._spriteset = scene._spriteset;
            this._mouseOnUi = false;
            this._mode = Knight.EDITOR.SELECTION_MODE;
            this._outlineFilter = this.makeOutlineFilter();
            this._draggingDoodad = false;
            this._minimized = false;
            this._undoQueue = [];
            this._lastUndoDoodad = null;

            // Doodads
            this._currentDoodad = null;
            this._currentDoodadSprite = null;
            this._hoverDoodadSprite = null;
            this._managers['Doodads'] = DoodadManager;
            DoodadManager.setGridLockMode(false);
        }

        /**
         * @param {String} group        Name of the window group the handler belongs to
         * @param {String} symbol       Name of the command to be handled
         * @param {Function} method     Function that will be called to handle the command when it is received
         */
        setHandler(group, symbol, method) {
            this._handlers[group][symbol] = method;
        };

        /**
         * @param {String} symbol
         * @return {Boolean}
         */
        isHandled(symbol) {
            return this._handlers[this._activeGroup] && !!this._handlers[this._activeGroup][symbol];
        };

        /**
         * @param {String} symbol
         */
        callHandler(symbol) {
            if (this.isHandled(symbol)) {
                this._handlers[this._activeGroup][symbol](this);
            }
        };

        /**
         * @param {Window} window
         */
        closeWindow(window) {
            window.hide();
            window.deactivate();
            window.disable();
        }

        /**
         * @param {Window} window
         */
        openWindow(window) {
            window.show();
            window.activate();
            window.enable();
        }

        /**
         */
        openCommandWindow() {
            this.openWindow(this._commandWindow);
            this._buttons.forEach((b) => this.openWindow(b));
        }

        /**
         * @return {PIXI.filter}
         */
        makeOutlineFilter() {
            let filter = null;
            switch (Knight.Param.KEFilterType) {
            case 'Outline (Red)':
                filter = new PIXI.filters.GlowFilter(4, 3, 0, 0xff0000, 0.1);
                break;
            case 'Outline (Black)':
                filter = new PIXI.filters.GlowFilter(4, 3, 0, 0x000000, 0.1);
                break;
            case 'Increase Brightness':
                filter = new PIXI.filters.AdjustmentFilter;
                filter.brightness = 1.5;
                break;
            case 'Increase Contrast':
                filter = new PIXI.filters.AdjustmentFilter;
                filter.contrast = 2;
                break;
            }
            return filter;
        }

        /**
         * @return {Array<PIXI.filter>}
         */
        outlineFilter() {
            return this._outlineFilter ? [this._outlineFilter] : [];
        }

        /**
         * @static
         * @return {Array<String>}
         */
        static windowGroups() {
            return ["Doodads"];
        }

        /**
         * @return {Array<String>}
         */
        buttons() {
            return ['Import', 'Minimize', 'Save', 'Undo', 'Clear', 'Region'];
        }

        /**
         * @return {Boolean}
         */
        inPlacementMode() {
            return this._mode === Knight.EDITOR.PLACEMENT_MODE;
        }

        /**
         * @return {Boolean}
         */
        inSelectionMode() {
            return this._mode === Knight.EDITOR.SELECTION_MODE;
        }

        /**
         * @param {String} group
         * @return {Boolean}
         */
        isActiveGroup(group) {
            return this._activeGroup === group;
        }

        /**
         * @return {Boolean}
         */
        isDoodadGroup() {
            return this._activeGroup === 'Doodads';
        }

        /**
         * @param {String} group    Manager window group. If null, returns the active group's manager.
         * @return {Object}
         */
        manager(group = null) {
            return group ? this._managers[group] : this._managers[this._activeGroup];
        }

        /**
         * @return {*}
         */
        currentObject() {
            if (this.isDoodadGroup()) {
                return this._currentDoodad;
            }
        }

        /**
         * @param {*} name
         */
        playSound(name) {
            AudioManager.playSe({name: name, pan: 0, pitch: 100, volume: 90});
        }

        /**
         * @return {Sprite_Doodad}
         */
        currentDoodadSprite() {
            return this.inPlacementMode() ? this._spriteset._doodadCursor : this._currentDoodadSprite;
        }

        /**
         * @param {*} scene
         * @memberof KnightEditor
         */
        createWindows() {
            this.createDoodadWindows();
        }

        /**
         * @param {*} scene
         */
        addWindowsToScene(scene) {
            const container = scene.editorContainer();
            this._windows.forEach(function(w) {
                w.addToScene ? w.addToScene(container) : container.addChild(w);
                this.closeWindow(w);
            }, this);
        }

        /**
         * @memberof KnightEditor
         */
        createDoodadWindows() {
            const groupNames = Knight.Editor.KnightEditor.windowGroups();

            // Doodads
            const cy = Graphics.height - Knight.Editor.Window_EditorCommand.windowHeight();
            this._commandWindow = new Knight.Editor.Window_EditorCommand(0, cy);
            this._windows.push(this._commandWindow);
            this._windowGroups[groupNames[0]].push(this._commandWindow);
            groupNames.forEach((name) => this._windowGroups[name].push(this._commandWindow));
            this._commandWindow.setHandler('ok', this.updateWindowGroup.bind(this));

            const fw = 350;
            const lw = Graphics.width - fw;
            const lh = 180;
            const ly = cy - lh;
            this._doodadWindow = new Knight.Editor.Window_DoodadList(0, ly, lw, lh);
            this._windows.push(this._doodadWindow);
            this._windowGroups[groupNames[0]].push(this._doodadWindow);
            this._doodadWindow.setHandler('ok', this.setDoodad.bind(this));

            const fh = lh;
            const fy = cy - lh;
            this._folderWindow = new Knight.Editor.Window_FolderList(Graphics.width - fw, fy, fw, fh);
            this._windows.push(this._folderWindow);
            this._windowGroups[groupNames[0]].push(this._folderWindow);
            this._folderWindow.setHandler('ok', this.setFolder.bind(this));

            const pw = fw;
            const ph = fy;
            this._doodadEditWindow = new Knight.Editor.Window_DoodadProperties(Graphics.width - pw, 0, pw, ph, this);
            this._windows.push(this._doodadEditWindow);

            const iw = 240;
            const ih = 120;
            this._importWindow = new Knight.Editor.Window_DoodadImport(Graphics.width/2 - iw/2, Graphics.height/2 - ih/2 - 50, iw, ih, this);
            this._windows.push(this._importWindow);
            this._importWindow.setHandler('ok', this.importConfirm.bind(this));
            this._importWindow.setHandler('cancel', this.closeWindow.bind(this, this._importWindow));

            // Buttons
            const buttonSpacing = 64;
            const buttonY = this._commandWindow.y + this._commandWindow.height - 46;
            const buttonNames = this.buttons();
            let buttonX = this._commandWindow.x + this._commandWindow.width - (buttonSpacing * buttonNames.length);
            for (let i = 0; i < buttonNames.length; ++i) {
                const name = buttonNames[i];
                const button = new Knight.Button(buttonX, buttonY, name, `${name}_Hover`);
                button.setOkSound(null);
                this._windows.push(button);
                this._buttons.push(button);
                groupNames.forEach((name) => this._windowGroups[name].push(button));
                button.setHandler('ok', this[name.toLowerCase()].bind(this));
                buttonX += buttonSpacing;
            }

            // Default Button States
            this.updateAllButtonStates();
        }

        /**
         * @memberof KnightEditor
         */
        setInputHandlers() {
            const group = 'Doodads';
            this.setHandler(group, 'handlePlacementInput', this.handlePlacementInput.bind(this));
            this.setHandler(group, 'handleSelectionInput', this.handleSelectionInput.bind(this));
            this.setHandler(group, 'scrollUp', this.scrollUp.bind(this));
            this.setHandler(group, 'scrollDown', this.scrollDown.bind(this));
            this.setHandler(group, 'scrollLeft', this.scrollLeft.bind(this));
            this.setHandler(group, 'scrollRight', this.scrollRight.bind(this));
            this.setHandler(group, 'moveUp', this.moveUp.bind(this));
            this.setHandler(group, 'moveDown', this.moveDown.bind(this));
            this.setHandler(group, 'moveLeft', this.moveLeft.bind(this));
            this.setHandler(group, 'moveRight', this.moveRight.bind(this));
            this.setHandler(group, 'layerIncr', this.layerIncr.bind(this));
            this.setHandler(group, 'layerDecr', this.layerDecr.bind(this));
            this.setHandler(group, 'scaleIncr', this.scaleIncr.bind(this));
            this.setHandler(group, 'scaleDecr', this.scaleDecr.bind(this));
            this.setHandler(group, 'rotateIncr', this.rotateIncr.bind(this));
            this.setHandler(group, 'rotateDecr', this.rotateDecr.bind(this));
            this.setHandler(group, 'defaultSettings', this.defaultSettings.bind(this));
            this.setHandler(group, 'toggleGridLock', this.toggleGridLock.bind(this));
            this.setHandler(group, 'setManualMove', this.setManualMove.bind(this));
            this.setHandler(group, 'setOpacity', this.setOpacity.bind(this));
        };

        /**
         */
        update() {
            this.updateToggle();
            if (this.active() && !this._importWindow.visible) {
                this.updateActiveGroup();
                this.handleInput();
            }
        }

        /**
         */
        updateToggle() {
            if (Input.isTriggeredKE(Knight.INPUT[Knight.Param.KEToggleKey])) {
                this.toggle();
            }
        }

        /**
         */
        updateActiveGroup() {
            if (this.isDoodadGroup()) {
                this.updateDoodadPosition();
            }
        }

        /**
         */
        updateDoodadPosition() {
            if (this._draggingDoodad || (this.inPlacementMode() && !DoodadManager.usingManualMove())) {
                const oldX = this._currentDoodad.x;
                const oldY = this._currentDoodad.y;
                const newX = this._draggingDoodad ? this._spriteset.doodadDragX() : this._spriteset.currentDoodadX();
                const newY = this._draggingDoodad ? this._spriteset.doodadDragY() : this._spriteset.currentDoodadY();
                if (newX !== oldX || newY !== oldY) {
                    if (this._draggingDoodad) this.updateUndoQueue();
                    this._currentDoodad.x = newX;
                    this._currentDoodad.y = newY;
                    this._doodadEditWindow.refresh();
                    if (this._draggingDoodad) this.setDirty(true);
                }
            }
        }

        /**
         */
        handleInput() {
            this._mouseOnUi = this._windows.some(function(window) {
                return window.visible && window.isMouseInsideFrame();
            });
            if (!this._mouseOnUi && !this._draggingDoodad) {
                this.inPlacementMode() ? this.callHandler('handlePlacementInput') : this.callHandler('handleSelectionInput');
            }
            if (this._draggingDoodad && TouchInput.isReleased()) this._draggingDoodad = false;
            if (Input.isPressedKE(Knight.INPUT['w'])) this.callHandler('scrollUp');
            else if (Input.isPressedKE(Knight.INPUT['a'])) this.callHandler('scrollLeft');
            else if (Input.isPressedKE(Knight.INPUT['d'])) this.callHandler('scrollRight');
            else if (Input.isPressedKE(Knight.INPUT['s']) && !Input.isPressedKE(Knight.INPUT['ctrl'])) this.callHandler('scrollDown');

            if (this.currentObject()) {
                const up = Input.isRepeatedKE(Knight.INPUT['up']) || (Input.isPressedKE(Knight.INPUT['up']) && Input.isPressedKE(Knight.INPUT['shift']));
                const down = Input.isRepeatedKE(Knight.INPUT['down']) || (Input.isPressedKE(Knight.INPUT['down']) && Input.isPressedKE(Knight.INPUT['shift']));
                const left = Input.isRepeatedKE(Knight.INPUT['left']) || (Input.isPressedKE(Knight.INPUT['left']) && Input.isPressedKE(Knight.INPUT['shift']));
                const right = Input.isRepeatedKE(Knight.INPUT['right']) || (Input.isPressedKE(Knight.INPUT['right']) && Input.isPressedKE(Knight.INPUT['shift']));
                if (up) this.callHandler('moveUp');
                else if (down) this.callHandler('moveDown');
                if (left) this.callHandler('moveLeft');
                else if (right) this.callHandler('moveRight');

                if (!this._mouseOnUi) {
                    if (TouchInput.wheelY > 0) this.callHandler('layerDecr');
                    else if (TouchInput.wheelY < 0) this.callHandler('layerIncr');
                }
                if (Input.isPressedKE(Knight.INPUT['q'])) this.callHandler('rotateDecr');
                if (Input.isPressedKE(Knight.INPUT['e'])) this.callHandler('rotateIncr');
                if (Input.isRepeatedKE(Knight.INPUT['z'])) this.callHandler('scaleDecr');
                if (Input.isRepeatedKE(Knight.INPUT['x'])) this.callHandler('scaleIncr');
                if (Input.isTriggeredKE(Knight.INPUT['backspace'])) this.callHandler('defaultSettings');
                if (Input.isTriggeredKE(Knight.INPUT['g'])) this.callHandler('toggleGridLock');
                this.callHandler('setOpacity');
            }
            if (TouchInput.isMoved()) this.callHandler('setManualMove');
            if (Input.isPressedKE(Knight.INPUT['ctrl']) && Input.isTriggeredKE(Knight.INPUT['s'])) this.save();
            if (Input.isPressedKE(Knight.INPUT['ctrl']) && Input.isTriggeredKE(Knight.INPUT['z'])) this.undo();
            if (Input.isTriggeredKE(Knight.INPUT['n'])) this.minimize();
            if (Input.isTriggeredKE(Knight.INPUT['r'])) this.region();
            if (Input.isTriggeredKE(Knight.INPUT['i'])) this.import();
        }

        /**
         */
        handlePlacementInput() {
            if (TouchInput.isTriggered()) this.placeDoodad();
            if (TouchInput.isCancelled()) this.clearDoodad();
        }

        /**
         */
        handleSelectionInput() {
            const doodadSprite = DoodadManager.isMouseOnDoodads();
            const doodad = doodadSprite ? doodadSprite._data : null;
            // Highlight Doodads on mouseover
            if (doodadSprite !== this._hoverDoodadSprite && this._currentDoodad === null) {
                if (this._hoverDoodadSprite) this._hoverDoodadSprite.filters = [];
                this._hoverDoodadSprite = doodadSprite;
                if (this._hoverDoodadSprite) this._hoverDoodadSprite.filters = this.outlineFilter();
            }
            if (doodad) {
                if (TouchInput.isTriggered()) {
                    this._currentDoodad = doodad;
                    if (this._currentDoodadSprite) this._currentDoodadSprite.filters = [];
                    this._currentDoodadSprite = doodadSprite;
                    this._currentDoodadSprite.filters = this.outlineFilter();
                    this.updateEditWindow(this._currentDoodad);
                }
                if (TouchInput.isLongPressedFor(8)) {
                    this._draggingDoodad = true;
                }
            }
            if (TouchInput.isCancelled()) this.clearDoodad();
            if (Input.isTriggeredKE(Knight.INPUT['del'])) this.delete();
            if (Input.isTriggeredKE(Knight.INPUT['c'])) this.copy();
        }

        /**
         * @memberof KnightEditor
         */
        scrollUp() {
            $gameMap.startScroll(8, 1, 6);
            DoodadManager.setManualMove(false);
        }

        /**
         * @memberof KnightEditor
         */
        scrollDown() {
            $gameMap.startScroll(2, 1, 6);
            DoodadManager.setManualMove(false);
        }

        /**
         * @memberof KnightEditor
         */
        scrollLeft() {
            $gameMap.startScroll(4, 1, 6);
            DoodadManager.setManualMove(false);
        }

        /**
         * @memberof KnightEditor
         */
        scrollRight() {
            $gameMap.startScroll(6, 1, 6);
            DoodadManager.setManualMove(false);
        }

        /**
         * @memberof KnightEditor
         */
        moveUp() {
            this.updateUndoQueue();
            DoodadManager.manualMoveUp();
            this._currentDoodad.y = DoodadManager._manualY;
            this._doodadEditWindow.refresh();
        }

        /**
         * @memberof KnightEditor
         */
        moveDown() {
            this.updateUndoQueue();
            DoodadManager.manualMoveDown();
            this._currentDoodad.y = DoodadManager._manualY;
            this._doodadEditWindow.refresh();
        }

        /**
         * @memberof KnightEditor
         */
        moveLeft() {
            this.updateUndoQueue();
            DoodadManager.manualMoveLeft();
            this._currentDoodad.x = DoodadManager._manualX;
            this._doodadEditWindow.refresh();
        }

        /**
         * @memberof KnightEditor
         */
        moveRight() {
            this.updateUndoQueue();
            DoodadManager.manualMoveRight();
            this._currentDoodad.x = DoodadManager._manualX;
            this._doodadEditWindow.refresh();
        }

        /**
         * @memberof KnightEditor
         */
        layerIncr() {
            this._doodadEditWindow.layerIncr();
        }

        /**
         * @memberof KnightEditor
         */
        layerDecr() {
            this._doodadEditWindow.layerDecr();
        }

        /**
         * @memberof KnightEditor
         */
        scaleIncr() {
            this._doodadEditWindow.scaleIncr(Input.isPressedKE(Knight.INPUT['shift']));
        }

        /**
         * @memberof KnightEditor
         */
        scaleDecr() {
            this._doodadEditWindow.scaleDecr(Input.isPressedKE(Knight.INPUT['shift']));
        }

        /**
         * @memberof KnightEditor
         */
         rotateIncr() {
            this._doodadEditWindow.rotateIncr(Input.isPressedKE(Knight.INPUT['shift']));
        }

        /**
         * @memberof KnightEditor
         */
         rotateDecr() {
            this._doodadEditWindow.rotateDecr(Input.isPressedKE(Knight.INPUT['shift']));
        }

        /**
         * @memberof KnightEditor
         */
        defaultSettings() {
            this._doodadEditWindow.default();
        }

        /**
         * @memberof KnightEditor
         */
        toggleGridLock() {
            this._doodadEditWindow.toggleGridLock();
        }

        /**
         * @memberof KnightEditor
         */
        setManualMove() {
            DoodadManager.setManualMove(false);
        }

        /**
         * @memberof KnightEditor
         */
        setOpacity() {
            for (let i = 0; i < 10; ++i) {
                const keyCode = `${i}`;
                if (Input.isTriggeredKE(Knight.INPUT[keyCode])) {
                    this.updateUndoQueue();
                    this._currentDoodad.opacity = i === 0 ? 255 : Math.floor(255 * i / 10);
                    this._doodadEditWindow.updateAllValues();
                }
            }
        }

        /**
         * @memberof KnightEditor
         */
        toggle() {
            if (SceneManager._scene._debugActive) return;
            this.active() ? this.deactivate() : this.activate();
            this.playSound(Knight.Param.KESEToggle);
        }

        /**
         * @return {Boolean}
         * @memberof KnightEditor
         */
        active() {
            return this._active;
        }

        /**
         * @return {Array<Window>}
         */
        windows() {
            return this._windowGroups[this._activeGroup];
        }

        /**
         * @memberof KnightEditor
         */
        activate() {
            this._active = true;
            if (!this._minimized) this.windows().forEach((w) => this.openWindow(w));
            this.openCommandWindow();
        }

        /**
         * @memberof KnightEditor
         */
        deactivate() {
            this._active = false;
            this._windows.forEach((w) => this.closeWindow(w));
            this.clearDoodad();
            this._spriteset.closeRegionOverlayWindow();
            $gameMap.centerScreenPlayer();
        }

        /**
         * @param {String} group
         */
        setWindowGroup(group) {
            if (this._activeGroup !== group) {
                this.deactivate();
                this._activeGroup = group;
                this.activate();
                this.updateAllButtonStates();
            }
        }

        /**
         */
        updateWindowGroup() {
            this.setWindowGroup(this._commandWindow.currentSymbol());
        }

        /**
         */
        setDoodad() {
            this.clearDoodad();
            if (this._doodadWindow.isIconset()) {
                this._currentDoodad = DoodadManager.getTemplate('', 'IconSet');
                this._currentDoodad.iconIndex = this._doodadWindow.index();
            } else {
                const name = this._doodadWindow.item();
                const folder = this._doodadWindow.folder();
                this._currentDoodad = DoodadManager.getTemplate(folder, name);
                this._currentDoodad.xFrames = DoodadManager.getXFrames(name);
                this._currentDoodad.yFrames = DoodadManager.getYFrames(name);
            }
            this.enterPlacementMode();
        }

        /**
         */
        placeDoodad() {
            this.playSound(Knight.Param.KESEPlace);
            this.updateUndoQueue(true);
            const doodad = DoodadManager.currentCopy();
            doodad.x = this._spriteset.currentDoodadX();
            doodad.y = this._spriteset.currentDoodadY();
            DoodadManager.addNew(doodad);
            this.setDirty(true);
            this.updateButtonState('Clear');
        }

        /**
         */
        clearDoodad() {
            this._currentDoodad = null;
            if (this._hoverDoodadSprite) {
                this._hoverDoodadSprite.filters = [];
                this._hoverDoodadSprite = null;
            }
            if (this._currentDoodadSprite) {
                this._currentDoodadSprite.filters = [];
                this._currentDoodadSprite = null;
            }
            this.exitPlacementMode();
        }

        /**
         * @param {*} object
         */
        updateEditWindow(object) {
            if (this.isDoodadGroup()) {
                const doodad = object;
                this._doodadEditWindow.setDoodad(doodad);
                this.closeWindow(this._doodadEditWindow);
                if (doodad && !this._minimized) {
                    this.openWindow(this._doodadEditWindow);
                }
            }
        }

        /**
         */
        setFolder() {
            const folder = this._folderWindow.item();
            this._doodadWindow.setFolder(folder);
        }

        /**
         */
        enterPlacementMode() {
            this._mode = Knight.EDITOR.PLACEMENT_MODE;
            if (this.isDoodadGroup()) {
                this._spriteset.setDoodadCursor(this.currentObject());
            }
            this.updateEditWindow(this.currentObject());
        };

        /**
         */
        exitPlacementMode() {
            this._mode = Knight.EDITOR.SELECTION_MODE;
            if (this.isDoodadGroup()) {
                this._spriteset.clearDoodadCursor();
            }
            this.updateEditWindow(null);
        };

        /**
         */
        onPropertyChange() {
            if (this.isDoodadGroup()) {
                if (this.inPlacementMode()) {
                    this._spriteset._doodadCursor.refreshSettings();
                } else if (this.inSelectionMode()) {
                    this._currentDoodadSprite.initData();
                    this.setDirty(true);
                }
            }
        }

        /**
         * @param {Boolean} isDirty
         */
        setDirty(isDirty) {
            const manager = this.manager();
            if (manager.isDirty() !== isDirty) {
                manager.setDirty(isDirty);
                this._commandWindow.refresh();
                this.updateButtonState('Save');
            }
        }

        /**
         * @param {Boolean} isDirty
         */
        setAllDirty(isDirty) {
            Object.values(this._managers).forEach((manager) => manager.setDirty(isDirty));
            this._commandWindow.refresh();
            this.updateButtonState('Save');
        }

        /**
         */
        updateUndoQueue(forceUpdate = false) {
            // Don't save changes in placement mode
            if (!forceUpdate && this.inPlacementMode()) return;

            // Do nothing if current doodad hasn't changed
            if (forceUpdate || this.isUndoQueueEmpty() || 
                this._currentDoodad === null || 
                this._lastUndoDoodad !== this._currentDoodad) {
                this._undoQueue.push(JsonEx.makeDeepCopy($dataDoodads));
                this.updateButtonState('Undo');
            }
            this._lastUndoDoodad = this._currentDoodad;
        }

        /**
         */
        clearUndoQueue() {
            this._undoQueue = [];
            this.updateButtonState('Undo');
        }

        /**
         * @return {Boolean}
         */
        isUndoQueueEmpty() {
            return this._undoQueue.length === 0;
        }

        /**
         */
        minimize() {
            this._minimized = !this._minimized;
            if (this._minimized) {
                this._windows.forEach((w) => this.closeWindow(w));
            } else {
                this.windows().forEach((w) => this.openWindow(w));
                if (this.isDoodadGroup()) {
                    this._doodadEditWindow._doodad ? this.openWindow(this._doodadEditWindow) : this.closeWindow(this._doodadEditWindow);
                }
                this.closeWindow(this._importWindow);
            }
            this.openCommandWindow(); // Command window should always be visible
            this.playSound(Knight.Param.KESEMinimize);
        }

        /**
         */
        save() {
            StorageManager.saveDoodadSettings();
            this.playSound(Knight.Param.KESESave);
            this.setAllDirty(false);
        }

        /**
         */
        copy() {
            if (this.isDoodadGroup() && this._currentDoodad) {
                if (this._hoverDoodadSprite) {
                    this._hoverDoodadSprite.filters = [];
                    this._hoverDoodadSprite = null;
                }
                this._currentDoodadSprite = null;
                this._currentDoodad = JsonEx.makeDeepCopy(this._currentDoodad);
                this.enterPlacementMode();
                this.playSound(Knight.Param.KESECopy);
            }
        }

        /**
         */
        undo() {
            if (this.isDoodadGroup() && !this.isUndoQueueEmpty()) {
                const curDoodadIndex = this.inSelectionMode() ? DoodadManager.doodads().indexOf(this._currentDoodad) : -1;
                $dataDoodads = JsonEx.makeDeepCopy(this._undoQueue.pop());
                DoodadManager.refresh();
                if (this.inSelectionMode()) {
                    if (this._hoverDoodadSprite) {
                        this._hoverDoodadSprite.filters = [];
                        this._hoverDoodadSprite = null;
                    }
                    if (this._currentDoodadSprite) {
                        this._currentDoodadSprite.filters = [];
                        this._currentDoodadSprite = null;
                    }
                    if (curDoodadIndex >= 0) {
                        this._currentDoodad = DoodadManager.doodads()[curDoodadIndex];
                        const doodadSprites = this._spriteset._doodads;
                        if (doodadSprites) {
                            this._currentDoodadSprite = doodadSprites.find((sprite) => sprite._data === this._currentDoodad);
                            if (this._currentDoodadSprite) this._currentDoodadSprite.filters = this.outlineFilter();
                        }
                        if (this._doodadEditWindow.visible) {
                            if (this._currentDoodad) {
                                this._doodadEditWindow.setDoodad(this._currentDoodad);
                            } else {
                                this.closeWindow(this._doodadEditWindow);
                            }
                        }
                    }
                } 
                this.playSound(Knight.Param.KESEUndo);
                this.setDirty(true);
                this.updateButtonState('Undo');
                this.updateButtonState('Clear');
            }
        }

        /**
         */
        delete() {
            if (this.isDoodadGroup() && this._currentDoodad) {
                DoodadManager.delete(this._currentDoodad);
                this.clearDoodad();
                this.playSound(Knight.Param.KESEDelete);
                this.setDirty(true);
                this.updateButtonState('Clear');
            };
        }

        /**
         */
        clear() {
            if (this.isDoodadGroup() && DoodadManager.doodads().length > 0) {
                this.updateUndoQueue();
                DoodadManager.clearMap();
                this.clearDoodad();
                this.playSound(Knight.Param.KESEClear);
                this.setDirty(true);
                this.updateButtonState('Clear');
            }
        }

        /**
         */
        region() {
            this._spriteset.toggleRegionOverlayWindow();
            this.playSound(Knight.Param.KESERegion);
        }

        /**
         */
        import() {
            this.openWindow(this._importWindow);
        }

        /**
         */
        importConfirm() {
            const mapId = this._importWindow.mapId();
            if (mapId) {
                this.clearDoodad();
                this.updateUndoQueue();
                $dataDoodads[mapId] = $dataDoodads[mapId] || [];
                const data = JsonEx.makeDeepCopy($dataDoodads[mapId]);
                $dataDoodads[DoodadManager.mapId()] = data;
                DoodadManager.refresh();
                this.closeWindow(this._importWindow);
                this.setAllDirty(true);
            }
            this.updateButtonState('Clear');
        }

        /**
         * @param {String} buttonName
         */
        updateButtonState(buttonName) {
            const index = this.buttons().indexOf(buttonName);
            if (index < 0) return;
            const button = this._buttons[index];
            switch (buttonName) {
            case "Save":
                this.manager().isDirty() ? button.on() : button.off();
                break;
            case "Clear":
                this.manager().size() > 0 ? button.on() : button.off();
                break;
            case "Undo":
                (this.isDoodadGroup() && !this.isUndoQueueEmpty()) ? button.on() : button.off();
                break;
            }
        };

        /**
         */
        updateAllButtonStates() {
            this.updateButtonState('Clear');
            this.updateButtonState('Save');
            this.updateButtonState('Undo');
        };
    };

    //=============================================================================
    // Editor Modes
    //=============================================================================
    Knight.Editor.Window_EditorCommand = class extends Knight.Window_HorzCommand {
        /**
         *Creates an instance of Window_EditorCommand.
        *
        * @param {Number} x
        * @param {Number} y
        */
        constructor(x, y) {
            super(x, y);
            this._useMouseInput = true;
            this._activeIndex = 0;
        }

        /**
         * @return {Number}
         */
        maxCols() {
            return Knight.Editor.KnightEditor.windowGroups().length;
        };

        /**
         * @return {Number}
         */
        itemWidth() {
            return 200;
        };

        /**
         * @return {Number}
         */
        windowWidth() {
            return Graphics.width;
        };

        /**
         * @return {Number}
         */
        windowHeight() {
            return Knight.Editor.Window_EditorCommand.windowHeight();
        };

        /**
         * @static
         * @return {Number}
         */
        static windowHeight() {
            return 38;
        }

        /**
         * Called when the OK handler is triggered
         */
        processOk() {
            this._activeIndex = this.index();
            super.processOk();
            this.refresh();
        };

        /**
         * Turn off window cursor sound
         */
        playCursorSound() {
        };

        /**
         * Plays a sound when interacted with.
         */
        playOkSound() {
            SoundManager.playCursor();
        };

        /**
         * @param {*} scene
         */
        addToScene(scene) {
            scene.addChild(this);
        }

        /**
         */
        makeCommandList() {
            const windowGroups = Knight.Editor.KnightEditor.windowGroups();
            windowGroups.forEach((group) => this.addCommand(group, group));
            this.makeItemRects();
        };

        /**
         * @param {*} index
         */
        select(index) {
            if (index !== this._index) {
                Knight.Window_HorzCommand.prototype.select.call(this, index);
                Window_Selectable.prototype.refresh.call(this);
            }
        }

        /**
         */
        resetFontSettings() {
            this.contents.fontFace = this.standardFontFace();
            this.contents.fontSize = 20;
            this.contents.outlineWidth = 0;
        }

        /**
         */
        drawAllItems() {
            this.drawBackground();
            Window_HorzCommand.prototype.drawAllItems.call(this);
        }

        /**
         */
        drawBackground() {
            this.contents.fillRect(0, 0, this.contents.width, this.contents.height, Knight.COLOR.DARK_GREY);
        }

        /**
         * @param {Number} index
         */
        drawItem(index) {
            const rect = this.itemRectForText(index);
            const align = this.itemTextAlign();
            if (this._activeIndex === index) {
                this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, Knight.COLOR.BLACK);
                this.changeTextColor(this.normalColor());
            } else {
                this.changeTextColor(Knight.COLOR.GREY);
            }

            let text = this.commandName(index);

            const editor = SceneManager._scene._editor;
            if (editor) {
                const manager = SceneManager._scene._editor.manager(text);
                if (manager && manager.isDirty()) text += " *";
            }
            this.drawText(text, rect.x, rect.y, rect.width, align);
        };
    };

    //=============================================================================
    // Doodad List
    //=============================================================================
    Knight.Editor.Window_DoodadList = class extends Knight.Window_ItemList {
        /**
         *Creates an instance of Window_DoodadList.
        *
        * @param {Number} x
        * @param {Number} y
        * @param {Number} width
        * @param {Number} height
        */
        constructor(x, y, width, height) {
            super(x, y, width, height);
            this._folder = '';
            this._useMouseInput = true;
            this.refresh();
        }

        /**
         * @return {Number}
         */
        itemWidth() {
            return 60;
        };

        /**
         * @return {Number}
         */
        itemHeight() {
            return 60;
        };

        /**
         * @return {Number}
         */
        maxCols() {
            return Math.floor(this.width / (this.itemWidth() + this.spacing()));
        };

        /**
         * @return {Number}
         */
        spacing() {
            return 10;
        };

        /**
         * @param {*} item
         * @return {Boolean}
         */
        isEnabled(item) {
            return true;
        }

        /**
         * @return {Boolean}
         */
        isIconset() {
            return this._folder === 'Iconset';
        }

        /**
         * Turn off window cursor sound
         */
        playCursorSound() {
        };

        /**
         * Plays a sound when interacted with.
         */
        playOkSound() {
            SoundManager.playCursor();
        };

        /**
         * @param {*} scene
         */
        addToScene(scene) {
            scene.addChild(this);
        }

        /**
         * @param {*} index
         */
        select(index) {
            if (index !== this._index) {
                Knight.Window_ItemList.prototype.select.call(this, index);
                Window_Selectable.prototype.refresh.call(this);
            }
        }

        /**
         *
         *
         */
        update() {
            Knight.Window_ItemList.prototype.update.call(this);
        }

        /**
         */
        makeItemList() {
            this._data = this.getFileList();
            this.makeItemRects();
        };

        /**
         * @param {String} folderName
         */
        setFolder(folderName) {
            if (this._folder !== folderName) {
                this._folder = folderName;
                this.deselect();
                this.resetScroll();
                this.refresh();
            }
        };

        /**
         */
        drawAllItems() {
            this.contents.fontSize = 20;
            this.contents.outlineWidth = 4;
            this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)';
            this.drawBackground();
            Window_ItemList.prototype.drawAllItems.call(this);
        }

        /**
         */
        drawBackground() {
            this.changePaintOpacity(false);
            this.contents.fillRect(0, 0, this.contents.width, this.contents.height, Knight.COLOR.BLACK);
            this.changePaintOpacity(true);
        }

        /**
         * @param {Rect} rect
         */
        drawSelectionCursor(rect) {
            this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, Knight.COLOR.DARK);
            this.contents.paintOpacity = 212;
            this.contents.fillRect(rect.x + 2, rect.y + 2, rect.width - 4, rect.height - 4, Knight.COLOR.WHITE);
            this.changePaintOpacity(true);
        }

        /**
         * @param {number} index
         */
        drawItem(index) {
            if (this.isIconset()) {
                const rect = this.getItemRect(index);
                if (index === this.index()) this.drawSelectionCursor(rect);
                const x = rect.x + rect.width/2 - Window_Base._iconWidth/2;
                const y = rect.y + rect.height/2 - Window_Base._iconHeight/2;
                this.drawIcon(index, x, y);
            } else {
                this.drawDoodadImage(index, this._data[index]);
            }
        }

        /**
         * @param {*} index
         * @param {*} filename
         * @return {*}
         */
        drawDoodadImage(index, filename) {
            const bitmap = ImageManager.loadDoodad(this._folder + '/' + filename, 0, true);
            if (bitmap.width <= 0) {
                return setTimeout(this.drawDoodadImage.bind(this, index, filename), 5);
            }
            const rect = this.itemRectForText(index);
            const xframes = DoodadManager.getXFrames(filename);
            const yframes = DoodadManager.getYFrames(filename);
            const pw = Math.floor(bitmap.width / xframes);
            const ph = Math.floor(bitmap.height / yframes);
            const maxWidth = this.itemWidth() - 2;
            const maxHeight = this.itemHeight() - 2;
            let dw = pw;
            let dh = ph;
            if (dw > maxWidth) {
                const rate = maxWidth / dw;
                dw *= rate;
                dh *= rate;
            }
            if (dh > maxHeight) {
                const rate = maxHeight / dh;
                dw *= rate;
                dh *= rate;
            }
            const dx = rect.x + 2 + (maxWidth - dw) / 2;
            const dy = rect.y + 2 + (maxHeight - dh) / 2;
            if (index === this.index()) {
                const sRect = new Rectangle(dx - 8, dy - 8, dw + 16, dh + 16);
                this.drawSelectionCursor(sRect);
            }
            this.contents.blt(bitmap, 0, 0, pw, ph, dx, dy, dw, dh);
        };

        /**
         */
        updateHelp() {
        }

        /**
         * @return {String}
         */
        getLocalPath() {
            const path = require('path');
            const base = path.dirname(process.mainModule.filename);
            return path.join(base, Yanfly.Param.GFDFolder);
        };

        /**
         * @return {Array<String>}
         */
        getFileList() {
            if (this._folder === '') return [];
            if (this.isIconset()) return this.iconData();
            const fs = require('fs');
            const results = [];
            const path = this.getLocalPath() + this._folder;
            fs.readdirSync(path).forEach(function(file) {
                name = file;
                file = path + '/' + name;
                const stat = fs.statSync(file);
                if (stat && stat.isDirectory()) {
                    // Do nothing
                } else if (name.match(/.png/g)) {
                    name = name.replace(/.png/g, '');
                    results.push(name);
                }
            });
            return results;
        };

        /**
         * @return {String}
         */
        folder() {
            return this._folder + '/';
        }

        /**
         * @return {Array}
         */
        iconData() {
            const bitmap = ImageManager.loadSystem('IconSet');
            const rows = Math.floor(bitmap.height / Window_Base._iconHeight);
            const length = rows * 16;
            return new Array(length);
        }
    };

    //=============================================================================
    // Folder List
    //=============================================================================
    Knight.Editor.Window_FolderList = class extends Knight.Editor.Window_DoodadList {
        /**
         * @return {Number}
         */
        itemWidth() {
            return 60;
        };

        /**
         * @return {Number}
         */
        itemHeight() {
            return 60;
        };

        /**
         * @return {Number}
         */
        spacing() {
            return 10;
        };

        /**
         * @param {Rect} rect
         */
        drawSelectionCursor(rect) {
            this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, Knight.COLOR.DARK);
            this.contents.paintOpacity = 64;
            this.contents.fillRect(rect.x + 2, rect.y + 2, rect.width - 4, rect.height - 4, Knight.COLOR.WHITE);
            this.changePaintOpacity(true);
        }

        /**
         */
        drawAllItems() {
            this.contents.fontSize = 14;
            this.contents.outlineWidth = 2;
            this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)';
            this.drawBackground();
            Window_ItemList.prototype.drawAllItems.call(this);
        }

        /**
         * @param {number} index
         */
        drawItem(index) {
            const folderName = this._data[index];
            const rect = this.getItemRect(index);
            let image = 'Folder_Closed';
            if (index === this.index()) {
                image = 'Folder_Open';
                this.drawSelectionCursor(rect);
            }
            if (folderName === "Iconset") image = 'Iconset';
            this.drawGui(image, rect.x + rect.width/2 - Window_Base._iconWidth/2, rect.y + 2);
            this.drawText(folderName, rect.x, rect.y + Window_Base._iconHeight - 4, rect.width, 'center');
        }

        /**
         */
        makeItemList() {
            this._data = this.getFolderList();
            this.makeItemRects();
        };

        /**
         * @return {Array<String>}
         */
        getFolderList() {
            const fs = require('fs');
            const results = ['Iconset'];
            const path = this.getLocalPath();
            fs.readdirSync(path).forEach(function(file) {
                name = file;
                file = path + '/' + name;
                const stat = fs.statSync(file);
                if (stat && stat.isDirectory()) {
                    results.push(name);
                }
            });
            return results;
        };
    };

    //=============================================================================
    // Edit Window Pages
    //=============================================================================
    Knight.Editor.Window_EditorPageCommand = class extends Knight.Editor.Window_EditorCommand {
        /**
         *Creates an instance of Window_EditorPageCommand.
        *
        * @param {Number} x
        * @param {Number} y
        * @param {Window} propertyWindow
        */
        constructor(x, y, propertyWindow) {
            super(x, y);
            this._propertyWindow = propertyWindow;
        }

        /**
         * @return {Number}
         */
        maxCols() {
            return this._propertyWindow ? this._propertyWindow.windowGroups().length : Knight.Editor.Window_DoodadProperties.windowGroups().length;
        };

        /**
         * @return {Number}
         */
        spacing() {
            return 0;
        }

        /**
         * @return {Number}
         */
        lineHeight() {
            return this.contents.fontSize;
        }

        /**
         * @return {Number}
         */
        itemHeight() {
            return this.windowHeight();
        };

        /**
         * @return {Number}
         */
        itemWidth() {
            return Math.floor(this.windowWidth() / this.maxCols());
        };

        /**
         * @return {Number}
         */
        windowWidth() {
            return 350;
        };

        /**
         * @return {Number}
         */
        windowHeight() {
            return Knight.Editor.Window_EditorPageCommand.windowHeight();
        };

        /**
         * @static
         * @return {Number}
         */
        static windowHeight() {
            return 30;
        }

        /**
         */
        makeCommandList() {
            const windowGroups = this._propertyWindow ? this._propertyWindow.windowGroups() : Knight.Editor.Window_DoodadProperties.windowGroups();
            windowGroups.forEach((group) => this.addCommand(group, group));
            this.makeItemRects();
        };

        /**
         */
        resetFontSettings() {
            this.contents.fontFace = this.standardFontFace();
            this.contents.fontSize = 16;
            this.contents.outlineWidth = 0;
        }

        /**
         * @param {Number} index
         */
        drawItem(index) {
            const rect = this.getItemRect(index);
            const align = this.itemTextAlign();
            if (this._activeIndex === index) {
                this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, Knight.COLOR.BLACK);
                this.changeTextColor(this.normalColor());
            } else {
                this.changeTextColor(Knight.COLOR.GREY);
            }
            const y = rect.y + rect.height/2 - this.lineHeight()/2;
            this.drawText(this.commandName(index), rect.x, y, rect.width, align);
        };
    };

    //=============================================================================
    // Doodad Property Window
    //=============================================================================
    Knight.Editor.Window_DoodadProperties = class extends Knight.Window_Base {
        /**
         *Creates an instance of Window_DoodadProperties.
        *
        * @param {Number} x
        * @param {Number} y
        * @param {Number} width
        * @param {Number} height
        * @param {KnightEditor} editor
        */
        constructor(x, y, width, height, editor) {
            super(x, y, width, height);
            this._doodad = null;
            this._editor = editor;
            this._windows = [];
            this._buttons = [];
            this._windowGroups = {};
            const windowGroups = this.windowGroups();
            windowGroups.forEach(function(group) {
                this._windowGroups[group] = [];
            }, this);
            this._activeGroup = windowGroups[0];
            this._toneColors = this.getToneColors();
            this.createWindows();
            this.refresh();
        }

        /**
         * @return {Boolean}
         */
        compactMode() {
            return Graphics.height < 700;
        }

        /**
         * @static
         * @return {Array<String>}
         */
        windowGroups() {
            return Knight.Editor.Window_DoodadProperties.windowGroups();
        }

        /**
         * @static
         * @return {Array<String>}
         */
        static windowGroups() {
            if (!this._windowGroupNames) {
                this._windowGroupNames = ["Position", "Display"];
                if (Imported.YEP_X_ExtDoodadPack1) this._windowGroupNames.push("Conditions");
            }
            return this._windowGroupNames;
        }

        /**
         * @return {Object}
         */
        getToneColors() {
            return {
                'Custom': {},
                'Normal': {red: 0, green: 0, blue: 0, grey: 0},
                'Grey': {red: 0, green: 0, blue: 0, grey: 255},
                'Red': {red: 127, green: 0, blue: 0, grey: 0},
                'Orange': {red: 127, green: 64, blue: 0, grey: 0},
                'Yellow': {red: 127, green: 127, blue: 0, grey: 0},
                'Lime': {red: 68, green: 127, blue: 0, grey: 0},
                'Green': {red: 0, green: 127, blue: 0, grey: 0},
                'Turquoise': {red: 0, green: 127, blue: 68, grey: 0},
                'Cyan': {red: 0, green: 127, blue: 127, grey: 0},
                'Sky': {red: 0, green: 68, blue: 127, grey: 0},
                'Blue': {red: 0, green: 0, blue: 127, grey: 0},
                'Purple': {red: 68, green: 0, blue: 127, grey: 0},
                'Magenta': {red: 127, green: 0, blue: 127, grey: 0},
                'Pink': {red: 127, green: 0, blue: 68, grey: 0},
                'Dark': {red: -68, green: -68, blue: -68, grey: 0},
                'Sepia': {red: 34, green: -34, blue: -68, grey: 170},
                'Sunset': {red: 68, green: -34, blue: -34, grey: 0},
                'Night': {red: -68, green: -68, blue: 0, grey: 68},
            };
        }

        /**
         * @param {*} scene
         */
        addToScene(scene) {
            scene.addChild(this);
            this._windows.forEach(function(w) {
                scene.addChild(w);
                if (w.addWindowsToScene) w.addWindowsToScene(scene);
            });
        }

        /**
         * @return {Array<Window>}
         */
        windows() {
            return this._windowGroups[this._activeGroup];
        }

        /**
         * @param {String} group
         */
        setWindowGroup(group) {
            if (this._activeGroup !== group) {
                this.updateWindowGroupVisibility(group);
                this.refresh();
            }
        }

        /**
         * @param {String} group
         */
        updateWindowGroupVisibility(group) {
            this.windows().forEach(function(w) {
                w.hide();
                w.deactivate();
                w.disable();
            });
            this._activeGroup = group;
            this.windows().forEach(function(w) {
                w.show();
                w.activate();
                w.enable();
            });
            if (!this.isAnimated() && this._frameSpeed) {
                this._frameSpeed.hide();
                this._frameSpeed.deactivate();
                this._frameSpeed.disable();
            }
        }

        /**
         */
        updateWindowGroup() {
            this.setWindowGroup(this._commandWindow.currentSymbol());
        }

        /**
         * @param {Object} doodad
         */
        setDoodad(doodad) {
            if (this._doodad !== doodad) {
                this._doodad = doodad;
                this._tonePreset.setValue(this._doodad && this._doodad.toneRed ? 0 : 1);
                this.updateAllValues();
                this.refresh();
            }
        }

        /**
         */
        updateAllValues() {
            if (this._doodad) {
                this._layer.setValue(this._doodad.z);
                this._scaleX.setValue(this._doodad.scaleX);
                this._scaleY.setValue(this._doodad.scaleY);
                this._rotation.setValue(this._doodad.rotation);
                this._opacityWindow.setValue(this._doodad.opacity);
                this._blend.setValue(this._doodad.blend);
                this._anchorX.setValue(this._doodad.anchorX);
                this._anchorY.setValue(this._doodad.anchorY);
                this._frameSpeed.setValue(this._doodad.frameUpdate);
                this._doodad.smooth ? this._smoothing.check(false) : this._smoothing.uncheck(false);
                DoodadManager._gridLockMode ? this._gridLock.check(false) : this._gridLock.uncheck(false);
                this._gridLockX.setValue(DoodadManager.gridLockX());
                this._gridLockY.setValue(DoodadManager.gridLockY());
                this._toneR.setValue(this._doodad.toneRed);
                this._toneG.setValue(this._doodad.toneGreen);
                this._toneB.setValue(this._doodad.toneBlue);
                this._toneGrey.setValue(this._doodad.toneGrey);
                if (Imported.YEP_X_ExtDoodadPack1) {
                    const switchList = [];
                    const maxSwitches = $dataSystem.switches.length;
                    this._doodad.switchOn = this._doodad.switchOn || [];
                    this._doodad.switchOff = this._doodad.switchOff || [];
                    this._doodad.partyHave = this._doodad.partyHave || [];
                    this._doodad.partyMiss = this._doodad.partyMiss || [];

                    this._doodad.switchOn.forEach(function(id) {
                        if (id < maxSwitches) switchList.push(this._switchBox.makeData(id, $dataSystem.switches[id], true));
                    }, this);
                    this._doodad.switchOff.forEach(function(id) {
                        if (id < maxSwitches) switchList.push(this._switchBox.makeData(id, $dataSystem.switches[id], false));
                    }, this);
                    switchList.sort((a, b) => a.id - b.id);
                    this._switchBox.set(switchList, false);

                    const partyList = [];
                    const maxActors = $dataActors.length;
                    this._doodad.partyHave.forEach(function(id) {
                        if (id < maxActors) partyList.push(this._partyBox.makeData(id, $dataActors[id].name, true));
                    }, this);
                    this._doodad.partyMiss.forEach(function(id) {
                        if (id < maxActors) partyList.push(this._partyBox.makeData(id, $dataActors[id].name, false));
                    }, this);
                    partyList.sort((a, b) => a.id - b.id);
                    this._partyBox.set(partyList, false);
                }
            }
        }

        /**
         * @param {*} name
         * @param {*} widget
         */
        updateValue(name, widget) {
            this.beforeChange();
            switch (name) {
            case 'layer':
                this._doodad.z = widget.value();
                break;
            case 'scalex':
                this._doodad.scaleX = widget.value();
                break;
            case 'scaley':
                this._doodad.scaleY = widget.value();
                break;
            case 'rotation':
                this._doodad.rotation = widget.value();
                break;
            case 'opacity':
                this._doodad.opacity = widget.value();
                break;
            case 'anchorx':
                this._doodad.anchorX = widget.value();
                break;
            case 'anchory':
                this._doodad.anchorY = widget.value();
                break;
            case 'blend':
                this._doodad.blend = widget.value();
                break;
            case 'smooth':
                this._doodad.smooth = widget.checked();
                break;
            case 'frameSpeed':
                this._doodad.frameUpdate = widget.value();
                break;
            case 'gridLock':
                DoodadManager.setGridLockMode(widget.checked());
                break;
            case 'gridx':
                DoodadManager._gridLockX = widget.value();
                break;
            case 'gridy':
                DoodadManager._gridLockY = widget.value();
                break;
            case 'tonePreset':
                const index = widget.value();
                if (index > 0) {
                    const tone = Object.values(this._toneColors)[index];
                    this._doodad.toneRed = tone.red;
                    this._doodad.toneGreen = tone.green;
                    this._doodad.toneBlue = tone.blue;
                    this._doodad.toneGrey = tone.grey;
                    this.updateAllValues();
                }
                break;
            case 'toneR':
                this._doodad.toneRed = widget.value();
                this._tonePreset.setValue(0);
                break;
            case 'toneG':
                this._doodad.toneGreen = widget.value();
                this._tonePreset.setValue(0);
                break;
            case 'toneB':
                this._doodad.toneBlue = widget.value();
                this._tonePreset.setValue(0);
                break;
            case 'toneGrey':
                this._doodad.toneGrey = widget.value();
                this._tonePreset.setValue(0);
                break;
            case 'switch':
                this._doodad.switchOn = [];
                this._doodad.switchOff = [];
                widget.values().forEach(function(s) {
                    const arr = s.value ? this._doodad.switchOn : this._doodad.switchOff;
                    arr.push(s.id);
                }, this);
                break;
            case 'actor':
                this._doodad.partyHave = [];
                this._doodad.partyMiss = [];
                widget.values().forEach(function(s) {
                    const arr = s.value ? this._doodad.partyHave : this._doodad.partyMiss;
                    arr.push(s.id);
                }, this);
                break;
            }
            this.onChange();
        }

        /**
         */
        layerDecr() {
            this.beforeChange();
            this._layer.setValue(this._doodad.z - 1);
            this._doodad.z = this._layer.value();
            this.onChange();
        }

        /**
         */
        layerIncr() {
            this.beforeChange();
            this._layer.setValue(this._doodad.z + 1);
            this._doodad.z = this._layer.value();
            this.onChange();
        }

        /**
         * @param {Boolean} largeStep   When true, changes values 10x faster.
         */
        scaleDecr(largeStep) {
            this.beforeChange();
            const increment = Knight.Param.KEScaleStep * (largeStep ? 10 : 1);
            this._scaleX.setValue(this._doodad.scaleX - increment);
            this._doodad.scaleX = this._scaleX.value();
            this._scaleY.setValue(this._doodad.scaleY - increment);
            this._doodad.scaleY = this._scaleY.value();
            this.onChange();
        }

        /**
         * @param {Boolean} largeStep   When true, changes values 10x faster.
         */
        scaleIncr(largeStep) {
            this.beforeChange();
            const increment = Knight.Param.KEScaleStep * (largeStep ? 10 : 1);
            this._scaleX.setValue(this._doodad.scaleX + increment);
            this._doodad.scaleX = this._scaleX.value();
            this._scaleY.setValue(this._doodad.scaleY + increment);
            this._doodad.scaleY = this._scaleY.value();
            this.onChange();
        }

        /**
         * @param {Boolean} largeStep   When true, changes values 10x faster.
         */
         rotateDecr(largeStep) {
            this.beforeChange();
            const increment = largeStep ? 10 : 1;
            const val = this._doodad.rotation || 0;
            let newVal = Math.round(val * 180 / Math.PI - increment);
            while (newVal < 0) newVal += 360;
            this._rotation.setValue(newVal);
            this._doodad.rotation = this._rotation.value();
            this.onChange();
        }

        /**
         * @param {Boolean} largeStep   When true, changes values 10x faster.
         */
         rotateIncr(largeStep) {
            this.beforeChange();
            const increment = largeStep ? 10 : 1;
            const val = this._doodad.rotation || 0;
            let newVal = Math.round(val * 180 / Math.PI + increment);
            while (newVal > 360) newVal -= 360;
            this._rotation.setValue(newVal);
            this._doodad.rotation = this._rotation.value();
            this.onChange();
        }

        /**
         * Called whenever a widget value changes
         */
        onChange() {
            this._editor.onPropertyChange();
        }

        /**
         * Called right before changing a value
         */
        beforeChange() {
            this._editor.updateUndoQueue();
        }

        /**
         */
        createWindows() {
            const groupNames = this.windowGroups();

            // Pages
            const cy = this.y + (this.compactMode() ? 40 : 90);
            this._commandWindow = new Knight.Editor.Window_EditorPageCommand(this.x, cy, this);
            this._commandWindow.refresh();
            this._windows.push(this._commandWindow);
            for (const group in this._windowGroups) {
                if (this._windowGroups.hasOwnProperty(group)) this._windowGroups[group].push(this._commandWindow);
            }
            this._commandWindow.setHandler('ok', this.updateWindowGroup.bind(this));

            const spacing = this.compactMode() ? 54 : 60;
            const x = this.x + 15;
            let y = this._commandWindow.y + this._commandWindow.height + (this.compactMode() ? 5 : 10);

            //////////////////////////////////////////////////////////////////
            // Page 1: Position
            //////////////////////////////////////////////////////////////////
            let page = groupNames[0];

            // layer
            const layerNames = ["Lowest", "Low", "Below", "Same", "Above", "5", "6", "7", "8", "9", "Highest"];
            this._layer = new Knight.EditorSlider(x, y, 0, layerNames.length-1, 5, 1, "Layer", layerNames, null, true);
            this._layer.setHandler('onChange', this.updateValue.bind(this, 'layer', this._layer));
            this._windows.push(this._layer);
            this._windowGroups[page].push(this._layer);
            y += spacing;

            // scale
            const scaleMin = Knight.Param.KEScaleMin;
            const scaleMax = Knight.Param.KEScaleMax;
            const scaleStep = Knight.Param.KEScaleStep;
            this._scaleX = new Knight.EditorSlider(x, y, scaleMin, scaleMax, 1.0, scaleStep,"Scale", null, null, true);
            this._scaleY = new Knight.EditorSlider(x, y + 52, scaleMin, scaleMax, 1.0, scaleStep, null, null, null, true);
            this._scaleX.setHandler('onChange', this.updateValue.bind(this, 'scalex', this._scaleX));
            this._scaleY.setHandler('onChange', this.updateValue.bind(this, 'scaley', this._scaleY));
            this._windows.push(this._scaleX);
            this._windows.push(this._scaleY);
            this._windowGroups[page].push(this._scaleX);
            this._windowGroups[page].push(this._scaleY);
            y += spacing * 1.5;

            // rotation
            const rotateMin = 0;
            const rotateMax = 360;
            const rotateValueFn = function(value) {
                return value * Math.PI / 180;
            };
            this._rotation = new Knight.EditorSlider(x, y, rotateMin, rotateMax, 0, 1, "Rotation", null, rotateValueFn, true);
            this._rotation.setHandler('onChange', this.updateValue.bind(this, 'rotation', this._rotation));
            this._windows.push(this._rotation);
            this._windowGroups[page].push(this._rotation);
            y += spacing;

            // anchor
            const anchorMin = Knight.Param.KEAnchorMin;
            const anchorMax = Knight.Param.KEAnchorMax;
            const anchorStep = Knight.Param.KEAnchorStep;
            this._anchorX = new Knight.EditorSlider(x, y, anchorMin, anchorMax, 0.5, anchorStep, "Anchor", null, null, true);
            this._anchorY = new Knight.EditorSlider(x, y + 52, anchorMin, anchorMax, 1.0, anchorStep, null, null, null, true);
            this._anchorX.setHandler('onChange', this.updateValue.bind(this, 'anchorx', this._anchorX));
            this._anchorY.setHandler('onChange', this.updateValue.bind(this, 'anchory', this._anchorY));
            this._windows.push(this._anchorX);
            this._windows.push(this._anchorY);
            this._windowGroups[page].push(this._anchorX);
            this._windowGroups[page].push(this._anchorY);
            y += spacing * 1.5;

            // grid lock
            const gridMin = Knight.Param.KEGridLockMin;
            const gridMax = Knight.Param.KEGridLockMax;
            this._gridLock = new Knight.EditorCheckbox(x, y, 'Check_On', 'Check_Off', 'Check_Hover', true, 'Grid Lock');
            this._gridLock.width = 350;
            this._gridLock.createContents();
            this._gridLock.uncheck();
            this._gridLock.refresh();
            this._gridLock.setHandler('onChange', this.updateValue.bind(this, 'gridLock', this._gridLock));
            this._windows.push(this._gridLock);
            this._windowGroups[page].push(this._gridLock);
            this._gridLockX = new Knight.EditorSlider(x, y + 22, gridMin, gridMax, Yanfly.Param.GFDGridWidth, 1, null, null, null, true);
            this._gridLockY = new Knight.EditorSlider(x, y + 44, gridMin, gridMax, Yanfly.Param.GFDGridHeight, 1, null, null, null, true);
            this._gridLockX.setHandler('onChange', this.updateValue.bind(this, 'gridx', this._gridLockX));
            this._gridLockY.setHandler('onChange', this.updateValue.bind(this, 'gridy', this._gridLockY));
            this._windows.push(this._gridLockX);
            this._windows.push(this._gridLockY);
            this._windowGroups[page].push(this._gridLockX);
            this._windowGroups[page].push(this._gridLockY);
            y += spacing * 2;

            //////////////////////////////////////////////////////////////////
            // Page 2: Display
            //////////////////////////////////////////////////////////////////
            y = this._commandWindow.y + this._commandWindow.height + (this.compactMode() ? 5 : 10);
            page = groupNames[1];

            // opacity
            this._opacityWindow = new Knight.EditorSlider(x, y, 0, 255, 255, 1, "Opacity", null, null, true);
            this._opacityWindow.setHandler('onChange', this.updateValue.bind(this, 'opacity', this._opacityWindow));
            this._windows.push(this._opacityWindow);
            this._windowGroups[page].push(this._opacityWindow);
            y += spacing;

            // blend mode
            // WebGL only accepts NORMAL, ADD, MULTIPLY and SCREEN
            const blendNames = DoodadManager.blendNames();
            this._blend = new Knight.EditorSlider(x, y, 0, blendNames.length-1, 0, 1, "Blend Mode", blendNames, null, true);
            this._blend.setHandler('onChange', this.updateValue.bind(this, 'blend', this._blend));
            this._windows.push(this._blend);
            this._windowGroups[page].push(this._blend);
            y += spacing;

            // smoothing
            this._smoothing = new Knight.EditorCheckbox(x, y, 'Check_On', 'Check_Off', 'Check_Hover', true, 'Smoothing');
            this._smoothing.width = 350;
            this._smoothing.createContents();
            this._smoothing.refresh();
            this._smoothing.setHandler('onChange', this.updateValue.bind(this, 'smooth', this._smoothing));
            this._windows.push(this._smoothing);
            this._windowGroups[page].push(this._smoothing);
            y += spacing * 0.5;

            // tone
            const toneMin = -255;
            const toneMax = 255;
            const colorNames = Object.keys(this._toneColors);
            this._tonePreset = new Knight.EditorSlider(x, y, 0, colorNames.length-1, 1, 1, "Color Tone", colorNames, null, true);
            this._toneR = new Knight.EditorSlider(x, y + 52, toneMin, toneMax, 255, 1, null, null, null, true);
            this._toneG = new Knight.EditorSlider(x, y + 74, toneMin, toneMax, 255, 1, null, null, null, true);
            this._toneB = new Knight.EditorSlider(x, y + 96, toneMin, toneMax, 255, 1, null, null, null, true);
            this._toneGrey = new Knight.EditorSlider(x, y + 118, 0, 255, 0, 1, null, null, null, true);
            this._tonePreset.setHandler('onChange', this.updateValue.bind(this, 'tonePreset', this._tonePreset));
            this._toneR.setHandler('onChange', this.updateValue.bind(this, 'toneR', this._toneR));
            this._toneG.setHandler('onChange', this.updateValue.bind(this, 'toneG', this._toneG));
            this._toneB.setHandler('onChange', this.updateValue.bind(this, 'toneB', this._toneB));
            this._toneGrey.setHandler('onChange', this.updateValue.bind(this, 'toneGrey', this._toneGrey));
            this._windows.push(this._tonePreset);
            this._windows.push(this._toneR);
            this._windows.push(this._toneG);
            this._windows.push(this._toneB);
            this._windows.push(this._toneGrey);
            this._windowGroups[page].push(this._tonePreset);
            this._windowGroups[page].push(this._toneR);
            this._windowGroups[page].push(this._toneG);
            this._windowGroups[page].push(this._toneB);
            this._windowGroups[page].push(this._toneGrey);
            y += spacing * (this.compactMode() ? 2.5 : 2.3);

            // frame speed
            this._frameSpeed = new Knight.EditorSlider(x, y, 1, 60, 20, 1, "Frame Speed", null, null, true);
            this._frameSpeed.setHandler('onChange', this.updateValue.bind(this, 'frameSpeed', this._frameSpeed));
            this._windows.push(this._frameSpeed);
            this._windowGroups[page].push(this._frameSpeed);
            y += spacing;

            //////////////////////////////////////////////////////////////////
            // Page 3: Conditions
            //////////////////////////////////////////////////////////////////
            if (Imported.YEP_X_ExtDoodadPack1) {
                y = this._commandWindow.y + this._commandWindow.height + (this.compactMode() ? 5 : 10);
                page = groupNames[2];

                // Switches
                const dropWidth = 245;
                this._switchDropDownIds = new Map();
                const switchNames = $dataSystem.switches.map(function(name, index) {
                    const text = `${index.padZero(4)}: ${name}`;
                    this._switchDropDownIds.set(text, index);
                    return text;
                }, this);
                switchNames.shift(); // Remove element 0
                this._switchDropDown = new Knight.EditorDropDown(x, y, dropWidth, switchNames, "Switches");
                this._switchDropDown.setHandler('onChange', this.addSwitch.bind(this, this._switchDropDown));
                y += spacing;

                // switch box
                const maxBoxRows = this.compactMode() ? 3 : 4;
                const switchBoxHeight = maxBoxRows * Knight.EditorSwitchBox.itemHeight();
                this._switchBox = new Knight.EditorSwitchBox(x, y, this._switchDropDown.width + 80, switchBoxHeight);
                this._switchBox.setHandler('onChange', this.updateValue.bind(this, 'switch', this._switchBox));
                this._windows.push(this._switchBox);
                this._windowGroups[page].push(this._switchBox);
                y += this._switchDropDown.height + (this.compactMode() ? spacing * 0.25 : spacing * 0.75);

                // Party Members
                this._partyDropDownIds = new Map();
                const actorNames = $dataActors.map(function(data, index) {
                    const text = index > 0 ? `${index.padZero(4)}: ${data.name}` : null;
                    this._partyDropDownIds.set(text, index);
                    return text;
                }, this);
                actorNames.shift(); // Remove element 0
                this._partyDropDown = new Knight.EditorDropDown(x, y, dropWidth, actorNames, "Party Members");
                this._partyDropDown.setHandler('onChange', this.addActor.bind(this, this._partyDropDown));
                y += spacing;

                // party box
                const maxPartyBoxRows = this.compactMode() ? 2 : 3;
                const partyBoxHeight = maxPartyBoxRows * 60;
                this._partyBox = new Knight.EditorPartyBox(x, y, this._partyDropDown.width + 80, partyBoxHeight);
                this._partyBox.setHandler('onChange', this.updateValue.bind(this, 'actor', this._partyBox));
                this._windows.push(this._partyBox);
                this._windowGroups[page].push(this._partyBox);
                y += this._partyDropDown.height + spacing;
            }

            //////////////////////////////////////////////////////////////////
            // Buttons
            //////////////////////////////////////////////////////////////////
            const buttonSpacing = 28;
            const buttonY = this.y + 6;
            const buttonNames = ['Default', 'Copy', 'Delete'];
            let buttonX = this.x + this.width - (buttonSpacing * buttonNames.length);
            for (let i = 0; i < buttonNames.length; ++i) {
                const name = buttonNames[i];
                const button = new Knight.Button(buttonX, buttonY, name, `${name}_Hover`);
                button.setOkSound(null);
                this._windows.push(button);
                this._buttons.push(button);
                button.setHandler('ok', this[name.toLowerCase()].bind(this));
                buttonX += buttonSpacing;
            }

            // Add Drop-downs last so they draw above other windows
            if (Imported.YEP_X_ExtDoodadPack1) {
                this._windows.push(this._partyDropDown);
                this._windowGroups[page].push(this._partyDropDown);
                this._windows.push(this._switchDropDown);
                this._windowGroups[page].push(this._switchDropDown);
            }
        }

        /**
         * @return {Boolean}
         */
        isAnimated() {
            if (!this._doodad) return false;
            if (this._doodad.xFrames > 1) return true;
            if (this._doodad.yFrames > 1) return true;
            return false;
        };

        /**
         */
        copy() {
            this._editor.copy();
        }

        /**
         */
        default() {
            this.beforeChange();
            const defaultDoodad = DoodadManager.getTemplate(this._doodad.folder, this._doodad.bitmap);
            const ignoreList = ["x", "y", "xFrames", "yFrames", "iconIndex"];
            for (const property in defaultDoodad) {
                if (ignoreList.includes(property)) continue;
                if (this._doodad.hasOwnProperty(property)) {
                    this._doodad[property] = defaultDoodad[property];
                }
            }
            DoodadManager.setGridLockMode(false);
            DoodadManager._gridLockX = Yanfly.Param.GFDGridWidth;
            DoodadManager._gridLockY = Yanfly.Param.GFDGridHeight;
            this._tonePreset.setValue(1);
            this.updateAllValues();
            this.onChange();
            this._editor.playSound(Knight.Param.KESEReset);
        }

        /**
         */
        delete() {
            this._editor.delete();
        }

        /**
         */
        toggleGridLock() {
            DoodadManager.setGridLockMode(!DoodadManager._gridLockMode);
            DoodadManager._gridLockMode ? this._gridLock.check(false) : this._gridLock.uncheck(false);
            SoundManager.playCursor();
        }

        /**
         */
        addSwitch() {
            const id = this._switchDropDownIds.get(this._switchDropDown.value());
            this._switchBox.add(id, $dataSystem.switches[id], true);
        }

        /**
         */
        addActor() {
            const id = this._partyDropDownIds.get(this._partyDropDown.value());
            this._partyBox.add(id, $dataActors[id].name, true);
        }

        /**
         */
        show() {
            Knight.Window_Base.prototype.show.call(this);
            this.windows().forEach((w) => w.show());
            this._buttons.forEach(function(b) {
                if (!this._editor.inPlacementMode() || b === this._buttons[0]) b.show();
            }, this);
            if (!this.isAnimated() && this._frameSpeed) this._frameSpeed.hide();
        }

        /**
         */
        hide() {
            Knight.Window_Base.prototype.hide.call(this);
            this._windows.forEach((w) => w.hide());
        }

        /**
         */
        enable() {
            Knight.Window_Base.prototype.enable.call(this);
            this.windows().forEach((w) => w.enable());
            this._buttons.forEach(function(b) {
                if (!this._editor.inPlacementMode() || b === this._buttons[0]) b.enable();
            }, this);
            if (!this.isAnimated() && this._frameSpeed) this._frameSpeed.disable();
        }

        /**
         */
        disable() {
            Knight.Window_Base.prototype.disable.call(this);
            this._windows.forEach((w) => w.disable());
        }

        /**
         */
        activate() {
            Knight.Window_Base.prototype.activate.call(this);
            this.windows().forEach((w) => w.activate());
            this._buttons.forEach(function(b) {
                if (!this._editor.inPlacementMode() || b === this._buttons[0]) b.activate();
            }, this);
            if (!this.isAnimated() && this._frameSpeed) this._frameSpeed.deactivate();
        }

        /**
         */
        deactivate() {
            Knight.Window_Base.prototype.deactivate.call(this);
            this._windows.forEach((w) => w.deactivate());
        }

        /**
         */
        refresh() {
            if (this.contents) {
                this.contents.clear();
                this.drawBackground();
                if (this._doodad) {
                    this.drawProperties();
                }
            }
        }

        /**
         */
        drawBackground() {
            this.contents.fillRect(0, 0, this.contents.width, this.contents.height, Knight.COLOR.DARK_GREY);
            this.contents.fillRect(0, this._commandWindow.y + this._commandWindow.height,
                this.contents.width, 2, Knight.COLOR.BLACK);
        }

        /**
         */
        drawProperties() {
            this.contents.fontFace = Knight.Param.KEPanelFont;
            this.contents.fontSize = 20;
            this.contents.outlineWidth = 4;
            this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)';
            this.drawText(`${this._doodad.bitmap}`, 0, this.compactMode() ? 0 : 20, this.width, 'center');

            if (this._doodad.iconIndex) {
                this.drawIcon(this._doodad.iconIndex, 30, 30);
            } else if (!this.compactMode()) {
                this.drawDoodadImage(20, 10, 60, 60, this._doodad.folder, this._doodad.bitmap);
            }

            let x = Math.trunc(this._doodad.x);
            let y = Math.trunc(this._doodad.y);
            this.contents.fontSize = this.compactMode() ? 12 : 16;
            this.drawText(`X: ${x}`, this.compactMode() ? 10 : 110, this.compactMode() ? 0 : 50, this.width/2, 'left');
            this.drawText(`Y: ${y}`, this.compactMode() ? 50 : 180, this.compactMode() ? 0 : 50, this.width/2, 'left');

            if (this.windows().includes(this._scaleX)) {
                x = this._scaleX.x - this.x - 3;
                y = this._scaleX.y - this.y + this._scaleX.barTextY();
                this.drawText('X', x, y, this.width, 'left');
                x = this._scaleY.x - this.x - 3;
                y = this._scaleY.y - this.y + this._scaleY.barTextY();
                this.drawText('Y', x, y, this.width, 'left');
            }

            if (this.windows().includes(this._anchorX)) {
                x = this._anchorX.x - this.x - 3;
                y = this._anchorX.y - this.y + this._anchorX.barTextY();
                this.drawText('X', x, y, this.width, 'left');
                x = this._anchorY.x - this.x - 3;
                y = this._anchorY.y - this.y + this._anchorY.barTextY();
                this.drawText('Y', x, y, this.width, 'left');
            }

            if (this.windows().includes(this._gridLock)) {
                x = this._gridLockX.x - this.x - 3;
                y = this._gridLockX.y - this.y + this._gridLockX.barTextY();
                this.drawText('W', x, y, this.width, 'left');
                x = this._gridLockY.x - this.x - 3;
                y = this._gridLockY.y - this.y + this._gridLockY.barTextY();
                this.drawText('H', x, y, this.width, 'left');
            }

            if (this.windows().includes(this._toneR)) {
                x = this._toneR.x - this.x - 3;
                y = this._toneR.y - this.y + this._toneR.barTextY();
                this.changeTextColor(Knight.COLOR.DARK_ROSE);
                this.drawText('R', x, y, this.width, 'left');
                x = this._toneG.x - this.x - 3;
                y = this._toneG.y - this.y + this._toneG.barTextY();
                this.changeTextColor(Knight.COLOR.DARK_GREEN);
                this.drawText('G', x, y, this.width, 'left');
                x = this._toneB.x - this.x - 3;
                y = this._toneB.y - this.y + this._toneB.barTextY();
                this.changeTextColor(Knight.COLOR.DARK_BLUE);
                this.drawText('B', x, y, this.width, 'left');
                x = this._toneGrey.x - this.x - 3;
                y = this._toneGrey.y - this.y + this._toneGrey.barTextY();
                this.changeTextColor(Knight.COLOR.GREY);
                this.drawText('G', x, y, this.width, 'left');
                this.changeTextColor(this.normalColor());
            }
        }

        /**
         * @param {Number} x
         * @param {Number} y
         * @param {Number} maxWidth
         * @param {Number} maxHeight
         * @param {String} folder
         * @param {String} filename
         * @return {*}
         */
        drawDoodadImage(x, y, maxWidth, maxHeight, folder, filename) {
            const bitmap = ImageManager.loadDoodad(folder + '/' + filename, 0, true);
            if (bitmap.width <= 0) {
                return setTimeout(this.drawDoodadImage.bind(this, x, y, maxWidth, maxHeight, folder, filename), 5);
            }
            const xframes = DoodadManager.getXFrames(filename);
            const yframes = DoodadManager.getYFrames(filename);
            const pw = Math.floor(bitmap.width / xframes);
            const ph = Math.floor(bitmap.height / yframes);
            let dw = pw;
            let dh = ph;
            if (dw > maxWidth) {
                const rate = maxWidth / dw;
                dw *= rate;
                dh *= rate;
            }
            if (dh > maxHeight) {
                const rate = maxHeight / dh;
                dw *= rate;
                dh *= rate;
            }
            const dx = x + 2 + (maxWidth - dw) / 2;
            const dy = y + 2 + (maxHeight - dh) / 2;
            this.contents.blt(bitmap, 0, 0, pw, ph, dx, dy, dw, dh);
        };
    };

    //=============================================================================
    // Editor Checkbox
    //=============================================================================
    /**
     * Modified version of the default Checkbox for use with the Editor.
     *
     * @class Knight.EditorCheckbox
     * @extends {Knight.Checkbox}
     */
    Knight.EditorCheckbox = class extends Knight.Checkbox {
        /**
         * Plays a sound when the checkbox is interacted with.
         */
        playOkSound() {
            SoundManager.playCursor();
        };

        /**
         * Set checkbox to 'checked'
         * @param {Boolean} callOnChange
         */
        check(callOnChange = true) {
            this._checked = true;
            this.refresh();
            if (callOnChange) this.onChange();
        }

        /**
         * Set checkbox to 'unchecked'
         * @param {Boolean} callOnChange
         */
        uncheck(callOnChange = true) {
            this._checked = false;
            this.refresh();
            if (callOnChange) this.onChange();
        }

        /**
         */
        drawContents() {
            this.contents.fontFace = Knight.Param.KEPanelFont;
            this.contents.fontSize = 16;
            this.contents.outlineWidth = 4;
            this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)';
            this.changeTextColor(Knight.COLOR.LIGHT);
            this.contents.drawText(this._label, 0, 0, this.contents.width, this.contents.height, 'left');
            const drawX = this.textWidth(this._label) + 50;
            if (this.checked()) {
                this.drawGui(this._onImage, drawX, 0);
            } else {
                this.drawGui(this._offImage, drawX, 0);
            }
            if (this.isMouseInsideFrame() && this._hoverImage) {
                this.drawGui(this._hoverImage, drawX, 0);
            }
        }
    };

    //=============================================================================
    // Doodad Editor Slider
    //=============================================================================
    /**
     * Slider widget used in the object editor.
     *
     * @class Knight.EditorSlider
     * @extends {Knight.Button}
     */
    Knight.EditorSlider = class extends Knight.Button {
        /**
         * Creates an instance of Knight.Slider.
         *
         * @param {number} x                Window x coordinate
         * @param {number} y                Window y coordinate
         * @param {number} min              Slider min value.
         * @param {number} max              Slider max value.
         * @param {number} value            Slider starting value, in the range [min, max].
         * @param {number} step             Steps the slider moves in. Defaults to 1.
         * @param {string} label            Slider displayed title.
         * @param {string} labelMap         Optional map that converts values to label names. So you can have
         *                                  an internal value of "1" but display "Medium".
         * @param {string} valueFn          Optional function to be applied to return values. Can be used to map
         *                                  the stored integer values into any other value.
         * @param {boolean} snapToValue     When true, the slider position snaps to the nearest step value, so
         *                                  the bar moves in "steps" when dragging it. When false, there is no
         *                                  rounding, so the bar moves smoothly. This only affects the UI display,
         *                                  the value() returned by the slider is always rounded. Always set to true
         *                                  when a labelMap is provided.
         */
        constructor(x, y, min, max, value, step = 1, label = null, labelMap = null, valueFn = null, snapToValue = false) {
            const bgBitmap = ImageManager.loadGui('EditorSlider_Bar');
            const buttonBitmap = ImageManager.loadGui('EditorSlider_Handler');
            const labelHeight = label ? 60 : 0;
            const width = 350;
            const height = bgBitmap.height + labelHeight;
            super(x, y, null, null, null, width, height);
            this._min = min;
            this._max = max;
            this._value = value.clamp(min, max);
            this._step = step;
            this._buttonBitmap = buttonBitmap;
            this._barImageName = 'EditorSlider_Bar';
            this._fillImageName = 'EditorSlider_Fill';
            this._sliderStartX = 18;
            this._sliderEndX = this._sliderStartX + ImageManager.loadGui(this._barImageName).width;
            this._draggingDoodad = false;
            this._snapToValue = labelMap ? true : snapToValue;
            this._label = label;
            this._labelHeight = labelHeight;
            this._labelMap = labelMap;
            this._valueFn = valueFn;
            this.createWindows();
            this.refresh();
        }

        /**
         * @return {boolean}
         */
        hasTooltips() {
            return false;
        };

        /**
         * @return {number} Slider value. Rounds to nearest step value. Applies the value conversion
         *                  function, if one was provided when creating the slider.
         */
        value() {
            const v = this.roundToStep(this._value);
            return this._valueFn ? this._valueFn(v) : v;
        }

        /**
         * Rounds input number to nearest multiple of _step.
         * @return {number}
         */
        roundToStep(v) {
            return Math.round(v / this._step) * this._step;
        }

        /**
         * @param {Number} newValue
         */
        setValue(newValue) {
            if (newValue == undefined) newValue = this._min;
            newValue = newValue.clamp(this._min, this._max);
            this._value = this._snapToValue ? this.roundToStep(newValue) : newValue;
            this._handler.x = this.handlerX();
            this.refresh();
        }

        /**
         * @return {number} Data used for tooltip display
         */
        item() {
            return this._descriptionId;
        }

        /**
         * @return {number} Y position of the slider, without including the label.
         */
        widgetY() {
            return this._label ? this._labelHeight : 0;
        }

        /**
         * @return {number} Y position of slider bar.
         */
        barY() {
            return (this.contents.height - ImageManager.loadGui(this._barImageName).height) / 2;
        }

        /**
         * @return {number} Y position of slider bar text
         */
        barTextY() {
            const gaugeHeight = ImageManager.loadGui(this._barImageName).height;
            return this.barY() + (gaugeHeight / 2) - (this.lineHeight() / 2);
        }

        /**
         * @return {number} How full the slider is. A number between 0 and 1.
         */
        rate() {
            return (this._value - this._min) / (this._max - this._min);
        }

        /**
         * @return {number} X position of handler based on current value.
         */
        handlerX() {
            const diff = (this._sliderEndX - this._buttonBitmap.width - 4) - this._sliderStartX;
            return this.x + this._sliderStartX + 2 + Math.round(diff * this.rate());
        }

        /**
         */
        createWindows() {
            this._handler = new Knight.Button(
                this.handlerX(),
                this.y + (this.contents.height - this._buttonBitmap.height) / 2,
                "EditorSlider_Handler", "EditorSlider_Handler_Hover");
        }

        /**
         * Repositions child windows. Called when X coordinate changes.
         */
        reposition() {
            this._handler.x = this.handlerX();
            this._tooltipRect = new Rectangle(this.x, this.y, this.width, this.height);
            this._tooltipPosition = (this.x < (Graphics.width / 2)) ? 6 : 4;
        }

        /**
         * Adds child windows to parent scene's window layer.
         * @param {Scene_Base} scene    Parent scene
         */
        addWindowsToScene(scene) {
            scene.addChild(this._handler);
        };

        /**
         * Shows the window and all child windows.
         */
        show() {
            super.show();
            this._handler.show();
        }


        /**
         * Hides the window and all child windows.
         */
        hide() {
            super.hide();
            this._handler.hide();
        }

        /**
         * Shows the window and all child windows.
         */
        enable() {
            super.enable();
            this._handler.enable();
        }

        /**
         * Disable the window and all child windows.
         */
        disable() {
            super.disable();
            this._handler.disable();
        }

        /**
         * Frame update
         */
        update() {
            Window_Base.prototype.update.call(this);
            this.processHover();
            this.processTouch();
            this.processDrag();
        }

        /**
         * Handle mouse input
         */
        processTouch() {
            if (this.isOpenAndEnabled()) {
                if (TouchInput.isTriggered() && this._handler.isMouseInsideFrame()) {
                    this._draggingDoodad = true;
                } else if (TouchInput.isReleased()) {
                    this._draggingDoodad = false;
                }
            } else {
                this._draggingDoodad = false;
            }
        }

        /**
         * Handle mouse input
         */
        processDrag() {
            if (this._draggingDoodad) {
                const oldValue = this._value;
                const minX = this.x + this._sliderStartX;
                const maxX = this.x + this._sliderEndX;
                const destX = TouchInput.x.clamp(minX, maxX);
                const rate = (destX - minX) / (maxX - minX);
                this._value = this._min + (this._max - this._min) * rate;
                if (this._snapToValue) {
                    this._value = this.roundToStep(this._value);
                    this._handler.x = this.handlerX();
                } else {
                    this._handler.x = destX - (this._buttonBitmap.width / 2);
                }
                if (this._value !== oldValue) {
                    this.onChange();
                    this.refresh();
                }
            }
        }

        /**
         * Called whenever the slider value changes
         */
        onChange() {
            if (this.isHandled('onChange')) {
                this._handlers['onChange']();
            }
        }

        /**
         * Redraw checkbox
         */
        refresh() {
            if (this.contents && this._value != null) {
                this.contents.clear();
                this.drawContents();
            }
        }

        /**
         */
        drawContents() {
            this.contents.fontFace = Knight.Param.KEPanelFont;
            this.contents.fontSize = 16;
            this.contents.outlineWidth = 4;
            this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)';
            this.changeTextColor(Knight.COLOR.LIGHT);

            // Draw slider label
            if (this._label) {
                this.contents.drawText(this._label, 0, 0, this.contents.width, this.lineHeight(), 'left');
            }
            // Draw slider gauge
            // this.drawImageGauge(this._sliderStartX, this.barY(), this.rate(), this._barImageName, this._fillImageName);
            const x = this._sliderStartX;
            const y = this.barY();
            this.drawGui(this._barImageName, x, y);
            const rate = this.rate();
            if (rate > 0) {
                const backBitmap = ImageManager.loadGui(this._fillImageName);
                const dw = backBitmap.width * rate;
                this.drawGui(this._fillImageName, x + 2, y + 2, dw);
            }

            // Draw slider value
            // Round up to 2 decimal places
            const value = +(Math.round(this._value + "e+2")  + "e-2");
            const vx = this._sliderEndX + 10;
            const vy = this.barTextY();
            const valueText = this._labelMap ? this._labelMap[value] : value;
            this.contents.drawText(valueText, vx, vy, this.contents.width - vx, this.lineHeight(), 'left');
        }
    };

    //=============================================================================
    // Import From Map Window
    //=============================================================================
    Knight.Editor.Window_DoodadImport = class extends Knight.Window_Base {
        /**
         *Creates an instance of Window_DoodadImport.
        *
        * @param {Number} x
        * @param {Number} y
        * @param {Number} width
        * @param {Number} height
        * @param {KnightEditor} editor
        */
        constructor(x, y, width, height, editor) {
            super(x, y, width, height);
            this._editor = editor;
            this._windows = [];
            this.createWindows();
            this.refresh();
        }

        /**
         * @param {*} scene
         */
        addToScene(scene) {
            scene.addChild(this);
            this._windows.forEach(function(w) {
                scene.addChild(w);
                if (w.addWindowsToScene) w.addWindowsToScene(scene);
            });
        }

        /**
         */
        playOkSound() {
            this._mapIdBox.hasValidValue() ? SoundManager.playOk() : SoundManager.playBuzzer();
        };

        /**
         * @return {Number}
         */
        lineHeight() {
            return this.contents.fontSize;
        }

        /**
         * @return {Number}
         */
        mapId() {
            return this._mapIdBox.value();
        }

        /**
         */
        createWindows() {
            // Name Entry Box
            const validMapIds = [];
            for (const info of $dataMapInfos) {
                if (info && info.id !== DoodadManager.mapId()) validMapIds.push(info.id);
            }
            this._mapIdBox = new Knight.Editor.Window_NumberInput(this.x + 14, this.y + 38, 214, 27, 'Type a map ID...');
            this._mapIdBox.setValidValues(validMapIds);
            this._windows.push(this._mapIdBox);

            // Buttons
            // Close
            let buttonX = this.x + this.width - 30;
            let buttonY = this.y + 7;
            this._closeButton = new Knight.Button(buttonX, buttonY, 'Close', 'Close_Hover');
            this._closeButton.setOkSound(null);
            this._closeButton.setHandler('ok', this.processCancel.bind(this));
            this._windows.push(this._closeButton);

            const buttonSpacing = 20;
            const buttonWidth = 80;
            const buttonHeight = 30;
            const buttonAreaWidth = buttonWidth*2 + buttonSpacing;
            buttonX = this.x + this.width/2 - buttonAreaWidth/2;
            buttonY = this.y + this.height - buttonHeight - 12;

            // Confirm
            this._okButton = new Knight.Button(buttonX, buttonY, 'Button', 'Button_Hover', 'Confirm');
            this._okButton.setOkSound(null);
            this._okButton.setHandler('ok', this.processOk.bind(this));
            this._windows.push(this._okButton);

            // Cancel
            buttonX += buttonWidth + buttonSpacing;
            this._cancelButton = new Knight.Button(buttonX, buttonY, 'Button', 'Button_Hover', 'Cancel');
            this._cancelButton.setOkSound(null);
            this._cancelButton.setHandler('ok', this.processCancel.bind(this));
            this._windows.push(this._cancelButton);
        }

        /**
         */
        show() {
            Knight.Window_Base.prototype.show.call(this);
            this._windows.forEach((w) => w.show());
        }

        /**
         */
        hide() {
            Knight.Window_Base.prototype.hide.call(this);
            this._windows.forEach((w) => w.hide());
        }

        /**
         */
        enable() {
            Knight.Window_Base.prototype.enable.call(this);
            this._windows.forEach((w) => w.enable());
        }

        /**
         */
        disable() {
            Knight.Window_Base.prototype.disable.call(this);
            this._windows.forEach((w) => w.disable());
        }

        /**
         */
        activate() {
            Knight.Window_Base.prototype.activate.call(this);
            this._windows.forEach((w) => w.activate());
        }

        /**
         */
        deactivate() {
            Knight.Window_Base.prototype.deactivate.call(this);
            this._windows.forEach((w) => w.deactivate());
        }

        /**
         */
        refresh() {
            if (this.contents) {
                this.contents.clear();
                this.drawBackground();
            }
        }

        /**
         */
        drawBackground() {
            this.contents.fontFace = Knight.Param.KEFont;
            this.contents.fontSize = 16;
            this.contents.outlineWidth = 4;
            this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)';
            this.changeTextColor(Knight.COLOR.LIGHT);
            this.drawGui('Import_Window', 0, 0);
            this.drawText('Import From Map', 0, 10, this.contents.width, 'center');
        }
    };

    //=============================================================================
    // Yanfly Overwrites
    //=============================================================================
    Knight.Editor.Window_NumberInput = class extends Knight.Window_Base {
        /**
         *Creates an instance of Window_NumberInput.
        *
        * @param {Number} x
        * @param {Number} y
        * @param {Number} width
        * @param {Number} height
        * @param {String} title
        */
        constructor(x, y, width, height, title) {
            super(x, y, width, height);
            this._text = '';
            this._title = title;
            this._index = 0;
            this._maxLength = 3;
            this._maxValue = Number.MAX_SAFE_INTEGER;
            this._validValues = null;
            this._keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            this.refresh();
        };

        /**
         * @return {Number}
         */
        lineHeight() {
            return this.height;
        }

        /**
         */
        update() {
            Knight.Window_Base.prototype.update.call(this);
            this.processHandling();
        };

        /**
         */
        processHandling() {
            if (this.isOpenAndEnabled()) {
                if (Input.isRepeatedKE(Knight.INPUT['backspace'])) {
                    if (this.back()) {
                        Input.clear();
                        SoundManager.playCursor();
                    }
                    return;
                }
                this._keys.forEach(function(key) {
                    if (Input.isRepeatedKE(Knight.INPUT[key])) {
                        this.add(key);
                    }
                }, this);
            }
        };

        /**
         * @param {Array<Number>} valueList
         */
        setValidValues(valueList) {
            this._validValues = valueList;
            this.refresh();
        }

        /**
         * @param {Number} value
         */
        setMaxValue(value) {
            this._text = '';
            this._index = 0;
            this._maxValue = value;
            this._maxLength = (value === 0) ? 1 : Math.floor(Math.log10(value)) + 1;
            this.refresh();
        }

        /**
         * @return {Boolean}
         */
        hasValue() {
            return this._text !== '';
        }

        /**
         * @return {Boolean}
         */
        hasValidValue() {
            return this.hasValue() && !this._validValues || this._validValues.includes(this.toNumber());
        }

        /**
         * @return {Number}
         */
        toNumber() {
            return this.hasValue() ? Math.min(parseInt(this._text, 10), this._maxValue) : null;
        }

        /**
         * @return {Number}
         */
        value() {
            return this.hasValidValue() ? this.toNumber() : null;
        };

        /**
         * @param {String} char
         * @return {Boolean}
         */
        add(char) {
            if (this._index < this._maxLength) {
                this._text += char;
                this._index++;
                this.refresh();
                return true;
            } else {
                return false;
            }
        };

        /**
         * @return {Boolean}
         */
        back() {
            if (this._index > 0) {
                this._index--;
                this._text = this._text.slice(0, this._index);
                this.refresh();
                return true;
            } else {
                return false;
            }
        };

        /**
         * @return {Number}
         */
        charWidth() {
            const text = $gameSystem.isJapanese() ? '\uff21' : 'A';
            return this.textWidth(text);
        };

        /**
         * @return {Number}
         */
        left() {
            const nameCenter = this.contentsWidth() / 2;
            const nameWidth = (this._maxLength + 1) * this.charWidth();
            return Math.min(nameCenter - nameWidth / 2, this.contentsWidth() - nameWidth);
        };

        /**
         * @param {Number} index
         * @return {Object}
         */
        itemRect(index) {
            return {
                x: this.left() + index * this.charWidth(),
                y: 0,
                width: this.charWidth(),
                height: this.lineHeight(),
            };
        };

        /**
         * @param {Number} index
         */
        drawChar(index) {
            const rect = this.itemRect(index);
            this.drawText(this._text[index] || '', rect.x, rect.y);
        };

        /**
         */
        refresh() {
            this.contents.clear();
            this.contents.fontFace = Knight.Param.KEFont;
            this.contents.fontSize = 16;
            this.contents.outlineWidth = 4;
            this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)';
            if (this._text === '') {
                this.changeTextColor(Knight.COLOR.MID_GREY);
                this.drawText(this._title, 10, 0);
                this.setCursorRect(0, 0, 0, 0);
            } else {
                this.hasValidValue() ? this.changeTextColor(Knight.COLOR.LIGHT) : this.changeTextColor(Knight.COLOR.ROSE);
                for (let j = 0; j < this._text.length; j++) {
                    this.drawChar(j);
                }
                const rect = this.itemRect(this._index);
                this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
            }
        };
    };
    Knight.Editor.Window_NumberInput.prototype._refreshCursor = Window.prototype._refreshCursor;

    //=============================================================================
    // Yanfly Overwrites
    //=============================================================================
    DoodadManager.doodads = function() {
        return $dataDoodads[this.mapId()] || [];
    };

    DoodadManager.size = function() {
        return this.doodads().length;
    };

    DoodadManager.isDirty = function(mapId = this.mapId()) {
        this._isDirty = this._isDirty || [];
        return this._isDirty[mapId] || false;
    };

    DoodadManager.setDirty = function(isDirty, mapId = this.mapId()) {
        this._isDirty = this._isDirty || [];
        this._isDirty[mapId] = isDirty;
    };

    DoodadManager.isMouseOnDoodads = function() {
        const doodadSprites = SceneManager._scene._spriteset._doodads;
        if (doodadSprites) {
            let mx = TouchInput.x;
            let my = TouchInput.y;
            return doodadSprites.find((sprite) => DoodadManager.isMouseOnDoodad(sprite, mx, my));
        } else {
            return false;
        }
    };

    DoodadManager.isMouseOnDoodad = function(sprite, x, y) {
        const bounds = sprite.getBounds();
        return x >= bounds.left && y >= bounds.top && x < bounds.right && y < bounds.bottom;
    };

    DoodadManager.getTemplate = function(folderName, bitmapName) {
        const obj = {
            folder: folderName || '',
            bitmap: bitmapName || '',
            x: 0,
            y: 0,
            z: 3,
            toneRed: 0,
            toneGreen: 0,
            toneBlue: 0,
            toneGrey: 0,
            iconIndex: 0,
            anchorX: 0.5,
            anchorY: 1.0,
            scaleX: 1,
            scaleY: 1,
            rotation: 0,
            blend: 0,
            opacity: 255,
            xFrames: 1,
            yFrames: 1,
            frameUpdate: 20,
            smooth: Yanfly.Param.GFDSmooth,
        };
        if (Imported.YEP_X_ExtDoodadPack1) {
            obj.switchOn = [];
            obj.switchOff = [];
            obj.partyHave = [];
            obj.partyMiss = [];
        }
        return obj;
    };

    DoodadManager.blendNames = function() {
        return ['Normal', 'Additive', 'Multiply', 'Screen'];
    };

    DoodadManager.current = function() {
        return SceneManager._scene.currentDoodad();
    };

    DoodadManager.currentCopy = function() {
        return JsonEx.makeDeepCopy(SceneManager._scene.currentDoodad());
    };

    DoodadManager.updateManualMove = function() {
        if (this._manualMove !== false) return;
        if (SceneManager._scene._editor.inPlacementMode()) {
            this._manualX = TouchInput.x;
            this._manualY = TouchInput.y;
        } else {
            const doodad = SceneManager._scene._editor._currentDoodad;
            this._manualX = doodad.x;
            this._manualY = doodad.y;
        }
    };

    DoodadManager.keyDown = function(code) {
    };

    DoodadManager.usingManualMove = function() {
        return this._manualMove;
    };

    DoodadManager.manualMoveUp = function() {
        this.setManualMove(true);
        this._manualY -= this._gridLockMode ? this.gridLockY() : 1;
        return this._manualY;
    };

    DoodadManager.manualMoveDown = function() {
        this.setManualMove(true);
        this._manualY += this._gridLockMode ? this.gridLockY() : 1;
        return this._manualY;
    };

    DoodadManager.manualMoveLeft = function() {
        this.setManualMove(true);
        this._manualX -= this._gridLockMode ? this.gridLockX() : 1;
        return this._manualX;
    };

    DoodadManager.manualMoveRight = function() {
        this.setManualMove(true);
        this._manualX += this._gridLockMode ? this.gridLockX() : 1;
        return this._manualX;
    };

    Sprite_Doodad.prototype.update = function() {
        Sprite_Base.prototype.update.call(this);
        this.updatePosition();
        this.mode7Adjustment();
        if (!this._loadedData) return;
        this.updateCustomA();
        this.updateFrame();
        this.updateCustomZ();
        if (!this._loadedData) return;
        this.updateSettingsOpacity();
        this.updateSwitches();
    };

    Sprite_Doodad.prototype.updateSettingsOpacity = function() {
        this.opacity = this._data.opacity;
        if (Knight.Editor.isActive()) {
            const editor = SceneManager._scene._editor;
            if (editor.inPlacementMode()) {
                if (DoodadManager.current().z !== this._data.z) this.opacity /= 2;
            } else if (editor.inSelectionMode() && editor._currentDoodad) {
                const doodad = editor._currentDoodad;
                if (doodad.z !== this._data.z) this.opacity /= 2;
            }
        }
    };

    Sprite_DoodadCursor.prototype.update = function() {
        Sprite_Doodad.prototype.update.call(this);
        this.updatePosition();
        this.mode7Adjustment();
    };

    Sprite_DoodadCursor.prototype.updatePosition = function() {
        if (DoodadManager._manualMove) {
            this.x = this.gridX(DoodadManager._manualX);
            this.y = this.gridY(DoodadManager._manualY);
        } else {
            this.x = this.gridX(TouchInput.x);
            this.y = this.gridY(TouchInput.y);
        }
    };

    Sprite_DoodadCursor.prototype.mode7Adjustment = function() {
        if (Imported.Blizzard_UltraMode7) {
            const scale = this.screenScale();
            this.scale.x = scale * this._data.scaleX;
            this.scale.y = scale * this._data.scaleY;
        }
    };

    Sprite_DoodadCursor.prototype.gridX = function(value) {
        if (DoodadManager._gridLockMode && DoodadManager.current()) {
            const gridWidth = Math.floor(($gameMap.width() * $gameMap.tileWidth()) / DoodadManager.gridLockX());
            const gridTileWidth = DoodadManager.gridLockX();
            const originX = $gameMap._displayX * $gameMap.tileWidth();
            let gridX = Math.floor((originX + value) / gridTileWidth);
            gridX = $gameMap.isLoopHorizontal() ? gridX.mod(gridWidth) : gridX;
            value = ((gridX + 0.5) * gridTileWidth) - originX;
        }
        return value;
    };

    Sprite_DoodadCursor.prototype.gridY = function(value) {
        if (DoodadManager._gridLockMode && DoodadManager.current()) {
            const gridHeight = Math.floor(($gameMap.height() * $gameMap.tileHeight()) / DoodadManager.gridLockY());
            const gridTileHeight = DoodadManager.gridLockY();
            const originY = $gameMap._displayY * $gameMap.tileHeight();
            let gridY = Math.floor((originY + value) / gridTileHeight);
            gridY = $gameMap.isLoopHorizontal() ? gridY.mod(gridHeight) : gridY;
            value = ((gridY + 1.0) * gridTileHeight) - originY;
        }
        return value;
    };

    Spriteset_Map.prototype.currentDoodadX = function() {
        let value = this._doodadCursor.x;
        const tileWidth = $gameMap.tileWidth();
        value += $gameMap._displayX * tileWidth;
        if ($gameMap.isLoopHorizontal()) {
            value = value % ($gameMap.width() * tileWidth);
        }
        return Math.floor(value);
    };

    Spriteset_Map.prototype.currentDoodadY = function() {
        let value = this._doodadCursor.y;
        const tileHeight = $gameMap.tileHeight();
        value += $gameMap._displayY * $gameMap.tileHeight();
        if ($gameMap.isLoopVertical()) {
            value = value % ($gameMap.height() * tileHeight);
        }
        return Math.floor(value);
    };

    Spriteset_Map.prototype.doodadDragX = function() {
        let value;
        if (DoodadManager._gridLockMode) {
            const offset = $gameMap._displayX * $gameMap.tileWidth();
            value = this._doodadCursor.gridX(TouchInput.x) + offset;
        } else {
            value = $gameMap.canvasToMapPX(TouchInput.x);
        }
        return Math.floor(value);
    };

    Spriteset_Map.prototype.doodadDragY = function() {
        let value;
        if (DoodadManager._gridLockMode) {
            const offset = $gameMap._displayY * $gameMap.tileHeight();
            value = this._doodadCursor.gridY(TouchInput.y) + offset;
        } else {
            value = $gameMap.canvasToMapPY(TouchInput.y);
        }
        return Math.floor(value);
    };

    Scene_Map.prototype.createGFDWindows = function() {
    };
//=============================================================================
}; // Play Test Only

//=============================================================================
// Dragonbones Compatibility
//=============================================================================
if (Imported.KELYEP_DragonBones) {
    Sprite_Base.prototype.setBlendColor = function(color) {
        if (this._battler) {
            if (this._dragonboneSprite) this.setDragonbonesSpriteFlashColor(color);
        } else if (this.parent && this.parent._battler) {
            if (this.parent._dragonboneSprite) this.parent.setDragonbonesSpriteFlashColor(color);
        } else {
            Sprite.prototype.setBlendColor.call(this, color);
        }
    };
}
