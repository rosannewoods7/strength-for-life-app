export const EXERCISE_VIDEO_LIBRARY = [
  { name: 'Goblet Squat', videoUrl: 'https://player.vimeo.com/video/1200233550' },
  { name: 'Romanian Deadlift', videoUrl: 'https://player.vimeo.com/video/1200235000' },
  { name: 'Push-Up or Chest Press', videoUrl: 'https://player.vimeo.com/video/1200240565' },
  { name: 'One-Arm Row', videoUrl: 'https://player.vimeo.com/video/1200241458' },
  { name: "Farmer's Carry", videoUrl: 'https://player.vimeo.com/video/1200235585' },
  { name: 'Plank Shoulder Taps', videoUrl: 'https://player.vimeo.com/video/1199963557' },
  { name: 'Cat-Cow Mobility', videoUrl: 'https://player.vimeo.com/video/1199964093' },
  { name: 'Weighted Step-Up', videoUrl: 'https://player.vimeo.com/video/1200628797' },
  { name: 'Overhead Shoulder Press', videoUrl: 'https://player.vimeo.com/video/1200241899' },
  { name: 'Dumbbell Pullover', videoUrl: 'https://player.vimeo.com/video/1200242299' },
  { name: 'Weighted Glute Bridge', videoUrl: 'https://player.vimeo.com/video/1200236672' },
  { name: 'Dead Bug', videoUrl: 'https://player.vimeo.com/video/1199964415' },
  { name: 'Supine Weighted 90 Degree Toe Touches', videoUrl: 'https://player.vimeo.com/video/1199965056' },
  { name: '90/90 Hip Stretch', videoUrl: 'https://player.vimeo.com/video/1200629533' },
  { name: 'Sumo Squat', videoUrl: 'https://player.vimeo.com/video/1200628467' },
  { name: 'Single-Leg Deadlift', videoUrl: 'https://player.vimeo.com/video/1200236229' },
  { name: 'Low-to-High Band Press', videoUrl: 'https://player.vimeo.com/video/1200243786' },
  { name: 'Face Pull', videoUrl: 'https://player.vimeo.com/video/1200243512' },
  { name: 'Bird-Dog', videoUrl: 'https://player.vimeo.com/video/1199964747' },
  { name: 'Weighted Russian Twists', videoUrl: 'https://player.vimeo.com/video/1199965229' },
  { name: 'Thoracic Rotations', videoUrl: 'https://player.vimeo.com/video/1200629767' },
  { name: 'Reverse Lunge', videoUrl: 'https://player.vimeo.com/video/1246920973' },
  { name: 'Band Lat Pulldown', videoUrl: 'https://player.vimeo.com/video/1246920957' },
  { name: 'Band Pull Through', videoUrl: 'https://player.vimeo.com/video/1246923400' },
  { name: 'Band Pallof Press', videoUrl: 'https://player.vimeo.com/video/1246923135' },
  { name: 'Bulgarian Split Squat (Rear-Foot Elevated)', videoUrl: 'https://player.vimeo.com/video/1246926982' },
  { name: 'Lateral Lunge', videoUrl: 'https://player.vimeo.com/video/1246928840' },
  { name: 'Single-Arm Cable Row', videoUrl: 'https://player.vimeo.com/video/1246932766' },
  { name: 'Half-Kneeling Single-Arm Cable Pulldown', videoUrl: 'https://player.vimeo.com/video/1246920975' },
  { name: 'DB/KB Front-Rack Carry', videoUrl: 'https://player.vimeo.com/video/1246934103' },
  { name: 'Suitcase Carry', videoUrl: 'https://player.vimeo.com/video/1246920970' },
  { name: 'Straight-Arm Cable Pulldown', videoUrl: 'https://player.vimeo.com/video/1246935268' },
  { name: 'Cable Pull-Through', videoUrl: 'https://player.vimeo.com/video/1246920972' },
  { name: 'Hip Thrust', videoUrl: 'https://player.vimeo.com/video/1246920971' },
  { name: 'Trap-Bar Deadlift', videoUrl: 'https://player.vimeo.com/video/1246920965' },
  { name: 'DB Front Squat', videoUrl: 'https://player.vimeo.com/video/1246920977' },
  { name: 'DB Flat Chest Press', videoUrl: 'https://player.vimeo.com/video/1246944078' },
  { name: 'Incline DB Chest Press', videoUrl: 'https://player.vimeo.com/video/1246920974' },
  { name: 'Rowing (Rower Finisher)', videoUrl: 'https://player.vimeo.com/video/1246920976' },
  { name: 'SkiErg (Finisher)', videoUrl: 'https://player.vimeo.com/video/1246920963' },
  { name: 'Battle Ropes (Finisher)', videoUrl: 'https://player.vimeo.com/video/1246920979' },
  { name: 'Step-Up + Knee Drive', videoUrl: 'https://player.vimeo.com/video/1246920966' },
  { name: 'DB Dead Bug', videoUrl: 'https://player.vimeo.com/video/1246920978' },
  { name: 'Staggered-Stance Cable Chest Press', videoUrl: 'https://player.vimeo.com/video/1246920964' },
  { name: 'Cable Lat Pulldown', videoUrl: 'https://player.vimeo.com/video/1246920969' },
  { name: 'Cable Anti-Rotation Hold', videoUrl: 'https://player.vimeo.com/video/1246949254' },
  { name: 'Cable Woodchop', videoUrl: 'https://player.vimeo.com/video/1246920962' },
  { name: 'Cable Rotational Chop', videoUrl: 'https://player.vimeo.com/video/1246949944' },
];

