const ALTAR_STRUCTURE = 'immortalprometheus:prometheus_altar';
const ALTAR_CENTER = [5, 1, 5];
const CARVED_FOUNDATION = [
  [5, 0, 5],
  [5, 0, 1],
  [1, 0, 5],
  [9, 0, 5],
  [5, 0, 9],
  [2, 0, 2],
  [8, 0, 2],
  [2, 0, 8],
  [8, 0, 8],
];
const FOUNDATION_ROWS = [
  [4, 0, 0, 6, 0, 0],
  [1, 0, 1, 9, 0, 1],
  [1, 0, 2, 9, 0, 2],
  [1, 0, 3, 9, 0, 3],
  [0, 0, 4, 10, 0, 4],
  [0, 0, 5, 10, 0, 5],
  [0, 0, 6, 10, 0, 6],
  [1, 0, 7, 9, 0, 7],
  [1, 0, 8, 9, 0, 8],
  [1, 0, 9, 9, 0, 9],
  [4, 0, 10, 6, 0, 10],
];
const MINIMUM_PEDESTALS = [
  [5, 1, 1],
  [1, 1, 5],
  [9, 1, 5],
  [5, 1, 9],
];
const OPTIONAL_PEDESTALS = [
  [2, 1, 2],
  [8, 1, 2],
  [2, 1, 8],
  [8, 1, 8],
];
const RECIPE_PEDESTALS = [
  { pos: [5, 1, 1], item: 'minecraft:iron_ingot' },
  { pos: [1, 1, 5], item: 'minecraft:gold_ingot' },
  { pos: [9, 1, 5], item: 'minecraft:redstone' },
  { pos: [5, 1, 9], item: 'minecraft:lapis_lazuli' },
];

Ponder.tags((event) => {
  event.createTag(
    'immortalprometheus:prometheus_altar',
    'immortalprometheus:prometheus_forge',
    'Алтарь Прометея',
    'Постройка и запуск алтаря',
    [
      'immortalprometheus:prometheus_forge',
      'immortalprometheus:mysterious_book',
      'immortalprometheus:mana_crystal',
      'immortalprometheus:basalt_pedestal',
      'immortalprometheus:polished_calcite',
      'immortalprometheus:carved_calcite',
    ]
  );
});

Ponder.registry((event) => {
  event
    .create('immortalprometheus:prometheus_forge')
    .tag('immortalprometheus:prometheus_altar')
    .scene(
      'prometheus_altar_construction',
      'Постройка Алтаря Прометея',
      ALTAR_STRUCTURE,
      (scene, util) => {
        configureScene(scene);
        revealCarvedFoundation(scene);
        scene.addKeyframe();

        scene
          .text(85, 'Тёмные узлы и центр нижнего слоя делаются из резного кальцита.', [9.5, 1.15, 5.5])
          .placeNearTarget();
        scene.idle(90);

        revealFoundation(scene);
        scene.addKeyframe();

        scene
          .text(90, 'Остальная круглая площадка нижнего слоя делается из полированного кальцита.', [8.5, 1.05, 5.5])
          .placeNearTarget();
        scene.idle(95);

        scene.world.showSection(ALTAR_CENTER, Facing.DOWN);
        scene.idle(15);
        scene.addKeyframe();

        scene
          .text(80, 'В центре ставится алтарь ковки из Ancient Forgemastery.', [5.5, 1.55, 5.5])
          .placeNearTarget();
        scene.idle(85);

        showPedestals(scene, MINIMUM_PEDESTALS, 12);
        scene.addKeyframe();
        scene
          .text(95, 'Для запуска достаточно любых четырёх пьедесталов в этих слотах.', [9.5, 2.05, 5.5])
          .placeNearTarget();
        scene.idle(100);

        scene.addKeyframe();
        scene
          .text(95, 'Когда структура собрана, присядь и нажми Таинственной книгой по центру.', [5.5, 1.55, 5.5])
          .placeNearTarget();
        scene
          .showControls(60, [5.5, 3.0, 5.5], 'down')
          .rightClick()
          .withItem('immortalprometheus:mysterious_book')
          .whileSneaking();
        scene.idle(100);

        scene.world.setBlock(ALTAR_CENTER, 'immortalprometheus:prometheus_forge', true);
        scene.idle(20);

        scene
          .text(80, 'После этого блок навсегда станет Кузницей Прометея.', [5.5, 1.55, 5.5])
          .placeNearTarget();
        scene.idle(85);

        showPedestals(scene, OPTIONAL_PEDESTALS, 10);
        scene.addKeyframe();
        scene
          .text(80, 'Диагональные слоты опциональны: их можно добавить позже.', [8.5, 2.05, 8.5])
          .placeNearTarget();
        scene.idle(85);
      }
    )
    .scene(
      'prometheus_altar_crafting',
      'Работа Кузницы Прометея',
      ALTAR_STRUCTURE,
      (scene, util) => {
        configureScene(scene);
        scene.showBasePlate();
        scene.idle(10);

        scene.world.showSection([0, 1, 0, 10, 1, 10], Facing.DOWN);
        scene.world.setBlock(ALTAR_CENTER, 'immortalprometheus:prometheus_forge', true);
        scene.idle(15);
        scene.addKeyframe();

        scene
          .text(80, 'Сначала заряди используемые пьедесталы кристаллами маны.', [5.5, 2.05, 1.5])
          .placeNearTarget();
        scene
          .showControls(40, [5.5, 2.8, 1.5], 'down')
          .rightClick()
          .withItem('immortalprometheus:mana_crystal');
        RECIPE_PEDESTALS.forEach((entry) => {
          chargePedestal(scene, entry.pos, 3);
        });
        scene.idle(85);
        scene.addKeyframe();

        scene
          .text(75, 'Потом положи основной предмет в центр кузницы.', [5.5, 1.55, 5.5])
          .placeNearTarget();
        scene
          .showControls(40, [5.5, 3.0, 5.5], 'down')
          .rightClick()
          .withItem('minecraft:stick');
        setForgeInput(scene, 'minecraft:stick');
        scene.idle(80);

        scene.addKeyframe();
        scene
          .text(95, 'Ингредиенты кладутся на любые заряженные пьедесталы. Порядок не важен.', [1.5, 2.05, 5.5])
          .placeNearTarget();

        RECIPE_PEDESTALS.forEach((entry) => {
          const controlPos = [entry.pos[0] + 0.5, entry.pos[1] + 1.4, entry.pos[2] + 0.5];
          scene
            .showControls(25, controlPos, 'down')
            .rightClick()
            .withItem(entry.item);
          chargePedestal(scene, entry.pos, 3);
          setPedestalItem(scene, entry.pos, entry.item);
          scene.idle(12);
        });

        scene.idle(55);
        scene.addKeyframe();
        scene
          .text(95, 'Нажми Таинственной книгой по кузнице, чтобы запустить ритуал.', [5.5, 1.55, 5.5])
          .placeNearTarget();
        scene
          .showControls(50, [5.5, 3.0, 5.5], 'down')
          .rightClick()
          .withItem('immortalprometheus:mysterious_book');
        setForgeCrafting(scene, 'minecraft:stick');
        scene.idle(125);

        RECIPE_PEDESTALS.forEach((entry) => {
          clearPedestal(scene, entry.pos, 2);
        });
        setForgeResult(scene, 'minecraft:netherite_ingot');
        scene.idle(25);

        scene.addKeyframe();
        scene
          .text(90, 'Если сломать кузницу или пьедестал, ритуал прервётся. Результат появится в центре.', [5.5, 1.55, 5.5])
          .placeNearTarget();
        scene.idle(95);
      }
    );
});

