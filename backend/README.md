# Django + MySQL Backend Starter

## Setup
1. Create virtual environment and activate it.
2. Install dependencies:
   - `pip install -r requirements.txt`
3. Update MySQL credentials in `medivault_backend/settings.py`.
4. Run:
   - `python manage.py makemigrations`
   - `python manage.py migrate`
   - `python manage.py runserver`

## Included
- Patient, records, health info, tablets, appointments models
- Django admin registration for all models
- Basic API health endpoint at `/api/health/`