export const getMachineWorkoutsForWeek = (weekNumber, customMachineWorkouts = null) => {
  if (
    customMachineWorkouts &&
    Array.isArray(customMachineWorkouts[weekNumber]) &&
    customMachineWorkouts[weekNumber].length > 0
  ) {
    return customMachineWorkouts[weekNumber];
  }

  // ---------------------------------------------------------
  // MONTHS 1-3 (WEEKS 1-12) — GYM MACHINES TRACK
  // ---------------------------------------------------------
  if (weekNumber <= 12) {
    const phaseNum = weekNumber <= 4 ? 1 : weekNumber <= 8 ? 2 : 3;
    const setsCount = phaseNum === 1 ? 2 : 3;
    const repsRange = phaseNum === 1 ? '12-15' : phaseNum === 2 ? '8-12' : '6-8';

    return [
      {
        id: 'A',
        title: 'Workout A: Machine Foundational Reset',
        exercises: [
          { name: 'Leg Press Machine', sets: setsCount, reps: repsRange, notes: 'Feet hip-width on sled. Lower under control to a comfortable 90° knee bend.' },
          { name: 'Seated or Lying Leg Curl Machine', sets: setsCount, reps: repsRange, notes: 'Control the return (3-second eccentric). Keep hips pressed against pad.' },
          { name: 'Seated Machine Chest Press', sets: setsCount, reps: repsRange, notes: 'Set handles at mid-chest height. Keep shoulders down away from ears.' },
          { name: 'Seated Cable Row', sets: setsCount, reps: repsRange, notes: 'Sit tall, pull handle to lower ribs, squeeze shoulder blades together.', videoUrl: 'https://player.vimeo.com/video/1246932766' },
          { name: 'Seated Machine Shoulder Press', sets: setsCount, reps: repsRange, notes: 'Press smoothly overhead while keeping back supported against pad.' },
          { name: 'Cable or Band Pallof Press', sets: setsCount, reps: '10-12/side', notes: 'Stand tall, press handle straight out from chest and resist rotation.', videoUrl: 'https://player.vimeo.com/video/1246923135' },
          { name: 'Seated Cat-Cow & Spinal Mobility', sets: 2, reps: '10', notes: 'Floor-free spinal flexion and extension seated tall on a bench.', videoUrl: 'https://player.vimeo.com/video/1199964093' },
        ],
      },
      {
        id: 'B',
        title: 'Workout B: Machine Structural Balance',
        exercises: [
          { name: 'Seated Leg Extension Machine', sets: setsCount, reps: repsRange, notes: 'Pause 1 second at the top to strengthen quadriceps and knee stability.' },
          { name: 'Cable Lat Pulldown', sets: setsCount, reps: repsRange, notes: 'Pull bar to upper chest, driving elbows down and back.', videoUrl: 'https://player.vimeo.com/video/1246920969' },
          { name: 'Incline Machine Chest Press (or Pec Deck)', sets: setsCount, reps: repsRange, notes: 'Controlled stretch, smooth press without locking out elbows.' },
          { name: 'Cable Pull-Through (or Glute Bridge Machine)', sets: setsCount, reps: repsRange, notes: 'Hinge at hips and squeeze glutes at the top.', videoUrl: 'https://player.vimeo.com/video/1246920972' },
          { name: 'Chest-Supported Machine Row (or One-Arm Cable Row)', sets: setsCount, reps: repsRange, notes: 'Keep torso braced, drive elbows back.', videoUrl: 'https://player.vimeo.com/video/1246932766' },
          { name: 'Cable Anti-Rotation Hold', sets: setsCount, reps: '20-30 Sec/side', notes: 'Brace core and hold cable handle steady in front of sternum.', videoUrl: 'https://player.vimeo.com/video/1246949254' },
          { name: 'Seated Figure-4 Hip Stretch', sets: 2, reps: '45 Sec/side', notes: 'Floor-free hip mobility stretch seated on bench.', videoUrl: 'https://player.vimeo.com/video/1200629533' },
        ],
      },
      {
        id: 'C',
        title: 'Workout C: Machine Dynamic Strength',
        exercises: [
          { name: 'Wide-Stance Leg Press', sets: setsCount, reps: repsRange, notes: 'Wider foot placement with toes turned out 15° to target glutes and hips.' },
          { name: 'Seated Leg Curl Machine', sets: setsCount, reps: repsRange, notes: 'Drive heels back smoothly, pause briefly, and control the return.' },
          { name: 'Staggered-Stance Cable Chest Press', sets: setsCount, reps: repsRange, notes: 'Split stance for balance, press cables forward with control.', videoUrl: 'https://player.vimeo.com/video/1246920964' },
          { name: 'Straight-Arm Cable Pulldown', sets: setsCount, reps: repsRange, notes: 'Keep arms straight, sweep bar down to thighs using lats.', videoUrl: 'https://player.vimeo.com/video/1246935268' },
          { name: 'Cable or Band Face Pull', sets: setsCount, reps: repsRange, notes: 'Pull rope toward forehead, finishing in a double bicep pose.', videoUrl: 'https://player.vimeo.com/video/1200243512' },
          { name: 'Standing Cable Woodchop', sets: setsCount, reps: '10-12/side', notes: 'Rotate smoothly through core and hips.', videoUrl: 'https://player.vimeo.com/video/1246920962', secondaryVideoUrl: 'https://player.vimeo.com/video/1246949944' },
          { name: 'Seated Thoracic Rotations', sets: 2, reps: '8/side', notes: 'Floor-free upper back mobility finisher.', videoUrl: 'https://player.vimeo.com/video/1200629767' },
        ],
      },
    ];
  }

  // ---------------------------------------------------------
  // MONTH 4: BUILD (WEEKS 13-16) — GYM MACHINES TRACK
  // ---------------------------------------------------------
  if (weekNumber >= 13 && weekNumber <= 16) {
    const sets = weekNumber <= 14 ? '2-3' : weekNumber === 15 ? '3' : '3-4';
    const rpe = weekNumber <= 14 ? 'RPE 7' : weekNumber === 15 ? 'RPE 8' : 'RPE 8-9 (final set)';

    return [
      {
        id: 'A',
        title: 'Workout A: Machine Squat + Horizontal Push/Pull',
        exercises: [
          { name: 'Leg Press Machine', sets, reps: '12-15', notes: rpe },
          { name: 'Seated Machine Chest Press', sets, reps: '10-15', notes: rpe },
          { name: 'Seated Cable Row', sets, reps: '12-15', notes: rpe, videoUrl: 'https://player.vimeo.com/video/1246932766' },
          { name: 'Seated or Lying Leg Curl Machine', sets: '3', reps: '12', notes: rpe },
          { name: 'Seated Leg Extension Machine', sets: '3', reps: '12', notes: rpe },
          { name: 'Cable Pallof Press', sets: '3', reps: '10-12/side', notes: rpe, videoUrl: 'https://player.vimeo.com/video/1246923135' },
          { name: 'Finisher: Rower or SkiErg', sets: '5', reps: '30 sec', notes: '30 sec purposeful / 30 sec easy.', videoUrl: 'https://player.vimeo.com/video/1246920976', secondaryVideoUrl: 'https://player.vimeo.com/video/1246920963' },
        ],
      },
      {
        id: 'B',
        title: 'Workout B: Machine Unilateral + Vertical Push/Pull',
        exercises: [
          { name: 'Single-Leg Press (or Assisted Step-Up)', sets: '3', reps: '10-12/side', notes: rpe },
          { name: 'Half-Kneeling or Seated Single-Arm Cable Pulldown', sets: '3', reps: '12/side', notes: rpe, videoUrl: 'https://player.vimeo.com/video/1246920975' },
          { name: 'Seated Machine Shoulder Press', sets: '3', reps: '10-12', notes: rpe },
          { name: 'Glute Bridge Machine (or Cable Pull-Through)', sets: '3', reps: '12-15', notes: rpe, videoUrl: 'https://player.vimeo.com/video/1246920972' },
          { name: 'One-Arm Cable Row', sets: '3', reps: '12/side', notes: rpe, videoUrl: 'https://player.vimeo.com/video/1246932766' },
          { name: 'Cable Anti-Rotation Hold', sets: '3', reps: '25 sec/side', notes: rpe, videoUrl: 'https://player.vimeo.com/video/1246949254' },
          { name: 'Finisher: Stationary Bike or Incline Walk', sets: '5', reps: '30 sec', notes: '30 sec brisk effort / 30 sec easy recovery.' },
        ],
      },
      {
        id: 'C',
        title: 'Workout C: Machine Total-Body Capacity',
        exercises: [
          { name: 'Wide-Stance Leg Press', sets: '3', reps: '15', notes: rpe },
          { name: 'Incline Machine Chest Press', sets: '3', reps: '12', notes: rpe },
          { name: 'Cable Lat Pulldown', sets: '3', reps: '12', notes: rpe, videoUrl: 'https://player.vimeo.com/video/1246920969' },
          { name: 'Seated Leg Curl Machine', sets: '3', reps: '12', notes: rpe },
          { name: 'Seated Hip Abduction / Adduction Machine', sets: '3', reps: '12-15', notes: rpe },
          { name: 'Cable Rotational Chop', sets: '3', reps: '10/side', notes: rpe, videoUrl: 'https://player.vimeo.com/video/1246949944', secondaryVideoUrl: 'https://player.vimeo.com/video/1246920962' },
          { name: 'Finisher: Battle Ropes or SkiErg', sets: '6', reps: '20 sec', notes: '40 sec recovery.', videoUrl: 'https://player.vimeo.com/video/1246920979', secondaryVideoUrl: 'https://player.vimeo.com/video/1246920963' },
        ],
      },
    ];
  }

  // ---------------------------------------------------------
  // MONTH 5: INTENSIFY (WEEKS 17-20) — GYM MACHINES TRACK
  // ---------------------------------------------------------
  if (weekNumber >= 17 && weekNumber <= 20) {
    const sets = weekNumber === 20 ? '3-4' : '4';
    const reps = weekNumber === 17 ? '6-8' : weekNumber === 18 ? '6' : '5-6';
    const rpe = weekNumber === 17 ? 'RPE 7-8' : weekNumber === 18 ? 'RPE 8' : 'RPE 8-9';

    return [
      {
        id: 'A',
        title: 'Workout A: Machine Lower & Push Strength',
        exercises: [
          { name: 'Leg Press Machine', sets, reps, notes: `Primary Lift. ${rpe}. Rest 2-3 mins.` },
          { name: 'Seated Machine Chest Press', sets, reps, notes: `Primary Lift. ${rpe}. Rest 2-3 mins.` },
          { name: 'Seated Cable Row', sets, reps: '6-8', notes: 'Accessory. Rest 90-120s.', videoUrl: 'https://player.vimeo.com/video/1246932766' },
          { name: 'Seated or Lying Leg Curl Machine', sets: '3', reps: '6-8', notes: 'Accessory. Rest 90-120s.' },
          { name: 'Seated Leg Extension Machine', sets: '3', reps: '8', notes: 'Accessory. Rest 90-120s.' },
          { name: 'Cable Pallof Press', sets: '3', reps: '8/side', notes: 'Accessory. Rest 90-120s.', videoUrl: 'https://player.vimeo.com/video/1246923135' },
        ],
      },
      {
        id: 'B',
        title: 'Workout B: Machine Posterior & Overhead Strength',
        exercises: [
          { name: 'Glute Drive Machine (or Heavy Cable Pull-Through)', sets, reps, notes: `Primary Lift. ${rpe}. Rest 2-3 mins.`, videoUrl: 'https://player.vimeo.com/video/1246920972' },
          { name: 'Seated Machine Shoulder Press', sets, reps: '6-8', notes: `Primary Lift. ${rpe}. Rest 2-3 mins.` },
          { name: 'Cable Lat Pulldown', sets: '4', reps: '6-8', notes: 'Accessory. Rest 90-120s.', videoUrl: 'https://player.vimeo.com/video/1246920969' },
          { name: 'Single-Leg Press', sets: '3', reps: '6-8/side', notes: 'Accessory. Rest 90-120s.' },
          { name: 'One-Arm Cable Row', sets: '3', reps: '6-8/side', notes: 'Accessory. Rest 90-120s.', videoUrl: 'https://player.vimeo.com/video/1246932766' },
          { name: 'Cable Anti-Rotation Hold', sets: '3', reps: '20-30 sec/side', notes: 'Accessory. Rest 90-120s.', videoUrl: 'https://player.vimeo.com/video/1246949254' },
        ],
      },
      {
        id: 'C',
        title: 'Workout C: Machine Total-Body Strength',
        exercises: [
          { name: 'Wide-Stance Leg Press', sets: '4', reps: '6-8', notes: `Primary Lift. ${rpe}. Rest 2-3 mins.` },
          { name: 'Incline Machine Chest Press', sets: '4', reps: '6-8', notes: `Primary Lift. ${rpe}. Rest 2-3 mins.` },
          { name: 'Straight-Arm Cable Pulldown', sets: '3', reps: '8', notes: 'Accessory. Rest 90-120s.', videoUrl: 'https://player.vimeo.com/video/1246935268' },
          { name: 'Seated Leg Curl Machine', sets: '3', reps: '6-8', notes: 'Accessory. Rest 90-120s.' },
          { name: 'Cable Face Pull', sets: '3', reps: '8-10', notes: 'Accessory. Rest 90-120s.', videoUrl: 'https://player.vimeo.com/video/1200243512' },
          { name: 'Cable Rotational Chop', sets: '3', reps: '8/side', notes: 'Accessory. Rest 90-120s.', videoUrl: 'https://player.vimeo.com/video/1246949944' },
        ],
      },
    ];
  }

  // ---------------------------------------------------------
  // MONTH 6: EXPRESS (WEEKS 21-24) — GYM MACHINES TRACK
  // ---------------------------------------------------------
  if (weekNumber >= 21 && weekNumber <= 24) {
    const powerSets = weekNumber === 24 ? '3-4' : weekNumber === 21 ? '3' : '4';
    const powerReps = weekNumber === 24 ? '4-5' : '5';

    return [
      {
        id: 'A',
        title: 'Workout A: Machine Lower-Body & Push Power',
        exercises: [
          { name: 'POWER 1 — Fast Leg Press Drive (Control down, fast push up)', sets: powerSets, reps: powerReps, notes: 'Moderate load (50-60%). Explode smoothly through mid-foot without locking knees.' },
          { name: 'POWER 2 — Staggered-Stance Fast Cable Chest Press', sets: powerSets, reps: powerReps, notes: 'Punch handles forward rapidly, return slowly under control.', videoUrl: 'https://player.vimeo.com/video/1246920964' },
          { name: 'Leg Press Machine (Strength Load)', sets: '4', reps: '5-6', notes: 'Strength. Controlled descent, strong drive up.' },
          { name: 'Seated Cable Row', sets: '3', reps: '6-8', notes: 'Strength.', videoUrl: 'https://player.vimeo.com/video/1246932766' },
          { name: 'Seated Leg Curl Machine', sets: '3', reps: '6-8', notes: 'Strength.' },
          { name: 'Cable Pallof Press', sets: '3', reps: '8/side', notes: 'Core stability.', videoUrl: 'https://player.vimeo.com/video/1246923135' },
        ],
      },
      {
        id: 'B',
        title: 'Workout B: Machine Hip & Vertical Power',
        exercises: [
          { name: 'POWER 1 — Fast Cable Pull-Through', sets: powerSets, reps: powerReps, notes: 'Crisp hip extension snap, controlled hinge back.', videoUrl: 'https://player.vimeo.com/video/1246920972' },
          { name: 'POWER 2 — Fast Straight-Arm Cable Lat Pulldown', sets: powerSets, reps: powerReps, notes: 'Explosive lat sweep down to thighs, 2-second return.', videoUrl: 'https://player.vimeo.com/video/1246935268' },
          { name: 'Seated Machine Shoulder Press', sets: '3', reps: '6-8', notes: 'Strength.' },
          { name: 'Cable Lat Pulldown', sets: '3', reps: '6-8', notes: 'Strength.', videoUrl: 'https://player.vimeo.com/video/1246920969' },
          { name: 'Seated Leg Extension Machine', sets: '3', reps: '8', notes: 'Strength.' },
          { name: 'Cable Anti-Rotation Hold', sets: '3', reps: '25 sec/side', notes: 'Core stability.', videoUrl: 'https://player.vimeo.com/video/1246949254' },
        ],
      },
      {
        id: 'C',
        title: 'Workout C: Machine Rotational Power & Total-Body Strength',
        exercises: [
          { name: 'POWER 1 — Fast Cable Woodchop', sets: powerSets, reps: `${powerReps}/side`, notes: 'Fast rotational drive, slow controlled return.', videoUrl: 'https://player.vimeo.com/video/1246920962' },
          { name: 'POWER 2 — Fast Cable Rotational Chop', sets: powerSets, reps: `${powerReps}/side`, notes: 'Pivot smoothly through hips and core.', videoUrl: 'https://player.vimeo.com/video/1246949944' },
          { name: 'Wide-Stance Leg Press', sets: '3', reps: '6-8', notes: 'Strength.' },
          { name: 'Seated Machine Chest Press', sets: '3', reps: '6-8', notes: 'Strength.' },
          { name: 'One-Arm Cable Row', sets: '3', reps: '6-8/side', notes: 'Strength.', videoUrl: 'https://player.vimeo.com/video/1246932766' },
          { name: 'Seated Leg Curl Machine', sets: '3', reps: '8', notes: 'Strength.' },
        ],
      },
    ];
  }

  return [];
};

