export interface SigninModel {
  email: string;
  password: string;
}

export interface userModel {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface tradeModel {
  id: number
  user_id: number
  asset: string
  exchange: string
  profit: number
  timestamp: string
}
