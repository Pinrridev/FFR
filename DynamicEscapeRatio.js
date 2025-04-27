/*:
 * @plugindesc Controla la probabilidad de escape con bonus por equipo, estados, objetos y actores. Impide escapar si hay enemigos con <boss>. Soporta fórmula base o valor fijo. Compatible con YEP_BattleEngineCore y similares.
 * @author Tú
 *
 * @param Boss Tag
 * @desc El tag que marca a un enemigo como jefe (ej. <boss>)
 * @default boss
 *
 * @param Base Escape Percentage
 * @desc Valor base (ej. 50) o fórmula JS (ej. this.level * 2)
 * @default 50
 *
 * @help
 * Notetag:
 *   <EscapeBonus: X>
 * Usa este tag en:
 *   - Actores
 *   - Objetos
 *   - Armas
 *   - Armaduras
 *   - Estados
 *
 * para aumentar la posibilidad de escape en X%.
 */

(function() {
    const parameters = PluginManager.parameters('DynamicEscapeRatio');
    const bossTag = String(parameters['Boss Tag'] || 'boss');
    const baseEscapePercentage = String(parameters['Base Escape Percentage'] || '50');

    // Verifica si un enemigo es jefe
    Game_Enemy.prototype.isBoss = function() {
        return this.enemy().meta[bossTag];
    };

    // Leer <EscapeBonus: X>
    function getEscapeBonus(obj) {
        return obj && obj.meta && obj.meta['EscapeBonus'] ? Number(obj.meta['EscapeBonus']) : 0;
    }

    // Probabilidad individual de escape de un actor
    Game_Actor.prototype.escapeChance = function() {
        let base = 0;
        try {
            if (/^[\d.]+$/.test(baseEscapePercentage)) {
                base = Number(baseEscapePercentage);
            } else {
                base = eval(baseEscapePercentage);
            }
        } catch (e) {
            console.error("Error evaluando Base Escape Percentage:", baseEscapePercentage);
            base = 0;
        }

        let bonus = 0;

        this.equips().forEach(equip => {
            bonus += getEscapeBonus(equip);
        });

        this.states().forEach(stateId => {
            const state = $dataStates[stateId];
            bonus += getEscapeBonus(state);
        });

        bonus += getEscapeBonus(this.actor());

        const total = Math.min(100, Math.max(0, base + bonus));
        console.log(`${this.name()} -> Escape base: ${base}%, bonus: ${bonus}%, total: ${total}%`);
        return total;
    };

    // Escoge la mayor probabilidad del grupo
    Game_Party.prototype.groupEscapeChance = function() {
        const chances = this.members().map(actor => actor.escapeChance());
        const max = Math.max(...chances);
        console.log(`Máxima probabilidad de escape del grupo: ${max}%`);
        return max;
    };

    // Procesar escape con control de jefes y mensajes
    BattleManager.processEscape = function() {
        if (!$gameParty.inBattle()) return;

        const bossPresent = $gameTroop.members().some(enemy => enemy.isBoss());
        if (bossPresent) {
            console.log("¡No se puede escapar! Enemigo con tag <" + bossTag + ">");
            $gameMessage.add("¡No se puede escapar!");
            SoundManager.playBuzzer();
            return;
        }

        const chance = $gameParty.groupEscapeChance();
        const success = Math.random() < (chance / 100);
        console.log("Escape intento: " + (success ? "Éxito" : "Fallo"));

        // Obtener el nombre del actor que está intentando escapar
        const actorName = $gameParty.members().find(actor => actor.escapeChance() === chance).name();
        $gameMessage.add(TextManager.escapeStart.format(actorName)); // Ej: "¡Harold ha comenzado a huir!"
        $gameMessage.add(`Probabilidad de escape: ${chance.toFixed(0)}%`);

        if (success) {
            $gameMessage.add(TextManager.escapeSuccess); // "¡Escapaste del combate!"
            SoundManager.playEscape();
            this._escaped = true;
            this.processAbort();
        } else {
            $gameMessage.add(TextManager.escapeFailure); // "¡No pudiste escapar!"
            SoundManager.playBuzzer();
            this._escapeFail = true;
            this.startTurn();
        }
    };
})();
