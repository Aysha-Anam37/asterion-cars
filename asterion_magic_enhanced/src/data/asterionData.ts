import heroHypercarImg from '../assets/images/hero_hypercar_1792836114080.jpg';
import apexObsidianImg from '../assets/images/apex_obsidian_1792836114651.jpg';
import apexSilverImg from '../assets/images/apex_silver_1792836115498.jpg';
import apexIvoryImg from '../assets/images/apex_ivory_1792836117562.jpg';
import apexCrimsonImg from '../assets/images/apex_crimson_1792836117914.jpg';
import aeroSculptureImg from '../assets/images/aero_sculpture_1792836119821.jpg';
import twilightDriveImg from '../assets/images/twilight_drive_1792836120852.jpg';
import solaceGtImg from '../assets/images/solace_gt_1792836122223.jpg';
import voltConceptImg from '../assets/images/volt_concept_1792836123665.jpg';
import windTunnelImg from '../assets/images/wind_tunnel_1792836124690.jpg';
import driverCockpitImg from '../assets/images/driver_cockpit_1792836126487.jpg';
import carbonTitaniumImg from '../assets/images/carbon_titanium_1792836126782.jpg';
import nocturneRainImg from '../assets/images/nocturne_rain_1792837149028.jpg';
import awakenCrimsonRainImg from '../assets/images/awaken_silhouette_crimson_rain_1792840708425.jpg';
import awakenDormantRainImg from '../assets/images/awaken_silhouette_dormant_1792840708425.jpg';
import philosophyAtelierImg from '../assets/images/philosophy_atelier_sculpture_1792840710454.jpg';
import contactSalonImg from '../assets/images/contact_private_salon_1792840710779.jpg';

export const ASTERION_IMAGES = {
  heroHypercar: heroHypercarImg,
  apexObsidian: apexObsidianImg,
  apexSilver: apexSilverImg,
  apexIvory: apexIvoryImg,
  apexCrimson: apexCrimsonImg,
  aeroSculpture: aeroSculptureImg,
  twilightDrive: twilightDriveImg,
  solaceGt: solaceGtImg,
  voltConcept: voltConceptImg,
  windTunnel: windTunnelImg,
  driverCockpit: driverCockpitImg,
  carbonTitanium: carbonTitaniumImg,
  nocturneRain: nocturneRainImg,
  awakenCrimsonRain: awakenCrimsonRainImg,
  awakenDormantRain: awakenDormantRainImg,
  philosophyAtelier: philosophyAtelierImg,
  contactSalon: contactSalonImg,
} as const;

const baseUrl = import.meta.env.BASE_URL || '/';
const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

export const ASTERION_HERO_MEDIA = {
  videoSrc: `${normalizedBase}videos/asterion-hero.mp4`,
  posterSrc: `${normalizedBase}videos/asterion-hero-poster.jpg`,
} as const;

export interface ApexColourOption {
  id: 'obsidian' | 'silver' | 'ivory' | 'crimson';
  name: string;
  swatchHex: string;
  swatchHighlight: string;
  finishNote: string;
  image: string;
  alt: string;
}

