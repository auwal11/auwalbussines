import { Server as IOServer, Socket } from 'socket.io'
import { Server as HTTPServer } from 'http'
import { verifyToken } from '@/lib/auth/jwt'

interface AuthSocket extends Socket {
  userId?: string
  projectId?: string
}

export function initializeWebSocket(httpServer: HTTPServer) {
  const io = new IOServer(httpServer, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  })

  // Authentication middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth.token
    if (!token) {
      return next(new Error('Authentication required'))
    }

    try {
      const decoded = verifyToken(token)
      ;(socket as AuthSocket).userId = decoded.userId
      next()
    } catch (error) {
      next(new Error('Invalid token'))
    }
  })

  // Connection handling
  io.on('connection', (socket: AuthSocket) => {
    console.log(`[WebSocket] User ${socket.userId} connected`)

    // Join project room
    socket.on('join-project', (projectId: string) => {
      ;(socket as AuthSocket).projectId = projectId
      socket.join(`project:${projectId}`)
      socket.emit('joined-project', { projectId })
    })

    // Scan progress updates
    socket.on('scan-progress', (data: { scanId: string; progress: number }) => {
      const projectId = (socket as AuthSocket).projectId
      if (projectId) {
        io.to(`project:${projectId}`).emit('scan-progress', data)
      }
    })

    // Terminal command execution
    socket.on('terminal-command', (data: { sessionId: string; command: string }) => {
      const projectId = (socket as AuthSocket).projectId
      if (projectId) {
        io.to(`project:${projectId}`).emit('terminal-output', {
          sessionId: data.sessionId,
          output: `$ ${data.command}`,
        })
      }
    })

    // Real-time finding notifications
    socket.on('finding-created', (data) => {
      const projectId = (socket as AuthSocket).projectId
      if (projectId) {
        io.to(`project:${projectId}`).emit('finding-created', data)
      }
    })

    // Reverse shell activity
    socket.on('shell-activity', (data) => {
      const projectId = (socket as AuthSocket).projectId
      if (projectId) {
        io.to(`project:${projectId}`).emit('shell-activity', data)
      }
    })

    // Disconnect
    socket.on('disconnect', () => {
      console.log(`[WebSocket] User ${socket.userId} disconnected`)
    })
  })

  return io
}

export type { AuthSocket }
