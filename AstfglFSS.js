//=============================================================================
// AstfglFSS
// by Astfgl
// Date: 19/10/2016  
// Free to use both commercial and non commercial. Credits not required.
// Free to edit and redistribute as long as it is on the same terms of use.
// 19/10/2016 revision: proper aliasing of the original function
// 19/10/2016 revision 2: Yanfly passive states compatibily
// 19/10/2016 revision 3: modified to apply to enemies as well
// 19/10/2016 revision 4: release version, help updated.
// 24/11/2016 revision 5: modified function to allow to refer to the user's params.
//=============================================================================
 

/*:
 * @plugindesc Provides notetags to give flat stat boosts.
 * @author Astfgl
 * @help Use: mhpB, mmpB, atkB, defB, mdefB, matkB, agiB and lckB
 * You can use v(your number) inside a notetag to boost based on a variable
 * Example:
 * <mhpB: 100> Will boost the max hp of whoever is affected by it by 100;
 * <atkB: 10* v(1) + 5> Will boost the atk by 10 * game variable 1 plus 5.
 * <hpB: user.mp> Will boost the hp by the mp value.
 * For the javascript savvy: the notetags are evaled.
 */
 (function() {
 
	var parameters = PluginManager.parameters('AstfglFSS');
	
	var _Astfgl_newBBPP = Game_BattlerBase.prototype.paramPlus
	Game_BattlerBase.prototype.paramPlus = function(paramId) {
		if (!this._passiveStatesRaw) {this._passiveStatesRaw = []};
		var value = _Astfgl_newBBPP.call(this, paramId);
		value += getBonus(paramId, this._states, this)
		value += getBonus(paramId, this._passiveStatesRaw, this)
		return value
	};
	
	var getBonus = function(paramId,states, battler) {
		var user = battler;
		var value = 0;
		var v = function(id) {
			return $gameVariables.value(id)
		}
		
		for (var i = 0; i < states.length; i++) {
			var data = $dataStates[states[i]];
			switch (paramId) {
				case 0:
					if (data.meta.mhpB) {value += eval(data.meta.mhpB)};
					break;
				case 1:
					if (data.meta.mmpB) {value += eval(data.meta.mmpB)};
					break;
				case 2:
					if (data.meta.atkB) {value += eval(data.meta.atkB)};
					break;
				case 3:
					if (data.meta.defB) {value += eval(data.meta.defB)};
					break;
				case 4:
					if (data.meta.matkB) {value += eval(data.meta.matkB)};
					break;
				case 5:
					if (data.meta.mdefB) {value += eval(data.meta.mdefB)};
					break;
				case 6:
					if (data.meta.agiB) {value += eval(data.meta.agiB)};
					break;
				case 7:
					if (data.meta.lckB) {value += eval(data.meta.lckB)};
					break;
				default:
					break;	
			}
		}
		return value
	}
	
 })();