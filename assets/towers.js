var ncr_towers = [
    {
        id: "ncr_1", name: "NCR RECRUIT", visual_type: "rifle", sound_type: "snd_gun_light", cost: 50, damage: 8, range: 5, speed: 1.0, bullet_speed: 8, life: 100, shield: 10, is_unlocked: true,
        upgrades: {
            path1: [
                { name: "Extended Mags", cost: 50, desc: "Fires more bullets per burst.", effects: { burst_count: 3 } },
                { name: "Hair Trigger", cost: 120, desc: "Reduces the cooldown between bursts.", effects: { speed_mult: 1.5 } },
                { name: "LMG Swap", cost: 350, desc: "Swaps to LMG. Bullets cause slight knockback.", effects: { visual_type: "LMG", knockback: true } },
                { name: "5mm Shredder", cost: 1200, desc: "Swaps to Minigun. Every 10th bullet deals AoE damage.", effects: { visual_type: "HMG", speed_mult: 2.0 } }
            ],
            path2: [
                { name: "High-Powered Scope", cost: 75, desc: "+2 Grid Range.", effects: { range_add: 2 } },
                { name: "Heavy Caliber", cost: 150, desc: "+50% Base Damage.", effects: { damage_mult: 1.5 } },
                { name: "Anti-Materiel Rifle", cost: 400, desc: "Swaps to .50 Cal. Bullets pierce in a straight line.", effects: { pierce: 3 } },
                { name: "Explosive Rounds", cost: 1500, desc: ".50 Cal rounds detonate on impact for massive AoE.", effects: { visual_type: "cannon" } }
            ]
        }
    },
    {
        id: "ncr_2", name: "NCR TROOPER", visual_type: "rifle", sound_type: "snd_gun_light", cost: 150, damage: 18, range: 6, speed: 1.2, bullet_speed: 8, life: 120, shield: 20, is_unlocked: true,
        upgrades: {
            path1: [
                { name: "Forward Grip", cost: 100, desc: "+15% Fire Rate.", effects: { speed_mult: 1.15 } },
                { name: "Heavy Loads", cost: 150, desc: "+20% Damage.", effects: { damage_mult: 1.20 } },
                { name: "Combat Shotgun", cost: 400, desc: "Fires a 3-pellet cone. Range reduced.", effects: { range_add: -1, fire_pattern: "shotgun", pellet_count: 3 } },
                { name: "Riot Sweeper", cost: 1100, desc: "Fires 5 pellets. Pellets apply brief 0.5s stun.", effects: { stun_chance: 1.0, pellet_count: 5 } }
            ],
            path2: [
                { name: "Tracer Rounds", cost: 100, desc: "Every 5th shot deals double damage and applies a 4s burn.", effects: { tracer_rounds: true } },
                { name: "Spotter", cost: 200, desc: "Grants +1 Range to adjacent allied towers.", effects: { aura_type: "range" } },
                { name: "Command Aura", cost: 500, desc: "Grants +15% Fire Rate to adjacent allied towers.", effects: { aura_type: "speed" } },
                { name: "Tactical Hub", cost: 1500, desc: "Grants +30% Damage to all towers within 3 grids.", effects: { aura_type: "damage" } }
            ]
        }
    },
    {
        id: "ncr_3", name: "SCRAP TURRET", visual_type: "LMG", sound_type: "snd_gun_light", cost: 300, damage: 10, range: 4, speed: 4.0, bullet_speed: 6, life: 200, shield: 50, is_unlocked: true,
        upgrades: {
            path1: [
                { name: "Hardened Receiver", cost: 80, desc: "+Damage per bullet.", effects: { damage_add: 3 } },
                { name: "Twin-Barrels", cost: 250, desc: "Fires two projectiles simultaneously.", effects: { fire_pattern: "twin" } },
                { name: "Auto-Cannon", cost: 600, desc: "Fires micro-explosive shells.", effects: { visual_type: "cannon", speed_mult: 0.25, damage_mult: 2.0 } },
                { name: "Depleted Uranium", cost: 1800, desc: "Shells leave toxic pools on the track (DoT).", effects: { dot_duration: 3 } }
            ],
            path2: [
                { name: "Upgraded Optics", cost: 100, desc: "+1 Grid Range.", effects: { range_add: 1 } },
                { name: "Advanced Calculation", cost: 200, desc: "10% chance to deal double damage.", effects: { crit_chance: 0.10, crit_mult: 2.0 } },
                { name: "V.A.T.S. Uplink", cost: 800, desc: "Can target Flying enemies. Every 5th shot is a 5x critical hit.", effects: { crit_req: 5, anti_air: true } },
                { name: "Scrap Recycler", cost: 1400, desc: "Extracts 15-20 bonus Caps when landing a killing blow.", effects: { bonus_bounty: true } }
            ]

        }
    },
    {
        id: "ncr_4", name: "RECON OUTPOST", visual_type: "wall", is_detector: true, cost: 450, damage: 0, range: 4, speed: 0.25, bullet_speed: 0, life: 150, shield: 20, is_unlocked: true,
        upgrades: {
            path1: [
                { name: "Signal Boost", cost: 150, desc: "Increases radar radius.", effects: { range_add: 1 } },
                { name: "Deep Scan", cost: 250, desc: "Stealthed enemies remain visible for 2s after leaving.", effects: { reveal_linger: 2.0 } },
                { name: "Weakpoint Analysis", cost: 600, desc: "Enemies in radius take 15% more damage.", effects: { aura_vulnerability: 1.15 } },
                { name: "Jamming Field", cost: 1200, desc: "Enemies in radius move 25% slower.", effects: { aura_slow: 0.75 } }
            ],
            path2: [
                { name: "Static Field", cost: 200, desc: "Applies continuous light DoT in radius.", effects: { aura_dot: 2 } },
                { name: "EMP Pulse", cost: 400, desc: "Every 6s, releases a pulse that stuns for 1s.", effects: { secondary: "emp", secondary_cd: 6 } },
                { name: "Flashbang Protocol", cost: 800, desc: "Pulse radius doubled, adds slight knockback.", effects: { range_add: 2, knockback: true } },
                { name: "Neural Scrambler", cost: 1500, desc: "Pulse forces enemies to walk backward for 1.5s.", effects: { secondary: "scramble", secondary_cd: 6 } }
            ]
        }
    },
    {
        id: "ncr_5", name: "HEAVY TROOPER", visual_type: "HMG", sound_type: "snd_machine_gun", cost: 600, damage: 18, range: 4, speed: 5.0, bullet_speed: 6, life: 300, shield: 100, is_unlocked: false,
        upgrades: {
            path1: [
                { name: "Belt Fed", cost: 200, desc: "+25% Fire Rate.", effects: { speed_mult: 1.25 } },
                { name: "Tracer Rounds", cost: 300, desc: "Bullets apply a 2s burn DoT.", effects: { dot_duration: 2 } },
                { name: "Flamer Swap", cost: 800, desc: "Swaps to Flamethrower. Hits all enemies in a short cone.", effects: { visual_type: "laser_gun", fire_pattern: "flamer", pellet_count: 5, range_add: -1 } },
                { name: "Napalm Infection", cost: 2200, desc: "Enemies burn for 4s after leaving fire, radiating damage to nearby monsters.", effects: { dot_duration: 4 } }
            ],
            path2: [
                { name: "Grenade Pouch", cost: 250, desc: "Periodically lobs a frag grenade at target.", effects: { secondary: "grenade", secondary_cd: 4 } },
                { name: "Frag Launcher", cost: 600, desc: "Basic attacks become small AoE explosions.", effects: { visual_type: "cannon" } },
                { name: "Missile Launcher", cost: 1200, desc: "High damage seeking missiles with large splash.", effects: { damage_mult: 2.0 } },
                { name: "Concussive Payload", cost: 2000, desc: "Missiles have 30% chance to stun for 1.5s.", effects: { stun_chance: 0.30 } }
            ]
        }
    },
    {
        id: "ncr_6", name: "SALVAGED MISSILE", visual_type: "cannon", sound_type: "snd_missile_launch", cost: 800, damage: 80, range: 7, speed: 0.8, bullet_speed: 5, life: 150, shield: 20, is_unlocked: false,
        upgrades: {
            path1: [
                { name: "Larger Payload", cost: 250, desc: "+1 Grid explosion radius.", effects: { range_add: 1 } },
                { name: "Auto-Loader", cost: 400, desc: "+15% Reload Speed.", effects: { speed_mult: 1.15 } },
                { name: "HE Missiles", cost: 900, desc: "Dead-center hits take double damage.", effects: { damage_mult: 2.0 } },
                { name: "Bunker Buster", cost: 2500, desc: "Missiles pierce through 3 targets before detonating.", effects: { pierce: 3 } }
            ],

            path2: [
                { name: "Smoke Warheads", cost: 200, desc: "Periodically drops smoke grenades that slow enemies.", effects: { visual_type: "cannon", secondary: "gas_grenade", secondary_cd: 5 } },
                { name: "White Phosphorus", cost: 450, desc: "Intense DoT burn to blast survivors.", effects: { dot_duration: 3 } },
                { name: "Napalm Payload", cost: 1000, desc: "Missiles leave a massive fire pool for 5s.", effects: { dot_duration: 5, visual_type: "cannon" } },
                { name: "Experimental Nuke", cost: 3000, desc: "Fires Mini-Nuke every 10s covering half the map.", effects: { secondary: "nuke", secondary_cd: 10, damage_add: 500 } }
            ]

        }
    },
    {
        id: "ncr_7", name: "1ST RECON SNIPER", visual_type: "rifle", sound_type: "snd_gun_heavy", cost: 1100, damage: 150, range: 12, speed: 0.4, bullet_speed: 15, life: 100, shield: 10, is_unlocked: false,
        upgrades: {
            path1: [
                { name: "Breath Control", cost: 200, desc: "+20% Base Damage.", effects: { damage_mult: 1.20 } },
                { name: "High-Voltage", cost: 350, desc: "+Fire Rate.", effects: { speed_mult: 1.25 } },
                { name: "Gauss Rifle Swap", cost: 1000, desc: "Pierces enemies in a straight line to map edge.", effects: { pierce: 10, visual_type: "laser_gun" } },
                { name: "EMP Rounds", cost: 2200, desc: "Gauss impacts chain-lightning to 3 nearby enemies.", effects: { chain_max: 3 } }
            ],
            path2: [
                { name: "Spotter", cost: 150, desc: "+2 Grid Range.", effects: { range_add: 2 } },
                { name: "Hollow Points", cost: 300, desc: "+30% damage to high-HP Bosses.", effects: { boss_damage_mult: 1.3 } },
                { name: "Night Vision", cost: 700, desc: "Target and shoot stealthed enemies map-wide.", effects: { is_detector: true, range_add: 5 } },
                { name: "Headhunter", cost: 2000, desc: "Every 4th shot is a guaranteed 5x critical hit.", effects: { crit_req: 4 } }
            ]
        }
    },
    {
        id: "ncr_8", name: "RIOT RANGER", visual_type: "rifle", is_cryo: true, sound_type: "snd_gun_heavy", cost: 1500, damage: 15, range: 8, speed: 0.25, bullet_speed: 12, life: 200, shield: 50, is_unlocked: false,
        upgrades: {
            path1: [
                { name: "Liquid Nitrogen", cost: 150, desc: "Increases duration of the slow effect.", effects: { slow_duration_mult: 1.5 } },
                { name: "Pressurized Tanks", cost: 250, desc: "+1 Grid Range.", effects: { range_add: 1 } },
                { name: "Flash Freeze", cost: 700, desc: "20% chance to freeze (stun) solid for 1.5s.", effects: { stun_chance: 0.20 } },
                { name: "Absolute Zero", cost: 1800, desc: "Enemies shattered while frozen deal AoE splash.", effects: { shatter_aoe: true } }
            ],
            path2: [
                { name: "Stun Batons", cost: 150, desc: "Basic attacks have chance to knockback.", effects: { knockback: true } },
                { name: "Tear Gas", cost: 350, desc: "Lobs gas grenades. Enemies inside move 50% slower.", effects: { secondary: "gas_grenade", secondary_cd: 5, slow_mult: 0.5 } },
                { name: "Shock Lasers", cost: 900, desc: "Swaps to laser rifle. Beam chains to 2 enemies.", effects: { visual_type: "laser_gun", chain_max: 2 } },
                { name: "Overcharged Cells", cost: 2000, desc: "Beams pierce 4 targets in a straight line.", effects: { pierce: 4 } }
            ]

        }
    },
    {
        id: "ncr_9", name: "VERTIBIRD GUNNER", visual_type: "HMG", sound_type: "snd_machine_gun", cost: 2500, damage: 25, range: 7, speed: 6.0, bullet_speed: 8, life: 500, shield: 200, is_unlocked: false, is_flying: true,
        upgrades: {
            path1: [
                { name: "Wider Arc", cost: 300, desc: "Increases patrol engagement range.", effects: { range_add: 2 } },
                { name: "Explosive Rounds", cost: 500, desc: "Bullets deal small AoE splash.", effects: { damage_mult: 1.5 } },
                { name: "Napalm Drops", cost: 1200, desc: "Constantly drops fire trails below flight path.", effects: { secondary: "napalm_drop", secondary_cd: 2 } },
                { name: "Heavy Ordnance", cost: 2500, desc: "Drops large bomb on front-most enemy every 15s.", effects: { secondary: "heavy_bomb", secondary_cd: 15 } }
            ],
            path2: [
                { name: "Extended Fuel", cost: 250, desc: "Increases patrol circle radius.", effects: { patrol_radius_add: 2 } },
                { name: "Advanced Rotors", cost: 400, desc: "Increases flight movement speed.", effects: { flight_speed_mult: 1.5 } },
                { name: "Map-Wide Tracking", cost: 1500, desc: "Breaks patrol to actively hunt the leading enemy.", effects: { range_add: 10 } },
                { name: "Twin Gunners", cost: 2800, desc: "Fires from both sides, doubling fire rate and targets.", effects: { speed_mult: 2.0, fire_pattern: "twin" } }
            ]
        }
    },
    {
        id: "ncr_10", name: "NCR POWER ARMOR", visual_type: "cannon", sound_type: "snd_machine_gun", cost: 4000, damage: 120, range: 6, speed: 2.0, bullet_speed: 10, life: 1000, shield: 500, is_unlocked: false,
        upgrades: {
            path1: [
                { name: "Advanced Targeting", cost: 500, desc: "+1 Grid Range, +10% Fire Rate.", effects: { range_add: 1, speed_mult: 1.10 } },
                { name: "Servo Motors", cost: 800, desc: "+20% Damage.", effects: { damage_mult: 1.20 } },
                { name: "Minigun Swap", cost: 2000, desc: "Highest fire rate in the game.", effects: { visual_type: "HMG", speed_mult: 4.0, damage_mult: 0.5 } },
                { name: "Avenger Minigun", cost: 4500, desc: "Kinetic force pushes non-boss enemies backward.", effects: { knockback: true } }
            ],
            path2: [
                { name: "Fat Man Launcher", cost: 600, desc: "Massive AoE explosion, slow fire rate.", effects: { damage_mult: 3.0, speed_mult: 0.5 } },
                { name: "MIRV Launcher", cost: 1200, desc: "Fires two mini-nukes simultaneously in V-spread.", effects: { fire_pattern: "mirv" } },
                { name: "Radioactive Payload", cost: 2500, desc: "Nukes leave permanent irradiated DoT area.", effects: { nuke_radioactive: true } },
                { name: "Liberty Prime Tech", cost: 5500, desc: "Fires catastrophic sweeping eye-laser every 15s.", effects: { secondary: "liberty_laser", secondary_cd: 15, visual_type: "laser_gun" } }
            ]
        }
    }
];

