type League = {
  id: UUID;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  is_deleted: boolean;
};

type Season = {
  id: UUID;
  league_id: UUID;
  name?: string;
  started_at: Date;
  finished_at: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  is_deleted: boolean;
};

type Team = {
  id: UUID;
  league_id: UUID;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  is_deleted: boolean;
};

type Standing = {
  id: UUID;
  season_id: UUID;
  team_id: UUID;
  wins: number;
  loses: number;
};

type Identity = {
  id: UUID;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
};

type PhysicalAttribute = {
  id: UUID;
  weight?: number;
  height?: number;
  wingspan?: number;
  effected_at: Date;
  expired_at?: Date;
};

type Player = {
  id: UUID;
  identity_id: UUID;
  physical_attributes_id: UUID;
  team_id: UUID;
  number?: number;
  position?: string;
  main_hand?: string;
  birth_date?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  is_deleted: boolean;
};

type Coach = {
  id: UUID;
  identity_id: UUID;
  team_id: UUID;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  is_deleted: boolean;
};

type Arena = {
  id: UUID;
  name: string;
  location?: string;
};

type Schedule = {
  id: UUID;
  arena_id?: UUID;
  started_at: Date;
  finished_at?: Date;
};

type Match = {
  id: UUID;
  schedule_id: UUID;
  home_id: UUID;
  guest_id: UUID;
};

type Quarter = {
  id: UUID;
  match_id: UUID;
  quarter_number: number;
  started_at?: Date;
  ended_at?: Date;
};

type PlayerQuarterStatistic = {
  id: UUID;
  player_id: UUID;
  quarter_id: UUID;
  minutes: number;
  two_fgm: number;
  two_fga: number;
  three_fgm: number;
  three_fga: number;
  freethrow_fgm: number;
  freethrow_fga: number;
  offensive_rebounds: number;
  defensive_rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
};

type MatchLog = {
  id: UUID;
  player_id: UUID;
  quarter_id: UUID;
  x_position?: number;
  y_position?: number;
  type?: string;
  is_succeed: boolean;
  created_at: Date;
};

type PlayerInjury = {
  id: UUID;
  player_id: UUID;
  severity: string;
  description?: string;
  started_at: Date;
  recovered_at: Date;
};

type Training = {
  id: UUID;
  team_id: UUID;
  description?: string;
  started_at: Date;
  ended_at: Date;
};

type PlayerTraining = {
  player_id: UUID;
  training_id: UUID;
};

type Achievement = {
  id: UUID;
  title: string;
  description?: string;
  achieved_at: Date;
};