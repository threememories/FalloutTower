_TD.a.push(function (TD) {
	function defaultMonsterRender() {
		if (!this.is_valid || !this.grid) return;

        // NEW: Check if the calling context is the Y-sort queue, otherwise skip to prevent double-drawing
        if (arguments[0] !== "ysort") return;

		var ctx = TD.ctx;

        // V.A.T.S. Highlight
        if (TD.vats_active) {
            ctx.strokeStyle = "#00ff00"; 
            ctx.lineWidth = 3 * _TD.retina; 
        } else {
            ctx.strokeStyle = "#000"; 
            ctx.lineWidth = 1; 
        }

        // Smooth Fading Render for Stealth
        var rgb = TD.lang.rgb2Arr(this.color);
        var alpha = typeof this.stealth_alpha !== 'undefined' ? this.stealth_alpha : 1.0;
        
        if (this.is_stealthed || this.is_burrowing) {
            // Draw faint hollow outline permanently while flagged as stealth/burrow
            ctx.strokeStyle = "rgba(0, 255, 0, 0.3)"; 
            ctx.lineWidth = 2 * _TD.retina;
        }
        
        // Draw the solid core fading in and out based on alpha
        ctx.fillStyle = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + alpha + ")";
        
        // --- NEW: MUTATION GLOW ---
        if (this.is_mutated) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = "#00ff00"; // Intense green glow
            ctx.strokeStyle = "#00ff00";
            ctx.lineWidth = 2 * _TD.retina;
        }
        
		ctx.beginPath(); ctx.arc(this.cx, this.cy, this.r, 0, Math.PI * 2, true); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.shadowBlur = 0; // Reset shadow so the whole screen doesn't glow!
	}


	TD.getDefaultMonsterAttributes = function (monster_idx) {
		var monster_attributes = [
            // --- TIER 1: SWARM & CHAFF ---
            { name: "Radroach",           desc: "Weak, fast-ish pest.",                                                           speed: 4,  life: 75,   damage: 1, shield: 0,  money: 5 },
            { name: "Giant Ant",          desc: "An extremely fast, swarming insect.",                                            speed: 26, life: 45,   damage: 1, shield: 1,  money: 4 },
            { name: "Stingwing",          is_flying: true, desc: "Agile flying pest.",                                            speed: 15, life: 38,   damage: 2, shield: 0,  money: 5, color: "#88cc33" },
            { name: "Feral Ghoul",        desc: "Mindless irradiated human.",                                                     speed: 8,  life: 75,   damage: 2, shield: 1,  money: 6 },
            { name: "Giant Gecko",        desc: "A quick and nimble mutated lizard.",                                             speed: 11, life: 105,  damage: 3, shield: 1,  money: 6 },
            { name: "Mole Rat",           desc: "Fast underground creature.",                                                     speed: 15, life: 75,   damage: 3, shield: 1,  money: 8 },
            
            // --- TIER 2: STANDARD & ARMORED ---
            { name: "Protectron",         resist_kinetic: 0.6, desc: "Armored security bot.",                                     speed: 6,  life: 75,   damage: 3, shield: 20, money: 10 },
            { name: "Cazador",            is_flying: true, desc: "Lightning fast flying wasp.",                                   speed: 19, life: 60,   damage: 4, shield: 1,  money: 10, color: "#dd9900" },
            { name: "Mirelurk",           resist_kinetic: 0.6, desc: "Slow-moving, heavily-armored crustacean.",                  speed: 5,  life: 225,  damage: 5, shield: 10, money: 12 },
            { name: "Mr. Gutsy",          is_flying: true, resist_kinetic: 0.6, special_on_leak: "double_damage", desc: "Durable, flying robot that deals double damage to the base.", speed: 10, life: 450, damage: 5, shield: 5, money: 18, color: "#aab59c" },
            { name: "Radscorpion",        resist_kinetic: 0.6, special_on_death: "spawn_hatchlings", desc: "Tough all-rounder that spawns 3-6 hatchlings on death.", speed: 11, life: 375, damage: 8, shield: 3, money: 15 },

            // --- TIER 3: SPECIALIZED & DANGEROUS ---
            { name: "Glowing One",        resist_energy: 0.6, desc: "Highly irradiated, deals massive base damage.",              speed: 9,  life: 75,   damage: 10, shield: 2, money: 15 },
            { name: "Assaultron",         resist_kinetic: 0.6, special_behavior: "assaultron_laser", desc: "Fast robot that fires a laser at the base when it gets close.", speed: 18, life: 900, damage: 1, shield: 8, money: 20 },
            { name: "Super Mutant",       resist_kinetic: 0.6, desc: "Large, mutated brute.",                                     speed: 6,  life: 750,  damage: 3, shield: 1,  money: 15 },
            { name: "Nightkin",           is_stealthed: true, resist_kinetic: 0.6, desc: "Tough, stealthed mutant.",              speed: 10, life: 1200, damage: 8, shield: 2,  money: 20, color: "#330066" },
            
            // --- TIER 4: APEX PREDATORS & BOSSES ---
            { name: "Yao Guai",           resist_kinetic: 0.6, desc: "A ferocious, high-speed predator.",                         speed: 16, life: 1350, damage: 12, shield: 4,  money: 25 },
            { name: "Sentry Bot",         resist_kinetic: 0.6, resist_explosive: 0.6, desc: "Heavily armored military robot.",   speed: 4,  life: 450,  damage: 5, shield: 15, money: 25 },
            { name: "Deathclaw",          resist_kinetic: 0.6, resist_explosive: 0.6, desc: "Extremely fast, tough apex predator.", speed: 19, life: 1800, damage: 15, shield: 5,  money: 40 },
            { name: "Scorchbeast",        is_flying: true, resist_kinetic: 0.6, resist_explosive: 0.6, desc: "Massive flying terror.", speed: 5, life: 3750, damage: 30, shield: 5,  money: 60, color: "#551111" },
            
            // --- LEGENDARIES (PRE-MUTATED) ---
            { name: "Legendary Ghoul",        is_mutated: true, desc: "Glowing, hyper-fast ghoul.",                                 speed: 10, life: 115,  damage: 4,  shield: 2 },
            { name: "Legendary Mirelurk",     is_mutated: true, resist_kinetic: 0.4, desc: "A super-heavy, shielded behemoth.",      speed: 6,  life: 375,  damage: 8,  shield: 15 },
            { name: "Legendary Radscorpion",  is_mutated: true, resist_kinetic: 0.4, special_on_death: "spawn_hatchlings", desc: "A faster, tougher scorpion.", speed: 15, life: 600,  damage: 12, shield: 5 },
            { name: "Legendary Mutant",       is_mutated: true, resist_kinetic: 0.4, desc: "Enraged giant brute.",                   speed: 8,  life: 1125, damage: 6,  shield: 2 },
            { name: "Legendary Yao Guai",     is_mutated: true, resist_kinetic: 0.4, desc: "A terrifyingly fast alpha predator.",    speed: 20, life: 1950, damage: 18, shield: 6 },
            { name: "Legendary Nightkin",     is_mutated: true, is_stealthed: true, resist_kinetic: 0.4, desc: "Invisible enraged assassin.", speed: 13, life: 1800, damage: 15, shield: 3, color: "#330066" },
            { name: "Legendary Deathclaw",    is_mutated: true, resist_kinetic: 0.4, resist_explosive: 0.4, desc: "Unstoppable apex predator.", speed: 24, life: 2700, damage: 25, shield: 8 }
		];

		if (typeof monster_idx == "undefined") { return monster_attributes.length; }
		var attr = monster_attributes[monster_idx] || monster_attributes[0], attr2 = {};
		TD.lang.mix(attr2, attr);
		if (!attr2.render) { attr2.render = defaultMonsterRender; }
		return attr2;
	};

	TD.WaveDirector = {
		consecutive_breather_waves: 0,
		survival_waves: [
			[], // Index 0 (unused)
			[[3, 0]], // Wave 1: 3 Radroaches
			[[5, 0]], // Wave 2: 5 Radroaches
			[[8, 0]], // Wave 3: 8 Radroaches
			[[12, 0]], // Wave 4: 12 Radroaches
			[[15, 0]], // Wave 5: 15 Radroaches
			[[4, 3]], // Wave 6: 4 Feral Ghouls
			[[10, 0], [3, 3]], // Wave 7: 10 Radroaches, 3 Feral Ghouls
			[[6, 3]], // Wave 8: 6 Feral Ghouls
			[[15, 0], [5, 3]], // Wave 9: 15 Radroaches, 5 Feral Ghouls
			[[10, 3]]  // Wave 10: 10 Feral Ghouls
		],


		generateDynamicWave: function(wave_idx, is_campaign, map) {
			var difficulty = TD.difficulty || 1.0;
			
            // 1. CALCULATE PLAYER DPS OUTPUT
            var total_dps = 0;
            
			if (map && map.buildings) {
				TD.lang.each(map.buildings, function(b) {
					if (b.is_weapon) {
                        var aps = b.speed > 0 ? (1 / b.speed) : 1; 
                        var pierce_mult = b.pierce_count ? b.pierce_count : 1;
                        var aoe_mult = (b.visual_type === "cannon" || b.fire_pattern === "cluster") ? 3 : 1;
                        var dps = (b.damage * aps * pierce_mult * aoe_mult);
                        total_dps += dps;
					}
				});
			}

            // 2. DYNAMIC BUDGETING
            // Smoothly curve the base budget using wave count, and heavily nerf the DPS tax (from 70% to 15%)
            var baseline_threat = (total_dps * 0.15) + (wave_idx * 4) + 15; 
            var budget = baseline_threat * difficulty; 
            
            var minimum_budget = wave_idx * 5;
            // Greatly expand the maximum budget ceiling to support late-game scaling
            var maximum_budget = 100 + (wave_idx * 25); 
            
            if (budget < minimum_budget) budget = minimum_budget;
            if (budget > maximum_budget) budget = maximum_budget; // STOPS INFINITE INFLATION
			
			// 3. THE BREATHER CHECK

			var is_siege = map && map.map_type === "siege";
			var hp_percent = is_siege ? (TD.base_health / 10) : TD.life;
			var force_breather = false;
            
			if (hp_percent < 25) {
				if (this.consecutive_breather_waves === 0) {
					budget *= 0.6; // 40% reduction for breather
                    force_breather = true;
					this.consecutive_breather_waves = 1;
				} else {
					this.consecutive_breather_waves = 0; // No mercy
				}
			} else {
				this.consecutive_breather_waves = 0; // Reset if healthy
			}

			// Bestiary: [Monster ID, Cost, Type, Max Per Wave, Batch Limit] 
            // Types: 0=Swarm, 1=Tank, 2=Flyer, 3=Stealth/Special, 4=Boss, 5=Legendary
			var bestiary = [
                // Type 0: Swarms
				[0, 2, 0, 99, 8], [1, 3, 0, 99, 8], [3, 4, 0, 99, 6], [4, 5, 0, 99, 6],
                // Type 1: Tanks & Brutes
				[6, 8, 1, 99, 4], [8, 15, 1, 99, 3], [13, 18, 1, 99, 3], [10, 20, 1, 99, 2],
                // Type 2: Flyers
				[2, 6, 2, 99, 4], [7, 8, 2, 99, 4], [9, 15, 2, 99, 2],
                // Type 3: Stealth & Special Hazards
				[5, 7, 3, 20, 3], [11, 20, 3, 10, 2], [12, 25, 3, 5, 1], [14, 30, 3, 5, 1],
                // Type 4: Bosses
				[15, 35, 4, 3, 1], [16, 40, 4, 2, 1], [17, 50, 4, 2, 1], [18, 60, 4, 1, 1],
                // Type 5: Legendaries
                [19, 45, 5, 4, 1], [20, 60, 5, 3, 1], [22, 65, 5, 3, 1], [21, 70, 5, 2, 1], [23, 80, 5, 2, 1], [24, 90, 5, 2, 1], [25, 120, 5, 1, 1]
			];


			// 4. TELEGRAPHED SCHEDULE & RESTRICTIONS
			var allowed = bestiary.filter(function(m) {
				if (m[2] === 5 && (wave_idx < 50 || force_breather)) return false; // Legendaries
				if (m[2] === 4 && (wave_idx < 30 || force_breather)) return false; // Bosses
				if (m[2] === 3 && (wave_idx < 20 || force_breather)) return false; // Stealth/Special
				if (m[2] === 2 && (wave_idx < 15)) return false; // Flyers
				return true;
			});
            
			// 5. ASSEMBLE WAVE
			var wave_composition = [];
            var spawn_counts = { 3: 0, 4: 0 }; 
            
            // --- NEW: STRICT UNIT CAP TO PREVENT BLOBS ---
            // HORDE MODE: Gentle growth to prevent browser crash
            var max_units_this_wave = 15 + Math.floor(wave_idx * 0.8); 
            if (wave_idx > 60) {
                // Hard cap the absolute maximum number of physical entities rendered at once to maintain FPS
                max_units_this_wave = Math.min(150, max_units_this_wave + (wave_idx - 60)); 
            }

            var total_spawned = 0;


			while (budget > 0 && allowed.length > 0 && total_spawned < max_units_this_wave) {
				var pick = allowed[Math.floor(Math.random() * allowed.length)];
				var id = pick[0], cost = pick[1], type = pick[2], max_wave = pick[3], max_batch = pick[4];
				
				if (budget >= cost) {
					var qty = Math.min(Math.floor(budget / cost), Math.floor(Math.random() * max_batch) + 1);
                    
                    // Respect the max units physical limit
                    if (total_spawned + qty > max_units_this_wave) {
                        qty = max_units_this_wave - total_spawned;
                    }

                    if (type === 3 || type === 4) {
                        if (spawn_counts[type] + qty > max_wave) qty = max_wave - spawn_counts[type];
                        spawn_counts[type] += qty;
                        if (spawn_counts[type] >= max_wave) allowed = allowed.filter(function(m) { return m[2] !== type; });
                    }

                    if (qty > 0) {
					    wave_composition.push([qty, id]);
					    budget -= (cost * qty);
                        total_spawned += qty;
                    } else {
                        // Failsafe: Remove from pool to prevent infinite loops if qty gets clamped to 0
                        allowed = allowed.filter(function(m) { return m[2] !== type; });
                    }
				} else {
					allowed = allowed.filter(function(m) { return m[1] <= budget; });
				}
			}
			return wave_composition;

		}
	};
	TD.makeMonsters = function (n, range) {
        if (typeof TD !== 'undefined' && TD.log) TD.log("makeMonsters called. Generating new wave...");
		var current_wave = 1;
		var is_campaign = window.is_campaign_mode === true;
		var map = null;
		
		// Attempt to get real-time state
		if (TD.stage && TD.stage.current_act && TD.stage.current_act.current_scene) {
			current_wave = TD.stage.current_act.current_scene.wave + 1; // +1 for the incoming wave
			map = TD.stage.current_act.current_scene.map;
		}

		// --- NEW: Custom Spawns Hook ---
		if (TD.stage && TD.stage.cfg && TD.stage.cfg.custom_waves) {
			var cWave = TD.stage.cfg.custom_waves[current_wave];
			if (cWave && cWave.spawns && cWave.spawns.length > 0) {
				var customArr = [];
				for (var i = 0; i < cWave.spawns.length; i++) {
					customArr.push([cWave.spawns[i].qty, cWave.spawns[i].monster_idx]);
				}
				return customArr;
			}
		}
		// -------------------------------

		// 1. Survival Predefined (Waves 1-10)

		if (!is_campaign && current_wave <= 10) {
			if (TD.WaveDirector.survival_waves[current_wave]) return TD.WaveDirector.survival_waves[current_wave];
		}

		// 2. Dynamic Curated Director (Survival 11+ OR Campaign 6+)
		if ((!is_campaign && current_wave > 10) || (is_campaign && current_wave > 5)) {
			if (map) return TD.WaveDirector.generateDynamicWave(current_wave, is_campaign, map);
		}

		// 3. Fallback for Initialization or Campaign 1-5 (if not hardcoded in maps.js)
		n = n || 10;
		var a = [], count = 0, i, c, d, r;
		var max_allowed_idx = 7; 
		if (current_wave >= 12) max_allowed_idx = 11;
		else if (current_wave >= 8) max_allowed_idx = 11;
		else if (current_wave >= 6) max_allowed_idx = 9;

		if (!range) { range = []; for (i = 0; i <= max_allowed_idx; i++) { range.push(i); } }
		while (count < n) {
			d = n - count;
			c = Math.min(Math.floor(Math.random() * d) + 1, 3);
			r = Math.floor(Math.random() * range.length);
			a.push([c, range[r]]);
			count += c;
		}
		return a;
	};

	var monster_obj = {
		_init: function (cfg) {
			cfg = cfg || {}; this.is_monster = true; this.idx = typeof cfg.idx !== 'undefined' ? cfg.idx : 1; this.difficulty = cfg.difficulty || 1.0;
			var attr = TD.getDefaultMonsterAttributes(this.idx);
			this.name = attr.name || "Unknown"; // NEW: Store the name so VATS tooltip can read it without crashing
			this.is_flying = !!attr.is_flying;
            this.is_stealthed = !!attr.is_stealthed;
            this.is_mutated = !!attr.is_mutated; // NEW: Apply mutation flag on spawn
			this.speed = Math.floor((attr.speed + this.difficulty / 2) * (Math.random() * 0.5 + 0.75));
			if (this.speed < 1) this.speed = 1; if (this.speed > cfg.max_speed) this.speed = cfg.max_speed;
            // HP is now exactly: Base * Difficulty * RNG Variance
			this.life = this.life0 = Math.floor(attr.life * this.difficulty * (Math.random() + 0.5));
			if (this.life < 1) this.life = this.life0 = 1;
			this.shield = Math.floor(attr.shield + this.difficulty / 2); if (this.shield < 0) this.shield = 0;
			this.damage = Math.floor((attr.damage || 1) * (Math.random() * 0.5 + 0.75)); if (this.damage < 1) this.damage = 1;
			this.money = attr.money || Math.floor(Math.sqrt((this.speed + this.life) * (this.shield + 1) * this.damage)); if (this.money < 1) this.money = 1;
			this.color = attr.color || TD.lang.rndRGB(); 
            
            // --- 1. UNIFORM HITBOX ---
            this.r = 12 * _TD.retina; // Shrunk size to make them harder to hit with AoE
            
            this.render = attr.render; this.grid = null; this.map = null; this.next_grid = null; this.way = []; this.toward = 2; this._dx = 0; this._dy = 0; this.is_blocked = false;
            
            // --- 2. CLAMPED WIDENED SPAWN SCATTER ---
            // Tightened the scatter to 40% of the grid size so they safely fit within path boundaries
            this.offset_x = (Math.random() * (TD.grid_size * 0.4)) - (TD.grid_size * 0.2);
            this.offset_y = (Math.random() * (TD.grid_size * 0.4)) - (TD.grid_size * 0.2);
            this.preferred_offset_x = this.offset_x;
            this.preferred_offset_y = this.offset_y;
            
            // MOLE RAT: Initial burrow state
            if (this.name === "Mole Rat") {
                this.is_burrowing = true;
                this.is_stealthed = true;
                this.state_timer = TD.exp_fps * (4 + Math.random() * 2); // 4-6 seconds initially
            }

            // --- 3. DYNAMIC STAT RAMPING ---
            /* DISABLED FOR BALANCE
            var current_wave = (TD.stage && TD.stage.current_act && TD.stage.current_act.current_scene) ? TD.stage.current_act.current_scene.wave : 1;
            if (current_wave >= 6) {
                var scaling_waves = current_wave - 5;
                // Cumulative +3% Health and +1% Speed per wave starting at Wave 6
                var hp_mult = 1.0 + (scaling_waves * 0.03);
                var spd_mult = 1.0 + (scaling_waves * 0.01);

                this.life0 = Math.floor(this.life0 * hp_mult);
                this.life = this.life0;
                this.speed = this.speed * spd_mult;
            }
            */

		},

		caculatePos: function () { var r = this.r; this.x = this.cx - r; this.y = this.cy - r; this.x2 = this.cx + r; this.y2 = this.cy + r; },
		beHit: function (building, damage) {
			if (!this.is_valid) return;

            // --- NEW: Damage Resistance & Bonus Calculation ---
            if (building && building.damage_type) {
                var resistance_multiplier = 1.0;
                if (building.damage_type === "Kinetic" && this.resist_kinetic) {
                    resistance_multiplier = this.resist_kinetic;
                } else if (building.damage_type === "Energy" && this.resist_energy) {
                    resistance_multiplier = this.resist_energy;
                } else if (building.damage_type === "Explosive" && this.resist_explosive) {
                    resistance_multiplier = this.resist_explosive;
                }
                damage = Math.floor(damage * resistance_multiplier);

                // Bonus damage against mutated
                if (this.is_mutated && building.bonus_damage_mutated) {
                    damage = Math.floor(damage * building.bonus_damage_mutated);
                }
            }
            
            // --- NEW: Vulnerability Aura Check ---
            var _this = this;
            var vuln_mult = 1.0;
            if (this.map && this.map.buildings) {
                TD.lang.each(this.map.buildings, function(b) {
                    if (b.is_valid && b.aura_vulnerability) {
                        var dist = Math.pow(b.cx - _this.cx, 2) + Math.pow(b.cy - _this.cy, 2);
                        if (dist <= Math.pow(b.range_px, 2)) vuln_mult = b.aura_vulnerability; // Usually 1.15
                    }
                });
            }
            damage = Math.floor(damage * vuln_mult);
            
			var min_damage = Math.ceil(damage * 0.1); damage -= this.shield; if (damage <= min_damage) damage = min_damage;
			this.life -= damage; 
            var scoreGained = Math.floor(Math.sqrt(damage));

            TD.score += scoreGained;
            
            // Add a very small trickle to V.A.T.S. charge on hit, but NOT during demo or wave 0
            if (typeof TD.vats_charge !== 'undefined' && !TD.vats_active && !window.is_demo_mode && this.map && this.map.scene && this.map.scene.wave > 0) {
                TD.vats_charge += (scoreGained * 0.1); 
                if (TD.vats_charge > TD.vats_max_charge) TD.vats_charge = TD.vats_max_charge;
            }

            
            // --- NEW: Award XP just for hitting the target (50% chance for 1 XP) ---
            if (building && building.gainXp) {
                if (Math.random() < 0.5) {
                    building.gainXp(1);
                }
            }


			// NEW: Scatter and Throttle (Only show text every 3 frames per monster)
			if (!this._last_dmg_frame || TD.iframe - this._last_dmg_frame > 3) {

				this._last_dmg_frame = TD.iframe;
				var offsetX = (Math.random() * 24) - 12; // Scatters horizontally
				var offsetY = (Math.random() * 10) - 5;  // Scatters slightly vertically
				
				new TD.FloatingText("dmg-" + TD.lang.rndStr(), {
					cx: this.cx + offsetX, cy: (this.cy - 10) + offsetY, text: "-" + damage, color: "#ff5555", map: this.map, size: 14, life: 16
				});
			}

            
			if (this.life <= 0) { 

                // --- NEW: WAVE MUTATION TOGGLE CHECK ---
                var mutations_allowed = true; // Default to true
                if (this.scene && typeof TD !== 'undefined' && TD.stage && TD.stage.cfg && TD.stage.cfg.custom_waves) {
                    var cData = TD.stage.cfg.custom_waves[this.scene.wave];
                    if (cData && typeof cData.mutations_enable !== 'undefined') {
                        mutations_allowed = cData.mutations_enable;
                    }
                }
                // --- NEW: Disable mutations in tutorial ---
                if (typeof TD !== 'undefined' && TD.is_tutorial_active) {
                    mutations_allowed = false;
                }
                // --- NEW: LEGENDARY MUTATION MECHANIC ---

                // Only allow mutation once, and prevent weak swarms (idx 0,8,9 = Roaches/Wasps) from mutating
                if (mutations_allowed && !this.is_mutated && this.idx !== 0 && this.idx !== 8 && this.idx !== 9) {
                    var mutChance = (window.customDifficulty > 1) ? 0.05 : 0.03; // 3% Normal, 5% Hard
                    if (Math.random() <= mutChance) {
                        this.is_mutated = true;
                        
                        // 1. Fully heal and buff stats
                        this.life0 = Math.floor(this.life0 * 1.5); // 150% Max HP
                        this.life = this.life0;                    // Fully Healed
                        this.speed = this.speed * 1.25;            // 25% Faster
                        
                        // 2. Announce
                        if (window.IntelData && TD.Announcer) TD.Announcer.add("LEGENDARY ENEMY HAS MUTATED!", 5);
                        if (typeof TD.triggerMetaChatter === 'function') TD.triggerMetaChatter("react_mutation");
                        
                        // 3. Visuals
                        TD.Explode("mutate-" + TD.lang.rndStr(), { cx: this.cx, cy: this.cy, r: 40 * _TD.retina, step_level: 1, render_level: 9, color: "#00ff00", scene: this.map.scene, time: 1.0 });
                        new TD.FloatingText("mut-text-" + TD.lang.rndStr(), { cx: this.cx, cy: this.cy - 20, text: "MUTATED!", color: "#00ff00", map: this.map, size: 20, life: 40 });
                        
                        return; // ABORT THE DEATH SEQUENCE!
                    }
                }

                // --- NEW: Tiered XP for landing the killing blow ---
                if (building && building.gainXp) {

                    // Base kill XP is 10. Max index is 8 (Sentry Bot).
                    // The formula gives roughly 10 to 25 XP based on how tough the monster is.
                    var killXp = 10 + Math.floor(this.idx * 1.8);
                    building.gainXp(killXp);
                    
                    // Also grant Account XP
                    if (typeof TD.addAccountXp === 'function') {
                        TD.addAccountXp(killXp);
                    }
                }

                
                // --- NEW: Scaled Chance to drop Loot (Base 5% + 1.5% per monster index level)
                var base_chance = 0.05;
                
                // LUCK PASSIVE (+10% base chance)
                if (typeof TD !== 'undefined' && TD.perks && TD.perks.L) base_chance += 0.10;
                
                var scaling_bonus = (this.idx * 0.015);
                var dropChance = (window.devForcedDrop && window.devForcedDrop !== "none") ? 1.0 : (base_chance + scaling_bonus);
                
                // LUCK OVERDRIVE ACTIVE (Massive 50% flat boost)
                if (typeof TD !== 'undefined' && TD.overdrive && TD.overdrive.L > 0) {
                    dropChance += 0.50;
                }
                
                // GUARANTEED WAVE DROPS (First kill of the specific wave)

                var forceLoot = null;
                
                // NEW: Tutorial forced drop
                if (typeof TD !== 'undefined' && TD.is_tutorial_active && this.scene) {
                    // Drop Lunchbox on the LAST monster of Wave 2
                    var active_m = 0;
                    TD.lang.each(this.map.monsters, function(m) { if (m.is_valid && m.life > 0) active_m++; });
                    var incoming_m = this.map._wait_add_monsters > 0 || this.map._wait_add_monsters_arr.length > 0;
                    
                    if (this.scene.wave === 2 && !this.scene._tutDropW2 && active_m === 0 && !incoming_m) {
                        forceLoot = "lunchbox"; this.scene._tutDropW2 = true;
                    }
                    
                    // Drop Stimpak on the very first kill of Wave 4
                    if (this.scene.wave === 4 && !this.scene._tutDropStim) {
                        forceLoot = "stimpak"; this.scene._tutDropStim = true;
                    }
                } else if (this.scene) {
                    if (this.scene.wave === 3 && !this.scene._dropW3) {
                        forceLoot = "money"; this.scene._dropW3 = true;
                    } else if (this.scene.wave === 7 && !this.scene._dropW7) {
                        forceLoot = "stimpak"; this.scene._dropW7 = true;
                    } else if (this.scene.wave === 15 && !this.scene._dropW15) {
                        forceLoot = "stimpak"; this.scene._dropW15 = true;
                    }
                }

                // --- NEW: BOBBLEHEAD PITY TIMER ---
                if (!window.is_campaign_mode && this.scene) {
                    if (typeof TD.last_bobblehead_wave === 'undefined') TD.last_bobblehead_wave = 0;
                    // If it's been 10 waves since the last drop
                    if (this.scene.wave > 0 && (this.scene.wave - TD.last_bobblehead_wave) >= 10 && !this.scene._dropPityBobble) {
                        forceLoot = "bobblehead"; 
                        this.scene._dropPityBobble = true;
                    }
                }

                // Prevent random drops during the tutorial to maintain strict pacing
                if (typeof TD !== 'undefined' && TD.is_tutorial_active) {
                    dropChance = 0;
                }
                
                if (!window.is_demo_mode && (forceLoot || Math.random() < dropChance)) {

                    var newLoot = new TD.Loot("loot-" + TD.lang.rndStr(), {
                        cx: this.cx,
                        cy: this.cy,
                        map: this.map,
                        monster_bounty: this.money, // scale with monster's actual worth
                        forced_type: forceLoot // Let Loot._init handle it cleanly
                    });
                    
                    if (forceLoot && forceLoot !== "bobblehead") {
                        newLoot.loot_type = forceLoot;
                        if (forceLoot === "money") newLoot.value = 100; // Extra caps for the guaranteed drop
                    }
                }

                this.beKilled(building); 
                
                // --- NEW: LAST MONSTER IN WAVE DETECTION (TUTORIAL PHASE 4 & 5) ---
                if (typeof TD !== 'undefined' && TD.is_tutorial_active && TD.Tutorial && this.map) {
                    var active_monsters = 0;
                    TD.lang.each(this.map.monsters, function(m) {
                        if (m.is_valid && m.life > 0) active_monsters++;
                    });
                    
                    var incoming_monsters = this.map._wait_add_monsters > 0 || this.map._wait_add_monsters_arr.length > 0;
                    
                    if (active_monsters === 0 && !incoming_monsters) {
                        // End of Wave 1
                        if (this.scene.wave === 1) {
                            TD.Tutorial.next("wave_1_end");
                        }
                        // End of Wave 2
                        else if (this.scene.wave === 2) {
                            TD.Tutorial.pause_wave_timer = true;
                            // Prevent softlock if they killed everything before clicking speed
                            if (TD.Tutorial.steps[TD.Tutorial.step].trigger === "speed_up") {
                                TD.Tutorial.next("speed_up");
                            }
                            TD.Tutorial.next("loot_wait");
                        }

                        // End of Wave 3

                        else if (this.scene.wave === 3) {

                            TD.Tutorial.pause_wave_timer = true;
                            var lvl = TD.account_level || 1;
                            var xp_needed = Math.floor(150 * Math.pow(1.25, lvl - 1));
                            if (TD.account_xp < xp_needed) {
                                TD.addAccountXp(xp_needed - TD.account_xp); // Instantly fill XP
                            }
                            
                            var xpBtn = document.getElementById("btn-open-techtree");
                            if (xpBtn) {
                                xpBtn.style.setProperty("box-shadow", "0 0 20px #0f0, inset 0 0 10px #0f0", "important");
                                xpBtn.addEventListener("click", function _rmGlow() {
                                    this.style.removeProperty("box-shadow");
                                    this.removeEventListener("click", _rmGlow);
                                });
                            }
                            TD.Tutorial.next("wave_3_delay"); // Triggers XP modal
                        }
                        // End of Wave 8
                        else if (this.scene.wave === 8) {
                            if (TD.Tutorial.steps[TD.Tutorial.step].trigger === "wave_8_end") {
                                TD.Tutorial.pause_wave_timer = true;
                                TD.Tutorial.next("wave_8_end");
                            }
                        }
                    }
                }

            }
			// --- NEW: ASSAULTRON SELF-DESTRUCT SEQUENCE ---
            if (this.special_behavior === "assaultron_laser" && this.life > 0) {
                var critical_hp_threshold = this.life0 * 0.05;
                if (this.life <= critical_hp_threshold) {
                    // Start the self-destruct timer if it hasn't started already
                    if (typeof this.self_destruct_timer === 'undefined') {
                        this.self_destruct_timer = TD.exp_fps * 6; // 6 seconds
                        this.is_flashing_red = true; // Visual trigger
                    }

                    this.self_destruct_timer--;

                    if (this.self_destruct_timer <= 0) {
                        // Check if in final 25% of path before dealing damage
                        if (this.way) {
                             var percentTraveled = 100 - Math.floor((this.way.length / this._total_path_len) * 100);
                             if (percentTraveled >= 75) {
                                TD.life -= 25; // Deal 25 damage to base
                             }
                        }
                        this.beKilled({ killed: 0, gainXp: function(){} }); // Self-destruct
                        TD.Explode("assaultron-self-destruct-" + TD.lang.rndStr(), { cx: this.cx, cy: this.cy, r: 80, color: "#ff2200", scene: this.map.scene, time: 1.2 });
                        return; // Exit beHit function immediately
                    }
                }
            }

			var balloontip = this.scene.panel.balloontip;

			if (balloontip.el == this) { 
                if (this.is_hp_visible) {
                    var tags = [];
                    if (this.is_flying) tags.push("[FLYING]");
                    if (this.is_stealthed) tags.push("[STEALTH]");
                    if (this.speed >= 15) tags.push("[FAST]");
                    if (this.life0 >= 500) tags.push("[VERY STRONG]");
                    if (this.life0 >= 2000) tags.push("[BOSS]");
                    var tagStr = tags.length > 0 ? "\n" + tags.join(" ") : "";
                    
                    var sd_text = "";
                    if (this.self_destruct_timer > 0) {
                        var secs_left = Math.ceil(this.self_destruct_timer / TD.exp_fps);
                        sd_text = "\n<span style='color:#ff0000; font-weight:bold;'>SELF-DESTRUCT IN " + secs_left + "s</span>";
                    }

                    balloontip.text = this.name.toUpperCase() + "\nHP: " + this.life + " / " + this.life0 + tagStr + sd_text; 
                } else {
                    // No Intel: Keep the generic name
                    balloontip.text = this.name.toUpperCase();
                }
            }
		},
		beKilled: function (building) {
			if (!this.is_valid) return;
			this.life = 0; this.is_valid = false; building.killed++;
			if (typeof TD !== 'undefined' && TD.log) TD.log("Monster killed: " + this.name);

            // --- NEW: Combat Kill Chatter ---
            if (building && typeof building.say === 'function' && window.ChatterDB && TD.current_faction) {
                if (Math.random() < 0.15 || this.life0 >= 2000) { // 15% normal, 100% on bosses
                    building.say(window.ChatterDB.getChatter(TD.current_faction, "combat_kill"), "combat");
                }
            }

            // --- NEW: Scaling Kill Bounty ---

            var wave_bonus = 0;
            var current_wave = 1;
            if (this.scene && this.scene.wave) current_wave = this.scene.wave;
            
            if (current_wave >= 5) wave_bonus = 5;
            if (current_wave >= 9) wave_bonus = 8;
            if (current_wave >= 13) wave_bonus = 10;
            if (current_wave >= 17) wave_bonus = 15;
            
            // --- 4. ECONOMY REDUCTION ---
            // Flat 50% reduction to caps earned per kill (including wave bonuses), minimum 1 cap
            var final_bounty = Math.max(1, Math.floor((this.money + wave_bonus) * 0.5));
            TD.money += final_bounty;
            
            // --- NEW: BONUS BOUNTY PAYOUT ---
            if (building && building.bonus_bounty) {
                var extraCaps = Math.floor(Math.random() * 6) + 15; // Random 15 to 20
                TD.money += extraCaps;
                new TD.FloatingText("bounty-" + TD.lang.rndStr(), {
                    cx: this.cx, cy: this.cy - 20, text: "+" + extraCaps + " CAPS", color: "#ffff00", map: this.map, size: 14, life: 36
                });
            }
            
            // --- NEW: V.A.T.S. Charge Generation ---

            if (typeof TD.vats_charge !== 'undefined' && !TD.vats_active && !window.is_demo_mode && this.scene && this.scene.wave > 0) {
                // Fixed kill charge: base 3, scales up slightly for stronger enemies
                TD.vats_charge += 3 + Math.floor(this.idx * 1.5);
                if (TD.vats_charge > TD.vats_max_charge) TD.vats_charge = TD.vats_max_charge;
            }

            // --- NEW: Shatter AoE ---
            if (this.is_frozen && building && building.shatter_aoe) {
                var blast_radius = TD.grid_size * 2.0;
                TD.Explode("shatter-" + TD.lang.rndStr(), { cx: this.cx, cy: this.cy, r: blast_radius / _TD.retina, step_level: 1, render_level: 9, color: "#aaffff", scene: this.map.scene, time: 0.3 });
                var _this = this;
                TD.lang.each(this.map.monsters, function(m) {
                    if (m.is_valid && m !== _this && Math.pow(m.cx - _this.cx, 2) + Math.pow(m.cy - _this.cy, 2) <= Math.pow(blast_radius, 2)) {
                        m.beHit(building, 50); // Deal 50 splash damage
                    }
                });
            }

			// --- NEW: Special On-Death Effects ---
			if (this.special_on_death === "spawn_hatchlings" && this.grid) {
                var spawn_count = Math.floor(Math.random() * 4) + 3; // 3 to 6
                for (var i = 0; i < spawn_count; i++) {
                    // Spawns a weak hatchling (using Radroach stats, idx: 0) with half difficulty
                    var hatchling = new TD.Monster(null, { idx: 0, difficulty: TD.difficulty / 2, step_level: this.step_level, render_level: this.render_level + 2 });
                    this.grid.addMonster(hatchling);
                }
            }

			TD.Explode(this.id + "-explode", { cx: this.cx, cy: this.cy, color: this.color, r: this.r, step_level: this.step_level, render_level: this.render_level, scene: this.map.scene });
		},

		arrive: function () { this.grid = this.next_grid; this.next_grid = null; this.checkFinish(); },
		findWay: function () {
            var _this = this, bestWay = [], minLen = 999999;
            for (var i = 0; i < this.map.exits.length; i++) {
                var ext = this.map.exits[i];
                var fw = new TD.FindWay(this.map.grid_x, this.map.grid_y, this.grid.mx, this.grid.my, ext.mx, ext.my, function (x, y) { return _this.map.checkPassable(x, y); });
                if (fw.is_arrived && fw.way.length < minLen) { minLen = fw.way.length; bestWay = fw.way; }
            }
            this.way = bestWay;
		},
		checkFinish: function () {
			if (this.grid && this.map && this.grid.is_exit) {
				TD.wave_damage += this.damage;
                
                if (window.is_demo_mode) {
                    this.pause(); this.del();
                    return;
                }

                // --- NEW: ENDURANCE OVERDRIVE DAMAGE MITIGATION ---
                var final_damage = this.damage;

                // --- NEW: Special On-Leak Effects ---
                if (this.special_on_leak === "double_damage") {
                    final_damage *= 2;
                }
                
                if (typeof TD !== 'undefined' && TD.overdrive && TD.overdrive.E > 0) {
                    // "Large" monsters defined as base life >= 1000 (Bosses)
                    if (this.life0 >= 1000) {
                        final_damage = 1; // Take only 1 damage from absolute bosses
                    } else {
                        final_damage = 0; // Take no damage from anything else
                    }
                }


                // Trigger Screen Shake visually on the board container (ONLY if taking damage)
                if (final_damage > 0) {
                    var board = document.getElementById("td-board");
                    if (board) {
                        board.classList.remove("shake-active");
                        void board.offsetWidth; // Reflow to allow rapid sequential shakes
                        board.classList.add("shake-active");
                    }
                }

                var is_critical = false;
                var took_damage = false;
                if (this.map.map_type === "siege") {
                    this.is_attacking_base = true;
                    return; // Prevent deletion and keep them alive on the base
                } else {
                    TD.life -= final_damage;
                    if (TD.life <= 0) { TD.life = 0; TD.stage.gameover(); } else { this.pause(); this.del(); took_damage = true; is_critical = (TD.life <= 25); }
                }
                
                // --- NEW: Base Health Chatter Trigger ---
                if (took_damage && final_damage > 0 && typeof TD.triggerMetaChatter === 'function') {
                    // Throttle chatter so it doesn't spam on every single roach
                    if (Math.random() < 0.3) {
                        TD.triggerMetaChatter(is_critical ? "base_critical" : "base_damage");
                    }
                }
			}
		},



		beAddToGrid: function (grid) { this.grid = grid; this.map = grid.map; this.cx = grid.cx; this.cy = grid.cy; this.grid.scene.addElement(this); },
		getNextGrid: function () {
			if (this.way.length == 0 || Math.random() < 0.1) { this.findWay(); }
			var next_grid = this.way.shift();
			if (next_grid && !this.map.checkPassable(next_grid[0], next_grid[1])) { this.findWay(); next_grid = this.way.shift(); }
			if (!next_grid) return;
			this.next_grid = this.map.getGrid(next_grid[0], next_grid[1]);
		},
		chkIfBlocked: function (mx, my) {
            var _this = this, canReachAnyExit = false;
            for (var i = 0; i < this.map.exits.length; i++) {
                var ext = this.map.exits[i];
                var fw = new TD.FindWay(this.map.grid_x, this.map.grid_y, this.grid.mx, this.grid.my, ext.mx, ext.my, function (x, y) { return !(x == mx && y == my) && _this.map.checkPassable(x, y); });
                if (!fw.is_blocked) { canReachAnyExit = true; break; }
            }
            return !canReachAnyExit;
		},
		beBlocked: function () { if (this.is_blocked) return; this.is_blocked = true; },
		step: function () {
			if (!this.is_valid || this.is_paused || !this.grid) return;
            
            // NEW: Handle Freeze Debuff thawing
            if (this.is_frozen) {
                this.freeze_timer--;
                
                if (this.freeze_timer > 0) {
                    // --- NEW: True Freeze Bypass ---
                    // If they have more than 5 seconds (120 frames) left, they are SOLID ICE.
                    // We simply return out of the function so they don't move or attack at all!
                    if (this.freeze_timer > 120) {
                        return; 
                    }

                    // Dynamic Thaw (Last 5 seconds):
                    // Timer goes from 120 down to 0.
                    var freezePercentRemaining = this.freeze_timer / 120; // 1.0 down to 0.0
                    var thawPercent = 1 - freezePercentRemaining; // 0.0 up to 1.0
                    
                    // They regain speed linearly as the timer ticks down.
                    this.speed = Math.max(0.1, this.original_speed * thawPercent);
                    
                } else {
                    // Done freezing
                    this.is_frozen = false;
                    this.speed = this.original_speed;
                }
            }

			if (!this.next_grid) { 
                this.getNextGrid(); 
                if (!this.next_grid) { 
                    if (this.map.map_type === "siege") {
                        // NEW: Siege Mode Attack Logic
                        if (!this.attack_cooldown) this.attack_cooldown = 0;
                        
                        if (this.attack_cooldown > 0) {
                            this.attack_cooldown--;
                        } else if (this.is_attacking_base) {
                            // DEAL DAMAGE TO BASE CONTINUOUSLY
                            var final_damage = this.damage;
                            if (typeof TD !== 'undefined' && TD.overdrive && TD.overdrive.E > 0) {
                                final_damage = (this.life0 >= 1000) ? 1 : 0;
                            }
                            
                            if (final_damage > 0) {
                                TD.base_health -= (final_damage * 10);
                                TD.Explode(this.id + "-base-atk", { cx: this.cx, cy: this.cy, r: 15 * _TD.retina, step_level: this.step_level, render_level: 9, color: "#ff0000", scene: this.map.scene, time: 0.3 });
                                
                                var board = document.getElementById("td-board");
                                if (board) {
                                    board.classList.remove("shake-active");
                                    void board.offsetWidth;
                                    board.classList.add("shake-active");
                                }
                                
                                if (typeof TD.triggerMetaChatter === 'function' && Math.random() < 0.2) {
                                    TD.triggerMetaChatter(TD.base_health <= 300 ? "base_critical" : "base_damage");
                                }
                                
                                if (TD.base_health <= 0) {
                                    TD.base_health = 0;
                                    TD.stage.gameover();
                                }
                            }
                            this.attack_cooldown = 24; // Attack base once per second
                        } else {
                            // Look for adjacent blocking towers
                            var adj = [
                                this.map.getGrid(this.grid.mx + 1, this.grid.my),
                                this.map.getGrid(this.grid.mx - 1, this.grid.my),
                                this.map.getGrid(this.grid.mx, this.grid.my + 1),
                                this.map.getGrid(this.grid.mx, this.grid.my - 1)
                            ];
                            
                            for (var i = 0; i < adj.length; i++) {
                                if (adj[i] && adj[i].building) {
                                    var target = adj[i].building;
                                    var dmg = this.damage || 5; 
                                    
                                    if (target.shield > 0) {
                                        target.shield -= dmg;
                                        if (target.shield < 0) target.shield = 0;
                                    } else {
                                        target.life -= dmg;
                                    }
                                    
                                    // Visual attack feedback
                                    TD.Explode(this.id + "-atk", { cx: target.cx, cy: target.cy, r: 10 * _TD.retina, step_level: this.step_level, render_level: 9, color: "#ff0000", scene: this.map.scene, time: 0.2 });
                                    
                                    if (target.life <= 0) target.remove(); // Destroy the building
                                    
                                    this.attack_cooldown = 24; // Attack roughly once per second
                                    break;
                                }
                            }
                        }

                        // Ensure poison and fire still damages them while attacking the base
                        if (this.is_poisoned) {
                            this.poison_timer--;
                            if (this.poison_timer <= 0) this.is_poisoned = false;
                            if (this.poison_timer % 12 === 0) {
                                var pDmg = this.poison_damage || 5;
                                this.life -= pDmg;
                                new TD.FloatingText("pdmg-" + TD.lang.rndStr(), { cx: this.cx + (Math.random()*10-5), cy: this.cy - 10, text: "-" + pDmg, color: "#ff8800", map: this.map, size: 10, life: 12 });
                                if (this.life <= 0) this.beKilled({ killed: 0, gainXp: function(){} });
                            }
                        }

                    } else {
                        this.beBlocked(); 
                    }
                    return; 
                } 
            }
            
                // --- NEW: Soft Swarm Repulsion & Lane Shifting ---
                var _this = this;
                var is_bumping = false; // Track if actively touching someone
                var this_concealed = (_this.is_stealthed && !_this.is_revealed) || _this.is_burrowing;
                
                TD.lang.each(this.map.monsters, function(m) {
                    if (m !== _this && m.is_valid && m.grid) {
                        var m_concealed = (m.is_stealthed && !m.is_revealed) || m.is_burrowing;
                        
                        // --- CHANGED: Do not collide if either monster is concealed ---
                        if (this_concealed || m_concealed) return;
                        
                        var dx = _this.cx - m.cx;
                        var dy = _this.cy - m.cy;
                        var dist = Math.sqrt(dx*dx + dy*dy);
                        var minDist = _this.r + m.r; 
                        
                        if (dist > 0 && dist < minDist) {
                            is_bumping = true;
                            var push = (minDist - dist) * 0.15; // Tripled magnetic push
                            _this.offset_x += (dx / dist) * push;
                            _this.offset_y += (dy / dist) * push;
                        }
                    }
                });

                
                // --- NEW: Occasional random wandering ---
                // ~1% chance per frame to decide to wander to a new part of the path
                if (Math.random() < 0.01) {
                    this.preferred_offset_x = (Math.random() * (TD.grid_size * 0.7)) - (TD.grid_size * 0.35);
                    this.preferred_offset_y = (Math.random() * (TD.grid_size * 0.7)) - (TD.grid_size * 0.35);
                }

                // Smoothly pull toward PREFERRED lane over time if not bumping
                if (!is_bumping) {
                    this.offset_x += (this.preferred_offset_x - this.offset_x) * 0.05; 
                    this.offset_y += (this.preferred_offset_y - this.offset_y) * 0.05;
                }
                
                // Tighter clamping (35%) so they safely fit on the path while walking
                var maxOff = TD.grid_size * 0.35;
                if (this.offset_x > maxOff) this.offset_x = maxOff; else if (this.offset_x < -maxOff) this.offset_x = -maxOff;
                if (this.offset_y > maxOff) this.offset_y = maxOff; else if (this.offset_y < -maxOff) this.offset_y = -maxOff;
                
                // Add the dynamic lane offset to their target destination
                var target_cx = this.next_grid.cx + this.offset_x;
                var target_cy = this.next_grid.cy + this.offset_y;

                // --- NEW: Smooth Vector Movement ---
                var dpx = target_cx - this.cx;
                var dpy = target_cy - this.cy;
                var distToTarget = Math.sqrt(dpx * dpx + dpy * dpy);
                
                // --- NEW: PATH PROGRESS ANNOUNCER ---
                // Calculate how far they are based on their remaining path length
                if (this.way && this.map && this.map.entrance && this.map.exit) { // Simplified condition
                    // Estimate total path length (just once)
                    if (!this._total_path_len) this._total_path_len = this.way.length + 1;
                    
                    var percentTraveled = 100 - Math.floor((this.way.length / this._total_path_len) * 100);

                    // --- NEW: ASSAULTRON SPECIAL BEHAVIOR LOGIC ---
                    if (this.special_behavior === "assaultron_laser") {
                        // Final Stand at 95%
                        if (percentTraveled >= 95) {
                            if (typeof this.final_stand_timer === 'undefined') this.final_stand_timer = 0;
                            this.final_stand_timer--;
                            
                            if (this.final_stand_timer <= 0) {
                                // Charge (1.5s) -> Fire -> Rest (3s)
                                this.final_stand_timer = TD.exp_fps * 4.5;
                                
                                // Laser Charge-up Visual
                                TD.Explode("assaultron-charge-" + TD.lang.rndStr(), { cx: this.cx, cy: this.cy, r: 30, color: "#ff5555", scene: this.map.scene, time: 1.5 });
                                
                                // Fire after 1.5 seconds
                                setTimeout(function() {
                                    if (TD.life > 0) TD.life -= 10;
                                    TD.Explode("assaultron-fire-" + TD.lang.rndStr(), { cx: this.cx, cy: this.cy, r: 20, color: "#ff0000", scene: this.map.scene, time: 0.2 });
                                    var board = document.getElementById("td-board");
                                    if (board) { board.classList.remove("shake-active"); void board.offsetWidth; board.classList.add("shake-active"); }
                                }.bind(this), 1500);
                            }
                            // Halt all forward movement
                            this.caculatePos();
                            return; 
                        }
                        // One-time laser shots
                        else if (percentTraveled >= 85 && !this._fired_85) {
                            this._fired_85 = true; TD.life -= 10;
                            TD.Explode("assaultron-fire-" + TD.lang.rndStr(), { cx: this.cx, cy: this.cy, r: 15, color: "#ff0000", scene: this.map.scene, time: 0.2 });
                        }
                        else if (percentTraveled >= 75 && !this._fired_75) {
                            this._fired_75 = true; TD.life -= 10;
                            TD.Explode("assaultron-fire-" + TD.lang.rndStr(), { cx: this.cx, cy: this.cy, r: 15, color: "#ff0000", scene: this.map.scene, time: 0.2 });
                        }
                    }
                    
                    // Original Announcer Logic
                    if (window.IntelData && TD.Announcer) {
                        if (percentTraveled >= 50 && !this._warned_50) {
                            this._warned_50 = true;
                            if (this.life0 >= 2000 || Math.random() < 0.1) {
                                TD.Announcer.add(window.IntelData.getEvent("path_progress", TD.current_faction, null, this.name, 50), 4);
                            }
                        }
                        if (percentTraveled >= 75 && !this._warned_75) {
                            this._warned_75 = true;
                            if (this.life0 >= 2000 || Math.random() < 0.2) {
                                TD.Announcer.add(window.IntelData.getEvent("path_progress", TD.current_faction, null, this.name, 75), 5);
                            }
                        }
                    }
                }

                // --- STATUS EFFECT TIMERS ---

                // --- NEW: LEGENDARY HEALTH REGENERATION ---
                if (this.is_mutated && this.life < this.life0) {
                    if (typeof this.regen_timer === 'undefined') this.regen_timer = TD.exp_fps; // 1 second timer
                    this.regen_timer--;
                    if (this.regen_timer <= 0) {
                        this.regen_timer = TD.exp_fps; // Reset timer
                        var regen_amt = Math.max(1, Math.floor(this.life0 * 0.02)); // Heals 2% of Max HP per second
                        this.life += regen_amt;
                        if (this.life > this.life0) this.life = this.life0; // Cap at Max HP
                        
                        // Small visual green floating text to show the healing
                        if (TD.iframe % 2 === 0) { // Throttle visual slightly to prevent clutter
                            new TD.FloatingText("regen-" + TD.lang.rndStr(), { cx: this.cx + (Math.random()*10-5), cy: this.cy - 15, text: "+" + regen_amt, color: "#00ff00", map: this.map, size: 10, life: 16 });
                        }
                    }
                }

                if (typeof this.stealth_alpha === 'undefined') this.stealth_alpha = 0.0;
                
                if (this.reveal_timer > 0) {

                    this.reveal_timer--;
                    if (this.reveal_timer <= 0) this.is_revealed = false;
                }

                if (this.is_poisoned) {
                    this.poison_timer--;
                    if (this.poison_timer <= 0) this.is_poisoned = false;
                    
                    // Tick Damage every half second (12 frames)
                    if (this.poison_timer % 12 === 0) {
                        var pDmg = this.poison_damage || 5;
                        this.life -= pDmg;
                        new TD.FloatingText("pdmg-" + TD.lang.rndStr(), { cx: this.cx + (Math.random()*10-5), cy: this.cy - 10, text: "-" + pDmg, color: "#ff8800", map: this.map, size: 10, life: 12 });
                        if (this.life <= 0) this.beKilled({ killed: 0, gainXp: function(){} });
                    }
                }
                
                // Smooth Fading Math for Stealth/Burrowing
                if (this.is_revealed || (!this.is_stealthed && !this.is_burrowing)) {
                    this.stealth_alpha += 0.05; // Fade In
                    if (this.stealth_alpha > 1.0) this.stealth_alpha = 1.0;
                } else {
                    this.stealth_alpha -= 0.05; // Fade Out
                    if (this.stealth_alpha < 0.0) this.stealth_alpha = 0.0;
                }

                if (this.slow_timer > 0) {
                    this.slow_timer--;
                    if (this.slow_timer <= 0) this.is_slowed = false;
                }


                // MOLE RAT: State Machine (Burrowing vs Running)
                if (typeof this.dig_timer === 'undefined') this.dig_timer = 0;
                if (this.dig_timer > 0) this.dig_timer--;

                if (this.name === "Mole Rat") {
                    this.state_timer--;
                    if (this.state_timer <= 0) {
                        this.is_burrowing = !this.is_burrowing;
                        this.dig_timer = TD.exp_fps * 1.0; 
                        if (this.is_burrowing) {
                            this.is_stealthed = true;
                            this.is_revealed = false; 
                            this.state_timer = TD.exp_fps * (4 + Math.random() * 2); 
                        } else {
                            this.is_stealthed = false;
                            this.state_timer = TD.exp_fps * (6 + Math.random() * 2); 
                        }
                    }
                }
                
                // --- NEW: Process Environmental Auras & Tactical Intel ---
                var aura_slow_mult = 1.0;
                this.is_hp_visible = false;
                // Global Intel Check
                if (typeof TD !== 'undefined' && TD.perks && (TD.perks.P || TD.perks.I)) this.is_hp_visible = true;

                if (this.map && this.map.buildings) {
                    TD.lang.each(this.map.buildings, function(b) {
                        if (b.is_valid) {
                            var dist2 = Math.pow(b.cx - _this.cx, 2) + Math.pow(b.cy - _this.cy, 2);
                            if (dist2 <= Math.pow(b.range_px, 2)) {
                                if (b.is_detector) _this.is_hp_visible = true; // Local Intel Check!
                                if (b.aura_slow) aura_slow_mult = Math.min(aura_slow_mult, b.aura_slow); 
                                if (b.aura_dot && TD.iframe % 30 === 0) {
                                    _this.beHit(b, b.aura_dot); 
                                }
                            }
                        }
                    });
                }



                // Base speed calculation
                var current_speed = this.speed * TD.global_speed;
                
                // Speed Modifiers
                if (this.dig_timer > 0) {
                    current_speed = 0; // Frozen completely while digging up/down
                } else {
                    current_speed *= aura_slow_mult; // Apply Radar Jammer Slow
                    if (this.is_slowed) current_speed *= 0.50; // 50% Penalty from Cryo towers
                    // --- CHANGED: Mole rats now move at 45% speed while burrowed ---
                    if (this.name === "Mole Rat" && this.is_burrowing) current_speed *= 0.45; 
                    if (is_bumping) current_speed *= 1.30; // 30% speed boost if squeezing past someone
                }


                if (distToTarget <= current_speed) {
                    this.cx = target_cx; 
                    this.cy = target_cy; 
                    this.arrive(); 
                } else {

                    this.cx += (dpx / distToTarget) * current_speed;
                    this.cy += (dpy / distToTarget) * current_speed;
                }

			this.caculatePos();
		},
		onEnter: function () {
			var balloontip = this.scene.panel.balloontip;
			if (balloontip.el == this) { balloontip.hide(); balloontip.el = null; } 
            else { 
                if (this.is_hp_visible) {
                    var tags = [];
                    if (this.is_flying) tags.push("[FLYING]");
                    if (this.is_stealthed) tags.push("[STEALTH]");
                    if (this.speed >= 15) tags.push("[FAST]");
                    if (this.life0 >= 500) tags.push("[VERY STRONG]");
                    if (this.life0 >= 2000) tags.push("[BOSS]");
                    
                    var tagStr = tags.length > 0 ? "\n" + tags.join(" ") : "";
                    var msg = this.name.toUpperCase() + "\nHP: " + this.life + " / " + this.life0 + tagStr;
                    balloontip.msg(msg, this); 
                } else {
                    // No Intel: Just show the generic name
                    balloontip.msg(this.name.toUpperCase(), this);
                }
            }
		},

		onOut: function () { 

            // FIXED: Tell the global UI to hide the balloon when mouse leaves
            if (this.scene.panel.balloontip.el === this) {
                this.scene.panel.balloontip.hide();
                this.scene.panel.balloontip.el = null;
            }
        }
	};

	TD.Monster = function (id, cfg) { cfg.on_events = ["enter", "out"]; var monster = new TD.Element(id, cfg); TD.lang.mix(monster, monster_obj); monster._init(cfg); return monster; };

});
