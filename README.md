# DTI Public Speaking Dashboard System

A comprehensive data dashboard system for DTI Public Speaking to track and analyze key business metrics.

## Features

- Lead Source Performance Dashboard
- Course Enrollment & Attendance Tracking
- Student Feedback & Sentiment Analysis
- Sales Funnel Analytics
- Trainer Performance Metrics
- Demographic Impact Analysis

## Tech Stack

- Backend: Django/Python
- Database: PostgreSQL
- Frontend: React with Chart.js
- Visualization: Superset
- API Integration: FastAPI

## Setup Instructions

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment variables:
Create a `.env` file with the following variables:
```
DATABASE_URL=postgresql://user:password@localhost:5432/dti_db
SECRET_KEY=your-secret-key
SUPASET_URL=http://localhost:8088
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Start the development server:
```bash
python manage.py runserver
```

## Project Structure

```
dti-dashboard/
├── backend/           # Django backend
├── frontend/          # React frontend
├── api/              # FastAPI services
├── dashboards/       # Superset configurations
└── scripts/          # Data processing scripts
```
