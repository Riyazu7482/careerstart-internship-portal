
from django.shortcuts import render
from .models import Internship


def home(request):
    internships = Internship.objects.filter(is_active=True)

    def get_category(item):
        title = item.job_title.lower().strip()
        skills = item.skills.lower().strip()
        text = f"{title} {skills}"

        categories = [
            (
                "Python",
                [
                    "python", "django", "flask", "fastapi",
                ],
            ),
            (
                "Web Development",
                [
                    "frontend", "front-end", "backend", "back-end",
                    "web developer", "web development", "full stack",
                    "full-stack", "html", "css", "javascript",
                    "react", "angular", "node.js",
                ]
            ),
            (
                "Data Engineering",
                [
                    "data engineer", "data engineering",
                    "etl developer", "big data engineer",
                    "data pipeline", "spark", "hadoop",
                ],
            ),
            (
                "Data Analytics",
                [
                    "data analyst", "data analysis", "data analytics",
                    "business analyst", "business intelligence",
                    "bi analyst", "reporting analyst", "power bi",
                    "tableau", "excel",
                ],
            ),
            (
                "Data Science",
                [
                    "data scientist", "data science",
                    "machine learning", "ml engineer",
                    "ai engineer", "artificial intelligence",
                    "deep learning",
                ],
            ),
            (
                "Database",
                [
                    "database", "sql developer",
                    "database administrator", "dba",
                    "mysql", "postgresql", "mongodb",
                ],
            ),
            (
                "Java Development",
                [
                    "java developer", "java development",
                    "spring boot",
                ],
            ),
            (

               "Mobile App Development",
[
    "android developer", "ios developer",
    "mobile app", "mobile application",
    "mobile app developer", "application developer",
    "flutter", "react native",
],
            ),
            (
                "Cloud & DevOps",
                [
                    "cloud engineer", "devops", "aws engineer",
                    "azure engineer", "site reliability",
                    "kubernetes", "docker",
                ],
            ),
            (
                "Cybersecurity",
                [
                    "cybersecurity", "cyber security",
                    "security analyst", "penetration tester",
                    "ethical hacker", "information security",
                ],
            ),
            (
                "Design",
                [
                    "ui/ux", "ui designer", "ux designer",
                    "graphic designer", "product designer",
                    "figma", "prototyping",
                ],
            ),
            (
                "Testing & QA",
                [
                    "qa engineer", "software tester",
                    "test engineer", "quality assurance",
                    "automation tester", "manual testing",
                ],
            ),
            (
                "Software Development",
[
    "software developer", "software development",
    "software engineer", "application developer",
    "programmer",
],
            ),
        ]

        # Job title ko priority do; skills se bhi category pehchano.
        for category, keywords in categories:
            if any(keyword in title for keyword in keywords):
                return category

        for category, keywords in categories:
            if any(keyword in text for keyword in keywords):
                return category

        return "Other"

    internships_data = [
        {
            "id": item.id,
            "title": item.job_title,
            "company": item.company_name,
            "location": item.location,
            "category": get_category(item),
            "skills": [
                skill.strip()
                for skill in item.skills.split(",")
                if skill.strip()
            ],
            "type": "Internship",
            "description": item.description,
            "apply_link": item.apply_link,
            "stipend_type": item.stipend_type,
"stipend_min": (
    float(item.stipend_min)
    if item.stipend_min is not None
    else None
),
"stipend_max": (
    float(item.stipend_max)
    if item.stipend_max is not None
    else None
),
        }
        for item in internships
    ]

    return render(
        request,
        "jobs/index.html",
        {"internships": internships_data},
    )