export const APEX_COLOURS: ApexColourOption[] = [
  {
    id: 'obsidian',
    name: 'Obsidian Black',
    swatchHex: '#15171C',
    swatchHighlight: '#363A45',
    finishNote: 'Satin obsidian pigment paired with champagne-anodised forged centre-lock wheels.',
    image: ASTERION_IMAGES.apexObsidian,
    alt: 'ASTERION APEX concept hypercar finished in satin Obsidian Black in a dark architectural studio',
  },
  {
    id: 'silver',
    name: 'Titanium Silver',
    swatchHex: '#9BA1A8',
    swatchHighlight: '#D4D9DF',
    finishNote: 'Liquid-metallic titanium finish accentuating sculpted intake channels and dark forged wheels.',
    image: ASTERION_IMAGES.apexSilver,
    alt: 'ASTERION APEX concept hypercar finished in liquid metallic Titanium Silver in a dark studio',
  },
  {
    id: 'ivory',
    name: 'Pearl Ivory',
    swatchHex: '#E6E0D4',
    swatchHighlight: '#FAF7F0',
    finishNote: 'Warm satin mineral ivory contrasted against exposed matte carbon aerodynamic splitters.',
    image: ASTERION_IMAGES.apexIvory,
    alt: 'ASTERION APEX concept hypercar finished in warm satin Pearl Ivory with matte carbon aero trim',
  },
  {
    id: 'crimson',
    name: 'Racing Crimson',
    swatchHex: '#7B161E',
    swatchHighlight: '#B62935',
    finishNote: 'Deep multi-coat metallic crimson lacquer highlighting taut rear haunches and carbon aero blades.',
    image: ASTERION_IMAGES.apexCrimson,
    alt: 'ASTERION APEX concept hypercar finished in deep metallic Racing Crimson in a dark studio',
  },
];

export interface StudioHotspot {
  id: string;
  xPercent: number;
  yPercent: number;
  title: string;
  detail: string;
}

export interface ApexAngleView {
  id: 'profile' | 'aero' | 'cockpit' | 'chassis';
  indexLabel: string;
  label: string;
  caption: string;
  usesSelectedColour?: boolean;
  staticImage?: string;
  alt: string;
  hotspots: StudioHotspot[];
}

export const APEX_ANGLE_VIEWS: ApexAngleView[] = [
  {
    id: 'profile',
    indexLabel: '01',
    label: 'Exterior Stance',
    caption: 'Three-quarter studio profile — active colour configuration applied.',
    usesSelectedColour: true,
    alt: 'ASTERION APEX exterior three-quarter studio stance',
    hotspots: [
      {
        id: 'splitter',
        xPercent: 21,
        yPercent: 66,
        title: 'Front Venturi Splitter',
        detail: 'Channels incoming boundary air beneath the flat carbon floor to balance front-axle composure.',
      },
      {
        id: 'forged-wheel',
        xPercent: 44,
        yPercent: 63,
        title: 'Centre-Lock Forged Assembly',
        detail: 'Lightweight machined alloy wheel housing ventilated carbon-ceramic concept braking hardware.',
      },
      {
        id: 'side-intake',
        xPercent: 72,
        yPercent: 54,
        title: 'Sculpted Side Intake',
        detail: 'Feeds thermal management ducts while smoothing wake turbulence along the rear haunch.',
      },
    ],
  },
  {
    id: 'aero',
    indexLabel: '02',
    label: 'Aerodynamic Buttress',
    caption: 'Rear flying buttress & active trailing-edge foil study.',
    staticImage: ASTERION_IMAGES.aeroSculpture,
    alt: 'Close-up editorial view of the ASTERION APEX carbon-fibre flying buttress and rear aero channel',
    hotspots: [
      {
        id: 'pylon',
        xPercent: 32,
        yPercent: 38,
        title: 'Swan-Neck Aero Pylon',
        detail: 'Top-mounted carbon pylon preserves clean high-velocity airflow beneath the active wing plane.',
      },
      {
        id: 'haunch',
        xPercent: 64,
        yPercent: 48,
        title: 'Coke-Bottle Rear Haunch',
        detail: 'Taut surface curvature guides air inward toward the rear diffuser exit channel.',
      },
    ],
  },
  {
    id: 'cockpit',
    indexLabel: '03',
    label: 'Driver Cockpit',
    caption: 'Bespoke forged-carbon cabin with tactile machined switchgear.',
    staticImage: ASTERION_IMAGES.driverCockpit,
    alt: 'ASTERION APEX driver-focused cockpit featuring charcoal alcantara steering wheel and champagne rotary controls',
    hotspots: [
      {
        id: 'wheel',
        xPercent: 47,
        yPercent: 42,
        title: 'Driver-Axis Steering Geometry',
        detail: 'Uncluttered charcoal alcantara rim calibrated for clear sightlines to the digital instrument binnacle.',
      },
      {
        id: 'switchgear',
        xPercent: 76,
        yPercent: 55,
        title: 'Anodised Billet Controls',
        detail: 'Knurled champagne-anodised aluminium rotary dials engineered for unmistakable tactile detents.',
      },
    ],
  },
  {
    id: 'chassis',
    indexLabel: '04',
    label: 'Carbon & Titanium',
    caption: 'Monocoque weave & CNC-machined suspension hardware detail.',
    staticImage: ASTERION_IMAGES.carbonTitanium,
    alt: 'Macro study of ASTERION APEX woven carbon monocoque and champagne titanium suspension mount',
    hotspots: [
      {
        id: 'bracket',
        xPercent: 48,
        yPercent: 46,
        title: 'Billet Titanium Wishbone Mount',
        detail: 'CNC-milled titanium clevis anchoring inboard pushrod suspension directly to the carbon tub.',
      },
      {
        id: 'rotor',
        xPercent: 86,
        yPercent: 62,
        title: 'Carbon-Matrix Rotor',
        detail: 'Cross-drilled ceramic-matrix concept disc reducing unsprung rotational mass at each corner.',
      },
    ],
  },
];

