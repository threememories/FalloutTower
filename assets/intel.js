window.IntelData = {
    factions: {
        // ==============================================================================
        // NEW CALIFORNIA REPUBLIC (NCR)
        // ==============================================================================
        "NCR": {
            intercept: [
                "RECON ACTUAL: {T} HAS EYES ON {E}. ENGAGING.",
                "{T} REPORTING: HOSTILE {E} SPOTTED IN SECTOR. OPENING FIRE.",
                "FIRST RECON COMMAND: {T} IS PUTTING ROUNDS ON {E}.",
                "DISPATCH: {T} ENGAGING {E}. HOLD THE LINE, TROOPERS.",
                "NCR COMMS: {T} HAS ACQUIRED {E}. WE WILL NOT YIELD."
            ],
            kill: [
                "CONFIRMED KILL ON {E}. GOOD SHOOTING, RANGER.",
                "TARGET {E} DOWN. KEEP YOUR WEAPONS HOT.",
                "HOSTILE {E} ELIMINATED. MARK IT FOR SALVAGE.",
                "{E} NEUTRALIZED. FOR THE REPUBLIC!",
                "THREAT {E} SECURED. SCRATCH ONE PROFLIGATE."
            ],
            target_change: [
                "{T} RELOADING. COVERING FIRE REQUESTED.",
                "CONTROL, {T} IS SHIFTING FIRE TO NEW TARGET.",
                "{T} CHECKING AMMO. REACQUIRING SIGHTS.",
                "{T} ADJUSTING AZIMUTH. STAND BY."
            ],
            multikill: [
                "HEAVY ORDNANCE CONFIRMED. MUTANT GROUP DECIMATED.",
                "SPLASH DAMAGE SECURED. MULTIPLE CASUALTIES IN SWARM.",
                "ARTILLERY STRIKE EFFECTIVE. SECTOR CLEARED.",
                "THAT'S HOW THE NCR DOES IT! MULTI-KILL CONFIRMED."
            ],
            threat_flying: [
                "WARNING: AIRBORNE BOGEY DETECTED. ANTI-AIR STANDBY.",
                "NCR COMMS: EYES TO THE SKY! FLYING {E} INBOUND.",
                "RADAR SPIKE: AERIAL {E} APPROACHING THE PERIMETER."
            ],
            threat_stealth: [
                "RECON SENSORS DETECT CLOAKED {E}. CHECK YOUR CORNERS.",
                "STEALTH UNIT REVEALED. NIGHTKIN TACTICS SUSPECTED.",
                "WARNING: ACTIVE CAMO DETECTED ON {E}."
            ],
            threat_swarm: [
                "CONTROL, WE HAVE A MASSIVE SWARM INBOUND. PREPARE THE LINE.",
                "HUNDREDS OF SIGNATURES. IT'S A FULL ASSAULT.",
                "THEY ARE RUSHING US! HOLD THE BARRICADES!"
            ],
            path_progress: [
                "SITREP: HOSTILES HAVE PUSHED PAST THE {P} MARK.",
                "WARNING: {E} HAS BREACHED {P} OF THE PERIMETER.",
                "FALL BACK TO SECONDARY TRENCHES! THEY ARE AT {P}!"
            ],
            base_damage: [
                "DEFENSES BREACHED! WE ARE TAKING HEAVY CASUALTIES!",
                "NCR OUTPOST IS UNDER DIRECT FIRE! NEED REINFORCEMENTS!",
                "MEDIC! WE'RE TAKING HITS AT THE MAIN GATE!"
            ],
            tower_upgrade: [
                "SUPPLY RUN COMPLETE. {T} UPGRADED AND OPERATIONAL.",
                "{T} LOGISTICS REQUEST APPROVED. TECH INSTALLED.",
                "NCR QUARTERMASTER: NEW GEAR ISSUED TO {T}."
            ],
            tower_max: [
                "{T} IS FULLY KITTED OUT AND READY FOR WAR.",
                "VETERAN STATUS CONFIRMED FOR {T}.",
                "ALL APPROVED MODIFICATIONS APPLIED TO {T}."
            ],
            tower_unlock: [
                "NCR COMMAND: {T} REQUISITION HAS BEEN AUTHORIZED.",
                "LOGISTICS UPDATE: {T} SCHEMATICS UNLOCKED."
            ],
            wave_start: [
                "SITREP: SENSORS PICKING UP {M} IN {L}.",
                "COMMAND, BE ADVISED: {M} APPROACHING FROM {L}.",
                "RECON REPORT: {M} SPOTTED NEAR {L}.",
                "BRACE THE LINE! {M} INBOUND AT {L}."
            ],
            flavor: [
                "PATROLLING THE MOJAVE ALMOST MAKES YOU WISH FOR A NUCLEAR WINTER.",
                "WE WON'T GO QUIETLY. THE LEGION CAN COUNT ON THAT.",
                "IF THEY BREAK THROUGH OUR DEFENSES, I'VE GOT ONE BULLET I'M SAVING JUST FOR ME.",
                "NOBODY'S LUCK LASTS FOREVER IN THIS WASTELAND. STAY SHARP.",
                "KEEP YOUR RIFLE CLEAN AND YOUR RADIO ON."
            ]
        },

        // ==============================================================================
        // BROTHERHOOD OF STEEL (BOS)
        // ==============================================================================
        "BOS": {
            intercept: [
                "PALADIN COMMAND: {T} HAS SIGHTED {E}. PURGING ABOMINATION.",
                "SCRIBE TELEMETRY ACTIVE. {T} ENGAGING {E}.",
                "{T} INITIATING COMBAT PROTOCOLS ON {E}.",
                "KNIGHTS, WE HAVE CONTACT. {T} FIRES ON {E}.",
                "AD VICTORIAM! {T} HAS ENGAGED {E}."
            ],
            kill: [
                "ABOMINATION {E} HAS BEEN PURGED.",
                "{E} TERMINATED. PRESERVING THE WASTELAND.",
                "SCRIBE LOG: TARGET {E} CONFIRMED DESTROYED.",
                "{T} HAS CLEANSED THE THREAT {E}.",
                "ONE LESS MUTANT SCUM. {E} IS DOWN."
            ],
            target_change: [
                "{T} COOLING LASER CAPACITORS. ACQUIRING NEXT ABOMINATION.",
                "{T} RECALIBRATING TARGETING MATRIX.",
                "ENERGY CELLS DEPLETED. {T} RELOADING.",
                "TACTICAL SHIFT CONFIRMED FOR {T}."
            ],
            multikill: [
                "EXPLOSIVE PURGE SUCCESSFUL. CLUSTER DESTROYED.",
                "MAXIMUM YIELD ACHIEVED. MULTIPLE TARGETS VAPORIZED.",
                "THE BROTHERHOOD CLEANSES ALL. SWARM ERADICATED.",
                "TACTICAL NUKE / PLASMA SPREAD EFFECTIVE. SECTOR CLEAR."
            ],
            threat_flying: [
                "PRYDWEN SENSORS: AIRBORNE {E} DETECTED.",
                "SKY-BOGEY INBOUND. AERIAL ABOMINATION {E} SPOTTED.",
                "ELEVATE YOUR FIRE, KNIGHTS! {E} IN THE CLOUDS!"
            ],
            threat_stealth: [
                "ENERGY SCANNERS REVEAL CLOAKED {E}.",
                "STEALTH ABOMINATION COMPROMISED. OPEN FIRE ON {E}.",
                "THEY CANNOT HIDE FROM OUR TECH. INVISIBLE THREAT REVEALED."
            ],
            threat_swarm: [
                "WARNING: UNACCEPTABLE CONCENTRATION OF ABOMINATIONS INBOUND.",
                "MASSIVE TARGET DENSITY. PREPARE HEAVY ORDINANCE.",
                "STAND FAST, BROTHERS! THE HORDE APPROACHES!"
            ],
            path_progress: [
                "PALADIN COMMAND: THE ABOMINATIONS HAVE BREACHED {P}.",
                "ALERT: {E} HAS CROSSED {P} THRESHOLD.",
                "THEY DEFILE OUR GROUNDS. THREAT AT {P}!"
            ],
            base_damage: [
                "WARNING: BROTHERHOOD FORTIFICATIONS COMPROMISED!",
                "WE ARE SUSTAINING CRITICAL STRUCTURAL DAMAGE!",
                "HOLD THE GATES, INITIATES! WE ARE TAKING HITS!"
            ],
            tower_upgrade: [
                "SCRIBE PROTOCOL: ADVANCED TECH INTEGRATED INTO {T}.",
                "{T} WEAPONS CALIBRATED AND ENHANCED.",
                "BROTHERHOOD TECH APPLIED. {T} UPGRADED."
            ],
            tower_max: [
                "{T} IS OPERATING AT ABSOLUTE MAXIMUM YIELD.",
                "ELITE PALADIN CONFIGURATION SECURED ON {T}.",
                "NO FURTHER UPGRADES POSSIBLE. {T} IS PERFECTED."
            ],
            tower_unlock: [
                "ELDER MAXSON AUTHORIZES DEPLOYMENT OF {T}.",
                "SCRIBES HAVE RESTORED {T} SCHEMATICS FOR FIELD USE."
            ],
            wave_start: [
                "SCRIBES HAVE TRACKED {M} APPROACHING {L}.",
                "PALADINS, BE ADVISED: {M} DETECTED NEAR {L}.",
                "PURGE PROTOCOLS ENGAGED. {M} IN SIGHT AT {L}.",
                "ABOMINATIONS INBOUND: {M} GATHERING BY {L}."
            ],
            flavor: [
                "AD VICTORIAM, BROTHERS.",
                "ONLY THROUGH TECHNOLOGY CAN WE SAVE THIS WORLD FROM ITSELF.",
                "CIVILIANS SHOULD STAND ASIDE. THIS IS BROTHERHOOD BUSINESS.",
                "CLEANSE THE COMMONWEALTH OF THE MUTANT, THE GHOUL, AND THE SYNTH.",
                "CHECK YOUR POWER ARMOR SEALS. COMBAT IMMINENT."
            ]
        },

        // ==============================================================================
        // MINUTEMEN
        // ==============================================================================
        "MINUTEMEN": {
            intercept: [
                "GENERAL, {T} SPOTTED A {E}. WE'RE TAKING THE SHOT.",
                "MILITIA ALERT: {T} IS FIRING ON {E}.",
                "WE GOT COMPANY! {T} ENGAGING {E}.",
                "MINUTEMEN HOLDING THE LINE. {T} AIMING AT {E}.",
                "PROTECT THE SETTLEMENT! {T} TARGETING {E}."
            ],
            kill: [
                "{E} IS DOWN. GOOD JOB, MILITIA.",
                "TARGET {E} STOPPED DEAD. KEEP IT UP!",
                "THAT'S ONE LESS MONSTER FOR THE COMMONWEALTH. {E} KILLED.",
                "WE GOT 'EM! {E} ELIMINATED.",
                "GENERAL, {E} THREAT HAS BEEN HANDLED."
            ],
            target_change: [
                "{T} CRANKING MUSKETS. STAND BY.",
                "{T} SWITCHING TARGETS. DON'T LET THEM THROUGH!",
                "{T} RELOADING. GIVE 'EM SOME COVER!",
                "FIND A NEW MARK! {T} RE-AIMING."
            ],
            multikill: [
                "ARTILLERY HIT DEAD CENTER! MULTIPLE TARGETS GONE!",
                "BIG EXPLOSION ON THE FIELD! HORDE DECIMATED!",
                "THAT'LL LEAVE A CRATER! SWARM NEUTRALIZED.",
                "CASTLE BOMBARDMENT SUCCESSFUL. AREA CLEAR."
            ],
            threat_flying: [
                "GENERAL! LOOK UP! {E} COMING IN FROM THE SKY!",
                "FLYING BEASTS SPOTTED! BRING THAT {E} DOWN!",
                "AERIAL THREAT! {E} INBOUND!"
            ],
            threat_stealth: [
                "WATCH THE SHADOWS! CLOAKED {E} DETECTED!",
                "SOMETHING'S OUT THERE... IT'S A {E}! OPEN FIRE!",
                "INVISIBLE FREAKS! LIGHT 'EM UP!"
            ],
            threat_swarm: [
                "GENERAL, WE HAVE A MASSIVE SWARM COMING RIGHT AT US!",
                "IT'S A WHOLE HORDE! EVERYONE TO THE WALLS!",
                "THERE'S TOO MANY OF THEM! HOLD THE LINE!"
            ],
            path_progress: [
                "GENERAL! THEY'VE MADE IT PAST {P} OF THE DEFENSES!",
                "THEY'RE PUSHING DEEP! {E} AT THE {P} MARK!",
                "WE'RE LOSING GROUND! THREAT AT {P}!"
            ],
            base_damage: [
                "GENERAL! THE SETTLEMENT IS UNDER ATTACK!",
                "THE WALLS ARE GIVING WAY! WE NEED HELP!",
                "WE'RE TAKING HEAVY DAMAGE! FALL BACK TO THE KEEPS!"
            ],
            tower_upgrade: [
                "SETTLERS DELIVERED NEW PARTS. {T} UPGRADED.",
                "CRANK IT UP! {T} JUST GOT STRONGER.",
                "MILITIA GEAR IMPROVED FOR {T}."
            ],
            tower_max: [
                "{T} IS AS GOOD AS IT GETS, GENERAL.",
                "MAXIMUM FIREPOWER ACHIEVED FOR {T}.",
                "THE CASTLE'S BEST TECH IS NOW ON {T}."
            ],
            tower_unlock: [
                "RADIO FREEDOM REPORTS NEW VOLUNTEERS. {T} AVAILABLE.",
                "GENERAL, WE CAN NOW BUILD {T}."
            ],
            wave_start: [
                "GENERAL, WE HAVE {M} COMING FROM {L}!",
                "MILITIA ALERT: {M} SPOTTED BY {L}.",
                "SETTLEMENT UNDER THREAT! {M} MASSING AT {L}.",
                "DEFEND THE WALLS! {M} CROSSING {L}."
            ],
            flavor: [
                "ANOTHER SETTLEMENT NEEDS YOUR HELP. I'LL MARK IT ON YOUR MAP.",
                "AT A MINUTE'S NOTICE, WE'LL BE THERE.",
                "WE STAND TOGETHER OR WE FALL APART. THAT'S WHAT IT MEANS TO BE MINUTEMEN.",
                "HOPE YOU BROUGHT ENOUGH CRANKS FOR THAT MUSKET.",
                "FOR THE COMMONWEALTH!"
            ]
        },

        // ==============================================================================
        // RAIDERS
        // ==============================================================================
        "RAIDERS": {
            intercept: [
                "OVERBOSS, {T} IS LIGHTIN' UP THAT {E}!",
                "LOOK AT THAT {E} BLEED! {T} IS BLASTIN'!",
                "FRESH MEAT! {T} SHOOTING AT {E}!",
                "{T} SEES A {E}! KILL IT! KILL IT NOW!",
                "GET THE SCRAP! {T} IS FIRING ON {E}!"
            ],
            kill: [
                "HAHA! {E} IS DEAD! STRIP IT FOR PARTS!",
                "ANOTHER ONE BITES THE DUST! {E} GANKED!",
                "{E} IS GIBBED! THAT WAS AWESOME!",
                "BLOOD EVERYWHERE! {E} DESTROYED!",
                "THAT {E} IS MINE! DON'T TOUCH THE LOOT!"
            ],
            target_change: [
                "{T} IS OUTTA BULLETS! SWAPPING MAGS!",
                "GIMME A SEC, {T} NEEDS MORE AMMO!",
                "WHO'S NEXT?! {T} FINDING A NEW VICTIM!",
                "{T} IS JAMMED! HOLD ON!"
            ],
            multikill: [
                "BOOM! HAHAHA! LOOK AT ALL THOSE PIECES!",
                "MASSIVE EXPLOSION! THEY'RE ALL DEAD!",
                "THAT WAS SICK! SHRAPNEL EVERYWHERE!",
                "I WANT ANOTHER EXPLOSION LIKE THAT!"
            ],
            threat_flying: [
                "IT'S A {E} IN THE SKY! SHOOT IT DOWN!",
                "FLYING SCRAP! GET THAT {E}!",
                "LOOK UP, IDIOTS! AIRBORNE {E}!"
            ],
            threat_stealth: [
                "I SAW IT BLINK! INVISIBLE {E} OVER THERE!",
                "SNEAKY COWARD REVEALED! KILL THE {E}!",
                "NIGHTKIN TRICKS! I SEE YOU, {E}!"
            ],
            threat_swarm: [
                "LOOK AT THE SIZE OF THAT HORDE! OPEN FIRE!",
                "SWARM! SWARM! GET THE BIG GUNS!",
                "THEY'RE SWARMING! THIS IS GONNA BE A BLOODBATH!"
            ],
            path_progress: [
                "OVERBOSS! THEY'RE PAST {P}! DO SOMETHING!",
                "HEY! {E} IS SNEAKING PAST! AT {P}!",
                "STOP THEM! THEY CROSSED {P}!"
            ],
            base_damage: [
                "AAAGH! WE'RE GETTING RIPPED APART!",
                "THE GATES ARE BUSTED! THEY'RE IN THE BASE!",
                "DEFEND THE STASH! WE'RE TAKING HITS!"
            ],
            tower_upgrade: [
                "DUCT TAPE AND RUST! {T} IS UPGRADED!",
                "SLAPPED SOME NEW SPIKES ON {T}!",
                "MORE DAKKA! {T} JUST GOT MEANER!"
            ],
            tower_max: [
                "THAT'S AS BIG AS {T} GETS! PURE DESTRUCTION!",
                "{T} IS MAXED OUT! READY TO SLAUGHTER!",
                "NOTHING CAN BEAT THIS {T} NOW!"
            ],
            tower_unlock: [
                "OVERBOSS, THE BOYS SCRAPPED TOGETHER A {T}!",
                "WE FINALLY FIXED THE {T}! READY TO BUILD!"
            ],
            wave_start: [
                "FRESH MEAT OVER BY {L}! LOOKS LIKE {M}!",
                "OVERBOSS, WE GOT {M} TRYING TO SNEAK THROUGH {L}!",
                "HAHAHA! {M} WANDERING INTO {L}! GET 'EM!",
                "LOAD YOUR GUNS! {M} AT {L}!"
            ],
            flavor: [
                "HIT THE PSYCHO! I WANT TO HEAR THEM SCREAM!",
                "I'M GONNA MAKE A NECKLACE OUT OF THEIR TEETH!",
                "THE PACK RULES THIS WASTELAND!",
                "GIMME THE JET! GIMME IT NOW!",
                "YIELD TO THE OVERBOSS OR DIE!"
            ]
        },

        // ==============================================================================
        // GENERAL / VAULT-TEC UI SYSTEMS (Used by all factions for system prompts)
        // ==============================================================================
        "GENERAL": {
            locations: [
                "THE NORTHERN RIDGE", "SECTOR 7G", "THE RUINED OVERPASS", 
                "THE CRATER", "THE EASTERN PERIMETER", "CHECKPOINT GAMMA", 
                "THE OLD SCRAPYARD", "THE MAIN ROAD"
            ],
            loot_drop: [

                "PIP-BOY ALERT: VALUABLE SALVAGE DETECTED ON FIELD.",
                "SYSTEM: UNKNOWN COMMODITY DROPPED. RETRIEVAL RECOMMENDED.",
                "VAULT-TEC SENSORS: CAPS OR SUPPLIES DETECTED."
            ],
            loot_lost: [
                "PIP-BOY ALERT: SALVAGE DEGRADED. ITEMS LOST.",
                "SYSTEM: FIELD SUPPLIES EXPIRED BEFORE RECOVERY.",
                "OVERSEER ALERT: STOP LEAVING GOOD SALVAGE IN THE DIRT."
            ],
            caps_hoarding: [
                "OVERSEER ADVISORY: HIGH CAP VOLUME DETECTED. SPEND TO SURVIVE.",
                "PIP-BOY: MASSIVE BANKROLL AVAILABLE. CONSTRUCT DEFENSES IMMEDIATELY.",
                "SYSTEM: CAPS EXCEED RECOMMENDATIONS. UPGRADE TOWERS NOW."
            ],
            vats_ready: [
                "V.A.T.S. CAPACITORS 100%. READY FOR MANUAL OVERRIDE.",
                "VAULT-TEC ASSISTED TARGETING SYSTEM FULLY CHARGED.",
                "V.A.T.S. OVERDRIVE AVAILABLE. AWAITING INPUT."
            ],
            vats_used: [
                "V.A.T.S. ENGAGED. TIME DILATION PROTOCOLS ACTIVE.",
                "MANUAL TARGETING OVERRIDE ACCEPTED. FIRING V.A.T.S.",
                "V.A.T.S. ONLINE. CALCULATING LETHAL TRAJECTORIES."
            ],
            consumable_used: [
                "INVENTORY: TACTICAL CONSUMABLE DEPLOYED ON FIELD.",
                "PIP-BOY: ITEM EXPENDED FROM CACHE.",
                "GEAR UTILIZED. WATCH THE BLAST ZONE."
            ],
            special_S: ["S.P.E.C.I.A.L.: STRENGTH OVERDRIVE. MAXIMIZING KINETIC DAMAGE."],
            special_P: ["S.P.E.C.I.A.L.: PERCEPTION OVERDRIVE. INFINITE SENSING RANGE."],
            special_E: ["S.P.E.C.I.A.L.: ENDURANCE OVERDRIVE. DAMAGE MITIGATION ACTIVE."],
            special_C: ["S.P.E.C.I.A.L.: CHARISMA OVERDRIVE. CALLING IN CARAVAN FUNDS."],
            special_I: ["S.P.E.C.I.A.L.: INTELLIGENCE OVERDRIVE. MASSIVE XP INJECTION TO TOWERS."],
            special_A: ["S.P.E.C.I.A.L.: AGILITY OVERDRIVE. FLUSHING ALL COOLDOWNS."],
            special_L: ["S.P.E.C.I.A.L.: LUCK OVERDRIVE. LUNCHBOX MIRACLE PROC TRIGGERED."],
            
            // --- NEW: TACTICAL ADVISORY & EARLY WARNINGS ---
            threat_flying_prep: [
                "LONG RANGE RADAR DETECTS AIRBORNE BOGEYS GATHERING. ETA: 1 WAVE.",
                "AERIAL MUTATIONS EXPECTED NEXT WAVE. PREPARE ANTI-AIR DEFENSES.",
                "WARNING: FLIGHT-CAPABLE HOSTILES DETECTED ON APPROACH VECTOR."
            ],
            threat_stealth_prep: [
                "THERMAL DISTURBANCES DETECTED. CLOAKED UNITS EXPECTED NEXT WAVE.",
                "WARNING: ACTIVE CAMOUFLAGE SIGNATURES SPOOFING RADAR. ETA: NEXT WAVE.",
                "PREPARE DETECTION NETWORKS. INVISIBLE THREATS INBOUND."
            ],
            threat_flying_now: [
                "AIRBORNE HOSTILES ON SCOPE! EYES TO THE SKIES!",
                "AERIAL ASSAULT HAS BEGUN. INTERCEPT PROTOCOLS ENGAGED.",
                "FLYERS IN THE PERIMETER. BRING THEM DOWN!"
            ],
            threat_stealth_now: [
                "CLOAKED UNITS ARE CROSSING THE LINE! SENSORS UP!",
                "INVISIBLE THREATS ON THE FIELD. SPOTTERS REQUIRED!",
                "STEALTH HOSTILES HAVE INFILTRATED THE SECTOR!"
            ],
            tactical_no_antiair: [
                "CRITICAL VULNERABILITY: INSUFFICIENT ANTI-AIR CAPABILITIES DETECTED.",
                "WARNING: CURRENT GRID LACKS WEAPONS RATED FOR FLYING TARGETS.",
                "OVERSEER ALERT: BUILD ANTI-AIR DEFENSES IMMEDIATELY OR WE WILL BE OVERRUN."
            ],
            tactical_no_detector: [
                "CRITICAL VULNERABILITY: NO DETECTION NETWORKS ACTIVE. STEALTH UNITS IMPERVIOUS.",
                "WARNING: CLOAKED UNITS ARE UNOPPOSED. BUILD RADAR OR DETECTORS NOW.",
                "OVERSEER ALERT: WE ARE BLIND TO STEALTH. DEPLOY SPOTTERS IMMEDIATELY."
            ],
            tactical_dead_zone: [
                "TACTICAL ALERT: HOSTILES TRAVERSING UNOPPOSED. DEFENSE GAP DETECTED.",
                "WARNING: ENEMY UNITS MOVING FREELY THROUGH BLIND SPOT.",
                "OVERSEER ALERT: DEAD ZONE BREACHED. ZERO SHOTS FIRED IN PAST 6 SECONDS."
            ]
        }
    },

    // ==========================================

    // DYNAMIC HOLIDAY MODIFIERS
    // ==========================================
    // Add your other holidays here following this exact structure!
    holiday_modifiers: {
        "Halloween": {
            e_flair: ["SPOOKY {E}", "UNDEAD {E}", "HEADLESS {E}", "TERRIFYING {E}", "MUTATED {E} WITH FANGS"],
            t_flair: ["HAUNTED {T}", "GHOSTLY {T}", "CURSED {T}", "PUMPKIN-DECORATED {T}", "BONE-PLATED {T}"],
            p_flair: ["A FRIGHTENING {P}", "A GHASTLY {P}", "A TERRIFYING {P}", "A BLOOD-CURDLING {P}", "A BONE-CHILLING {P}"],
            faction_append: {
                "NCR": " HAPPY HALLOWEEN, TROOPERS.",
                "BOS": " NO GHOST WILL STOP THE BROTHERHOOD.",
                "MINUTEMEN": " PROTECT THE CANDY CACHE!",
                "RAIDERS": " TRICK OR TREAT, DEAD MEAT!"
            }
        },
        "Christmas Day": {
            e_flair: ["FESTIVE {E}", "{E} WEARING A SANTA HAT", "SNOW-COVERED {E}", "FROSTY {E}", "JINGLE-BELL {E}"],
            t_flair: ["MERRY {T}", "CANDY-CANE {T}", "GIFT-WRAPPED {T}", "WINTERIZED {T}", "EGGNOG-FUELED {T}"],
            p_flair: ["A CHILLY {P}", "A JOLLY {P}", "A MERRY {P}", "A FREEZING {P}", "A FESTIVE {P}"],
            faction_append: {
                "NCR": " MERRY CHRISTMAS, RANGERS.",
                "BOS": " DELIVERING HOLIDAY CHEER VIA LASER.",
                "MINUTEMEN": " GENERAL SAYS MERRY CHRISTMAS.",
                "RAIDERS": " SANTA'S DEAD! WE GOT HIS STUFF!"
            }
        },
        "4th of July": {
            e_flair: ["REDCOAT {E}", "UNPATRIOTIC {E}", "COMMIE {E}", "TYRANNICAL {E}", "ANTI-FREEDOM {E}"],
            t_flair: ["PATRIOTIC {T}", "STAR-SPANGLED {T}", "INDEPENDENCE {T}", "LIBERTY {T}", "EAGLE-EYED {T}"],
            p_flair: ["A REVOLUTIONARY {P}", "A PATRIOTIC {P}", "A FREE {P}", "AN EXPLOSIVE {P}", "A LIBERATED {P}"],
            faction_append: {
                "NCR": " LET FREEDOM RING.",
                "BOS": " PURGING THE ENEMIES OF FREEDOM.",
                "MINUTEMEN": " JUST LIKE THE FOUNDING FATHERS INTENDED.",
                "RAIDERS": " MORE FIREWORKS! BLOW IT ALL UP!"
            }
        }
        // ... (You can add Valentines, MLK Day, Easter, etc. here using this exact format)
    },


    // Identifies if today is a holiday
    getCurrentHoliday: function() {
        var d = new Date();
        var m = d.getMonth() + 1; // 1-12
        var date = d.getDate(); // 1-31
        var day = d.getDay(); // 0-6 (Sun-Sat)
        var week = Math.ceil(date / 7);

        if (m === 1 && date === 1) return "New Years";
        if (m === 1 && day === 1 && week === 3) return "MLK Day";
        if (m === 2 && date === 14) return "Valentines";
        if (m === 3 && date === 17) return "St Patricks";
        if (m === 4 && date <= 10) return "Easter"; // Easter shifts, so we cover early April
        if (m === 5 && day === 0 && week === 2) return "Mothers Day";
        if (m === 5 && day === 1 && date > 24) return "Memorial Day";
        if (m === 6 && date === 19) return "Juneteenth";
        if (m === 6 && day === 0 && week === 3) return "Fathers Day";
        if (m === 7 && date === 4) return "4th of July";
        if (m === 9 && day === 1 && week === 1) return "Labor Day";
        if (m === 10 && day === 1 && week === 2) return "Columbus Day";
        if (m === 10 && date === 23) return "The Great War";
        if (m === 10 && date === 31) return "Halloween";
        if (m === 11 && date === 11) return "Veterans Day";
        if (m === 11 && day === 4 && week === 4) return "Thanksgiving";
        if (m === 12 && date === 24) return "Christmas Eve";
        if (m === 12 && date === 25) return "Christmas Day";
        
        return null;
    },

    // ==========================================
    // GENERATOR FUNCTIONS
    // ==========================================
    // Called for specific events
    getEvent: function(category, faction, towerName, enemyName, percent) {
        var arr = null;
        if (faction && this.factions[faction] && this.factions[faction][category]) {
            arr = this.factions[faction][category];
        } else if (this.factions["GENERAL"][category]) {
            arr = this.factions["GENERAL"][category];
        }

        if (!arr || arr.length === 0) return "";
        var sentence = arr[Math.floor(Math.random() * arr.length)];
        
        var holiday = this.getCurrentHoliday();
        var suffix = "";

        // Apply Holiday Flair (50% chance to modify words, 30% chance to append battle-cry)
        if (holiday && this.holiday_modifiers && this.holiday_modifiers[holiday]) {
            var mods = this.holiday_modifiers[holiday];
            
            if (enemyName && mods.e_flair && Math.random() > 0.5) {
                enemyName = mods.e_flair[Math.floor(Math.random() * mods.e_flair.length)].replace("{E}", enemyName);
            }
            if (towerName && mods.t_flair && Math.random() > 0.5) {
                towerName = mods.t_flair[Math.floor(Math.random() * mods.t_flair.length)].replace("{T}", towerName);
            }
            if (percent && mods.p_flair && Math.random() > 0.5) {
                percent = mods.p_flair[Math.floor(Math.random() * mods.p_flair.length)].replace("{P}", percent + "%");
            } else if (percent) {
                percent = percent + "%";
            }
            if (faction && mods.faction_append && mods.faction_append[faction] && Math.random() > 0.7) {
                suffix = mods.faction_append[faction];
            }
        } else {
            if (percent) percent = percent + "%"; // Standard formatting if no holiday
        }
        
        // Final string replacement
        if (towerName) sentence = sentence.replace(/{T}/g, towerName.toUpperCase());
        if (enemyName) sentence = sentence.replace(/{E}/g, enemyName.toUpperCase());
        if (percent) sentence = sentence.replace(/{P}/g, percent.toUpperCase());
        
        // NEW: Location and Monster List tags
        if (sentence.indexOf("{L}") !== -1) {
            var locs = this.factions["GENERAL"].locations;
            sentence = sentence.replace(/{L}/g, locs[Math.floor(Math.random() * locs.length)]);
        }
        // If a monster string wasn't provided but is needed, leave it blank (the engine will inject it later)
        
        return sentence + suffix;
    },


    // Background random chatter (Pulls strictly from the currently active faction's flavor array)
    generateChatter: function(faction) {
        if (!faction || !this.factions[faction] || !this.factions[faction].flavor) faction = "NCR"; // Failsafe
        var arr = this.factions[faction].flavor;
        return arr[Math.floor(Math.random() * arr.length)].toUpperCase();
    }
};
