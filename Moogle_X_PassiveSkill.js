/*:
 * @plugindesc v1.15 Adds passive skills functionality with full Yanfly compatibility
 * @author Moogle_X (modified for YEP compatibility)
 * 
 * @help
 * ============================================================================
 * This version has been modified to work correctly with:
 * - YEP_BaseParamControl
 * - VE_DualWield
 * - YEP_X_EquipRequirements
 * ============================================================================
 */

var Imported = Imported || {};
Imported.Moogle_X_PsvSkl = true;

var Moogle_X = Moogle_X || {};
Moogle_X.PsvSkl = Moogle_X.PsvSkl || {};

//=============================================================================
// Game_Actor - Core Implementation
//=============================================================================

(function() {
    // Store original methods safely
    var _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
    var _Game_Actor_traitObjects = Game_Actor.prototype.traitObjects;
    var _Game_Actor_param = Game_Actor.prototype.param;
    var _Game_Actor_refresh = Game_Actor.prototype.refresh;
    var _Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
    var _Game_Actor_forgetSkill = Game_Actor.prototype.forgetSkill;
    
    // Safe storage of original customParamMax if it exists
    if (Game_Actor.prototype.customParamMax) {
        Moogle_X.PsvSkl._Game_Actor_customParamMax = Game_Actor.prototype.customParamMax;
    }

    // Improved initialization
    Game_Actor.prototype.initMembers = function() {
        _Game_Actor_initMembers.call(this);
        this.initPassiveSkillSystem();
    };

    Game_Actor.prototype.initPassiveSkillSystem = function() {
        this._psvTraits = [];
        this._psvCache = {
            mhpRefreshed: 0,
            traits: null,
            params: {}
        };
    };

    // Refresh passive traits
    Game_Actor.prototype.refreshPassiveTraits = function() {
        this._psvTraits = [];
        var skillIds = this._skills.filter(function(id) {
            return $dataSkills[id] && $dataSkills[id].isPassive;
        });
        
        for (var i = 0; i < skillIds.length; i++) {
            var weaponId = $dataSkills[skillIds[i]].psvWeaponId;
            if (weaponId && $dataWeapons[weaponId]) {
                var trait = this.createPassiveTrait($dataWeapons[weaponId]);
                if (trait) {
                    this.processPassiveTrait(trait);
                    this._psvTraits.push(trait);
                }
            }
        }
        this._psvCache.traits = this._psvTraits.slice();
        this._psvCache.mhpRefreshed = this._skills.length;
    };

    // Create compatible passive trait
    Game_Actor.prototype.createPassiveTrait = function(weapon) {
        return {
            id: weapon.id,
            name: weapon.name,
            traits: weapon.traits || [],
            params: weapon.params || [],
            note: weapon.note || '',
            wtypeId: weapon.wtypeId,
            
            // Required methods for VE_DualWield
            isWeapon: function() { return true; },
            isArmor: function() { return false; },
            isDualWield: function() { return false; },
            isDoubleGrip: function() { return false; },
            etrait: function() { return []; },
            
            // For YEP_BaseParamControl
            plusParams: [0,0,0,0,0,0,0,0],
            rateParams: [1,1,1,1,1,1,1,1],
            flatParams: [0,0,0,0,0,0,0,0],
            maxParams: [],
            minParams: [],
            
            psvProcessed: false
        };
    };

    // Process notetags for passive traits
    Game_Actor.prototype.processPassiveTrait = function(trait) {
        if (!trait.note || trait.psvProcessed) return;
        
        var notedata = trait.note.split(/[\r\n]+/);
        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(/<(.*) MAX:\s*(\d+)>/i)) {
                var param = this.getParamId(RegExp.$1);
                if (param !== null) trait.maxParams[param] = parseInt(RegExp.$2);
            }
        }
        trait.psvProcessed = true;
    };

    // Get parameter ID
    Game_Actor.prototype.getParamId = function(string) {
        if (!string) return null;
        string = string.toUpperCase().replace(/\s+/g, '');
        
        if (string.match(/MHP|MAXHP|HP/)) return 0;
        if (string.match(/MMP|MAXMP|MP/)) return 1;
        if (string.match(/ATK|ATTACK/)) return 2;
        if (string.match(/DEF|DEFENSE/)) return 3;
        if (string.match(/MAT|MAGICATTACK|M\.ATTACK/)) return 4;
        if (string.match(/MDF|MAGICDEFENSE|M\.DEFENSE/)) return 5;
        if (string.match(/AGI|AGILITY/)) return 6;
        if (string.match(/LUK|LUCK/)) return 7;
        return null;
    };

    // Get passive traits with caching
    Game_Actor.prototype.passiveTraits = function() {
        if (!this._psvCache.traits || this._skills.length !== this._psvCache.mhpRefreshed) {
            this.refreshPassiveTraits();
        }
        return this._psvCache.traits || [];
    };

    // Override traitObjects
    Game_Actor.prototype.traitObjects = function() {
        var objects = _Game_Actor_traitObjects.call(this);
        return objects.concat(this.passiveTraits());
    };

    // Safe customParamMax implementation
    Game_Actor.prototype.customParamMax = function(paramId) {
        var originalValue = Moogle_X.PsvSkl._Game_Actor_customParamMax ? 
            Moogle_X.PsvSkl._Game_Actor_customParamMax.call(this, paramId) : 
            (this.isActor() ? 9999 : 999999);
        
        var maxValue = originalValue;
        var passives = this.passiveTraits();
        
        for (var i = 0; i < passives.length; i++) {
            if (passives[i] && passives[i].maxParams && passives[i].maxParams[paramId]) {
                maxValue = Math.max(maxValue, passives[i].maxParams[paramId]);
            }
        }
        
        return maxValue;
    };

    // Refresh handling
    Game_Actor.prototype.refresh = function() {
        this._psvCache.traits = null;
        _Game_Actor_refresh.call(this);
    };

    // Learn/Forget skill patches
    Game_Actor.prototype.learnSkill = function(skillId) {
        var wasPassive = $dataSkills[skillId] && $dataSkills[skillId].isPassive;
        _Game_Actor_learnSkill.call(this, skillId);
        if (wasPassive) this.refresh();
    };

    Game_Actor.prototype.forgetSkill = function(skillId) {
        var wasPassive = $dataSkills[skillId] && $dataSkills[skillId].isPassive;
        _Game_Actor_forgetSkill.call(this, skillId);
        if (wasPassive) this.refresh();
    };
})();

//=============================================================================
// DataManager - Notetag Processing
//=============================================================================

(function() {
    Moogle_X.PsvSkl.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!Moogle_X.PsvSkl.DataManager_isDatabaseLoaded.call(this)) return false;
        if (!Moogle_X.PsvSkl.databaseLoaded) {
            this.processPsvNotetags($dataSkills);
            Moogle_X.PsvSkl.databaseLoaded = true;
        }
        return true;
    };

    DataManager.processPsvNotetags = function(group) {
        var note1 = /<(?:PSV WEAPON ID):\s*(\d+)>/i;
        var note2 = /<(?:PSV HIDE BATTLE)>/i;

        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            if (!obj || !obj.note) continue;

            obj.isPassive = false;
            obj.psvWeaponId = 0;
            obj.psvHideBattle = false;

            var notedata = obj.note.split(/[\r\n]+/);
            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(note1)) {
                    obj.isPassive = true;
                    obj.psvWeaponId = parseInt(RegExp.$1);
                } else if (line.match(note2)) {
                    obj.psvHideBattle = true;
                }
            }
        }
    };
})();