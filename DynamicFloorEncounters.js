/*:
 * @plugindesc Encuentros aleatorios dinámicos desde un pool de enemigos o tropas [v1.8] - Con selección múltiple de grupos de enemigos ✨
 * @author ChatGPT
 *
 * @param EnemiesPerBattle
 * @text Enemigos por batalla (modo enemigo suelto)
 * @type number
 * @min 1
 * @default 3
 *
 * @help
 * COMANDOS DE PLUGIN:
 * 
 *  -- MODO INDIVIDUAL (enemigos sueltos) --
 *  
 *  AddEnemyToPool x
 *     Añade el enemigo ID x al pool (modo individual)
 *
 *  RemoveEnemyFromPool x
 *     Quita el enemigo ID x del pool
 *
 *  ClearEnemyPool
 *     Limpia todos los enemigos individuales
 *
 *  SetEnemiesPerBattle x
 *     Fija la cantidad de enemigos por batalla (modo enemigo suelto)
 *
 *  SetEnemiesPerBattle min max
 *     Establece un rango aleatorio entre "min" y "max" enemigos por batalla (modo enemigo suelto)
 *
 *  -- MODO TROPAS (grupos predefinidos) --
 *
 *  AddRandomTroopsToPool cantidad minID maxID
 *     Añade "cantidad" de tropas aleatorias entre los IDs minID y maxID al pool de tropas
 *
 *  AddRandomTroopsFromList cantidad id1 id2 ...
 *     Añade "cantidad" de tropas al azar desde una lista de IDs que tú defines
 *
 *  ClearTroopPool
 *     Limpia el pool de tropas
 *
 *  -- MODO MULTIPLE GRUPOS --
 *
 *  AddRandomTroopsFromMultipleLists cantidad1 id1 id2 ... , cantidad2 id3 id4 ... , cantidad3 id5 id6 ...
 *     Añade grupos de enemigos de distintas listas de IDs (p. ej. 2 grupos de [1, 2, 3, 4, 5], 3 grupos de [7, 8, 9], 2 grupos de [1, 25])
 *
 *  -- COMANDOS DE DEPURACIÓN --
 *
 *  PrintEnemyPool
 *     Muestra el contenido del pool de enemigos en la consola
 *
 *  PrintTroopPool
 *     Muestra el contenido del pool de tropas en la consola
 */

(() => {
  const parameters = PluginManager.parameters('DynamicRandomEnemies');
  const defaultEnemiesPerBattle = Number(parameters['EnemiesPerBattle'] || 3);

  let enemyPool = [];
  let troopPool = [];

  // Función para obtener la cantidad actual de enemigos por batalla
  function getEnemiesPerBattle() {
    const setting = $gameSystem._dynamicEnemiesPerBattleSetting;
    if (!setting) return defaultEnemiesPerBattle;

    if (setting.type === 'fixed') {
      return setting.value;
    }

    if (setting.type === 'range') {
      const min = setting.min;
      const max = setting.max;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return defaultEnemiesPerBattle;
  }

  // Comandos de plugin
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    switch (command) {
      // Modo Individual (Enemigos sueltos)
      case 'AddEnemyToPool': {
        const id = Number(args[0]);
        if (!enemyPool.includes(id)) enemyPool.push(id);
        break;
      }

      case 'RemoveEnemyFromPool': {
        const id = Number(args[0]);
        enemyPool = enemyPool.filter(e => e !== id);
        break;
      }

      case 'ClearEnemyPool':
        enemyPool = [];
        break;

      case 'SetEnemiesPerBattle': {
        const arg1 = Number(args[0]);
        const arg2 = Number(args[1]);

        if (!isNaN(arg1) && !isNaN(arg2) && arg2 >= arg1) {
          $gameSystem._dynamicEnemiesPerBattleSetting = {
            type: 'range',
            min: arg1,
            max: arg2
          };
        } else if (!isNaN(arg1)) {
          $gameSystem._dynamicEnemiesPerBattleSetting = {
            type: 'fixed',
            value: arg1
          };
        }
        break;
      }

      // Modo Tropas (Grupos predefinidos)
      case 'AddRandomTroopsToPool': {
        const count = Number(args[0]);
        const min = Number(args[1]);
        const max = Number(args[2]);
        const available = [];

        for (let i = min; i <= max; i++) {
          if ($dataTroops[i]) available.push(i);
        }

        for (let j = 0; j < count; j++) {
          if (available.length === 0) break;
          const index = Math.floor(Math.random() * available.length);
          const selected = available.splice(index, 1)[0];
          if (!troopPool.includes(selected)) troopPool.push(selected);
        }

        break;
      }

      case 'AddRandomTroopsFromList': {
        const count = Number(args[0]);
        const list = args.slice(1).map(Number).filter(id => $dataTroops[id]);
        const copy = [...list];

        for (let j = 0; j < count; j++) {
          if (copy.length === 0) break;
          const index = Math.floor(Math.random() * copy.length);
          const selected = copy.splice(index, 1)[0];
          if (!troopPool.includes(selected)) troopPool.push(selected);
        }

        break;
      }

      case 'ClearTroopPool':
        troopPool = [];
        break;

      // Modo Múltiples Listas de Grupos (Nueva versión con coma como separador)
      case 'AddRandomTroopsFromMultipleLists': {
        // Dividir las entradas por coma
        const groupData = args.join(' ').split(',');

        groupData.forEach(group => {
          const parts = group.trim().split(' '); // Separa cantidad de las IDs
          const count = Number(parts[0]);
          const list = parts.slice(1).map(Number).filter(id => $dataTroops[id]);
          const copy = [...list];

          for (let j = 0; j < count; j++) {
            if (copy.length === 0) break;
            const randIndex = Math.floor(Math.random() * copy.length);
            const selected = copy.splice(randIndex, 1)[0];
            if (!troopPool.includes(selected)) troopPool.push(selected);
          }
        });

        break;
      }

      // Comandos de depuración
      case 'PrintEnemyPool': {
        console.log('Contenido del pool de enemigos: ', enemyPool);
        break;
      }

      case 'PrintTroopPool': {
        console.log('Contenido del pool de tropas: ', troopPool);
        break;
      }
    }
  };

  // Reemplazamos cómo se elige la tropa de encuentro aleatorio
  const _Game_Player_makeEncounterTroopId = Game_Player.prototype.makeEncounterTroopId;
  Game_Player.prototype.makeEncounterTroopId = function() {
    if (troopPool.length > 0) {
      const troopId = troopPool[Math.floor(Math.random() * troopPool.length)];
      return troopId;
    }

    // Si no hay tropas personalizadas, generamos una al vuelo si hay enemigos
    if (enemyPool.length > 0) {
      const baseTroop = $dataTroops[1]; // Tropa vacía usada como plantilla
      baseTroop.members = [];

      const count = getEnemiesPerBattle();
      for (let i = 0; i < count; i++) {
        const enemyId = enemyPool[Math.floor(Math.random() * enemyPool.length)];
        baseTroop.members.push({
          enemyId: enemyId,
          x: 100 + i * 150,
          y: 280,
        });
      }

      return 1; // Usamos la tropa 1 como tropa dinámica
    }

    // Si no hay nada en los pools, se usa el comportamiento por defecto
    return _Game_Player_makeEncounterTroopId.call(this);
  };
})();