var bos_towers = [
    {
        id: "bos_1", name: "BOS SQUIRE", visual_type: "rifle", sound_type: "snd_gun_light", cost: 75, damage: 10, range: 5, speed: 1.0, bullet_speed: 8, life: 120, shield: 20, is_unlocked: true,
        upgrades: {
            path1: [
                { name: "Laser Swap", cost: 100, desc: "Swaps to a Laser Rifle.", effects: { visual_type: "laser_gun" } },
                { name: "Beam Splitter", cost: 250, desc: "Laser chains to a nearby target.", effects: { chain_max: 1 } },
                { name: "Overcharged Cells", cost: 450, desc: "+Damage and chains to 2 targets.", effects: { damage_add: 10, chain_max: 2 } },
                { name: "Plasma Caster", cost: 1200, desc: "High damage plasma blasts. Chains to 3 targets.", effects: { damage_mult: 2.0, chain_max: 3, visual_type: "cannon" } }
            ],
            path2: [
                { name: "Combat Armor", cost: 80, desc: "+10% Fire Rate.", effects: { speed_mult: 1.10 } },
                { name: "Heavy Barrel", cost: 200, desc: "+25% Damage.", effects: { damage_mult: 1.25 } },
                { name: "Armor Piercing", cost: 500, desc: "Bullets pierce 2 enemies.", effects: { pierce: 2 } },
                { name: "Tech Recovery", cost: 1000, desc: "Extracts 15-20 bonus Caps when landing a killing blow.", effects: { bonus_bounty: true } }
            ]
        }
    },
    {
        id: "bos_2", name: "INITIATE", visual_type: "rifle", sound_type: "snd_gun_light", cost: 175, damage: 22, range: 6, speed: 1.2, bullet_speed: 8, life: 150, shield: 30, is_unlocked: true,
        upgrades: {
            path1: [
                { name: "Gatling Laser", cost: 400, desc: "Insane fire rate. Swaps to LMG.", effects: { visual_type: "LMG", speed_mult: 3.0, damage_mult: 0.5 } },
                { name: "Focus Optics", cost: 600, desc: "+1 Range, +Damage.", effects: { range_add: 1, damage_mult: 1.5 } },
                { name: "Charging Barrels", cost: 1500, desc: "Lasers now pierce enemies.", effects: { pierce: 3 } },
                { name: "Sunburst Core", cost: 2800, desc: "Massive damage. Chains to nearby foes.", effects: { chain_max: 2, damage_mult: 1.5 } }
            ],
            path2: [
                { name: "Tri-Beam Laser", cost: 350, desc: "Fires 3 lasers in a cone.", effects: { fire_pattern: "shotgun", pellet_count: 3, visual_type: "laser_gun" } },
                { name: "Photon Exciter", cost: 500, desc: "Lasers leave a burning DoT.", effects: { dot_duration: 2 } },
                { name: "Wide Spread", cost: 1200, desc: "Fires 5 lasers in a cone.", effects: { pellet_count: 5 } },
                { name: "Stun Pack", cost: 2200, desc: "Laser spread has a 20% chance to stun.", effects: { stun_chance: 0.20 } }
            ]
        }
    },
    {
        id: "bos_3", name: "KNIGHT", visual_type: "HMG", sound_type: "snd_machine_gun", cost: 300, damage: 15, range: 5, speed: 3.5, bullet_speed: 8, life: 400, shield: 150, is_unlocked: true,
        upgrades: {
            path1: [
                { name: "Heavy Barrel", cost: 300, desc: "+25% Damage.", effects: { damage_mult: 1.25 } },
                { name: "Plasma Infusion", cost: 700, desc: "Swaps to Plasma. Leaves a burning DoT.", effects: { visual_type: "laser_gun", dot_duration: 2 } },
                { name: "Plasma Caster", cost: 1500, desc: "Slow fire rate, massive AoE plasma explosions.", effects: { visual_type: "cannon", speed_mult: 0.2, damage_mult: 4.0 } },
                { name: "Meltdown", cost: 3000, desc: "Explosions chain to 3 extra targets.", effects: { chain_max: 3 } }
            ],
            path2: [
                { name: "Kinetic Dampers", cost: 400, desc: "Basic attacks cause knockback.", effects: { knockback: true } },
                { name: "Brotherhood Tactics", cost: 800, desc: "Grants +10% Damage aura to nearby allies.", effects: { aura_type: "damage" } },
                { name: "Sky Watcher", cost: 1500, desc: "Can target Flying enemies. Grants +15% Speed aura to allies.", effects: { aura_type: "speed", anti_air: true } },
                { name: "Paladin Commander", cost: 3000, desc: "Periodically drops a frag grenade.", effects: { secondary: "grenade", secondary_cd: 4 } }
            ]
        }
    },
    {
        id: "bos_4", name: "SENSOR RELAY", visual_type: "wall", is_detector: true, cost: 450, damage: 0, range: 4, speed: 0.25, bullet_speed: 0, life: 120, shield: 50, is_unlocked: true,
        upgrades: {
            path1: [
                { name: "Range Boost", cost: 150, desc: "Increases radar radius.", effects: { range_add: 1 } },
                { name: "Target Painter", cost: 400, desc: "Enemies in radius take 15% more damage.", effects: { aura_vulnerability: 1.15 } },
                { name: "EMP Pulse", cost: 900, desc: "Releases an EMP every 6s, stunning enemies.", effects: { secondary: "emp", secondary_cd: 6 } },
                { name: "Neural Scramble", cost: 1800, desc: "Pulsing scrambles enemies, forcing them backward.", effects: { secondary: "scramble", secondary_cd: 8 } }
            ],
            path2: [
                { name: "Tesla Coil", cost: 300, desc: "Zaps enemies in radius with continuous DoT.", effects: { aura_dot: 5 } },
                { name: "High Voltage", cost: 600, desc: "Doubles the DoT damage in radius.", effects: { aura_dot: 10 } },
                { name: "Gravity Jammer", cost: 1100, desc: "Enemies in radius move 25% slower.", effects: { aura_slow: 0.75 } },
                { name: "Overload", cost: 2500, desc: "Triggers a massive Liberty Laser sweep every 15s.", effects: { secondary: "liberty_laser", secondary_cd: 15 } }
            ]
        }
    },
    {
        id: "bos_5", name: "HEAVY INCINERATOR", visual_type: "cannon", sound_type: "snd_missile_launch", cost: 600, damage: 25, range: 4, speed: 3.0, bullet_speed: 5, life: 300, shield: 100, is_unlocked: false,
        upgrades: {
            path1: [
                { name: "Napalm Mix", cost: 300, desc: "Adds a severe 3s DoT.", effects: { dot_duration: 3 } },
                { name: "Pressurized Jets", cost: 600, desc: "Fires in a 3-way spread.", effects: { fire_pattern: "shotgun", pellet_count: 3 } },
                { name: "Wall of Fire", cost: 1500, desc: "Fires in a 5-way spread.", effects: { pellet_count: 5 } },
                { name: "Hellfire Core", cost: 2500, desc: "Targets melt, applying 10% chance to stun.", effects: { stun_chance: 0.1 } }
            ],
            path2: [
                { name: "Heavy Arcs", cost: 400, desc: "+2 Grid Range.", effects: { range_add: 2 } },
                { name: "Impact Detonation", cost: 800, desc: "Fireballs explode for AoE damage.", effects: { visual_type: "cannon", damage_mult: 1.5 } },
                { name: "Scorched Earth", cost: 1800, desc: "Periodically leaves Napalm pools on track.", effects: { secondary: "napalm_drop", secondary_cd: 4 } },
                { name: "Cleansing Flame", cost: 3000, desc: "+50% extra damage to Bosses.", effects: { boss_damage_mult: 1.5 } }
            ]
        }
    },
    {
        id: "bos_6", name: "CRYOLATOR KNIGHT", visual_type: "laser_gun", is_cryo: true, sound_type: "snd_gun_heavy", cost: 800, damage: 15, range: 5, speed: 0.25, bullet_speed: 10, life: 200, shield: 100, is_unlocked: false,
        upgrades: {
            path1: [
                { name: "Crystallize", cost: 300, desc: "Increases base damage.", effects: { damage_mult: 1.5 } },
                { name: "Deep Freeze", cost: 600, desc: "20% chance to stun enemies solid.", effects: { stun_chance: 0.20 } },
                { name: "Ice Storm", cost: 1200, desc: "Fires in a 3-projectile cone.", effects: { fire_pattern: "shotgun", pellet_count: 3 } },
                { name: "Shatter Core", cost: 2000, desc: "Enemies killed while frozen explode in AoE.", effects: { shatter_aoe: true } }
            ],
            path2: [
                { name: "Coolant Mist", cost: 250, desc: "Creates a permanent 20% slow aura.", effects: { aura_slow: 0.8 } },
                { name: "Range Extension", cost: 400, desc: "+2 Grid Range.", effects: { range_add: 2 } },
                { name: "Sub-Zero Aura", cost: 1000, desc: "Aura slows by 50%.", effects: { aura_slow: 0.5 } },
                { name: "Cryo Traps", cost: 1800, desc: "Drops freezing gas traps on the path.", effects: { secondary: "gas_grenade", secondary_cd: 8 } }
            ]
        }
    },
    {
        id: "bos_7", name: "PLASMA TURRET", visual_type: "laser_gun", sound_type: "snd_laser_fire", cost: 1300, damage: 80, range: 7, speed: 1.5, bullet_speed: 8, life: 350, shield: 200, is_unlocked: false,
        upgrades: {
            path1: [
                { name: "Twin Relays", cost: 500, desc: "Fires dual plasma bolts.", effects: { fire_pattern: "twin" } },
                { name: "Overcharge", cost: 900, desc: "+30% Damage.", effects: { damage_mult: 1.3 } },
                { name: "Plasma Spray", cost: 2000, desc: "Swaps to shotgun scatter.", effects: { fire_pattern: "shotgun", pellet_count: 4 } },
                { name: "Melt Armor", cost: 3500, desc: "Bolts pierce 4 targets and apply DoT.", effects: { pierce: 4, dot_duration: 3 } }
            ],
            path2: [
                { name: "Targeting Lens", cost: 400, desc: "+2 Grid Range.", effects: { range_add: 2 } },
                { name: "Corrosive Aura", cost: 1000, desc: "Enemies in range take 15% more damage.", effects: { aura_vulnerability: 1.15 } },
                { name: "Plasma Core", cost: 2000, desc: "10% Chance for 2x Critical hit.", effects: { crit_chance: 0.10, crit_mult: 2.0 } },
                { name: "Sentinel AI", cost: 4000, desc: "Guaranteed 5x Crit every 4 shots.", effects: { crit_req: 4 } }
            ]
        }
    },
    {
        id: "bos_8", name: "PALADIN", visual_type: "laser_gun", sound_type: "snd_gun_heavy", cost: 1800, damage: 100, range: 6, speed: 2.5, bullet_speed: 10, life: 600, shield: 300, is_unlocked: false,
        upgrades: {
            path1: [
                { name: "Gauss Rifle", cost: 800, desc: "Swaps to Gauss. Extremely fast, piercing shots.", effects: { visual_type: "rifle", fire_pattern: "gauss", pierce: 4 } },
                { name: "Magnetic Accelerator", cost: 1500, desc: "+50% Damage.", effects: { damage_mult: 1.5 } },
                { name: "Shockwave", cost: 2500, desc: "Gauss rounds cause heavy knockback.", effects: { knockback: true } },
                { name: "Anti-Materiel", cost: 4500, desc: "+50% damage to Bosses. Pierces 10 enemies.", effects: { boss_damage_mult: 1.5, pierce: 10 } }
            ],
            path2: [
                { name: "Power Armor Servos", cost: 600, desc: "+25% Fire Rate.", effects: { speed_mult: 1.25 } },
                { name: "Missile Pod", cost: 1500, desc: "Periodically fires a heavy missile.", effects: { secondary: "heavy_bomb", secondary_cd: 5 } },
                { name: "Fat Man Swap", cost: 3000, desc: "Swaps main weapon to Nuclear MIRV.", effects: { visual_type: "cannon", speed_mult: 0.2, fire_pattern: "mirv", damage_mult: 4.0 } },
                { name: "Nuclear Fallout", cost: 5000, desc: "Nukes leave radioactive DoT pools.", effects: { nuke_radioactive: true } }
            ]
        }
    },
    {
        id: "bos_9", name: "BOS GUNSHIP", visual_type: "HMG", sound_type: "snd_machine_gun", cost: 3200, damage: 35, range: 8, speed: 5.0, bullet_speed: 12, life: 800, shield: 300, is_unlocked: false, is_flying: true,
        upgrades: {
            path1: [
                { name: "Turbo Rotors", cost: 800, desc: "Increases flight patrol speed.", effects: { flight_speed_mult: 1.5 } },
                { name: "Wide Arc", cost: 1200, desc: "Increases patrol radius and attack range.", effects: { patrol_radius_add: 3, range_add: 2 } },
                { name: "Target Seeker", cost: 2500, desc: "Stops patrolling and actively hunts enemies.", effects: { range_add: 10 } },
                { name: "Twin Turrets", cost: 4500, desc: "Fires twin streams of bullets.", effects: { fire_pattern: "twin", damage_mult: 1.5 } }
            ],
            path2: [
                { name: "Payload Drop", cost: 1000, desc: "Drops frag grenades occasionally.", effects: { secondary: "grenade", secondary_cd: 3 } },
                { name: "Carpet Bombing", cost: 2000, desc: "Drops clusters of bombs.", effects: { fire_pattern: "shotgun", pellet_count: 5, visual_type: "cannon", speed_mult: 0.5 } },
                { name: "Napalm Reserve", cost: 3500, desc: "Drops fire trails constantly on the path.", effects: { secondary: "napalm_drop", secondary_cd: 2 } },
                { name: "Prydwen Strike", cost: 6000, desc: "Drops a massive Liberty Laser blast every 10s.", effects: { secondary: "liberty_laser", secondary_cd: 10 } }
            ]
        }
    },
    {
        id: "bos_10", name: "TESLA CANNON", visual_type: "laser_gun", sound_type: "snd_laser_fire", cost: 4500, damage: 250, range: 10, speed: 0.5, bullet_speed: 15, life: 1200, shield: 600, is_unlocked: false,
        upgrades: {
            path1: [
                { name: "Conductive Arcs", cost: 1500, desc: "Chains lightning to 2 additional targets.", effects: { chain_max: 2 } },
                { name: "Overcharge", cost: 2500, desc: "+50% Base Damage.", effects: { damage_mult: 1.5 } },
                { name: "Super-Conductor", cost: 5000, desc: "Chains to 5 targets.", effects: { chain_max: 5 } },
                { name: "Storm God", cost: 8000, desc: "10% chance to stun. 10x Crit every 3 shots.", effects: { stun_chance: 0.1, crit_req: 3, crit_mult: 10.0 } }
            ],
            path2: [
                { name: "Capacitor Boost", cost: 1200, desc: "Doubles attack speed.", effects: { speed_mult: 2.0 } },
                { name: "EMP Blast", cost: 3000, desc: "Periodically stuns all enemies in range.", effects: { secondary: "emp", secondary_cd: 5 } },
                { name: "Neural Flash", cost: 4500, desc: "Periodically scrambles enemies to walk backwards.", effects: { secondary: "scramble", secondary_cd: 6 } },
                { name: "Annihilation", cost: 9000, desc: "EMP blasts deal massive DoT to caught enemies.", effects: { aura_dot: 25 } }
            ]
        }
    }
];

