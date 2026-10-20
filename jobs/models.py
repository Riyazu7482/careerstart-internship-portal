
from django.db import models


class Internship(models.Model):
    company_name = models.CharField(max_length=200)
    job_title = models.CharField(max_length=200)
    location = models.CharField(max_length=100)
    description = models.TextField()
    skills = models.CharField(max_length=300)
    apply_link = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    STIPEND_CHOICES = [
        ("UNPAID", "Unpaid"),
        ("FIXED", "Paid - Fixed Amount"),
        ("RANGE", "Paid - Minimum to Maximum"),
        ("NS", "Not Specified"),
    ]

    stipend_type = models.CharField(
        max_length=10,
        choices=STIPEND_CHOICES,
        default="NS",
    )

    stipend_min = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True,
    )

    stipend_max = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True,
    )


    def __str__(self):
        return f"{self.job_title} - {self.company_name}"