export interface ConceptVehicle {
  id: 'apex' | 'solace' | 'volt';
  index: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  philosophyNote: string;
  image: string;
  alt: string;
  specs: {
    label: string;
    value: string;
  }[];
  architectureHighlights: string[];
}

export const VEHICLE_COLLECTION: ConceptVehicle[] = [
  {
    id: 'apex',
    index: '01',
    name: 'ASTERION APEX',
    category: 'Hypercar',
    tagline: 'Pure mid-engine aerodynamic expression.',
    description:
      'Conceived as the flagship expression of Asterion design: a low-slung carbon-monocoque hypercar uniting active underbody airflow, sculptural proportion, and immediate driver connection.',
    philosophyNote:
      'Every millimetre of bodywork is shaped around internal air pathways and driver sightlines.',
    image: ASTERION_IMAGES.apexObsidian,
    alt: 'ASTERION APEX flagship concept hypercar in satin Obsidian Black',
    specs: [
      { label: '0–100 km/h', value: '2.8 s' },
      { label: 'Top Speed', value: '320 km/h' },
      { label: 'Concept Power', value: '850 HP' },
      { label: 'Concept Dry Mass', value: '1,340 kg' },
    ],
    architectureHighlights: [
      'Autoclave-cured single-piece carbon-fibre central tub',
      'Active dual-plane front splitter & rear diffuser balance',
      'Inboard pushrod suspension with billet titanium linkages',
    ],
  },
  {
    id: 'solace',
    index: '02',
    name: 'ASTERION SOLACE',
    category: 'Grand Touring',
    tagline: 'Continental velocity in architectural calm.',
    description:
      'An elongated two-door grand touring concept crafted for effortless long-distance composure. Flowing fastback proportions conceal acoustic cabin isolation and poised grand-touring balance.',
    philosophyNote:
      'Designed for transcontinental poise where sustained pace feels serene rather than strenuous.',
    image: ASTERION_IMAGES.solaceGt,
    alt: 'ASTERION SOLACE futuristic dark graphite Grand Touring coupe outside a minimalist concrete pavilion at dusk',
    specs: [
      { label: '0–100 km/h', value: '3.3 s' },
      { label: 'Top Speed', value: '305 km/h' },
      { label: 'Concept Power', value: '680 HP' },
      { label: 'Weight Balance', value: '49 : 51' },
    ],
    architectureHighlights: [
      'Bonded aluminium-carbon hybrid grand touring spaceframe',
      'Adaptive magnetorheological touring & sport damping study',
      'Saddle leather, open-pore dark ash & machined metal cabin study',
    ],
  },
  {
    id: 'volt',
    index: '03',
    name: 'ASTERION VOLT',
    category: 'Electric Performance Concept',
    tagline: 'Silent propulsion. Instantaneous torque vectoring.',
    description:
      'A monolithic electric performance study exploring how zero-grille aerodynamics, structural battery integration, and quad-motor torque calibration redefine cornering agility.',
    philosophyNote:
      'Absence of combustion intake requirements unlocks uninterrupted laminar surfaces from nose to tail.',
    image: ASTERION_IMAGES.voltConcept,
    alt: 'ASTERION VOLT electric performance concept coupe in a dark architectural gallery with warm rear light signature',
    specs: [
      { label: '0–100 km/h', value: '2.5 s' },
      { label: 'Top Speed', value: '310 km/h' },
      { label: 'Concept Output', value: '940 HP' },
      { label: 'Concept Range', value: '620 km' },
    ],
    architectureHighlights: [
      'Low-centre-of-gravity structural cell-to-chassis concept floor',
      'Independent four-wheel torque vectoring control study',
      'Seamless venturi rear tunnel replacing conventional exhaust packaging',
    ],
  },
];