var mm_towers = [
    {
        id: "mm_1", name: "VOLUNTEER", visual_type: "rifle", sound_type: "snd_gun_light", cost: 50, damage: 8, range: 4, speed: 1.2, bullet_speed: 6, life: 80, shield: 0, is_unlocked: true,
        upgrades: {
            path1: [
                { name: "Rifled Barrel", cost: 50, desc: "+Damage.", effects: { damage_add: 3 } },
                { name: "Laser Musket", cost: 150, desc: "Swaps to Laser Musket. Slow, piercing, high damage.", effects: { visual_type: "laser_gun", speed_mult: 0.5, damage_mult: 2.5, fire_pattern: "gauss", pierce: 2 } },
                { name: "3-Crank Capacitor", cost: 400, desc: "Further drops speed, triples damage.", effects: { speed_mult: 0.5, damage_mult: 3.0 } },
                { name: "6-Crank Capacitor", cost: 1000, desc: "Guaranteed 5x Crit every 2 shots.", effects: { crit_req: 2 } }
            ],
            path2: [
                { name: "Militia Tactics", cost: 80, desc: "+10% Speed.", effects: { speed_mult: 1.1 } },
                { name: "Rallying Cry", cost: 200, desc: "Grants +10% Speed aura to allies.", effects: { aura_type: "speed" } },
                { name: "General's Orders", cost: 500, desc: "Grants +15% Damage aura to allies.", effects: { aura_type: "damage" } },
                { name: "Minuteman General", cost: 1500, desc: "Huge boost to buff aura ranges.", effects: { range_add: 3 } }
            ]
        }
    },
    {
        id: "mm_2", name: "SETTLER", visual_type: "rifle", sound_type: "snd_gun_light", cost: 120, damage: 18, range: 5, speed: 1.5, bullet_speed: 7, life: 100, shield: 0, is_unlocked: true,
        upgrades: {
            path1: [
                { name: "Double Barrel", cost: 120, desc: "Swaps to Shotgun.", effects: { fire_pattern: "shotgun", pellet_count: 3, range_add: -1 } },
                { name: "Sawed-Off", cost: 250, desc: "Increases pellets to 5.", effects: { pellet_count: 5 } },
                { name: "Combat Shotgun", cost: 600, desc: "Fires 8 pellets rapidly.", effects: { pellet_count: 8, speed_mult: 1.5 } },
                { name: "Dragon's Breath", cost: 1400, desc: "Shotgun pellets apply burn DoT.", effects: { dot_duration: 2 } }
            ],
            path2: [
                { name: "Long Scope", cost: 100, desc: "+2 Range.", effects: { range_add: 2 } },
                { name: "Hunting Rifle", cost: 250, desc: "+50% Damage.", effects: { damage_mult: 1.5 } },
                { name: "Armor Piercing", cost: 600, desc: "Pierces 3 targets.", effects: { pierce: 3 } },
                { name: "Wasteland Scavenger", cost: 1200, desc: "Extracts 15-20 bonus Caps when landing a killing blow.", effects: { bonus_bounty: true } }
            ]
        }
    },
    {
        id: "mm_3", name: "MILITIA LMG", visual_type: "LMG", sound_type: "snd_machine_gun", cost: 250, damage: 12, range: 5, speed: 4.0, bullet_speed: 6, life: 120, shield: 10, is_unlocked: true,
        upgrades: {
            path1: [
                { name: "Extended Mags", cost: 150, desc: "Fires 3 bullets per burst.", effects: { burst_count: 3 } },
                { name: "Rapid Fire", cost: 300, desc: "+25% Fire Rate.", effects: { speed_mult: 1.25 } },
                { name: "Suppressive Fire", cost: 800, desc: "Basic attacks cause knockback.", effects: { knockback: true } },
                { name: "Shredder Mod", cost: 1600, desc: "Fires 5 bullets per burst. 10% Crit Chance.", effects: { burst_count: 5, crit_chance: 0.1, crit_mult: 2.0 } }
            ],
            path2: [
                { name: "Bipod", cost: 100, desc: "+1 Range.", effects: { range_add: 1 } },
                { name: "Incendiary Rounds", cost: 350, desc: "Adds a burn DoT.", effects: { dot_duration: 2 } },
                { name: "Flak Grenades", cost: 700, desc: "Can target Flying enemies. Periodically tosses a grenade.", effects: { secondary: "grenade", secondary_cd: 4, anti_air: true } },
                { name: "Artillery Flare", cost: 1800, desc: "Periodically drops a massive heavy bomb.", effects: { secondary: "heavy_bomb", secondary_cd: 10 } }
            ]
        }
    },
    {
        id: "mm_4", name: "WATCHTOWER", visual_type: "wall", is_detector: true, cost: 400, damage: 0, range: 4, speed: 0.25, bullet_speed: 0, life: 300, shield: 80, is_unlocked: true,
        upgrades: {
            path1: [
                { name: "Elevated View", cost: 300, desc: "+2 Radar Range.", effects: { range_add: 2 } },
                { name: "Warning Bells", cost: 600, desc: "Pulsing scrambles enemies backward.", effects: { secondary: "scramble", secondary_cd: 6 } },
                { name: "Acid Sprayers", cost: 1200, desc: "Applies heavy DoT to enemies in range.", effects: { aura_dot: 5 } },
                { name: "Fortress", cost: 2000, desc: "Acid DoT damage doubled.", effects: { aura_dot: 10 } }
            ],
            path2: [
                { name: "Radio Tower", cost: 400, desc: "Grants Damage aura to allies.", effects: { aura_type: "damage" } },
                { name: "Logistics Network", cost: 800, desc: "Grants Speed aura to allies.", effects: { aura_type: "speed" } },
                { name: "Sniper Support", cost: 1500, desc: "Towers deals continuous DoT to enemies in range.", effects: { aura_dot: 5 } },
                { name: "Artillery Spotter", cost: 3000, desc: "Calls down a heavy bomb on the leader every 10s.", effects: { secondary: "heavy_bomb", secondary_cd: 10 } }
            ]
        }
    },
    {
        id: "mm_5", name: "BROADSIDER", visual_type: "cannon", sound_type: "snd_missile_launch", cost: 600, damage: 60, range: 5, speed: 1.0, bullet_speed: 5, life: 250, shield: 50, is_unlocked: false,
        upgrades: {
            path1: [
                { name: "More Powder", cost: 300, desc: "+1 Range, +25% Speed.", effects: { range_add: 1, speed_mult: 1.25 } },
                { name: "Bowling Balls", cost: 600, desc: "Heavy knockback.", effects: { knockback: true } },
                { name: "Nail Canisters", cost: 1500, desc: "Pierces 5 targets.", effects: { pierce: 5 } },
                { name: "Shredder Rounds", cost: 2800, desc: "Pierces 8 targets. Adds 5s Bleed DoT.", effects: { pierce: 8, dot_duration: 5 } }
            ],
            path2: [
                { name: "Heavy Cannonballs", cost: 400, desc: "Double Damage.", effects: { damage_mult: 2.0 } },
                { name: "Heated Shot", cost: 800, desc: "Adds burning DoT.", effects: { dot_duration: 3 } },
                { name: "Incendiary Burst", cost: 1800, desc: "Cannonballs leave Napalm pools.", effects: { secondary: "napalm_drop", secondary_cd: 3 } },
                { name: "The Big One", cost: 3500, desc: "Every 4th shot is a 5x Crit.", effects: { crit_req: 4 } }
            ]
        }
    },
    {
        id: "mm_6", name: "LASER MUSKET GUARD", visual_type: "laser_gun", sound_type: "snd_laser_fire", cost: 800, damage: 80, range: 6, speed: 0.5, bullet_speed: 10, life: 100, shield: 10, is_unlocked: false,
        upgrades: {
            path1: [
                { name: "Beam Splitter", cost: 200, desc: "Fires a 3-beam shotgun spread.", effects: { fire_pattern: "shotgun", pellet_count: 3 } },
                { name: "Overcharged", cost: 500, desc: "Increases pellets to 6.", effects: { pellet_count: 6 } },
                { name: "Scattershot", cost: 1100, desc: "Increases pellets to 10. Pierces 2 enemies.", effects: { pellet_count: 10, pierce: 2 } },
                { name: "Melt Armor", cost: 2200, desc: "Beams apply vulnerability aura.", effects: { aura_vulnerability: 1.2 } }
            ],
            path2: [
                { name: "2-Crank", cost: 250, desc: "Doubles damage.", effects: { damage_mult: 2.0 } },
                { name: "4-Crank", cost: 600, desc: "Doubles damage again. Cuts speed in half.", effects: { damage_mult: 2.0, speed_mult: 0.5, pierce: 3 } },
                { name: "6-Crank", cost: 1500, desc: "Massive damage. Fires a Gauss beam.", effects: { fire_pattern: "gauss", damage_mult: 2.0 } },
                { name: "Minuteman V.A.T.S.", cost: 3000, desc: "Every 3rd shot is a 10x Crit.", effects: { crit_req: 3, crit_mult: 10.0 } }
            ]
        }
    },
    {
        id: "mm_7", name: "MINUTEMAN SNIPER", visual_type: "rifle", sound_type: "snd_gun_heavy", cost: 1200, damage: 150, range: 10, speed: 0.5, bullet_speed: 12, life: 120, shield: 20, is_unlocked: false,
        upgrades: {
            path1: [
                { name: "Match Grade", cost: 300, desc: "+50% Damage.", effects: { damage_mult: 1.5 } },
                { name: "Armor Piercing", cost: 600, desc: "Pierces 5 targets.", effects: { pierce: 5 } },
                { name: "Giant Killer", cost: 1200, desc: "+50% Damage to Bosses.", effects: { boss_damage_mult: 1.5 } },
                { name: "One Shot, One Kill", cost: 2500, desc: "Guaranteed 5x Crit every 4 shots.", effects: { crit_req: 4 } }
            ],
            path2: [
                { name: "Spotter Scope", cost: 250, desc: "Detects stealthed enemies map-wide.", effects: { is_detector: true, range_add: 10 } },
                { name: "Recon Data", cost: 600, desc: "Grants +1 Range aura to allies.", effects: { aura_type: "range" } },
                { name: "Target Painting", cost: 1200, desc: "Grants Vulnerability aura (Enemies take +15% dmg).", effects: { aura_vulnerability: 1.15 } },
                { name: "Serrated Rounds", cost: 2000, desc: "Applies a heavy bleed DoT for 5 seconds.", effects: { dot_duration: 5 } }
            ]
        }
    },
    {
        id: "mm_8", name: "CASTLE ARTILLERY", visual_type: "cannon", sound_type: "snd_explosion", cost: 1800, damage: 200, range: 15, speed: 0.2, bullet_speed: 6, life: 400, shield: 100, is_unlocked: false,
        upgrades: {
            path1: [
                { name: "Faster Reload", cost: 600, desc: "Doubles fire rate.", effects: { speed_mult: 2.0 } },
                { name: "Heavy Shells", cost: 1200, desc: "Doubles damage.", effects: { damage_mult: 2.0 } },
                { name: "Depleted Uranium", cost: 2500, desc: "Shells pierce 5 enemies before detonating.", effects: { pierce: 5 } },
                { name: "Rain of Fire", cost: 4500, desc: "Pierces 10 targets. Adds 3s burn DoT.", effects: { pierce: 10, dot_duration: 3 } }
            ],
            path2: [
                { name: "Concussion Shells", cost: 800, desc: "Explosions have a 50% chance to stun.", effects: { stun_chance: 0.5 } },
                { name: "Gas Shells", cost: 1500, desc: "Periodically fires tear gas, slowing enemies.", effects: { secondary: "gas_grenade", secondary_cd: 4 } },
                { name: "Napalm Shells", cost: 3000, desc: "Periodically drops Napalm pools.", effects: { secondary: "napalm_drop", secondary_cd: 5 } },
                { name: "Nuclear Artillery", cost: 6000, desc: "Fires a nuke every 12 seconds.", effects: { secondary: "nuke", secondary_cd: 12 } }
            ]
        }
    },
    {
        id: "mm_9", name: "MILITIA GYROCOPT", visual_type: "LMG", sound_type: "snd_machine_gun", cost: 3000, damage: 30, range: 6, speed: 5.0, bullet_speed: 7, life: 400, shield: 100, is_unlocked: false, is_flying: true,
        upgrades: {
            path1: [
                { name: "Advanced Engine", cost: 600, desc: "Increases flight patrol speed.", effects: { flight_speed_mult: 1.5 } },
                { name: "Wide Patrol", cost: 1000, desc: "Increases patrol radius.", effects: { patrol_radius_add: 3 } },
                { name: "Hunting Mode", cost: 2000, desc: "Hunts the leading enemy map-wide.", effects: { range_add: 10 } },
                { name: "Twin MGs", cost: 3500, desc: "Fires dual streams.", effects: { fire_pattern: "twin", damage_mult: 1.5 } }
            ],
            path2: [
                { name: "Molotovs", cost: 800, desc: "Drops grenades on patrol.", effects: { secondary: "grenade", secondary_cd: 3 } },
                { name: "Napalm Tanks", cost: 1500, desc: "Drops fire trails constantly.", effects: { secondary: "napalm_drop", secondary_cd: 2 } },
                { name: "Gas Tanks", cost: 2500, desc: "Drops gas grenades that slow enemies.", effects: { secondary: "gas_grenade", secondary_cd: 4 } },
                { name: "Payload Drop", cost: 5000, desc: "Drops a heavy bomb on the leader every 8s.", effects: { secondary: "heavy_bomb", secondary_cd: 8 } }
            ]
        }
    },
    {
        id: "mm_10", name: "THE CASTLE DEF", visual_type: "cannon", sound_type: "snd_missile_launch", cost: 4500, damage: 250, range: 8, speed: 1.0, bullet_speed: 7, life: 1200, shield: 400, is_unlocked: false,
        upgrades: {
            path1: [
                { name: "Reinforced Walls", cost: 1000, desc: "Increases range and damage.", effects: { range_add: 2, damage_mult: 1.5 } },
                { name: "Twin Cannons", cost: 2500, desc: "Fires MIRV pattern (2 shells).", effects: { fire_pattern: "mirv" } },
                { name: "Quad Cannons", cost: 5000, desc: "Fires wide pattern (6 shells).", effects: { fire_pattern: "shotgun", pellet_count: 6 } },
                { name: "General's Fortress", cost: 8000, desc: "Massive speed aura and damage aura to all allies.", effects: { aura_type: "speed", aura_vulnerability: 1.3 } }
            ],
            path2: [
                { name: "Radio Broadcaster", cost: 1500, desc: "Pulsing EMP stuns enemies in massive radius.", effects: { secondary: "emp", secondary_cd: 5, is_detector: true } },
                { name: "Artillery Barrage", cost: 3000, desc: "Drops heavy bombs on the leader.", effects: { secondary: "heavy_bomb", secondary_cd: 4 } },
                { name: "Minutemen Swarm", cost: 5500, desc: "Every 5th shot is a 10x Crit.", effects: { crit_req: 5, crit_mult: 10.0 } },
                { name: "Liberty Radio", cost: 9500, desc: "Fires a Liberty Laser sweeping the track every 10s.", effects: { secondary: "liberty_laser", secondary_cd: 10 } }
            ]
        }
    }
];

