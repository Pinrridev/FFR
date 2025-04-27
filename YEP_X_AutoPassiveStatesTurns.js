/*:
 * @plugindesc Añade soporte a YEP_AutoPassiveStates para aplicar estados pasivos temporales por turnos. <Passive State Turns: x, y>
 * @author ChatGPT
 * 
 * @help
 * Este plugin requiere que YEP_AutoPassiveStates esté activo.
 *
 * Notetags:
 *   <Passive State Turns: x, y>
 *   <Passive State Turns: x x x, y>
 *
 * Ejemplos:
 *   <Passive State Turns: 12, 3> → Aplica el estado 12 durante 3 turnos
 *   <Passive State Turns: 12 15 17, 5> → Aplica los estados 12, 15 y 17 durante 5 turnos
 */

(function() {
    console.log("🔌 YEP_X_AutoPassiveStatesTurns.js ha sido cargado.");

    // Reemplazar la función de inicio de turno del Game_Battler
    const _Game_Battler_startTurn = Game_Battler.prototype.startTurn;
    Game_Battler.prototype.startTurn = function() {
        if (!this._passiveStatesApplied) {
            this._passiveStatesApplied = true;
            if (this.isActor()) {
                BattleManager.applyPassiveStateTurns(this);
            }
        }
        _Game_Battler_startTurn.call(this);
    };

    // Función que maneja la aplicación de los estados pasivos
    BattleManager.applyPassiveStateTurns = function(actor) {
        console.log(`⏳ Aplicando estados pasivos a ${actor.name()}`);

        // Obtener los objetos equipados (armaduras y armas)
        const armorObjects = actor.equips().filter(equip => equip && equip.note);

        console.log(`📦 Revisando los objetos equipados de ${actor.name()}:`);
        armorObjects.forEach(obj => {
            console.log(`🔍 Revisando notetags de la armadura: ${obj.name}`);
            console.log(obj.note);

            // Buscamos el notetag <Passive State Turns: x, y>
            const regex = /<Passive State Turns:\s*([\d\s]+),\s*(\d+)\s*>/gi;
            let match;
            while ((match = regex.exec(obj.note)) !== null) {
                const stateIds = match[1].trim().split(/\s+/).map(Number);
                const duration = parseInt(match[2]);

                console.log(`📝 Notetag encontrado: Estados [${stateIds}] por ${duration} turnos`);

                stateIds.forEach(stateId => {
                    if ($dataStates[stateId]) {
                        actor.addState(stateId);
                        console.log(`✅ ${actor.name()} gana estado ${stateId} (${duration} turnos)`);
                        // Guardamos la duración para poder remover el estado cuando se agote
                        actor._passiveStateTurns = actor._passiveStateTurns || {};
                        actor._passiveStateTurns[stateId] = duration;
                    } else {
                        console.warn(`⚠️ Estado ID ${stateId} no existe en $dataStates`);
                    }
                });
            }
        });
    };

    // Función para restar turnos y eliminar estados pasivos cuando se expiran
    const _Game_Battler_onTurnEnd = Game_Battler.prototype.onTurnEnd;
    Game_Battler.prototype.onTurnEnd = function() {
        _Game_Battler_onTurnEnd.call(this);

        if (!this._passiveStateTurns) return;

        for (const stateId in this._passiveStateTurns) {
            if (this.isStateAffected(Number(stateId))) {
                this._passiveStateTurns[stateId]--;
                console.log(`🔄 ${this.name()} - Estado ${stateId} ahora tiene ${this._passiveStateTurns[stateId]} turnos restantes`);

                if (this._passiveStateTurns[stateId] <= 0) {
                    this.removeState(Number(stateId));
                    delete this._passiveStateTurns[stateId];
                    console.log(`❌ ${this.name()} pierde estado ${stateId} (expirado)`);
                }
            }
        }
    };

})();
