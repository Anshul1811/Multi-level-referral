# Multi-Level Referral & Earning System
A Node.js backend system enabling multi-level referrals with real-time profit sharing and live earnings notifications using SSE Built with Express, Sequelize (MySQL), and designed for scalable referral hierarchies.
---


## Table of Contents
- Project Overview
- Features
- Tech Stack
- Setup Instructions
- Database Schema
- API Endpoints
- System Architecture
- Real-Time Notifications
- Detailed Documentation
---

## Project Overview
This system enables users to refer up to 8 people directly and facilitates profit sharing
based on a multi-level referral hierarchy. Earnings are tracked and distributed in real-time
with live data updates for parent users whenever a leg user completes a purchase.
---


## Features
- Direct Earnings: Parent users earn 5% profit from their direct referrals (Level 1).
- Indirect Earnings: Parent users earn 1% profit from second-level referrals (Level 2).
- Earnings apply only when purchase exceeds ■1000.
- Real-time updates of earnings via SSE notifications.
- Detailed profit reports and referral analytics.
- Purchase validation and edge case handling (inactive users, referral limits).
- Secure user data handling.
---


## Tech Stack
- Node.js(v-16)
- Express.js
- Sequelize ORM with MySQL
- dotenv for environment variables
- Server-Sent Events (SSE) for live notifications
---


## Setup Instructions
1. Clone repository
 ```
 git clone https://github.com/Anshul1811/Sports-Dunia-Assignment
 ```
2. Install dependencies
 ```
 npm install
 ```
3. Create `.env` file in the root:
 ```
 PORT=3000
 MYSQL_HOST=localhost
 MYSQL_USER=root
 MYSQL_PASSWORD=your_password
 MYSQL_DATABASE=database_name
 ```
4. Create MySQL database
 ```
 CREATE DATABASE sports_dunia;
 ```
5. Start server
 ```
 npm start
 ```
6. Access server at `http://localhost:3000`
---


## Database Schema
### Users Table
| Column | Type | Description |
|---------------|----------|----------------------------------------|
| user_id | INTEGER | Primary key, auto-increment |
| name | STRING | User's name |
| mobile | STRING | User's mobile number |
| email | STRING | Unique email |
| referral_code | STRING | Unique code used to refer others |
| referred_by | STRING | Code of the user who referred this one |
| count | INTEGER | Number of direct referrals |


### Earnings Table
| Column | Type | Description |
|-------------------|----------|----------------------------------------------|
| id | INTEGER | Primary key, auto-increment |
| user_id | INTEGER | FK to Users (who made the purchase) |
| amount | FLOAT | Transaction amount |
| level1_referral | INTEGER | User ID of Level 1 referrer (gets 5%) |
| level2_referral | INTEGER | User ID of Level 2 referrer (gets 1%) |
| type | ENUM | 'expense', 'L1 referral', 'L2 referral' |
| action | ENUM | 'debit' (purchase) or 'credit' (earning) |
---


## API Endpoints
### 1. POST /api/purchase
Records a purchase and distributes earnings.
Request:
```
{
 "user_id": 3,
 "amount": 2000,
 "level1_referral": 2,
 "level2_referral": 1
}
```
Response:
```
{
 "message": "Purchase recorded. Referrals credited if eligible."
}
```


### 2. POST /api/getUserReport
Fetches profit report for a user.
Request:
```
{
 "user_id": 1
}
```
Response:
```
{
 "user_id": 1,
 "total_earned": 1200,
 "level1_earnings": 900,
 "level2_earnings": 300,
 "transactions": [...]
}
```


### 3. POST /api/referrals
Returns analytics for referrals.
Request:
```
{
 "user_id": 1
}
```
Response:
```
{
 "user_id": 1,
 "direct_referrals": [...]
}
```


### 4. GET /api/notifications/earnings-stream
Real-time earning notification stream using SSE.
Use EventSource or:
```
curl http://localhost:3000/api/notifications/earnings-stream
```
---


## System Architecture
- Express.js + Sequelize (MySQL)
- Multi-level referral tree managed via `referred_by` and `referral_code`
- Real-time purchase updates to level 1 (5%) and level 2 (1%)
- Purchase amount must exceed 1000 to trigger referral credits
- SSE for live notification streaming
- Modular, testable codebase
---


## Detailed Documentation
### Profit Distribution Logic
- **Direct Earnings**: 5% to level 1 referrer
- **Indirect Earnings**: 1% to level 2 referrer
- **Minimum Threshold**: Purchase must be ≥ 1000

### System Design
- Up to 8 direct referrals per user
- Track users and transactions
- Real-time live feed via SSE
- Aggregated reports by API
---

