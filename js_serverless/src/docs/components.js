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
 *         matchId:
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
 */