export interface EngineeringPrinciple {
  number: string;
  title: string;
  quote: string;
  elaboration: string;
  metricLabel: string;
  metricValue: string;
  image: string;
  alt: string;
}

export const ENGINEERING_PRINCIPLES: EngineeringPrinciple[] = [
  {
    number: '01',
    title: 'AERODYNAMIC FORM',
    quote:
      'Every surface is considered. Every contour contributes to the vehicle’s visual identity and aerodynamic ambition.',
    elaboration:
      'Rather than bolting disruptive appendages onto a finished silhouette, Asterion shapes the primary body volume itself as an aerodynamic instrument—guiding boundary air cleanly through internal channels and beneath a sculpted venturi floor.',
    metricLabel: 'Concept Airflow Focus',
    metricValue: 'Internalised Venturi Management',
    image: ASTERION_IMAGES.windTunnel,
    alt: 'Laminar airflow ribbons passing smoothly over the ASTERION hypercar silhouette in a dark wind tunnel',
  },
  {
    number: '02',
    title: 'DRIVER-CENTRED DESIGN',
    quote:
      'An intuitive relationship between driver, machine, and road shapes every detail of the experience.',
    elaboration:
      'Inside an Asterion concept cabin, visual noise is eliminated. Primary controls are machined from solid metal with deliberate mechanical detents, positioned along the driver’s natural reach arc so eyes remain committed to the apex ahead.',
    metricLabel: 'Cabin Interface Philosophy',
    metricValue: 'Tactile Analogue-Digital Harmony',
    image: ASTERION_IMAGES.driverCockpit,
    alt: 'Minimalist hypercar cockpit with charcoal alcantara steering wheel and machined champagne rotary dials',
  },
  {
    number: '03',
    title: 'PRECISION ENGINEERING',
    quote:
      'Performance begins with thoughtful design, carefully considered materials, and uncompromising attention to detail.',
    elaboration:
      'Structural stiffness and low unsprung mass form the quiet foundation of composure. Woven carbon-fibre monocoque architecture meets CNC-milled titanium suspension hardware finished with horological discipline.',
    metricLabel: 'Structural Study',
    metricValue: 'Carbon Tub & Billet Titanium',
    image: ASTERION_IMAGES.carbonTitanium,
    alt: 'Macro view of woven carbon-fibre monocoque joined to a CNC-milled champagne titanium suspension bracket',
  },
];

export interface DynamicsRegime {
  id: 'velocity' | 'road' | 'track';
  name: string;
  subtitle: string;
  splitterAngle: string;
  rearWingState: string;
  rideHeightDelta: string;
  downforceDistribution: string;
  airflowSummary: string;
  chassisBehaviour: string;
  streamlineCurvature: number;
}

