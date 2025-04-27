/*:
 * @plugindesc Aplica estados pasivos usando el sistema meta - Versión Final
 * @author ElDely (con base en código existente)
 *
 * @help 
 * USO:
 * <Passive State Turns: ID, TURNS>
 * Ejemplo: <Passive State Turns: 12, 3>
 */

(function() {
    // Sistema de depuración permanente
    const DEBUG = true;
    
    function debugLog() {
        if (DEBUG) console.log.apply(console, arguments);
    }
    
    function debugGroup() {
        if (DEBUG) console.group.apply(console, arguments);
    }
    
    function debugGroupEnd() {
        if (DEBUG) console.groupEnd();
    }

    debugLog('[PassiveStateMeta] Plugin iniciado');

    // Función para leer notetags usando el sistema meta
    function getPassiveStateTurns(item) {
        if (!item) {
            debugLog('[WARN] Item es nulo');
            return null;
        }

        debugGroup('[META] Analizando item:', item.name);
        
        // Verificar si existe el sistema meta
        if (!item.meta) {
            debugLog('[INFO] El item no tiene propiedad meta');
            
            // Alternativa: parsear la nota manualmente si meta no existe
            if (item.note) {
                const match = item.note.match(/<Passive State Turns:\s*(\d+)\s*,\s*(\d+)>/i);
                if (match) {
                    const stateId = parseInt(match[1], 10);
                    const turns = parseInt(match[2], 10);
                    debugLog('[SUCCESS] Notetag encontrado (en note):', stateId, turns);
                    debugGroupEnd();
                    return { stateId, turns };
                }
            }
            
            debugLog('[FAIL] No se encontró el notetag');
            debugGroupEnd();
            return null;
        }

        // Leer usando meta
        const value = item.meta['Passive State Turns'];
        if (!value) {
            debugLog('[INFO] No se encontró Passive State Turns en meta');
            debugGroupEnd();
            return null;
        }

        // Procesar el valor del meta tag
        const parts = value.split(',').map(part => parseInt(part.trim(), 10));
        if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) {
            debugLog('[WARN] Formato incorrecto en meta tag');
            debugGroupEnd();
            return null;
        }

        debugLog('[SUCCESS] Notetag encontrado (en meta):', parts[0], parts[1]);
        debugGroupEnd();
        return { stateId: parts[0], turns: parts[1] };
    }

    // Inyectar en el inicio de batalla
    const _BattleManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        debugLog('[EVENT] Batalla iniciada - Aplicando estados');
        this.applyPassiveStatesWithTurns();
        _BattleManager_startBattle.call(this);
    };

    BattleManager.applyPassiveStatesWithTurns = function() {
        $gameParty.members().forEach(actor => {
            debugGroup('[ACTOR] Procesando:', actor.name());
            
            actor.equips().forEach((item, index) => {
                if (!item) {
                    debugLog('[SLOT] Slot', index, 'vacío');
                    return;
                }

                debugGroup('[ITEM] Procesando:', item.name);
                const passive = getPassiveStateTurns(item);
                
                if (passive) {
                    debugLog('[APPLY] Aplicando estado:', passive.stateId, 'por', passive.turns, 'turnos');
                    
                    actor.addState(passive.stateId);
                    actor._stateTurns = actor._stateTurns || {};
                    actor._stateTurns[passive.stateId] = passive.turns;
                    
                    // Verificación
                    if (actor.isStateAffected(passive.stateId)) {
                        debugLog('[CHECK] Estado aplicado correctamente');
                    } else {
                        debugLog('[ERROR] El estado no se aplicó');
                    }
                }
                
                debugGroupEnd();
            });
            
            debugGroupEnd();
        });
    };

    // Manejo de turnos
    const _Game_Battler_updateStateTurns = Game_Battler.prototype.updateStateTurns;
    Game_Battler.prototype.updateStateTurns = function() {
        if (this._stateTurns) {
            for (const stateId in this._stateTurns) {
                if (this._stateTurns.hasOwnProperty(stateId)) {
                    this._stateTurns[stateId]--;
                    if (this._stateTurns[stateId] <= 0) {
                        debugLog('[REMOVE] Eliminando estado:', stateId);
                        this.removeState(Number(stateId));
                        delete this._stateTurns[stateId];
                    }
                }
            }
        }
        _Game_Battler_updateStateTurns.call(this);
    };

    debugLog('[READY] Plugin listo');
})();