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

export interface PhoneOption {
  label: string;
  number: string;
  correct: boolean;
}

export interface SimStep {
  title: string;
  instruction: string;
  target: string;
  keys: string[];
  successMsg: string;
  stateChange: Partial<CockpitState>;
  phoneOptions?: PhoneOption[];
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