export const getWorkoutsForWeek = (weekNumber, customWorkouts = null) => {
  if (
    customWorkouts &&
    Array.isArray(customWorkouts[weekNumber]) &&
    customWorkouts[weekNumber].length > 0
  ) {
    return customWorkouts[weekNumber];
  }

  // ---------------------------------------------------------
  // MONTHS 1-3 (WEEKS 1-12)
  // ---------------------------------------------------------
  if (weekNumber <= 12) {
    const phaseNum = weekNumber <= 4 ? 1 : (weekNumber <= 8 ? 2 : 3);
    
    const getReps = () => {
      if (phaseNum === 1) return '12-15';
      if (phaseNum === 2) return '8-12';
      return '6-8';
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
          { name: 'Cat-Cow Mobility', sets: 2, reps: '10', notes: 'Cool down and spinal flexion.', videoUrl: 'https://player.vimeo.com/video/1199964093' }
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
          { name: 'Supine Weighted 90 Degree Toe Touches', sets: phaseNum === 1 ? 2 : 3, reps: '12-15', notes: 'Crunch up to touch toes, legs straight.', videoUrl: 'https://player.vimeo.com/video/1199965056' },
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
          { name: 'DB Front/Goblet Squat', sets: getSets(), reps: '12-15', notes: getRPE(), videoUrl: 'https://player.vimeo.com/video/1246920977' },
          { name: 'DB Bench Press', sets: getSets(), reps: '10-15', notes: getRPE(), videoUrl: 'https://player.vimeo.com/video/1246944078' },
          { name: 'Seated Cable Row', sets: getSets(), reps: '12-15', notes: getRPE(), videoUrl: 'https://player.vimeo.com/video/1246932766' },
          { name: 'DB Romanian Deadlift', sets: '3', reps: '12', notes: getRPE(), videoUrl: 'https://player.vimeo.com/video/1200235000' },
          { name: 'Reverse Lunge', sets: '3', reps: '10/side', notes: getRPE(), videoUrl: 'https://player.vimeo.com/video/1246920973' },
          { name: 'Pallof Press', sets: '3', reps: '10-12/side', notes: getRPE(), videoUrl: 'https://player.vimeo.com/video/1246923135' },
          { name: 'Farmer Carry', sets: '3', reps: '30-45 sec', notes: getRPE(), videoUrl: 'https://player.vimeo.com/video/1200235585' },
          { name: 'Finisher: Rower or SkiErg', sets: '5', reps: '30 sec', notes: '30 sec purposeful / 30 sec easy.', videoUrl: 'https://player.vimeo.com/video/1246920976', secondaryVideoUrl: 'https://player.vimeo.com/video/1246920963' }
        ]
      },
      {
        id: 'B',
        title: 'Workout B: Unilateral + Vertical Push/Pull',
        exercises: [
          { name: 'DB Step-Up', sets: '3', reps: '10-12/side', notes: getRPE(), videoUrl: 'https://player.vimeo.com/video/1200628797' },
          { name: 'Half-Kneeling Single-Arm Cable Pulldown', sets: '3', reps: '12/side', notes: getRPE(), videoUrl: 'https://player.vimeo.com/video/1246920975' },
          { name: 'DB Shoulder Press', sets: '3', reps: '10-12', notes: getRPE(), videoUrl: 'https://player.vimeo.com/video/1200241899' },
          { name: 'Hip Thrust', sets: '3', reps: '12-15', notes: getRPE(), videoUrl: 'https://player.vimeo.com/video/1246920971' },
          { name: 'Supported Single-Arm DB Row', sets: '3', reps: '12/side', notes: getRPE(), videoUrl: 'https://player.vimeo.com/video/1200241458' },
          { name: 'Dead Bug with Pullover', sets: '3', reps: '8-10/side', notes: getRPE(), videoUrl: 'https://player.vimeo.com/video/1246920978' },
          { name: 'Suitcase Carry', sets: '3', reps: '30 sec/side', notes: getRPE(), videoUrl: 'https://player.vimeo.com/video/1246920970' },
          { name: 'Finisher: Sled push', sets: '4-6', reps: 'trips', notes: 'Moderate weight.' }
        ]
      },
      {
        id: 'C',
        title: 'Workout C: Total-Body Capacity',
        exercises: [
          { name: 'Leg Press', sets: '3', reps: '15', notes: getRPE() },
          { name: 'Incline DB Chest Press', sets: '3', reps: '12', notes: getRPE(), videoUrl: 'https://player.vimeo.com/video/1246920974' },
          { name: 'Cable Lat Pulldown', sets: '3', reps: '12', notes: getRPE(), videoUrl: 'https://player.vimeo.com/video/1246920969', secondaryVideoUrl: 'https://player.vimeo.com/video/1246920957' },
          { name: 'KB/DB Deadlift', sets: '3', reps: '12', notes: getRPE(), videoUrl: 'https://player.vimeo.com/video/1246920965' },
          { name: 'Lateral Lunge', sets: '3', reps: '10/side', notes: getRPE(), videoUrl: 'https://player.vimeo.com/video/1246928840' },
          { name: 'Cable Chop', sets: '3', reps: '10/side', notes: getRPE(), videoUrl: 'https://player.vimeo.com/video/1246920962', secondaryVideoUrl: 'https://player.vimeo.com/video/1246949944' },
          { name: 'Front-Rack Carry', sets: '3', reps: '30 sec', notes: getRPE(), videoUrl: 'https://player.vimeo.com/video/1246934103' },
          { name: 'Finisher: Battle ropes', sets: '6', reps: '20 sec', notes: '40 sec recovery.', videoUrl: 'https://player.vimeo.com/video/1246920979' }
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
          { name: 'Squat variation or Leg Press', sets: getSets(), reps: getPrimaryReps(), notes: `Primary Lift. ${getRPE()}. Rest 2-3 mins.`, videoUrl: 'https://player.vimeo.com/video/1246920977' },
          { name: 'DB/Barbell Bench Press', sets: getSets(), reps: getPrimaryReps(), notes: `Primary Lift. ${getRPE()}. Rest 2-3 mins.`, videoUrl: 'https://player.vimeo.com/video/1246944078' },
          { name: 'Seated Cable Row', sets: getSets(), reps: '5-6', notes: `Accessory. Rest 90-120s.`, videoUrl: 'https://player.vimeo.com/video/1246932766' },
          { name: 'Romanian Deadlift', sets: '3', reps: '6', notes: `Accessory. Rest 90-120s.`, videoUrl: 'https://player.vimeo.com/video/1200235000' },
          { name: 'Rear-Foot Elevated Split Squat', sets: '3', reps: '6-8/side', notes: `Accessory. Rest 90-120s.`, videoUrl: 'https://player.vimeo.com/video/1246926982' },
          { name: 'Pallof Press', sets: '3', reps: '8/side', notes: `Accessory. Rest 90-120s.`, videoUrl: 'https://player.vimeo.com/video/1246923135' },
          { name: 'Heavy Farmer Carry', sets: '3', reps: '20-30 m', notes: `Accessory. Rest 90-120s.`, videoUrl: 'https://player.vimeo.com/video/1200235585' }
        ]
      },
      {
        id: 'B',
        title: 'Workout B: Hinge Strength',
        exercises: [
          { name: 'Trap-Bar Deadlift', sets: getSets(), reps: getPrimaryReps(), notes: `Primary Lift. ${getRPE()}. Rest 2-3 mins. (DB/KB regression if needed)`, videoUrl: 'https://player.vimeo.com/video/1246920965' },
          { name: 'DB Shoulder Press', sets: getSets(), reps: '5-6', notes: `Primary Lift. ${getRPE()}. Rest 2-3 mins.`, videoUrl: 'https://player.vimeo.com/video/1200241899' },
          { name: 'Lat Pulldown/Assisted Pull-Up', sets: '4', reps: '5-6', notes: `Accessory. Rest 90-120s.`, videoUrl: 'https://player.vimeo.com/video/1246920969', secondaryVideoUrl: 'https://player.vimeo.com/video/1246920957' },
          { name: 'Hip Thrust', sets: '4', reps: '5-6', notes: `Accessory. Rest 90-120s.`, videoUrl: 'https://player.vimeo.com/video/1246920971' },
          { name: 'Step-Up', sets: '3', reps: '6-8/side', notes: `Accessory. Rest 90-120s.`, videoUrl: 'https://player.vimeo.com/video/1200628797' },
          { name: 'Weighted Dead Bug', sets: '3', reps: '8/side', notes: `Accessory. Rest 90-120s.`, videoUrl: 'https://player.vimeo.com/video/1246920978' },
          { name: 'Heavy Suitcase Carry', sets: '3', reps: '20-30 m/side', notes: `Accessory. Rest 90-120s.`, videoUrl: 'https://player.vimeo.com/video/1246920970' }
        ]
      },
      {
        id: 'C',
        title: 'Workout C: Total-Body Strength',
        exercises: [
          { name: 'Front/Goblet Squat', sets: '4', reps: '5-6', notes: `Primary Lift. ${getRPE()}. Rest 2-3 mins.`, videoUrl: 'https://player.vimeo.com/video/1246920977' },
          { name: 'Incline DB Press', sets: '4', reps: '5-6', notes: `Primary Lift. ${getRPE()}. Rest 2-3 mins.`, videoUrl: 'https://player.vimeo.com/video/1246920974' },
          { name: 'One-Arm Cable Row', sets: '4', reps: '6/side', notes: `Accessory. Rest 90-120s.`, videoUrl: 'https://player.vimeo.com/video/1246932766' },
          { name: 'Single-Leg RDL', sets: '3', reps: '6-8/side', notes: `Accessory. Rest 90-120s.`, videoUrl: 'https://player.vimeo.com/video/1200236229' },
          { name: 'Reverse Lunge', sets: '3', reps: '6-8/side', notes: `Accessory. Rest 90-120s.`, videoUrl: 'https://player.vimeo.com/video/1246920973' },
          { name: 'Cable Anti-Rotation Hold', sets: '3', reps: '20-30 sec/side', notes: `Accessory. Rest 90-120s.`, videoUrl: 'https://player.vimeo.com/video/1246949254' },
          { name: 'Front-Rack Carry', sets: '3', reps: '20-30 m', notes: `Accessory. Rest 90-120s.`, videoUrl: 'https://player.vimeo.com/video/1246934103' }
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
          { name: 'POWER 2 — Upper Push (Choose Track):', sets: weekNumber === 21 ? '3' : '4', reps: weekNumber === 21 ? '5' : '4-5', notes: wkPower.A2, videoUrl: 'https://player.vimeo.com/video/1246920964' },
          { name: 'Squat or Leg Press', sets: '4', reps: '5', notes: `Strength. FAST up, CONTROL down.`, videoUrl: 'https://player.vimeo.com/video/1246920977' },
          { name: 'Seated Row', sets: '3', reps: '6-8', notes: `Strength.`, videoUrl: 'https://player.vimeo.com/video/1246932766' },
          { name: 'Romanian Deadlift', sets: '3', reps: '6', notes: `Strength.`, videoUrl: 'https://player.vimeo.com/video/1200235000' },
          { name: 'Reverse Lunge', sets: '3', reps: '6/side', notes: `Strength.`, videoUrl: 'https://player.vimeo.com/video/1246920973' },
          { name: 'Farmer Carry', sets: '3', reps: '30 m', notes: `Strength.`, videoUrl: 'https://player.vimeo.com/video/1200235585' }
        ]
      },
      {
        id: 'B',
        title: 'Workout B: Hip & Overhead Power',
        exercises: [
          { name: 'POWER 1 — Hip Hinge (Choose Track):', sets: weekNumber === 21 ? '4' : '5', reps: weekNumber === 21 ? '6' : '5', notes: wkPower.B1, videoUrl: 'https://player.vimeo.com/video/1246920972', secondaryVideoUrl: 'https://player.vimeo.com/video/1246923400' },
          { name: 'POWER 2 — Vertical/Overhead (Choose Track):', sets: weekNumber === 21 ? '3' : '4', reps: weekNumber === 21 ? '5' : '4', notes: wkPower.B2, videoUrl: 'https://player.vimeo.com/video/1246935268', secondaryVideoUrl: 'https://player.vimeo.com/video/1246920957' },
          { name: 'Trap-Bar/DB Deadlift', sets: '3', reps: '4-5', notes: `Strength.`, videoUrl: 'https://player.vimeo.com/video/1246920965' },
          { name: 'Lat Pulldown', sets: '3', reps: '6', notes: `Strength.`, videoUrl: 'https://player.vimeo.com/video/1246920969', secondaryVideoUrl: 'https://player.vimeo.com/video/1246920957' },
          { name: 'Step-Up + Knee Drive', sets: '3', reps: '6/side', notes: `Strength.`, videoUrl: 'https://player.vimeo.com/video/1246920966' },
          { name: 'Pallof Press', sets: '3', reps: '8/side', notes: `Strength.`, videoUrl: 'https://player.vimeo.com/video/1246923135' },
          { name: 'Suitcase Carry', sets: '3', reps: '30 m/side', notes: `Strength.`, videoUrl: 'https://player.vimeo.com/video/1246920970' }
        ]
      },
      {
        id: 'C',
        title: 'Workout C: Multidirectional & Rotational Power',
        exercises: [
          { name: 'POWER 1 — Lateral (Choose Track):', sets: weekNumber === 21 ? '3' : '4', reps: weekNumber === 21 ? '5/side' : '4/side', notes: wkPower.C1, videoUrl: 'https://player.vimeo.com/video/1246920966' },
          { name: 'POWER 2 — Rotational (Choose Track):', sets: weekNumber === 21 ? '3' : '4', reps: weekNumber === 21 ? '5/side' : '4/side', notes: wkPower.C2, videoUrl: 'https://player.vimeo.com/video/1246920962', secondaryVideoUrl: 'https://player.vimeo.com/video/1246949944' },
          { name: 'Goblet/Front Squat', sets: '3', reps: '5-6', notes: `Strength.`, videoUrl: 'https://player.vimeo.com/video/1246920977' },
          { name: 'DB Bench Press', sets: '3', reps: '5-6', notes: `Strength.`, videoUrl: 'https://player.vimeo.com/video/1246944078' },
          { name: 'Single-Arm Row', sets: '3', reps: '6/side', notes: `Strength.`, videoUrl: 'https://player.vimeo.com/video/1200241458' },
          { name: 'Single-Leg RDL', sets: '3', reps: '6/side', notes: `Strength.`, videoUrl: 'https://player.vimeo.com/video/1200236229' },
          { name: 'Cable Chop', sets: '3', reps: '6-8/side', notes: `Strength.`, videoUrl: 'https://player.vimeo.com/video/1246949944', secondaryVideoUrl: 'https://player.vimeo.com/video/1246920962' }
        ]
      }
    ];
  }

  return [];
};
