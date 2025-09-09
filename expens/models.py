from django.db import models
from django.utils.text import slugify
from django.utils import timezone


class Expense(models.Model):
    titele = models.CharField(max_length=255)
    description = models.CharField(max_length=500)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(default=timezone.now)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    slug = models.SlugField(null=True, blank=True)
    def __str__(self):
        return self.titele
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.titele)
        super(Expense, self).save(*args, **kwargs)

class Category(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name

