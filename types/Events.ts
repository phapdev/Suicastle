export interface OpenTreasureEvent {
  gold_earned: string;
  player_address: string;
  timestamp: string;
}

export interface LeaderBoardEvent {
  address_id: string;
  name: string;
  point: string;
}
