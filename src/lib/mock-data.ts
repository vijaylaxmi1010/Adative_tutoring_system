import { Topic, Question, TopicContent } from '@/types';

export const TOPICS: Topic[] = [
  {
    id: 'LA-01',
    name: 'Foundational Geometric Elements',
    subtopics: ['Point', 'Line segment', 'Ray', 'Straight line'],
    layer: 1,
    track: 'geometry',
    difficulty: 0.1,
    prerequisites: [],
    description: 'Discover the building blocks of geometry — points, lines, rays, and line segments that form the foundation of all geometric shapes.',
    color: 'indigo',
  },
  {
    id: 'LA-02',
    name: 'Anatomy of Angles',
    subtopics: ['Vertex', 'Arms', 'Degree', 'Protractor'],
    layer: 2,
    track: 'geometry',
    difficulty: 0.3,
    prerequisites: ['LA-01'],
    description: 'Explore what makes up an angle — its vertex, arms, and how we measure degrees using a protractor.',
    color: 'indigo',
  },
  {
    id: 'PC-01',
    name: 'Compass and Ruler Basics',
    subtopics: ['Compass', 'Ruler', 'Curves', 'Precision'],
    layer: 2,
    track: 'construction',
    difficulty: 0.3,
    prerequisites: ['LA-01'],
    description: 'Learn to use compass and ruler — the essential tools for precise geometric construction.',
    color: 'amber',
  },
  {
    id: 'LA-03',
    name: 'Comparing Angles',
    subtopics: ['Superimposition', 'Equality', 'Rotation'],
    layer: 3,
    track: 'geometry',
    difficulty: 0.4,
    prerequisites: ['LA-02'],
    description: 'Learn how to compare angles using superimposition and understand when two angles are equal.',
    color: 'indigo',
  },
  {
    id: 'PC-02',
    name: 'Circular Constructions',
    subtopics: ['Centre', 'Radius', 'Equidistance'],
    layer: 3,
    track: 'construction',
    difficulty: 0.3,
    prerequisites: ['PC-01'],
    description: 'Master drawing circles and arcs using a compass, understanding centres, radii, and equidistance.',
    color: 'amber',
  },
  {
    id: 'LA-05',
    name: 'Classification of Angles',
    subtopics: ['Acute', 'Right', 'Obtuse', 'Straight', 'Reflex'],
    layer: 4,
    track: 'geometry',
    difficulty: 0.4,
    prerequisites: ['LA-03'],
    description: 'Classify angles into acute, right, obtuse, straight, and reflex based on their degree measures.',
    color: 'indigo',
  },
  {
    id: 'LA-04',
    name: 'Geometric Relationships',
    subtopics: ['Intersecting', 'Perpendicular', 'Chakra spokes'],
    layer: 4,
    track: 'geometry',
    difficulty: 0.5,
    prerequisites: ['PC-02', 'LA-03'],
    description: 'Understand how lines relate to each other — intersecting lines, perpendicular lines, and spoke-like patterns in circles.',
    color: 'indigo',
  },
  {
    id: 'PC-03',
    name: 'Bisectors and Replications',
    subtopics: ['Copy segments', 'Angle bisector', '60deg and 120deg angles'],
    layer: 5,
    track: 'construction',
    difficulty: 0.7,
    prerequisites: ['LA-05', 'LA-04'],
    description: 'Learn to copy line segments, bisect angles, and construct precise 60° and 120° angles with compass and ruler.',
    color: 'amber',
  },
  {
    id: 'PC-04',
    name: 'Quadrilateral Construction',
    subtopics: ['Rectangle via diagonals', 'Square conversion'],
    layer: 6,
    track: 'construction',
    difficulty: 0.8,
    prerequisites: ['PC-03'],
    description: 'Construct rectangles using diagonal properties and convert them to squares with geometric precision.',
    color: 'amber',
  },
  {
    id: 'PC-05',
    name: 'Applied Geometric Art',
    subtopics: ['Composite figures', 'Scale', 'Symmetry'],
    layer: 7,
    track: 'capstone',
    difficulty: 0.9,
    prerequisites: ['PC-04'],
    description: 'Apply all your geometric knowledge to create composite figures, understand scale, and explore symmetry in art.',
    color: 'emerald',
  },
];

