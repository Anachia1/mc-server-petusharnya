ServerEvents.recipes((event) => {
  [
    'cataclysm_spellbooks:abyssal_rune',
    'irons_spellbooks:arcane_rune',
    'irons_spellbooks:blank_rune',
    'irons_spellbooks:blood_rune',
    'irons_spellbooks:cooldown_rune',
    'irons_spellbooks:ender_rune',
    'irons_spellbooks:evocation_rune',
    'irons_spellbooks:fire_rune',
    'irons_spellbooks:holy_rune',
    'irons_spellbooks:ice_rune',
    'irons_spellbooks:lightning_rune',
    'irons_spellbooks:nature_rune',
    'irons_spellbooks:protection_rune',
    'cataclysm_spellbooks:technomancy_rune',
    'irons_spellbooks:upgrade_orb',
  ].forEach((output) => {
    event.remove({ type: 'minecraft:crafting_shaped', output: output });
    event.remove({ type: 'minecraft:crafting_shapeless', output: output });
  });
});
