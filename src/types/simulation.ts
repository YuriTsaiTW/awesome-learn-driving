export interface CockpitState {
  hazardOn: boolean;
  onShoulder: boolean;
  speed: number;
  fogOn: boolean;
  gearDown: boolean;
  trianglePlaced?: boolean;
  phoneActive?: boolean;
  [key: string]: boolean | number | undefined;
}

export interface SimStep {
  title: string;
  instruction: string;
  target: string;
  keys: string[];
  successMsg: string;
  stateChange: Partial<CockpitState>;
  /** If set, phone button opens a dial-pad modal; user must enter this exact number. */
  phoneNumber?: string;
  /** If set, triangle button opens a walk-distance minigame. */
  triangleDistance?: { min: number; max: number };
}

export interface SimButtonConfig {
  target: string;
  icon: string;
  label: string;
  color: string;
}

export interface SimConfig {
  initCockpit: CockpitState;
  foggy: boolean;
  lb1: SimButtonConfig;
  lb2: SimButtonConfig;
}
