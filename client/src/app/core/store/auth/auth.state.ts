import {User} from "../../interface/user.interface";

export interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'loaded' | 'error'
  error?: string
}
