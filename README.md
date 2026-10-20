# CareerStart Internship Portal

A Django-based internship portal designed to help students explore internship opportunities.

## Features
- View internship opportunities
- Search internships by job title or company
- Filter internships by category
- View internship details
- Display stipend information (Unpaid, Fixed, Range, or Not Specified)
- Django admin panel for managing internships

## Technologies Used
- Python
- Django
- HTML
- CSS
- JavaScript
- SQLite

## Installation and Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/Riyazu7482/careerstart-internship-portal.git
   ```

2. Open the project folder:
   ```bash
   cd careerstart-internship-portal
   ```

3. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   ```

   Windows PowerShell:
   ```powershell
   .\.venv\Scripts\Activate.ps1
   ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Apply database migrations:
   ```bash
   python manage.py migrate
   ```

6. Start the development server:
   ```bash
   python manage.py runserver
   ```

7. Open this URL in your browser:
   http://127.0.0.1:8000/jobs/

## Project Status
Core internship listing, search, category filtering, details, and stipend display are implemented.

## Author
Riyazu7482