export const DYNAMICS_REGIMES: DynamicsRegime[] = [
  {
    id: 'velocity',
    name: 'Low-Drag Velocity',
    subtitle: 'Minimised wake resistance for effortless high-speed stability.',
    splitterAngle: '0° Neutral Bypass',
    rearWingState: '6° Flattened Profile',
    rideHeightDelta: '-12 mm Front / -10 mm Rear',
    downforceDistribution: '44% Front · 56% Rear',
    airflowSummary:
      'Underbody bypass louvers open to bleed excess pressure while the trailing-edge wing adopts a shallow chord, allowing the 320 km/h concept top-speed envelope to remain calm and planted.',
    chassisBehaviour:
      'Progressive damping filters high-frequency surface imperfections while maintaining taut directional authority.',
    streamlineCurvature: 8,
  },
  {
    id: 'road',
    name: 'Balanced Grand Road',
    subtitle: 'Harmonised composure for sweeping mountain passes and open roads.',
    splitterAngle: '7° Progressive Rake',
    rearWingState: '14° Balanced Trim',
    rideHeightDelta: 'Nominal Baseline (0 mm)',
    downforceDistribution: '42% Front · 58% Rear',
    airflowSummary:
      'Front splitter channels energise the central venturi tunnels while side buttresses feed cool ambient air into thermal exchangers with minimal drag penalty.',
    chassisBehaviour:
      'Compliant primary ride paired with rapid roll-moment control delivers communicative front-axle feedback.',
    streamlineCurvature: 18,
  },
  {
    id: 'track',
    name: 'High-Downforce Precision',
    subtitle: 'Maximum aerodynamic load and thermal extraction under lateral G.',
    splitterAngle: '15° Full Venturi Seal',
    rearWingState: '28° High-Camber Attack',
    rideHeightDelta: '-18 mm Front / -14 mm Rear',
    downforceDistribution: '41% Front · 59% Rear',
    airflowSummary:
      'Active front flaps seal underbody suction and the swan-neck rear foil elevates into clean freestream air, maximising cornering grip and braking stability.',
    chassisBehaviour:
      'Heightened roll stiffness and sharpened throttle mapping translate subtle driver inputs instantaneously.',
    streamlineCurvature: 30,
  },
];

export interface SpecificationGroup {
  category: string;
  items: {
    label: string;
    value: string;
  }[];
}

export const APEX_SPECIFICATION_GROUPS: SpecificationGroup[] = [
  {
    category: '01. Concept Performance Envelope',
    items: [
      { label: '0–100 km/h Concept Target', value: '2.8 s' },
      { label: '0–200 km/h Concept Target', value: '7.1 s' },
      { label: 'Concept Top Speed', value: '320 km/h' },
      { label: 'Concept System Output', value: '850 HP' },
    ],
  },
  {
    category: '02. Chassis & Structural Architecture',
    items: [
      { label: 'Central Structure', value: 'Autoclave Carbon-Fibre Monocoque' },
      { label: 'Subframe Assemblies', value: 'Bonded Aluminium & Billet Titanium' },
      { label: 'Suspension Geometry', value: 'Inboard Pushrod Double Wishbone' },
      { label: 'Braking Concept', value: '390 mm Carbon-Ceramic Matrix Discs' },
    ],
  },
  {
    category: '03. Aerodynamics & Lighting Signature',
    items: [
      { label: 'Underbody Architecture', value: 'Twin-Channel Venturi Floor' },
      { label: 'Active Surfaces', value: 'Dual-Plane Splitter & Swan-Neck Foil' },
      { label: 'Front Optical System', value: 'Sculpted Bi-LED Linear Projection' },
      { label: 'Rear Signature', value: 'Precision Crimson Blade LED Array' },
    ],
  },
  {
    category: '04. Dimensions & Mass Distribution',
    items: [
      { label: 'Length / Width / Height', value: '4,640 / 2,015 / 1,155 mm' },
      { label: 'Wheelbase', value: '2,710 mm' },
      { label: 'Concept Dry Mass Target', value: '1,340 kg' },
      { label: 'Static Axle Balance', value: '42% Front · 58% Rear' },
    ],
  },
];