export const QUESTIONS: Question[] = [
  // ===== LA-01: Foundational Geometric Elements =====
  // Pre-assessment
  {
    id: 'LA01-PRE-01',
    topicId: 'LA-01',
    subtopic: 'Point',
    text: 'What is a point in geometry?',
    type: 'mcq',
    difficulty: 'easy',
    difficultyScore: 0.1,
    avgTimeSeconds: 20,
    options: ['A dot with no size that marks an exact location', 'A small circle drawn on paper', 'A line that has no ends', 'A shape with four sides'],
    correctAnswer: 'A dot with no size that marks an exact location',
    hints: [
      'Think about the smallest possible geometric object.',
      'A point is like a tiny dot — it has a position but no dimensions.',
      'Geometry starts with the most basic unit: something with no length, width, or height.',
      'A point simply marks a location in space and is named with a capital letter like A or B.',
    ],
    explanation: 'A point is the most basic element in geometry. It represents an exact location in space and has no size, length, or width. We usually label points with capital letters.',
    isPreAssessment: true,
  },
  {
    id: 'LA01-PRE-02',
    topicId: 'LA-01',
    subtopic: 'Line segment',
    text: 'What is the difference between a line segment and a ray?',
    type: 'mcq',
    difficulty: 'medium',
    difficultyScore: 0.4,
    avgTimeSeconds: 30,
    options: [
      'A line segment has two endpoints; a ray has one endpoint and extends infinitely in one direction',
      'A line segment extends infinitely; a ray has two endpoints',
      'A line segment is curved; a ray is straight',
      'There is no difference between them',
    ],
    correctAnswer: 'A line segment has two endpoints; a ray has one endpoint and extends infinitely in one direction',
    hints: [
      'Think about the words: "segment" means a piece, "ray" is like sunlight going outward.',
      'Consider how many endpoints (start/end points) each one has.',
      'A line segment is like a piece of rope with both ends tied down. A ray is like a laser beam: it starts somewhere but keeps going.',
      'Line segment AB has endpoints A and B. Ray AB starts at A and goes through B and beyond, forever.',
    ],
    explanation: 'A line segment has two definite endpoints — it has a fixed length. A ray starts at one endpoint and extends infinitely in one direction, like a ray of sunlight.',
    isPreAssessment: true,
  },
  {
    id: 'LA01-PRE-03',
    topicId: 'LA-01',
    subtopic: 'Straight line',
    text: 'A straight line extends in how many directions?',
    type: 'mcq',
    difficulty: 'hard',
    difficultyScore: 0.7,
    avgTimeSeconds: 25,
    options: ['One direction', 'Two directions infinitely', 'Three directions', 'It stays fixed between two points'],
    correctAnswer: 'Two directions infinitely',
    hints: [
      'Think about whether a line has any endpoints.',
      'Unlike a line segment, a straight line has no starting or ending point.',
      'Imagine a road that goes on forever both left AND right — that is a straight line.',
      'A straight line extends infinitely in both directions. It has no endpoints.',
    ],
    explanation: 'A straight line extends infinitely in both directions. It has no endpoints, unlike a line segment (which has two endpoints) or a ray (which has one endpoint).',
    isPreAssessment: true,
  },
  // Assessment questions
  {
    id: 'LA01-ASS-01',
    topicId: 'LA-01',
    subtopic: 'Point',
    text: 'How many dimensions does a point have?',
    type: 'mcq',
    difficulty: 'easy',
    difficultyScore: 0.15,
    avgTimeSeconds: 15,
    options: ['Zero dimensions', 'One dimension', 'Two dimensions', 'Three dimensions'],
    correctAnswer: 'Zero dimensions',
    hints: [
      'Think: does a point have length? Width? Height?',
      'A point is just a location — it occupies no space at all.',
      'Dimensions include length, width, and height. A point has none of these.',
      'A point has zero dimensions — it is a dimensionless location in space.',
    ],
    explanation: 'A point has zero dimensions. It has no length, width, or height — it is simply a location or position in space.',
    isPreAssessment: false,
  },
  {
    id: 'LA01-ASS-02',
    topicId: 'LA-01',
    subtopic: 'Line segment',
    text: 'Which of these correctly describes a line segment?',
    type: 'mcq',
    difficulty: 'easy',
    difficultyScore: 0.2,
    avgTimeSeconds: 20,
    options: ['Part of a line with two endpoints', 'A line with no endpoints', 'A line that curves', 'Part of a line with one endpoint'],
    correctAnswer: 'Part of a line with two endpoints',
    hints: [
      'The word "segment" means a definite, bounded piece.',
      'A segment must start somewhere and end somewhere.',
      'Think of a ruler — the measured distance from one mark to another is a line segment.',
      'A line segment is the portion of a line between two points, called its endpoints.',
    ],
    explanation: 'A line segment is a part of a line that has two definite endpoints. The distance between the two endpoints is the length of the segment.',
    isPreAssessment: false,
  },
  {
    id: 'LA01-ASS-03',
    topicId: 'LA-01',
    subtopic: 'Ray',
    text: 'Arrange these geometric elements from smallest (most limited) to largest (least limited):',
    type: 'arrange',
    difficulty: 'medium',
    difficultyScore: 0.4,
    avgTimeSeconds: 35,
    options: ['Point', 'Line segment', 'Ray', 'Straight line'],
    correctAnswer: ['Point', 'Line segment', 'Ray', 'Straight line'],
    hints: [
      'Think about which has no extent, which has a fixed length, which has one infinite end, and which goes on forever both ways.',
      'Start with the one that is just a location with no size.',
      'A point → limited to one location. A segment → limited by two endpoints. A ray → limited by one endpoint. A line → unlimited in both directions.',
      'Order: Point (0 extent) → Line segment (finite length) → Ray (infinite in one direction) → Straight line (infinite in both directions).',
    ],
    explanation: 'From most to least limited: Point (no extent) → Line segment (finite, two endpoints) → Ray (one endpoint, infinite in one direction) → Straight line (infinite in both directions).',
    isPreAssessment: false,
  },
  {
    id: 'LA01-ASS-04',
    topicId: 'LA-01',
    subtopic: 'Straight line',
    text: 'True or False: Two distinct points always determine exactly one straight line.',
    type: 'true-false',
    difficulty: 'medium',
    difficultyScore: 0.45,
    avgTimeSeconds: 20,
    options: ['True', 'False'],
    correctAnswer: 'True',
    hints: [
      'Think: if I give you two points on a piece of paper, how many straight lines can pass through BOTH of them?',
      'Try placing two dots and drawing a line through both — is there more than one way to draw it straight?',
      'You can always draw a line between two points, and that line is unique.',
      'The geometric axiom states: through any two distinct points, there passes exactly one straight line.',
    ],
    explanation: 'True. Through any two distinct points, there is exactly one straight line. This is one of the fundamental axioms of Euclidean geometry.',
    isPreAssessment: false,
  },
  {
    id: 'LA01-ASS-05',
    topicId: 'LA-01',
    subtopic: 'Ray',
    text: 'A ray starts at point P and passes through point Q. Which symbol correctly names this ray?',
    type: 'mcq',
    difficulty: 'hard',
    difficultyScore: 0.65,
    avgTimeSeconds: 25,
    options: ['Ray PQ (with arrow above)', 'Ray QP (with arrow above)', 'Line segment PQ', 'Line QP'],
    correctAnswer: 'Ray PQ (with arrow above)',
    hints: [
      'A ray is named by its starting point first.',
      'The first letter in a ray\'s name is always the endpoint — where it starts.',
      'Ray PQ starts at P and goes through Q and beyond. So P comes first.',
      'A ray is named starting with its endpoint. Ray PQ has endpoint P and passes through Q.',
    ],
    explanation: 'A ray is always named starting with its endpoint (where it begins). Ray PQ starts at P and extends through Q and beyond.',
    isPreAssessment: false,
  },
  {
    id: 'LA01-ASS-06',
    topicId: 'LA-01',
    subtopic: 'Line segment',
    text: 'Match each geometric object to its description:',
    type: 'match',
    difficulty: 'medium',
    difficultyScore: 0.5,
    avgTimeSeconds: 40,
    options: ['Point|Exact location in space', 'Line segment|Part of line with two endpoints', 'Ray|Starts at a point, extends infinitely one way', 'Straight line|Extends infinitely in both directions'],
    correctAnswer: ['Point|Exact location in space', 'Line segment|Part of line with two endpoints', 'Ray|Starts at a point, extends infinitely one way', 'Straight line|Extends infinitely in both directions'],
    hints: [
      'Think about the characteristics of each: endpoints, length, direction.',
      'A point has no extent. A segment has finite length. A ray is one-directional. A line is two-directional.',
      'Point = location only. Segment = between two points. Ray = one endpoint. Line = no endpoints.',
      'Match by number of endpoints: point=0 length, segment=2 endpoints, ray=1 endpoint, line=0 endpoints.',
    ],
    explanation: 'Each geometric element is defined by whether it has endpoints and how it extends: Point (no size), Line segment (between two endpoints), Ray (one endpoint, infinite one way), Straight line (no endpoints, infinite both ways).',
    isPreAssessment: false,
  },

  // ===== LA-02: Anatomy of Angles =====
  {
    id: 'LA02-PRE-01',
    topicId: 'LA-02',
    subtopic: 'Vertex',
    text: 'What is the vertex of an angle?',
    type: 'mcq',
    difficulty: 'easy',
    difficultyScore: 0.15,
    avgTimeSeconds: 20,
    options: ['The common endpoint where the two arms meet', 'The longest side of the angle', 'The space inside the angle', 'The measurement of the angle'],
    correctAnswer: 'The common endpoint where the two arms meet',
    hints: [
      'Think about the "corner" of an angle.',
      'A vertex is a special point — it is where two lines or rays come together.',
      'When you draw an angle, you draw two rays from the same starting point. That point is the vertex.',
      'The vertex is the corner point of an angle, where both arms (rays) originate.',
    ],
    explanation: 'The vertex of an angle is the common endpoint where the two arms (rays) of the angle meet. It is the "corner point" of the angle.',
    isPreAssessment: true,
  },
  {
    id: 'LA02-PRE-02',
    topicId: 'LA-02',
    subtopic: 'Degree',
    text: 'A full rotation is equal to how many degrees?',
    type: 'mcq',
    difficulty: 'medium',
    difficultyScore: 0.35,
    avgTimeSeconds: 20,
    options: ['90°', '180°', '270°', '360°'],
    correctAnswer: '360°',
    hints: [
      'Think about a clock — how many degrees does the minute hand travel in one full hour?',
      'Imagine spinning completely around once — that is a full rotation.',
      'A full circle represents a complete turn. Circles are divided into 360 equal parts called degrees.',
      'A full rotation or complete circle = 360 degrees (360°).',
    ],
    explanation: 'A full rotation is 360 degrees (360°). This is because a circle is divided into 360 equal parts. Ancient Babylonian astronomers chose 360 because it is divisible by many numbers.',
    isPreAssessment: true,
  },
  {
    id: 'LA02-PRE-03',
    topicId: 'LA-02',
    subtopic: 'Protractor',
    text: 'A protractor is used to:',
    type: 'mcq',
    difficulty: 'hard',
    difficultyScore: 0.6,
    avgTimeSeconds: 25,
    options: ['Measure and draw angles', 'Draw perfect circles', 'Measure length of line segments', 'Draw parallel lines'],
    correctAnswer: 'Measure and draw angles',
    hints: [
      'A protractor is a specific geometry tool — what does it look like (hint: semicircle with numbers)?',
      'The numbers on a protractor go from 0 to 180. What do those numbers represent?',
      'Those numbers are degree measurements. A protractor helps you find or create specific angle measurements.',
      'A protractor is a semicircular tool marked in degrees (0° to 180°) used to measure and draw angles accurately.',
    ],
    explanation: 'A protractor is a mathematical tool shaped like a semicircle, marked with degree measurements from 0° to 180°. It is used to measure the size of existing angles and to draw angles of specific sizes.',
    isPreAssessment: true,
  },
  // Assessment questions
  {
    id: 'LA02-ASS-01',
    topicId: 'LA-02',
    subtopic: 'Arms',
    text: 'The two rays that form an angle are called the _____ of the angle.',
    type: 'mcq',
    difficulty: 'easy',
    difficultyScore: 0.2,
    avgTimeSeconds: 15,
    options: ['Arms', 'Edges', 'Borders', 'Sides only'],
    correctAnswer: 'Arms',
    hints: [
      'Think of the angle as a person with outstretched limbs.',
      'The two straight parts of an angle are named after body parts.',
      'An angle has a corner (vertex) and two straight parts extending from it.',
      'The two rays that form an angle are called its arms. The point where they meet is the vertex.',
    ],
    explanation: 'The two rays that form an angle are called the arms of the angle. They extend from the vertex, which is the common endpoint where the arms meet.',
    isPreAssessment: false,
  },
  {
    id: 'LA02-ASS-02',
    topicId: 'LA-02',
    subtopic: 'Degree',
    text: 'A right angle measures exactly:',
    type: 'mcq',
    difficulty: 'easy',
    difficultyScore: 0.2,
    avgTimeSeconds: 15,
    options: ['45°', '90°', '180°', '360°'],
    correctAnswer: '90°',
    hints: [
      'Think about the corners of a square or the corner of a piece of paper.',
      'A right angle is formed when two lines are perfectly perpendicular.',
      'Right angles are marked with a small square symbol in geometry diagrams.',
      'A right angle is exactly 90 degrees — one quarter of a full rotation (360° ÷ 4 = 90°).',
    ],
    explanation: 'A right angle measures exactly 90°. It is formed when two lines meet perpendicularly. Right angles are represented by a small square at the vertex in geometric diagrams.',
    isPreAssessment: false,
  },
  {
    id: 'LA02-ASS-03',
    topicId: 'LA-02',
    subtopic: 'Protractor',
    text: 'When measuring an angle with a protractor, you should align the center hole of the protractor with the:',
    type: 'mcq',
    difficulty: 'medium',
    difficultyScore: 0.45,
    avgTimeSeconds: 30,
    options: ['Vertex of the angle', 'One arm of the angle', 'The middle of one arm', 'The end of the angle'],
    correctAnswer: 'Vertex of the angle',
    hints: [
      'The center of the protractor has a special mark or hole — where should that go?',
      'To measure from the corner of the angle, you need to place the center of the protractor at the corner.',
      'The vertex is the corner of the angle. The protractor must be centered there to get an accurate reading.',
      'Place the center hole of the protractor exactly on the vertex, align the base line with one arm, then read where the other arm points.',
    ],
    explanation: 'To measure an angle: (1) Place the center hole of the protractor on the vertex; (2) Align the baseline (0° line) with one arm; (3) Read the degree where the other arm crosses the protractor scale.',
    isPreAssessment: false,
  },
  {
    id: 'LA02-ASS-04',
    topicId: 'LA-02',
    subtopic: 'Degree',
    text: 'Arrange these angle measurements from smallest to largest:',
    type: 'arrange',
    difficulty: 'medium',
    difficultyScore: 0.5,
    avgTimeSeconds: 35,
    options: ['45°', '90°', '135°', '180°'],
    correctAnswer: ['45°', '90°', '135°', '180°'],
    hints: [
      'Compare the numbers directly — which is smallest?',
      '45 is less than 90, which is less than 135, which is less than 180.',
      'Smaller degrees mean a narrower angle. Larger degrees mean a wider angle.',
      'Order: 45° (acute) → 90° (right) → 135° (obtuse) → 180° (straight).',
    ],
    explanation: 'Arranged smallest to largest: 45° (acute angle) → 90° (right angle) → 135° (obtuse angle) → 180° (straight angle).',
    isPreAssessment: false,
  },
  {
    id: 'LA02-ASS-05',
    topicId: 'LA-02',
    subtopic: 'Vertex',
    text: 'True or False: An angle can have more than one vertex.',
    type: 'true-false',
    difficulty: 'hard',
    difficultyScore: 0.6,
    avgTimeSeconds: 20,
    options: ['True', 'False'],
    correctAnswer: 'False',
    hints: [
      'How is a single angle formed? How many corner points does it have?',
      'An angle is defined by exactly two rays and one common point.',
      'The definition of an angle requires ONE point where both arms originate.',
      'False — an angle has exactly one vertex. It is the single point where two rays meet to form the angle.',
    ],
    explanation: 'False. An angle has exactly one vertex — the single point where the two arms (rays) meet. Having more than one corner would create a different shape, not an angle.',
    isPreAssessment: false,
  },

  // ===== PC-01: Compass and Ruler Basics =====
  {
    id: 'PC01-PRE-01',
    topicId: 'PC-01',
    subtopic: 'Compass',
    text: 'What is a compass used for in geometry?',
    type: 'mcq',
    difficulty: 'easy',
    difficultyScore: 0.15,
    avgTimeSeconds: 20,
    options: ['Drawing circles and arcs of precise radius', 'Measuring angles', 'Drawing straight lines', 'Finding north direction'],
    correctAnswer: 'Drawing circles and arcs of precise radius',
    hints: [
      'Think about the geometric tool with two arms — one with a spike and one with a pencil.',
      'A geometric compass (different from a navigational compass) is used for drawing.',
      'You set its width to a specific measurement, then pivot on one arm to draw a perfect curve.',
      'A geometric compass is used to draw circles and arcs of a specific radius by keeping one leg fixed and rotating the other.',
    ],
    explanation: 'In geometry, a compass is an instrument with two legs — one with a sharp point and one with a pencil. You set the distance between the legs to the desired radius and pivot the pencil around the fixed point to draw precise circles or arcs.',
    isPreAssessment: true,
  },
  {
    id: 'PC01-PRE-02',
    topicId: 'PC-01',
    subtopic: 'Ruler',
    text: 'Which of these can a ruler be used for in geometric construction?',
    type: 'mcq',
    difficulty: 'medium',
    difficultyScore: 0.4,
    avgTimeSeconds: 25,
    options: ['Drawing straight lines and measuring distances', 'Drawing circles', 'Measuring angles', 'Both A and C'],
    correctAnswer: 'Drawing straight lines and measuring distances',
    hints: [
      'A ruler has a straight edge and markings — what can each part do?',
      'You can use the straight edge to draw lines. You can use the markings to measure.',
      'A ruler does not have the ability to measure angles (that requires a protractor) or draw circles (that requires a compass).',
      'A ruler is used to draw straight lines and to measure linear distances between points.',
    ],
    explanation: 'A ruler is used in geometric construction for two main purposes: (1) Drawing straight lines using its straight edge, and (2) Measuring lengths/distances using its scale markings.',
    isPreAssessment: true,
  },
  {
    id: 'PC01-PRE-03',
    topicId: 'PC-01',
    subtopic: 'Precision',
    text: 'Why is precision important in geometric construction?',
    type: 'mcq',
    difficulty: 'hard',
    difficultyScore: 0.65,
    avgTimeSeconds: 30,
    options: [
      'Small errors compound over multiple steps, leading to inaccurate final constructions',
      'It makes the drawing look more artistic',
      'Only the final measurement matters, not intermediate steps',
      'Precision is not important in geometry',
    ],
    correctAnswer: 'Small errors compound over multiple steps, leading to inaccurate final constructions',
    hints: [
      'Think about building a wall — what happens if each brick is slightly off?',
      'In multi-step constructions, each step builds on the previous one.',
      'An error of 1mm in step 1 might become a 5mm error by step 5.',
      'Precision matters because small errors in early steps get magnified in later steps, resulting in constructions that are geometrically incorrect.',
    ],
    explanation: 'Precision is crucial in geometric construction because each step builds upon previous ones. A small error of even 1mm can compound across multiple steps, leading to a final construction that significantly deviates from the correct geometric shape.',
    isPreAssessment: true,
  },
  {
    id: 'PC01-ASS-01',
    topicId: 'PC-01',
    subtopic: 'Compass',
    text: 'When using a compass, the distance between the spike and the pencil determines the:',
    type: 'mcq',
    difficulty: 'easy',
    difficultyScore: 0.2,
    avgTimeSeconds: 20,
    options: ['Radius of the circle', 'Diameter of the circle', 'Circumference of the circle', 'Area of the circle'],
    correctAnswer: 'Radius of the circle',
    hints: [
      'The spike stays fixed at the center, and the pencil traces the outer edge.',
      'The distance from the center to the edge of a circle is called the ___.',
      'Radius = distance from center to any point on the circle. The compass leg spread equals this distance.',
      'The compass opening (distance between spike and pencil) equals the radius of the circle being drawn.',
    ],
    explanation: 'When using a compass, the distance between the spike (fixed center) and the pencil equals the radius of the circle. The spike is placed at the center, and the pencil traces a circle at that fixed radius.',
    isPreAssessment: false,
  },
  {
    id: 'PC01-ASS-02',
    topicId: 'PC-01',
    subtopic: 'Curves',
    text: 'True or False: An arc is a part of a circle.',
    type: 'true-false',
    difficulty: 'easy',
    difficultyScore: 0.15,
    avgTimeSeconds: 15,
    options: ['True', 'False'],
    correctAnswer: 'True',
    hints: [
      'Think about what you get when you draw only part of a circle.',
      'The word "arc" is related to circular curves.',
      'When you do not complete the full circle with a compass, the partial curve is called an arc.',
      'An arc is indeed a portion of a circle — part of the curved path that makes up the full circle.',
    ],
    explanation: 'True. An arc is a portion or section of a circle\'s circumference. When you use a compass but do not complete the full circle, you draw an arc.',
    isPreAssessment: false,
  },
  {
    id: 'PC01-ASS-03',
    topicId: 'PC-01',
    subtopic: 'Ruler',
    text: 'Arrange the steps to draw a line segment of length 5 cm:',
    type: 'arrange',
    difficulty: 'medium',
    difficultyScore: 0.45,
    avgTimeSeconds: 40,
    options: ['Mark point A on the paper', 'Place ruler with 0 at point A', 'Mark point B at the 5 cm mark', 'Draw a straight line connecting A and B'],
    correctAnswer: ['Mark point A on the paper', 'Place ruler with 0 at point A', 'Mark point B at the 5 cm mark', 'Draw a straight line connecting A and B'],
    hints: [
      'You need a starting point before you can measure from it.',
      'First: mark your starting point. Then: align the ruler.',
      'Steps: Start point → align ruler at 0 → mark endpoint at 5cm → draw the line.',
      'Order: Mark A → place ruler (0 at A) → mark B at 5cm → draw line AB.',
    ],
    explanation: 'To draw a 5cm line segment: (1) Mark point A; (2) Place ruler with 0 mark at A; (3) Mark point B at the 5cm mark; (4) Draw a straight line from A to B using the ruler\'s edge.',
    isPreAssessment: false,
  },
  {
    id: 'PC01-ASS-04',
    topicId: 'PC-01',
    subtopic: 'Precision',
    text: 'Which describes the correct way to hold a compass for precise drawing?',
    type: 'mcq',
    difficulty: 'hard',
    difficultyScore: 0.7,
    avgTimeSeconds: 30,
    options: [
      'Hold by the top knob, keep the hinge tight, lean slightly in the direction of rotation',
      'Hold both arms tightly together',
      'Always push the compass forward never rotate',
      'Hold the pencil leg only and keep the spike free',
    ],
    correctAnswer: 'Hold by the top knob, keep the hinge tight, lean slightly in the direction of rotation',
    hints: [
      'A compass needs to maintain a fixed radius while rotating.',
      'The top of the compass has a knob for exactly this reason — to grip and rotate.',
      'Leaning slightly helps the pencil maintain contact with the paper as you rotate.',
      'Proper technique: grip the top knob, ensure the hinge is firm (radius won\'t slip), lean the compass slightly forward as you rotate for smooth drawing.',
    ],
    explanation: 'For precise compass use: hold the knob at the top, ensure the hinge is firm to maintain the set radius, and lean the compass slightly in the direction of rotation so the pencil glides smoothly without lifting off the paper.',
    isPreAssessment: false,
  },

  // ===== LA-03: Comparing Angles =====
  {
    id: 'LA03-PRE-01',
    topicId: 'LA-03',
    subtopic: 'Superimposition',
    text: 'Superimposition in geometry means:',
    type: 'mcq',
    difficulty: 'easy',
    difficultyScore: 0.2,
    avgTimeSeconds: 25,
    options: ['Placing one figure on top of another to compare them', 'Drawing a figure twice', 'Measuring a figure with a ruler', 'Erasing a figure'],
    correctAnswer: 'Placing one figure on top of another to compare them',
    hints: [
      'The prefix "super" means "above" or "over."',
      'To impose means to place. So what does "superimpose" mean?',
      'When comparing two angles, you might trace one and lay it over the other.',
      'Superimposition is the technique of placing one geometric figure directly over another to compare their sizes or shapes.',
    ],
    explanation: 'Superimposition means placing one geometric figure directly on top of another to compare them. When comparing angles, you can trace one angle and superimpose it on the other to see if they are equal.',
    isPreAssessment: true,
  },
  {
    id: 'LA03-PRE-02',
    topicId: 'LA-03',
    subtopic: 'Equality',
    text: 'Two angles are equal if they have the same:',
    type: 'mcq',
    difficulty: 'medium',
    difficultyScore: 0.4,
    avgTimeSeconds: 20,
    options: ['Degree measure', 'Position on the page', 'Length of their arms', 'Color'],
    correctAnswer: 'Degree measure',
    hints: [
      'The "size" of an angle is measured in degrees.',
      'Does the location or orientation of an angle change its size?',
      'Two angles can be in different positions but still be the same "size" — what determines size?',
      'Angles are equal when they have the same degree measure, regardless of the length of their arms or their position.',
    ],
    explanation: 'Two angles are equal if they have the same degree measure. The length of the arms and the position of the angle do not matter — what counts is the opening (angle) between the two arms, measured in degrees.',
    isPreAssessment: true,
  },
  {
    id: 'LA03-PRE-03',
    topicId: 'LA-03',
    subtopic: 'Rotation',
    text: 'If angle A is rotated 90° clockwise, what happens to its measure?',
    type: 'mcq',
    difficulty: 'hard',
    difficultyScore: 0.7,
    avgTimeSeconds: 30,
    options: ['It stays the same', 'It increases by 90°', 'It decreases by 90°', 'It doubles'],
    correctAnswer: 'It stays the same',
    hints: [
      'Rotating an angle changes its orientation (direction it faces), not its size.',
      'Think: if you rotate a 45° angle, is it still 45°?',
      'The measure of an angle depends only on the opening between its arms, not where the angle is positioned or oriented.',
      'Rotating an angle does not change its degree measure. A 45° angle rotated 90° is still 45°.',
    ],
    explanation: 'Rotating an angle does not change its measure. The degree measurement of an angle depends only on the opening between the two arms, not on the angle\'s orientation or position.',
    isPreAssessment: true,
  },
  {
    id: 'LA03-ASS-01',
    topicId: 'LA-03',
    subtopic: 'Equality',
    text: 'Angle P = 55° and Angle Q = 55°. What can we say about these angles?',
    type: 'mcq',
    difficulty: 'easy',
    difficultyScore: 0.2,
    avgTimeSeconds: 20,
    options: ['They are equal angles', 'They are supplementary angles', 'They are complementary angles', 'They are vertically opposite'],
    correctAnswer: 'They are equal angles',
    hints: [
      'Compare their degree measurements.',
      'If two angles have the same number of degrees, they are ___.',
      '55° = 55°, so what relationship do these angles have?',
      'Since both angles measure 55°, they are equal angles.',
    ],
    explanation: 'Since both Angle P and Angle Q measure 55°, they are equal angles. Equal angles have identical degree measures.',
    isPreAssessment: false,
  },
  {
    id: 'LA03-ASS-02',
    topicId: 'LA-03',
    subtopic: 'Superimposition',
    text: 'True or False: To compare two angles by superimposition, you must first trace one of them onto tracing paper.',
    type: 'true-false',
    difficulty: 'medium',
    difficultyScore: 0.5,
    avgTimeSeconds: 25,
    options: ['True', 'False'],
    correctAnswer: 'True',
    hints: [
      'Think about the practical steps of comparing two angles drawn on a page.',
      'You cannot move one angle directly — you need a copy of it.',
      'Tracing paper lets you copy an angle and then physically place it over another for comparison.',
      'True — to compare by superimposition, you trace one angle, then lay the tracing over the other angle to compare.',
    ],
    explanation: 'True. When comparing angles by superimposition, you trace one angle onto tracing paper, then place it over the other angle, aligning the vertices and one arm to see if the other arms also align.',
    isPreAssessment: false,
  },
  {
    id: 'LA03-ASS-03',
    topicId: 'LA-03',
    subtopic: 'Rotation',
    text: 'Which pair of angles are equal?',
    type: 'mcq',
    difficulty: 'medium',
    difficultyScore: 0.45,
    avgTimeSeconds: 25,
    options: ['A 30° angle and a 60° angle rotated 30°', 'A 45° angle and a 45° angle in different positions', 'A 90° angle and a 45° angle', 'A 120° angle and a 60° angle'],
    correctAnswer: 'A 45° angle and a 45° angle in different positions',
    hints: [
      'Equal angles must have the same degree measure.',
      'Rotation changes position but not degree measure.',
      'Look for a pair where both angles have the same numerical degree value.',
      'The 45° angle and 45° angle are equal regardless of their position/orientation.',
    ],
    explanation: 'Two angles are equal when they have the same degree measure. The 45° angle in different positions are still both 45° — position does not affect angle size.',
    isPreAssessment: false,
  },

  // ===== PC-02: Circular Constructions =====
  {
    id: 'PC02-PRE-01',
    topicId: 'PC-02',
    subtopic: 'Centre',
    text: 'The centre of a circle is:',
    type: 'mcq',
    difficulty: 'easy',
    difficultyScore: 0.15,
    avgTimeSeconds: 20,
    options: ['The point equidistant from all points on the circle', 'Any point inside the circle', 'A point on the circle', 'The topmost point of the circle'],
    correctAnswer: 'The point equidistant from all points on the circle',
    hints: [
      'Think about how a compass draws a circle — where is the spike placed?',
      'Every point on the circle is the same distance from one special point.',
      'The word "equidistant" means "equal distance." What point is equally far from all points on the circle?',
      'The centre is the unique point inside a circle that is exactly the same distance from every point on the circumference.',
    ],
    explanation: 'The centre of a circle is the point that is equidistant (equal distance) from every point on the circle. When drawing with a compass, the spike is placed at the centre.',
    isPreAssessment: true,
  },
  {
    id: 'PC02-PRE-02',
    topicId: 'PC-02',
    subtopic: 'Radius',
    text: 'The radius of a circle is:',
    type: 'mcq',
    difficulty: 'medium',
    difficultyScore: 0.35,
    avgTimeSeconds: 20,
    options: ['The distance from the centre to any point on the circle', 'The distance across the entire circle', 'The outer boundary of the circle', 'Half the circumference'],
    correctAnswer: 'The distance from the centre to any point on the circle',
    hints: [
      'Think about the word "radius" — it comes from the Latin word for "spoke" (like a wheel spoke).',
      'A spoke on a bicycle wheel goes from the center hub to the outer rim.',
      'The radius connects the center point to the edge (circumference).',
      'The radius is the straight line from the centre to any point on the circumference. All radii of a circle are equal.',
    ],
    explanation: 'The radius is the distance from the centre to any point on the circle. All radii of the same circle are equal in length. The diameter (distance across the circle) equals 2 × radius.',
    isPreAssessment: true,
  },
  {
    id: 'PC02-PRE-03',
    topicId: 'PC-02',
    subtopic: 'Equidistance',
    text: 'If a circle has a radius of 4 cm, what is the distance from the centre to any point on the circle?',
    type: 'mcq',
    difficulty: 'hard',
    difficultyScore: 0.6,
    avgTimeSeconds: 20,
    options: ['4 cm', '8 cm', '2 cm', '12.56 cm'],
    correctAnswer: '4 cm',
    hints: [
      'The radius is the distance from the centre to the circle.',
      'Every point on the circle is the same distance from the centre.',
      'That same distance is called the radius.',
      'Since the radius = 4 cm, every point on the circle is exactly 4 cm from the centre.',
    ],
    explanation: 'The radius of a circle is 4 cm. By definition, every point on the circle is exactly 4 cm from the centre. This is what makes it a circle — all points are equidistant from the centre.',
    isPreAssessment: true,
  },
  {
    id: 'PC02-ASS-01',
    topicId: 'PC-02',
    subtopic: 'Radius',
    text: 'If the diameter of a circle is 10 cm, what is the radius?',
    type: 'mcq',
    difficulty: 'easy',
    difficultyScore: 0.2,
    avgTimeSeconds: 15,
    options: ['5 cm', '10 cm', '20 cm', '3.14 cm'],
    correctAnswer: '5 cm',
    hints: [
      'Diameter passes through the centre — it is like two radii put together.',
      'Diameter = 2 × radius. So radius = diameter ÷ 2.',
      '10 ÷ 2 = ?',
      'Radius = Diameter ÷ 2 = 10 ÷ 2 = 5 cm.',
    ],
    explanation: 'The diameter is twice the radius: Diameter = 2 × Radius. Therefore, Radius = Diameter ÷ 2 = 10 ÷ 2 = 5 cm.',
    isPreAssessment: false,
  },
  {
    id: 'PC02-ASS-02',
    topicId: 'PC-02',
    subtopic: 'Centre',
    text: 'True or False: A circle can have more than one centre.',
    type: 'true-false',
    difficulty: 'easy',
    difficultyScore: 0.15,
    avgTimeSeconds: 15,
    options: ['True', 'False'],
    correctAnswer: 'False',
    hints: [
      'By definition, a circle is all points equidistant from ONE specific point.',
      'Can there be two different points that are both equidistant from all points on the same circle?',
      'If there were two "centres," the circle would need to be equidistant from both, which is impossible.',
      'False — a circle has exactly one centre. It is uniquely defined as the set of all points at a fixed distance from that single centre.',
    ],
    explanation: 'False. A circle has exactly one centre. By definition, a circle is the set of all points that are equidistant from a single fixed point (the centre). Two centres would be a contradiction.',
    isPreAssessment: false,
  },
  {
    id: 'PC02-ASS-03',
    topicId: 'PC-02',
    subtopic: 'Equidistance',
    text: 'Arrange the steps to draw a circle with radius 3 cm:',
    type: 'arrange',
    difficulty: 'medium',
    difficultyScore: 0.45,
    avgTimeSeconds: 40,
    options: ['Mark the centre point O', 'Set compass opening to 3 cm using a ruler', 'Place spike at point O', 'Rotate the compass to draw the complete circle'],
    correctAnswer: ['Mark the centre point O', 'Set compass opening to 3 cm using a ruler', 'Place spike at point O', 'Rotate the compass to draw the complete circle'],
    hints: [
      'You need the centre point before you can start.',
      'Order: mark center → set compass radius → place spike → draw circle.',
      'You must set the compass before placing it, so you have the right radius ready.',
      'Steps: (1) Mark O, (2) Set 3cm on compass, (3) Spike at O, (4) Draw circle.',
    ],
    explanation: 'To draw a circle: (1) Mark centre O; (2) Set compass to 3cm radius; (3) Place spike at O; (4) Rotate compass pencil a full 360° to draw the circle.',
    isPreAssessment: false,
  },

  // ===== LA-05: Classification of Angles =====
  {
    id: 'LA05-PRE-01',
    topicId: 'LA-05',
    subtopic: 'Acute',
    text: 'An acute angle is an angle that measures:',
    type: 'mcq',
    difficulty: 'easy',
    difficultyScore: 0.2,
    avgTimeSeconds: 20,
    options: ['Less than 90°', 'Exactly 90°', 'Between 90° and 180°', 'Exactly 180°'],
    correctAnswer: 'Less than 90°',
    hints: [
      'The word "acute" means sharp or pointed.',
      'A sharp, narrow angle would be a small number of degrees.',
      'Acute angles are "less than a right angle."',
      'An acute angle measures between 0° and 90° (not including 90°).',
    ],
    explanation: 'An acute angle is any angle that measures between 0° and 90° (exclusive). The word "acute" means sharp — acute angles are narrow/sharp looking.',
    isPreAssessment: true,
  },
  {
    id: 'LA05-PRE-02',
    topicId: 'LA-05',
    subtopic: 'Obtuse',
    text: 'Which angle type measures between 90° and 180°?',
    type: 'mcq',
    difficulty: 'medium',
    difficultyScore: 0.4,
    avgTimeSeconds: 20,
    options: ['Obtuse angle', 'Acute angle', 'Right angle', 'Reflex angle'],
    correctAnswer: 'Obtuse angle',
    hints: [
      'Think about the word "obtuse" — in common language, it means "not sharp."',
      'Obtuse is bigger than right (90°) but not as big as straight (180°).',
      'The categories: acute (< 90°), right (= 90°), obtuse (90° to 180°), straight (= 180°), reflex (> 180°).',
      'An obtuse angle is between 90° and 180° — it is wider than a right angle but not a straight line.',
    ],
    explanation: 'An obtuse angle measures between 90° and 180° (exclusive). It is wider than a right angle. The word "obtuse" means blunt or dull, describing its wide appearance.',
    isPreAssessment: true,
  },
  {
    id: 'LA05-PRE-03',
    topicId: 'LA-05',
    subtopic: 'Reflex',
    text: 'A reflex angle measures:',
    type: 'mcq',
    difficulty: 'hard',
    difficultyScore: 0.7,
    avgTimeSeconds: 25,
    options: ['More than 180° but less than 360°', 'Exactly 180°', 'Less than 90°', 'Exactly 360°'],
    correctAnswer: 'More than 180° but less than 360°',
    hints: [
      'A reflex angle is the "going the long way round" angle.',
      'After a straight angle (180°), the next type goes even further around.',
      'Reflex angles are greater than a straight angle but less than a full rotation.',
      'A reflex angle is between 180° and 360° — it looks like you have gone past straight and almost all the way around.',
    ],
    explanation: 'A reflex angle measures more than 180° but less than 360°. It is the larger angle formed when two rays create an angle — while the smaller angle is acute or obtuse, the reflex angle is the "bigger" side.',
    isPreAssessment: true,
  },
  {
    id: 'LA05-ASS-01',
    topicId: 'LA-05',
    subtopic: 'Right',
    text: 'A square corner makes which type of angle?',
    type: 'mcq',
    difficulty: 'easy',
    difficultyScore: 0.15,
    avgTimeSeconds: 15,
    options: ['Right angle', 'Acute angle', 'Obtuse angle', 'Straight angle'],
    correctAnswer: 'Right angle',
    hints: [
      'Look at the corner of a piece of paper or a square.',
      'That corner measures exactly 90°.',
      'The special name for a 90° angle is...',
      'A square corner is a right angle (90°). All four corners of a square/rectangle are right angles.',
    ],
    explanation: 'A square corner forms a right angle, which measures exactly 90°. Right angles are found at all corners of squares, rectangles, and many other everyday objects.',
    isPreAssessment: false,
  },
  {
    id: 'LA05-ASS-02',
    topicId: 'LA-05',
    subtopic: 'Straight',
    text: 'A straight angle is the same as:',
    type: 'mcq',
    difficulty: 'medium',
    difficultyScore: 0.45,
    avgTimeSeconds: 20,
    options: ['A straight line (180°)', 'A right angle (90°)', 'A full rotation (360°)', 'An acute angle'],
    correctAnswer: 'A straight line (180°)',
    hints: [
      'Think about what a "straight" angle would look like — flat, like a line?',
      'Two rays pointing in exactly opposite directions form which angle type?',
      'If you open an angle from 0° all the way to form a flat line, that is...',
      'A straight angle measures exactly 180° — it looks exactly like a straight line.',
    ],
    explanation: 'A straight angle measures exactly 180° and looks like a straight line. The two arms of a straight angle point in exactly opposite directions.',
    isPreAssessment: false,
  },
  {
    id: 'LA05-ASS-03',
    topicId: 'LA-05',
    subtopic: 'Acute',
    text: 'Match each angle measurement to its type:',
    type: 'match',
    difficulty: 'medium',
    difficultyScore: 0.5,
    avgTimeSeconds: 45,
    options: ['35°|Acute angle', '90°|Right angle', '150°|Obtuse angle', '200°|Reflex angle'],
    correctAnswer: ['35°|Acute angle', '90°|Right angle', '150°|Obtuse angle', '200°|Reflex angle'],
    hints: [
      'Use the ranges: Acute < 90°, Right = 90°, Obtuse 90°-180°, Straight = 180°, Reflex > 180°.',
      '35° is less than 90°, so it is acute. 90° is exactly right. 150° is between 90° and 180°. 200° is greater than 180°.',
      'Match: 35°→acute, 90°→right, 150°→obtuse, 200°→reflex.',
      'Apply the definitions: acute < 90°, right = 90°, obtuse = 90° to 180°, reflex > 180°.',
    ],
    explanation: '35° = Acute (less than 90°); 90° = Right angle; 150° = Obtuse (90° to 180°); 200° = Reflex angle (greater than 180°).',
    isPreAssessment: false,
  },
  {
    id: 'LA05-ASS-04',
    topicId: 'LA-05',
    subtopic: 'Reflex',
    text: 'True or False: A reflex angle and its corresponding acute/obtuse angle always add up to 360°.',
    type: 'true-false',
    difficulty: 'hard',
    difficultyScore: 0.7,
    avgTimeSeconds: 25,
    options: ['True', 'False'],
    correctAnswer: 'True',
    hints: [
      'Think about how a reflex angle and its "partner" angle together make up a full rotation.',
      'A full circle = 360°. If two angles together make a full circle, they must add to 360°.',
      'The reflex and non-reflex angles formed by the same two rays together make a complete rotation.',
      'True — the reflex angle and the other angle (acute/obtuse/right) formed by the same two rays add up to 360° (a full rotation).',
    ],
    explanation: 'True. When two rays form an angle, they actually create two angles that together make a full circle (360°). The reflex angle and its paired smaller angle always sum to 360°.',
    isPreAssessment: false,
  },

  // ===== LA-04: Geometric Relationships =====
  {
    id: 'LA04-PRE-01',
    topicId: 'LA-04',
    subtopic: 'Intersecting',
    text: 'Two lines that cross each other are called:',
    type: 'mcq',
    difficulty: 'easy',
    difficultyScore: 0.2,
    avgTimeSeconds: 20,
    options: ['Intersecting lines', 'Parallel lines', 'Perpendicular lines', 'Curved lines'],
    correctAnswer: 'Intersecting lines',
    hints: [
      'The word "intersect" means to cut across or meet at a point.',
      'Lines that cross each other at a point are...',
      'Think of two roads crossing — they intersect.',
      'When two lines cross at a common point, they are called intersecting lines.',
    ],
    explanation: 'Two lines that cross each other at a common point are called intersecting lines. The point where they cross is called the point of intersection.',
    isPreAssessment: true,
  },
  {
    id: 'LA04-PRE-02',
    topicId: 'LA-04',
    subtopic: 'Perpendicular',
    text: 'Perpendicular lines intersect at an angle of:',
    type: 'mcq',
    difficulty: 'medium',
    difficultyScore: 0.4,
    avgTimeSeconds: 20,
    options: ['90°', '45°', '60°', '180°'],
    correctAnswer: '90°',
    hints: [
      'Perpendicular lines create a special, recognizable angle at their crossing.',
      'Think about the corners of a square — the sides meet at what angle?',
      'Perpendicular means "at right angles."',
      'Perpendicular lines meet at exactly 90° (a right angle). This is the defining characteristic of perpendicular lines.',
    ],
    explanation: 'Perpendicular lines intersect at exactly 90° (right angles). When two lines are perpendicular, they form four right angles at their point of intersection.',
    isPreAssessment: true,
  },
  {
    id: 'LA04-PRE-03',
    topicId: 'LA-04',
    subtopic: 'Chakra spokes',
    text: 'If 6 equal spokes radiate from the centre of a wheel, what angle does each spoke make with the next?',
    type: 'mcq',
    difficulty: 'hard',
    difficultyScore: 0.65,
    avgTimeSeconds: 30,
    options: ['60°', '45°', '90°', '30°'],
    correctAnswer: '60°',
    hints: [
      'The full circle is 360°. If 6 spokes divide the circle equally, divide 360 by 6.',
      '360° ÷ 6 = ?',
      '360 ÷ 6 = 60',
      'Each of the 6 equal spokes divides the circle into 6 equal parts: 360° ÷ 6 = 60°.',
    ],
    explanation: 'With 6 equal spokes, the full circle (360°) is divided into 6 equal parts: 360° ÷ 6 = 60°. Each pair of adjacent spokes makes a 60° angle.',
    isPreAssessment: true,
  },
  {
    id: 'LA04-ASS-01',
    topicId: 'LA-04',
    subtopic: 'Intersecting',
    text: 'When two straight lines intersect, how many angles are formed?',
    type: 'mcq',
    difficulty: 'medium',
    difficultyScore: 0.45,
    avgTimeSeconds: 20,
    options: ['4 angles', '2 angles', '1 angle', '6 angles'],
    correctAnswer: '4 angles',
    hints: [
      'Draw two crossing lines — count all the regions formed between the lines.',
      'At the crossing point, lines go in 4 directions, creating spaces between them.',
      'Count: top, right, bottom, left — these are 4 separate angular regions.',
      'Two intersecting lines create exactly 4 angles at the point of intersection.',
    ],
    explanation: 'When two lines intersect, they form 4 angles at the point of intersection. These come in two pairs of vertically opposite (equal) angles.',
    isPreAssessment: false,
  },
  {
    id: 'LA04-ASS-02',
    topicId: 'LA-04',
    subtopic: 'Perpendicular',
    text: 'True or False: All perpendicular lines are also intersecting lines.',
    type: 'true-false',
    difficulty: 'medium',
    difficultyScore: 0.5,
    avgTimeSeconds: 20,
    options: ['True', 'False'],
    correctAnswer: 'True',
    hints: [
      'For lines to be perpendicular, they must first meet (intersect) at a right angle.',
      'Can perpendicular lines avoid crossing each other?',
      'Perpendicular is a special type of intersection — at 90°.',
      'True — perpendicular lines must cross (intersect) at exactly 90°. All perpendicular lines intersect; not all intersecting lines are perpendicular.',
    ],
    explanation: 'True. Perpendicular lines are a special case of intersecting lines — they intersect at exactly 90°. All perpendicular lines intersect, but not all intersecting lines are perpendicular.',
    isPreAssessment: false,
  },
  {
    id: 'LA04-ASS-03',
    topicId: 'LA-04',
    subtopic: 'Chakra spokes',
    text: 'If the Ashoka Chakra has 24 equal spokes, what is the angle between consecutive spokes?',
    type: 'mcq',
    difficulty: 'hard',
    difficultyScore: 0.75,
    avgTimeSeconds: 30,
    options: ['15°', '12°', '24°', '30°'],
    correctAnswer: '15°',
    hints: [
      'Full circle = 360°. Divide equally among 24 spokes.',
      '360° ÷ 24 = ?',
      '360 ÷ 24 = 15',
      'Each spoke is separated by 360° ÷ 24 = 15°.',
    ],
    explanation: 'The Ashoka Chakra in the Indian national flag has 24 equal spokes. The angle between consecutive spokes = 360° ÷ 24 = 15°.',
    isPreAssessment: false,
  },

  // ===== PC-03: Bisectors and Replications =====
  {
    id: 'PC03-PRE-01',
    topicId: 'PC-03',
    subtopic: 'Angle bisector',
    text: 'An angle bisector divides an angle into:',
    type: 'mcq',
    difficulty: 'easy',
    difficultyScore: 0.3,
    avgTimeSeconds: 20,
    options: ['Two equal halves', 'Three equal parts', 'Four equal parts', 'Two unequal parts'],
    correctAnswer: 'Two equal halves',
    hints: [
      'The word "bisect" means to cut into two equal parts.',
      'A "bisector" of an angle does what to that angle?',
      'Bi = two, sect = cut. So bisect = cut into two.',
      'An angle bisector cuts an angle exactly in half, creating two equal angles.',
    ],
    explanation: 'An angle bisector is a ray that divides an angle into two equal halves. If the original angle is 60°, the bisector creates two 30° angles.',
    isPreAssessment: true,
  },
  {
    id: 'PC03-PRE-02',
    topicId: 'PC-03',
    subtopic: '60deg and 120deg angles',
    text: 'To construct a 60° angle using compass and ruler, you first draw:',
    type: 'mcq',
    difficulty: 'medium',
    difficultyScore: 0.5,
    avgTimeSeconds: 30,
    options: ['An arc, then mark equal distances on it', 'A right angle and halve it', 'A 90° angle and subtract 30°', 'Three equal circles'],
    correctAnswer: 'An arc, then mark equal distances on it',
    hints: [
      'Remember: an equilateral triangle has all angles equal to 60°.',
      'How do you construct an equilateral triangle? You use equal radii.',
      'Draw an arc, then use the same compass setting to mark equal chords on the arc.',
      'A 60° angle is constructed by drawing an arc and then marking off the same radius length along the arc to create an equilateral triangle angle.',
    ],
    explanation: 'To construct a 60° angle: draw a baseline, draw an arc, then use the same compass radius to mark a point on the arc. The line connecting the centre to this point makes a 60° angle (property of equilateral triangles).',
    isPreAssessment: true,
  },
  {
    id: 'PC03-PRE-03',
    topicId: 'PC-03',
    subtopic: 'Copy segments',
    text: 'To copy a line segment using compass and ruler, you need to:',
    type: 'mcq',
    difficulty: 'hard',
    difficultyScore: 0.7,
    avgTimeSeconds: 35,
    options: [
      'Measure the segment with compass, then transfer that measurement to a new baseline',
      'Trace the segment with tracing paper',
      'Use a ruler to measure and draw the same length',
      'Both A and C are correct',
    ],
    correctAnswer: 'Both A and C are correct',
    hints: [
      'There are multiple valid methods to copy a segment.',
      'Think about whether using a ruler directly would work as well as a compass.',
      'A ruler gives you the measurement. A compass transfers the exact length mechanically.',
      'Both methods work: you can use a ruler to measure the length and redraw it, or use a compass to transfer the length without measurement.',
    ],
    explanation: 'To copy a line segment, you can either: (A) Use a compass to span the segment and transfer that exact width to a new location, OR (C) Measure with a ruler and draw the same length. Both methods produce an accurate copy.',
    isPreAssessment: true,
  },
  {
    id: 'PC03-ASS-01',
    topicId: 'PC-03',
    subtopic: 'Angle bisector',
    text: 'If you bisect a 90° angle, each resulting angle measures:',
    type: 'mcq',
    difficulty: 'easy',
    difficultyScore: 0.25,
    avgTimeSeconds: 15,
    options: ['45°', '30°', '60°', '90°'],
    correctAnswer: '45°',
    hints: [
      'Bisect means divide into two equal parts.',
      '90° ÷ 2 = ?',
      '90 ÷ 2 = 45',
      'Bisecting 90° gives two equal angles of 90° ÷ 2 = 45° each.',
    ],
    explanation: 'Bisecting a 90° angle creates two equal angles of 45° each (90° ÷ 2 = 45°).',
    isPreAssessment: false,
  },
  {
    id: 'PC03-ASS-02',
    topicId: 'PC-03',
    subtopic: '60deg and 120deg angles',
    text: 'A 120° angle can be constructed by:',
    type: 'mcq',
    difficulty: 'medium',
    difficultyScore: 0.55,
    avgTimeSeconds: 30,
    options: ['Constructing 60° and then extending one arm to make a straight angle at that side', 'Doubling a 90° angle', 'Tripling a 45° angle', 'All of the above'],
    correctAnswer: 'Constructing 60° and then extending one arm to make a straight angle at that side',
    hints: [
      'Think: 180° - 60° = ?',
      'If you draw a 60° angle and then consider the supplementary angle (on a straight line), what is it?',
      '180° - 60° = 120°. The supplement of 60° is 120°.',
      'To make 120°: construct a 60° angle on a line, then the angle on the other side is 180° - 60° = 120°.',
    ],
    explanation: 'A 120° angle can be constructed by first making a 60° angle (using compass), then the supplementary angle on the straight line is 180° - 60° = 120°.',
    isPreAssessment: false,
  },
  {
    id: 'PC03-ASS-03',
    topicId: 'PC-03',
    subtopic: 'Copy segments',
    text: 'Arrange the steps to copy line segment AB to a new location:',
    type: 'arrange',
    difficulty: 'medium',
    difficultyScore: 0.6,
    avgTimeSeconds: 45,
    options: ['Draw a new ray from point P', 'Open compass to width of segment AB', 'Place compass spike at P and mark point Q on the ray', 'PQ is now equal to AB'],
    correctAnswer: ['Open compass to width of segment AB', 'Draw a new ray from point P', 'Place compass spike at P and mark point Q on the ray', 'PQ is now equal to AB'],
    hints: [
      'First, you need to measure the segment. Then draw a new line to copy onto.',
      'You measure the segment with the compass first.',
      'Order: set compass to AB length → draw new ray from P → mark Q at that compass width from P → done.',
      'Steps: measure AB with compass → draw ray from P → mark Q at compass distance → PQ = AB.',
    ],
    explanation: 'To copy segment AB: (1) Set compass to exactly the length of AB; (2) Draw a new ray from point P; (3) With spike at P, mark point Q on the ray; (4) PQ = AB.',
    isPreAssessment: false,
  },

  // ===== PC-04: Quadrilateral Construction =====
  {
    id: 'PC04-PRE-01',
    topicId: 'PC-04',
    subtopic: 'Rectangle via diagonals',
    text: 'A property of a rectangle\'s diagonals is that they:',
    type: 'mcq',
    difficulty: 'medium',
    difficultyScore: 0.45,
    avgTimeSeconds: 25,
    options: ['Are equal in length and bisect each other', 'Are perpendicular to each other', 'Are of different lengths', 'Only one diagonal exists in a rectangle'],
    correctAnswer: 'Are equal in length and bisect each other',
    hints: [
      'Think about a rectangle — draw its two diagonals. What do you notice?',
      'In a rectangle, both diagonals have the same length.',
      'The diagonals of a rectangle cross each other in the middle.',
      'Rectangle diagonals: equal length AND they bisect each other (each cuts the other in half).',
    ],
    explanation: 'The diagonals of a rectangle are equal in length and bisect each other (each diagonal cuts the other exactly in half). This property can be used to construct a rectangle.',
    isPreAssessment: true,
  },
  {
    id: 'PC04-PRE-02',
    topicId: 'PC-04',
    subtopic: 'Square conversion',
    text: 'A square is a special rectangle where:',
    type: 'mcq',
    difficulty: 'medium',
    difficultyScore: 0.4,
    avgTimeSeconds: 20,
    options: ['All four sides are equal', 'All angles are equal to 45°', 'Opposite sides are different lengths', 'Diagonals are different lengths'],
    correctAnswer: 'All four sides are equal',
    hints: [
      'Both squares and rectangles have four right angles. What makes them different?',
      'In a rectangle, opposite sides are equal. In a square, what is true about the sides?',
      'A square is a rectangle with the additional property that ALL sides are the same length.',
      'A square is a rectangle where all four sides are equal. This extra property comes from having equal-length sides.',
    ],
    explanation: 'A square is a special rectangle where all four sides are equal in length. Like all rectangles, it has four right angles. The additional constraint is that all sides are equal.',
    isPreAssessment: true,
  },
  {
    id: 'PC04-PRE-03',
    topicId: 'PC-04',
    subtopic: 'Rectangle via diagonals',
    text: 'To construct a rectangle using its diagonals, you need to know:',
    type: 'mcq',
    difficulty: 'hard',
    difficultyScore: 0.75,
    avgTimeSeconds: 35,
    options: ['The length of the diagonal and where the diagonals bisect each other', 'Only the length and width', 'The angles at the corners', 'The perimeter of the rectangle'],
    correctAnswer: 'The length of the diagonal and where the diagonals bisect each other',
    hints: [
      'Think about what defines the position of the vertices of a rectangle.',
      'If you know the intersection point (center) and the diagonal length, where would the four corners be?',
      'The four corners are all equidistant from the center — the distance equals half the diagonal.',
      'With diagonal length and center point: draw a circle with radius = half diagonal, the four intersection points with perpendicular lines at the center give the vertices.',
    ],
    explanation: 'To construct a rectangle using diagonals: you need the diagonal length and the center (where diagonals bisect). Draw two equal diagonals that bisect each other at right angles isn\'t required — they bisect at a point but not necessarily perpendicularly (that would be a square).',
    isPreAssessment: true,
  },
  {
    id: 'PC04-ASS-01',
    topicId: 'PC-04',
    subtopic: 'Square conversion',
    text: 'The diagonals of a square are:',
    type: 'mcq',
    difficulty: 'medium',
    difficultyScore: 0.5,
    avgTimeSeconds: 25,
    options: ['Equal in length and perpendicular bisectors of each other', 'Equal but not perpendicular', 'Perpendicular but not equal', 'Neither equal nor perpendicular'],
    correctAnswer: 'Equal in length and perpendicular bisectors of each other',
    hints: [
      'A square has all the properties of a rectangle, plus more.',
      'Rectangle diagonals: equal and bisect each other. Square adds what?',
      'In a square, because all sides are equal, the diagonals also intersect at right angles.',
      'Square diagonals are equal AND perpendicular bisectors — they are equal in length, bisect each other, and cross at 90°.',
    ],
    explanation: 'The diagonals of a square have three special properties: (1) They are equal in length; (2) They bisect each other; (3) They are perpendicular (cross at 90°). This makes them perpendicular bisectors of each other.',
    isPreAssessment: false,
  },
  {
    id: 'PC04-ASS-02',
    topicId: 'PC-04',
    subtopic: 'Rectangle via diagonals',
    text: 'True or False: A rectangle with diagonals of length 10 cm has vertices that are each 5 cm from the center.',
    type: 'true-false',
    difficulty: 'medium',
    difficultyScore: 0.55,
    avgTimeSeconds: 20,
    options: ['True', 'False'],
    correctAnswer: 'True',
    hints: [
      'Diagonals of a rectangle bisect each other.',
      'If the full diagonal is 10 cm, what is the distance from center to one end?',
      '10 cm ÷ 2 = 5 cm from center to each end.',
      'True — bisect means "cut in half," so half of 10 cm = 5 cm from center to each vertex.',
    ],
    explanation: 'True. The diagonals of a rectangle bisect each other, meaning each diagonal is cut into two equal halves at the intersection point. Half of 10 cm = 5 cm from the center to each vertex.',
    isPreAssessment: false,
  },

  // ===== PC-05: Applied Geometric Art =====
  {
    id: 'PC05-PRE-01',
    topicId: 'PC-05',
    subtopic: 'Symmetry',
    text: 'A figure has line symmetry if:',
    type: 'mcq',
    difficulty: 'medium',
    difficultyScore: 0.45,
    avgTimeSeconds: 25,
    options: ['One half is a mirror image of the other half', 'It has equal angles', 'It has only straight sides', 'All sides are equal'],
    correctAnswer: 'One half is a mirror image of the other half',
    hints: [
      'Think about folding a shape — if the two halves match perfectly, it has symmetry.',
      'The line of symmetry is like a mirror placed along the fold line.',
      'Symmetry comes from the Greek "syn" (together) and "metron" (measure) — matching in measure.',
      'A figure has line symmetry when it can be folded along a line so that both halves match perfectly — one half is a mirror image of the other.',
    ],
    explanation: 'A figure has line symmetry (reflective symmetry) when it can be divided by a line (axis of symmetry) into two halves that are mirror images of each other.',
    isPreAssessment: true,
  },
  {
    id: 'PC05-PRE-02',
    topicId: 'PC-05',
    subtopic: 'Scale',
    text: 'If a drawing has a scale of 1:100, and a wall is 5 m long in real life, it appears how long in the drawing?',
    type: 'mcq',
    difficulty: 'hard',
    difficultyScore: 0.7,
    avgTimeSeconds: 35,
    options: ['5 cm', '50 cm', '500 cm', '0.5 cm'],
    correctAnswer: '5 cm',
    hints: [
      'Scale 1:100 means 1 unit in drawing = 100 units in reality.',
      '5 m = 500 cm in reality. If the scale is 1:100...',
      'Drawing length = Real length ÷ Scale factor = 500 cm ÷ 100 = ?',
      '500 cm ÷ 100 = 5 cm in the drawing.',
    ],
    explanation: 'Scale 1:100 means 1 cm in the drawing represents 100 cm (1 m) in reality. For a 5 m (= 500 cm) wall: Drawing length = 500 ÷ 100 = 5 cm.',
    isPreAssessment: true,
  },
  {
    id: 'PC05-PRE-03',
    topicId: 'PC-05',
    subtopic: 'Composite figures',
    text: 'A composite figure is:',
    type: 'mcq',
    difficulty: 'hard',
    difficultyScore: 0.75,
    avgTimeSeconds: 25,
    options: ['A shape made of two or more basic geometric shapes combined', 'A figure with only curved sides', 'A figure that has more than 8 sides', 'A three-dimensional shape'],
    correctAnswer: 'A shape made of two or more basic geometric shapes combined',
    hints: [
      'The prefix "composite" means made up of parts.',
      'Think about shapes like an "L" shape or a house outline — they are made of simpler shapes.',
      'A house shape = rectangle + triangle. That is a composite figure.',
      'A composite figure is formed by combining two or more basic geometric shapes (triangles, rectangles, circles, etc.).',
    ],
    explanation: 'A composite figure is a geometric shape formed by combining two or more basic shapes. For example, a "T" shape is made of two rectangles, and a house outline is made of a rectangle and a triangle.',
    isPreAssessment: true,
  },
  {
    id: 'PC05-ASS-01',
    topicId: 'PC-05',
    subtopic: 'Symmetry',
    text: 'How many lines of symmetry does a square have?',
    type: 'mcq',
    difficulty: 'medium',
    difficultyScore: 0.5,
    avgTimeSeconds: 20,
    options: ['4', '2', '1', '8'],
    correctAnswer: '4',
    hints: [
      'Think about all the ways you can fold a square so both halves match.',
      'You can fold along horizontal, vertical, and both diagonal lines.',
      'Count: left-right, top-bottom, and two diagonal folds.',
      'A square has 4 lines of symmetry: 2 through opposite sides (horizontal and vertical) and 2 through opposite corners (diagonal).',
    ],
    explanation: 'A square has 4 lines of symmetry: one horizontal (through midpoints of top and bottom), one vertical (through midpoints of left and right), and two diagonal (through opposite corners).',
    isPreAssessment: false,
  },
  {
    id: 'PC05-ASS-02',
    topicId: 'PC-05',
    subtopic: 'Composite figures',
    text: 'A figure is made of a rectangle (8cm × 4cm) with a right triangle on top (base 8cm, height 3cm). What basic shapes make this composite figure?',
    type: 'mcq',
    difficulty: 'medium',
    difficultyScore: 0.55,
    avgTimeSeconds: 25,
    options: ['Rectangle and triangle', 'Two rectangles', 'Square and triangle', 'Rectangle and semicircle'],
    correctAnswer: 'Rectangle and triangle',
    hints: [
      'Read the problem carefully — it directly names the shapes.',
      'One shape is 8cm × 4cm — what shape has length and width? The other has base and height — what shape is that?',
      'Rectangles have length and width. Triangles have base and height.',
      'The composite figure is made of a rectangle (bottom) and a right triangle (top). Like a simple house shape.',
    ],
    explanation: 'The composite figure consists of a rectangle (8cm × 4cm) as the base and a right triangle (base 8cm, height 3cm) on top — it looks like a simple house shape.',
    isPreAssessment: false,
  },
];

