window.ChatterDB = {
    // Timing calculation: 1 second per word + 2 seconds flat
    getDisplayTime: function(text) {
        if (!text) return 0;
        var wordCount = text.trim().split(/\s+/).length;
        return wordCount * 1.0 + 2.0; // Returns time in seconds
    },

    getCurrentHoliday: function() {
        var d = new Date();
        var m = d.getMonth() + 1; // 1-12
        var date = d.getDate(); // 1-31
        var day = d.getDay(); // 0-6 (Sun-Sat)
        var week = Math.ceil(date / 7);

        if (m === 1 && date === 1) return "NewYear";
        if (m === 2 && date === 14) return "Valentines";
        if (m === 3 && date === 17) return "StPatricks";
        if (m === 4 && date === 1) return "AprilFools";
        if (m === 5 && date === 4) return "MayThe4th";
        if (m === 7 && date === 4) return "IndependenceDay";
        if (m === 8 && date === 23) return "Birthday";
        if (m === 10 && date === 23) return "BombsDrop";
        if (m === 10 && date === 31) return "Halloween";
        if (m === 11 && date === 11) return "VeteransDay";
        if (m === 11 && day === 4 && week === 4) return "Thanksgiving";
        if (m === 12 && date === 25) return "Christmas";
        if (m === 12 && date === 31) return "NewYearsEve";
        
        return null;
    },

    getFormattedTime: function() {
        var d = new Date();
        var hours = d.getHours(); // 0-23
        var minutes = d.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return "It's " + strTime + ".";
    },

    getTimeReaction: function() {
        var d = new Date();
        var h = d.getHours(); // 0-23

        if (h >= 23 || h < 4) return ["Past my bedtime.", "Ugh, it's late.", "Shouldn't we be asleep?"];
        if (h >= 4 && h < 7) return ["Ugh, it's too early.", "The sun's not even up...", "Rise and shine... I guess."];
        if (h >= 7 && h < 11) return ["Morning. Got any coffee?", "Alright, let's get to work.", "Still plenty of daylight left."];
        if (h >= 11 && h < 14) return ["Almost lunchtime.", "Is that my stomach or a radroach?", "Time flies when you're getting shot at."];
        if (h >= 14 && h < 18) return ["Long day.", "Sun's getting low.", "Hope we get relieved soon."];
        if (h >= 18 && h < 23) return ["Night shift again.", "Getting dark out.", "The freaks come out at night."];
        
        return ["Time to kill something.", "Same time as it was a minute ago.", "Time is a flat circle."]; // Fallback
    },

    factions: {
        "NCR": {
            // SINGLE CHATTER
            idle_solo: [
                "Patrolling this sector almost makes you wish for a nuclear winter.", 
                "Quiet out here.", 
                "Wish I had a Nuka-Cola.", 
                "Stay frosty, Troopers.", 
                "Dust is getting in my rifle.",
                "If I have to eat one more Cram ration, I'm going AWOL.",
                "I lost 50 caps at Caravan last night. Don't ask.",
                "My boots are full of sand. Again.",
                "Anyone else smell radscorpion? Just me?",
                "Taxes, regulations, and giant bugs. The NCR dream.",
                "I hear New Vegas is nice this time of year.",
                "When's my shift over? My feet are killing me.",
                "We won't go quietly, the Legion can count on that.",
                "I wonder what the folks back in Shady Sands are doing.",
                "Did I leave the stove on back at the barracks?",
                "Two Brahmin walk into a bar... wait, how did that joke go?"
            ],
            idle_noncombat: [
                "Sensors active. Nothing to report.", 
                "Wish I had a gun right now.", 
                "Radar sweeping sector.", 
                "I'm a sitting duck here.", 
                "Keep those bugs away from my equipment!",
                "Is this dial supposed to be in the red?",
                "Just counting the sand grains. One, two, three...",
                "Why does the comms radio only pick up static and fiddle music?",
                "If this generator blows, I'm running.",
                "The coffee machine is broken again. Morale is critical.",
                "Do these sensors even work, or is the screen just painted green?",
                "I swear that blip just moved. No, wait, it's a smudge on the glass.",
                "Staring at a screen all day builds character, they said."
            ],
            combat_engage: [
                "Target acquired!", 
                "Putting rounds on target!", 
                "Hostile engaged!", 
                "Suppressing fire!",
                "Lighting them up!",
                "Send them back to the glowing sea!",
                "Eat lead, freak!",
                "Contact front!",
                "Squeeze the trigger, don't jerk it!",
                "Show them NCR discipline!",
                "They picked the wrong outpost!"
            ],
            combat_kill: [
                "Profligates down!", 
                "Scratch one!", 
                "Threat neutralized.", 
                "That's how the NCR does it!",
                "Bagged and tagged!",
                "One less freak to worry about.",
                "Right between the eyes!",
                "Hope you brought bottlecaps to pay the ferryman!",
                "Rest in pieces.",
                "Chalk up another one for the Republic!",
                "Yeah! Who's next?!"
            ],
            level_up: [
                "Ranger training pays off!", 
                "Upgraded and ready.", 
                "Weapon systems optimized.", 
                "Locked and loaded.",
                "Finally, some decent equipment!",
                "Look at me, I'm the veteran now.",
                "Does this mean I get a pay raise?",
                "Armor polished, weapons upgraded.",
                "Ready to lead the charge!",
                "Now we're cooking with plasma!"
            ],
            react_newbuild: [
                "Reinforcements! Took command long enough.", 
                "Good to have more guns on the line.", 
                "Watch your crossfire, rookie.",
                "About time command sent backup.",
                "Hey new guy, don't shoot me in the back.",
                "More targets for the taking.",
                "Glad you could join the party.",
                "Establish overlapping fields of fire!"
            ],
            react_perk: [
                "Ranger support inbound! Keep your heads down!", 
                "Command is pulling out the big guns!", 
                "Overdrive active! Push them back!",
                "Command is actually doing something?!",
                "Woah, I feel a surge of energy!",
                "Tactical advantage secured!",
                "They don't stand a chance now!",
                "Is this even legal?!"
            ],
            react_consumable: [
                "Mine out! Watch your step, Troopers!", 
                "Deploying traps. Stay clear.", 
                "Explosives set! Stand back!",
                "Boom-maker in position.",
                "Don't step on that, idiot.",
                "Watch the red blinking light.",
                "I love the smell of explosives in the morning.",
                "The bait is set. Come and get it."
            ],
            
            react_stranger: [
                "Who was that?!",
                "Did Ranger Command send him?",
                "Nice coat.",
                "I didn't even see him draw!",
                "Talk about a quick draw."
            ],
            react_mutation: [
                "Legendary enemy has mutated! Focus fire!",
                "It's getting back up! Keep shooting!",
                "Target is regenerating!",
                "It's glowing! Hit it with everything!"
            ],
            // SYSTEM / META TRIGGERS
            base_damage: [
                "They broke the line!", 
                "Leaker! We have a leaker!", 
                "Defend the objective!", 
                "They're getting past us!",
                "Turn around, shoot the ones behind us!",
                "We're leaking!",
                "Command is not gonna like this!",
                "Stop them, damn it!"
            ],
            base_critical: [
                "Base is taking heavy damage! Hold the line!", 
                "We're getting overrun!", 
                "MAYDAY! Fall back and protect the objective!",
                "Evacuate the non-combatants!",
                "This is a disaster!",
                "Hold the line or we all die here!",
                "I don't want to die in this desert!"
            ],
            wallbreak_pause: [
                "Hold up... why is everything frozen?", 
                "Wait, did time just stop?", 
                "Command, we have a temporal anomaly!",
                "Am I having a Jet flashback?",
                "Anyone else completely paralyzed?",
                "Well, this gives me time to reload.",
                "Did the Overseer freeze the simulation?",
                "Hello? Is anyone out there?"
            ],
            wallbreak_fastforward: [
                "Double time, Troopers! Move it!", 
                "Everything's a blur! Keep shooting!", 
                "Hustle! Hustle! Hustle!",
                "Too much Psycho! Too much Psycho!",
                "Why is my heart beating 200 times a minute?!",
                "Shoot faster! Faster!",
                "I can't feel my face!"
            ],
            sys_save: [
                "Progress logged to main terminal.", 
                "Intel secured. Don't lose it.", 
                "Check-in complete.",
                "I'm keeping a backup of this report.",
                "Writing this down before I forget."
            ],
            sys_load: [
                "System restored. Where were we?", 
                "Back in action. Let's move.",
                "Felt like I was asleep for a week.",
                "Wait, didn't I just shoot that guy?"
            ],
            sys_audio: [
                "Comms link toggled.", 
                "Radio silence.", 
                "Adjusting volume.",
                "Can you hear me now?",
                "Eardrums are ringing."
            ],
            wave_early: [
                "They're pushing early! Engage!", 
                "Wait, I wasn't ready!", 
                "Here they come! Move!",
                "Hey! I was in the bathroom!",
                "No rest for the weary! Fire!"
            ],
            loot_drop: [
                "Supply drop! Grab it!", 
                "Who left that there?",
                "Ooh, shiny!",
                "Is that standard issue?"
            ],
            loot_pickup: [
                "Acquired supplies.", 
                "Good find.",
                "Finders keepers.",
                "Command doesn't need to know about this."
            ],
            loot_vanish: [
                "Damn, we lost it.", 
                "Too slow. It's gone.",
                "Who stole my loot?!",
                "Great, now I'm broke AND miserable."
            ],

            // TOWER-SPECIFIC SOLO CHATTER
            type_rifle: [
                "Sight alignment is good.", 
                "Sniping is a good job, mate.", 
                "Waiting for a clean shot.",
                "Wind is picking up, adjusting scope.",
                "Don't move, you ugly mutant...",
                "One shot, one kill."
            ],
            type_cannon: [
                "Loading the heavy ordinance.", 
                "This thing kicks like a mule.", 
                "Clear the backblast area.",
                "I love it when they bunch up.",
                "Artillery brings dignity to what would otherwise be an ugly brawl.",
                "Incoming steel rain!"
            ],
            type_LMG: [
                "Checking the belt.", 
                "Heavy fire ready.", 
                "Keep 'em pinned down.",
                "I have two hundred rounds and I'm going to use all of them.",
                "Eat lead! Eat all of it!",
                "Barrel is getting hot!"
            ],
            type_laser_gun: [
                "Capacitors humming.", 
                "Energy cells full.", 
                "Clean, efficient lethality.",
                "Don't look directly at the beam.",
                "Smells like ozone and burnt hair.",
                "Science always wins."
            ],

            // MULTI-LINE CONVERSATIONS
            convo_script: [
                ["Check your ammo count, Trooper.", "Mag loaded and ready. Let 'em come.", "Good. For the Republic."],
                ["Anyone see anything out there?", "Nothing yet, keeping watch.", "Keep your eyes peeled."],
                ["You ever met a Ranger?", "Once. Guy didn't say a word.", "Sounds about right."],
                ["Knock knock.", "Who's there?", "Deathclaw.", "Deathclaw who?", "Exactly, shoot it!"],
                ["Hey, you got the time?", "[PC_TIME]", "[TIME_REACTION]"],
                ["I'm thinking of starting a Brahmin farm after my tour.", "You? A farmer?", "Hey, it's honest work.", "Good luck. I hear the soil is mostly glass and disappointment."],
                ["What's the first thing you'll do when you get back to the Hub?", "Take a shower. A real one, with water that isn't green.", "I'm gonna eat a steak. A real one, not a bloatfly."],
                ["This wind... it's getting on my nerves.", "Better than the sound of a mini nuke whistling.", "You got a point there.", "Still annoying, though."],
                ["Remember that Ranger who took on three Deathclaws with just a knife?", "Yeah, what a legend.", "I heard it was five Deathclaws and a shovel.", "Either way, he's got my respect."],
                ["You ever think about what we're fighting for?", "A steady paycheck and a pension.", "I was thinking more about... you know, democracy."],
                ["What's the strangest thing you've seen in the wastes?", "A guy in a blue vault suit drinking from a toilet.", "Yeah, that tracks.", "He survived, too. Vault Dwellers are weird."],
                ["Hey, let me borrow five caps.", "No way. You still owe me from that Caravan game.", "Come on, I'm good for it!", "Pay me back first, deadbeat."],
                ["Do you think mutants ever get sunburns?", "They're immune to radiation, idiot. The sun doesn't hurt them.", "Well excuse me for asking a scientific question."],
                ["I swear I saw a UFO last night.", "You've been hitting the Jet again, haven't you?", "No! It was green and went zooming over the mountains!", "Sure it was. Back to your post."],
                ["If we survive this, first round is on me.", "Make it a sunset sarsaparilla and you've got a deal.", "Deal. Try not to die before then."],
                ["Did you pack the Iguana on a stick?", "I ate it. I got hungry.", "You ate my lunch?! You're dead to me.", "Look, shoot the mutants first, then you can yell at me."],
["♫ To the town of Agua Fria rode a stranger one fine day... ♫", "♫ Hardly spoke to folks around him, didn't have too much to say... ♫", "♫ No one dared to ask his business, no one dared to make a slip... ♫", "♫ For the stranger there among them had a big iron on his hip. ♫", "♫ Big iron on his hip... ♫"],
["♫ I don't want to set the world on fire... ♫", "♫ I just want to start...♫ ", "♫ a flame in your heart... which is a tactical liability, Brother. ♫"],
["♫ Wouldn't it be nice if we were older... ♫", "♫ Then we wouldn't have to wait so long... ♫", "♫ And wouldn't it be nice to live together... ♫", "♫ In the kind of world where we belong... ♫"],
["♫ Almost heaven, West Virginia... ♫", "♫ Blue Ridge Mountains, Shenandoah River... ♫", "♫ Life is old there, older than the trees... ♫", "♫ Country roads, take me home... ♫", "♫ To the place I belong... ♫", "♫ West Virginia, mountain mama... ♫", "♫ Take me home, country roads. ♫"]
            ]
        },

        "BOS": {
            // SINGLE CHATTER
            idle_solo: [
                "Scanning for high-value tech signatures.", 
                "Ad Victoriam.", 
                "The wasteland is a mess.", 
                "Maintain discipline, Knights.", 
                "Armor seals holding.",
                "I should be securing pre-war tech, not standing here.",
                "Do you think the Scribes ever leave their terminals?",
                "If I see one more rusty pipe gun, I'm going to scream.",
                "Nothing but dirt, radiation, and mutants.",
                "My power armor is itching, and I can't scratch it.",
                "The Prydwen is a marvel of engineering.",
                "Outstanding.",
                "Keep your weapons clean and your faith in the Brotherhood strong.",
                "A Knight's duty is never done.",
                "I miss the Citadel.",
                "Any civilian who interferes with Brotherhood operations will be dealt with."
            ],
            idle_noncombat: [
                "Sensor array functioning normally.", 
                "Monitoring structural integrity.", 
                "Wish I was issued a laser rifle.", 
                "Do not let them scratch the paint.", 
                "Calculating local radiation levels.",
                "Calibrating targeting telemetry for local units.",
                "Scribe duties are essential, but highly tedious.",
                "I detect high levels of background radiation. Typical.",
                "If this array fails, the Paladin will have my head.",
                "Logging local topography for the archives.",
                "Why am I doing guard duty? I'm a Scribe!",
                "Analyzing mutant pathing algorithms."
            ],
            combat_engage: [
                "Purging abomination!", 
                "Laser capacitors discharging!", 
                "Engaging hostile targets!", 
                "For the Brotherhood!",
                "Show them the might of Steel!",
                "Cleanse the Commonwealth!",
                "No mercy for mutants!",
                "You are interfering with Brotherhood business!",
                "Firing main weapons!",
                "Hostile lifeforms detected! Eradicate them!",
                "Feel the burn!"
            ],
            combat_kill: [
                "Target eradicated.", 
                "Wasteland cleansed.", 
                "Abomination destroyed.", 
                "Another victory for Steel.",
                "Ashes to ashes.",
                "They didn't stand a chance against our tech.",
                "Threat purged from the sector.",
                "Just another mutant stain on the ground.",
                "Excellent shot.",
                "Target has been vaporized.",
                "Ad Victoriam! Next target!"
            ],
            level_up: [
                "Tech upgrades applied. Ad Victoriam.", 
                "Weapon yield increased.", 
                "Paladin protocol authorized.", 
                "Systems operating at peak efficiency.",
                "My combat effectiveness has increased by 34%.",
                "Armor reinforced. Ready for heavy combat.",
                "The scribes outdid themselves this time.",
                "Maximum power output achieved.",
                "I am become Death.",
                "Upgrades nominal. Proceeding with the mission."
            ],
            react_newbuild: [
                "Welcome to the firing line, Initiate.", 
                "Additional firepower secured.", 
                "Formation updated.",
                "Good, we needed more overlapping fire.",
                "Establish a strong perimeter. Leave no gaps.",
                "More Brotherhood steel on the field.",
                "Check your sightlines, Brother.",
                "Follow my lead and you might survive."
            ],
            react_perk: [
                "Prydwen support authorized. Purge them all!", 
                "Elder Maxson sends his regards.", 
                "Maximum overdrive engaged.",
                "Orbital strike capabilities unlocked!",
                "Push your weapons past the redline!",
                "We have the tactical advantage! Press the attack!",
                "They cannot withstand this level of firepower!",
                "Glorious."
            ],
            react_consumable: [
                "Explosive ordnance detected. Adjusting pathing.", 
                "Traps deployed. Acknowledge.", 
                "Watch the blast radius.",
                "Mine armed. Keep the civilian rabble away from it.",
                "Explosives are crude, but effective.",
                "Do not step on the flashing device, Initiate.",
                "Ordnance primed. Waiting for the trigger.",
                "Calculated blast radius: lethal."
            ],
            react_stranger: [
                "Unidentified civilian! With lethal force!",
                "His tech... it's unregistered.",
                "Who was that man?",
                "The Scribes are going to want to hear about this.",
                "Incredible firepower."
            ],
            react_mutation: [
                "Target has mutated! Extreme prejudice authorized!",
                "Abomination is regenerating tissue!",
                "It refuses to die! Purge it!",
                "Mutation confirmed. Increase weapon yield!"
            ],         
            // SYSTEM / META TRIGGERS
            base_damage: [
                "Perimeter breached!", 
                "Unacceptable! Target leaked!", 
                "Defend the core tech!",
                "They are touching the archives!",
                "Stop them before they compromise the mission!",
                "Breach detected! Plug the hole!",
                "Incompetence! Shoot them!",
                "We are failing the Elder!"
            ],
            base_critical: [
                "CRITICAL ALERT: Defenses failing!", 
                "The objective is almost lost! Stand fast!", 
                "Initiate emergency purge! We are falling!",
                "We cannot let this tech fall into mutant hands!",
                "Fight to the last man! Ad Victoriam!",
                "Total structural collapse imminent!",
                "Prepare for self-destruct if they breach the core!"
            ],
            wallbreak_pause: [
                "Temporal anomaly detected. Systems locked.", 
                "Sensor glitch? Everything stopped.", 
                "Awaiting input...",
                "Did a synth hack the simulation?",
                "My chronometer has ceased functioning.",
                "Is this a new Institute weapon?",
                "Rebooting optical sensors. Standby.",
                "Status report! Why is no one moving?"
            ],
            wallbreak_fastforward: [
                "Tactical feeds are accelerating. Compensating.", 
                "Overclocking servos to match speed.", 
                "Engaging rapid response protocols.",
                "Time dilation effect observed!",
                "Target tracking is struggling to keep up!",
                "Fire faster! Do not let the simulation beat you!",
                "Warning: Overheating imminent!"
            ],
            sys_save: [
                "Data archived to holotape.", 
                "Memory cores synchronized.", 
                "Scribe backup complete.",
                "Logging battle data for the Citadel.",
                "Tactical analysis saved."
            ],
            sys_load: [
                "Boot sequence initiated. Ready.", 
                "Systems nominal.",
                "Restoring previous tactical state.",
                "Holotape loaded. Resuming purge."
            ],
            sys_audio: [
                "Audio receptors adjusted.", 
                "Filtering background noise.",
                "Comms chatter muted.",
                "I can hear myself think again."
            ],
            wave_early: [
                "Abominations are rushing! Fire!", 
                "Tactical error! Early assault!", 
                "Hold the line!",
                "They're not waiting for us! Engage!",
                "An undisciplined charge. Cut them down!"
            ],
            loot_drop: [
                "Unregistered tech located.", 
                "Valuable salvage detected.",
                "Do not let the locals scavenge that.",
                "Secure that item for the Scribes."
            ],
            loot_pickup: [
                "Tech recovered for the Brotherhood.", 
                "Salvage secured.",
                "Logging item in the quartermaster's ledger.",
                "Another piece of history saved from the dirt."
            ],
            loot_vanish: [
                "Salvage opportunity lost.", 
                "Unacceptable delay. Tech lost.",
                "The item has degraded beyond recovery.",
                "Mark it as unrecoverable in the logs."
            ],

            // TOWER-SPECIFIC SOLO CHATTER
            type_rifle: [
                "Rifle optics calibrated.", 
                "Precision firing mode engaged.",
                "Windage set. Awaiting targets.",
                "One shot, one purged abomination.",
                "My aim is flawless.",
                "I never miss."
            ],
            type_cannon: [
                "Artillery systems nominal.", 
                "Calculating trajectory.",
                "I prefer the heavy approach.",
                "If it survives this, I'll be impressed.",
                "Loading high-explosive rounds.",
                "Clear the blast zone."
            ],
            type_LMG: [
                "Rotary barrel cooling.", 
                "Sustained fire mode ready.",
                "I will lay down a wall of lead.",
                "Nothing gets through my arc of fire.",
                "Ammo belt is secure.",
                "Let them come. I have enough for all of them."
            ],
            type_laser_gun: [
                "Plasma core stable.", 
                "Energy weapons primed.", 
                "Ad Victoriam.",
                "The pinnacle of pre-war weaponry.",
                "Nothing cuts through armor quite like a laser.",
                "Recharging microfusion cells."
            ],

            // MULTI-LINE CONVERSATIONS
            convo_script: [
                ["Check your fusion cells. Keep them topped off.", "Capacitors at maximum, Brother.", "Excellent. Maintain overlapping fields of fire.", "Holding the line. Ad Victoriam."],
                ["Status report, Brother?", "All systems nominal.", "Keep scanning for tech signatures."],
                ["What do you think of the locals?", "Undisciplined. But occasionally useful.", "Agreed. Keep a close eye on them."],
                ["Did you hear the rumors about synths replacing people?", "It's an Institute trick to cause paranoia.", "I suppose. Still, keep your weapon drawn.", "Always do."],
                ["I requested a transfer to the Prydwen.", "Good luck with that. The waiting list is a mile long.", "A Knight can dream, can't he?", "Focus on the dirt in front of you, Knight."],
                ["Why are we fighting over this specific patch of dirt?", "Ours is not to question the Elder's orders.", "I know, I know. It just seems pointless.", "If there's pre-war tech here, it's worth it."],
                ["My power armor joint is squeaking.", "Did you requisition oil from the quartermaster?", "He told me to use mutant grease.", "Disgusting. But effective."],
                ["Have you read the latest Scribe report?", "I don't read. I shoot.", "You should read it. The mutant migration patterns are alarming.", "Let them migrate into my crosshairs."],
                ["Are those civilians scavenging our battlefield?", "Warning shots authorized.", "Gladly. Firing now.", "That scattered them."],
                ["Anyone got the time?", "[PC_TIME]", "[TIME_REACTION]"],
                ["This salvaged sensor... should we send it to the Scribes or repurpose it?", "Scribes will just put it in a box. We can use it for targeting.", "That's a violation of protocol 7-Delta.", "Write me up for it after the battle, then."],
                ["Initiate, your power armor maintenance is overdue.", "But I polished it this morning, Paladin!", "The diagnostic shows micro-fractures in the chest plate. Report to the armory.", "(Sighs) Yes, Paladin."],
["♫ To the town of Agua Fria rode a stranger one fine day... ♫", "♫ Hardly spoke to folks around him, didn't have too much to say... ♫", "♫ No one dared to ask his business, no one dared to make a slip... ♫", "♫ For the stranger there among them had a big iron on his hip. ♫", "♫ Big iron on his hip... ♫"],
["♫ I don't want to set the world on fire... ♫", "♫ I just want to start...♫ ", "♫ a flame in your heart... which is a tactical liability, Brother. ♫"],
["♫ Wouldn't it be nice if we were older... ♫", "♫ Then we wouldn't have to wait so long... ♫", "♫ And wouldn't it be nice to live together... ♫", "♫ In the kind of world where we belong... ♫"],
["♫ Almost heaven, West Virginia... ♫", "♫ Blue Ridge Mountains, Shenandoah River... ♫", "♫ Life is old there, older than the trees... ♫", "♫ Country roads, take me home... ♫", "♫ To the place I belong... ♫", "♫ West Virginia, mountain mama... ♫", "♫ Take me home, country roads. ♫"]

            ]
        },
        "MINUTEMEN": {
            // SINGLE CHATTER
            idle_solo: [
                "Just keeping an eye out for settlements that need help.", 
                "Hope it rains soon.", 
                "We protect our own.", 
                "Minute's notice, that's the promise.", 
                "Commonwealth needs us.",
                "If I have to plant one more mutfruit bush, I'm gonna snap.",
                "My crank arm is getting really sore.",
                "Wonder how things are going back at The Castle.",
                "I'm just a farmer, how did I end up out here?",
                "I should be harvesting tatos right now.",
                "United we stand.",
                "Anyone got any water? My throat is parched.",
                "I'll defend this dirt with my life, but it's still just dirt.",
                "I hope the General comes by to inspect the troops today.",
                "Tired, hungry, and waiting for mutants. Just another Tuesday.",
                "Who's got the bug spray? The giant, radioactive bug spray."
            ],
            idle_noncombat: [
                "I'm just the spotter, you guys do the shooting!", 
                "Hope my barricade holds up.", 
                "Watching the horizon.", 
                "Don't let them eat me!", 
                "Radio is clear... for now.",
                "Radio Freedom is broadcasting loud and clear.",
                "If they get close, I'm hiding behind you guys.",
                "I think I saw movement by the treeline. False alarm.",
                "Is this radio antenna supposed to be sparking like that?",
                "I'm keeping the generator running, you keep us alive.",
                "I'm a civilian! Well, mostly civilian.",
                "Let me know if you see a flare go up."
            ],
            combat_engage: [
                "For the Commonwealth!", 
                "Crank that musket!", 
                "Here they come, defend the wall!", 
                "Open fire!",
                "Give 'em hell, militia!",
                "Protect the settlement!",
                "Don't let them take our home!",
                "Send them packing!",
                "Minutemen, engage!",
                "They picked the wrong farm to raid!",
                "Show them what we're made of!"
            ],
            combat_kill: [
                "Another one bites the dust!", 
                "Got 'em!", 
                "Settlement secured.", 
                "Minutemen prevail!",
                "That's for Quincy!",
                "Smoked 'em!",
                "Get off our land!",
                "That'll teach 'em to mess with the Minutemen.",
                "Chalk one up for the good guys.",
                "Hope I don't have to bury that thing.",
                "Who's next?!"
            ],
            level_up: [
                "General's gonna love this new gear!", 
                "Musket upgraded and ready.", 
                "Feeling a lot stronger now!", 
                "We can hold off anything.",
                "I got a new coat and everything!",
                "My crank turns so much smoother now.",
                "I feel like a veteran Ranger!",
                "Better armor, better guns. Let's go.",
                "The militia is looking like a real army.",
                "I might actually survive the week!"
            ],
            react_newbuild: [
                "Glad you could make it! Grab a spot.", 
                "More hands make less work.", 
                "Welcome to the militia, neighbor.",
                "Hey there. Keep your head down and shoot straight.",
                "Another gun on the line! Good to see you.",
                "We needed the backup, thanks.",
                "Did Preston send you?",
                "Find a spot on the wall and get comfortable."
            ],
            react_perk: [
                "Artillery strike! Clear the blast zone!", 
                "General gave the order, let 'em have it!", 
                "Pushing past the limit!",
                "Fire for effect!",
                "The General is pulling out all the stops!",
                "Rain fire on 'em!",
                "This is gonna be loud!",
                "Hold onto your hats, folks!"
            ],
            react_consumable: [
                "Traps set! Lure them in!", 
                "Watch where you step, folks!", 
                "Surprise waiting for them.",
                "Jury-rigged and ready to blow.",
                "I built this explosive out of a tin can and some duct tape.",
                "Mine armed. Keep the Brahmin away from it.",
                "Watch the tripwire!",
                "Let's see them walk through this."
            ],
            react_stranger: [
                "Who was that masked man?",
                "Friend of yours, General?",
                "I thought I was a goner!",
                "The Commonwealth provides!",
                "We take all the help we can get."
            ],
            react_mutation: [
                "It's mutating! Don't stop cranking!",
                "It's getting stronger! Keep firing!",
                "God help us, it's glowing!",
                "Put it down before it heals!"
            ],           
            // SYSTEM / META TRIGGERS
            base_damage: [
                "They got past us!", 
                "Stop them! Don't let them in!", 
                "The settlement is taking hits!",
                "They're ruining the crops!",
                "Get back here, you monster!",
                "We have a breach!",
                "They're attacking the civilians!",
                "Turn around and shoot!"
            ],
            base_critical: [
                "General, the walls are falling!", 
                "We can't hold out much longer!", 
                "Protect the people! We're losing it!",
                "Women and children first! Fall back!",
                "The settlement is overrun!",
                "We need reinforcements NOW!",
                "I'm not dying in the mud! Fight back!"
            ],
            wallbreak_pause: [
                "Did time just stop? Must be the Jet talking.", 
                "Guess we're taking a breather.", 
                "Hold your fire... literally.",
                "Time for a smoke break, I guess.",
                "Why is the laser beam stuck mid-air?",
                "Is the General checking the map?",
                "I'm frozen. Good thing my nose doesn't itch.",
                "Hello? Anyone?"
            ],
            wallbreak_fastforward: [
                "Woah, is everyone else moving really fast?", 
                "Double time! Keep up!", 
                "Crank faster! Faster!",
                "My arm is gonna fall off!",
                "Why are we all running like maniacs?!",
                "I can't crank the musket any faster!",
                "Gotta go! Gotta go! Gotta go!"
            ],
            sys_save: [
                "Journal updated.", 
                "Wrote that one down.", 
                "Ain't forgetting this.",
                "Logged in the settlement roster.",
                "Putting this in the official report."
            ],
            sys_load: [
                "Waking up. What's the plan?", 
                "I'm back. Let's do this.",
                "Coffee's brewed, ready for guard duty.",
                "Did I miss anything?"
            ],
            sys_audio: [
                "Radio Free Wasteland tuned.", 
                "Can't hear myself think!",
                "Fiddle music volume adjusted.",
                "Is my earpiece working?"
            ],
            wave_early: [
                "They're attacking! To arms!", 
                "I wasn't done reloading! Fire!", 
                "Ambush! Defend the settlement!",
                "Ring the bell! Here they come!",
                "They didn't give us a minute's notice!"
            ],
            loot_drop: [
                "Hey, look at that!", 
                "Scavenger's luck today.",
                "Might be some good scrap over there.",
                "Someone dropped something!"
            ],
            loot_pickup: [
                "Finders keepers!", 
                "This'll help the cause.",
                "More scrap for the workbench.",
                "Sturges will be happy to see this."
            ],
            loot_vanish: [
                "Aw, it slipped away.", 
                "Should've grabbed it faster.",
                "Well, that's just wasteful.",
                "Gone. Just like my pre-war money."
            ],

            // TOWER-SPECIFIC SOLO CHATTER
            type_rifle: [
                "Musket cranked and ready.", 
                "Lining up the shot.", 
                "Keep the powder dry.",
                "Three cranks ought to do it.",
                "Don't jam on me now, you piece of junk.",
                "I carved a notch for every mutant I've killed."
            ],
            type_cannon: [
                "Mortar is primed.", 
                "Ready to make some noise.",
                "Artillery standing by.",
                "Calculating coordinates for the barrage.",
                "Hope I don't hit our own guys.",
                "Fire in the hole!"
            ],
            type_LMG: [
                "Got plenty of lead for 'em.", 
                "Barricade defense ready.",
                "I bolted this gun together myself.",
                "Keep feeding the belt!",
                "It ain't pretty, but it shoots fast."
            ],
            type_laser_gun: [
                "Got my hands on some fancy tech!", 
                "Pew pew!",
                "Beats using a pipe pistol.",
                "I have no idea how this works, I just pull the trigger.",
                "Don't look into the shiny end."
            ],

            // MULTI-LINE CONVERSATIONS
            convo_script: [
                ["You hear Freedom Radio lately? Same song all day.", "Better than listening to mutants breathing.", "Fair point. I'll take the fiddle music."],
                ["Ammo check, everyone good?", "I've got enough cranks for now.", "Barricades are holding.", "Good. General's always watching."],
                ["Think another settlement needs our help?", "I'll mark it on your map.", "Very funny. Keep shooting."],
                ["How many cranks is too many on a laser musket?", "I usually stop at four.", "I did six once.", "What happened?", "Singed off my eyebrows. Don't recommend it."],
                ["I miss my tato farm.", "Tatos taste like dirt.", "Yeah, but it's *my* dirt.", "Fair enough. Protect the dirt."],
                ["You ever seen the General fight?", "Yeah. Took down a Deathclaw with a rolling pin.", "You're lying.", "I swear on my favorite hat!"],
                ["Did you remember to lock the gate?", "I thought you locked the gate.", "Oh no.", "We don't even have a gate, calm down."],
                ["What do you want to do when we rebuild the Commonwealth?", "Open a bakery. Sell mutfruit pies.", "I'll be your first customer.", "I'll give you the militia discount."],
                ["Look at this pipe rifle. It's practically held together with rust.", "As long as the bullet comes out the front, it's fine.", "I think it's pointing slightly left.", "Just aim slightly right, then."],
                ["Anyone got the time?", "[PC_TIME]", "[TIME_REACTION]"],
                ["We saved Abernathy Farm last week.", "I heard. Good people over there.", "They gave me a whole crate of tatos as thanks.", "We do it for the people, not the tatos.", "I know. But the tatos are nice."],
                ["This wall won't hold forever.", "It'll hold long enough. We just need to keep rebuilding.", "Just once I'd like to build something that isn't immediately shot at.", "That's the dream, friend."],
["♫ To the town of Agua Fria rode a stranger one fine day... ♫", "♫ Hardly spoke to folks around him, didn't have too much to say... ♫", "♫ No one dared to ask his business, no one dared to make a slip... ♫", "♫ For the stranger there among them had a big iron on his hip. ♫", "♫ Big iron on his hip... ♫"],
["♫ I don't want to set the world on fire... ♫", "♫ I just want to start...♫ ", "♫ a flame in your heart... which is a tactical liability, Brother. ♫"],
["♫ Wouldn't it be nice if we were older... ♫", "♫ Then we wouldn't have to wait so long... ♫", "♫ And wouldn't it be nice to live together... ♫", "♫ In the kind of world where we belong... ♫"],
["♫ Almost heaven, West Virginia... ♫", "♫ Blue Ridge Mountains, Shenandoah River... ♫", "♫ Life is old there, older than the trees... ♫", "♫ Country roads, take me home... ♫", "♫ To the place I belong... ♫", "♫ West Virginia, mountain mama... ♫", "♫ Take me home, country roads. ♫"]

            ],
            militia_blockade: [
                "Hold the line!",
                "Don't let them through!",
                "Keep firing! Keep firing!",
                "Reload! I need to reload!",
                "They're right on top of us!",
                "We hold them here!",
                "For the Commonwealth!",
                "Push them back!",
                "Stand your ground, militia!",
    		"Watch the flanks! Don't let them surround us!",
    		"Focus fire on that one!",
    		"Keep your heads down and return fire!",
    		"Spread out! Don't give 'em an easy target!",
    		"Lay down suppressing fire!",
    		"Tighten up the perimeter!",
    		"Cover the choke point!",
    		"Check your targets, watch your crossfire!",
    		"Push up! Push up!",
    		"You picked the wrong checkpoint!",
    		"Come and get it!",
    		"Is that all you got?!",
    		"Not today! Not on my watch!",
    		"You're not taking this spot!",
    		"We've survived worse than you!",
    		"Make every shot count!",
    		"You want this ground? Come bleed for it!",
    		"Swapping mags! Cover me!",
    		"Weapon jammed! Give me a second!",
    		"Grenade! Scatter!",
    		"Target down! Moving to the next!",
    		"I'm hit! I'm hit... but I'm still in this!",
    		"Man down! We got a man down!",
    		"I'm on my last mag! Make it count!",
    		"Got eyes on another one!",
    		"YEAH! Get some! Get some!",
    		"That's how we do it! Keep 'em coming!",
    		"Woo! I got one! Did you see that?!",
    		"Nice shot!",
    		"Light 'em up! Burn 'em down!",
    		"That's right! Keep running, you cowards!",
	        "They're breaking! I think they're breaking!",
    		"What?! I can't hear you over the gunfire!",
    		"Speak louder! Shout!",
    		"I think they're behind us! Are they behind us?!",
    		"Who's got the left side?! Anyone?!",
    		"They've got a runner! Watch the road!",
    		"My ears are ringing! I can't hear a thing!",
                "I'm out of ammo! Just kidding, eat lead!"
            ]
        },
        "RAIDERS": {
            // SINGLE CHATTER
            idle_solo: [
                "I'm bored... somebody throw a grenade!", 
                "Where's the loot?", 
                "Can't wait to crack some skulls.", 
                "Need some Jet... right now.", 
                "Who wants to die next?",
                "I need a hit of Psycho.",
                "Anyone got a whetstone? My machete is dull.",
                "Wonder what human meat tastes like... again.",
                "I'm gonna make a necklace out of their ears.",
                "Are we gonna shoot something or just stand here?",
                "I should've joined the Gunners. Better pay.",
                "If the boss doesn't pay up soon, I'm taking his head.",
                "My trigger finger is itchy.",
                "I think that radroach was looking at me funny.",
                "Got a cramp in my stabbing arm."
            ],
            idle_noncombat: [
                "I don't have a gun, don't let 'em touch me!", 
                "Who gave me the flashlight instead of the shotgun?!", 
                "I'm gonna rig this thing to blow.", 
                "They better not scratch my stuff!",
                "Who put me on generator duty?!",
                "I'm gonna bash the radio if it keeps buzzing.",
                "Boring, boring, boring!",
                "If a mutant gets close, I'm throwing a rock.",
                "Don't touch my stash while I'm watching this junk.",
                "I bet I could sell this radar dish for a lot of caps."
            ],
            combat_engage: [
                "Look at 'em bleed! HAHA!", 
                "Meat for the grinder!", 
                "Tear 'em apart!", 
                "Die! Die! Die!",
                "Time to paint the sand red!",
                "Don't run, you'll just die tired!",
                "I'm gonna wear your guts!",
                "Fresh meat!",
                "Get 'em!",
                "Nobody walks away from us!",
                "Scream for me!"
            ],
            combat_kill: [
                "Hahaha! Did you see that splatter?!", 
                "Next!", 
                "Loot the body!", 
                "Got another one!",
                "Hah! Nailed 'em!",
                "Take his shoes!",
                "That one burst like a melon!",
                "Mine! All his stuff is mine!",
                "Bleed, you scum!",
                "Another skull for the pile!",
                "Don't forget to check their pockets!"
            ],
            level_up: [
                "Oh yeah, more spikes, more blood!", 
                "I got the good ammo now!", 
                "I am unstoppable!", 
                "Time for maximum carnage!",
                "More spikes! More rust!",
                "I'm the boss now!",
                "Look at my shiny new gun!",
                "Who wants a piece of me?!",
                "I feel the Psycho kicking in!",
                "Nobody tells me what to do anymore!"
            ],
            react_newbuild: [
                "Fresh meat for the grinder! Don't steal my kills!", 
                "Hey, get your own spot!", 
                "More guns? Fine by me!",
                "Don't get in my line of fire!",
                "Great, another mouth to feed.",
                "You better pull your weight, scum.",
                "Watch where you point that thing."
            ],
            react_perk: [
                "Oh man, the boss is getting serious now!", 
                "Rage mode! Let's goooo!", 
                "Tear it all down!",
                "The boss is sharing the good chems!",
                "Absolute mayhem!",
                "Let's burn this whole place down!",
                "I can't feel pain anymore! HAHAHA!"
            ],
            react_consumable: [
                "Boom box planted! Step on it, I dare ya!", 
                "Hahaha, explosive surprises!", 
                "Watch out, it's gonna blow!",
                "Don't step on that or I'll laugh at you!",
                "I hid a surprise over there...",
                "Fire in the hole, losers!",
                "Tripwire is hot. Watch your ankles."
            ],
            react_stranger: [
                "WHAT WAS THAT?!",
                "He stole my kill!",
                "Did you see that guy's gun?!",
                "I want his hat!",
                "Where did he go?!"
            ],
            react_mutation: [
                "IT'S GETTING BACK UP! SHOOT IT!",
                "Legendary freak! It's mine!",
                "Hahaha! More meat to grind!",
                "Why won't it die?!"
            ],          
            // SYSTEM / META TRIGGERS
            base_damage: [
                "Hey! They're touching our stuff!", 
                "Shoot them in the back!", 
                "Get back here, coward!",
                "They're taking our caps!",
                "Stop them or the boss will kill us!",
                "Hey, that's my stuff!",
                "Nobody steals from me!"
            ],
            base_critical: [
                "THEY'RE WRECKING THE STASH!", 
                "We're dying over here! Do something!", 
                "Ahhh! We're losing!",
                "The stash is gone! We're dead!",
                "Grab what you can and run!",
                "It's all falling apart!",
                "I'm out of here! Every man for himself!"
            ],
            wallbreak_pause: [
                "Who hit the pause button?! I was about to shoot!", 
                "Hey! Unfreeze me!", 
                "Aww, taking a nap?",
                "Did the chems just kick in?",
                "Why's everyone standing like idiots?",
                "I can't move my arms!",
                "Am I dead? Is this hell?"
            ],
            wallbreak_fastforward: [
                "YEAAAH! FAST MOTION CARNAGE!", 
                "Speed it up! Go go go!", 
                "More blood! Faster!",
                "JET JET JET JET JET!",
                "I can taste colors!",
                "Everything is exploding so fast!",
                "My brain is vibrating!"
            ],
            sys_save: [
                "Carving my name in the wall.", 
                "Saving my stash.", 
                "Don't touch my stuff.",
                "Hiding my caps.",
                "Buried the stash. Don't look at me."
            ],
            sys_load: [
                "Who woke me up?!", 
                "I'm back, and I'm angry!",
                "Ugh, my head... what happened?",
                "Who took my Psycho?!"
            ],
            sys_audio: [
                "TURN IT UP!", 
                "Shut up, I'm trying to kill!",
                "Shut up, the radio's on!",
                "Can't hear the screaming over this noise!"
            ],
            wave_early: [
                "They want to die early? FINE!", 
                "WAAAGH! KILL 'EM ALL!", 
                "I wasn't ready! Ah, who cares, shoot!",
                "Bring it on, chumps!",
                "More meat for the grinder early!",
                "Hey, wait your turn!"
            ],
            loot_drop: [
                "Shiny! Mine!", 
                "Dibs!",
                "I saw it first!",
                "Keep your grubby hands off that!"
            ],
            loot_pickup: [
                "Got the goods!", 
                "All mine, haha!",
                "Finders keepers, losers weep!",
                "More caps for me."
            ],
            loot_vanish: [
                "Who stole my loot?!", 
                "Gah! It fell in a hole!",
                "Where'd it go?! I'll kill whoever took it!",
                "Stupid wasteland swallowed it."
            ],

            // TOWER-SPECIFIC SOLO CHATTER
            type_rifle: [
                "I'm gonna shoot their eyes out.", 
                "Pipe gun's rusty, but it works.", 
                "Stay still...",
                "Scope's cracked, don't care.",
                "Gonna pop their heads.",
                "Hold still so I can shoot you!"
            ],
            type_cannon: [
                "I love watching things explode!", 
                "BIG BOOM TIME!",
                "Hope this doesn't blow up in my face.",
                "Big gun makes big holes!",
                "Watch the chunks fly!"
            ],
            type_LMG: [
                "Spray and pray, baby!", 
                "Rat-a-tat-tat!",
                "Hold the trigger down until it stops making noise!",
                "Hahahaha! More bullets!",
                "Come get some!"
            ],
            type_laser_gun: [
                "Stole this from some tin-can knight.", 
                "Burn, burn, burn!",
                "Look at the pretty red light!",
                "Where do the batteries go in this thing?",
                "Turns 'em right to ash."
            ],

            // MULTI-LINE CONVERSATIONS
            convo_script: [
                ["I bet I get more kills than you today.", "Put some caps on it, loser!", "You're on. Prepare to pay up.", "Yeah right. Watch and learn."],
                ["You looking at me?", "I'm looking at your ugly mug.", "Say that again, I'll shoot you myself.", "Try it. I double dare ya."],
                ["Knock knock.", "Who's there?", "Your fist.", "My fist who?", "My fist in your face! Hahaha!"],
                ["Give me your Jet.", "No way, get your own.", "I'm taking it.", "I'll stab you in the eye."],
                ["Why do we hang bodies from hooks?", "To scare people.", "It just smells bad to me.", "You lack artistic vision."],
                ["You think the Brotherhood will come here?", "Let 'em. I want a shiny metal suit.", "You can't even read the manual for one.", "I'll figure it out!"],
                ["I haven't taken a bath in three months.", "I can tell.", "What's that supposed to mean?!", "It means stay downwind of me."],
                ["Anyone got the time?", "[PC_TIME]", "[TIME_REACTION]"],
                ["I dare you to eat that glowing fungus over there.", "For how many caps?", "Ten.", "Make it twenty and you've got a deal.", "Fine. But I get to watch."],
                ["This is my spot! I saw it first!", "I was here yesterday! It's my spot!", "I'll fight you for it!", "Fine! After we kill these things!"],
["♫ To the town of Agua Fria rode a stranger one fine day... ♫", "♫ Hardly spoke to folks around him, didn't have too much to say... ♫", "♫ No one dared to ask his business, no one dared to make a slip... ♫", "♫ For the stranger there among them had a big iron on his hip. ♫", "♫ Big iron on his hip... ♫"],
["♫ I don't want to set the world on fire... ♫", "♫ I just want to start...♫ ", "♫ a flame in your heart... which is a tactical liability, Brother. ♫"],
["♫ Wouldn't it be nice if we were older... ♫", "♫ Then we wouldn't have to wait so long... ♫", "♫ And wouldn't it be nice to live together... ♫", "♫ In the kind of world where we belong... ♫"],
["♫ Almost heaven, West Virginia... ♫", "♫ Blue Ridge Mountains, Shenandoah River... ♫", "♫ Life is old there, older than the trees... ♫", "♫ Country roads, take me home... ♫", "♫ To the place I belong... ♫", "♫ West Virginia, mountain mama... ♫", "♫ Take me home, country roads. ♫"]

            ]
        }

   },
    holidays: {
        "NewYear": {
            idle_solo: [
                "New year, same wasteland.", 
                "Happy New Year! Did anything change?", 
                "My resolution? Survive.", 
                "I lost my calendar, is it actually a new year?"
            ],
            convo_script: [
                ["What's your New Year's resolution?", "Stop getting shot.", "That's a good one.", "It's harder than it sounds."]
            ]
        },
        "Valentines": {
            idle_solo: [
                "Anyone else lonely out here? Just me?", 
                "I love the smell of gunpowder on Valentine's Day.", 
                "I got you a bouquet of mutfruit.", 
                "Love is a battlefield. Literally."
            ],
            convo_script: [
                ["Did you get me anything for Valentine's Day?", "I got you some extra 5.56 ammo.", "Aww, you shouldn't have.", "I didn't. Keep your hands off my stash."]
            ]
        },
        "StPatricks": {
            idle_solo: [
                "Could really go for an irradiated stout today.", 
                "Pinch me and I'll shoot you.", 
                "I'm wearing green. Well, olive drab.",
                "Anyone seen a Leprechaun? Or was that just a short feral ghoul?"
            ],
            convo_script: [
                ["Why are you looking at that Super Mutant like that?", "He's green, right? Think he has a pot of gold?", "He has a minigun. Don't pinch him.", "Fair point."]
            ]
        },
        "AprilFools": {
            idle_solo: [
                "Hey, your shoelaces are untied. Haha, made you look.", 
                "Look behind you! Kidding.", 
                "I replaced your stimpak with dirty water.",
                "There's a Deathclaw right behind you! Haha!"
            ],
            convo_script: [
                ["Hey, command just radioed in. We're getting relieved!", "Really?! We can go home?", "April Fools. Keep shooting.", "I hate you so much."]
            ]
        },
        "MayThe4th": {
            idle_solo: [
                "May the... wait, what franchise is this again?", 
                "I am your... Overseer?", 
                "I shot first.",
                "These energy weapons feel very... civilized."
            ],
            convo_script: [
                ["These blast marks... too accurate for Raiders.", "Only Gunners are so precise.", "Or literally anyone who actually aims.", "Just let me have this moment."]
            ]
        },
        "IndependenceDay": {
            idle_solo: [
                "Happy 4th! Let's make some fireworks!", 
                "God bless the wasteland.", 
                "I miss hot dogs.",
                "Nothing says freedom like high-explosive ordnance."
            ],
            convo_script: [
                ["DEMOCRACY IS NON-NEGOTIABLE.", "Are you quoting Liberty Prime again?", "DEATH IS A PREFERABLE ALTERNATIVE TO COMMUNISM.", "I'll take that as a yes."]
            ]
        },
        "Birthday": {
            idle_solo: [
                "Happy Birthday! Hope the Overseer got you a cake.", 
                "Cake day! Save me a slice.", 
                "We're one year closer to death!",
                "Does radiation make you age faster?"
            ],
            convo_script: [
                ["I think today is my birthday.", "You think?", "Pip-boy calendar got corrupted.", "Well, happy birthday. Here's a bullet."]
            ]
        },
        "BombsDrop": {
            idle_solo: [
                "Remember the 23rd. Never forget what we lost.", 
                "End of the world anniversary. Fun.", 
                "2077 feels like a lifetime ago.",
                "Wish I could have seen the world before the fire."
            ],
            convo_script: [
                ["Can you believe the world ended on a Saturday?", "It was a Saturday?", "I think so. Ruined the weekend.", "Yeah, that's the tragedy here. The weekend."]
            ]
        },
        "Halloween": {
            idle_solo: [
                "Ghouls and ghosts out tonight. Or just regular ghouls.", 
                "I'm gonna wear their skulls like a mask!", 
                "Every day is Halloween for us, idiot.",
                "I'm dressing up as a functioning society."
            ],
            convo_script: [
                ["Trick or treat!", "We have no candy. Just bullets.", "I'll take the bullets.", "That's a trick, then."]
            ]
        },
        "VeteransDay": {
            idle_solo: [
                "Salute to the fallen. We hold the line for them.", 
                "Respect the old world soldiers.", 
                "Anchorage feels like a myth now.",
                "For everyone who didn't make it back."
            ],
            convo_script: [
                ["My great-grandpa fought in Anchorage.", "Did he get a medal?", "He got a t-shirt. It burned in the blast.", "A true American hero."]
            ]
        },
        "Thanksgiving": {
            idle_solo: [
                "Man, I'd kill for some perfectly preserved pie today.", 
                "Who's carving the Rad-Turkey?", 
                "I'm thankful I have ammo.",
                "Pass the Cram, would you?"
            ],
            convo_script: [
                ["What are you thankful for?", "Stimpaks. Rad-X. Headshots.", "Not friends or family?", "Family doesn't cure radiation poisoning."]
            ]
        },
        "Christmas": {
            idle_solo: [
                "Nuclear winter wonderland out here.", 
                "Merry Christmas, you filthy mutants.", 
                "I left some milk and cookies for Santa. The radroaches ate them.",
                "Ho ho ho, I've got a machine gun."
            ],
            convo_script: [
                // THE SINGING TOWERS!
                ["Jingle bells!", "Mutants smell!", "Deathclaw laid an egg!", "The Fat Man blew its target through...", "...and the Raider got away, hey!"],
                ["Deck the halls with Mirelurk shells!", "Fa la la la la, la la la la!", "Tis the season to give them hell!", "Fa la la la la, la la la la!"],
                ["Glowing One, with your nose so bright,", "won't you guide my shot tonight?", "Wait, that's not Rudolph...", "OPEN FIRE!"],
                ["Oh the weather outside is frightful,", "but this fire is so delightful!", "Since we've no place to go,", "Let it glow, let it glow, let it glow!"]
            ]
        },
        "NewYearsEve": {
            idle_solo: [
                "Try to stay alive till midnight, yeah?", 
                "Countdown to another year in the dirt.", 
                "Are those fireworks or orbital strikes?",
                "I'm not making it to midnight, I'm exhausted."
            ],
            convo_script: [
                ["Ten seconds to midnight!", "Do we cheer or take cover?", "Both, just to be safe.", "Happy New Year! Get down!"]
            ]
        }
    },

    getChatter: function(faction, trigger) {
        var pool = [];
        
        // 1. Check for Holiday content
        var hol = this.getCurrentHoliday();
        if (hol && this.holidays[hol]) {
            // If the holiday has the requested trigger (e.g. idle_solo OR convo_script)
            if (this.holidays[hol][trigger]) {
                pool = pool.concat(this.holidays[hol][trigger]);
            }
        }

        // 2. Get Faction specific chatter
        if (this.factions[faction] && this.factions[faction][trigger]) {
            pool = pool.concat(this.factions[faction][trigger]);
        }

        if (pool.length === 0) return "...";
        
        var result = pool[Math.floor(Math.random() * pool.length)];
        
        // --- NEW: Dynamic Script Processing ---
        // Check if the result is a conversation script (an array)
        if (Array.isArray(result)) {
            // Create a new array to avoid modifying the original database
            var processedScript = [];
            for (var i = 0; i < result.length; i++) {
                var line = result[i];
                if (line === "[PC_TIME]") {
                    processedScript.push(this.getFormattedTime());
                } else if (line === "[TIME_REACTION]") {
                    var reactions = this.getTimeReaction();
                    // Pick a random reaction from the returned array
                    processedScript.push(reactions[Math.floor(Math.random() * reactions.length)]);
                } else {
                    processedScript.push(line);
                }
            }
            return processedScript;
        }
        
        return result; // Return the original string if it's not a script
    }
};