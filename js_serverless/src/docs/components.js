/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     SubmitMatchScore:
 *       type: object
 *       required:
 *         - homeTeam
 *         - homeTeamScore
 *         - awayTeam
 *         - awayTeamScore
 *         - matchDate
 *       properties:
 *         homeTeam:
 *           type: string
 *         homeTeamScore:
 *           type: integer
 *         awayTeam:
 *           type: string
 *         awayTeamScore:
 *           type: integer
 *         matchDate:
 *           type: string
 *           format: date
 *
 *     GetAllMatches:
 *       type: object
 *       properties:
 *         matchid:
 *           type: integer
 *         homeTeam:
 *           type: string
 *         homeTeamScore:
 *           type: integer
 *         awayTeam:
 *           type: string
 *         awayTeamScore:
 *           type: integer
 *         entryCreated:
 *           type: string
 *           format: date
 *         matchDate:
 *           type: string
 *           format: date
 *         winningTeam:
 *           type: string
 *
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - username
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         username:
 *           type: string
 *         password:
 *           type: string
 *           format: password
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *           format: password
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             username:
 *               type: string
 *             role:
 *               type: string
 *
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         username:
 *           type: string
 *         role:
 *           type: string
 *
 *     UpdateUserRoleRequest:
 *       type: object
 *       required:
 *         - role
 *       properties:
 *         role:
 *           type: string
 *           enum: [user, admin]
 *
 *     AdminActionResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 *     WebSocketNewMatch:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           example: "NEW_MATCH"
 *         payload:
 *           $ref: '#/components/schemas/GetAllMatches'
 *
 * tags:
 *   - name: WebSocket
 *     description: Real-time notifications for newly added matches
 *
 * paths:
 *   /ws:
 *     get:
 *       summary: WebSocket endpoint for new match notifications
 *       tags:
 *         - WebSocket
 *       description: |
 *         Connect to this WebSocket to receive real-time notifications
 *         when a new match is added. Messages are JSON objects like:
 *
 *         ```json
 *         {
 *           "type": "NEW_MATCH",
 *           "payload": {
 *             "matchid": 123,
 *             "homeTeam": "Team A",
 *             "awayTeam": "Team B",
 *             "homeTeamScore": 2,
 *             "awayTeamScore": 1,
 *             "entryCreated": "2026-02-25",
 *             "matchDate": "2026-02-25",
 *             "winningTeam": "Team A"
 *           }
 *         }
 *         ```
 *
 *       responses:
 *         "101":
 *           description: Switching Protocols – WebSocket connection established
 */