export const TOPIC_CONTENT: TopicContent[] = [
  {
    topicId: 'LA-01',
    videoUrl: 'https://www.youtube.com/embed/il0EJrY64qE',
    textContent: `## Foundational Geometric Elements

### What is a Point?
A point is the most basic element in all of geometry. Imagine pressing a sharp pencil tip against a piece of paper — that tiny mark represents a point. A point has **no length, no width, and no height** — it simply marks an exact location in space. We name points with capital letters like A, B, or P.

### What is a Line Segment?
A line segment is a straight path connecting two endpoints. Think of a piece of string pulled tight between two thumbtacks — that is a line segment. It has a definite, measurable length. If the endpoints are named A and B, we call this line segment AB (or BA). Line segments are the building blocks of all geometric figures like triangles, squares, and polygons.

### What is a Ray?
A ray starts at a point (called the endpoint) and extends infinitely in one direction. Think of a ray of sunlight: it starts at the sun and travels outward, never stopping. In geometry, we draw a ray with an arrow at one end to show it goes on forever. Ray AB starts at endpoint A, passes through point B, and continues past B forever.

### What is a Straight Line?
A straight line extends infinitely in **both** directions — it has no endpoints at all. It is perfectly straight and has one dimension (length). Since a straight line goes on forever in both directions, we cannot measure its length. Lines are named using any two points on them, or with a single lowercase letter like line l or line m.

### Key Relationships
These four elements are related in an important way. Think of them on a scale from "most limited" to "most unlimited":
- A **point** exists at just one location
- A **line segment** has two fixed endpoints
- A **ray** has one endpoint but extends infinitely one way
- A **line** has no endpoints and extends infinitely both ways`,

    revisionContent: `## Quick Review: Geometric Elements

| Element | Endpoints | Extends |
|---------|-----------|---------|
| Point | None (just a location) | Does not extend |
| Line segment | 2 endpoints | Between endpoints only |
| Ray | 1 endpoint | Infinitely in one direction |
| Straight line | 0 endpoints | Infinitely in both directions |

**Key facts to remember:**
- Points are named with CAPITAL letters (A, B, P)
- Two distinct points always determine exactly one straight line
- A ray is named starting with its endpoint
- Through any two points, exactly one straight line passes`,

    remedialContent: {
      'Point': 'A point is like a tiny dot — it marks a location but has no size. Label it with a capital letter. Think of it as a "dot with an address" but no dimensions.',
      'Line segment': 'A line segment is a straight path between two points called endpoints. It has a definite, measurable length. Think of a ruler — the distance from the 0 mark to the 10 cm mark is a line segment.',
      'Ray': 'A ray starts at one endpoint and extends infinitely in one direction. Name a ray by its starting endpoint first (e.g., Ray AB — starts at A, goes through B and beyond). Think of a flashlight beam.',
      'Straight line': 'A straight line extends infinitely in BOTH directions with no endpoints. You cannot measure its length. In diagrams, we draw arrows on both ends to show it goes on forever.',
    },
  },
  {
    topicId: 'LA-02',
    videoUrl: 'https://www.youtube.com/embed/NVuMULQjb3o',
    textContent: `## Anatomy of Angles

### What is an Angle?
An angle is formed when two rays start from the same point. The common starting point is called the **vertex**, and the two rays are called the **arms** of the angle. Angles are everywhere in daily life — the corners of a book, the hands of a clock, the opening of scissors.

### The Vertex
The vertex is the corner point of an angle — the single point where both arms originate. When naming an angle, the middle letter always represents the vertex. For example, in angle PQR (written ∠PQR), Q is the vertex. We can also just call it "angle Q."

### The Arms
The two rays that form an angle are its arms. The arms extend outward from the vertex. The angle is like the "opening" between the two arms. Longer arms do not make the angle bigger — what matters is the opening between them, not their length.

### Measuring Angles in Degrees
The size of an angle is measured in **degrees** (°). A full rotation is 360°. Think of a clock: when the minute hand makes one complete revolution, it has turned 360°. When it goes halfway around (6 o'clock to 12 o'clock), it has turned 180°. A quarter turn is 90°.

### The Protractor
A **protractor** is the tool we use to measure angles. It is shaped like a semicircle (or full circle) and marked with degree measurements from 0° to 180°.

**How to use a protractor:**
1. Place the center hole of the protractor exactly on the **vertex** of the angle
2. Align the baseline (the straight edge, 0° mark) with one arm of the angle
3. Read the degree measurement where the **other arm** crosses the protractor scale
4. Make sure you read the correct scale (inner or outer, depending on angle orientation)`,

    revisionContent: `## Quick Review: Anatomy of Angles

**Angle = Vertex + Two Arms**

- **Vertex**: The corner point where both arms meet
- **Arms**: The two rays forming the angle (length doesn't matter for angle size)
- **Degree (°)**: Unit of angle measurement; full rotation = 360°

**Protractor steps:**
1. Center hole on vertex
2. Baseline (0°) on one arm
3. Read where other arm crosses the scale

**Special angles:**
- 90° = Right angle (square corner)
- 180° = Straight angle (flat line)
- 360° = Full rotation`,

    remedialContent: {
      'Vertex': 'The vertex is the corner point of an angle. It is where both arms (rays) begin. Always label the vertex with a capital letter. In ∠ABC, the middle letter B is always the vertex.',
      'Arms': 'The two rays of an angle are its arms. Remember: longer arms do NOT create a bigger angle. The size of an angle is the opening between the arms, not the length of the arms themselves.',
      'Degree': 'Degrees measure angle size. Full circle = 360°. Half circle = 180°. Quarter circle = 90°. Think of a pizza: cut into 360 equal slices, each slice is 1 degree.',
      'Protractor': 'To measure an angle: (1) Put the center hole exactly on the vertex. (2) Align the 0° line with one arm. (3) Read where the other arm points on the scale. Make sure to use the right inner/outer scale.',
    },
  },
  {
    topicId: 'PC-01',
    videoUrl: 'https://www.youtube.com/embed/wWMEBPhxlN8',
    textContent: `## Compass and Ruler Basics

### The Geometric Compass
A geometric compass (different from the navigational compass that points north!) is an instrument used for drawing precise circles and arcs. It has two legs joined at the top with a hinge:
- The **fixed leg** has a sharp metal spike — this is placed at the centre
- The **drawing leg** holds a pencil — this traces the circle

To use a compass: set the legs apart to the desired radius, place the spike firmly at the centre point, and rotate the pencil leg around to draw a perfect circle or arc.

### The Ruler (Straight Edge)
A ruler serves two purposes in construction:
1. **Drawing straight lines**: Use the straight edge to draw lines between points
2. **Measuring distances**: Use the cm/mm markings to measure lengths

**Important**: In "compass and ruler" constructions, we often use the ruler only as a straight edge (without measuring) — the compass does all the distance work!

### Drawing with Precision
Precision means accuracy — getting measurements exactly right. In geometric construction, precision matters because:
- Each step builds on the previous one
- A 1mm error early can become a 5mm error later
- Geometric proofs rely on exact relationships

**Tips for precision:**
- Keep your pencil sharp and hold it at a consistent angle
- Place the compass spike firmly to prevent slipping
- Work on paper placed on a hard, flat surface
- Check measurements twice before drawing

### Curves and Arcs
When you draw only part of a circle (not the full 360°), you create an **arc**. Arcs are used frequently in geometric constructions — for example, to find equidistant points or to bisect angles.`,

    revisionContent: `## Quick Review: Compass and Ruler

**Compass:** Two-legged tool for drawing circles and arcs
- Spike leg: stays at center
- Pencil leg: traces the circle
- Compass opening = radius of circle drawn

**Ruler:** Used for straight lines and measuring lengths

**Precision tips:**
- Sharp pencil, firm spike
- Hard, flat surface
- Double-check measurements

**Arc vs Circle:**
- Circle = complete 360° curve
- Arc = part of a circle`,

    remedialContent: {
      'Compass': 'A compass has two legs. The spike leg stays fixed at the center. The pencil leg draws the circle. The distance between the legs = the radius of the circle. Set the radius with a ruler before placing on paper.',
      'Ruler': 'Use a ruler\'s straight edge to draw lines. Use its markings to measure distances. In pure geometric construction, we often only use the ruler as a straight edge, letting the compass do all measuring.',
      'Curves': 'An arc is a part of a circle. Draw it by doing a partial rotation with the compass instead of a full 360°. Arcs are used in many constructions to find points at a specific distance.',
      'Precision': 'For accurate constructions: use a sharp pencil, keep the compass hinge firm, place the spike carefully at exact points, and work on a hard flat surface. Check before you draw!',
    },
  },
  {
    topicId: 'LA-03',
    videoUrl: 'https://www.youtube.com/embed/9JCkURclFdA',
    textContent: `## Comparing Angles

### Why Compare Angles?
Being able to compare angles is essential in geometry. We need to know if two angles are equal, which is larger, or what their relationship is. This skill is used in everything from building design to computer graphics.

### Comparing with a Protractor
The most direct way to compare angles is to measure each one with a protractor and compare the degree values. If ∠A = 45° and ∠B = 45°, then ∠A = ∠B. If ∠A = 45° and ∠B = 60°, then ∠A < ∠B.

### The Method of Superimposition
Superimposition is a visual and hands-on way to compare angles. Here is how it works:
1. Trace angle A onto transparent paper (tracing paper)
2. Place the traced angle over angle B, aligning the vertices
3. Align one arm of the traced angle with one arm of angle B
4. Look at the other arms — if they coincide (overlap exactly), the angles are equal
5. If the traced arm falls inside angle B, then A < B
6. If the traced arm falls outside angle B, then A > B

This method is especially useful when you do not have a protractor!

### Rotation Does Not Change Angle Size
An important principle: rotating an angle (changing its orientation) does not change its measure. A 45° angle facing up is still 45° when rotated to face sideways. The size of an angle depends only on the opening between its arms, not on its position or direction.

### Equal Angles in Geometry
Equal angles appear everywhere in geometry:
- Opposite angles (vertically opposite angles) formed when two lines cross are always equal
- Corresponding angles when parallel lines are cut by a transversal are equal
- All angles of an equilateral triangle are equal (each is 60°)`,

    revisionContent: `## Quick Review: Comparing Angles

**Methods to compare angles:**
1. Measure with protractor — compare degrees
2. Superimposition — trace one, place over the other

**Superimposition result:**
- Arms coincide → angles are EQUAL
- Traced arm inside → traced angle is SMALLER
- Traced arm outside → traced angle is LARGER

**Remember:** Rotation does not change angle size!`,

    remedialContent: {
      'Superimposition': 'To compare by superimposition: (1) Trace one angle on tracing paper. (2) Place the traced vertex on the other angle\'s vertex. (3) Align one arm. (4) See where the other arm falls. If they match → equal angles.',
      'Equality': 'Two angles are equal when they have the same degree measurement. Equal angles look the same size, even if their arms are different lengths or they are in different positions.',
      'Rotation': 'Rotating an angle changes which direction it faces but NOT its size. A 30° angle rotated to any position is still 30°. Angle size depends only on the opening between arms.',
    },
  },
  {
    topicId: 'PC-02',
    videoUrl: 'https://www.youtube.com/embed/CvhvzLuUVdc',
    textContent: `## Circular Constructions

### The Circle
A circle is one of the most perfect shapes in geometry. It is defined as the set of all points in a plane that are the same distance from a fixed point called the **centre**.

### Centre and Radius
The **centre** is the fixed point inside the circle from which all points on the circle are equidistant (equal distance). The **radius** is the distance from the centre to any point on the circle. Since all points on a circle are equidistant from the centre, all radii of a circle are equal.

The **diameter** is a special chord that passes through the centre. Diameter = 2 × Radius.

### Drawing Circles with a Compass
1. Mark the centre point O on your paper
2. Set the compass opening to the desired radius r
3. Place the spike firmly at O
4. Rotate the pencil leg a full 360° to draw the circle
5. The drawn curve is called the circumference

### Drawing Arcs
An arc is a portion of a circle. To draw an arc:
- Set up just like drawing a circle
- Instead of a full rotation, rotate only a part of the way
- Arcs are labeled by their endpoints (e.g., arc AB)

### Using Circles in Construction
Circles and arcs are incredibly useful in geometric construction:
- Finding points equidistant from two locations (perpendicular bisector)
- Constructing angles (equilateral triangles for 60° angles)
- Dividing a circle into equal parts
- Creating beautiful geometric patterns

### The Concept of Equidistance
Equidistance means "equal distance." Every point on a circle is equidistant from the centre. This property is what makes circles so useful — they let us find all points at exactly a given distance from a fixed point.`,

    revisionContent: `## Quick Review: Circular Constructions

**Circle vocabulary:**
- Centre: fixed point equidistant from all points on circle
- Radius (r): centre to circle (all radii are equal)
- Diameter (d): chord through centre; d = 2r
- Circumference: the circle itself (outer boundary)
- Arc: a portion of the circle

**Drawing a circle:**
1. Mark centre O
2. Set compass to radius r
3. Spike at O
4. Rotate full 360°`,

    remedialContent: {
      'Centre': 'The centre is the middle point of the circle. When using a compass, the spike goes at the centre. All points on the circle are exactly the radius distance from the centre.',
      'Radius': 'The radius is the distance from the centre to any edge point of the circle. The compass opening equals the radius when you draw. All radii in the same circle are equal. Diameter = 2 × radius.',
      'Equidistance': 'Equidistant means "at equal distances." Every single point on a circle is exactly the same distance (radius) from the centre. This is what makes a circle a circle!',
    },
  },
  {
    topicId: 'LA-05',
    videoUrl: 'https://www.youtube.com/embed/NGeB5y_gDaI',
    textContent: `## Classification of Angles

### Why Classify Angles?
Just as we classify animals, plants, and colors, we classify angles into groups based on their size. This makes it easier to describe, compare, and work with angles in geometry problems.

### Types of Angles

**Acute Angle (0° < angle < 90°)**
An acute angle is smaller than a right angle. The word "acute" means sharp — and acute angles have a sharp, pointed appearance. Examples: 30°, 45°, 60°, 89°. The hands of a clock at 2 o'clock form an acute angle.

**Right Angle (angle = exactly 90°)**
A right angle is exactly one quarter of a full rotation. It looks like the corner of a square or the corner of a book. In diagrams, right angles are marked with a small square symbol (□). Examples: corners of squares, rectangles, and the meeting of a wall and the floor.

**Obtuse Angle (90° < angle < 180°)**
An obtuse angle is larger than a right angle but less than a straight angle. The word "obtuse" means blunt — obtuse angles look wide and blunt. Examples: 100°, 120°, 150°. The opening of an open book, or the hands of a clock at 10 o'clock.

**Straight Angle (angle = exactly 180°)**
A straight angle looks exactly like a straight line. The two arms point in completely opposite directions. It equals two right angles (2 × 90° = 180°).

**Reflex Angle (180° < angle < 360°)**
A reflex angle is greater than a straight angle but less than a full rotation. Reflex angles "wrap around" — they are the larger angle formed when two rays meet. Example: the larger opening when you open a door more than halfway.

**Full Angle / Complete Rotation (360°)**
When a ray rotates back to its original position, it has turned 360°.`,

    revisionContent: `## Quick Review: Classification of Angles

| Type | Range | Example |
|------|-------|---------|
| Acute | 0° < a < 90° | 45° |
| Right | exactly 90° | square corner |
| Obtuse | 90° < a < 180° | 120° |
| Straight | exactly 180° | flat line |
| Reflex | 180° < a < 360° | 270° |
| Full | exactly 360° | full rotation |

**Memory trick:**
- Acute = "A-cute little angle" (small and sharp)
- Obtuse = "Obtuse is fat" (wide and blunt)
- Reflex = "Reflects past 180°"`,

    remedialContent: {
      'Acute': 'Acute angles are LESS THAN 90°. They look sharp and narrow like the letter V at the bottom. If an angle is smaller than a right angle (square corner), it is acute. Examples: 30°, 45°, 60°.',
      'Right': 'A right angle is EXACTLY 90°. It looks like a square corner. In diagrams, it is marked with a small square. All four corners of a square are right angles.',
      'Obtuse': 'Obtuse angles are BETWEEN 90° and 180°. They are wider than a right angle but not yet flat. The word means "blunt" — they look blunt/wide. Examples: 100°, 135°, 160°.',
      'Straight': 'A straight angle is EXACTLY 180°. It looks like a straight line with a point in the middle. Two rays pointing in opposite directions form a straight angle.',
      'Reflex': 'A reflex angle is MORE THAN 180° (but less than 360°). It is the "going the long way round" angle. When two rays form an angle, the reflex angle is the larger portion (the one that wraps around).',
    },
  },
  {
    topicId: 'LA-04',
    videoUrl: 'https://www.youtube.com/embed/Hfhon-rjCJo',
    textContent: `## Geometric Relationships

### Intersecting Lines
Two lines are **intersecting lines** when they cross each other at a point. The point where they cross is called the **point of intersection**. When two lines intersect, they create 4 angles at the intersection point.

**Vertically Opposite Angles**: When two lines cross, the angles opposite each other (across the intersection) are always equal. These are called vertically opposite angles. If one angle is 70°, its vertically opposite angle is also 70°.

### Perpendicular Lines
**Perpendicular lines** are a special type of intersecting lines that cross at exactly 90°. When two lines are perpendicular, they form 4 right angles at the intersection point. We use the symbol ⊥ to show perpendicularity (e.g., line AB ⊥ line CD means they are perpendicular).

Perpendicular lines appear everywhere:
- Horizontal floor and vertical wall
- The two lines in a + sign
- Grid lines on graph paper
- The letter T and H

### Chakra Spokes and Angle Division
The **Ashoka Chakra** on the Indian national flag has 24 equal spokes radiating from the centre. These spokes divide the full circle (360°) into 24 equal angles:
- Angle between consecutive spokes = 360° ÷ 24 = **15°**

This concept of equal angular division appears in many contexts:
- Clock face: 12 equal divisions → 360° ÷ 12 = 30° per hour mark
- Compass rose: 8 directions → 360° ÷ 8 = 45° between directions
- Bicycle wheel spokes

### Special Angle Relationships
- **Complementary angles**: Two angles that add up to 90°
- **Supplementary angles**: Two angles that add up to 180°
- **Adjacent angles**: Angles that share a vertex and one arm`,

    revisionContent: `## Quick Review: Geometric Relationships

**Intersecting lines:**
- Cross at a point of intersection
- Form 4 angles
- Vertically opposite angles are EQUAL

**Perpendicular lines:**
- Intersect at exactly 90°
- Form 4 right angles
- Symbol: ⊥

**Circle division:**
- n equal spokes → angle = 360° ÷ n
- Ashoka Chakra: 360° ÷ 24 = 15° per spoke`,

    remedialContent: {
      'Intersecting': 'Intersecting lines cross at a single point called the point of intersection. Two crossing lines always make exactly 4 angles. The opposite angles (vertically opposite angles) are always equal.',
      'Perpendicular': 'Perpendicular lines are intersecting lines that meet at exactly 90°. All four angles at the intersection are right angles. The symbol ⊥ means perpendicular. Example: a "+" sign shows perpendicular lines.',
      'Chakra spokes': 'Spokes divide a circle equally. To find the angle between spokes: divide 360° by the number of spokes. 6 spokes → 60° each. 8 spokes → 45° each. 24 spokes (Ashoka Chakra) → 15° each.',
    },
  },
  {
    topicId: 'PC-03',
    videoUrl: 'https://www.youtube.com/embed/nmYiQiAe6Lw',
    textContent: `## Bisectors and Replications

### Copying a Line Segment
To copy a line segment AB to a new location (creating PQ = AB):
1. Draw a new ray from point P
2. Open your compass to span exactly the length of AB (spike at A, pencil at B)
3. Without changing the compass opening, place the spike at P
4. Mark where the pencil crosses the ray — call this Q
5. Line segment PQ is now equal in length to AB

This technique works because the compass preserves the exact distance mechanically.

### Constructing the Angle Bisector
An **angle bisector** is a ray that divides an angle into two equal halves. To construct the bisector of angle ABC:
1. Place spike at vertex B, draw an arc that crosses both arms
2. Name the crossing points D (on arm BA) and E (on arm BC)
3. Place spike at D, draw an arc inside the angle
4. Without changing the compass, place spike at E, draw another arc inside the angle
5. The two arcs inside intersect at point F
6. Draw ray BF — this is the angle bisector!

### Constructing a 60° Angle
A 60° angle is based on the equilateral triangle (all sides equal, all angles 60°):
1. Draw a ray OA
2. With spike at O, draw an arc that crosses the ray at point P
3. Without changing the compass, place spike at P
4. Mark where this arc crosses the first arc — call this Q
5. Draw ray OQ — angle QOP = 60°!

### Constructing a 120° Angle
A 120° angle is the supplement of 60°:
1. First construct a 60° angle on a straight baseline
2. The angle on the other side of the baseline from the 60° angle = 180° - 60° = 120°

### Why These Constructions Work
These constructions work because of the properties of equilateral triangles and angle bisectors. When equal arcs are drawn from equal distances, the resulting triangles are congruent, guaranteeing equal angles.`,

    revisionContent: `## Quick Review: Bisectors and Replications

**Copy a segment AB to PQ:**
1. Open compass = length AB
2. Draw ray from P
3. Mark Q at compass distance from P

**Construct angle bisector of ∠ABC:**
1. Arc from B crossing both arms at D and E
2. Arcs from D and E meeting at F (inside angle)
3. Ray BF = bisector

**Construct 60° angle:**
1. Draw ray OA, arc from O hitting ray at P
2. Same compass radius: arc from P hitting first arc at Q
3. Ray OQ = 60° from OA

**120° = supplement of 60°**`,

    remedialContent: {
      'Copy segments': 'To copy segment AB: open compass to span AB exactly. Draw a new ray from P. Without changing compass, put spike at P and mark Q on the ray. PQ = AB. The compass transferred the length!',
      'Angle bisector': 'The bisector cuts an angle exactly in half. Construction: arc from vertex crosses both arms → arcs from those two points meet inside the angle → line from vertex through meeting point is the bisector.',
      '60deg and 120deg angles': 'For 60°: use an equilateral triangle construction — same compass radius from two points. For 120°: it is the supplement of 60° (on a straight line, 180° - 60° = 120°).',
    },
  },
  {
    topicId: 'PC-04',
    videoUrl: 'https://www.youtube.com/embed/T6TSgK0z4Y0',
    textContent: `## Quadrilateral Construction

### Rectangles and Their Properties
A **rectangle** is a quadrilateral (4-sided figure) where:
- All four angles are 90° (right angles)
- Opposite sides are equal and parallel
- Diagonals are equal in length
- Diagonals bisect each other (each cuts the other in half)

### Constructing a Rectangle Using Diagonals
One elegant way to construct a rectangle uses its diagonal properties:
1. Draw the first diagonal AC of the desired length
2. Find the midpoint M of AC (using perpendicular bisector construction or ruler)
3. Draw the second diagonal BD through M, making BD = AC (use compass to ensure equal lengths)
4. The endpoints A, B, C, D are the four vertices of the rectangle
5. Connect them to form rectangle ABCD

This works because in a rectangle, diagonals are equal and bisect each other!

### Squares: A Special Rectangle
A **square** is a rectangle where all four sides are equal. So a square has:
- All four right angles (like any rectangle)
- All four sides equal
- Diagonals equal, bisecting each other, AND perpendicular to each other

### Converting a Rectangle to a Square
To convert a rectangle into a square with the same diagonal:
1. The square's diagonal equals the rectangle's diagonal
2. Set compass to half the diagonal length
3. From the center, mark 4 equidistant points (at compass radius)
4. Connect these points to form the square

### Other Quadrilateral Constructions
- **Parallelogram**: Opposite sides equal and parallel, opposite angles equal
- **Rhombus**: All sides equal, diagonals perpendicular bisectors
- **Trapezium**: One pair of parallel sides`,

    revisionContent: `## Quick Review: Quadrilateral Construction

**Rectangle properties:**
- 4 right angles
- Opposite sides equal and parallel
- Diagonals: equal length, bisect each other

**Square properties:**
- All properties of rectangle PLUS
- All 4 sides equal
- Diagonals perpendicular to each other

**Diagonal construction method:**
- Draw diagonal → find midpoint → draw equal diagonal through midpoint → connect 4 endpoints`,

    remedialContent: {
      'Rectangle via diagonals': 'Rectangle diagonals are equal AND bisect each other. To construct: draw one diagonal, find its midpoint, draw an equal diagonal through the midpoint. The 4 endpoints form the rectangle.',
      'Square conversion': 'A square is a rectangle with equal sides. Square diagonals add one more property: they are perpendicular. To make a square from a rectangle: use the diagonal length to make all sides equal.',
    },
  },
  {
    topicId: 'PC-05',
    videoUrl: 'https://www.youtube.com/embed/cswMBxJgoEw',
    textContent: `## Applied Geometric Art

### Composite Figures
A **composite figure** is a shape made by combining two or more basic geometric shapes. Many real-world shapes are composite figures:
- A house outline = rectangle + triangle
- The letter H = three rectangles
- An ice cream cone = triangle + semicircle
- An arrow = rectangle + triangle

**To find the area of a composite figure:**
1. Identify the basic shapes within it
2. Calculate the area of each basic shape
3. Add (or subtract) them as needed

### Scale and Scale Drawings
A **scale drawing** represents a real object in a different (usually smaller) size while maintaining the same proportions. The **scale** is the ratio of the drawing size to the real size.

For example, a scale of **1:100** means:
- 1 cm in the drawing = 100 cm (1 m) in real life
- To find real size: multiply drawing measurement by scale factor
- To find drawing size: divide real measurement by scale factor

Maps, architectural blueprints, and model airplanes all use scale drawings!

### Symmetry in Geometry
**Line symmetry** (reflection symmetry) means a figure can be folded along a line so both halves match perfectly. The fold line is called the **line of symmetry** or **axis of symmetry**.

Number of lines of symmetry:
- Equilateral triangle: 3 lines
- Square: 4 lines
- Rectangle: 2 lines
- Circle: infinitely many lines
- Regular hexagon: 6 lines

### Creating Geometric Art
Using compass and ruler, you can create beautiful patterns:
- **Mandalas**: repeated geometric patterns around a central point
- **Tessellations**: shapes that tile perfectly without gaps
- **Spirograph patterns**: circles within circles
- **Islamic geometric patterns**: intricate interlocking stars and polygons

These art forms beautifully demonstrate geometry in culture and nature!`,

    revisionContent: `## Quick Review: Applied Geometric Art

**Composite figures:**
- Made of 2+ basic shapes combined
- Area = sum of individual areas

**Scale:**
- Scale 1:n means 1 unit drawing = n units real
- Drawing → Real: multiply by n
- Real → Drawing: divide by n

**Symmetry:**
- Line of symmetry: fold line where halves match
- Square: 4 lines, Rectangle: 2 lines, Circle: infinite`,

    remedialContent: {
      'Composite figures': 'Break down complex shapes into simpler ones (rectangles, triangles, circles). Find each part\'s area separately, then add them together. A house = rectangle (walls) + triangle (roof).',
      'Scale': 'Scale is the ratio of drawing size to real size. Scale 1:50 means 1 cm = 50 cm real. To convert: Real size × (1/scale) = Drawing size. Or: Drawing size × scale = Real size.',
      'Symmetry': 'A line of symmetry is a fold line where both halves match perfectly. Test by imagining folding: do the halves overlap exactly? A square has 4 lines of symmetry (2 through sides, 2 through corners).',
    },
  },
];
