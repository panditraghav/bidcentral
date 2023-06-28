import { io } from 'socket.io-client'
import { SERVER_URL } from './utils/url';

export const socket = io(SERVER_URL)
