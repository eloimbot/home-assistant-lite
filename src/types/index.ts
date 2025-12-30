export type DeviceType = 'light' | 'switch' | 'sensor' | 'climate' | 'media';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  room: string;
  state: string; // 'on', 'off', or value
  attributes?: Record<string, any>;
}

export interface Room {
  id: string;
  name: string;
  icon: string;
}

export interface Scene {
  id: string;
  name: string;
  icon: string;
  active: boolean;
}
