from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict
import datetime

app = FastAPI(title="DTI Dashboard API")

class LeadSource(BaseModel):
    name: str
    platform: str
    leads: int
    conversion_rate: float

class CourseMetrics(BaseModel):
    course_id: int
    title: str
    enrollments: int
    completion_rate: float
    average_rating: float

class DashboardData(BaseModel):
    lead_sources: List[LeadSource]
    course_metrics: List[CourseMetrics]
    demographic_breakdown: Dict[str, Dict[str, int]]

@app.get("/api/dashboard/leads", response_model=List[LeadSource])
async def get_lead_sources():
    """Get lead source performance metrics"""
    # TODO: Implement actual data fetching
    return [
        LeadSource(
            name="TikTok",
            platform="TIKTOK",
            leads=500,
            conversion_rate=0.15
        ),
        LeadSource(
            name="Facebook",
            platform="FACEBOOK",
            leads=300,
            conversion_rate=0.20
        )
    ]

@app.get("/api/dashboard/courses", response_model=List[CourseMetrics])
async def get_course_metrics():
    """Get course performance metrics"""
    # TODO: Implement actual data fetching
    return [
        CourseMetrics(
            course_id=1,
            title="Public Speaking Basics",
            enrollments=100,
            completion_rate=0.85,
            average_rating=4.5
        )
    ]

@app.get("/api/dashboard/demographics", response_model=Dict)
async def get_demographics():
    """Get demographic breakdown"""
    # TODO: Implement actual data fetching
    return {
        "age_groups": {
            "18-25": 40,
            "26-35": 35,
            "36+": 25
        },
        "professions": {
            "Students": 50,
            "Professionals": 30,
            "Entrepreneurs": 20
        }
    }
