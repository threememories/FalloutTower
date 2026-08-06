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
			{ name: "Radroach", desc: "Weak, fast-ish pest", speed: 3, max_speed: 10, life: 50, damage: 1, shield: 0, money: 5 },
			{ name: "Feral Ghoul", desc: "Mindless irradiated human", speed: 6, max_speed: 20, life: 50, damage: 2, shield: 1 },
			{ name: "Mole Rat", desc: "Fast underground creature", speed: 12, max_speed: 30, life: 50, damage: 3, shield: 1 },
			{ name: "Super Mutant", desc: "Large, mutated brute", speed: 5, max_speed: 10, life: 500, damage: 3, shield: 1 },
			{ name: "Protectron", desc: "Armored security bot", speed: 5, max_speed: 10, life: 50, damage: 3, shield: 20 },
			{ name: "Glowing One", desc: "Highly irradiated, deals massive base damage", speed: 7, max_speed: 14, life: 50, damage: 10, shield: 2 },
			{ name: "Deathclaw", desc: "Extremely fast, tough apex predator", speed: 15, max_speed: 30, life: 1200, damage: 15, shield: 5 },
			{ name: "Sentry Bot", desc: "Heavily armored military robot", speed: 3, max_speed: 10, life: 300, damage: 5, shield: 15 },
            
            // --- NEW: PHASED MONSTERS ---
			{ name: "Cazador", is_flying: true, desc: "Lightning fast flying wasp", speed: 15, max_speed: 25, life: 40, damage: 4, shield: 1, color: "#dd9900" },
            { name: "Stingwing", is_flying: true, desc: "Agile flying pest", speed: 12, max_speed: 20, life: 25, damage: 2, shield: 0, color: "#88cc33" },
            { name: "Scorchbeast", is_flying: true, desc: "Massive flying terror", speed: 4, max_speed: 10, life: 2500, damage: 30, shield: 5, color: "#551111" },
            { name: "Nightkin", is_stealthed: true, desc: "Tough, stealthed mutant", speed: 8, max_speed: 15, life: 800, damage: 8, shield: 2, color: "#330066" },
            
            // --- NEW: PRE-MUTATED LEGENDARIES ---
            { name: "Legendary Ghoul", is_mutated: true, desc: "Glowing, hyper-fast ghoul", speed: 8, max_speed: 25, life: 75, damage: 4, shield: 2 },
            { name: "Legendary Mutant", is_mutated: true, desc: "Enraged giant brute", speed: 6, max_speed: 15, life: 750, damage: 6, shield: 2 },
            { name: "Legendary Deathclaw", is_mutated: true, desc: "Unstoppable apex predator", speed: 19, max_speed: 35, life: 1800, damage: 25, shield: 8 },
            { name: "Legendary Nightkin", is_mutated: true, is_stealthed: true, desc: "Invisible enraged assassin", speed: 10, max_speed: 20, life: 1200, damage: 15, shield: 3, color: "#330066" }
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
			[[3, 0]], // Wave 1: 3 Roaches
			[[5, 0]], // Wave 2: 5 Roaches
			[[4, 0], [1, 1]], // Wave 3: 4 Roaches, 1 Ghoul
			[[4, 0], [3, 1]], // Wave 4: 4 Roaches, 3 Ghouls
			[[1, 0], [5, 1]], // Wave 5: 1 Roach, 5 Ghouls
			[[2, 0], [2, 1], [1, 3]], // Wave 6: 2 Roaches, 2 Ghouls, 1 Mutant
			[[3, 0], [3, 1], [2, 3]], // Wave 7: 3 Roaches, 3 Ghouls, 2 Mutants
			[[2, 1], [3, 3]], // Wave 8: 2 Ghouls, 3 Mutants
			[[4, 3]], // Wave 9: 4 Mutants
			[[10, 1]]  // Wave 10: 10 Ghouls (The Swarm)
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
            var baseline_threat = (total_dps * 0.15) + (wave_idx * 3) + 15; 
            var budget = baseline_threat * difficulty; 
            
            var minimum_budget = wave_idx * 4;
            var maximum_budget = 30 + (wave_idx * 10); 
            
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
            // Types: 0=Swarm, 1=Tank, 2=Flyer, 3=Stealth, 4=Boss
			var bestiary = [
				[0, 2, 0, 99, 5], [1, 3, 0, 99, 5], [2, 4, 0, 99, 5],              // Swarms (Cheap, unlimited, max 5)
				[4, 8, 1, 99, 3], [3, 12, 1, 99, 3], [5, 15, 1, 99, 2], [7, 25, 1, 99, 2], // Tanks (Slightly restricted)
				[9, 5, 2, 99, 3], [8, 6, 2, 99, 3],                               // Flyers (Max 3 per cluster)
				[11, 20, 3, 5, 1],                                                // Stealth (Max 5 total, 1 at a time)
				[6, 40, 4, 1, 1], [10, 60, 4, 1, 1]                               // Bosses (Max 1 total, 1 at a time)
			];

			// 4. TELEGRAPHED SCHEDULE & RESTRICTIONS
			var allowed = bestiary.filter(function(m) {
				if (m[2] === 4 && (wave_idx < 18 || force_breather)) return false; 
				if (m[2] === 3 && (wave_idx < 14 || force_breather)) return false; 
				if (m[2] === 2 && (wave_idx < 11)) return false; 
				return true;
			});
            
			// 5. ASSEMBLE WAVE
			var wave_composition = [];
            var spawn_counts = { 3: 0, 4: 0 }; 
            
            // --- NEW: STRICT UNIT CAP TO PREVENT BLOBS ---
            // HORDE MODE: Gentle growth until Wave 40, then explosive swarm growth
            var max_units_this_wave = 10 + Math.floor(wave_idx * 0.5); 
            if (wave_idx > 40) {
                max_units_this_wave += (wave_idx - 40) * 2; // AI swarm limit unleashes
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
			cfg = cfg || {}; this.is_monster = true; this.idx = cfg.idx || 1; this.difficulty = cfg.difficulty || 1.0;
			var attr = TD.getDefaultMonsterAttributes(this.idx);
			this.name = attr.name || "Unknown"; // NEW: Store the name so VATS tooltip can read it without crashing
			this.is_flying = !!attr.is_flying;
            this.is_stealthed = !!attr.is_stealthed;
            this.is_mutated = !!attr.is_mutated; // NEW: Apply mutation flag on spawn
			this.speed = Math.floor((attr.speed + this.difficulty / 2) * (Math.random() * 0.5 + 0.75));
			if (this.speed < 1) this.speed = 1; if (this.speed > cfg.max_speed) this.speed = cfg.max_speed;
            // Universally increased HP modifier (changed from 0.5 to 1.5 for a massive 300% boost)
			this.life = this.life0 = Math.floor(attr.life * (this.difficulty + 1) * (Math.random() + 0.5) * 1.5);
			if (this.life < 1) this.life = this.life0 = 1;
			this.shield = Math.floor(attr.shield + this.difficulty / 2); if (this.shield < 0) this.shield = 0;
			this.damage = Math.floor((attr.damage || 1) * (Math.random() * 0.5 + 0.75)); if (this.damage < 1) this.damage = 1;
			this.money = attr.money || Math.floor(Math.sqrt((this.speed + this.life) * (this.shield + 1) * this.damage)); if (this.money < 1) this.money = 1;
			this.color = attr.color || TD.lang.rndRGB(); this.r = Math.floor(this.damage * 3.6) * _TD.retina;
			if (this.r < (12 * _TD.retina)) this.r = 12 * _TD.retina; if (this.r > TD.grid_size - (4 * _TD.retina)) this.r = TD.grid_size - (4 * _TD.retina);
			this.render = attr.render; this.grid = null; this.map = null; this.next_grid = null; this.way = []; this.toward = 2; this._dx = 0; this._dy = 0; this.is_blocked = false;
            
            // NEW: Initial random lane assignments & Preferred drift target
            this.offset_x = (Math.random() * (TD.grid_size * 0.6)) - (TD.grid_size * 0.3);
            this.offset_y = (Math.random() * (TD.grid_size * 0.6)) - (TD.grid_size * 0.3);
            this.preferred_offset_x = this.offset_x;
            this.preferred_offset_y = this.offset_y;
            
            // MOLE RAT: Initial burrow state
            if (this.name === "Mole Rat") {
                this.is_burrowing = true;
                this.is_stealthed = true;
                this.state_timer = TD.exp_fps * (4 + Math.random() * 2); // 4-6 seconds initially
            }

            // ENDLESS SCALING: +2% HP every 2 waves, +0.6% Speed every 3 waves (Caps at Wave 40)
            var current_wave = (TD.stage && TD.stage.current_act && TD.stage.current_act.current_scene) ? TD.stage.current_act.current_scene.wave : 1;
            if (current_wave > 10) {
                var past_10 = current_wave - 10;
                var stat_waves = Math.min(past_10, 30); // Locks scaling at 30 waves past 10 (Wave 40)

                var hp_mult = 1.0 + (Math.floor(stat_waves / 2) * 0.02);
                var spd_mult = 1.0 + (Math.floor(stat_waves / 3) * 0.006);

                this.life0 = Math.floor(this.life0 * hp_mult);
                this.life = this.life0;
                this.speed = this.speed * spd_mult;
            }
		},


		caculatePos: function () { var r = this.r; this.x = this.cx - r; this.y = this.cy - r; this.x2 = this.cx + r; this.y2 = this.cy + r; },
		beHit: function (building, damage) {
			if (!this.is_valid) return;
            
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

            
            // --- NEW: Award XP just for hitting the target (2 to 5 XP) ---
            if (building && building.gainXp) {

                var hitXp = Math.floor(Math.random() * 4) + 2; 
                building.gainXp(hitXp);
            }


			// NEW: Scatter and Throttle (Only show text every 3 frames per monster)
			if (!this._last_dmg_frame || TD.iframe - this._last_dmg_frame > 3) {

				this._last_dmg_frame = TD.iframe;
				var offsetX = (Math.random() * 24) - 12; // Scatters horizontally
				var offsetY = (Math.random() * 10) - 5;  // Scatters slightly vertically
				
				new TD.FloatingText("dmg-" + TD.lang.rndStr(), {
					cx: this.cx + offsetX, cy: (this.cy - 10) + offsetY, text: "-" + damage, color: "#ff5555", map: this.map, size: 10, life: 16
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
                if (typeof TD !== 'undefined' && TD.is_tutorial_active && this.scene && this.scene.wave === 2 && !this.scene._tutDropW2) {
                    forceLoot = "lunchbox"; this.scene._tutDropW2 = true;
                } else if (this.scene && this.scene.wave === 3 && !this.scene._dropW3) {
                    forceLoot = "money"; this.scene._dropW3 = true;
                } else if (this.scene && this.scene.wave === 7 && !this.scene._dropW7) {
                    forceLoot = "stimpak"; this.scene._dropW7 = true;
                } else if (this.scene && this.scene.wave === 15 && !this.scene._dropW15) {
                    forceLoot = "stimpak"; this.scene._dropW15 = true;
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
                    balloontip.text = this.name.toUpperCase() + "\nHP: " + this.life + " / " + this.life0 + tagStr; 
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
            
            var final_bounty = this.money + wave_bonus;
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
                    TD.base_health -= (final_damage * 10);
                    if (TD.base_health <= 0) { TD.base_health = 0; TD.stage.gameover(); } else { this.pause(); this.del(); took_damage = true; is_critical = (TD.base_health <= 300); }
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
                
                // Wider clamping (50%) so they don't clip entirely off the tile
                var maxOff = TD.grid_size * 0.5;
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
                if (this.way && this.map && this.map.entrance && this.map.exit && window.IntelData && TD.Announcer) {
                    // Estimate total path length (just once)
                    if (!this._total_path_len) this._total_path_len = this.way.length + 1;
                    
                    var percentTraveled = 100 - Math.floor((this.way.length / this._total_path_len) * 100);
                    
                    // Trigger warnings at 50% and 75% marks
                    if (percentTraveled >= 50 && !this._warned_50) {
                        this._warned_50 = true;
                        // Only 10% chance to warn for generic mobs to prevent spam, 100% chance for Bosses
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

                // --- STATUS EFFECT TIMERS ---

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