export interface PhilosophyChapter {
  index: string;
  kicker: string;
  title: string;
  lead: string;
  body: string;
  image: string;
  alt: string;
  caption: string;
}

export const PHILOSOPHY_CHAPTERS: PhilosophyChapter[] = [
  {
    index: '01',
    kicker: 'Restrained Form',
    title: 'Sculpture Governed by Airflow',
    lead: 'Zero ornamental vents or theatrical creases; tension emerges purely from disciplined surface curvature.',
    body: 'At Asterion, beauty is never applied after the engineering is complete. Each fender crest, flying buttress, and undercut channel exists because air demanded that exact path. By removing visual clutter, light travels uninterrupted across obsidian bodywork—revealing proportion rather than decoration.',
    image: ASTERION_IMAGES.aeroSculpture,
    alt: 'Close-up editorial study of sculpted black carbon-fibre flying buttress and rear haunch illuminated by warm champagne rim lighting',
    caption: 'Study IV · Rear Buttress & Laminar Surface Tension',
  },
  {
    index: '02',
    kicker: 'Human Connection',
    title: 'The Quiet Analogue Sanctuary',
    lead: 'Technology remains quiet and subordinate to steering feel, sightlines, and chassis poise.',
    body: 'Modern performance often overwhelms the driver with competing screens and synthetic distractions. Asterion reverses that hierarchy. Primary rotary controls are milled from solid anodised billet with unmistakable mechanical detents, allowing eyes and intuition to remain devoted entirely to the road ahead.',
    image: ASTERION_IMAGES.driverCockpit,
    alt: 'Minimalist luxury hypercar cockpit with charcoal alcantara steering wheel and knurled champagne rotary controls',
    caption: 'Study VII · Driver-Axis Ergonomics & Billet Switchgear',
  },
  {
    index: '03',
    kicker: 'Material Honesty',
    title: 'Craftsmanship Without Disguise',
    lead: 'Every visible element expresses its authentic structural role—carbon weave, titanium, and matte mineral finishes.',
    body: 'True luxury requires nothing counterfeit. Where torsional stiffness is paramount, autoclave carbon-fibre remains visible in satin clearcoat. Where heat and load converge, five-axis machined titanium brackets sit proud like fine horology. Every millimetre rewards close inspection.',
    image: ASTERION_IMAGES.carbonTitanium,
    alt: 'Macro study of woven carbon-fibre monocoque joined to a CNC-milled champagne titanium suspension mount',
    caption: 'Study IX · Structural Carbon Weave & Titanium Clevis',
  },
];

export interface ConceptStudioLocation {
  city: string;
  role: string;
  detail: string;
  hours: string;
}

export const CONCEPT_STUDIOS: ConceptStudioLocation[] = [
  {
    city: 'Geneva Design Atelier',
    role: 'Exterior Proportion & Brand Study',
    detail: 'Concept Monograph & Private Digital Presentation Desk',
    hours: 'By Private Appointment · CET',
  },
  {
    city: 'Modena Engineering Lab',
    role: 'Aerodynamic & Chassis Concept Research',
    detail: 'Composites, Wind-Tunnel Simulation & Dynamics Study',
    hours: 'Monday – Friday · Technical Inquiries',
  },
  {
    city: 'Tokyo Acoustic & Lighting Salon',
    role: 'Optical Signature & Cabin Craft Study',
    detail: 'Bespoke Illumination, Materials & Tactile Interface Lab',
    hours: 'By Private Appointment · JST',
  },
];

