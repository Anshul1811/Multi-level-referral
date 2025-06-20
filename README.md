# Multi-Level Referral & Earning System

A Node.js backend system enabling multi-level referrals with real-time profit sharing and live earnings notifications using SSE (Server-Sent Events).  
Built with Express, Sequelize (MySQL), and designed for scalable referral hierarchies.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Setup Instructions](#setup-instructions)  
- [Database Schema](#database-schema)  
- [API Endpoints](#api-endpoints)  
- [System Architecture](#system-architecture)  
- [Real-Time Notifications](#real-time-notifications)  
- [Detailed Documentation](#detailed-documentation)  
- [Additional Notes](#additional-notes)  

---

## Project Overview

This system enables users to refer up to 8 people directly and facilitates profit sharing  
based on a multi-level referral hierarchy. Earnings are tracked and distributed in real-time  
with live data updates for parent users whenever a leg user completes a purchase.

---

## Features

- Direct Earnings: Parent users earn 5% profit from their direct referrals (Level 1).  
- Indirect Earnings: Parent users earn 1% profit from second-level referrals (Level 2).  
- Earnings apply only when purchase exceeds ₹1000.  
- Real-time updates of earnings via SSE notifications.  
- Detailed profit reports and referral analytics.  
- Purchase validation and edge case handling (inactive users, referral limits).  
- Secure user data handling.

---

## Tech Stack

- Node.js
- Express.js  
- Sequelize ORM with MySQL  
- dotenv for environment variables  
- Server-Sent Events (SSE) for live notifications

---

## Setup Instructions

1. **Clone repository**  
   ```bash
   git clone https://github.com/Anshul1811/Sports-Dunia-Assignment
   ```