function configureScene(scene) {
  scene.configureBasePlate(0, 0, 11);
  scene.scaleSceneView(0.68);
  scene.setSceneOffsetY(-1);
  scene.rotateCameraY(45);
}

function revealCarvedFoundation(scene) {
  CARVED_FOUNDATION.forEach((pos) => {
    scene.world.showSection(pos, Facing.DOWN);
    scene.idle(6);
  });
}

function revealFoundation(scene) {
  FOUNDATION_ROWS.forEach((row) => {
    scene.world.showSection(row, Facing.DOWN);
    scene.idle(3);
  });
}

function showPedestals(scene, positions, idleTicks) {
  positions.forEach((pos) => {
    scene.world.showSection(pos, Facing.DOWN);
    scene.idle(idleTicks);
  });
}

function chargePedestal(scene, pos, charges) {
  scene.world.setBlock(pos, Block.id('immortalprometheus:basalt_pedestal').with('charges', charges), true);
}

function setPedestalItem(scene, pos, itemId) {
  scene.world.modifyBlockEntityNBT(pos, (nbt) => {
    nbt.charges = 3;
    nbt.craftLocked = false;
    nbt.storedItem = {
      id: itemId,
      Count: 1,
    };
  });
}

function clearPedestal(scene, pos, charges) {
  scene.world.setBlock(pos, Block.id('immortalprometheus:basalt_pedestal').with('charges', charges), true);
  scene.world.modifyBlockEntityNBT(pos, (nbt) => {
    nbt.charges = charges;
    nbt.craftLocked = false;
    nbt.remove('storedItem');
  });
}

function setForgeInput(scene, itemId) {
  scene.world.modifyBlockEntityNBT(ALTAR_CENTER, (nbt) => {
    nbt.inputItem = {
      id: itemId,
      Count: 1,
    };
    nbt.craftingLocked = false;
    nbt.craftStartGameTime = -1;
    nbt.remove('outputItem');
  });
}

function setForgeCrafting(scene, itemId) {
  scene.world.modifyBlockEntityNBT(ALTAR_CENTER, (nbt) => {
    nbt.inputItem = {
      id: itemId,
      Count: 1,
    };
    nbt.craftingLocked = true;
    nbt.craftStartGameTime = 0;
    nbt.remove('outputItem');
  });
}

function setForgeResult(scene, itemId) {
  scene.world.modifyBlockEntityNBT(ALTAR_CENTER, (nbt) => {
    nbt.outputItem = {
      id: itemId,
      Count: 1,
    };
    nbt.craftingLocked = false;
    nbt.craftStartGameTime = -1;
    nbt.remove('inputItem');
  });
}
