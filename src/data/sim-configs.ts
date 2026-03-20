import type { ScenarioId } from '../types/scenario';
import type { SimConfig } from '../types/simulation';

export const SIM_CONFIGS: Partial<Record<ScenarioId, SimConfig>> = {
  'highway-breakdown': {
    initCockpit: { hazardOn: false, onShoulder: false, speed: 85, fogOn: false, gearDown: false },
    foggy: false,
    lb1: { target: 'triangle', icon: '🔺', label: '三角架', color: '#22c55e' },
    lb2: { target: 'phone', icon: '📱', label: '電話', color: '#60a5fa' },
  },
  'tire-blowout': {
    initCockpit: { hazardOn: false, onShoulder: false, speed: 112, fogOn: false, gearDown: false },
    foggy: false,
    lb1: { target: 'triangle', icon: '🔺', label: '三角架', color: '#22c55e' },
    lb2: { target: 'phone', icon: '📱', label: '電話', color: '#60a5fa' },
  },
  'heavy-rain-fog': {
    initCockpit: { hazardOn: false, onShoulder: false, speed: 62, fogOn: false, gearDown: false },
    foggy: true,
    lb1: { target: 'triangle', icon: '🔺', label: '三角架', color: '#22c55e' },
    lb2: { target: 'phone', icon: '📱', label: '電話', color: '#60a5fa' },
  },
  'rear-end-collision': {
    initCockpit: { hazardOn: false, onShoulder: false, speed: 0, fogOn: false, gearDown: false },
    foggy: false,
    lb1: { target: 'triangle', icon: '📸', label: '拍照', color: '#a78bfa' },
    lb2: { target: 'phone', icon: '📱', label: '電話', color: '#60a5fa' },
  },
  'brake-failure': {
    initCockpit: { hazardOn: false, onShoulder: false, speed: 118, fogOn: false, gearDown: false },
    foggy: false,
    lb1: { target: 'triangle', icon: '🅿️', label: '手煞車', color: '#ef4444' },
    lb2: { target: 'phone', icon: '📱', label: '電話', color: '#60a5fa' },
  },
  'narrow-road': {
    initCockpit: { hazardOn: false, onShoulder: false, speed: 42, fogOn: false, gearDown: false },
    foggy: false,
    lb1: { target: 'fog', icon: '💡', label: '頭燈', color: '#fbbf24' },
    lb2: { target: 'horn', icon: '📯', label: '喇叭', color: '#a78bfa' },
  },
};

export const SIM_CFG_DEFAULT: SimConfig = {
  initCockpit: { hazardOn: false, onShoulder: false, speed: 80, fogOn: false, gearDown: false },
  foggy: false,
  lb1: { target: 'triangle', icon: '🔺', label: '三角架', color: '#22c55e' },
  lb2: { target: 'phone', icon: '📱', label: '電話', color: '#60a5fa' },
};
