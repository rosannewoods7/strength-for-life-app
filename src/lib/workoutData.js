export const getWorkoutsForWeek = (weekNumber) => {
  // ---------------------------------------------------------
  // MONTHS 1-3 (WEEKS 1-12)
  // ---------------------------------------------------------
  if (weekNumber <= 12) {
    const phaseNum = weekNumber <= 4 ? 1 : (weekNumber <= 8 ? 2 : 3);
    
    const getReps = () => {
      if (phaseNum === 1) return '12-15 Reps (Focus on Form)';
      if (phaseNum === 2) return '8-12 Reps (Build Muscle)';
      return '6-8 Reps (Explosive Power)';
    };

    return [
      {
        id: 'A',
        title: 'Workout A: The Foundational Reset',
        exercises: [
          { name: 'Goblet Squat', sets: phaseNum === 1 ? 2 : 3, reps: getReps(), notes: 'RPE 7-8. Drive through mid-foot.', videoUrl: 'https://player.vimeo.com/video/1200233550' },
          { name: 'Romanian Deadlift', sets: phaseNum === 1 ? 2 : 3, reps: getReps(), notes: 'Hinge at hips, soft knees.', videoUrl: 'https://player.vimeo.com/video/1200235000' },
          { name: 'Push-Up or Chest Press', sets: phaseNum === 1 ? 2 : 3, reps: getReps(), notes: 'Tuck elbows 45 degrees.', videoUrl: 'https://player.vimeo.com/video/1200240565' },
          { name: 'One-Arm Row', sets: phaseNum === 1 ? 2 : 3, reps: getReps(), notes: 'Pull elbow to hip.', videoUrl: 'https://player.vimeo.com/video/1200241458' },
          { name: 'Farmer\'s Carry', sets: phaseNum === 1 ? 2 : 3, reps: phaseNum === 1 ? '30 Sec' : '60 Sec', notes: 'Heavy as possible, ribs tucked.', videoUrl: 'https://player.vimeo.com/video/1200235585' },
          { name: 'Plank Shoulder Taps', sets: phaseNum === 1 ? 2 : 3, reps: '10-12/side', notes: 'Keep hips completely still.', videoUrl: 'https://player.vimeo.com/video/1199963557' },
          { name: 'Cat-Cow Mobility', sets: 2, reps: '10 Reps', notes: 'Cool down and spinal flexion.', videoUrl: 'https://player.vimeo.com/video/1199964093' }
        ]
      },
      {
        id: 'B',
        title: 'Workout B: Structural Balance',
        exercises: [
          { name: 'Weighted Step-Up', sets: phaseNum === 1 ? 2 : 3, reps: getReps(), notes: '3-second negative descent.', videoUrl: 'https://player.vimeo.com/video/1200628797' },
          { name: 'Overhead Shoulder Press', sets: phaseNum === 1 ? 2 : 3, reps: getReps(), notes: 'Keep core braced, ribs down.', videoUrl: 'https://player.vimeo.com/video/1200241899' },
          { name: 'Dumbbell Pullover', sets: phaseNum === 1 ? 2 : 3, reps: getReps(), notes: 'Slow negative, stretch the lats.', videoUrl: 'https://player.vimeo.com/video/1200242299' },
          { name: 'Weighted Glute Bridge', sets: phaseNum === 1 ? 2 : 3, reps: getReps(), notes: 'Squeeze glutes at the top.', videoUrl: 'https://player.vimeo.com/video/1200236672' },
          { name: 'Dead Bug', sets: phaseNum === 1 ? 2 : 3, reps: '10-15/side', notes: 'Lower back glued to floor.', videoUrl: 'https://player.vimeo.com/video/1199964415' },
          { name: 'Supine Weighted 90 Degree Toe Touches', sets: phaseNum === 1 ? 2 : 3, reps: '12-15 Reps', notes: 'Crunch up to touch toes, legs straight.', videoUrl: 'https://player.vimeo.com/video/1199965056' },
          { name: '90/90 Hip Stretch', sets: 2, reps: '60 Sec/side', notes: 'Hip mobility finisher.', videoUrl: 'https://player.vimeo.com/video/1200629533' }
        ]
      },
      {
        id: 'C',
        title: 'Workout C: Dynamic Strength',
        exercises: [
          { name: 'Sumo Squat', sets: phaseNum === 1 ? 2 : 3, reps: getReps(), notes: 'Wide stance, knees track over toes.', videoUrl: 'https://player.vimeo.com/video/1200628467' },
          { name: 'Single-Leg Deadlift', sets: phaseNum === 1 ? 2 : 3, reps: getReps(), notes: 'Body like a seesaw.', videoUrl: 'https://player.vimeo.com/video/1200236229' },
          { name: 'Low-to-High Band Press', sets: phaseNum === 1 ? 2 : 3, reps: getReps(), notes: 'Rotate through hips.', videoUrl: 'https://player.vimeo.com/video/1200243786' },
          { name: 'Face Pull', sets: phaseNum === 1 ? 2 : 3, reps: getReps(), notes: 'Double bicep pose at finish.', videoUrl: 'https://player.vimeo.com/video/1200243512' },
          { name: 'Bird-Dog', sets: phaseNum === 1 ? 2 : 3, reps: '10-15/side', notes: 'Perfectly still torso.', videoUrl: 'https://player.vimeo.com/video/1199964747' },
          { name: 'Weighted Russian Twists', sets: phaseNum === 1 ? 2 : 3, reps: '12-15/side', notes: 'Rotate through core, not just arms.', videoUrl: 'https://player.vimeo.com/video/1199965229' },
          { name: 'Thoracic Rotations', sets: 2, reps: '8/side', notes: 'Upper back mobility finisher.', videoUrl: 'https://player.vimeo.com/video/1200629767' }
        ]
      }
    ];
  }

  // ---------------------------------------------------------
  // MONTH 4: BUILD (WEEKS 13-16)
  // ---------------------------------------------------------
  if (weekNumber >= 13 && weekNumber <= 16) {
    const getSets = () => {
      if (weekNumber <= 14) return '2-3';
      if (weekNumber === 15) return '3';
      return '3-4'; // Week 16
    };
    
    const getRPE = () => {
      if (weekNumber <= 14) return 'RPE 7';
      if (weekNumber === 15) return 'RPE 8';
      return 'RPE 8-9 (final set)'; // Week 16
    };

    return [
      {
        id: 'A',
        title: 'Workout A: Squat + Horizontal Push/Pull',
        exercises: [
          { name: 'DB Front/Goblet Squat', sets: getSets(), reps: '12-15', notes: getRPE() },
          { name: 'DB Bench Press', sets: getSets(), reps: '10-15', notes: getRPE() },
          { name: 'Seated Cable Row', sets: getSets(), reps: '12-15', notes: getRPE() },
          { name: 'DB Romanian Deadlift', sets: '3', reps: '12', notes: getRPE() },
          { name: 'Reverse Lunge', sets: '3', reps: '10/side', notes: getRPE() },
          { name: 'Pallof Press', sets: '3', reps: '10-12/side', notes: getRPE() },
          { name: 'Farmer Carry', sets: '3', reps: '30-45 sec', notes: getRPE() },
          { name: 'Finisher: Rower or SkiErg', sets: '5', reps: '30 sec', notes: '30 sec purposeful / 30 sec easy.' }
        ]
      },
      {
        id: 'B',
        title: 'Workout B: Unilateral + Vertical Push/Pull',
        exercises: [
          { name: 'DB Step-Up', sets: '3', reps: '10-12/side', notes: getRPE() },
          { name: 'Half-Kneeling Single-Arm Cable Pulldown', sets: '3', reps: '12/side', notes: getRPE() },
          { name: 'DB Shoulder Press', sets: '3', reps: '10-12', notes: getRPE() },
          { name: 'Hip Thrust', sets: '3', reps: '12-15', notes: getRPE() },
          { name: 'Supported Single-Arm DB Row', sets: '3', reps: '12/side', notes: getRPE() },
          { name: 'Dead Bug with Pullover', sets: '3', reps: '8-10/side', notes: getRPE() },
          { name: 'Suitcase Carry', sets: '3', reps: '30 sec/side', notes: getRPE() },
          { name: 'Finisher: Sled push', sets: '4-6', reps: 'trips', notes: 'Moderate weight.' }
        ]
      },
      {
        id: 'C',
        title: 'Workout C: Total-Body Capacity',
        exercises: [
          { name: 'Leg Press', sets: '3', reps: '15', notes: getRPE() },
          { name: 'Incline DB Chest Press', sets: '3', reps: '12', notes: getRPE() },
          { name: 'Cable Lat Pulldown', sets: '3', reps: '12', notes: getRPE() },
          { name: 'KB/DB Deadlift', sets: '3', reps: '12', notes: getRPE() },
          { name: 'Lateral Lunge', sets: '3', reps: '10/side', notes: getRPE() },
          { name: 'Cable Chop', sets: '3', reps: '10/side', notes: getRPE() },
          { name: 'Front-Rack Carry', sets: '3', reps: '30 sec', notes: getRPE() },
          { name: 'Finisher: Battle ropes', sets: '6', reps: '20 sec', notes: '40 sec recovery.' }
        ]
      }
    ];
  }

  // ---------------------------------------------------------
  // MONTH 5: INTENSIFY (WEEKS 17-20)
  // ---------------------------------------------------------
  if (weekNumber >= 17 && weekNumber <= 20) {
    const getSets = () => {
      if (weekNumber === 20) return '3-4';
      return '4';
    };
    
    const getPrimaryReps = () => {
      if (weekNumber === 17) return '6';
      if (weekNumber === 18) return '5-6';
      if (weekNumber === 19) return '4-5';
      return '3-5'; // Week 20
    };

    const getRPE = () => {
      if (weekNumber === 17) return 'RPE 7-8';
      if (weekNumber === 18) return 'RPE 8';
      return 'RPE 8-9'; // Weeks 19 & 20
    };

    return [
      {
        id: 'A',
        title: 'Workout A: Squat Strength',
        exercises: [
          { name: 'Squat variation or Leg Press', sets: getSets(), reps: getPrimaryReps(), notes: `Primary Lift. ${getRPE()}. Rest 2-3 mins.` },
          { name: 'DB/Barbell Bench Press', sets: getSets(), reps: getPrimaryReps(), notes: `Primary Lift. ${getRPE()}. Rest 2-3 mins.` },
          { name: 'Seated Cable Row', sets: getSets(), reps: '5-6', notes: `Accessory. Rest 90-120s.` },
          { name: 'Romanian Deadlift', sets: '3', reps: '6', notes: `Accessory. Rest 90-120s.` },
          { name: 'Rear-Foot Elevated Split Squat', sets: '3', reps: '6-8/side', notes: `Accessory. Rest 90-120s.` },
          { name: 'Pallof Press', sets: '3', reps: '8/side', notes: `Accessory. Rest 90-120s.` },
          { name: 'Heavy Farmer Carry', sets: '3', reps: '20-30 m', notes: `Accessory. Rest 90-120s.` }
        ]
      },
      {
        id: 'B',
        title: 'Workout B: Hinge Strength',
        exercises: [
          { name: 'Trap-Bar Deadlift', sets: getSets(), reps: getPrimaryReps(), notes: `Primary Lift. ${getRPE()}. Rest 2-3 mins. (DB/KB regression if needed)` },
          { name: 'DB Shoulder Press', sets: getSets(), reps: '5-6', notes: `Primary Lift. ${getRPE()}. Rest 2-3 mins.` },
          { name: 'Lat Pulldown/Assisted Pull-Up', sets: '4', reps: '5-6', notes: `Accessory. Rest 90-120s.` },
          { name: 'Hip Thrust', sets: '4', reps: '5-6', notes: `Accessory. Rest 90-120s.` },
          { name: 'Step-Up', sets: '3', reps: '6-8/side', notes: `Accessory. Rest 90-120s.` },
          { name: 'Weighted Dead Bug', sets: '3', reps: '8/side', notes: `Accessory. Rest 90-120s.` },
          { name: 'Heavy Suitcase Carry', sets: '3', reps: '20-30 m/side', notes: `Accessory. Rest 90-120s.` }
        ]
      },
      {
        id: 'C',
        title: 'Workout C: Total-Body Strength',
        exercises: [
          { name: 'Front/Goblet Squat', sets: '4', reps: '5-6', notes: `Primary Lift. ${getRPE()}. Rest 2-3 mins.` },
          { name: 'Incline DB Press', sets: '4', reps: '5-6', notes: `Primary Lift. ${getRPE()}. Rest 2-3 mins.` },
          { name: 'One-Arm Cable Row', sets: '4', reps: '6/side', notes: `Accessory. Rest 90-120s.` },
          { name: 'Single-Leg RDL', sets: '3', reps: '6-8/side', notes: `Accessory. Rest 90-120s.` },
          { name: 'Reverse Lunge', sets: '3', reps: '6-8/side', notes: `Accessory. Rest 90-120s.` },
          { name: 'Cable Anti-Rotation Hold', sets: '3', reps: '20-30 sec/side', notes: `Accessory. Rest 90-120s.` },
          { name: 'Front-Rack Carry', sets: '3', reps: '20-30 m', notes: `Accessory. Rest 90-120s.` }
        ]
      }
    ];
  }

  // ---------------------------------------------------------
  // MONTH 6: EXPRESS (WEEKS 21-24)
  // ---------------------------------------------------------
  if (weekNumber >= 21 && weekNumber <= 24) {
    const powerSets = weekNumber === 24 ? '3-4' : weekNumber === 21 ? '3' : '4';
    const powerReps = weekNumber === 24 ? '3-4' : '3-5';

    // Distinct, progressive Power prescriptions by Week (21: Learn, 22: Accelerate, 23: Challenge, 24: Express)
    // Includes non-box-jump alternatives (Broad Jump, Drop Squat, Vertical Reach) for anyone who prefers not to jump onto a box.
    const powerByWeek = {
      21: {
        A1: `Foundational: Fast Sit-to-Stand (Stand rapidly, lower under control)\nStandard: Pogo Hops or Small Squat Jump (Stick landing)\nAdvanced: Countermovement Jump (Stick landing & reset)`,
        A2: `Foundational: Fast Incline Push-Up or Band Chest Press\nStandard: Tall-Kneeling Med-Ball Chest Pass\nAdvanced: Standing Med-Ball Chest Pass`,
        B1: `Foundational: Fast Cable or Band Pull-Through\nStandard: Kettlebell Hike-to-Deadlift (Crisp hip snap)\nAdvanced: Two-Hand Kettlebell Swing`,
        B2: `Foundational: Fast Straight-Arm Cable/Band Lat Pulldown\nStandard: Overhead Med-Ball Slam\nAdvanced: DB Push Press (Explosive leg drive)`,
        C1: `Foundational: Quick Lateral Step + Stick\nStandard: Low Lateral Line Hops (Soft, controlled contacts)\nAdvanced: Lateral Bound (Skater) + Stick`,
        C2: `Foundational: Fast Cable or Band Woodchop\nStandard: Standing Med-Ball Scoop Toss\nAdvanced: Rotational Med-Ball Slam`,
      },
      22: {
        A1: `Foundational: Rapid Bodyweight Squat (Rise onto toes at top)\nStandard: Countermovement Jump (Focus on vertical speed)\nAdvanced: Broad Jump + Stick (or Low Box Jump w/ Step-Down)`,
        A2: `Foundational: Fast Cable Chest Press (Explosive press, slow return)\nStandard: Standing Med-Ball Chest Pass\nAdvanced: Explosive Incline Push-Up (Hands release softly)`,
        B1: `Foundational: Fast Glute Bridge Drive (Explosive hip extension)\nStandard: Two-Hand Kettlebell Swing\nAdvanced: Powerful KB Swing (Maximum hip snap & float)`,
        B2: `Foundational: Fast Light DB Push Press\nStandard: Overhead Med-Ball Slam (Full triple extension)\nAdvanced: Heavy Med-Ball Slam or Split-Stance DB Push Press`,
        C1: `Foundational: Fast Lateral Step-Up\nStandard: Lateral Bound (Skater) + Stick\nAdvanced: Wider Lateral Bound + 2-Sec Stick`,
        C2: `Foundational: Fast Low-to-High Cable/Band Lift\nStandard: Standing Med-Ball Rotational Throw\nAdvanced: Step-Behind Med-Ball Rotational Throw`,
      },
      23: {
        A1: `Foundational: Light Goblet Fast Sit-to-Stand\nStandard: Squat Jump with Overhead Reach\nAdvanced: Snap-Down (Drop Squat) to Vertical Jump (or Low Box Jump)`,
        A2: `Foundational: Staggered-Stance Fast Cable Chest Press\nStandard: Explosive Push-Up from Bench or Med-Ball Step + Chest Pass\nAdvanced: Single-Arm Med-Ball Shot Put Press`,
        B1: `Foundational: Fast DB Hip Hinge / RDL Snap\nStandard: Short Broad Jump (Stick landing with control)\nAdvanced: Broad Jump for Distance (or Single-Arm KB Swing)`,
        B2: `Foundational: Fast Alternating DB Overhead Press\nStandard: Tall-Kneeling Overhead Med-Ball Slam\nAdvanced: Rotational Rainbow Med-Ball Slam`,
        C1: `Foundational: Lateral Step-Up + Knee Drive\nStandard: Continuous Skater Bounds\nAdvanced: Single-Leg Forward/Lateral Hop + Stick`,
        C2: `Foundational: Fast Split-Stance Cable Rotation\nStandard: Step-Behind Med-Ball Rotational Throw\nAdvanced: Continuous Med-Ball Rotational Wall Throws`,
      },
      24: {
        A1: `Foundational: Explosive Goblet Squat-to-Calf Raise\nStandard: Crisp Countermovement Jump (Highest quality reps)\nAdvanced: Continuous Rebound Jumps or Drop-Squat to Broad Jump`,
        A2: `Foundational: Fast Dual-Arm Cable Chest Press\nStandard: Max-Intent Med-Ball Chest Pass\nAdvanced: Plyo Bench Push-Up or Reactive Med-Ball Chest Pass`,
        B1: `Foundational: High-Intent Cable Pull-Through\nStandard: Crisp Kettlebell Swing or Controlled Broad Jump\nAdvanced: Broad Jump into Immediate Vertical Jump (or Heavy KB Swing)`,
        B2: `Foundational: Crisp DB Push Press\nStandard: Max-Intent Overhead Med-Ball Slam\nAdvanced: Explosive DB Push Jerk or Slam-to-Jump Combo`,
        C1: `Foundational: Explosive Step-Up + High Knee Drive\nStandard: Dynamic Skater Bounds (Crisp & controlled)\nAdvanced: 90-Degree Multidirectional Bound + Stick`,
        C2: `Foundational: Max-Intent Cable Woodchop\nStandard: Crisp Med-Ball Rotational Throw\nAdvanced: Explosive Step-Behind Rotational Shot Put`,
      },
    };

    const wkPower = powerByWeek[weekNumber] || powerByWeek[21];

    return [
      {
        id: 'A',
        title: 'Workout A: Lower-Body & Vertical Power',
        exercises: [
          { name: 'POWER 1 — Lower Vertical (Choose Track):', sets: powerSets, reps: powerReps, notes: wkPower.A1 },
          { name: 'POWER 2 — Upper Push (Choose Track):', sets: weekNumber === 21 ? '3' : '4', reps: weekNumber === 21 ? '5' : '4-5', notes: wkPower.A2 },
          { name: 'Squat or Leg Press', sets: '4', reps: '5', notes: `Strength. FAST up, CONTROL down.` },
          { name: 'Seated Row', sets: '3', reps: '6-8', notes: `Strength.` },
          { name: 'Romanian Deadlift', sets: '3', reps: '6', notes: `Strength.` },
          { name: 'Reverse Lunge', sets: '3', reps: '6/side', notes: `Strength.` },
          { name: 'Farmer Carry', sets: '3', reps: '30 m', notes: `Strength.` }
        ]
      },
      {
        id: 'B',
        title: 'Workout B: Hip & Overhead Power',
        exercises: [
          { name: 'POWER 1 — Hip Hinge (Choose Track):', sets: weekNumber === 21 ? '4' : '5', reps: weekNumber === 21 ? '6' : '5', notes: wkPower.B1 },
          { name: 'POWER 2 — Vertical/Overhead (Choose Track):', sets: weekNumber === 21 ? '3' : '4', reps: weekNumber === 21 ? '5' : '4', notes: wkPower.B2 },
          { name: 'Trap-Bar/DB Deadlift', sets: '3', reps: '4-5', notes: `Strength.` },
          { name: 'Lat Pulldown', sets: '3', reps: '6', notes: `Strength.` },
          { name: 'Step-Up + Knee Drive', sets: '3', reps: '6/side', notes: `Strength.` },
          { name: 'Pallof Press', sets: '3', reps: '8/side', notes: `Strength.` },
          { name: 'Suitcase Carry', sets: '3', reps: '30 m/side', notes: `Strength.` }
        ]
      },
      {
        id: 'C',
        title: 'Workout C: Multidirectional & Rotational Power',
        exercises: [
          { name: 'POWER 1 — Lateral (Choose Track):', sets: weekNumber === 21 ? '3' : '4', reps: weekNumber === 21 ? '5/side' : '4/side', notes: wkPower.C1 },
          { name: 'POWER 2 — Rotational (Choose Track):', sets: weekNumber === 21 ? '3' : '4', reps: weekNumber === 21 ? '5/side' : '4/side', notes: wkPower.C2 },
          { name: 'Goblet/Front Squat', sets: '3', reps: '5-6', notes: `Strength.` },
          { name: 'DB Bench Press', sets: '3', reps: '5-6', notes: `Strength.` },
          { name: 'Single-Arm Row', sets: '3', reps: '6/side', notes: `Strength.` },
          { name: 'Single-Leg RDL', sets: '3', reps: '6/side', notes: `Strength.` },
          { name: 'Cable Chop', sets: '3', reps: '6-8/side', notes: `Strength.` }
        ]
      }
    ];
  }

  return [];
};