var raider_towers = [
    {
        id: "rk_1", name: "RAIDER SCAVENGER", visual_type: "rifle", sound_type: "snd_gun_light", cost: 45, damage: 9, range: 3, speed: 1.5, bullet_speed: 6, life: 90, shield: 0, is_unlocked: true,
        upgrades: {
            path1: [
                { name: "Psycho Hit", cost: 60, desc: "+25% Fire Rate.", effects: { speed_mult: 1.25 } },
                { name: "Jet Inhaler", cost: 150, desc: "Double Fire Rate.", effects: { speed_mult: 2.0 } },
                { name: "Buffout", cost: 300, desc: "+50% Damage.", effects: { damage_mult: 1.5 } },
                { name: "Overdose", cost: 800, desc: "Fires a 5-bullet burst insanely fast.", effects: { burst_count: 5, speed_mult: 1.5 } }
            ],
            path2: [
                { name: "Rusty Ammo", cost: 50, desc: "Adds a light DoT bleed.", effects: { dot_duration: 2 } },
                { name: "Hollow Points", cost: 120, desc: "+25% Damage.", effects: { damage_mult: 1.25 } },
                { name: "Nail Gun Swap", cost: 400, desc: "Swaps to LMG. Causes heavy knockback.", effects: { visual_type: "LMG", knockback: true } },
                { name: "Cap Extortionist", cost: 1100, desc: "Extracts 15-20 bonus Caps when landing a killing blow.", effects: { bonus_bounty: true } }
            ]
        }
    },
    {
        id: "rk_2", name: "RAIDER SCUM", visual_type: "rifle", sound_type: "snd_gun_light", cost: 120, damage: 20, range: 3, speed: 1.5, bullet_speed: 6, life: 110, shield: 0, is_unlocked: true,
        upgrades: {
            path1: [
                { name: "Sawed-Off", cost: 150, desc: "Swaps to shotgun.", effects: { fire_pattern: "shotgun", pellet_count: 3 } },
                { name: "More Shrapnel", cost: 300, desc: "Increases pellets to 6.", effects: { pellet_count: 6 } },
                { name: "Drum Mag", cost: 700, desc: "Double fire rate.", effects: { speed_mult: 2.0 } },
                { name: "Riot Shotgun", cost: 1500, desc: "Increases pellets to 12. 10% stun chance.", effects: { pellet_count: 12, stun_chance: 0.1 } }
            ],
            path2: [
                { name: "Molotovs", cost: 200, desc: "Periodically throws grenades.", effects: { secondary: "grenade", secondary_cd: 4 } },
                { name: "Flamer Swap", cost: 500, desc: "Swaps to Flamer. Applies burn DoT.", effects: { visual_type: "laser_gun", fire_pattern: "flamer", pellet_count: 4, dot_duration: 2 } },
                { name: "Napalm Blend", cost: 1000, desc: "Drops fire pools on the path.", effects: { secondary: "napalm_drop", secondary_cd: 3 } },
                { name: "Incinerator", cost: 2200, desc: "Swaps to Cannon. Massive fire AoE.", effects: { visual_type: "cannon", speed_mult: 0.2, damage_mult: 4.0 } }
            ]
        }
    },
    {
        id: "rk_3", name: "RAIDER PSYCHO", visual_type: "LMG", sound_type: "snd_machine_gun", cost: 260, damage: 12, range: 3, speed: 4.5, bullet_speed: 6, life: 150, shield: 10, is_unlocked: true,
        upgrades: {
            path1: [
                { name: "Frenzy", cost: 200, desc: "+50% Fire rate.", effects: { speed_mult: 1.5 } },
                { name: "Med-X", cost: 400, desc: "+Damage.", effects: { damage_mult: 1.5 } },
                { name: "Minigun Swap", cost: 1000, desc: "Swaps to HMG. Insane speed.", effects: { visual_type: "HMG", speed_mult: 2.0 } },
                { name: "Meat Grinder", cost: 2500, desc: "Bullets pierce 2 enemies and cause knockback.", effects: { pierce: 2, knockback: true } }
            ],
            path2: [
                { name: "Scrap Armor", cost: 150, desc: "+1 Range.", effects: { range_add: 1 } },
                { name: "Intimidation", cost: 450, desc: "Vulnerability aura (enemies take +15% dmg).", effects: { aura_vulnerability: 1.15 } },
                { name: "Terror Aura", cost: 900, desc: "Can target Flying enemies. Enemies in range are slowed by 25%.", effects: { aura_slow: 0.75, anti_air: true } },
                { name: "Overboss Gear", cost: 2000, desc: "Guaranteed 5x Crit every 5 shots.", effects: { crit_req: 5 } }
            ]
        }
    },
    {
        id: "rk_4", name: "ALARM POST", visual_type: "wall", is_detector: true, cost: 400, damage: 0, range: 4, speed: 0.25, bullet_speed: 0, life: 350, shield: 60, is_unlocked: true,
        upgrades: {
            path1: [
                { name: "Loudspeakers", cost: 400, desc: "+2 Range.", effects: { range_add: 2 } },
                { name: "Disorient", cost: 800, desc: "Pulsing scrambles enemies backward.", effects: { secondary: "scramble", secondary_cd: 5 } },
                { name: "Panic", cost: 1600, desc: "Enemies in range are slowed by 50%.", effects: { aura_slow: 0.5 } },
                { name: "Deafening", cost: 3000, desc: "Scramble pulse happens every 3s.", effects: { secondary_cd: 3 } }
            ],
            path2: [
                { name: "Spike Traps", cost: 500, desc: "Throws caltrops/traps that severely slow enemies.", effects: { secondary: "gas_grenade", secondary_cd: 6 } },
                { name: "Radiation Emitter", cost: 1000, desc: "Aura deals continuous DoT.", effects: { aura_dot: 5 } },
                { name: "Toxic Gas", cost: 1800, desc: "Periodically fires gas grenades.", effects: { secondary: "gas_grenade", secondary_cd: 5 } },
                { name: "Wasteland Warlord", cost: 3500, desc: "Grants +50% Damage aura to all allies.", effects: { aura_type: "damage" } }
            ]
        }
    },
    {
        id: "rk_5", name: "THE FORGED", visual_type: "HMG", sound_type: "snd_machine_gun", cost: 650, damage: 25, range: 4, speed: 5.0, bullet_speed: 6, life: 250, shield: 30, is_unlocked: false,
        upgrades: {
            path1: [
                { name: "Flamer Swap", cost: 400, desc: "Swaps to Flamer. Applies burn DoT.", effects: { visual_type: "laser_gun", fire_pattern: "flamer", pellet_count: 4, dot_duration: 2 } },
                { name: "Hotter Flames", cost: 800, desc: "Doubles damage.", effects: { damage_mult: 2.0 } },
                { name: "Napalm Spray", cost: 1500, desc: "Leaves fire pools everywhere.", effects: { secondary: "napalm_drop", secondary_cd: 2 } },
                { name: "Searing Heat", cost: 2800, desc: "+50% Damage to Bosses. Pierces 3.", effects: { boss_damage_mult: 1.5, pierce: 3 } }
            ],
            path2: [
                { name: "Tracer Rounds", cost: 350, desc: "Bullets ignite targets (DoT).", effects: { dot_duration: 2 } },
                { name: "Heavy Gunner", cost: 700, desc: "Double fire rate.", effects: { speed_mult: 2.0 } },
                { name: "Explosive Ammo", cost: 1600, desc: "Bullets deal AoE splash.", effects: { visual_type: "cannon" } },
                { name: "Bullet Hell", cost: 3000, desc: "Fires twin streams of explosive bullets.", effects: { fire_pattern: "twin", damage_mult: 1.5 } }
            ]
        }
    },
    {
        id: "rk_6", name: "JUNK JET TURRET", visual_type: "cannon", sound_type: "snd_gun_heavy", cost: 800, damage: 60, range: 5, speed: 1.5, bullet_speed: 5, life: 300, shield: 50, is_unlocked: false,
        upgrades: {
            path1: [
                { name: "Heavy Junk", cost: 400, desc: "Massive knockback effect.", effects: { knockback: true } },
                { name: "Sawblades", cost: 800, desc: "Pierces 3 enemies.", effects: { pierce: 3, damage_mult: 1.5 } },
                { name: "Bowling Balls", cost: 1600, desc: "20% Stun Chance.", effects: { stun_chance: 0.2 } },
                { name: "Everything AND the Sink", cost: 3200, desc: "Guaranteed 5x Crit every 3 shots.", effects: { crit_req: 3, crit_mult: 5.0 } }
            ],
            path2: [
                { name: "Motorized", cost: 350, desc: "Double fire rate.", effects: { speed_mult: 2.0 } },
                { name: "Shrapnel Blast", cost: 900, desc: "Fires in a shotgun spread.", effects: { fire_pattern: "shotgun", pellet_count: 5 } },
                { name: "Rusty Sawblades", cost: 1800, desc: "Shotgun spread pierces 3 targets and adds bleed.", effects: { pierce: 3, dot_duration: 3 } },
                { name: "Trash Tornado", cost: 3500, desc: "Increases to 10 pellets. Adds 10% stun chance.", effects: { pellet_count: 10, stun_chance: 0.1 } }
            ]
        }
    },
    {
        id: "rk_7", name: "TAR TRAPPER", visual_type: "cannon", is_cryo: true, sound_type: "snd_missile_launch", cost: 1000, damage: 15, range: 4, speed: 0.25, bullet_speed: 5, life: 180, shield: 10, is_unlocked: false,
        upgrades: {
            path1: [
                { name: "Thick Sludge", cost: 200, desc: "Increases slow duration.", effects: { slow_duration_mult: 1.5 } },
                { name: "Wide Spray", cost: 400, desc: "+1 Range, larger AoE.", effects: { range_add: 1 } },
                { name: "Tar Pools", cost: 900, desc: "Leaves permanent slowing traps on path.", effects: { secondary: "gas_grenade", secondary_cd: 3 } },
                { name: "Cement Mixer", cost: 1800, desc: "20% chance to stun enemies completely.", effects: { stun_chance: 0.2 } }
            ],
            path2: [
                { name: "Flaming Tar", cost: 300, desc: "Ignites the tar! Adds burn DoT.", effects: { dot_duration: 3 } },
                { name: "Explosive Barrels", cost: 600, desc: "Massive damage increase.", effects: { damage_mult: 3.0 } },
                { name: "Heavy Shrapnel", cost: 1200, desc: "Shots pierce 4 targets.", effects: { pierce: 4 } },
                { name: "Devastation", cost: 2500, desc: "Piercing shots drop Napalm pools.", effects: { secondary: "napalm_drop", secondary_cd: 4 } }
            ]
        }
    },
    {
        id: "rk_8", name: "SURVIVALIST", visual_type: "rifle", sound_type: "snd_gun_heavy", cost: 1600, damage: 120, range: 8, speed: 1.0, bullet_speed: 12, life: 400, shield: 100, is_unlocked: false,
        upgrades: {
            path1: [
                { name: "Scope", cost: 500, desc: "+2 Range.", effects: { range_add: 2 } },
                { name: "Armor Piercing", cost: 1000, desc: "Pierces 3 enemies.", effects: { pierce: 3 } },
                { name: "Explosive Rounds", cost: 2000, desc: "Swaps to Cannon. Huge AoE.", effects: { visual_type: "cannon", damage_mult: 2.0 } },
                { name: "Fat Man", cost: 4500, desc: "Fires a nuke every 10s.", effects: { secondary: "nuke", secondary_cd: 10 } }
            ],
            path2: [
                { name: "Trigger Happy", cost: 600, desc: "Double fire rate.", effects: { speed_mult: 2.0 } },
                { name: "Bleed Out", cost: 1200, desc: "Adds DoT.", effects: { dot_duration: 3 } },
                { name: "Acid Grenades", cost: 2200, desc: "Tosses gas grenades (slow).", effects: { secondary: "gas_grenade", secondary_cd: 4 } },
                { name: "Lone Wolf", cost: 4000, desc: "Guaranteed 5x Crit every 3 shots.", effects: { crit_req: 3 } }
            ]
        }
    },
    {
        id: "rk_9", name: "JETPACK PSYCHO", visual_type: "LMG", sound_type: "snd_machine_gun", cost: 3000, damage: 30, range: 5, speed: 6.0, bullet_speed: 8, life: 450, shield: 100, is_unlocked: false, is_flying: true,
        upgrades: {
            path1: [
                { name: "More Jet", cost: 800, desc: "Increases flight patrol speed.", effects: { flight_speed_mult: 1.5 } },
                { name: "Wider Circle", cost: 1200, desc: "Increases patrol radius.", effects: { patrol_radius_add: 3 } },
                { name: "Hunting Mode", cost: 2500, desc: "Hunts the leading enemy map-wide.", effects: { range_add: 10 } },
                { name: "Twin MGs", cost: 4500, desc: "Fires dual streams.", effects: { fire_pattern: "twin", damage_mult: 1.5 } }
            ],
            path2: [
                { name: "Molotovs", cost: 1000, desc: "Drops grenades on patrol.", effects: { secondary: "grenade", secondary_cd: 3 } },
                { name: "Napalm Tanks", cost: 2000, desc: "Drops fire trails constantly.", effects: { secondary: "napalm_drop", secondary_cd: 2 } },
                { name: "Kamikaze", cost: 3500, desc: "Drops a heavy bomb on the leader every 8s.", effects: { secondary: "heavy_bomb", secondary_cd: 8 } },
                { name: "Nuka-Drop", cost: 6000, desc: "Drops a Nuke every 15s.", effects: { secondary: "nuke", secondary_cd: 15 } }
            ]
        }
    },
    {
        id: "rk_10", name: "RAIDER OVERBOSS", visual_type: "cannon", sound_type: "snd_explosion", cost: 4500, damage: 350, range: 7, speed: 0.5, bullet_speed: 8, life: 1500, shield: 500, is_unlocked: false,
        upgrades: {
            path1: [
                { name: "Power Armor", cost: 1000, desc: "+Damage.", effects: { damage_mult: 1.5 } },
                { name: "Minigun Swap", cost: 2500, desc: "Swaps to HMG. Insane fire rate.", effects: { visual_type: "HMG", speed_mult: 5.0, damage_mult: 0.3 } },
                { name: "Explosive Minigun", cost: 5000, desc: "Bullets cause AoE splash.", effects: { visual_type: "cannon" } },
                { name: "Warlord", cost: 8000, desc: "Guaranteed 10x Crit every 5 shots.", effects: { crit_req: 5, crit_mult: 10.0 } }
            ],
            path2: [
                { name: "Fat Man Swap", cost: 1500, desc: "Swaps to Nuke. Slower, massive damage.", effects: { damage_mult: 3.0, speed_mult: 0.5 } },
                { name: "MIRV", cost: 3000, desc: "Fires two nukes.", effects: { fire_pattern: "mirv" } },
                { name: "Radioactive", cost: 5500, desc: "Nukes leave radiation pools.", effects: { nuke_radioactive: true } },
                { name: "Nuka-World King", cost: 9500, desc: "Fires a Liberty Laser sweeping the track every 10s.", effects: { secondary: "liberty_laser", secondary_cd: 10 } }
            ]
        }
    }
];
